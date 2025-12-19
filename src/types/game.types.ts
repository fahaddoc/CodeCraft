// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Core Type Definitions
// ============================================================================

// ============================================================================
// PLAYER & PROGRESSION TYPES
// ============================================================================

export interface Player {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  stats: PlayerStats;
  progression: PlayerProgression;
  inventory: PlayerInventory;
  settings: PlayerSettings;
}

export interface PlayerStats {
  totalXP: number;
  currentRank: Rank;
  currentStreak: number;
  longestStreak: number;
  challengesCompleted: number;
  bossesDefeated: number;
  totalPlayTime: number; // in seconds
  averageScore: number;
  highestGrade: Grade;
}

export interface PlayerProgression {
  currentWorld: WorldId;
  worldProgress: Record<WorldId, WorldProgress>;
  skillTrees: SkillTrees;
  unlockedChallenges: string[];
  completedChallenges: string[];
  achievements: Achievement[];
}

export interface WorldProgress {
  levelsCompleted: number;
  totalLevels: number;
  bossesDefeated: string[];
  bestScores: Record<string, number>;
  secretsFound: string[];
}

export interface PlayerInventory {
  skillCards: SkillCardInstance[];
  mentalModels: MentalModel[];
  titles: Title[];
  equippedTitle: string | null;
}

export interface PlayerSettings {
  preferredLanguage: ProgrammingLanguage;
  difficulty: DifficultyModifier;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  timerWarnings: boolean;
}

// ============================================================================
// RANK & PROGRESSION TYPES
// ============================================================================

export type Tier = 'the_grind' | 'getting_serious' | 'senior_territory' | 'elite_status' | 'legendary';

export interface Rank {
  id: string;
  name: string;
  tier: Tier;
  level: number;
  xpRequired: number;
  icon: string;
  benefits: string[];
}

export const RANKS: Rank[] = [
  // Tier 1: The Grind
  { id: 'fresh_bootcamper', name: 'Fresh Bootcamper', tier: 'the_grind', level: 1, xpRequired: 0, icon: '🌱', benefits: ['Basic challenges unlocked'] },
  { id: 'bug_squasher', name: 'Bug Squasher', tier: 'the_grind', level: 2, xpRequired: 1000, icon: '🐛', benefits: ['+1 daily hint'] },
  { id: 'code_monkey', name: 'Code Monkey', tier: 'the_grind', level: 3, xpRequired: 3000, icon: '🐵', benefits: ['Debugging challenges unlocked'] },
  { id: 'junior_dev', name: 'Junior Dev', tier: 'the_grind', level: 4, xpRequired: 6000, icon: '👶', benefits: ['+5% XP bonus'] },
  { id: 'rising_developer', name: 'Rising Developer', tier: 'the_grind', level: 5, xpRequired: 10000, icon: '📈', benefits: ['World 1 Boss unlocked'] },

  // Tier 2: Getting Serious
  { id: 'solid_engineer', name: 'Solid Engineer', tier: 'getting_serious', level: 6, xpRequired: 15000, icon: '🔧', benefits: ['System design basics unlocked'] },
  { id: 'debug_detective', name: 'Debug Detective', tier: 'getting_serious', level: 7, xpRequired: 22000, icon: '🔍', benefits: ['+2 daily hints'] },
  { id: 'algorithm_adept', name: 'Algorithm Adept', tier: 'getting_serious', level: 8, xpRequired: 30000, icon: '🧮', benefits: ['Advanced algorithms unlocked'] },
  { id: 'system_thinker', name: 'System Thinker', tier: 'getting_serious', level: 9, xpRequired: 40000, icon: '🧠', benefits: ['+10% XP bonus'] },
  { id: 'interview_survivor', name: 'Interview Survivor', tier: 'getting_serious', level: 10, xpRequired: 52000, icon: '💪', benefits: ['World 2 unlocked'] },

  // Tier 3: Senior Territory
  { id: 'tech_lead_material', name: 'Tech Lead Material', tier: 'senior_territory', level: 11, xpRequired: 66000, icon: '👔', benefits: ['Leadership scenarios unlocked'] },
  { id: 'architecture_apprentice', name: 'Architecture Apprentice', tier: 'senior_territory', level: 12, xpRequired: 82000, icon: '🏗️', benefits: ['+3 daily hints'] },
  { id: 'scale_specialist', name: 'Scale Specialist', tier: 'senior_territory', level: 13, xpRequired: 100000, icon: '📊', benefits: ['Scale challenges unlocked'] },
  { id: 'performance_prophet', name: 'Performance Prophet', tier: 'senior_territory', level: 14, xpRequired: 120000, icon: '⚡', benefits: ['+15% XP bonus'] },
  { id: 'senior_certified', name: 'Senior Certified', tier: 'senior_territory', level: 15, xpRequired: 145000, icon: '🎖️', benefits: ['World 3 unlocked'] },

  // Tier 4: Elite Status
  { id: 'staff_candidate', name: 'Staff Candidate', tier: 'elite_status', level: 16, xpRequired: 175000, icon: '⭐', benefits: ['Staff-level challenges unlocked'] },
  { id: 'principal_path', name: 'Principal Path', tier: 'elite_status', level: 17, xpRequired: 210000, icon: '🌟', benefits: ['+5 daily hints'] },
  { id: 'system_sage', name: 'System Sage', tier: 'elite_status', level: 18, xpRequired: 250000, icon: '🧙', benefits: ['Principal challenges unlocked'] },
  { id: 'interview_master', name: 'Interview Master', tier: 'elite_status', level: 19, xpRequired: 300000, icon: '🏆', benefits: ['+20% XP bonus'] },
  { id: 'interview_legend', name: 'Interview Legend', tier: 'elite_status', level: 20, xpRequired: 400000, icon: '👑', benefits: ['World 4 unlocked', 'Mentor mode unlocked'] },
];

