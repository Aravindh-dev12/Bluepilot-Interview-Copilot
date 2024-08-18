import React from 'react';
import { useRouter } from 'next/router';

const ResultsPage: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  
  const tutorial = decodeURIComponent(query.tutorial as string || 'No tutorial content available.');
  const examples = decodeURIComponent(query.examples as string || 'No examples content available.');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">Analysis Results</h2>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl border border-gray-200">
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Tutorial:</h3>
              <p>{tutorial}</p>
            </div>
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md mt-8">
              <h3 className="text-2xl font-semibold mb-4">Examples:</h3>
              <p>{examples}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultsPage;
