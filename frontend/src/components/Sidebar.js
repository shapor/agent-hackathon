import React, { useState, useEffect } from 'react';
import agents from '../assets/agents.jpg'; // Your standard logo

export default function Sidebar({ companies, onCompanyClick }) {
  const [currentCompany, setCurrentCompany] = useState('');

  return (
    <div className="flex flex-col w-64 bg-gray-900 h-screen px-6">
      {/* Logo Section */}
      <div className="flex h-16 shrink-0 items-center mb-4 mt-6 justify-center">
        <img
          className="h-12 w-auto"
          src={agents} // Standard logo for all companies
          alt="Logo"
        />
      </div>

      {/* Heading Section */}
      <div className="min-w-0 mb-4">
        <h2 className="text-center text-xl font-bold text-white leading-tight break-words">
          Marketing <br /> Analysis Reports
        </h2>
      </div>

      {/* Company List */}
      <nav className="flex flex-1 flex-col overflow-y-auto">
        <ul role="list" className="flex flex-1 flex-col gap-y-4 list-none p-0">
          {companies.map((company) => (
            <li key={company._id}>
              <button
                onClick={() => {
                  setCurrentCompany(company.company_name);
                  onCompanyClick(company.company_name); // Pass company name to parent
                }}
                className={`w-full ${
                  currentCompany === company.company_name
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } group flex gap-x-3 items-center rounded-md py-2 px-4 text-m font-semibold leading-8`}
              >
                {/* Standard logo or icon */}
                <img src={agents} alt="Logo" className="h-6 w-6" />
                {company.company_name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
