"use client";

import { Copilot } from "@/components/copilot";
import History from "@/components/History";
import { HistoryData } from "@/lib/types";
import { useEffect, useRef, useState, useCallback } from "react";
import '../app/globals.css';

export default function MainPage() {
  const isRendered = useRef(false);
  const [savedData, setSavedData] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addInSavedData = useCallback((data: HistoryData) => {
    setSavedData((prevData) => [data, ...prevData]);
  }, []);

  const deleteData = useCallback((createdAt: string) => {
    setSavedData((prevData) => prevData.filter((data) => data.createdAt !== createdAt));
  }, []);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    setLoading(true); // Set loading state to true
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      setSavedData(JSON.parse(savedData) as HistoryData[]);
    }
    setLoading(false); // Set loading state to false
  }, []);

  useEffect(() => {
    if (savedData.length > 0) {
      localStorage.setItem("savedData", JSON.stringify(savedData));
    }
  }, [savedData]);

  return (
    <main className="m-2 overscroll-none">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <Copilot addInSavedData={addInSavedData} />
          <History data={savedData} deleteData={deleteData} />
        </>
      )}
    </main>
  );
}
