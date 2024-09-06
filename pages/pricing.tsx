import React from 'react';
import '../app/globals.css';

const PricingPlans: React.FC = () => {

  const plans = [
    {
      title: "Free Trial",
      price: "Free",
      features: [
        "AI Interview Copilot - 1 session",
        "AI Skill Development - 1 assessment",
        "Career Assistant - Unlimited",
        "24/7 Customer Support",
        "7-day limited access"
      ],
      isPro: false,
    },
    {
      title: "Basic",
      price: "$29.00 per month",
      features: [
        "AI Interview Copilot - 3 sessions/month",
        "AI Skill Development - Up to 3 assessments/month",
        "Resume Builder - Unlimited access",
        "Career Assistant - Unlimited access",
        "24/7 Customer Support"
      ],
      isPro: false,
    },
    {
      title: "Pro",
      price: "$59.00 per month",
      features: [
        "AI Interview Copilot - Unlimited sessions",
        "AI Skill Development - Unlimited assessments",
        "Career Assistant - Unlimited access",
        "Resume Builder - Unlimited access",
        "Question Bank - Unlimited access",
        "24/7 Customer Support"
      ],
      isPro: true,
    }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-8">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`flex flex-col justify-between border rounded-lg p-6 shadow-md bg-white text-gray-800 w-full md:w-1/3 ${
            plan.isPro ?'' : ''
          }`}
          style={{ height: '550px' }} // Increased the height slightly
        >
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">{plan.title}</h3>
            <p className="text-3xl font-bold mb-6 text-center">{plan.price}</p>
            <ul className="mb-6 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2 flex items-center">
                  <span className="mr-2">✔️</span>{feature}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="w-full py-2 rounded bg-gray-200 text-black border-2 font-semibold border-black mt-auto"
          >
            {plan.title === 'Free Trial' ? 'Start Free Trial' : 'Choose Plan'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
