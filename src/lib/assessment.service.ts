import { CandidatePersonaProfile } from './gemini.service';
import { getSupabaseClient } from './auth';
import type { Database } from '../types/supabase';
import { calculateReelPassScore } from './score.service';

type AssessmentsTable = Database['public']['Tables']['assessments'];
type AssessmentInsert = AssessmentsTable['Insert'];
type AssessmentUpdate = AssessmentsTable['Update'];

export const saveAssessment = async (
  profile: CandidatePersonaProfile,
  userId: string,
): Promise<void> => {
  const supabase = getSupabaseClient();

  const score = calculateReelPassScore(profile);
  const payload: any = {
    user_id: userId,
    profile,
    score_total: score.total,
    score_breakdown: score.breakdown,
    score_level: score.level,
  } as any;

  const { error } = await supabase.from('assessments').insert(payload);

  if (error) {
    console.error('❌ Failed to save assessment:', error);
    throw error;
  }
};

export const fetchAssessments = async (userId: string) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as AssessmentsTable['Row'][];
};

export const deleteAssessment = async (id: string) => {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('assessments').delete().eq('id', id);
  if (error) throw error;
};

export const updateAssessment = async (
  id: string,
  profile: CandidatePersonaProfile,
) => {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('assessments')
    .update({ profile: profile as unknown as AssessmentUpdate['profile'] })
    .eq('id', id);
  if (error) throw error;
}; 