export type Grade = 'S+' | 'S' | 'S-' | 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';

export const GRADE_THRESHOLDS: Record<Grade, number> = {
  'S+': 95, 'S': 90, 'S-': 87,
  'A+': 85, 'A': 80, 'A-': 77,
  'B+': 75, 'B': 70, 'B-': 67,
  'C+': 65, 'C': 60, 'C-': 57,
  'D': 50, 'F': 0
};

// ============================================================================
// WORLD & CHALLENGE TYPES
// ============================================================================

export type WorldId = 'world_1' | 'world_2' | 'world_3' | 'world_4';

export interface World {
  id: WorldId;
  name: string;
  subtitle: string;
  theme: string;
  description: string;
  requiredRank: string;
  totalLevels: number;
  bossCount: number;
  focusAreas: string[];
  unlockXP: number;
}

export const WORLDS: World[] = [
  {
    id: 'world_1',
    name: 'The Gauntlet',
    subtitle: 'Junior → Mid-Level',
    theme: 'Survival',
    description: 'Prove you belong in tech. Master the fundamentals and survive your first real interviews.',
    requiredRank: 'fresh_bootcamper',
    totalLevels: 20,
    bossCount: 5,
    focusAreas: ['Basic Data Structures', 'Simple Algorithms', 'Code Reading', 'Communication Basics'],
    unlockXP: 0
  },
  {
    id: 'world_2',
    name: 'The Crucible',
    subtitle: 'Mid → Senior',
    theme: 'Depth',
    description: 'Show you can own complex problems. Dive deep into systems and prove your senior potential.',
    requiredRank: 'interview_survivor',
    totalLevels: 25,
    bossCount: 6,
    focusAreas: ['Advanced Algorithms', 'System Design Fundamentals', 'Database Design', 'Debugging Production'],
    unlockXP: 52000
  },
  {
    id: 'world_3',
    name: 'The Ascent',
    subtitle: 'Senior → Staff/Lead',
    theme: 'Leadership',
    description: 'Prove you can lead and scale. Navigate cross-team challenges and architectural decisions.',
    requiredRank: 'senior_certified',
    totalLevels: 30,
    bossCount: 7,
    focusAreas: ['Large-Scale Design', 'Technical Leadership', 'Cross-Team Collaboration', 'Mentoring'],
    unlockXP: 145000
  },
  {
    id: 'world_4',
    name: 'Legendary Mode',
    subtitle: 'Principal / Interview God',
    theme: 'Mastery',
    description: 'You ARE the bar. Face the most challenging scenarios and become an Interview Legend.',
    requiredRank: 'interview_legend',
    totalLevels: 40,
    bossCount: 10,
    focusAreas: ['Industry-Shaping Decisions', 'Executive Communication', 'Multi-Year Vision', 'The Complete Engineer'],
    unlockXP: 400000
  }
];

