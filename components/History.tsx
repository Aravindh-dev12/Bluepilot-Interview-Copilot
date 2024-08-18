"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoryData } from "@/lib/types";

interface HistoryProps {
  data: HistoryData[];
  deleteData: (createdAt: string) => void;
}

export default function History({ data, deleteData }: HistoryProps) {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">History</h2>
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-gray-600">No records found.</p>
        ) : (
          data.map((item) => (
            <Card key={item.createdAt} className="p-4 shadow-lg border rounded-lg bg-white">
              <div className="flex justify-between items-start">
                <div className="text-lg font-semibold text-gray-900">{item.tag}</div>
                <Button
                  variant="outline"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => deleteData(item.createdAt)}
                >
                  Delete
                </Button>
              </div>
              <p className="mt-2 text-gray-700">{item.data}</p>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
