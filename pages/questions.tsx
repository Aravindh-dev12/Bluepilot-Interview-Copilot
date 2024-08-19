// src/pages/questions.tsx
import { useRouter } from 'next/router';
import React from 'react';

const QuestionsPage: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const questions: string[] = query.questions ? JSON.parse(query.questions as string) : [];
  const company = query.company as string;
  const role = query.role as string;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="p-4 bg-blue-600 text-white">
        <button
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Go Back
        </button>
      </header>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Interview Questions for {role} at {company}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="list-disc pl-6">
            {questions.map((question, index) => (
              <li key={index} className="text-gray-700 mb-2">{question}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default QuestionsPage;