export type ChallengeType =
  | 'algorithm'
  | 'debugging'
  | 'system_design'
  | 'code_review'
  | 'behavioral'
  | 'frontend'
  | 'backend'
  | 'performance'
  | 'refactoring'
  | 'live_coding'
  | 'multi_phase';

export type ChallengePhase =
  | 'briefing'
  | 'clarification'
  | 'approach'
  | 'execution'
  | 'defense'
  | 'debrief';

export interface Challenge {
  id: string;
  name: string;
  world: WorldId;
  level: number | 'boss';
  difficulty: number; // 1-10
  type: ChallengeType;
  briefing: ChallengeBriefing;
  problem: ChallengeProblem;
  phases: PhaseConfig[];
  scoring: ScoringConfig;
  feedback: ChallengeFeedback;
  rewards: ChallengeRewards;
  tags: string[];
  prerequisites: string[];
}

export interface ChallengeBriefing {
  context: string;
  companyType: string;
  roleLevel: string;
  interviewer: InterviewerId;
  timeLimit: number; // seconds
  stakes: string;
  hints: string[];
}

export interface ChallengeProblem {
  description: string;
  intentionallyVague: boolean;
  vagueAspects?: string[];
  constraints?: Record<string, string>;
  starterCode?: string;
  brokenCode?: string;
  testCases: TestCase[];
  hiddenTestCases: TestCase[];
  expectedClarifications: string[];
  antiPatterns: string[];
  optimalApproach?: string;
}

export interface TestCase {
  id: string;
  name: string;
  input: unknown;
  expected: unknown;
  isHidden: boolean;
  isEdgeCase: boolean;
  points: number;
}

export interface PhaseConfig {
  phase: ChallengePhase;
  duration: number; // seconds
  instructions: string;
  silenceThreshold: number;
  requiredActions?: string[];
}

export interface ScoringConfig {
  weights: ScoreWeights;
  bonuses: ScoreBonus[];
  penalties: ScorePenalty[];
  passingScore: number;
}

export interface ScoreWeights {
  technical: number;
  communication: number;
  problemSolving: number;
  seniorSignals: number;
}

export interface ScoreBonus {
  id: string;
  name: string;
  condition: string;
  points: number;
}

export interface ScorePenalty {
  id: string;
  name: string;
  trigger: string;
  points: number;
}

export interface ChallengeFeedback {
  weak: string;
  strong: string;
  legend: string;
  commonMistakes: string[];
  proTips: string[];
}

export interface ChallengeRewards {
  baseXP: number;
  skillPoints: Record<SkillTreeId, number>;
  possibleCards: string[];
  possibleModels: string[];
  unlocks: string[];
}

// ============================================================================
// INTERVIEWER TYPES
// ============================================================================

export type InterviewerId = string;

export type InterviewerArchetype =
  | 'the_mentor'
  | 'the_skeptic'
  | 'the_silent'
  | 'the_rapid_fire'
  | 'the_deep_diver'
  | 'the_big_picture'
  | 'the_nitpicker'
  | 'the_friendly'
  | 'the_intimidator'
  | 'the_philosopher'
  | 'the_practitioner'
  | 'the_academic'
  | 'the_business_mind'
  | 'the_defensive_senior';

