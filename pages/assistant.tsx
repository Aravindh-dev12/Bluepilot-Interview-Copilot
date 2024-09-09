import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUser, faMicrophone, faArrowRight, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const Assistant = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai', message: string }>>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null); // Reference to scroll to

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return; // prevent empty submissions
    addMessage('user', input);
    setLoading(true);
    try {
      const res = await fetch('/api/generateResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      addMessage('ai', data.message);
      handleVoiceResponse(data.message); // Read out the response
    } catch (error) {
      console.error('Error fetching response:', error);
      addMessage('ai', 'Error fetching response.');
    }
    setLoading(false);
    setInput('');
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSubmit(); // Automatically submit after voice input
    };
    recognition.start();
  };

  const handleVoiceResponse = (text: string) => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const addMessage = (sender: 'user' | 'ai', message: string) => {
    setChatHistory(prev => [...prev, { sender, message }]);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const hasConversationStarted = chatHistory.length > 0;

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        {/* Heading and Subtitle */}
        {!hasConversationStarted && (
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold mb-2">AI Career Assistant</h1>
            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">Ask your career questions and get instant responses!</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                "Can you help me create a resume for Data Scientist ?",
                "What skills are required for a career in AI?",
                "Top interview tips for software engineering",
                "Make me a personal portfolio website",
              ].map((question, index) => (
                <div key={index} className="bg-transparent border border-gray-300 rounded-lg p-4 shadow-md flex items-center min-w-[200px] max-w-[250px]">
                  <p className="text-sm">{question}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xs p-3 rounded-lg shadow ${chat.sender === 'ai' ? 'bg-gray-200' : 'bg-gray-500 text-white'}`}>
                <p>{chat.message}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} /> {/* Scroll target */}
        </div>
      </div>
      <div className="bottom-0 left-0 w-full p-6 border-t border-gray-100 bg-white">
        <div className="relative flex items-center max-w-lg mx-auto">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-black-600 pr-12"
            placeholder="Ask your career question..."
            style={{ maxWidth: '500px' }} // Adjust width as needed
          />
          <button
            onClick={handleSubmit}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-black-600"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button
            onClick={handleVoiceInput}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-black p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-black-500"
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
