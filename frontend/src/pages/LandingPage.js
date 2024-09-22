import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartBarIcon, ShieldCheckIcon, LightningBoltIcon } from '@heroicons/react/solid';
import logo from '../assets/agents.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white">
      <header className="flex items-center justify-between p-6">
        <img src={logo} alt="Logo" className="h-20 w-auto" />
      </header>

      <div className="flex items-center justify-center">
        <div className="max-w-4xl p-8">
          <h1 className="text-5xl font-bold mb-4">
            Automate Your Client Risk Analysis with AI
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Save time and improve decision-making with our AI-driven solution for automating client risk investigations before signing pay-for-performance contracts.
          </p>

          <div className="mb-12">
            <button 
              onClick={handleGetStarted} 
              className="bg-teal-400 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-full font-bold text-lg"
            >
              Get Started
            </button>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="flex items-start space-x-4">
              <div className="bg-teal-500 p-2 rounded-full">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Automated Ads Pipeline Analysis</h3>
                <p className="text-gray-400">
                  Our AI analyzes your client's existing ads pipeline, uncovering patterns and predicting future performance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-teal-500 p-2 rounded-full">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Comprehensive Risk Assessment</h3>
                <p className="text-gray-400">
                  Our AI evaluates historical performance and calculates the risks associated with pay-for-performance contracts.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-teal-500 p-2 rounded-full">
                <LightningBoltIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Instant Reports</h3>
                <p className="text-gray-400">
                  Get real-time reports and insights about your potential clients' performance metrics and risks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
