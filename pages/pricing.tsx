import React from 'react';

const PricingPlans: React.FC = () => {

  const plans = [
    {
      title: "Free Trial",
      price: "Free",
      features: [
        "AI Interview Copilot - 10-minute free trial",
        "24/7 Customer Support"
      ],
      isPro: false,
    },
    {
      title: "Basic",
      price: "$19.00 per month",
      features: [
        "AI Interview Copilot - 3 sessions/month",
        "AI Skill Development - 3 assessments/month",
        "AI Question Generator - 3 sessions/month",
        "24/7 Customer Support"
      ],
      isPro: false,
    },
    {
      title: "Pro",
      price: "$39.00 per month",
      features: [
        "AI Interview Copilot - 9 sessions/month",
        "AI Skill Development - 12 assessments/month",
        "AI Question Generator - 15 sessions/month",
        "24/7 Customer Support"
      ],
      isPro: true,
    },
    {
      title: "Premium",
      price: "$59.00 per month",
      features: [
        "AI Interview Copilot - Unlimited sessions",
        "AI Skill Development - Unlimited assessments",
        "AI Question Generator - Unlimited sessions",
        "24/7 Customer Support"
      ],
      isPro: true,
    }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-8 bg-gray-50">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`border rounded-lg p-6 shadow-md bg-white text-gray-800 w-full md:w-1/4 ${
            plan.isPro ? 'border-blue-600' : ''
          }`}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">{plan.title}</h3>
          <p className="text-3xl font-bold mb-6 text-center">{plan.price}</p>
          <ul className="mb-6 text-left">
            {plan.features.map((feature, i) => (
              <li key={i} className="mb-2 flex items-center">
                <span className="mr-2">✔️</span>{feature}
              </li>
            ))}
          </ul>
          <button
            className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            {plan.title === 'Free Trial' ? 'Start Free Trial' : 'Choose Plan'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
