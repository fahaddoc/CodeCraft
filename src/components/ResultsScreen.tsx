// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Results Screen Component
// ============================================================================

import React from 'react';
import {
  Trophy,
  Star,
  TrendingUp,
  TrendingDown,
  Award,
  ChevronRight,
  RefreshCw,
  Home,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { FinalScore, Grade, Challenge } from '../types/game.types';

interface ResultsScreenProps {
  score: FinalScore;
  challenge: Challenge;
  onRetry: () => void;
  onNextChallenge: () => void;
  onReturnToHub: () => void;
}

const GRADE_COLORS: Record<Grade, string> = {
  'S+': 'from-yellow-400 to-amber-500',
  'S': 'from-yellow-400 to-orange-500',
  'S-': 'from-yellow-500 to-orange-500',
  'A+': 'from-green-400 to-emerald-500',
  'A': 'from-green-500 to-teal-500',
  'A-': 'from-green-500 to-cyan-500',
  'B+': 'from-blue-400 to-indigo-500',
  'B': 'from-blue-500 to-purple-500',
  'B-': 'from-blue-600 to-purple-600',
  'C+': 'from-purple-400 to-pink-500',
  'C': 'from-purple-500 to-pink-600',
  'C-': 'from-gray-400 to-gray-500',
  'D': 'from-gray-500 to-gray-600',
  'F': 'from-red-500 to-red-700',
};

const GRADE_TITLES: Record<Grade, string> = {
  'S+': 'LEGENDARY!',
  'S': 'OUTSTANDING!',
  'S-': 'EXCELLENT!',
  'A+': 'IMPRESSIVE!',
  'A': 'GREAT JOB!',
  'A-': 'WELL DONE!',
  'B+': 'GOOD WORK!',
  'B': 'SOLID!',
  'B-': 'NOT BAD!',
  'C+': 'KEEP TRYING!',
  'C': 'ROOM TO GROW',
  'C-': 'NEEDS WORK',
  'D': 'STRUGGLING',
  'F': 'FAILED',
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  challenge,
  onRetry,
  onNextChallenge,
  onReturnToHub,
}) => {
  const isPassing = score.adjusted >= (challenge.scoring.passingScore || 60);

  const renderScoreBar = (label: string, value: number, maxValue: number = 100) => {
    const percentage = (value / maxValue) * 100;
    let color = 'bg-gray-500';
    if (percentage >= 80) color = 'bg-green-500';
    else if (percentage >= 60) color = 'bg-blue-500';
    else if (percentage >= 40) color = 'bg-yellow-500';
    else color = 'bg-red-500';

    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">{label}</span>
          <span className="font-medium">{Math.round(value)}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-1000`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const renderCategoryScore = (title: string, scores: Record<string, number>) => (
    <div className="bg-gray-700/30 rounded-lg p-4">
      <h4 className="font-medium mb-3 text-sm text-gray-300">{title}</h4>
      {Object.entries(scores).map(([key, value]) => {
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        return renderScoreBar(label, value);
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header with Grade */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {isPassing ? (
              <CheckCircle className="w-16 h-16 mx-auto text-green-400" />
            ) : (
              <XCircle className="w-16 h-16 mx-auto text-red-400" />
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">
            {isPassing ? 'Challenge Complete!' : 'Challenge Failed'}
          </h1>
          <p className="text-gray-400">{challenge.name}</p>

          {/* Grade display */}
          <div className="mt-8 inline-block">
            <div className={`text-8xl font-bold bg-gradient-to-r ${GRADE_COLORS[score.grade]} bg-clip-text text-transparent`}>
              {score.grade}
            </div>
            <div className="text-xl text-gray-400 mt-2">
              {GRADE_TITLES[score.grade]}
            </div>
          </div>

          {/* Score breakdown header */}
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {Math.round(score.adjusted)}%
              </div>
              <div className="text-sm text-gray-400">Final Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                +{score.xpEarned.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">XP Earned</div>
            </div>
          </div>
        </div>

        {/* Detailed breakdown */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {renderCategoryScore('Technical (40%)', score.breakdown.technical)}
          {renderCategoryScore('Communication (25%)', score.breakdown.communication)}
          {renderCategoryScore('Problem Solving (20%)', score.breakdown.problemSolving)}
          {renderCategoryScore('Senior Signals (15%)', score.breakdown.seniorSignals)}
        </div>

        {/* Bonuses and Penalties */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Bonuses */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-400">
              <TrendingUp className="w-5 h-5" />
              Bonuses Applied
            </h3>
            {score.bonusesApplied.length > 0 ? (
              <ul className="space-y-2">
                {score.bonusesApplied.map((bonus, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span>{bonus}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No bonuses earned this time</p>
            )}
          </div>

          {/* Penalties */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-400">
              <TrendingDown className="w-5 h-5" />
              Penalties Applied
            </h3>
            {score.penaltiesApplied.length > 0 ? (
              <ul className="space-y-2">
                {score.penaltiesApplied.map((penalty, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>{penalty}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No penalties - clean run!</p>
            )}
          </div>
        </div>

        {/* Feedback section */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            Performance Feedback
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Strengths */}
            <div>
              <h4 className="text-sm font-medium text-green-400 mb-2">Strengths</h4>
              {score.feedback.strengths.length > 0 ? (
                <ul className="space-y-1.5">
                  {score.feedback.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">Keep practicing to develop strengths</p>
              )}
            </div>

            {/* Improvements */}
            <div>
              <h4 className="text-sm font-medium text-yellow-400 mb-2">Areas to Improve</h4>
              {score.feedback.improvements.length > 0 ? (
                <ul className="space-y-1.5">
                  {score.feedback.improvements.map((s, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">Excellent performance across the board!</p>
              )}
            </div>
          </div>
        </div>

        {/* Comparison section */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="font-semibold mb-4">What Different Candidates Do</h3>

          <div className="space-y-4">
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <div className="text-sm font-medium text-red-400 mb-1">😰 Weak Candidate</div>
              <p className="text-sm text-gray-300">{score.feedback.comparison.weak}</p>
            </div>

            <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
              <div className="text-sm font-medium text-green-400 mb-1">💪 Strong Senior</div>
              <p className="text-sm text-gray-300">{score.feedback.comparison.strong}</p>
            </div>

            <div className="p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
              <div className="text-sm font-medium text-yellow-400 mb-1">🏆 Principal Legend</div>
              <p className="text-sm text-gray-300">{score.feedback.comparison.legend}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Retry for Better Grade
          </button>

          {isPassing && (
            <button
              onClick={onNextChallenge}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold flex items-center gap-2"
            >
              Next Challenge
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onReturnToHub}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return to Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
