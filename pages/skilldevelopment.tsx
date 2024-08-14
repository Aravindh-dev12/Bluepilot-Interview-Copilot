// src/pages/SkillMapping.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';

const SkillMapping: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Skill Mapping in Skill Development</h1>
          <p className="text-lg text-gray-600 mt-2">
            Skill mapping aligns individual skills with career development goals or job requirements.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Benefits of Skill Mapping</h2>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Identify Skill Gaps</h3>
              <p className="text-gray-600">
                By comparing current skills with required skills for a role or goal, skill mapping helps pinpoint areas needing improvement.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Tailored Development Plans</h3>
              <p className="text-gray-600">
                Based on the skill gap analysis, personalized training and development plans can be created to address specific needs.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Career Pathing</h3>
              <p className="text-gray-600">
                Skill mapping can assist in planning career paths by identifying necessary skills for advancement and suggesting appropriate learning resources.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Performance Management</h3>
              <p className="text-gray-600">
                It provides a framework for evaluating employee performance against required competencies and skill levels.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Resource Allocation</h3>
              <p className="text-gray-600">
                Helps in efficiently allocating resources for training and development by focusing on the most critical skill gaps.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Goal Tracking</h3>
              <p className="text-gray-600">
                Facilitates tracking progress towards skill acquisition and achieving development goals.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Integrating Skill Mapping into a Skill Development System</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Define Skills and Competencies</h3>
              <p className="text-gray-600">
                Clearly outline the skills and competencies needed for various roles or career paths.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Assess Current Skills</h3>
              <p className="text-gray-600">
                Evaluate current skill levels of individuals using assessments, performance reviews, or self-assessments.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Map Skills to Goals</h3>
              <p className="text-gray-600">
                Align the identified skills with career goals or job requirements to determine skill gaps.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Develop Training Plans</h3>
              <p className="text-gray-600">
                Create personalized training plans and development opportunities to address identified gaps.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Implement and Track Progress</h3>
              <p className="text-gray-600">
                Execute the training plans and regularly monitor progress towards skill development goals.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-700">Review and Update</h3>
              <p className="text-gray-600">
                Periodically review and update the skill mapping process to ensure it remains aligned with evolving roles and industry requirements.
              </p>
            </li>
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SkillMapping;
