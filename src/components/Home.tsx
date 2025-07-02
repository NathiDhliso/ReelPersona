import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  MessageCircle, 
  Mic, 
  Send, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle, 
  Lock,
  User,
  Briefcase,
  Target,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Award,
  ExternalLink,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Sparkles,
  Settings,
  AlertTriangle,
  Loader,
  MicIcon,
  X,
  TestTube
} from 'lucide-react';
import { 
  generateAIResponse, 
  generatePersonalityAnalysis, 
  type ConversationContext, 
  type CandidatePersonaProfile,
  type AIResponse 
} from '../lib/gemini.service';
import { 
  initializeElevenLabs, 
  getElevenLabsService, 
  type ElevenLabsVoice,
  type VoiceSettings as ElevenLabsVoiceSettings
} from '../lib/elevenlabs.service';
import {
  initializeWakeWordService,
  getWakeWordService,
  type WakeWordConfig,
  type WakeWordCallbacks
} from '../lib/wake-word.service';
import { type ConflictStyle } from '../lib/simulation';
import styles from './ReelPersona.module.css';
import { useNavigate } from 'react-router-dom';
import { saveAssessment } from '../lib/assessment.service';
import { useAuthStore } from '../lib/auth';
import { calculateReelPassScore } from '../lib/score.service';

// Types
interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  isPlaying?: boolean;
  options?: string[];
  expectsInput?: 'text' | 'choice';
  metadata?: any;
  simulationData?: {
    openingScene: string;
    prompt: string;
    choices: { text: string; style: ConflictStyle }[];
  };
}

interface UserProfile {
  firstName: string;
  lastName: string;
  currentRole: string;
  company: string;
  industry: string;
  whyStatement?: string;
  howValues?: string[];
  answers: Record<string, any>;
}

interface VoiceSettings {
  enabled: boolean;
  autoPlay: boolean;
  voiceId: string;
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
  wakeWordEnabled: boolean;
  voiceSpeed: number;
  voiceVolume: number;
}

