// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Scoring Engine
// ============================================================================

import {
  ScoreBreakdown,
  TechnicalScore,
  CommunicationScore,
  ProblemSolvingScore,
  SeniorSignalsScore,
  FinalScore,
  Grade,
  GRADE_THRESHOLDS,
  RANKS,
  Challenge,
  GameSession,
  PlayerResponse,
  ConversationMessage,
  ScoreFeedback,
} from '../types/game.types';

// ============================================================================
// SCORING WEIGHTS
// ============================================================================

const DEFAULT_WEIGHTS = {
  technical: 0.40,
  communication: 0.25,
  problemSolving: 0.20,
  seniorSignals: 0.15,
};

// ============================================================================
// PENALTY DEFINITIONS
// ============================================================================

export const PENALTIES = {
  // Technical anti-patterns
  prematureOptimization: { points: -15, name: 'Premature Optimization' },
  overEngineering: { points: -20, name: 'Over-Engineering' },
  noEdgeCaseHandling: { points: -10, name: 'Missing Edge Cases' },
  magicNumbers: { points: -5, name: 'Magic Numbers' },
  poorNaming: { points: -5, name: 'Poor Variable Naming' },
  bruteForceWhenOptimalExists: { points: -10, name: 'Suboptimal Solution' },
  syntaxErrors: { points: -8, name: 'Syntax Errors' },
  runtimeErrors: { points: -12, name: 'Runtime Errors' },

  // Communication anti-patterns
  jumpedToCode: { points: -15, name: 'Jumped Straight to Coding' },
  buzzwordSoup: { points: -10, name: 'Buzzword Soup' },
  defensiveness: { points: -15, name: 'Defensive Attitude' },
  overConfidence: { points: -10, name: 'Over-Confidence' },
  underConfidence: { points: -8, name: 'Under-Confidence' },
  poorExplanation: { points: -10, name: 'Poor Explanation' },
  ignoredInterviewer: { points: -15, name: 'Ignored Interviewer Hints' },

  // Behavioral anti-patterns
  blamedOthers: { points: -25, name: 'Blamed Others' },
  noOwnership: { points: -20, name: 'No Ownership' },
  toxicAttitude: { points: -30, name: 'Toxic Attitude' },
  lackedSelfAwareness: { points: -15, name: 'Lacked Self-Awareness' },

  // Process anti-patterns
  stubbornness: { points: -10, name: 'Stubbornness' },
  gaveUp: { points: -25, name: 'Gave Up Too Easily' },
  silenceTooLong: { points: -5, name: 'Excessive Silence' },
  rushedAnswer: { points: -8, name: 'Rushed Answer' },
};

// ============================================================================
// BONUS DEFINITIONS
// ============================================================================

export const BONUSES = {
  // Performance bonuses
  noHints: { points: 15, name: 'No Hints Used' },
  fastCompletion: { points: 10, name: 'Fast Completion' },
  optimalSolution: { points: 20, name: 'Optimal Solution' },
  elegantCode: { points: 10, name: 'Elegant Code' },
  allTestsPassed: { points: 15, name: 'All Tests Passed' },
  hiddenTestsPassed: { points: 20, name: 'Hidden Tests Passed' },

  // Communication bonuses
  greatClarifyingQuestions: { points: 15, name: 'Great Clarifying Questions' },
  clearExplanation: { points: 10, name: 'Clear Explanation' },
  goodCollaboration: { points: 10, name: 'Good Collaboration' },
  askedForFeedback: { points: 5, name: 'Asked for Feedback' },

  // Senior signal bonuses
  acknowledgedTradeoffs: { points: 15, name: 'Acknowledged Tradeoffs' },
  consideredScale: { points: 10, name: 'Considered Scale' },
  mentionedMonitoring: { points: 5, name: 'Mentioned Monitoring' },
  thoughtAboutMaintenance: { points: 5, name: 'Thought About Maintenance' },
  discussedEdgeCases: { points: 10, name: 'Discussed Edge Cases' },

  // Streak bonuses
  streakBonus: { pointsPerDay: 2, name: 'Daily Streak' },
  perfectStreak: { points: 50, name: 'Perfect Week' },
};

// ============================================================================
// SCORING ENGINE CLASS
// ============================================================================

export class ScoringEngine {
  private challenge: Challenge;
  private session: GameSession;
  private appliedBonuses: string[] = [];
  private appliedPenalties: string[] = [];

