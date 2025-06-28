// pages/get-started.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import '../app/globals.css';

const GetStarted: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call)
    console.log("Submitted:", { fullName, email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FDEAE8] to-white">
      <Header />
      <main className="flex-grow container mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Get Started with Bluepilot</h1>
        <p className="text-xl text-gray-500 mb-12">
          Join us today and revolutionize your interview preparation experience with real-time AI support!
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-10">Sign Up for Free</h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3 w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-lg p-3 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg p-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-btn-grad text-white rounded-full px-8 py-3 text-lg transition duration-300 hover:bg-opacity-80"
          >
            Start Your Journey
          </button>
        </form>

        <p className="mt-8 text-gray-500">
          Already have an account? 
          <a href="/login" className="text-btn-grad font-semibold"> Log in</a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
