// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Main Game Hub Component
// ============================================================================

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Flame,
  Map,
  BookOpen,
  Swords,
  Shuffle,
  ChevronRight,
  Star,
  Lock,
  CheckCircle,
  Zap,
  Target
} from 'lucide-react';
import { getGameEngine } from '../game/game-engine';
import { WORLDS, WorldId, Challenge, DailyChallenge } from '../types/game.types';

interface GameHubProps {
  onStartChallenge: (challengeId: string) => void;
}

export const GameHub: React.FC<GameHubProps> = ({ onStartChallenge }) => {
  const engine = getGameEngine();
  const [selectedWorld, setSelectedWorld] = useState<WorldId>('world_1');
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);

  const state = engine.getState();
  const player = state.player;
  const rankInfo = engine.getPlayerRankInfo();

  useEffect(() => {
    setDailyChallenges(engine.getDailyChallenges());
  }, []);

  if (!player || !rankInfo) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">CodeCraft: Interview Legends</h1>
          <p className="text-gray-400">Loading player data...</p>
        </div>
      </div>
    );
  }

  const availableChallenges = engine.getAvailableChallenges()
    .filter(c => c.world === selectedWorld);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                CodeCraft: Interview Legends
              </h1>
              <div className="flex items-center gap-2 text-orange-400">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">Day {player.stats.currentStreak}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-400">Rank</div>
                <div className="font-semibold flex items-center gap-2">
                  <span>{rankInfo.currentRank.icon}</span>
                  <span>{rankInfo.currentRank.name}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-400">XP</div>
                <div className="font-semibold text-purple-400">
                  {player.stats.totalXP.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progress to next rank</span>
              <span>{Math.round(rankInfo.progress)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${rankInfo.progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - World Map */}
          <div className="col-span-3">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-400" />
                World Map
              </h2>

              <div className="space-y-3">
                {WORLDS.map((world) => {
                  const progress = player.progression.worldProgress[world.id];
                  const isUnlocked = player.stats.totalXP >= world.unlockXP;
                  const isSelected = selectedWorld === world.id;

                  return (
                    <button
                      key={world.id}
                      onClick={() => isUnlocked && setSelectedWorld(world.id)}
                      disabled={!isUnlocked}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'bg-purple-600/30 border-2 border-purple-500'
                          : isUnlocked
                            ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                            : 'bg-gray-800/30 border border-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{world.name}</span>
                        {!isUnlocked ? (
                          <Lock className="w-4 h-4 text-gray-500" />
                        ) : progress.levelsCompleted === world.totalLevels ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{world.subtitle}</div>
                      {isUnlocked && (
                        <div className="mt-2">
                          <div className="h-1.5 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${(progress.levelsCompleted / world.totalLevels) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {progress.levelsCompleted}/{world.totalLevels} levels
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skill Trees Preview */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mt-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Skill Trees
              </h2>

              <div className="space-y-3">
                {Object.values(player.progression.skillTrees).map((tree) => (
                  <div key={tree.id} className="flex items-center gap-3">
                    <span className="text-xl">{tree.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{tree.name}</div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(tree.unlockedPoints / tree.totalPoints) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {tree.unlockedPoints}/{tree.totalPoints}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Challenges */}
          <div className="col-span-6">
            {/* Daily Challenges */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30 mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Daily Challenges
              </h2>

              <div className="grid grid-cols-3 gap-4">
                {dailyChallenges.map((challenge) => (
                  <button
                    key={challenge.id}
                    className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all text-left border border-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {challenge.type === 'quick_fire' && <Zap className="w-4 h-4 text-yellow-400" />}
                      {challenge.type === 'boss_rush' && <Flame className="w-4 h-4 text-orange-400" />}
                      {challenge.type === 'random' && <Shuffle className="w-4 h-4 text-blue-400" />}
                      <span className="font-semibold text-sm">{challenge.name}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{challenge.description}</p>
                    <div className="text-sm text-purple-400 font-semibold">
                      +{challenge.xpReward} XP
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Available Challenges */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                {WORLDS.find(w => w.id === selectedWorld)?.name} Challenges
              </h2>

              <div className="space-y-3">
                {availableChallenges.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No challenges available in this world yet.</p>
                    <p className="text-sm mt-2">Complete earlier challenges to unlock more!</p>
                  </div>
                ) : (
                  availableChallenges.map((challenge) => {
                    const isCompleted = player.progression.completedChallenges.includes(challenge.id);
                    const bestScore = player.progression.worldProgress[selectedWorld].bestScores[challenge.id];

                    return (
                      <button
                        key={challenge.id}
                        onClick={() => onStartChallenge(challenge.id)}
                        className="w-full p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-left border border-gray-600 flex items-center gap-4"
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${
                          isCompleted
                            ? 'bg-green-900/50 text-green-400'
                            : challenge.level === 'boss'
                              ? 'bg-red-900/50 text-red-400'
                              : 'bg-gray-600 text-gray-300'
                        }`}>
                          {challenge.level === 'boss' ? <Swords className="w-6 h-6" /> : challenge.level}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{challenge.name}</span>
                            {challenge.level === 'boss' && (
                              <span className="px-2 py-0.5 bg-red-900/50 text-red-400 text-xs rounded-full">
                                BOSS
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {challenge.type.replace('_', ' ')} • Difficulty {challenge.difficulty}/10
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">
                              ⏱️ {Math.floor(challenge.briefing.timeLimit / 60)} min
                            </span>
                            <span className="text-xs text-purple-400">
                              +{challenge.rewards.baseXP} XP
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          {isCompleted ? (
                            <div>
                              <div className="text-green-400 font-semibold">
                                {bestScore}%
                              </div>
                              <div className="text-xs text-gray-400">Best Score</div>
                            </div>
                          ) : (
                            <ChevronRight className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="col-span-3">
            {/* Stats Card */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Your Stats
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Challenges Completed</span>
                  <span className="font-semibold">{player.stats.challengesCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Bosses Defeated</span>
                  <span className="font-semibold">{player.stats.bossesDefeated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Score</span>
                  <span className="font-semibold">{Math.round(player.stats.averageScore)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Highest Grade</span>
                  <span className={`font-semibold ${
                    player.stats.highestGrade.startsWith('S') ? 'text-yellow-400' :
                    player.stats.highestGrade.startsWith('A') ? 'text-green-400' :
                    'text-gray-300'
                  }`}>
                    {player.stats.highestGrade}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Longest Streak</span>
                  <span className="font-semibold">{player.stats.longestStreak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Play Time</span>
                  <span className="font-semibold">
                    {Math.floor(player.stats.totalPlayTime / 3600)}h {Math.floor((player.stats.totalPlayTime % 3600) / 60)}m
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mt-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

              <div className="space-y-3">
                {player.progression.completedChallenges.slice(-5).reverse().map((challengeId, index) => {
                  const bestScore = Object.values(player.progression.worldProgress)
                    .flatMap(wp => Object.entries(wp.bestScores))
                    .find(([id]) => id === challengeId)?.[1];

                  return (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-700/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <div className="flex-1">
                        <div className="text-sm font-medium truncate">{challengeId}</div>
                        <div className="text-xs text-gray-400">
                          {bestScore ? `${bestScore}%` : 'Completed'}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {player.progression.completedChallenges.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No completed challenges yet.<br/>
                    Start your journey!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameHub;
