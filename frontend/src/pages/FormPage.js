
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // To navigate to the results page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Mock request to backend
    const formData = {
      company_name: companyName,
      company_url: companyUrl,
      inquiry_text: inquiry,
    };

    try {
      const res = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // Navigate to the results page, passing the response data
      navigate('/results', { state: { message: data.message } });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Tell Us About Your Company</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <label htmlFor="companyUrl" className="block text-sm font-medium text-gray-300">Company URL</label>
            <input
              type="text"
              id="companyUrl"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
              placeholder="Enter your company URL"
              required
            />
          </div>

          <div>
            <label htmlFor="inquiry" className="block text-sm font-medium text-gray-300">Anything specific you'd like to know?</label>
            <textarea
              id="inquiry"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
              placeholder="Let us know any specific details..."
              rows="4"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-teal-400 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-full font-bold text-lg w-full ${isLoading && 'opacity-50'}`}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
