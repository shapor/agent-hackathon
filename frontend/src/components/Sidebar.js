import React, { useState } from 'react';
import agents from '../assets/agents.jpg'; // Your standard logo

// Array of company names
const companies = [
  { id: 1, name: 'Company A' },
  { id: 2, name: 'Company B' },
  { id: 3, name: 'Company C' },
  { id: 4, name: 'Company D' },
  { id: 5, name: 'Company E' },
];

export default function Sidebar() {
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
        <ul role="list" className="flex flex-1 flex-col gap-y-4">
          {companies.map((company) => (
            <li key={company.id}>
              <button
                onClick={() => setCurrentCompany(company.name)}
                className={`w-full ${
                  currentCompany === company.name
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } group flex gap-x-3 items-center rounded-md py-2 px-4 text-sm font-semibold leading-6`}
              >
                {/* Standard logo or icon */}
                <img src={agents} alt="Logo" className="h-6 w-6" />
                {company.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