const Home: React.FC = () => {
  // State management
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isWakeWordActive, setIsWakeWordActive] = useState(false);
  const [isInConversation, setIsInConversation] = useState(false);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'chat'>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    currentRole: '',
    company: '',
    industry: '',
    answers: {}
  });
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    stage: 'intro',
    userProfile: {
      answers: {}
    },
    conversationHistory: []
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // ElevenLabs voice state
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    autoPlay: true,
    voiceId: 'ErXwobaYiN019PkySvjV', // Antoni - deep, calming voice
    stability: 0.75,
    similarityBoost: 0.75,
    style: 0.5,
    useSpeakerBoost: true,
    wakeWordEnabled: true,
    voiceSpeed: 1.0,
    voiceVolume: 0.8
  });
  const [availableVoices, setAvailableVoices] = useState<ElevenLabsVoice[]>([]);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [elevenLabsInitialized, setElevenLabsInitialized] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [wakeWordStatus, setWakeWordStatus] = useState<string>('');
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const pendingSpeechRef = useRef<string>('');

  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Initialize ElevenLabs
  useEffect(() => {
    const initVoiceService = async () => {
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        setVoiceError('ElevenLabs API key not found. Please add VITE_ELEVENLABS_API_KEY to your .env file.');
        return;
      }

      try {
        const service = initializeElevenLabs(apiKey);
        const voices = await service.getVoices();
        setAvailableVoices(voices);
        setElevenLabsInitialized(true);
        setVoiceError(null);
      } catch (error) {
        console.error('Failed to initialize ElevenLabs:', error);
        setVoiceError('Failed to connect to ElevenLabs. Please check your API key.');
      }
    };

    initVoiceService();
  }, []);

  // Initialize wake word detection
  useEffect(() => {
    if (!voiceSettings.wakeWordEnabled) return;

    const wakeWordConfig: WakeWordConfig = {
      wakeWord: 'hey sensa',
      threshold: 0.6, // Lowered threshold for better detection
      continuous: true,
      language: 'en-US'
    };

    const callbacks: WakeWordCallbacks = {
      onWakeWordDetected: () => {
        console.log('🎉 COMPONENT: Hey Sensa detected!');
        setIsInConversation(true);
        setWakeWordStatus('🎤 Listening... Say your message now');
        
        // Provide audio feedback
        if (elevenLabsInitialized && voiceSettings.enabled) {
          speakText("Yes, I'm listening. How can I help you?");
        }
        
        // Auto-start conversation if not already in one
        if (currentStep === 'welcome') {
          startConversation();
        }
      },
      onListening: () => {
        setIsListening(true);
        setWakeWordStatus('🎤 Listening for "Hey Sensa"...');
      },
      onNotListening: () => {
        setIsListening(false);
        setWakeWordStatus('');
      },
      onSpeechRecognized: (transcript: string) => {
        console.log('🎤 COMPONENT: Speech recognized:', transcript);
        setWakeWordStatus('');
        
        if (transcript.trim() && currentStep === 'chat') {
          // Auto-submit the recognized speech
          processUserInput(transcript.trim());
        }
      },
      onError: (error: string) => {
        console.error('🔴 COMPONENT: Wake word error:', error);
        setWakeWordStatus(`❌ Error: ${error}`);
        setIsListening(false);
      }
    };

    // Initialize wake word service
    initializeWakeWordService(wakeWordConfig, callbacks);

    return () => {
      // Cleanup wake word service
      const service = getWakeWordService();
      if (service) {
        service.stopListening();
      }
    };
  }, [voiceSettings.wakeWordEnabled, currentStep, elevenLabsInitialized, voiceSettings.enabled]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Auto-scroll to bottom on new messages with a slight delay for smooth UX
  useEffect(() => {
    if (chatMessages.length > 0) {
      setTimeout(() => {
        if (chatMessagesRef.current) {
          chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [chatMessages]);

  // Voice synthesis
  const speakText = async (text: string, messageId?: string) => {
    if (!elevenLabsInitialized || !voiceSettings.enabled) return;

    try {
      setIsSpeaking(true);
      setIsVoiceLoading(true);
      
      const service = getElevenLabsService();
      const audioBuffer = await service.generateSpeech(
        text, 
        voiceSettings.voiceId,
        {
          stability: voiceSettings.stability,
          similarity_boost: voiceSettings.similarityBoost,
          style: voiceSettings.style,
          use_speaker_boost: voiceSettings.useSpeakerBoost
        }
      );

      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.playbackRate = voiceSettings.voiceSpeed;
      audio.volume = voiceSettings.voiceVolume;
      
      setIsVoiceLoading(false);
      
      if (messageId) {
        setChatMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isPlaying: true } : { ...msg, isPlaying: false }
        ));
      }
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        if (messageId) {
          setChatMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
        }
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        setIsVoiceLoading(false);
        URL.revokeObjectURL(audioUrl);
        if (messageId) {
          setChatMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
        }
      };
      
      await audio.play();
    } catch (error) {
      console.error('Speech synthesis failed:', error);
      setIsSpeaking(false);
      setIsVoiceLoading(false);
    }
  };

  const stopSpeech = () => {
    // This is a simplified version - in a full implementation, 
    // you'd track the audio element and stop it
    setIsSpeaking(false);
    setIsVoiceLoading(false);
    setChatMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
  };

  // Voice control methods
  const toggleVoice = () => {
    setVoiceSettings(prev => ({ ...prev, enabled: !prev.enabled }));
    if (isSpeaking) stopSpeech();
  };

  const toggleAutoPlay = () => {
    setVoiceSettings(prev => ({ ...prev, autoPlay: !prev.autoPlay }));
  };

  const toggleWakeWord = () => {
    setVoiceSettings(prev => ({ ...prev, wakeWordEnabled: !prev.wakeWordEnabled }));
    
    const service = getWakeWordService();
    if (service) {
      if (voiceSettings.wakeWordEnabled) {
        service.stopListening();
        setWakeWordStatus('');
        setIsListening(false);
      } else {
        service.startListening();
      }
    }
  };

  const updateVoiceSettings = (updates: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...updates }));
  };

  const testVoice = async (voiceId?: string) => {
    setIsTestingVoice(true);
    try {
      const testText = "Hello! This is how I sound. I'm Sensa, your AI personality analyst.";
      await speakText(testText);
    } catch (error) {
      console.error('Voice test failed:', error);
    } finally {
      setIsTestingVoice(false);
    }
  };

  const getRecommendedVoices = () => {
    return [
      { voice_id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', description: 'Deep, calming voice ideal for thoughtful discussions' },
      { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', description: 'Warm and engaging, perfect for professional conversations' },
      { voice_id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', description: 'Authoritative yet warm, great for professional guidance' },
      { voice_id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', description: 'Deep, professional tone perfect for personality analysis' },
      { voice_id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', description: 'Calm and reassuring, excellent for creating safe spaces' },
      { voice_id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', description: 'Professional and clear, ideal for business conversations' }
    ];
  };

  // Chat functionality
  const addMessage = (content: string, type: 'user' | 'ai' | 'system', options?: string[], expectsInput?: any, metadata?: any, simulationData?: any) => {
    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content,
      timestamp: new Date(),
      options,
      expectsInput,
      metadata,
      simulationData
    };

    setChatMessages(prev => [...prev, message]);

    // Auto-play AI messages
    if (type === 'ai' && voiceSettings.enabled && voiceSettings.autoPlay && elevenLabsInitialized) {
      setTimeout(() => speakText(content, message.id), 500);
    }

    return message.id;
  };

  const startConversation = () => {
    setCurrentStep('chat');
    setConversationContext({
      stage: 'intro',
      userProfile: { answers: {} },
      conversationHistory: []
    });
    
    addMessage(
      "Hello! I'm Sensa, your AI personality analyst. I'm here to help you discover your deeper motivations and purpose through a thoughtful conversation. Would you like to start by telling me about yourself?",
      'ai',
      [],
      'text'
    );
  };

  const processUserInput = async (input: string, isChoice: boolean = false, choiceIndex?: number, conflictStyle?: ConflictStyle) => {
    if (isTyping || isAnalyzing) return;

    // Add user message to chat
    addMessage(input, 'user');
    setIsTyping(true);

    try {
      // Update conversation context
      const updatedContext: ConversationContext = {
        ...conversationContext,
        conversationHistory: [
          ...conversationContext.conversationHistory,
          { role: 'user', content: input, timestamp: new Date() }
        ],
        userProfile: {
          ...conversationContext.userProfile,
          answers: {
            ...conversationContext.userProfile.answers,
            [Date.now()]: input
          }
        }
      };

      if (isChoice && choiceIndex !== undefined && conflictStyle) {
        updatedContext.userProfile.answers.conflictStyle = conflictStyle;
      }

      setConversationContext(updatedContext);

      // Generate AI response
      const response: AIResponse = await generateAIResponse(input, updatedContext, isChoice, choiceIndex, conflictStyle);

      setConversationContext(response.updatedContext);

      // Add AI response
      let messageId: string;
      if (response.isComplete) {
        messageId = addMessage(
          "Perfect! I have everything I need for your personality analysis. Let me process this information and create your comprehensive profile...",
          'ai'
        );
        
        // Trigger analysis
        setTimeout(() => generateAnalysis(), 2000);
      } else {
        messageId = addMessage(
          response.content,
          'ai',
          response.options,
          response.expectsInput,
          response.metadata,
          response.simulationData
        );
      }

    } catch (error) {
      console.error('Error processing user input:', error);
      addMessage(
        "I apologize, but I encountered an error processing your response. Could you please try again?",
        'ai'
      );
    } finally {
      setIsTyping(false);
    }
  };

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      const profile = await generatePersonalityAnalysis(conversationContext);
      
      // Calculate scores
      const scores = calculateReelPassScore(profile);
      
      // Save to localStorage
      localStorage.setItem('reelPersona_latestResults', JSON.stringify(profile));
      
      // Save to database if user is authenticated
      if (user?.id) {
        try {
          await saveAssessment(user.id, profile, scores);
        } catch (error) {
          console.error('Failed to save assessment:', error);
        }
      }
      
      // Navigate to dashboard with results
      navigate('/dashboard', { state: { profile } });
      
    } catch (error) {
      console.error('Error generating analysis:', error);
      addMessage(
        "I apologize, but I encountered an error generating your analysis. Please try again later.",
        'system'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      processUserInput(chatInput.trim());
      setChatInput('');
    }
  };

  const handleOptionClick = (option: string, index: number) => {
    processUserInput(option, true, index);
  };

  const handleSimulationChoice = (choice: { text: string; style: ConflictStyle }, index: number) => {
    processUserInput(choice.text, true, index, choice.style);
  };

  // Voice Controls Component
  const renderVoiceControls = () => (
    <div className={styles.voiceControls}>
      <button
        className={`${styles.voiceToggle} ${voiceSettings.enabled ? styles.enabled : styles.disabled}`}
        onClick={toggleVoice}
        title={voiceSettings.enabled ? 'Disable voice' : 'Enable voice'}
      >
        {voiceSettings.enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      {voiceSettings.enabled && (
        <>
          <button
            className={`${styles.autoPlayToggle} ${voiceSettings.autoPlay ? styles.enabled : styles.disabled}`}
            onClick={toggleAutoPlay}
            title={voiceSettings.autoPlay ? 'Disable auto-play' : 'Enable auto-play'}
          >
            {voiceSettings.autoPlay ? <Play size={16} /> : <Pause size={16} />}
          </button>

          <button
            className={`${styles.wakeWordToggle} ${voiceSettings.wakeWordEnabled ? styles.enabled : styles.disabled}`}
            onClick={toggleWakeWord}
            title={voiceSettings.wakeWordEnabled ? 'Disable wake word' : 'Enable wake word'}
          >
            <MicIcon size={16} />
          </button>

          <button
            className={styles.voiceSettingsButton}
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            title="Voice settings"
          >
            <Settings size={16} />
          </button>
        </>
      )}

      {wakeWordStatus && (
        <div className={styles.wakeWordStatus}>
          <span>{wakeWordStatus}</span>
          {isListening && <MicIcon size={16} className={styles.listening} />}
        </div>
      )}
    </div>
  );

  // Welcome Screen
  const renderWelcome = () => (
    <div className={styles.welcome}>
      <div className={styles.welcomeHeader}>
        <div className={styles.welcomeIcon}>
          <Brain size={48} />
        </div>
        <h1>Welcome to ReelPersona</h1>
        <p className={styles.welcomeSubtitle}>AI-Powered Personality Assessment with Voice Interaction</p>
      </div>

      <div className={styles.welcomeContent}>
        <div className={styles.welcomeMessage}>
          <h2>🧠 Meet Sensa, Your AI Personality Analyst</h2>
          <p>
            I'm here to help you discover your deeper motivations, values, and purpose through an engaging conversation. 
            Using Simon Sinek's Golden Circle methodology, I'll guide you through thoughtful questions to uncover your 
            authentic "WHY" and understand how it aligns with your professional path.
          </p>
          <p>
            <strong>🎙️ Voice-Enabled Experience:</strong> Our conversation supports natural voice interaction. 
            You can speak your responses, and I'll respond with synthesized speech for a more personal experience.
          </p>
        </div>

        {voiceError && (
          <div className={styles.voiceErrorMessage}>
            <AlertTriangle size={20} />
            <p>{voiceError}</p>
          </div>
        )}

        <div className={styles.trustIndicators}>
          <div className={styles.trustItem}>
            <Shield size={24} />
            <div>
              <h3>Privacy Protected</h3>
              <p>Your conversation remains confidential and is processed securely.</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <Users size={24} />
            <div>
              <h3>Professionally Validated</h3>
              <p>Based on established personality assessment frameworks and organizational psychology.</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <Clock size={24} />
            <div>
              <h3>15-20 Minutes</h3>
              <p>A focused conversation that respects your time while delivering deep insights.</p>
            </div>
          </div>
        </div>

        {renderVoiceControls()}

        <div className={styles.actionButtons}>
          <button
            className={styles.primaryButton}
            onClick={startConversation}
          >
            <MessageCircle size={20} />
            Start Personality Assessment
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => navigate('/dashboard')}
          >
            <BarChart3 size={20} />
            Skip to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  // Chat Interface
  const renderChat = () => (
    <div className={styles.chat}>
      <div className={styles.chatContent}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderContent}>
            <div className={styles.chatHeaderInfo}>
              <h2>Personality Assessment with Sensa</h2>
              <p>Having a thoughtful conversation to understand your motivations and values</p>
            </div>
            {renderVoiceControls()}
          </div>
        </div>

        <div className={styles.chatMessages} ref={chatMessagesRef}>
          {chatMessages.map((message) => (
            <div key={message.id} className={`${styles.chatMessage} ${styles[`${message.type}Message`]}`}>
              <div className={styles.messageContent}>
                <div className={styles.messageText}>
                  {message.simulationData ? (
                    <div className={styles.simulationContainer}>
                      <div className={styles.simulationHeader}>
                        <h4>Conflict Resolution Scenario</h4>
                      </div>
                      <div className={styles.simulationScene}>
                        <p><strong>Situation:</strong> {message.simulationData.openingScene}</p>
                        <p><strong>Your task:</strong> {message.simulationData.prompt}</p>
                      </div>
                      <div className={styles.simulationChoices}>
                        {message.simulationData.choices.map((choice: any, index: number) => (
                          <button
                            key={index}
                            className={styles.simulationChoice}
                            onClick={() => handleSimulationChoice(choice, index)}
                          >
                            <span className={styles.choiceText}>{choice.text}</span>
                            <span className={styles.choiceStyle}>({choice.style})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>{message.content}</p>
                      {message.options && message.options.length > 0 && (
                        <div className={styles.messageOptions}>
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              className={styles.optionButton}
                              onClick={() => handleOptionClick(option, index)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.messageActions}>
                  {message.type === 'ai' && voiceSettings.enabled && elevenLabsInitialized && (
                    <button
                      className={styles.speechButton}
                      onClick={() => speakText(message.content, message.id)}
                      disabled={isVoiceLoading}
                      title="Play audio"
                    >
                      {message.isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
                    </button>
                  )}
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {(isTyping || isAnalyzing) && (
            <div className={`${styles.chatMessage} ${styles.aiMessage} ${styles.typingMessage}`}>
              <div className={styles.messageContent}>
                <p>{isAnalyzing ? 'Generating your personality analysis...' : 'Sensa is thinking...'}</p>
              </div>
            </div>
          )}
        </div>

        <form className={styles.chatForm} onSubmit={handleChatSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={voiceSettings.wakeWordEnabled ? "Type your response or say 'Hey Sensa' to speak..." : "Type your response..."}
              disabled={isTyping || isAnalyzing}
              className={styles.chatInput}
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isTyping || isAnalyzing}
              className={styles.sendButton}
            >
              {isTyping || isAnalyzing ? (
                <Loader size={20} className={styles.spinner} />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          
          {voiceSettings.wakeWordEnabled && (
            <div className={styles.voiceHint}>
              <Mic size={16} className={isListening ? styles.listening : ''} />
              <span>{isListening ? 'Listening for "Hey Sensa"...' : 'Say "Hey Sensa" to activate voice input'}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  return (
    <div className={styles.reelPersona}>
      <div className="reelapps-card">
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>ReelPersona</div>
            {currentStep === 'chat' && (
              <div className={styles.progressIndicator}>
                <div 
                  className={styles.progressFill} 
                  style={{ 
                    width: `${Math.min(100, (conversationContext.conversationHistory.length / 20) * 100)}%`
                  }} 
                />
              </div>
            )}
          </div>
        </div>

        {currentStep === 'welcome' && renderWelcome()}
        {currentStep === 'chat' && renderChat()}
      </div>
    </div>
  );
};

export default Home; 