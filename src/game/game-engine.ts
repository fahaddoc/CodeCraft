// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Game Engine
// ============================================================================

import {
  Player,
  PlayerStats,
  PlayerProgression,
  PlayerInventory,
  Challenge,
  GameSession,
  ChallengePhase,
  ConversationMessage,
  PlayerResponse,
  FinalScore,
  InterviewerMood,
  SessionStatus,
  GameEvent,
  Rank,
  RANKS,
  Achievement,
  SkillCardInstance,
  DailyChallenge,
  WorldId,
} from '../types/game.types';
import { ScoringEngine, calculateLevelFromXP, getXPToNextRank } from './scoring-engine';
import { InterviewerAI, INTERVIEWERS } from './interviewer-ai';
import { getChallengeById, getChallengesByWorld, getNextChallenge } from '../data/challenges';

// ============================================================================
// GAME STATE INTERFACE
// ============================================================================

export interface GameState {
  player: Player | null;
  currentSession: GameSession | null;
  currentChallenge: Challenge | null;
  interviewerAI: InterviewerAI | null;
  gameEvents: GameEvent[];
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// GAME ENGINE CLASS
// ============================================================================

export class GameEngine {
  private state: GameState;
  private eventListeners: ((event: GameEvent) => void)[] = [];
  private timerInterval: NodeJS.Timeout | null = null;
  private silenceInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.state = {
      player: null,
      currentSession: null,
      currentChallenge: null,
      interviewerAI: null,
      gameEvents: [],
      isLoading: false,
      error: null,
    };
  }

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  getState(): GameState {
    return { ...this.state };
  }

  private setState(updates: Partial<GameState>): void {
    this.state = { ...this.state, ...updates };
  }

  private emitEvent(event: GameEvent): void {
    this.state.gameEvents.push(event);
    this.eventListeners.forEach(listener => listener(event));
  }

  onEvent(listener: (event: GameEvent) => void): () => void {
    this.eventListeners.push(listener);
    return () => {
      this.eventListeners = this.eventListeners.filter(l => l !== listener);
    };
  }

  // ============================================================================
  // PLAYER MANAGEMENT
  // ============================================================================

  createNewPlayer(username: string, email: string): Player {
    const player: Player = {
      id: `player_${Date.now()}`,
      username,
      email,
      createdAt: new Date(),
      stats: {
        totalXP: 0,
        currentRank: RANKS[0],
        currentStreak: 0,
        longestStreak: 0,
        challengesCompleted: 0,
        bossesDefeated: 0,
        totalPlayTime: 0,
        averageScore: 0,
        highestGrade: 'F',
      },
      progression: {
        currentWorld: 'world_1',
        worldProgress: {
          world_1: { levelsCompleted: 0, totalLevels: 20, bossesDefeated: [], bestScores: {}, secretsFound: [] },
          world_2: { levelsCompleted: 0, totalLevels: 25, bossesDefeated: [], bestScores: {}, secretsFound: [] },
          world_3: { levelsCompleted: 0, totalLevels: 30, bossesDefeated: [], bestScores: {}, secretsFound: [] },
          world_4: { levelsCompleted: 0, totalLevels: 40, bossesDefeated: [], bestScores: {}, secretsFound: [] },
        },
        skillTrees: this.initializeSkillTrees(),
        unlockedChallenges: ['w1_l1_two_sum'],
        completedChallenges: [],
        achievements: [],
      },
      inventory: {
        skillCards: [],
        mentalModels: [],
        titles: [{ id: 'novice', name: 'Novice', description: 'Just starting out', rarity: 'common', unlockCondition: 'Start the game', unlockedAt: new Date() }],
        equippedTitle: 'novice',
      },
      settings: {
        preferredLanguage: 'javascript',
        difficulty: 'normal',
        soundEnabled: true,
        notificationsEnabled: true,
        timerWarnings: true,
      },
    };

    this.setState({ player });
    return player;
  }

  loadPlayer(playerData: Player): void {
    this.setState({ player: playerData });
  }

