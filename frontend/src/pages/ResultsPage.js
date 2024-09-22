import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ResultsPage = () => {
  const location = useLocation(); // Get the passed state from navigation
  const { message } = location.state || {};

  // List of company names to display in the sidebar
  const companies = ['Company A', 'Company B', 'Company C'];
  
  // State to hold the selected company name and its profile
  const [selectedCompany, setSelectedCompany] = useState('R&L Plumbing');
  const [selectedMessage, setSelectedMessage] = useState(message);

  // Mock function to simulate changing the profile based on the selected company
  const handleCompanyClick = (company) => {
    setSelectedCompany(company);

    // You could replace this with logic to fetch the actual data for each company
    setSelectedMessage(`Here is the sentiment and profile data for ${company}. This is just a placeholder.`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar companies={companies} onCompanyClick={handleCompanyClick} />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        {/* <h2 className="text-3xl font-bold mb-8 text-center">
             Profile and Sentiment
        </h2> */}

        <div className="bg-white shadow-md p-8 rounded-lg text-black">
          {/* Render HTML safely using dangerouslySetInnerHTML */}
          <div
            className="html-content"
            dangerouslySetInnerHTML={{ __html: selectedMessage }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
