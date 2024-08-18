// pages/Feedback.tsx

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState<string>("");
  const router = useRouter();

  const submitFeedback = () => {
    // Handle feedback submission logic here
    console.log("Feedback submitted:", feedbackText);
    router.push("/"); // Redirect to home page after submission
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">We Value Your Feedback</h2>
      <div className="flex justify-around mb-4">
        {/* Emojis for feedback */}
        <span role="img" aria-label="excellent" className="text-3xl cursor-pointer">😊</span>
        <span role="img" aria-label="good" className="text-3xl cursor-pointer">🙂</span>
        <span role="img" aria-label="average" className="text-3xl cursor-pointer">😐</span>
        <span role="img" aria-label="poor" className="text-3xl cursor-pointer">😞</span>
      </div>
      <Textarea
        placeholder="Additional comments..."
        className="resize-none mt-2 p-4 border rounded-lg shadow-sm"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <Button
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
        onClick={submitFeedback}
      >
        Submit Feedback
      </Button>
    </div>
  );
}