  constructor(challenge: Challenge, session: GameSession) {
    this.challenge = challenge;
    this.session = session;
  }

  // ============================================================================
  // MAIN SCORING METHODS
  // ============================================================================

  calculateFinalScore(streakDays: number = 0): FinalScore {
    const breakdown = this.calculateBreakdown();
    const rawScore = this.calculateRawScore(breakdown);
    const adjustedScore = this.applyMultipliers(rawScore, streakDays);
    const grade = this.calculateGrade(adjustedScore);
    const xpEarned = this.calculateXP(adjustedScore, grade);

    return {
      raw: rawScore,
      adjusted: Math.min(100, adjustedScore),
      grade,
      xpEarned,
      breakdown,
      bonusesApplied: this.appliedBonuses,
      penaltiesApplied: this.appliedPenalties,
      feedback: this.generateFeedback(breakdown),
    };
  }

  calculateBreakdown(): ScoreBreakdown {
    return {
      technical: this.scoreTechnical(),
      communication: this.scoreCommunication(),
      problemSolving: this.scoreProblemSolving(),
      seniorSignals: this.scoreSeniorSignals(),
    };
  }

  // ============================================================================
  // TECHNICAL SCORING
  // ============================================================================

  private scoreTechnical(): TechnicalScore {
    const codeResponses = this.session.playerResponses.filter(
      r => r.type === 'code_submission'
    );

    return {
      correctness: this.evaluateCorrectness(codeResponses),
      efficiency: this.evaluateEfficiency(codeResponses),
      codeQuality: this.evaluateCodeQuality(codeResponses),
      edgeCases: this.evaluateEdgeCases(codeResponses),
      scalability: this.evaluateScalability(codeResponses),
    };
  }

  private evaluateCorrectness(responses: PlayerResponse[]): number {
    if (responses.length === 0) return 50;

    const lastSubmission = responses[responses.length - 1];
    const testCases = this.challenge.problem.testCases;
    const hiddenCases = this.challenge.problem.hiddenTestCases;

    // Simulate test case passing (in real implementation, would run actual tests)
    let passedVisible = 0;
    let passedHidden = 0;

    // Score based on code analysis
    const code = lastSubmission.code || '';

    // Check for basic correctness indicators
    if (code.includes('return') || code.includes('console.log')) {
      passedVisible = Math.floor(testCases.length * 0.7);
    }

    if (code.length > 100) {
      passedVisible = Math.floor(testCases.length * 0.9);
      passedHidden = Math.floor(hiddenCases.length * 0.5);
    }

    const visibleScore = (passedVisible / Math.max(testCases.length, 1)) * 60;
    const hiddenScore = (passedHidden / Math.max(hiddenCases.length, 1)) * 40;

    if (passedHidden === hiddenCases.length) {
      this.appliedBonuses.push(BONUSES.hiddenTestsPassed.name);
    }

    return Math.min(100, visibleScore + hiddenScore);
  }

