"use client";

import { Copilot } from "@/components/copilot";
import History from "@/components/History";
import { HistoryData } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import '../app/globals.css'; 

export default function MainPage() {
  const isRendered = useRef(false);
  const [savedData, setSavedData] = useState<HistoryData[]>([]);

  const addInSavedData = (data: HistoryData) => {
    setSavedData((prevData) => [data, ...prevData]);
  };

  const deleteData = (createdAt: string) => {
    setSavedData((prevData): HistoryData[] =>
      prevData.filter((data) => data.createdAt !== createdAt),
    );
  };

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;
    try {
      const savedData = localStorage.getItem("savedData");
      if (savedData) {
        setSavedData(JSON.parse(savedData) as HistoryData[]);
      }
    } catch (error) {
      console.error("Failed to parse saved data from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("savedData", JSON.stringify(savedData));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [savedData]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col p-4">
      <Copilot addInSavedData={addInSavedData} />
      <div className="mt-8">
        <History data={savedData} deleteData={deleteData} />
      </div>
    </main>
  );
}
