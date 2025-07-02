import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TrendingUp,
  Target,
  Award,
  ExternalLink,
  Volume2,
  Loader,
  CheckCircle
} from 'lucide-react';
import { type CandidatePersonaProfile } from '../lib/gemini.service';
import { 
  initializeElevenLabs, 
  getElevenLabsService 
} from '../lib/elevenlabs.service';
import { fetchAssessments, deleteAssessment } from '../lib/assessment.service';
import { useAuthStore } from '../lib/auth';
import styles from './Dashboard.module.css';

interface DashboardProps {
  profile?: CandidatePersonaProfile | null;
  justCause?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  profile: propProfile, 
  justCause = "To empower individuals and organizations to discover and live their purpose" 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  
  // Get profile from props, location state, or localStorage
  const [profile, setProfile] = useState<CandidatePersonaProfile | null>(() => {
    if (propProfile) return propProfile;
    if (location.state?.profile) return location.state.profile;
    
    const saved = localStorage.getItem('reelPersona_latestResults');
    return saved ? JSON.parse(saved) : null;
  });

  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Voice settings for speaking results
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [elevenLabsInitialized, setElevenLabsInitialized] = useState(false);
  const [voiceSettings] = useState({
    enabled: true,
    voiceId: 'ErXwobaYiN019PkySvjV'
  });

  // Initialize ElevenLabs
  useEffect(() => {
    const initVoiceService = async () => {
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      
      if (!apiKey) return;

      try {
        initializeElevenLabs(apiKey);
        setElevenLabsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize ElevenLabs:', error);
      }
    };

    initVoiceService();
  }, []);

  // Load assessment history
  useEffect(() => {
    const loadHistory = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchAssessments(user.id);
        setHistory(data);
      } catch (error) {
        console.error('Failed to load assessment history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [user]);

  const speakText = async (text: string) => {
    if (!elevenLabsInitialized || !voiceSettings.enabled) return;

    try {
      setIsSpeaking(true);
      setIsVoiceLoading(true);
      
      const service = getElevenLabsService();
      const audioBuffer = await service.generateSpeech(text, voiceSettings.voiceId, {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.5,
        use_speaker_boost: true
      });

      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      setIsVoiceLoading(false);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        setIsVoiceLoading(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('Speech synthesis failed:', error);
      setIsSpeaking(false);
      setIsVoiceLoading(false);
    }
  };

  const handleDeleteAssessment = async (assessmentId: string) => {
    try {
      await deleteAssessment(assessmentId);
      setHistory(prev => prev.filter(h => h.id !== assessmentId));
    } catch (error) {
      console.error('Failed to delete assessment:', error);
    }
  };

  const handleViewAssessment = (assessment: any) => {
    setProfile(assessment.profile);
    // Update localStorage with the viewed profile
    localStorage.setItem('reelPersona_latestResults', JSON.stringify(assessment.profile));
  };

  // Calculate stats
  const stats = history.length > 0 ? {
    total: history.length,
    avg: Math.round(history.reduce((a, b) => a + (b.score_total || 0), 0) / history.length),
    best: Math.max(...history.map(h => h.score_total || 0))
  } : null;

  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loading}>
          <Loader size={32} className="animate-spin" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContent}>
        {/* Stats Section */}
        {stats && (
          <div className={styles.statsSection}>
            <div className={styles.stat}>
              <div className={styles.statTitle}>Assessments</div>
              <div className={styles.statValue}>{stats.total}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statTitle}>Avg Score</div>
              <div className={styles.statValue}>{stats.avg}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statTitle}>Best Score</div>
              <div className={styles.statValue}>{stats.best}</div>
            </div>
          </div>
        )}

