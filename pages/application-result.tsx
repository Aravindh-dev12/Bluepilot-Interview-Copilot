import { useRouter } from 'next/router';
import React from 'react';

interface ResultsProps {
  tailoredContent: string;
}

const ApplicationResult: React.FC<ResultsProps> = ({ tailoredContent }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-8">
        <section>
          <h1 className="text-center text-3xl font-bold mb-6 text-blue-600">Application Result</h1>
          <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
            {tailoredContent || 'No tailored content available.'}
          </div>
          <button
            onClick={() => router.back()}
            className="mt-6 w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Go Back
          </button>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: { query: { tailoredContent: string } }) => {
  const { tailoredContent } = context.query;

  return {
    props: {
      tailoredContent: tailoredContent || '',
    },
  };
};

export default ApplicationResult;
