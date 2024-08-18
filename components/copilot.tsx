"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RecorderTranscriber from "@/components/recorder";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCompletion } from "ai/react";
import { FLAGS, HistoryData } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

interface CopilotProps {
  addInSavedData: (data: HistoryData) => void;
}

export function Copilot({ addInSavedData }: CopilotProps) {
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [flag, setFlag] = useState<FLAGS>(FLAGS.COPILOT);
  const [bg, setBg] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const { completion, stop, isLoading, error, setInput, handleSubmit } =
    useCompletion({
      api: "/api/completion",
      body: {
        bg,
        flag,
      },
    });

  const handleFlag = useCallback((checked: boolean) => {
    setFlag(checked ? FLAGS.COPILOT : FLAGS.SUMMERIZER);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (formRef.current) {
            formRef.current.requestSubmit();
          }
          break;
        case "s":
          event.preventDefault();
          setFlag(FLAGS.SUMMERIZER);
          break;
        case "c":
          event.preventDefault();
          setFlag(FLAGS.COPILOT);
          break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const addTextinTranscription = (text: string) => {
    setInput((prev) => prev + " " + text);
    setTranscribedText((prev) => prev + " " + text);
  };

  const handleTranscriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInput(e.target.value);
    setTranscribedText(e.target.value);
  };

  const clearTranscriptionChange = () => {
    setInput("");
    setTranscribedText("");
  };

  useEffect(() => {
    const savedBg = localStorage.getItem("bg");
    if (savedBg) {
      setBg(savedBg);
    }
  }, []);

  useEffect(() => {
    if (bg) {
      localStorage.setItem("bg", bg);
    }
  }, [bg]);

  const handleSave = () => {
    addInSavedData({
      createdAt: new Date().toISOString(),
      data: completion,
      tag: flag === FLAGS.COPILOT ? "Copilot" : "Summerizer",
    });
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
    // Handle pause logic here, e.g., stop recording
  };

  const handleFinish = () => {
    // Show feedback pop-up
    const isFeedbackSubmitted = confirm("Please provide your feedback.");

    if (isFeedbackSubmitted) {
      // After feedback is submitted, redirect to home page
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl border border-gray-300 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Bluepilot
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Label className="text-green-800 font-semibold">
              Summerizer
              <span className="text-xs p-1">(Ctrl + s)</span>
            </Label>
            <Switch
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
              onCheckedChange={handleFlag}
              checked={flag === FLAGS.COPILOT}
            />
            <Label className="text-green-800 font-semibold">
              Copilot
              <span className="text-xs p-1">(Ctrl + c)</span>
            </Label>
          </div>
          <div className="flex space-x-4">
            <Button
              className="bg-gray-200 hover:bg-gray-200 text-black"
              onClick={handlePause}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right"
              onClick={handleFinish}
            >
              Finish
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-4 text-center text-sm bg-red-600 text-white rounded-lg">
          {error.message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200 flex flex-col w-full h-[500px] relative">
          <Label htmlFor="system_prompt" className="text-green-800 font-semibold text-lg">
            Interview Background
          </Label>
          <Textarea
            id="system_prompt"
            placeholder="Type or paste your text here."
            className="resize-none mt-8 p-4 border rounded-lg shadow-sm h-full"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
          />
          <RecorderTranscriber
            addTextinTranscription={addTextinTranscription}
            className="mt-4"
            isPaused={isPaused}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200 flex flex-col w-full h-[500px] relative">
          <Label htmlFor="transcription" className="text-green-800 font-semibold text-lg">
            Transcription
            <button
              type="button"
              className="absolute right-4 top-4 text-sm text-red-500 hover:text-red-700 underline"
              onClick={clearTranscriptionChange}
            >
              Clear
            </button>
          </Label>
          <Textarea
            id="transcription"
            className="mt-8 p-4 border rounded-lg shadow-sm h-full"
            placeholder="Your transcribed text will appear here."
            value={transcribedText}
            onChange={handleTranscriptionChange}
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex justify-center"
        >
          <Button
            className="w-60 h-12 bg-btn-grad text-bold text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right"
            size="lg"
            variant="solid"
            disabled={isLoading}
            type="submit"
          >
            Process
            <span className="text-sm p-2">(Ctrl + Enter)</span>
          </Button>
        </form>
      </div>

      <div className="mt-6">
        {completion && (
          <button
            type="button"
            className="text-xs text-green-500 hover:text-green-700 underline"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        <div className="mt-2 text-base text-gray-800 whitespace-pre-wrap">
          {completion}
        </div>
      </div>
    </div>
  );
}