        {/* Assessment History */}
        {history.length > 0 && (
          <div className={styles.historySection}>
            <h3>Past Assessments</h3>
            {history.map(assessment => (
              <div key={assessment.id} className={styles.historyItem}>
                <span>{new Date(assessment.created_at || '').toLocaleDateString()}</span>
                <span>{assessment.score_total ?? 0} pts</span>
                <div>
                  <button 
                    className={styles.optionButton} 
                    onClick={() => handleViewAssessment(assessment)}
                  >
                    View
                  </button>
                  <button 
                    className={styles.optionButton} 
                    onClick={() => handleDeleteAssessment(assessment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile Results */}
        {profile ? (
          <div className={styles.resultsSection}>
            <div className={styles.resultsHeader}>
              <h2>Candidate Persona Profile</h2>
              {voiceSettings.enabled && elevenLabsInitialized && (
                <button
                  className={styles.speakResultsButton}
                  onClick={() => speakText(`Here's your comprehensive personality analysis. ${profile.alignmentSummary}`)}
                  disabled={isSpeaking || isVoiceLoading}
                  title="Listen to Sensa's results summary"
                >
                  {isSpeaking || isVoiceLoading ? <Loader size={20} className="animate-spin" /> : <Volume2 size={20} />}
                  {isSpeaking || isVoiceLoading ? 'Loading...' : 'Listen to Sensa'}
                </button>
              )}
            </div>

            <div className={styles.saveStatus}>
              <CheckCircle className={styles.saveStatusIcon} size={20} />
              <div className={styles.saveStatusText}>
                <strong>Analysis Complete!</strong>
                <br />Professional personality assessment by Sensa with voice interaction.
              </div>
            </div>

            <div className={styles.summarySection}>
              <h3>Core Purpose & Values</h3>
              <p><strong>Stated WHY:</strong> {profile.statedWhy}</p>
              <p><strong>Observed HOW:</strong> {profile.observedHow.join(', ')}</p>
              <p><strong>Coherence Score:</strong> {profile.coherenceScore}</p>
              <p><strong>Trust Index:</strong> {profile.trustIndex}</p>
              <p><strong>Dominant Conflict Style:</strong> {profile.dominantConflictStyle}</p>
            </div>

            <div className={styles.traitsSection}>
              <h3>Emotional Intelligence Assessment</h3>
              <div className={styles.traits}>
                <div className={styles.trait}>
                  <div className={styles.traitHeader}>
                    <span className={styles.traitName}>Self-Awareness</span>
                  </div>
                  <div className={styles.traitLabel}>{profile.eqSnapshot.selfAwareness}</div>
                </div>
                <div className={styles.trait}>
                  <div className={styles.traitHeader}>
                    <span className={styles.traitName}>Self-Management</span>
                  </div>
                  <div className={styles.traitLabel}>{profile.eqSnapshot.selfManagement}</div>
                </div>
                <div className={styles.trait}>
                  <div className={styles.traitHeader}>
                    <span className={styles.traitName}>Social Awareness</span>
                  </div>
                  <div className={styles.traitLabel}>{profile.eqSnapshot.socialAwareness}</div>
                </div>
                <div className={styles.trait}>
                  <div className={styles.traitHeader}>
                    <span className={styles.traitName}>Relationship Management</span>
                  </div>
                  <div className={styles.traitLabel}>{profile.eqSnapshot.relationshipManagement}</div>
                </div>
              </div>
            </div>

            <div className={styles.insightsSection}>
              <div className={styles.strengths}>
                <h3><TrendingUp size={20} />Green Flags</h3>
                <ul>
                  {(profile.keyQuotationsAndBehavioralFlags?.greenFlags ?? []).map((flag, index) => (
                    <li key={index}>{flag}</li>
                  ))}
                </ul>
              </div>

              {(profile.keyQuotationsAndBehavioralFlags?.redFlags ?? []).length > 0 && (
                <div className={styles.growthAreas}>
                  <h3><Target size={20} />Red Flags</h3>
                  <ul>
                    {(profile.keyQuotationsAndBehavioralFlags?.redFlags ?? []).map((flag, index) => (
                      <li key={index}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.integrationSection}>
              <h3><Award size={24} />Organizational Alignment</h3>
              <p>{profile.alignmentSummary}</p>
              
              <div className={styles.actionButtons}>
                <button
                  className={styles.primaryButton}
                  onClick={() => navigate('/portfolio', { state: { profile } })}
                >
                  <ExternalLink size={20} />
                  View Full Portfolio
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate('/download', { state: { profile } })}
                >
                  Download Report
                </button>
                <button
                  className={styles.tertiaryButton}
                  onClick={() => navigate('/schedule', { state: { profile } })}
                >
                  Schedule Follow-up
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate('/')}
                >
                  Take New Assessment
                </button>
              </div>

              <div className={styles.integrationNote}>
                <p><strong>Assessment Framework:</strong> This analysis was conducted by Sensa using Simon Sinek's Golden Circle methodology with voice interaction capabilities.</p>
                <p><strong>Just Cause Alignment:</strong> Evaluated against the organization's purpose: "{justCause}"</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>No Assessment Results</h3>
            <p>Complete an assessment to view your personality profile and insights.</p>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/')}
            >
              Take Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 