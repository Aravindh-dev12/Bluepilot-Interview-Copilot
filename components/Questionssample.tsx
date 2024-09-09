import React from 'react';

const InterviewSection = () => {
  return (
    <div className="p-6 space-y-10">
      {/* Tech Innovators Section */}
      <div className="border border-gray-300 p-6 rounded-lg shadow-sm">
        <section className="pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">Tech Innovators</h2>
              <h4 className="text-md text-gray-500">Product Design - 2024</h4>
            </div>
            <h3 className="text-lg font-semibold text-right">Role: Product Manager</h3>
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
            <p className="font-semibold">
              What are the key principles of product design that you believe are essential for a successful product?
            </p>
            <p className="mt-2">
              The key principles include user-centered design, simplicity, usability, and aesthetic appeal. Understanding the target user, keeping the design intuitive, and ensuring that the product is both functional and visually pleasing are crucial for success.
            </p>
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
            <p className="font-semibold">
              How do you approach user research and incorporate findings into the design process?
            </p>
            <p className="mt-2">
              I start with defining research objectives, followed by selecting appropriate methods such as interviews, surveys, and usability testing. I then analyze the data to identify user needs and pain points, which guide the design decisions and iterations.
            </p>
          </div>
        </section>
      </div>

      {/* Innovate Labs Section */}
      <div className="border border-gray-300 p-6 rounded-lg shadow-sm">
        <section className="pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">Innovate Labs</h2>
              <h4 className="text-md text-gray-500">User Experience - 2024</h4>
            </div>
            <h3 className="text-lg font-semibold text-right">Role: UX Designer</h3>
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
            <p className="font-semibold">
              How do you measure the success of a user experience design?
            </p>
            <p className="mt-2">
              Success can be measured using metrics like user satisfaction, task completion rates, and Net Promoter Scores (NPS). Additionally, usability testing and user feedback are critical for assessing the effectiveness of the design.
            </p>
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
            <p className="font-semibold">
              Can you describe a challenging UX problem you solved and how you approached it?
            </p>
            <p className="mt-2">
              In a recent project, we faced issues with user onboarding. I conducted user interviews to understand pain points and redesigned the onboarding flow to be more intuitive, which resulted in a significant increase in user engagement and retention.
            </p>
          </div>
        </section>
      </div>

      {/* NextGen Solutions Section */}
      <div className="border border-gray-300 p-6 rounded-lg shadow-sm">
        <section className="pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">NextGen Solutions</h2>
              <h4 className="text-md text-gray-500">Data Analysis - 2024</h4>
            </div>
            <h3 className="text-lg font-semibold text-right">Role: Data Scientist</h3>
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
            <p className="font-semibold">
              What techniques do you use to ensure the accuracy and reliability of your data analysis?
            </p>
            <p className="mt-2">
              I employ techniques such as data validation, statistical testing, and cross-validation. Ensuring data cleanliness and performing exploratory data analysis (EDA) also helps in maintaining accuracy and reliability.
            </p>
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
            <p className="font-semibold">
              How do you handle missing or incomplete data in your datasets?
            </p>
            <p className="mt-2">
              I handle missing data by using methods such as imputation, where missing values are filled in based on statistical methods or domain knowledge. Alternatively, I might use models that can handle missing values directly.
            </p>
          </div>
        </section>
      </div>

      {/* You can repeat similar structure for other sections */}
    </div>
  );
};

export default InterviewSection;