  private initializeSkillTrees() {
    return {
      algorithms: {
        id: 'algorithms' as const,
        name: 'Algorithms',
        icon: '🧮',
        skills: [
          { id: 'arrays', name: 'Arrays', description: 'Master array manipulation', maxLevel: 5, currentLevel: 0, prerequisites: [], benefits: [] },
          { id: 'strings', name: 'Strings', description: 'String processing techniques', maxLevel: 5, currentLevel: 0, prerequisites: ['arrays'], benefits: [] },
          { id: 'trees', name: 'Trees', description: 'Tree traversal and manipulation', maxLevel: 5, currentLevel: 0, prerequisites: ['arrays'], benefits: [] },
          { id: 'graphs', name: 'Graphs', description: 'Graph algorithms', maxLevel: 5, currentLevel: 0, prerequisites: ['trees'], benefits: [] },
          { id: 'dp', name: 'Dynamic Programming', description: 'DP techniques', maxLevel: 5, currentLevel: 0, prerequisites: ['graphs'], benefits: [] },
        ],
        totalPoints: 25,
        unlockedPoints: 0,
      },
      systems: {
        id: 'systems' as const,
        name: 'Systems',
        icon: '🏗️',
        skills: [
          { id: 'apis', name: 'APIs', description: 'API design principles', maxLevel: 5, currentLevel: 0, prerequisites: [], benefits: [] },
          { id: 'databases', name: 'Databases', description: 'Database design and optimization', maxLevel: 5, currentLevel: 0, prerequisites: ['apis'], benefits: [] },
          { id: 'caching', name: 'Caching', description: 'Caching strategies', maxLevel: 5, currentLevel: 0, prerequisites: ['databases'], benefits: [] },
          { id: 'scaling', name: 'Scaling', description: 'Horizontal and vertical scaling', maxLevel: 5, currentLevel: 0, prerequisites: ['caching'], benefits: [] },
        ],
        totalPoints: 20,
        unlockedPoints: 0,
      },
      frontend: {
        id: 'frontend' as const,
        name: 'Frontend',
        icon: '🎨',
        skills: [
          { id: 'react', name: 'React', description: 'React fundamentals', maxLevel: 5, currentLevel: 0, prerequisites: [], benefits: [] },
          { id: 'state', name: 'State Management', description: 'Complex state handling', maxLevel: 5, currentLevel: 0, prerequisites: ['react'], benefits: [] },
          { id: 'performance', name: 'Performance', description: 'Frontend optimization', maxLevel: 5, currentLevel: 0, prerequisites: ['state'], benefits: [] },
          { id: 'a11y', name: 'Accessibility', description: 'Building accessible UIs', maxLevel: 5, currentLevel: 0, prerequisites: ['performance'], benefits: [] },
        ],
        totalPoints: 20,
        unlockedPoints: 0,
      },
      backend: {
        id: 'backend' as const,
        name: 'Backend',
        icon: '⚙️',
        skills: [
          { id: 'rest', name: 'REST APIs', description: 'RESTful API design', maxLevel: 5, currentLevel: 0, prerequisites: [], benefits: [] },
          { id: 'auth', name: 'Authentication', description: 'Auth patterns', maxLevel: 5, currentLevel: 0, prerequisites: ['rest'], benefits: [] },
          { id: 'queues', name: 'Message Queues', description: 'Async processing', maxLevel: 5, currentLevel: 0, prerequisites: ['auth'], benefits: [] },
        ],
        totalPoints: 15,
        unlockedPoints: 0,
      },
      soft_skills: {
        id: 'soft_skills' as const,
        name: 'Soft Skills',
        icon: '💬',
        skills: [
          { id: 'clarity', name: 'Clarity', description: 'Clear communication', maxLevel: 5, currentLevel: 0, prerequisites: [], benefits: [] },
          { id: 'listening', name: 'Active Listening', description: 'Understanding requirements', maxLevel: 5, currentLevel: 0, prerequisites: ['clarity'], benefits: [] },
          { id: 'collaboration', name: 'Collaboration', description: 'Working with interviewers', maxLevel: 5, currentLevel: 0, prerequisites: ['listening'], benefits: [] },
        ],
        totalPoints: 15,
        unlockedPoints: 0,
      },
      leadership: {
        id: 'leadership' as const,
        name: 'Leadership',
        icon: '👔',
        skills: [
          { id: 'ownership', name: 'Ownership', description: 'Taking responsibility', maxLevel: 5, currentLevel: 0, prerequisites: [], benefits: [] },
          { id: 'mentoring', name: 'Mentoring', description: 'Teaching others', maxLevel: 5, currentLevel: 0, prerequisites: ['ownership'], benefits: [] },
          { id: 'influence', name: 'Influence', description: 'Driving decisions', maxLevel: 5, currentLevel: 0, prerequisites: ['mentoring'], benefits: [] },
        ],
        totalPoints: 15,
        unlockedPoints: 0,
      },
    };
  }

