import React from 'react';
import { Link } from 'react-router-dom';

const SchedulePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-4">
      <h1 className="text-3xl font-bold">Schedule Follow-up</h1>
      <p>Integration with calendar/booking system will go here.</p>
      <p className="text-gray-400">(Feature coming soon)</p>

      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Back
      </Link>
    </div>
  );
};

export default SchedulePage; 