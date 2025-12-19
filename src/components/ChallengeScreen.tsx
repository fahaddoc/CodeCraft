// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Challenge Screen Component
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Send,
  Lightbulb,
  Play,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Bot,
  Zap,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getGameEngine } from '../game/game-engine';
import { ChallengePhase, InterviewerMood, ConversationMessage } from '../types/game.types';
import { INTERVIEWERS } from '../game/interviewer-ai';

interface ChallengeScreenProps {
  onComplete: () => void;
  onExit: () => void;
}

const PHASE_NAMES: Record<ChallengePhase, string> = {
  briefing: 'Briefing',
  clarification: 'Clarification',
  approach: 'Approach',
  execution: 'Execution',
  defense: 'Defense',
  debrief: 'Debrief',
};

const MOOD_COLORS: Record<InterviewerMood, string> = {
  impressed: 'text-green-400',
  interested: 'text-blue-400',
  neutral: 'text-gray-400',
  skeptical: 'text-yellow-400',
  concerned: 'text-orange-400',
  frustrated: 'text-red-400',
};

const MOOD_ICONS: Record<InterviewerMood, string> = {
  impressed: '😊',
  interested: '🤔',
  neutral: '😐',
  skeptical: '🧐',
  concerned: '😟',
  frustrated: '😤',
};

