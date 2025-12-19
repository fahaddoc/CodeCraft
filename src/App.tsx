// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Main Application
// ============================================================================

import React, { useState, useEffect } from 'react';
import { GameHub } from './components/GameHub';
import { ChallengeScreen } from './components/ChallengeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { getGameEngine, resetGameEngine } from './game/game-engine';
import { FinalScore, Challenge } from './types/game.types';
import { getNextChallenge, getChallengeById } from './data/challenges';

type GameScreen = 'loading' | 'hub' | 'challenge' | 'results';

function App() {
  const [screen, setScreen] = useState<GameScreen>('loading');
  const [lastScore, setLastScore] = useState<FinalScore | null>(null);
  const [lastChallenge, setLastChallenge] = useState<Challenge | null>(null);

  const engine = getGameEngine();

  useEffect(() => {
    // Initialize player (in a real app, would load from storage or API)
    const savedPlayer = localStorage.getItem('codecraft_player');

    if (savedPlayer) {
      try {
        const playerData = JSON.parse(savedPlayer);
        engine.loadPlayer(playerData);
      } catch (e) {
        // Create new player if saved data is invalid
        engine.createNewPlayer('Player', 'player@example.com');
      }
    } else {
      engine.createNewPlayer('Player', 'player@example.com');
    }

    setScreen('hub');
  }, []);

  useEffect(() => {
    // Save player state on changes
    const state = engine.getState();
    if (state.player) {
      localStorage.setItem('codecraft_player', JSON.stringify(state.player));
    }
  });

  const handleStartChallenge = (challengeId: string) => {
    const session = engine.startChallenge(challengeId);
    if (session) {
      const state = engine.getState();
      setLastChallenge(state.currentChallenge);
      setScreen('challenge');
    }
  };

  const handleChallengeComplete = () => {
    const score = engine.endChallenge('completed');
    if (score) {
      setLastScore(score);
      const state = engine.getState();
      setLastChallenge(state.currentChallenge);
      setScreen('results');
    }
  };

  const handleChallengeExit = () => {
    engine.endChallenge('abandoned');
    engine.cleanup();
    setScreen('hub');
  };

  const handleRetry = () => {
    if (lastChallenge) {
      const session = engine.startChallenge(lastChallenge.id);
      if (session) {
        setScreen('challenge');
      }
    }
  };

  const handleNextChallenge = () => {
    if (lastChallenge) {
      const next = getNextChallenge(lastChallenge.id);
      if (next) {
        const session = engine.startChallenge(next.id);
        if (session) {
          setLastChallenge(next);
          setScreen('challenge');
        }
      } else {
        setScreen('hub');
      }
    }
  };

  const handleReturnToHub = () => {
    engine.cleanup();
    setScreen('hub');
  };

  // Loading screen
  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            CodeCraft
          </div>
          <div className="text-xl text-gray-400">Interview Legends</div>
          <div className="mt-8">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Hub screen
  if (screen === 'hub') {
    return <GameHub onStartChallenge={handleStartChallenge} />;
  }

  // Challenge screen
  if (screen === 'challenge') {
    return (
      <ChallengeScreen
        onComplete={handleChallengeComplete}
        onExit={handleChallengeExit}
      />
    );
  }

  // Results screen
  if (screen === 'results' && lastScore && lastChallenge) {
    return (
      <ResultsScreen
        score={lastScore}
        challenge={lastChallenge}
        onRetry={handleRetry}
        onNextChallenge={handleNextChallenge}
        onReturnToHub={handleReturnToHub}
      />
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400">Something went wrong.</p>
        <button
          onClick={() => setScreen('hub')}
          className="mt-4 px-4 py-2 bg-purple-600 rounded-lg"
        >
          Return to Hub
        </button>
      </div>
    </div>
  );
}

export default App;