export interface Interviewer {
  id: InterviewerId;
  name: string;
  company: string;
  role: string;
  archetype: InterviewerArchetype;
  avatar: string;
  personality: PersonalityTraits;
  questionStyle: QuestionStyle;
  feedbackStyle: FeedbackStyle;
  triggerResponses: TriggerResponse[];
  catchPhrases: string[];
}

export interface PersonalityTraits {
  patience: number;      // 0-100
  warmth: number;        // 0-100
  directness: number;    // 0-100
  flexibility: number;   // 0-100
  techDepth: number;     // 0-100
  communicationValue: number; // 0-100
}

export interface QuestionStyle {
  opensWithSmallTalk: boolean;
  givesHints: boolean;
  acknowledgesProgress: boolean;
  interruptionFrequency: 'never' | 'rarely' | 'sometimes' | 'often';
  followUpDepth: 'shallow' | 'moderate' | 'deep';
}

export interface FeedbackStyle {
  immediate: boolean;
  encouraging: boolean;
  specific: boolean;
  suggestsImprovements: boolean;
}

export interface TriggerResponse {
  trigger: string;
  response: string;
  moodChange: number; // -10 to +10
}

export type InterviewerMood = 'impressed' | 'interested' | 'neutral' | 'skeptical' | 'concerned' | 'frustrated';

// ============================================================================
// SCORING TYPES
// ============================================================================

export interface ScoreBreakdown {
  technical: TechnicalScore;
  communication: CommunicationScore;
  problemSolving: ProblemSolvingScore;
  seniorSignals: SeniorSignalsScore;
}

export interface TechnicalScore {
  correctness: number;
  efficiency: number;
  codeQuality: number;
  edgeCases: number;
  scalability: number;
}

export interface CommunicationScore {
  clarity: number;
  structure: number;
  questioning: number;
  collaboration: number;
  confidence: number;
}

export interface ProblemSolvingScore {
  approach: number;
  tradeoffs: number;
  adaptability: number;
  creativity: number;
  pragmatism: number;
}

export interface SeniorSignalsScore {
  businessAwareness: number;
  mentorMindset: number;
  ownershipMentality: number;
  humility: number;
  leadership: number;
}

export interface FinalScore {
  raw: number;
  adjusted: number;
  grade: Grade;
  xpEarned: number;
  breakdown: ScoreBreakdown;
  bonusesApplied: string[];
  penaltiesApplied: string[];
  feedback: ScoreFeedback;
}

export interface ScoreFeedback {
  strengths: string[];
  improvements: string[];
  comparison: {
    weak: string;
    strong: string;
    legend: string;
  };
}

// ============================================================================
// SKILL TREE TYPES
// ============================================================================

export type SkillTreeId = 'algorithms' | 'systems' | 'frontend' | 'backend' | 'soft_skills' | 'leadership';

export interface SkillTrees {
  algorithms: SkillTree;
  systems: SkillTree;
  frontend: SkillTree;
  backend: SkillTree;
  soft_skills: SkillTree;
  leadership: SkillTree;
}

export interface SkillTree {
  id: SkillTreeId;
  name: string;
  icon: string;
  skills: Skill[];
  totalPoints: number;
  unlockedPoints: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  currentLevel: number;
  prerequisites: string[];
  benefits: SkillBenefit[];
}

export interface SkillBenefit {
  level: number;
  description: string;
  effect: SkillEffect;
}

export type SkillEffect =
  | { type: 'xp_bonus'; value: number }
  | { type: 'hint_discount'; value: number }
  | { type: 'time_bonus'; value: number }
  | { type: 'score_bonus'; category: string; value: number }
  | { type: 'unlock'; challengeId: string };

// ============================================================================
// INVENTORY TYPES
// ============================================================================

export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface SkillCard {
  id: string;
  name: string;
  description: string;
  rarity: CardRarity;
  effect: CardEffect;
  usesPerDay: number;
  cooldown: number; // seconds
  artwork: string;
  flavorText: string;
}

