import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const ResultsPage = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(''); // Holds the HTML template

  // Fetch all companies from the Flask API on page load
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/companies')
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => console.error('Error fetching companies:', error));
  }, []);

  // Function to handle clicking on a company name in the sidebar
  const handleCompanyClick = (companyName) => {
    setSelectedCompany(companyName);

    // Fetch the template data from the Flask API for the selected company
    fetch(`http://127.0.0.1:5000/api/company/${companyName}`) // Assuming you have an API route for fetching templates by company name
      .then((response) => response.json())
      .then((data) => {
        setSelectedMessage(data.Template); // Assuming `Template` contains the HTML content
      })
      .catch((error) => console.error('Error fetching company template:', error));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar companies={companies} onCompanyClick={handleCompanyClick} />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        <div className="bg-white shadow-md p-8 rounded-lg text-black">
          {/* Render the selected company's HTML template */}
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
