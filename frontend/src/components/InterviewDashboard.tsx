import { useState, useCallback, useRef, useEffect, lazy, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom'
// const ResponseGenerator = lazy(() => import('./ResponseGenerator'));
const TextToSpeech = lazy(() => import('./TextToSpeech'));
import { useConversation } from '../hooks/useConversation';
import { useInterviewState } from '../context/InterviewStateContext';
import type { TextToSpeechRef } from '../types/speech';
const LiveTranscript = lazy(() => import('./LiveTranscript'));
import useDeepgramLive from '../hooks/useDeepgramLive';
import { registerSessionToBackend } from '../services/backend';
import useTranscriptBuffer from '../hooks/useTranscriptBuffer';
import { getSocket, fetchSession, fetchMainSession } from '../services/backend';
import { updateSession, getNextMockQuestion } from '../services/backend';
import createAudioAttribution from '../utils/audioAttribution';
// import ConversationHistory from './ConversationHistory';
const ScreenSharePreview = lazy(() => import('./ScreenSharePreview'));
const InterviewCopilotPanel = lazy(() => import('./InterviewCopilotPanel'));
const DocumentManager = lazy(() => import('./DocumentManager'));

// 3D Globe Background Component
const ThreeGlobeBackground = () => {
  useEffect(() => {
    // This would typically be a Three.js globe implementation
    // For now, we'll use a CSS-based placeholder that looks like a liquid globe
    console.log('3D Globe background would be initialized here with Three.js');
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-500/10 to-cyan-400/10 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-8 bg-gradient-to-r from-blue-500/5 to-purple-600/5 rounded-full animate-pulse delay-500"></div>
          <div className="absolute inset-16 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full animate-spin-slow reverse"></div>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
function HomePage({ 
  onNavigateToInterview, 
  onNavigateToDocuments 
}: { 
  onNavigateToInterview: () => void;
  onNavigateToDocuments: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* 3D Globe Background */}
      <ThreeGlobeBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-800/50 bg-black/10 backdrop-blur-xl z-10">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L5 13V15L9 13.5V15H15V13.5L21 15V13L15 11.5V10.5L21 9Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">BluePilot AI</h1>
                <p className="text-blue-300 text-sm">Interview Intelligence Platform</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex space-x-10">
              <button 
                onClick={onNavigateToDocuments}
                className="text-gray-300 hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-green-400 pb-1 group"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <span>Interview Context</span>
                </span>
              </button>
              <button 
                onClick={onNavigateToInterview}
                className="text-gray-300 hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-purple-400 pb-1 group"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 8.71,16.5 10.13,16.5C11.55,16.5 12.73,17.38 13.15,18.28C12.55,18.73 11.84,19 11.08,19C10.32,19 9.58,18.73 9,18.28M6,16C7.1,16 8,15.1 8,14C8,12.9 7.1,12 6,12C4.9,12 4,12.9 4,14C4,15.1 4.9,16 6,16M11.07,12C12.84,12 14.21,13.15 14.66,14.78C13.81,15.55 12.61,16 11.29,16C10.32,16 9.38,15.75 8.55,15.32C8.85,14.24 9.83,13.38 11.07,13.38M11.07,11C9.93,11 9,10.07 9,8.93C9,7.79 9.93,6.86 11.07,6.86C12.21,6.86 13.14,7.79 13.14,8.93C13.14,10.07 12.21,11 11.07,11M16,14C16,15.1 16.9,16 18,16C19.1,16 20,15.1 20,14C20,12.9 19.1,12 18,12C16.9,12 16,12.9 16,14Z"/>
                  </svg>
                  <span>Interview Dashboard</span>
                </span>
              </button>
              <button className="text-gray-300 hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-blue-400 pb-1 group">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                  </svg>
                  <span>Features</span>
                </span>
              </button>
              <button className="text-gray-300 hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-cyan-400 pb-1 group">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z"/>
                  </svg>
                  <span>How It Works</span>
                </span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button className="text-gray-300 hover:text-white p-2 rounded-lg border border-gray-700 hover:border-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-24 z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 mb-12 backdrop-blur-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-blue-400 text-lg font-medium">AI-Powered Interview Assistant</span>
          </div>
          
          <h1 className="text-7xl font-black text-white mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
            BluePilot
            <br />
            <span className="text-5xl">Interview Copilot</span>
          </h1>
          
          <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Transform your interview performance with real-time AI assistance, 
            intelligent feedback, and comprehensive preparation tools.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-10 mb-20 max-w-7xl mx-auto">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 shadow-2xl shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">Real-time Responses</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Get AI-powered responses to interview questions instantly during live interviews with advanced speech recognition
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 transform hover:-translate-y-2 shadow-2xl shadow-purple-500/10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 8.71,16.5 10.13,16.5C11.55,16.5 12.73,17.38 13.15,18.28C12.55,18.73 11.84,19 11.08,19C10.32,19 9.58,18.73 9,18.28M6,16C7.1,16 8,15.1 8,14C8,12.9 7.1,12 6,12C4.9,12 4,12.9 4,14C4,15.1 4.9,16 6,16M11.07,12C12.84,12 14.21,13.15 14.66,14.78C13.81,15.55 12.61,16 11.29,16C10.32,16 9.38,15.75 8.55,15.32C8.85,14.24 9.83,13.38 11.07,13.38M11.07,11C9.93,11 9,10.07 9,8.93C9,7.79 9.93,6.86 11.07,6.86C12.21,6.86 13.14,7.79 13.14,8.93C13.14,10.07 12.21,11 11.07,11M16,14C16,15.1 16.9,16 18,16C19.1,16 20,15.1 20,14C20,12.9 19.1,12 18,12C16.9,12 16,12.9 16,14Z"/>
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">Mock Interviews</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Practice with realistic mock interviews and receive detailed feedback on your performance and communication skills
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-500 transform hover:-translate-y-2 shadow-2xl shadow-green-500/10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/25">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21,6H3C1.9,6 1,6.9 1,8V16C1,17.1 1.9,18 3,18H21C22.1,18 23,17.1 23,16V8C23,6.9 22.1,6 21,6M21,16H3V8H21V16M5,15H8V9H5V15M19,15H22V9H19V15M17,12H15V10H17V12M9,12H7V10H9V12Z"/>
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">Live Analysis</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Real-time transcript analysis and performance insights with detailed metrics and improvement suggestions
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={onNavigateToInterview}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25 flex items-center space-x-3 group"
            >
              <span className="group-hover:scale-110 transition-transform">🚀</span>
              <span>Start Interview Dashboard</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
              </svg>
            </button>
            <button 
              onClick={onNavigateToDocuments}
              className="px-12 py-5 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-bold text-xl rounded-2xl transition-all duration-300 flex items-center space-x-3 group backdrop-blur-lg bg-white/5"
            >
              <span className="group-hover:scale-110 transition-transform">📝</span>
              <span>Manage Interview Context</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20">
        <button
          onClick={onNavigateToDocuments}
          className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-green-500/25 backdrop-blur-lg border border-green-400/20 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          <span>Interview Context</span>
        </button>
        <button
          onClick={onNavigateToInterview}
          className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-500/25 backdrop-blur-lg border border-blue-400/20 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 8.71,16.5 10.13,16.5C11.55,16.5 12.73,17.38 13.15,18.28C12.55,18.73 11.84,19 11.08,19C10.32,19 9.58,18.73 9,18.28M6,16C7.1,16 8,15.1 8,14C8,12.9 7.1,12 6,12C4.9,12 4,12.9 4,14C4,15.1 4.9,16 6,16M11.07,12C12.84,12 14.21,13.15 14.66,14.78C13.81,15.55 12.61,16 11.29,16C10.32,16 9.38,15.75 8.55,15.32C8.85,14.24 9.83,13.38 11.07,13.38M11.07,11C9.93,11 9,10.07 9,8.93C9,7.79 9.93,6.86 11.07,6.86C12.21,6.86 13.14,7.79 13.14,8.93C13.14,10.07 12.21,11 11.07,11M16,14C16,15.1 16.9,16 18,16C19.1,16 20,15.1 20,14C20,12.9 19.1,12 18,12C16.9,12 16,12.9 16,14Z"/>
          </svg>
          <span>Interview Dashboard</span>
        </button>
      </div>
    </div>
  );
}

// Document Manager Page Component
function DocumentManagerPage({ 
  sessionId,
  onBackToHome 
}: { 
  sessionId: string;
  onBackToHome: () => void;
}) {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        let data: any;
        try {
          data = await fetchMainSession(sessionId);
        } catch {
          data = await fetchSession(sessionId);
        }
        if (cancelled) return;
        setResumeText(data.resume || '');
        setJobDescription(data.jobDescription || '');
        setAdditionalContext(data.additionalContext || '');
      } catch { }
    })();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-black/10 backdrop-blur-xl">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 backdrop-blur-lg bg-white/5 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                </svg>
                <span className="font-medium">Back to Home</span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Interview Context</h1>
                <p className="text-green-400 text-sm">Manage your interview materials</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-all duration-300 px-6 py-3 rounded-2xl border border-green-500/20 hover:border-green-400/40 backdrop-blur-lg bg-green-500/10 hover:bg-green-500/20 font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 mb-10">
          <div className="xl:col-span-3">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl shadow-green-500/5">
              <h2 className="text-3xl font-bold text-white mb-4">Manage Your Interview Materials</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Upload your resume, job description, and additional context to help BluePilot provide personalized and relevant interview assistance.
              </p>
              
              <Suspense fallback={<div className="h-96 bg-[#2a2a2a] rounded-2xl animate-pulse" />}>
                <DocumentManager
                  resumeText={resumeText}
                  jobDescription={jobDescription}
                  additionalContext={additionalContext}
                  onResumeUpdate={setResumeText}
                  onJobDescriptionUpdate={setJobDescription}
                  onAdditionalContextUpdate={setAdditionalContext}
                />
              </Suspense>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Tips Card */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-green-500/20 shadow-2xl shadow-green-500/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"/>
                  </svg>
                </div>
                Pro Tips
              </h3>
              <ul className="text-gray-400 text-base space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Upload a detailed resume for personalized responses</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Include the full job description for relevant answers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Add specific context about the company or role</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Update materials for different interview stages</span>
                </li>
              </ul>
            </div>

            {/* Status Card */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl shadow-blue-500/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
                  </svg>
                </div>
                Ready for Interview
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-lg">Resume</span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-medium ${resumeText ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                    {resumeText ? 'Uploaded' : 'Missing'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-lg">Job Description</span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-medium ${jobDescription ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                    {jobDescription ? 'Uploaded' : 'Missing'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-lg">Additional Context</span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-medium ${additionalContext ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                    {additionalContext ? 'Added' : 'Optional'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interview Dashboard Page Component
function InterviewDashboardPage({ 
  sessionId,
  onBackToHome 
}: { 
  sessionId: string;
  onBackToHome: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [interviewerSpeech, setInterviewerSpeech] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [sessionType, setSessionType] = useState<'live' | 'mock'>('live');

  const textToSpeechRef = useRef<TextToSpeechRef>(null);
  const responseControlsRef = useRef<{ getBuffer: () => string; clear: () => void } | null>(null);

  const { addQuestion, addResponse, conversations, clearHistory } = useConversation();
  const { isSharing, systemStream, stopShare, settings } = useInterviewState();

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        let data: any
        try {
          data = await fetchMainSession(sessionId)
        } catch {
          data = await fetchSession(sessionId)
        }
        if (cancelled) return;
        updateSession({ sessionId: sessionId || '', conversation_history: [] as any, status: 'active' })
        setResumeText(data.resume || '');
        setJobDescription(data.jobDescription || '');
        setAdditionalContext(data.additionalContext || '');
        try {
          const t = (data as any).type || 'live'
          setSessionType(t)
          try { (window as any).__MOCK_INTERVIEW__ = t === 'mock' } catch { }
        } catch { setSessionType('live') }
        try {
          await registerSessionToBackend({ sessionId, resume: data.resume, jobDescription: data.jobDescription, additionalContext: data.additionalContext, type: (data as any).type })
        } catch { }
      } catch { }
    })();
    return () => { cancelled = true };
  }, [sessionId]);

  useEffect(() => {
    if (!textToSpeechRef.current) return;
    if (isSharing) {
      textToSpeechRef.current.setMuted(true);
    } else {
      textToSpeechRef.current.setMuted(false);
    }
  }, [isSharing]);

  useEffect(() => {
    try { (window as any).__MOCK_INTERVIEW__ = sessionType === 'mock' } catch { }
    if (sessionType === 'mock') {
      try { if (isSharing) stopShare(); } catch { }
    }
  }, [sessionType, isSharing, stopShare]);

  const { segments, upsertTranscript } = useTranscriptBuffer();
  const lastThemFinalRef = useRef<{ text: string; at: number } | null>(null);
  const lastResponseRef = useRef<string>('');
  const lastUserAnswerRef = useRef<string>('');
  const lastMicSnapshotRef = useRef<string | null>(null);
  const mockStartedRef = useRef<boolean>(false);
  const normalize = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();
  
  const attribution = createAudioAttribution({
    isSystemActive: () => !!systemStream,
    systemBiasMs: 500,
    vadThreshold: 0.06,
  });

  useDeepgramLive({
    stream: systemStream || null,
    enabled: !!systemStream,
    onTranscript: ({ text, isFinal }) => {
      const { speaker } = attribution.classifySystem();
      upsertTranscript({ speaker, text, isFinal });
      if (isFinal) {
        lastThemFinalRef.current = { text: normalize(text), at: Date.now() };
      }
    },
  });

  useEffect(() => {
    if (!sessionId) return;
    const timer = window.setTimeout(() => {
      try {
        registerSessionToBackend({
          sessionId,
          resume: resumeText,
          jobDescription,
          additionalContext: additionalContext,
          type: sessionType,
        });
      } catch { }
    }, 300);
    return () => { try { window.clearTimeout(timer) } catch { } };
  }, [sessionId, resumeText, jobDescription, additionalContext, sessionType]);

  const seenDetectIdsRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    const socket = getSocket();
    const onDetected = (payload: { id: string; question: string; source: string }) => {
      try {
        const id = String(payload?.id || '');
        const q = String(payload?.question || '').trim();
        if (!id || !q) return;
        const seen = seenDetectIdsRef.current;
        if (seen.has(id)) return;
        seen.add(id);
        const extra = (() => { try { return responseControlsRef.current?.getBuffer?.() || '' } catch { return '' } })();
        const merged = `${q} ${extra}`.replace(/\s+/g, ' ').trim();
        try { responseControlsRef.current?.clear?.() } catch { }
        setCurrentQuestion(merged);
        addQuestion(merged);
      } catch { }
    };
    socket.on('detect:question', onDetected);
    return () => {
      try { socket.off('detect:question', onDetected) } catch { }
    };
  }, [addQuestion]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      try {
        const micLive = (window as any).__micLive as { text: string; isFinal: boolean } | undefined;
        if (!micLive || !micLive.text) return;
        const snapshot = JSON.stringify(micLive);
        if (snapshot === lastMicSnapshotRef.current) return;
        lastMicSnapshotRef.current = snapshot;
        const vad = (window as any).__micVAD as { rms?: number; ts?: number } | undefined;
        const { accept, speaker } = attribution.classifyMic({ isFinal: micLive.isFinal, rms: vad?.rms });
        if (!accept) return;
        
        if (isSharing && micLive.isFinal && lastThemFinalRef.current) {
          const nowTs = Date.now();
          const withinWindow = nowTs - lastThemFinalRef.current.at < 6000;
          const micNorm = normalize(micLive.text);
          const themNorm = lastThemFinalRef.current.text;
          const isDuplicate = withinWindow && (micNorm === themNorm || micNorm.includes(themNorm) || themNorm.includes(micNorm));
          if (isDuplicate) return;
        }
        
        upsertTranscript({ speaker, text: micLive.text, isFinal: micLive.isFinal });
        if (micLive.isFinal) {
          if (sessionType === 'mock') {
            const utterance = micLive.text;
            lastUserAnswerRef.current = utterance;
            try { upsertTranscript({ speaker: 'me', text: utterance, isFinal: true }) } catch { }
            (async () => {
              try {
                const q = await getNextMockQuestion(sessionId || '', utterance);
                if (q) {
                  setCurrentQuestion(q);
                  addQuestion(q);
                  try { upsertTranscript({ speaker: 'them', text: q, isFinal: true }) } catch { }
                  setInterviewerSpeech(q);
                }
              } catch { }
            })();
          } else {
            try {
              const socket = getSocket();
              socket.emit('claude:detect:utterance', {
                utterance: micLive.text,
                source: 'speech',
                sessionId: sessionId || undefined,
                context: {
                  verbosity: settings?.verbosity,
                  language: settings?.language,
                  temperature: settings?.temperature,
                  performance: settings?.performance,
                  additionalContext: additionalContext,
                },
              });
            } catch { }
          }
        }
      } catch { }
    }, 100);
    return () => { try { window.clearInterval(timer); } catch { } };
  }, [isSharing, attribution, upsertTranscript, sessionId, sessionType]);

  useEffect(() => {
    if (sessionType !== 'mock') { mockStartedRef.current = false; return }
    if (mockStartedRef.current) return
    mockStartedRef.current = true
        ; (async () => {
          try {
            const q = await getNextMockQuestion(sessionId || '', lastUserAnswerRef.current || undefined)
            if (q) {
              setCurrentQuestion(q)
              addQuestion(q)
              try { upsertTranscript({ speaker: 'them', text: q, isFinal: true }) } catch { }
              const greeting = "Hello, let's begin your mock interview. ";
              setInterviewerSpeech(`${greeting}${q}`)
            }
          } catch { }
        })()
  }, [sessionType, sessionId])

  const handleResponseGenerated = useCallback((response: string) => {
    const trimmed = (response || '').trim();
    setCurrentResponse(trimmed);
    if (!trimmed) return;
    if (lastResponseRef.current === trimmed) return;
    lastResponseRef.current = trimmed;
    addResponse(trimmed);
  }, [addResponse]);

  const handleSpeechStateChange = useCallback((_playing: boolean, muted: boolean) => {
    setIsMuted(muted);
  }, []);

  const handleMuteToggle = useCallback((muted: boolean) => {
    setIsMuted(muted);
    if (textToSpeechRef.current) {
      textToSpeechRef.current.setMuted(muted);
    }
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    try { return window.matchMedia('(min-width: 1024px)').matches } catch { return false }
  });
  const [splitPercent, setSplitPercent] = useState<number>(() => {
    try {
      const v = Number(localStorage.getItem('layout:splitPercent'));
      if (Number.isFinite(v) && v > 20 && v < 80) return v;
    } catch { }
    return 50;
  });

  useEffect(() => {
    let mql: MediaQueryList | null = null;
    try {
      mql = window.matchMedia('(min-width: 1024px)');
      const onChange = () => setIsDesktop(mql ? mql.matches : false);
      onChange();
      mql.addEventListener('change', onChange);
      return () => { try { mql && mql.removeEventListener('change', onChange) } catch { } };
    } catch { return }
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = (x / rect.width) * 100;
      const clamped = Math.max(20, Math.min(80, pct));
      setSplitPercent(clamped);
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      try { document.body.style.userSelect = ''; } catch { }
      try { localStorage.setItem('layout:splitPercent', String(splitPercent)) } catch { }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [splitPercent]);

  const onDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    try { document.body.style.userSelect = 'none' } catch { }
    e.preventDefault();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-black/10 backdrop-blur-xl">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 backdrop-blur-lg bg-white/5 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                </svg>
                <span className="font-medium">Back to Home</span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 8.71,16.5 10.13,16.5C11.55,16.5 12.73,17.38 13.15,18.28C12.55,18.73 11.84,19 11.08,19C10.32,19 9.58,18.73 9,18.28M6,16C7.1,16 8,15.1 8,14C8,12.9 7.1,12 6,12C4.9,12 4,12.9 4,14C4,15.1 4.9,16 6,16M11.07,12C12.84,12 14.21,13.15 14.66,14.78C13.81,15.55 12.61,16 11.29,16C10.32,16 9.38,15.75 8.55,15.32C8.85,14.24 9.83,13.38 11.07,13.38M11.07,11C9.93,11 9,10.07 9,8.93C9,7.79 9.93,6.86 11.07,6.86C12.21,6.86 13.14,7.79 13.14,8.93C13.14,10.07 12.21,11 11.07,11M16,14C16,15.1 16.9,16 18,16C19.1,16 20,15.1 20,14C20,12.9 19.1,12 18,12C16.9,12 16,12.9 16,14Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Interview Dashboard</h1>
                <p className="text-blue-300 text-sm">Real-time interview assistance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-2xl text-sm font-medium backdrop-blur-lg border ${sessionType === 'live' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'}`}>
                {sessionType === 'live' ? 'Live Interview' : 'Mock Interview'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          {/* Left Column - Wider */}
          <div
            className="space-y-8 pr-2 min-w-[400px] lg:max-w-[900px] h-[calc(100vh-180px)] flex flex-col justify-between"
            style={isDesktop ? { flex: `0 0 ${splitPercent}%` } : { width: '100%' }}
          >
            <Suspense fallback={<div className="h-80 bg-[#2a2a2a] rounded-3xl animate-pulse" />}>
              <ScreenSharePreview
                isMock={sessionType === 'mock'}
                onLeaveCall={async () => {
                  try {
                    const history: { role: 'user' | 'interviewer'; content: string }[] = conversations.map((c) => {
                      if (c.type === 'question') return { role: 'interviewer', content: c.content } as const
                      if (c.type === 'response') return { role: 'user', content: c.content } as const
                      return null as any
                    }).filter(Boolean) as any
                    await updateSession({ sessionId: sessionId || '', conversation_history: history as any, status: 'active' })
                  } catch { } finally {
                    // try { navigate('/live-interview', { replace: true }) } catch { }
                  }
                }}
                onEndCall={async () => {
                  try {
                    const history: { role: 'user' | 'interviewer'; content: string }[] = conversations.map((c) => {
                      if (c.type === 'question') return { role: 'interviewer', content: c.content } as const
                      if (c.type === 'response') return { role: 'user', content: c.content } as const
                      return null as any
                    }).filter(Boolean) as any
                    await updateSession({ sessionId: sessionId || '', conversation_history: history as any, status: 'completed' })
                  } catch { } finally {
                    // try { navigate('/live-interview', { replace: true }) } catch { }
                  }
                }}
              />
            </Suspense>

            <Suspense fallback={<div className="h-80 bg-[#2a2a2a] rounded-3xl animate-pulse" />}>
              <LiveTranscript segments={segments} />
            </Suspense>

            <Suspense fallback={null}>
              <TextToSpeech
                ref={textToSpeechRef}
                text={sessionType === 'mock' ? interviewerSpeech : currentResponse}
                autoPlay={true}
                onStateChange={handleSpeechStateChange}
              />
            </Suspense>
          </div>

          {isDesktop && (
            <div
              className="hidden lg:block w-3 cursor-col-resize bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-lg mx-2"
              onMouseDown={onDragStart}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize panels"
            />
          )}

          {/* Right Column - Wider */}
          <div
            className="space-y-8 pl-2 lg:h-[calc(100vh-180px)] flex flex-col justify-between"
            style={isDesktop ? { flex: `1 1 ${100 - splitPercent}%` } : { width: '100%' }}
          >
            <Suspense fallback={<div className="h-full bg-[#2a2a2a] rounded-3xl animate-pulse" />}>
              <InterviewCopilotPanel
                conversations={conversations}
                onClearHistory={clearHistory}
                question={currentQuestion}
                onResponseGenerated={handleResponseGenerated}
                resumeText={resumeText}
                jobDescription={jobDescription}
                additionalContext={additionalContext}
                sessionId={sessionId || undefined}
                onMuteToggle={handleMuteToggle}
                isMuted={isMuted}
                onManualQuestionSubmit={(q) => {
                  setCurrentQuestion(q);
                  addQuestion(q);
                }}
                sessionType={sessionType}
                setSessionType={setSessionType}
                liveSegments={segments}
                onProvideControls={(controls) => { responseControlsRef.current = controls; }}
              />
            </Suspense>
            
            {sessionType === 'mock' && (
              <div className="flex items-center gap-3">
                <button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 font-medium"
                  onClick={async () => {
                    try {
                      const q = await getNextMockQuestion(sessionId || '', lastUserAnswerRef.current || undefined)
                      if (q) {
                        setCurrentQuestion(q)
                        addQuestion(q)
                        try { upsertTranscript({ speaker: 'them', text: q, isFinal: true }) } catch { }
                        const greeting = "Hello, let's begin your mock interview. ";
                        const firstStart = !currentQuestion;
                        setInterviewerSpeech(firstStart ? `${greeting}${q}` : q)
                      }
                    } catch { }
                  }}
                >
                  {currentQuestion ? 'Next Question' : 'Start Mock Interview'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main InterviewDashboard Component with Navigation
function InterviewDashboard({ sessionId }: { sessionId: string }) {
  const [currentPage, setCurrentPage] = useState<'home' | 'documents' | 'interview'>('home');

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigateToInterview={() => setCurrentPage('interview')}
            onNavigateToDocuments={() => setCurrentPage('documents')}
          />
        );
      case 'documents':
        return (
          <DocumentManagerPage 
            sessionId={sessionId}
            onBackToHome={() => setCurrentPage('home')}
          />
        );
      case 'interview':
        return (
          <InterviewDashboardPage 
            sessionId={sessionId}
            onBackToHome={() => setCurrentPage('home')}
          />
        );
      default:
        return (
          <HomePage 
            onNavigateToInterview={() => setCurrentPage('interview')}
            onNavigateToDocuments={() => setCurrentPage('documents')}
          />
        );
    }
  };

  return renderPage();
}

export default InterviewDashboard;
