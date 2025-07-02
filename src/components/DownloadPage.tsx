import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CandidatePersonaProfile } from '../lib/gemini.service';

interface LocationState {
  profile?: CandidatePersonaProfile;
}

const DownloadPage: React.FC = () => {
  const { state } = useLocation();
  const { profile } = (state || {}) as LocationState;

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(profile || {}, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reelpersona-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-4">
      <h1 className="text-3xl font-bold">Download Report</h1>
      <p>This is a simple placeholder that lets you download the raw analysis as JSON.</p>

      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Download JSON
      </button>

      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Back
      </Link>
    </div>
  );
};

export default DownloadPage; 