import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: string;
}

const AI_SkillAssessment: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch questions from AI
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'text-davinci-003',
            prompt: 'Generate a set of 3 technical questions with multiple-choice answers related to software development.',
            max_tokens: 150,
            temperature: 0.7,
          },
          {
            headers: {
              'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
              'Content-Type': 'application/json',
            },
          }
        );

        const aiQuestions = response.data.choices[0].text
          .split('\n')
          .map((line: string, index: number) => {
            const [text, optionsString] = line.split(':');
            const options = optionsString ? optionsString.split(',') : [];
            return {
              id: index + 1,
              text: text.trim(),
              options: options.map(option => option.trim()),
              answer: '', // Placeholder for correct answer
            };
          });

        setQuestions(aiQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId: number, option: string) => {
    setResponses(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    // Simulate AI-powered assessment
    try {
      const correctAnswers = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: `Provide correct answers for the following questions: ${questions.map(q => q.text).join(', ')}`,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
            'Content-Type': 'application/json',
          },
        }
      );

      const answers = correctAnswers.data.choices[0].text
        .split('\n')
        .map((line: string) => line.trim());

      const score = Object.keys(responses).reduce((acc, key) => {
        return acc + (responses[parseInt(key)] === answers[parseInt(key) - 1] ? 1 : 0);
      }, 0);

      setResult(`You scored ${score} out of ${questions.length}`);
    } catch (error) {
      console.error('Error assessing answers:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Skill Assessment</h1>
      {questions.map(question => (
        <div key={question.id} className="mb-4 p-4 border border-gray-200 rounded">
          <p className="text-lg font-semibold mb-2">{question.text}</p>
          <div className="space-y-2">
            {question.options.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`${question.id}-${option}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={() => handleOptionChange(question.id, option)}
                  className="mr-2"
                />
                <label htmlFor={`${question.id}-${option}`} className="cursor-pointer">{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {result && (
        <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-100">
          <h2 className="text-lg font-semibold">Results</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default AI_SkillAssessment;