export const ChallengeScreen: React.FC<ChallengeScreenProps> = ({ onComplete, onExit }) => {
  const engine = getGameEngine();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');
  const [silenceWarning, setSilenceWarning] = useState(false);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  const state = engine.getState();
  const session = state.currentSession;
  const challenge = state.currentChallenge;
  const interviewer = challenge ? INTERVIEWERS[challenge.briefing.interviewer] : null;

  useEffect(() => {
    // Subscribe to game events
    const unsubscribe = engine.onEvent((event) => {
      switch (event.type) {
        case 'SILENCE_WARNING':
          setSilenceWarning(true);
          setTimeout(() => setSilenceWarning(false), 3000);
          break;
        case 'TIME_WARNING':
          // Could add visual/audio warning
          break;
        case 'CHALLENGE_COMPLETED':
          onComplete();
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to bottom of conversation
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.conversation]);

  useEffect(() => {
    // Set starter code if available
    if (challenge?.problem.starterCode) {
      setCode(challenge.problem.starterCode);
    } else if (challenge?.problem.brokenCode) {
      setCode(challenge.problem.brokenCode);
    }
  }, [challenge]);

  if (!session || !challenge || !interviewer) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Loading challenge...</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setIsLoading(true);
    engine.sendMessage(message);
    setMessage('');
    setIsLoading(false);
  };

  const handleSubmitCode = () => {
    engine.submitCode(code);
  };

  const handleUseHint = () => {
    engine.useHint();
  };

  const handleNextPhase = () => {
    engine.advancePhase();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseProgress = (): number => {
    const phases: ChallengePhase[] = ['briefing', 'clarification', 'approach', 'execution', 'defense', 'debrief'];
    const currentIndex = phases.indexOf(session.currentPhase);
    return ((currentIndex + 1) / phases.length) * 100;
  };

  const getSilenceBarWidth = (): number => {
    const maxSilence = 60;
    return Math.min((session.silenceTime / maxSilence) * 100, 100);
  };

  const getSilenceBarColor = (): string => {
    if (session.silenceTime < 15) return 'bg-green-500';
    if (session.silenceTime < 30) return 'bg-yellow-500';
    if (session.silenceTime < 45) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{challenge.name}</h1>
              <p className="text-sm text-gray-400">
                World {challenge.world.split('_')[1]}, Level {challenge.level}
              </p>
            </div>

            <div className="flex items-center gap-6">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                session.timeRemaining < 60 ? 'bg-red-900/50 text-red-400' :
                session.timeRemaining < 300 ? 'bg-yellow-900/50 text-yellow-400' :
                'bg-gray-700'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(session.timeRemaining)}</span>
              </div>

              {/* Phase indicator */}
              <div className="text-right">
                <div className="text-sm text-gray-400">Phase</div>
                <div className="font-semibold">{PHASE_NAMES[session.currentPhase]}</div>
              </div>

              {/* Exit button */}
              <button
                onClick={onExit}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Phase progress bar */}
          <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${getPhaseProgress()}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-12 gap-6">
        {/* Left sidebar - Interviewer info */}
        <div className="col-span-3 space-y-4">
          {/* Interviewer card */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                {interviewer.avatar}
              </div>
              <div>
                <div className="font-semibold">{interviewer.name}</div>
                <div className="text-sm text-gray-400">{interviewer.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Mood:</span>
              <span className={MOOD_COLORS[session.interviewerMood]}>
                {MOOD_ICONS[session.interviewerMood]} {session.interviewerMood}
              </span>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              {interviewer.company}
            </div>
          </div>

          {/* Silence meter */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Silence Timer</span>
              <span className="text-sm">{session.silenceTime}s</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getSilenceBarColor()}`}
                style={{ width: `${getSilenceBarWidth()}%` }}
              />
            </div>
            {silenceWarning && (
              <div className="mt-2 text-xs text-orange-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Don't stay silent too long!
              </div>
            )}
          </div>

          {/* Hints */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Hints Available</span>
              <span className="text-sm text-purple-400">
                {Math.max(0, 2 - session.hintsUsed)}
              </span>
            </div>
            <button
              onClick={handleUseHint}
              disabled={session.hintsUsed >= 2}
              className={`w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                session.hintsUsed >= 2
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Use Hint (-50 XP)
            </button>
          </div>

          {/* Phase controls */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <button
              onClick={handleNextPhase}
              className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              Next Phase
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center - Conversation */}
        <div className="col-span-6 flex flex-col">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 flex-1 flex flex-col overflow-hidden">
            {/* Conversation area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Problem statement */}
              <div className="bg-gray-700/50 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="text-sm text-purple-400 mb-1">Problem</div>
                <p className="text-gray-200">{challenge.problem.description}</p>
              </div>

              {/* Conversation messages */}
              {session.conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.speaker === 'player' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.speaker === 'player'
                      ? 'bg-purple-600'
                      : msg.speaker === 'interviewer'
                        ? 'bg-gray-600'
                        : 'bg-gray-700'
                  }`}>
                    {msg.speaker === 'player' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.speaker === 'player'
                      ? 'bg-purple-600/30 border border-purple-500/30'
                      : 'bg-gray-700/50 border border-gray-600'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {msg.mood && msg.speaker === 'interviewer' && (
                      <div className={`text-xs mt-1 ${MOOD_COLORS[msg.mood]}`}>
                        {MOOD_ICONS[msg.mood]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your response..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 ${
                    showCode ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  {showCode ? 'Hide Code' : 'Show Code Editor'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Test cases / Code */}
        <div className="col-span-3 space-y-4">
          {showCode ? (
            /* Code editor */
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 h-full flex flex-col">
              <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                <span className="font-medium text-sm">Code Editor</span>
                <button
                  onClick={handleSubmitCode}
                  className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm"
                >
                  Submit
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-gray-900 p-4 font-mono text-sm text-gray-200 resize-none focus:outline-none"
                placeholder="// Write your code here..."
                spellCheck={false}
              />
            </div>
          ) : (
            <>
              {/* Test cases */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="font-medium mb-3">Test Cases</h3>
                <div className="space-y-2">
                  {challenge.problem.testCases.map((testCase, index) => (
                    <div
                      key={testCase.id}
                      className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <span className="text-sm flex-1">{testCase.name}</span>
                      <span className="text-xs text-gray-400">{testCase.points} pts</span>
                    </div>
                  ))}
                  {challenge.problem.hiddenTestCases.length > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-gray-700/30 rounded-lg">
                      <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-xs">?</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {challenge.problem.hiddenTestCases.length} hidden test(s)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expected clarifications */}
              {challenge.problem.expectedClarifications.length > 0 && (
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h3 className="font-medium mb-3 text-sm">Good Questions to Ask</h3>
                  <div className="space-y-1.5">
                    {challenge.problem.expectedClarifications.slice(0, 3).map((q, i) => (
                      <div key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>{q.substring(0, 40)}...</span>
                      </div>
                    ))}
                    {challenge.problem.expectedClarifications.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{challenge.problem.expectedClarifications.length - 3} more...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Constraints */}
              {challenge.problem.constraints && (
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h3 className="font-medium mb-3 text-sm">Constraints</h3>
                  <div className="space-y-1.5">
                    {Object.entries(challenge.problem.constraints).map(([key, value]) => (
                      <div key={key} className="text-xs flex justify-between">
                        <span className="text-gray-400 capitalize">{key}:</span>
                        <span className="text-gray-200">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChallengeScreen;
