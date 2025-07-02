import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CandidatePersonaProfile } from '../lib/gemini.service';

interface LocationState {
  profile?: CandidatePersonaProfile;
}

const PortfolioPage: React.FC = () => {
  const { state } = useLocation();
  const { profile } = (state || {}) as LocationState;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-4">
      <h1 className="text-3xl font-bold">Full Candidate Portfolio</h1>

      {profile ? (
        <pre className="bg-slate-800 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(profile, null, 2)}
        </pre>
      ) : (
        <p>No profile data provided.</p>
      )}

      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Back
      </Link>
    </div>
  );
};

export default PortfolioPage; 