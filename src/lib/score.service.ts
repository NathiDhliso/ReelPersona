import { CandidatePersonaProfile } from './gemini.service';

export interface ScoreBreakdown {
  projects: number; // 0–500
  persona: number;  // 0–200
  credentials: number; // 0–150
  experience: number; // 0–100
  continuousLearning: number; // 0–50
}

export interface ReelPassScore {
  total: number; // 0–1000
  breakdown: ScoreBreakdown;
  level: string;
}

export const calculateReelPassScore = (
  personaProfile: CandidatePersonaProfile | null,
  other?: Partial<ScoreBreakdown>,
): ReelPassScore => {
  // Default zeros for components not yet implemented
  const breakdown: ScoreBreakdown = {
    projects: other?.projects ?? 0,
    persona: other?.persona ?? (personaProfile ? 200 : 0),
    credentials: other?.credentials ?? 0,
    experience: other?.experience ?? 0,
    continuousLearning: other?.continuousLearning ?? 0,
  };

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  const level = (() => {
    if (total >= 800) return 'Expert Professional';
    if (total >= 600) return 'Skilled Professional';
    if (total >= 400) return 'Competent Professional';
    if (total >= 200) return 'Emerging Professional';
    return 'Aspiring Professional';
  })();

  return { total, breakdown, level };
}; 