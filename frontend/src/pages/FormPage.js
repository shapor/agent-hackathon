import React, { useState } from 'react';

const FormPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [inquiry, setInquiry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log({ companyName, companyUrl, inquiry });
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Tell Us About Your Company</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
              placeholder="Enter your company name"
              required
            />
          </div>

          {/* Company URL */}
          <div>
            <label htmlFor="companyUrl" className="block text-sm font-medium text-gray-300">Company URL</label>
            <input
              type="url"
              id="companyUrl"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
              placeholder="Enter your company URL"
              required
            />
          </div>

          {/* Inquiry */}
          <div>
            <label htmlFor="inquiry" className="block text-sm font-medium text-gray-300">Anything specific you'd like to know? (Optional)</label>
            <textarea
              id="inquiry"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
              placeholder="Let us know any specific details..."
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-teal-400 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-full font-bold text-lg w-full"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
