// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const ResultsPage = () => {
//   const location = useLocation(); // Get the passed state from navigation
//   const { message } = location.state || {}; // Destructure message from state

//   return (
//     <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white flex items-center justify-center">
//       <div className="max-w-2xl w-full p-8 bg-gray-800 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold mb-8 text-center">Company Profile and Sentiment</h2>

//         <div className="bg-gray-700 p-6 rounded-lg text-white">
//           <p className="text-lg">{message ? message : 'No data available.'}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar.js';

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
    <div className="flex">
      {/* Sidebar */}
      <Sidebar companies={companies} onCompanyClick={handleCompanyClick} />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-800 p-8 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {selectedCompany} Profile and Sentiment
        </h2>

        <div className="bg-gray-700 p-6 rounded-lg text-white">
          <p className="text-lg">{selectedMessage ? selectedMessage : 'No data available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