  private evaluateEfficiency(responses: PlayerResponse[]): number {
    if (responses.length === 0) return 50;

    const lastSubmission = responses[responses.length - 1];
    const code = lastSubmission.code || '';
    let score = 70; // Base score

    // Check for efficient patterns
    if (code.includes('Map') || code.includes('Set') || code.includes('{}')) {
      score += 10; // Using hash-based structures
    }

    if (code.includes('sort(') && !code.includes('bubble')) {
      score += 5; // Using built-in sort
    }

    // Penalize inefficient patterns
    if (code.match(/for.*for.*for/)) {
      score -= 20; // Triple nested loops
      this.appliedPenalties.push(PENALTIES.bruteForceWhenOptimalExists.name);
    } else if (code.match(/for.*for/)) {
      score -= 10; // Double nested loops (might be necessary)
    }

    if (this.challenge.problem.optimalApproach) {
      const optimal = this.challenge.problem.optimalApproach.toLowerCase();
      if (code.toLowerCase().includes(optimal)) {
        score += 15;
        this.appliedBonuses.push(BONUSES.optimalSolution.name);
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateCodeQuality(responses: PlayerResponse[]): number {
    if (responses.length === 0) return 50;

    const lastSubmission = responses[responses.length - 1];
    const code = lastSubmission.code || '';
    let score = 75;

    // Good naming
    const hasDescriptiveNames = /[a-z]+[A-Z][a-z]+|_[a-z]+/.test(code);
    if (hasDescriptiveNames) score += 10;

    // Comments for complex logic
    if (code.includes('//') || code.includes('/*')) score += 5;

    // Consistent formatting
    const lines = code.split('\n');
    const indentedLines = lines.filter(l => l.startsWith('  ') || l.startsWith('\t'));
    if (indentedLines.length > lines.length * 0.3) score += 5;

    // Magic numbers
    const hasMagicNumbers = /[^a-zA-Z][0-9]{2,}[^a-zA-Z0-9]/.test(code);
    if (hasMagicNumbers) {
      score -= 5;
      this.appliedPenalties.push(PENALTIES.magicNumbers.name);
    }

    // Single letter variables (except i, j, k for loops)
    const hasPoorNaming = /\b[a-hlo-zA-Z]\s*=/.test(code);
    if (hasPoorNaming) {
      score -= 5;
      this.appliedPenalties.push(PENALTIES.poorNaming.name);
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateEdgeCases(responses: PlayerResponse[]): number {
    if (responses.length === 0) return 50;

    const conversation = this.session.conversation;
    const code = responses[responses.length - 1]?.code || '';
    let score = 60;

    // Check if player asked about edge cases
    const askedAboutEdges = conversation.some(
      m => m.speaker === 'player' &&
        (m.content.toLowerCase().includes('edge') ||
          m.content.toLowerCase().includes('empty') ||
          m.content.toLowerCase().includes('null') ||
          m.content.toLowerCase().includes('negative') ||
          m.content.toLowerCase().includes('zero'))
    );

    if (askedAboutEdges) {
      score += 15;
      this.appliedBonuses.push(BONUSES.discussedEdgeCases.name);
    }

    // Check code for edge case handling
    if (code.includes('if') && (
      code.includes('null') ||
      code.includes('undefined') ||
      code.includes('length === 0') ||
      code.includes('.length === 0') ||
      code.includes('!') ||
      code.includes('< 0')
    )) {
      score += 15;
    }

    // Check for boundary checks
    if (code.includes('<=') || code.includes('>=')) {
      score += 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateScalability(responses: PlayerResponse[]): number {
    const conversation = this.session.conversation;
    let score = 60;

    // Check if player discussed scalability
    const discussedScale = conversation.some(
      m => m.speaker === 'player' &&
        (m.content.toLowerCase().includes('scale') ||
          m.content.toLowerCase().includes('million') ||
          m.content.toLowerCase().includes('performance') ||
          m.content.toLowerCase().includes('complexity') ||
          m.content.toLowerCase().includes('big o') ||
          m.content.toLowerCase().includes('o(n)') ||
          m.content.toLowerCase().includes('o(1)'))
    );

    if (discussedScale) {
      score += 20;
      this.appliedBonuses.push(BONUSES.consideredScale.name);
    }

    // Check for caching mentions
    if (conversation.some(m =>
      m.speaker === 'player' &&
      (m.content.toLowerCase().includes('cache') ||
        m.content.toLowerCase().includes('memoiz'))
    )) {
      score += 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  // ============================================================================
  // COMMUNICATION SCORING
  // ============================================================================

  private scoreCommunication(): CommunicationScore {
    return {
      clarity: this.evaluateClarity(),
      structure: this.evaluateStructure(),
      questioning: this.evaluateQuestioning(),
      collaboration: this.evaluateCollaboration(),
      confidence: this.evaluateConfidence(),
    };
  }

  private evaluateClarity(): number {
    const playerMessages = this.session.conversation.filter(
      m => m.speaker === 'player'
    );
    let score = 70;

    // Average message length (not too short, not too long)
    const avgLength = playerMessages.reduce((sum, m) => sum + m.content.length, 0) /
      Math.max(playerMessages.length, 1);

    if (avgLength > 50 && avgLength < 300) {
      score += 10;
    } else if (avgLength < 20) {
      score -= 10;
    } else if (avgLength > 500) {
      score -= 5; // Too verbose
    }

    // Check for structured thinking indicators
    const hasStructure = playerMessages.some(m =>
      m.content.includes('First') ||
      m.content.includes('Then') ||
      m.content.includes('1.') ||
      m.content.includes('Step')
    );

    if (hasStructure) {
      score += 10;
      this.appliedBonuses.push(BONUSES.clearExplanation.name);
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateStructure(): number {
    const approachResponses = this.session.playerResponses.filter(
      r => r.type === 'approach_explanation'
    );
    let score = 65;

    if (approachResponses.length > 0) {
      const approach = approachResponses[0].content;

      // Check for structured approach
      if (approach.includes('approach') || approach.includes('plan')) {
        score += 10;
      }

      if (approach.includes('brute force') && approach.includes('optimize')) {
        score += 15; // Mentioned starting simple then optimizing
      }

      if (approach.length > 100) {
        score += 5;
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateQuestioning(): number {
    const clarifyingQuestions = this.session.playerResponses.filter(
      r => r.type === 'clarifying_question'
    );
    const expectedQuestions = this.challenge.problem.expectedClarifications;
    let score = 50;

    // Score based on number of questions asked
    const questionCount = clarifyingQuestions.length;
    if (questionCount >= 2) score += 15;
    if (questionCount >= 4) score += 10;
    if (questionCount >= 6) score += 5;

    // Check for quality of questions
    const questionTexts = clarifyingQuestions.map(q => q.content.toLowerCase());

    expectedQuestions.forEach(expected => {
      const keywords = expected.toLowerCase().split(' ').filter(w => w.length > 4);
      const matched = keywords.some(k => questionTexts.some(q => q.includes(k)));
      if (matched) score += 5;
    });

    // Bonus for great questions
    if (score >= 85) {
      this.appliedBonuses.push(BONUSES.greatClarifyingQuestions.name);
    }

    // Penalty for no questions
    if (questionCount === 0) {
      score = 30;
      this.appliedPenalties.push(PENALTIES.jumpedToCode.name);
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateCollaboration(): number {
    const conversation = this.session.conversation;
    let score = 70;

    // Check for acknowledgment of interviewer hints
    const interviewerHints = conversation.filter(
      m => m.speaker === 'interviewer' &&
        (m.content.includes('hint') ||
          m.content.includes('consider') ||
          m.content.includes('what about'))
    );

    const playerAcknowledgments = conversation.filter(
      m => m.speaker === 'player' &&
        (m.content.toLowerCase().includes('good point') ||
          m.content.toLowerCase().includes('you\'re right') ||
          m.content.toLowerCase().includes('let me think') ||
          m.content.toLowerCase().includes('that\'s a good'))
    );

    if (playerAcknowledgments.length > 0) {
      score += 15;
      this.appliedBonuses.push(BONUSES.goodCollaboration.name);
    }

    // Check if player ignored hints
    if (interviewerHints.length > 0 && playerAcknowledgments.length === 0) {
      score -= 15;
      this.appliedPenalties.push(PENALTIES.ignoredInterviewer.name);
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateConfidence(): number {
    const playerMessages = this.session.conversation.filter(
      m => m.speaker === 'player'
    );
    let score = 70;

    // Detect over-confidence
    const overConfidentPhrases = [
      'obviously', 'clearly', 'trivial', 'easy', 'simple',
      'of course', 'everyone knows'
    ];

    const hasOverConfidence = playerMessages.some(m =>
      overConfidentPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasOverConfidence) {
      score -= 10;
      this.appliedPenalties.push(PENALTIES.overConfidence.name);
    }

    // Detect under-confidence
    const underConfidentPhrases = [
      'i\'m not sure', 'i don\'t know', 'maybe wrong', 'probably bad',
      'i\'m terrible', 'i can\'t'
    ];

    const underConfidentCount = playerMessages.filter(m =>
      underConfidentPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    ).length;

    if (underConfidentCount > 2) {
      score -= 10;
      this.appliedPenalties.push(PENALTIES.underConfidence.name);
    }

    // Reward appropriate confidence
    const confidentPhrases = [
      'i would', 'my approach', 'i believe', 'based on my experience',
      'let me explain'
    ];

    const hasAppropriateConfidence = playerMessages.some(m =>
      confidentPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasAppropriateConfidence && !hasOverConfidence) {
      score += 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  // ============================================================================
  // PROBLEM SOLVING SCORING
  // ============================================================================

  private scoreProblemSolving(): ProblemSolvingScore {
    return {
      approach: this.evaluateApproach(),
      tradeoffs: this.evaluateTradeoffs(),
      adaptability: this.evaluateAdaptability(),
      creativity: this.evaluateCreativity(),
      pragmatism: this.evaluatePragmatism(),
    };
  }

  private evaluateApproach(): number {
    const approachResponses = this.session.playerResponses.filter(
      r => r.type === 'approach_explanation'
    );
    let score = 60;

    if (approachResponses.length > 0) {
      const approach = approachResponses[0].content.toLowerCase();

      // Check for systematic approach
      if (approach.includes('first') || approach.includes('step')) {
        score += 15;
      }

      // Check for considering alternatives
      if (approach.includes('alternative') || approach.includes('could also')) {
        score += 10;
      }

      // Check for thinking out loud
      if (approach.length > 200) {
        score += 10;
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateTradeoffs(): number {
    const conversation = this.session.conversation;
    const tradeoffResponses = this.session.playerResponses.filter(
      r => r.type === 'tradeoff_acknowledgment'
    );
    let score = 50;

    // Direct tradeoff discussions
    const tradeoffMentions = conversation.filter(m =>
      m.speaker === 'player' &&
      (m.content.toLowerCase().includes('tradeoff') ||
        m.content.toLowerCase().includes('trade-off') ||
        m.content.toLowerCase().includes('downside') ||
        m.content.toLowerCase().includes('but') ||
        m.content.toLowerCase().includes('however') ||
        m.content.toLowerCase().includes('on the other hand'))
    );

    if (tradeoffMentions.length > 0) {
      score += 20;
      this.appliedBonuses.push(BONUSES.acknowledgedTradeoffs.name);
    }

    if (tradeoffMentions.length >= 3) {
      score += 15;
    }

    // Explicit tradeoff responses
    if (tradeoffResponses.length > 0) {
      score += 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateAdaptability(): number {
    const conversation = this.session.conversation;
    let score = 70;

    // Check for handling curveballs
    const curveballs = conversation.filter(m =>
      m.speaker === 'interviewer' &&
      (m.content.includes('What if') ||
        m.content.includes('what about') ||
        m.content.includes('now imagine'))
    );

    const responses = conversation.filter(m =>
      m.speaker === 'player' &&
      (m.content.includes('good point') ||
        m.content.includes('in that case') ||
        m.content.includes('then we could'))
    );

    if (curveballs.length > 0 && responses.length >= curveballs.length * 0.5) {
      score += 20;
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateCreativity(): number {
    const conversation = this.session.conversation;
    let score = 65;

    // Check for novel approaches
    const creativePhrases = [
      'what if we', 'another approach', 'alternatively', 'creative solution',
      'interesting idea', 'we could combine'
    ];

    const hasCreativity = conversation.some(m =>
      m.speaker === 'player' &&
      creativePhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasCreativity) {
      score += 20;
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluatePragmatism(): number {
    const conversation = this.session.conversation;
    let score = 70;

    // Check for practical thinking
    const pragmaticPhrases = [
      'start simple', 'mvp', 'iterate', 'good enough', 'practical',
      'in production', 'real world', 'maintenance'
    ];

    const hasPragmatism = conversation.some(m =>
      m.speaker === 'player' &&
      pragmaticPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasPragmatism) {
      score += 15;
    }

    // Check for over-engineering
    const overEngineeringPhrases = [
      'enterprise', 'framework', 'abstract factory', 'microservices'
    ];

    const hasOverEngineering = conversation.some(m =>
      m.speaker === 'player' &&
      overEngineeringPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasOverEngineering && this.challenge.difficulty < 7) {
      score -= 15;
      this.appliedPenalties.push(PENALTIES.overEngineering.name);
    }

    return Math.max(0, Math.min(100, score));
  }

  // ============================================================================
  // SENIOR SIGNALS SCORING
  // ============================================================================

  private scoreSeniorSignals(): SeniorSignalsScore {
    return {
      businessAwareness: this.evaluateBusinessAwareness(),
      mentorMindset: this.evaluateMentorMindset(),
      ownershipMentality: this.evaluateOwnershipMentality(),
      humility: this.evaluateHumility(),
      leadership: this.evaluateLeadership(),
    };
  }

  private evaluateBusinessAwareness(): number {
    const conversation = this.session.conversation;
    let score = 60;

    const businessPhrases = [
      'user experience', 'customer', 'business', 'revenue', 'cost',
      'deadline', 'priority', 'stakeholder', 'requirement', 'product'
    ];

    const businessMentions = conversation.filter(m =>
      m.speaker === 'player' &&
      businessPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    ).length;

    score += Math.min(businessMentions * 10, 30);

    return Math.max(0, Math.min(100, score));
  }

  private evaluateMentorMindset(): number {
    const conversation = this.session.conversation;
    let score = 60;

    // Check for explanation quality
    const explanatoryPhrases = [
      'let me explain', 'the reason', 'because', 'this works by',
      'think of it as', 'for example'
    ];

    const hasExplanation = conversation.some(m =>
      m.speaker === 'player' &&
      explanatoryPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasExplanation) {
      score += 20;
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateOwnershipMentality(): number {
    const conversation = this.session.conversation;
    let score = 70;

    // Check for ownership language
    const ownershipPhrases = [
      'i would', 'my responsibility', 'i\'ll make sure', 'i own',
      'i\'d take', 'accountable'
    ];

    const hasOwnership = conversation.some(m =>
      m.speaker === 'player' &&
      ownershipPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasOwnership) {
      score += 15;
    }

    // Penalty for blaming
    const blamePhrases = [
      'not my fault', 'they didn\'t', 'wasn\'t my', 'pm\'s fault',
      'designer didn\'t'
    ];

    const hasBlaming = conversation.some(m =>
      m.speaker === 'player' &&
      blamePhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasBlaming) {
      score -= 25;
      this.appliedPenalties.push(PENALTIES.blamedOthers.name);
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateHumility(): number {
    const conversation = this.session.conversation;
    let score = 75;

    // Check for humble language
    const humblePhrases = [
      'i\'m not sure', 'i could be wrong', 'one approach', 'i\'d need to research',
      'great question', 'i learned', 'feedback'
    ];

    const hasHumility = conversation.some(m =>
      m.speaker === 'player' &&
      humblePhrases.some(phrase => m.content.toLowerCase().includes(phrase))
    );

    if (hasHumility) {
      score += 15;
    }

    // Asked for feedback
    if (conversation.some(m =>
      m.speaker === 'player' &&
      m.content.toLowerCase().includes('feedback')
    )) {
      this.appliedBonuses.push(BONUSES.askedForFeedback.name);
      score += 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  private evaluateLeadership(): number {
    let score = 60;

    // Leadership is more relevant for senior challenges
    if (this.challenge.world === 'world_3' || this.challenge.world === 'world_4') {
      const conversation = this.session.conversation;

      const leadershipPhrases = [
        'team', 'mentor', 'delegate', 'align', 'vision', 'strategy',
        'cross-functional', 'collaborate'
      ];

      const leadershipMentions = conversation.filter(m =>
        m.speaker === 'player' &&
        leadershipPhrases.some(phrase => m.content.toLowerCase().includes(phrase))
      ).length;

      score += Math.min(leadershipMentions * 8, 30);
    }

    return Math.max(0, Math.min(100, score));
  }

  // ============================================================================
  // SCORE CALCULATION HELPERS
  // ============================================================================

  private calculateRawScore(breakdown: ScoreBreakdown): number {
    const weights = this.challenge.scoring?.weights || DEFAULT_WEIGHTS;

    const technicalAvg = this.average(Object.values(breakdown.technical));
    const communicationAvg = this.average(Object.values(breakdown.communication));
    const problemSolvingAvg = this.average(Object.values(breakdown.problemSolving));
    const seniorSignalsAvg = this.average(Object.values(breakdown.seniorSignals));

    return (
      technicalAvg * weights.technical +
      communicationAvg * weights.communication +
      problemSolvingAvg * weights.problemSolving +
      seniorSignalsAvg * weights.seniorSignals
    );
  }

  private applyMultipliers(rawScore: number, streakDays: number): number {
    let score = rawScore;

    // Time bonus
    const timeUsedRatio = 1 - (this.session.timeRemaining / this.challenge.briefing.timeLimit);
    if (timeUsedRatio < 0.8 && rawScore > 70) {
      score *= 1.1;
      this.appliedBonuses.push(BONUSES.fastCompletion.name);
    }

    // No hints bonus
    if (this.session.hintsUsed === 0) {
      score *= 1.15;
      this.appliedBonuses.push(BONUSES.noHints.name);
    }

    // Streak bonus
    if (streakDays > 0) {
      score *= (1 + streakDays * 0.02);
      if (streakDays >= 7) {
        this.appliedBonuses.push(BONUSES.perfectStreak.name);
      } else {
        this.appliedBonuses.push(`${BONUSES.streakBonus.name} (${streakDays} days)`);
      }
    }

    // Difficulty multiplier
    score *= (1 + this.challenge.difficulty * 0.02);

    return score;
  }

  private calculateGrade(score: number): Grade {
    const grades: Grade[] = ['S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

    for (const grade of grades) {
      if (score >= GRADE_THRESHOLDS[grade]) {
        return grade;
      }
    }
    return 'F';
  }

  private calculateXP(score: number, grade: Grade): number {
    const gradeXP: Record<Grade, number> = {
      'S+': 1000, 'S': 850, 'S-': 750,
      'A+': 650, 'A': 550, 'A-': 475,
      'B+': 400, 'B': 325, 'B-': 275,
      'C+': 225, 'C': 175, 'C-': 140,
      'D': 100, 'F': 25
    };

    const worldMultiplier: Record<string, number> = {
      'world_1': 1.0,
      'world_2': 1.5,
      'world_3': 2.0,
      'world_4': 3.0
    };

    let xp = gradeXP[grade];
    xp *= worldMultiplier[this.challenge.world] || 1.0;
    xp *= (1 + this.challenge.difficulty * 0.1);

    // Boss bonus
    if (this.challenge.level === 'boss') {
      xp *= 2;
    }

    return Math.floor(xp);
  }

  private generateFeedback(breakdown: ScoreBreakdown): ScoreFeedback {
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Analyze technical
    if (breakdown.technical.correctness >= 85) {
      strengths.push('Strong solution correctness');
    } else if (breakdown.technical.correctness < 60) {
      improvements.push('Focus on getting the solution working correctly first');
    }

    if (breakdown.technical.efficiency >= 80) {
      strengths.push('Efficient algorithm choice');
    } else if (breakdown.technical.efficiency < 60) {
      improvements.push('Consider time and space complexity more carefully');
    }

    // Analyze communication
    if (breakdown.communication.questioning >= 85) {
      strengths.push('Excellent clarifying questions');
    } else if (breakdown.communication.questioning < 60) {
      improvements.push('Ask more clarifying questions before coding');
    }

    if (breakdown.communication.clarity >= 80) {
      strengths.push('Clear and structured communication');
    }

    // Analyze problem solving
    if (breakdown.problemSolving.tradeoffs >= 80) {
      strengths.push('Great awareness of tradeoffs');
    } else if (breakdown.problemSolving.tradeoffs < 60) {
      improvements.push('Discuss tradeoffs of your design decisions');
    }

    // Analyze senior signals
    if (breakdown.seniorSignals.ownershipMentality >= 80) {
      strengths.push('Strong ownership mentality');
    }

    if (breakdown.seniorSignals.humility >= 85) {
      strengths.push('Appropriate humility and openness to feedback');
    }

    return {
      strengths,
      improvements,
      comparison: this.challenge.feedback,
    };
  }

  private average(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }
}

// ============================================================================
// XP CALCULATION UTILITIES
// ============================================================================

export function calculateLevelFromXP(totalXP: number): { rank: (typeof RANKS)[number]; progress: number } {
  let currentRank = RANKS[0];

  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (totalXP >= RANKS[i].xpRequired) {
      currentRank = RANKS[i];
      break;
    }
  }

  const nextRankIndex = RANKS.findIndex(r => r.id === currentRank.id) + 1;
  const nextRank = RANKS[nextRankIndex];

  let progress = 100;
  if (nextRank) {
    const xpInCurrentRank = totalXP - currentRank.xpRequired;
    const xpNeededForNext = nextRank.xpRequired - currentRank.xpRequired;
    progress = (xpInCurrentRank / xpNeededForNext) * 100;
  }

  return { rank: currentRank, progress };
}

export function getXPToNextRank(totalXP: number): number {
  const { rank } = calculateLevelFromXP(totalXP);
  const nextRankIndex = RANKS.findIndex(r => r.id === rank.id) + 1;

  if (nextRankIndex >= RANKS.length) {
    return 0; // Max rank
  }

  return RANKS[nextRankIndex].xpRequired - totalXP;
}