  // ============================================================================
  // CHALLENGE MANAGEMENT
  // ============================================================================

  startChallenge(challengeId: string): GameSession | null {
    const challenge = getChallengeById(challengeId);
    if (!challenge) {
      this.setState({ error: `Challenge not found: ${challengeId}` });
      return null;
    }

    const player = this.state.player;
    if (!player) {
      this.setState({ error: 'No player loaded' });
      return null;
    }

    // Check if player has unlocked this challenge
    if (!player.progression.unlockedChallenges.includes(challengeId)) {
      this.setState({ error: 'Challenge not unlocked' });
      return null;
    }

    // Initialize interviewer AI
    const interviewerAI = new InterviewerAI(challenge.briefing.interviewer);

    // Create game session
    const session: GameSession = {
      id: `session_${Date.now()}`,
      playerId: player.id,
      challengeId,
      startedAt: new Date(),
      currentPhase: 'briefing',
      phaseStartedAt: new Date(),
      timeRemaining: challenge.briefing.timeLimit,
      hintsUsed: 0,
      cardsUsed: [],
      conversation: [],
      playerResponses: [],
      interviewerMood: 'neutral',
      silenceTime: 0,
      liveScore: {},
      status: 'active',
    };

    // Generate opening message
    const openingMessage = interviewerAI.generateOpeningMessage(challenge);
    session.conversation.push(openingMessage);

    this.setState({
      currentChallenge: challenge,
      currentSession: session,
      interviewerAI,
    });

    this.emitEvent({ type: 'CHALLENGE_STARTED', challengeId });
    this.startTimers();

    return session;
  }

  private startTimers(): void {
    // Main game timer
    this.timerInterval = setInterval(() => {
      if (this.state.currentSession && this.state.currentSession.status === 'active') {
        const session = { ...this.state.currentSession };
        session.timeRemaining -= 1;

        if (session.timeRemaining <= 0) {
          this.endChallenge('timeout');
          return;
        }

        // Time warnings
        if (session.timeRemaining === 300) {
          this.emitEvent({ type: 'TIME_WARNING', secondsRemaining: 300 });
        } else if (session.timeRemaining === 60) {
          this.emitEvent({ type: 'TIME_WARNING', secondsRemaining: 60 });
        }

        this.setState({ currentSession: session });
      }
    }, 1000);

    // Silence timer
    this.silenceInterval = setInterval(() => {
      if (this.state.currentSession && this.state.currentSession.status === 'active') {
        const session = { ...this.state.currentSession };
        session.silenceTime += 1;

        // Check for silence thresholds
        if (session.silenceTime === 15) {
          this.emitEvent({ type: 'SILENCE_WARNING', seconds: 15 });
        } else if (session.silenceTime === 30) {
          this.emitEvent({ type: 'SILENCE_WARNING', seconds: 30 });
          this.handleInterviewerSilenceResponse(30);
        } else if (session.silenceTime === 45) {
          this.emitEvent({ type: 'SILENCE_WARNING', seconds: 45 });
          this.handleInterviewerSilenceResponse(45);
        }

        this.setState({ currentSession: session });
      }
    }, 1000);
  }