export interface SkillCardInstance {
  cardId: string;
  acquiredAt: Date;
  usesToday: number;
  lastUsed: Date | null;
}

export type CardEffect =
  | { type: 'reveal_hint'; count: number }
  | { type: 'extend_time'; seconds: number }
  | { type: 'show_tradeoffs' }
  | { type: 'highlight_bug' }
  | { type: 'score_boost'; category: string; percentage: number }
  | { type: 'skip_phase'; phase: ChallengePhase }
  | { type: 'show_optimal_approach' };

export interface MentalModel {
  id: string;
  name: string;
  category: string;
  description: string;
  example: string;
  unlockCondition: string;
  unlockedAt: Date | null;
}

export interface Title {
  id: string;
  name: string;
  description: string;
  rarity: CardRarity;
  unlockCondition: string;
  unlockedAt: Date | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt: Date;
}

// ============================================================================
// GAME SESSION TYPES
// ============================================================================

export interface GameSession {
  id: string;
  playerId: string;
  challengeId: string;
  startedAt: Date;
  currentPhase: ChallengePhase;
  phaseStartedAt: Date;
  timeRemaining: number;
  hintsUsed: number;
  cardsUsed: string[];
  conversation: ConversationMessage[];
  playerResponses: PlayerResponse[];
  interviewerMood: InterviewerMood;
  silenceTime: number;
  liveScore: Partial<ScoreBreakdown>;
  status: SessionStatus;
}

export type SessionStatus = 'active' | 'paused' | 'completed' | 'abandoned' | 'failed';

export interface ConversationMessage {
  id: string;
  timestamp: Date;
  speaker: 'interviewer' | 'player' | 'system';
  content: string;
  mood?: InterviewerMood;
  scoreImpact?: Partial<ScoreBreakdown>;
}

export interface PlayerResponse {
  id: string;
  phase: ChallengePhase;
  timestamp: Date;
  type: ResponseType;
  content: string;
  code?: string;
  diagram?: string;
  timeTaken: number;
}

export type ResponseType =
  | 'clarifying_question'
  | 'approach_explanation'
  | 'code_submission'
  | 'verbal_response'
  | 'tradeoff_acknowledgment'
  | 'defense_response';

// ============================================================================
// PROGRAMMING LANGUAGE TYPES
// ============================================================================

export type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'go'
  | 'rust'
  | 'csharp';

export type DifficultyModifier = 'easy' | 'normal' | 'hard' | 'brutal';

// ============================================================================
// EVENT TYPES
// ============================================================================

export type GameEvent =
  | { type: 'CHALLENGE_STARTED'; challengeId: string }
  | { type: 'PHASE_CHANGED'; from: ChallengePhase; to: ChallengePhase }
  | { type: 'MESSAGE_SENT'; message: ConversationMessage }
  | { type: 'CODE_SUBMITTED'; code: string }
  | { type: 'HINT_USED'; hintNumber: number }
  | { type: 'CARD_USED'; cardId: string }
  | { type: 'SILENCE_WARNING'; seconds: number }
  | { type: 'TIME_WARNING'; secondsRemaining: number }
  | { type: 'CHALLENGE_COMPLETED'; score: FinalScore }
  | { type: 'CHALLENGE_FAILED'; reason: string }
  | { type: 'XP_GAINED'; amount: number; source: string }
  | { type: 'RANK_UP'; newRank: Rank }
  | { type: 'ACHIEVEMENT_UNLOCKED'; achievement: Achievement }
  | { type: 'CARD_ACQUIRED'; card: SkillCard }
  | { type: 'MODEL_UNLOCKED'; model: MentalModel };

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  username: string;
  title: string;
  totalXP: number;
  currentRank: Rank;
  challengesCompleted: number;
  averageScore: number;
}

export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  type: 'quick_fire' | 'boss_rush' | 'random' | 'themed';
  xpReward: number;
  bonusReward?: string;
  expiresAt: Date;
  completed: boolean;
}
