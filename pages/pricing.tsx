import React, { useEffect, useRef } from 'react';
import '../app/globals.css';

// Feedback Section Components
const FeedbackCard = ({ name, title, feedback, date, highlightedText }) => {
  const getHighlightedFeedback = () => {
    return feedback.split(' ').map((word, i) => {
      const match = highlightedText.find((text) => word.includes(text));
      return match ? (
        <span key={i} className="bg-yellow-300 break-words">
          {word}{' '}
        </span>
      ) : (
        word + ' '
      );
    });
  };

  return (
    <div className="flex flex-col justify-between p-3 border rounded-lg shadow-md bg-white w-30 mx-4 my-2">
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt={name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-500">
            &#9733;
          </span>
        ))}
      </div>
      {/* Added whitespace-pre-wrap and break-words to handle text wrapping */}
      <p className="mt-3 text-gray-700 whitespace-pre-wrap break-words">
        {getHighlightedFeedback()}
      </p>
      <p className="mt-2 text-sm text-gray-500">{date}</p>
    </div>
  );
};

const FeedbackSection = () => {
  const feedbackContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = feedbackContainerRef.current;
    let scrollAmount = 0;
    let maxScroll = 0;

    // Scroll handler
    const scrollStep = () => {
      if (scrollContainer) {
        scrollAmount += 1; // Adjust scrolling speed
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0; // Reset the scroll when it reaches the end
        }
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    };

    // Set maximum scroll based on the width of the container
    const calculateMaxScroll = () => {
      if (scrollContainer) {
        maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      }
    };

    // Start the scrolling interval
    const intervalId = setInterval(scrollStep, 20); // Adjust interval to control speed

    // Recalculate the maximum scroll whenever the window is resized
    window.addEventListener('resize', calculateMaxScroll);
    calculateMaxScroll(); // Initial calculation on mount

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
      window.removeEventListener('resize', calculateMaxScroll);
    };
  }, []);

  const feedbackData = [
    {
      name: 'Kevin',
      title: 'Recent College Graduate',
      feedback: 'Bluepilot AI helped me find skills and opportunities',
      date: 'Jan 4, 2024',
      highlightedText: ['', ''],
    },
    {
      name: 'Tom Dallimore',
      title: 'Mid-Career Professional',
      feedback: 'Bluepilot AI Interview Copilot tool impressed!',
      date: 'May 24, 2023',
      highlightedText: ['AIApply', 'difference'],
    },
    {
      name: 'Vinith',
      title: 'Senior Developer',
      feedback: 'Bluepilot AI Question Bank tool is Smart Interview Prep Tool ',
      date: 'Nov 23, 2023',
      highlightedText: ['Apple', 'Google'],
    },
    {
      name: 'Rihana.G',
      title: 'Marketing Specialist',
      feedback: 'Bluepilot AI delivers personalized job guidance with advanced AI',
      date: 'May 24, 2023',
      highlightedText: ['hello job offers!'],
    },
  ];

  return (
    <div className="overflow-hidden mt-10">
      <h3 className="text-2xl font-bold mb-8 text-center">What People Are Saying</h3>
      <div
        ref={feedbackContainerRef}
        className="flex space-x-2"
        style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}
      >
        {feedbackData.map((feedback, index) => (
          <FeedbackCard
            key={index}
            name={feedback.name}
            title={feedback.title}
            feedback={feedback.feedback}
            date={feedback.date}
            highlightedText={feedback.highlightedText}
          />
        ))}
      </div>
    </div>
  );
};

// Pricing Plans Component
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
      price: "$16.66 / month",
      originalPrice: "$32.00",
      features: [
        "AI Interview Copilot - Unlimited access",
        "AI Skill Development - Unlimited access",
        "Resume Builder - Unlimited access",
        "Career Assistant - Unlimited access",
        "Question Bank - Unlimited access",
        "24/7 Customer Support"
      ],
      isPro: false,
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Pricing</h2>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between border rounded-lg p-6 shadow-md bg-white text-gray-800 w-full md:w-1/3 ${
              plan.isPro ? 'border-blue-500' : ''
            }`}
            style={{ height: '400px' }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">{plan.title}</h3>
              <p className="text-3xl font-bold mb-6 text-center">
                {plan.originalPrice && (
                  <span className="text-red-500 line-through mr-2">{plan.originalPrice}</span>
                )}
                {plan.price}
              </p>
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

      <FeedbackSection />
    </div>
  );
};

export default PricingPlans;