  private stopTimers(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.silenceInterval) {
      clearInterval(this.silenceInterval);
      this.silenceInterval = null;
    }
  }

  private handleInterviewerSilenceResponse(seconds: number): void {
    const { interviewerAI, currentSession } = this.state;
    if (!interviewerAI || !currentSession) return;

    const response = interviewerAI.generateSilenceResponse(seconds);
    if (response) {
      const message: ConversationMessage = {
        id: `msg_${Date.now()}`,
        timestamp: new Date(),
        speaker: 'interviewer',
        content: response.content,
        mood: response.mood,
      };

      const session = { ...currentSession };
      session.conversation.push(message);
      session.interviewerMood = response.mood;
      this.setState({ currentSession: session });
    }
  }

  // ============================================================================
  // PLAYER ACTIONS
  // ============================================================================

  sendMessage(content: string): void {
    const { currentSession, currentChallenge, interviewerAI } = this.state;
    if (!currentSession || !currentChallenge || !interviewerAI) return;

    // Reset silence timer
    const session = { ...currentSession };
    session.silenceTime = 0;

    // Add player message
    const playerMessage: ConversationMessage = {
      id: `msg_${Date.now()}`,
      timestamp: new Date(),
      speaker: 'player',
      content,
    };
    session.conversation.push(playerMessage);

    // Determine response type based on phase
    const responseType = this.getResponseTypeForPhase(session.currentPhase, content);
    const playerResponse: PlayerResponse = {
      id: `resp_${Date.now()}`,
      phase: session.currentPhase,
      timestamp: new Date(),
      type: responseType,
      content,
      timeTaken: this.getPhaseElapsedTime(session),
    };
    session.playerResponses.push(playerResponse);

    // Generate interviewer response
    const aiResponse = interviewerAI.generateFollowUp(content, session.currentPhase);
    const interviewerMessage: ConversationMessage = {
      id: `msg_${Date.now() + 1}`,
      timestamp: new Date(),
      speaker: 'interviewer',
      content: aiResponse.content,
      mood: aiResponse.mood,
      scoreImpact: aiResponse.scoreImpact,
    };
    session.conversation.push(interviewerMessage);
    session.interviewerMood = aiResponse.mood;

    this.setState({ currentSession: session });
    this.emitEvent({ type: 'MESSAGE_SENT', message: playerMessage });
  }

  submitCode(code: string): void {
    const { currentSession, currentChallenge } = this.state;
    if (!currentSession || !currentChallenge) return;

    const session = { ...currentSession };
    session.silenceTime = 0;

    const codeResponse: PlayerResponse = {
      id: `resp_${Date.now()}`,
      phase: 'execution',
      timestamp: new Date(),
      type: 'code_submission',
      content: 'Code submitted',
      code,
      timeTaken: this.getPhaseElapsedTime(session),
    };
    session.playerResponses.push(codeResponse);

    this.setState({ currentSession: session });
    this.emitEvent({ type: 'CODE_SUBMITTED', code });
  }

  useHint(): string | null {
    const { currentSession, currentChallenge, interviewerAI } = this.state;
    if (!currentSession || !currentChallenge || !interviewerAI) return null;

    const session = { ...currentSession };
    session.hintsUsed += 1;

    const hint = interviewerAI.generateHintResponse();

    const hintMessage: ConversationMessage = {
      id: `msg_${Date.now()}`,
      timestamp: new Date(),
      speaker: 'interviewer',
      content: hint,
    };
    session.conversation.push(hintMessage);

    this.setState({ currentSession: session });
    this.emitEvent({ type: 'HINT_USED', hintNumber: session.hintsUsed });

    return hint;
  }

  useCard(cardId: string): boolean {
    const { currentSession, player } = this.state;
    if (!currentSession || !player) return false;

    const cardInstance = player.inventory.skillCards.find(c => c.cardId === cardId);
    if (!cardInstance) return false;

    // Check if card can be used today
    const today = new Date().toDateString();
    const lastUsedDay = cardInstance.lastUsed?.toDateString();

    if (lastUsedDay === today && cardInstance.usesToday >= 1) {
      return false; // Already used today (simplified)
    }

    const session = { ...currentSession };
    session.cardsUsed.push(cardId);

    // Update card usage
    cardInstance.usesToday = lastUsedDay === today ? cardInstance.usesToday + 1 : 1;
    cardInstance.lastUsed = new Date();

    this.setState({ currentSession: session, player });
    this.emitEvent({ type: 'CARD_USED', cardId });

    return true;
  }

  advancePhase(): ChallengePhase | null {
    const { currentSession, currentChallenge } = this.state;
    if (!currentSession || !currentChallenge) return null;

    const phases: ChallengePhase[] = ['briefing', 'clarification', 'approach', 'execution', 'defense', 'debrief'];
    const currentIndex = phases.indexOf(currentSession.currentPhase);

    if (currentIndex >= phases.length - 1) {
      // Last phase, end the challenge
      this.endChallenge('completed');
      return null;
    }

    const nextPhase = phases[currentIndex + 1];
    const session = { ...currentSession };
    session.currentPhase = nextPhase;
    session.phaseStartedAt = new Date();
    session.silenceTime = 0;

    this.setState({ currentSession: session });
    this.emitEvent({ type: 'PHASE_CHANGED', from: currentSession.currentPhase, to: nextPhase });

    return nextPhase;
  }

  // ============================================================================
  // CHALLENGE COMPLETION
  // ============================================================================

  endChallenge(reason: 'completed' | 'timeout' | 'abandoned'): FinalScore | null {
    this.stopTimers();

    const { currentSession, currentChallenge, player } = this.state;
    if (!currentSession || !currentChallenge || !player) return null;

    const session = { ...currentSession };
    session.status = reason === 'completed' ? 'completed' : reason === 'timeout' ? 'failed' : 'abandoned';

    // Calculate final score
    const scoringEngine = new ScoringEngine(currentChallenge, session);
    const finalScore = scoringEngine.calculateFinalScore(player.stats.currentStreak);

    // Update player stats
    this.updatePlayerStats(finalScore, currentChallenge, session);

    this.setState({ currentSession: session });
    this.emitEvent({ type: 'CHALLENGE_COMPLETED', score: finalScore });

    return finalScore;
  }

  private updatePlayerStats(score: FinalScore, challenge: Challenge, session: GameSession): void {
    const { player } = this.state;
    if (!player) return;

    const updatedPlayer = { ...player };
    const stats = { ...updatedPlayer.stats };
    const progression = { ...updatedPlayer.progression };

    // Update XP and rank
    stats.totalXP += score.xpEarned;
    const { rank } = calculateLevelFromXP(stats.totalXP);

    // Check for rank up
    if (rank.level > stats.currentRank.level) {
      stats.currentRank = rank;
      this.emitEvent({ type: 'RANK_UP', newRank: rank });
    }

    // Update other stats
    stats.challengesCompleted += 1;
    if (challenge.level === 'boss') {
      stats.bossesDefeated += 1;
    }

    // Update average score
    stats.averageScore = (stats.averageScore * (stats.challengesCompleted - 1) + score.adjusted) / stats.challengesCompleted;

    // Update highest grade
    const gradeOrder = ['S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
    if (gradeOrder.indexOf(score.grade) < gradeOrder.indexOf(stats.highestGrade)) {
      stats.highestGrade = score.grade;
    }

    // Update play time
    const playTime = Math.floor((Date.now() - session.startedAt.getTime()) / 1000);
    stats.totalPlayTime += playTime;

    // Update progression
    progression.completedChallenges.push(challenge.id);

    // Update world progress
    const worldProgress = { ...progression.worldProgress[challenge.world] };
    if (typeof challenge.level === 'number') {
      worldProgress.levelsCompleted = Math.max(worldProgress.levelsCompleted, challenge.level);
    } else if (challenge.level === 'boss') {
      worldProgress.bossesDefeated.push(challenge.id);
    }
    worldProgress.bestScores[challenge.id] = Math.max(
      worldProgress.bestScores[challenge.id] || 0,
      score.adjusted
    );
    progression.worldProgress[challenge.world] = worldProgress;

    // Unlock next challenges
    challenge.rewards.unlocks.forEach(unlockId => {
      if (!progression.unlockedChallenges.includes(unlockId)) {
        progression.unlockedChallenges.push(unlockId);
      }
    });

    updatedPlayer.stats = stats;
    updatedPlayer.progression = progression;

    this.setState({ player: updatedPlayer });
    this.emitEvent({ type: 'XP_GAINED', amount: score.xpEarned, source: challenge.id });
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private getResponseTypeForPhase(phase: ChallengePhase, content: string): PlayerResponse['type'] {
    const contentLower = content.toLowerCase();

    if (contentLower.includes('?')) {
      return 'clarifying_question';
    }

    switch (phase) {
      case 'clarification':
        return 'clarifying_question';
      case 'approach':
        return 'approach_explanation';
      case 'execution':
        return 'verbal_response';
      case 'defense':
        return 'defense_response';
      default:
        return 'verbal_response';
    }
  }

  private getPhaseElapsedTime(session: GameSession): number {
    return Math.floor((Date.now() - session.phaseStartedAt.getTime()) / 1000);
  }

  // ============================================================================
  // DAILY CHALLENGES
  // ============================================================================

  getDailyChallenges(): DailyChallenge[] {
    const today = new Date();
    const seed = today.toDateString();

    // Generate pseudo-random daily challenges based on date
    return [
      {
        id: `daily_quick_${seed}`,
        name: 'Quick Fire',
        description: 'Solve 3 easy problems in 15 minutes',
        type: 'quick_fire',
        xpReward: 500,
        expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        id: `daily_boss_${seed}`,
        name: 'Boss Rush',
        description: 'Defeat any boss without hints',
        type: 'boss_rush',
        xpReward: 1000,
        bonusReward: 'Rare skill card',
        expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        id: `daily_random_${seed}`,
        name: 'Mystery Challenge',
        description: '???',
        type: 'random',
        xpReward: 750,
        expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        completed: false,
      },
    ];
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  getAvailableChallenges(): Challenge[] {
    const { player } = this.state;
    if (!player) return [];

    return player.progression.unlockedChallenges
      .map(id => getChallengeById(id))
      .filter((c): c is Challenge => c !== undefined);
  }

  getWorldProgress(worldId: WorldId) {
    const { player } = this.state;
    if (!player) return null;

    return player.progression.worldProgress[worldId];
  }

  getPlayerRankInfo() {
    const { player } = this.state;
    if (!player) return null;

    const { rank, progress } = calculateLevelFromXP(player.stats.totalXP);
    const xpToNext = getXPToNextRank(player.stats.totalXP);

    return {
      currentRank: rank,
      progress,
      xpToNext,
      totalXP: player.stats.totalXP,
    };
  }

  pauseSession(): void {
    const { currentSession } = this.state;
    if (currentSession && currentSession.status === 'active') {
      const session = { ...currentSession, status: 'paused' as SessionStatus };
      this.setState({ currentSession: session });
      this.stopTimers();
    }
  }

  resumeSession(): void {
    const { currentSession } = this.state;
    if (currentSession && currentSession.status === 'paused') {
      const session = { ...currentSession, status: 'active' as SessionStatus };
      this.setState({ currentSession: session });
      this.startTimers();
    }
  }

  cleanup(): void {
    this.stopTimers();
    this.setState({
      currentSession: null,
      currentChallenge: null,
      interviewerAI: null,
    });
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let gameEngineInstance: GameEngine | null = null;

export function getGameEngine(): GameEngine {
  if (!gameEngineInstance) {
    gameEngineInstance = new GameEngine();
  }
  return gameEngineInstance;
}

export function resetGameEngine(): void {
  if (gameEngineInstance) {
    gameEngineInstance.cleanup();
  }
  gameEngineInstance = new GameEngine();
}
