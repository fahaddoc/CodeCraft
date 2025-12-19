// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - AI Interviewer System
// ============================================================================

import {
  Interviewer,
  InterviewerId,
  InterviewerArchetype,
  InterviewerMood,
  PersonalityTraits,
  ConversationMessage,
  Challenge,
  ChallengePhase,
  TriggerResponse,
} from '../types/game.types';

// ============================================================================
// INTERVIEWER DATABASE
// ============================================================================

export const INTERVIEWERS: Record<InterviewerId, Interviewer> = {
  // World 1 Interviewers
  margaret_mentor: {
    id: 'margaret_mentor',
    name: 'Margaret Chen',
    company: 'GoogleFlex',
    role: 'Senior Software Engineer',
    archetype: 'the_mentor',
    avatar: '👩‍💼',
    personality: {
      patience: 90,
      warmth: 85,
      directness: 60,
      flexibility: 80,
      techDepth: 75,
      communicationValue: 90,
    },
    questionStyle: {
      opensWithSmallTalk: true,
      givesHints: true,
      acknowledgesProgress: true,
      interruptionFrequency: 'rarely',
      followUpDepth: 'moderate',
    },
    feedbackStyle: {
      immediate: true,
      encouraging: true,
      specific: true,
      suggestsImprovements: true,
    },
    triggerResponses: [
      { trigger: "i don't know", response: "That's okay! Let's work through this together. What's your first instinct?", moodChange: 0 },
      { trigger: "is this right", response: "You're on the right track. What makes you uncertain?", moodChange: 5 },
      { trigger: "i'm stuck", response: "No worries! Let me give you a hint. Have you considered...?", moodChange: -5 },
    ],
    catchPhrases: [
      "That's a great observation!",
      "I like how you're thinking about this.",
      "Let's explore that further.",
      "Good question!",
    ],
  },

  alex_intimidator: {
    id: 'alex_intimidator',
    name: 'Alex Volkov',
    company: 'MetaVerse',
    role: 'Principal Engineer',
    archetype: 'the_intimidator',
    avatar: '😐',
    personality: {
      patience: 25,
      warmth: 15,
      directness: 95,
      flexibility: 30,
      techDepth: 95,
      communicationValue: 40,
    },
    questionStyle: {
      opensWithSmallTalk: false,
      givesHints: false,
      acknowledgesProgress: false,
      interruptionFrequency: 'often',
      followUpDepth: 'deep',
    },
    feedbackStyle: {
      immediate: false,
      encouraging: false,
      specific: true,
      suggestsImprovements: false,
    },
    triggerResponses: [
      { trigger: "i don't know", response: "A senior engineer should know this.", moodChange: -15 },
      { trigger: "let me think", response: "*stares silently*", moodChange: -5 },
      { trigger: "is this right", response: "You tell me.", moodChange: -5 },
      { trigger: "i'm not sure", response: "Then why are you telling me?", moodChange: -10 },
    ],
    catchPhrases: [
      "And?",
      "Go on.",
      "That's suboptimal.",
      "What's the complexity?",
      "That won't scale.",
    ],
  },

  sarah_silent: {
    id: 'sarah_silent',
    name: 'Sarah Kim',
    company: 'AmazonPrime',
    role: 'Senior SDE',
    archetype: 'the_silent',
    avatar: '🤔',
    personality: {
      patience: 70,
      warmth: 40,
      directness: 50,
      flexibility: 60,
      techDepth: 85,
      communicationValue: 30,
    },
    questionStyle: {
      opensWithSmallTalk: false,
      givesHints: false,
      acknowledgesProgress: false,
      interruptionFrequency: 'never',
      followUpDepth: 'shallow',
    },
    feedbackStyle: {
      immediate: false,
      encouraging: false,
      specific: false,
      suggestsImprovements: false,
    },
    triggerResponses: [
      { trigger: "does this look right", response: "*nods slightly*", moodChange: 0 },
      { trigger: "any feedback", response: "Please continue.", moodChange: 0 },
      { trigger: "am i on the right track", response: "*neutral expression*", moodChange: 0 },
    ],
    catchPhrases: [
      "Mm-hmm.",
      "I see.",
      "Continue.",
      "Okay.",
    ],
  },

  david_friendly: {
    id: 'david_friendly',
    name: 'David Park',
    company: 'NetflixStream',
    role: 'Engineering Manager',
    archetype: 'the_friendly',
    avatar: '😊',
    personality: {
      patience: 85,
      warmth: 95,
      directness: 55,
      flexibility: 85,
      techDepth: 70,
      communicationValue: 85,
    },
    questionStyle: {
      opensWithSmallTalk: true,
      givesHints: true,
      acknowledgesProgress: true,
      interruptionFrequency: 'rarely',
      followUpDepth: 'moderate',
    },
    feedbackStyle: {
      immediate: true,
      encouraging: true,
      specific: true,
      suggestsImprovements: true,
    },
    triggerResponses: [
      { trigger: "i don't know", response: "No worries at all! This is tricky. Let's think about what we do know...", moodChange: 5 },
      { trigger: "i'm nervous", response: "Hey, totally normal! Just pretend we're colleagues solving a problem together.", moodChange: 10 },
      { trigger: "is this right", response: "You're doing great! Walk me through your reasoning.", moodChange: 5 },
    ],
    catchPhrases: [
      "Love it!",
      "That's exactly the kind of thinking we look for.",
      "Great question to ask!",
      "I really like where you're going with this.",
      "No wrong answers here, just exploring.",
    ],
  },

  // World 2 Interviewers
  jennifer_skeptic: {
    id: 'jennifer_skeptic',
    name: 'Jennifer Walsh',
    company: 'AppleTech',
    role: 'Staff Engineer',
    archetype: 'the_skeptic',
    avatar: '🧐',
    personality: {
      patience: 55,
      warmth: 45,
      directness: 85,
      flexibility: 40,
      techDepth: 90,
      communicationValue: 70,
    },
    questionStyle: {
      opensWithSmallTalk: false,
      givesHints: false,
      acknowledgesProgress: false,
      interruptionFrequency: 'sometimes',
      followUpDepth: 'deep',
    },
    feedbackStyle: {
      immediate: true,
      encouraging: false,
      specific: true,
      suggestsImprovements: false,
    },
    triggerResponses: [
      { trigger: "this should work", response: "Should? What about edge cases?", moodChange: -5 },
      { trigger: "i think", response: "You think? Or you know?", moodChange: -5 },
      { trigger: "it's simple", response: "Is it though? What about...", moodChange: -10 },
    ],
    catchPhrases: [
      "But what if...",
      "Have you considered...",
      "That's one approach. What are the alternatives?",
      "What's the worst case?",
      "How does this scale?",
    ],
  },

  michael_nitpicker: {
    id: 'michael_nitpicker',
    name: 'Michael Torres',
    company: 'MicrosoftCloud',
    role: 'Senior Developer',
    archetype: 'the_nitpicker',
    avatar: '🔍',
    personality: {
      patience: 60,
      warmth: 50,
      directness: 80,
      flexibility: 30,
      techDepth: 85,
      communicationValue: 60,
    },
    questionStyle: {
      opensWithSmallTalk: false,
      givesHints: false,
      acknowledgesProgress: true,
      interruptionFrequency: 'often',
      followUpDepth: 'deep',
    },
    feedbackStyle: {
      immediate: true,
      encouraging: false,
      specific: true,
      suggestsImprovements: true,
    },
    triggerResponses: [
      { trigger: "var ", response: "Why var instead of const or let?", moodChange: -5 },
      { trigger: "function ", response: "What about arrow functions?", moodChange: -3 },
      { trigger: "any", response: "Type any? That defeats the purpose of TypeScript.", moodChange: -10 },
    ],
    catchPhrases: [
      "Why not use...?",
      "That variable name could be more descriptive.",
      "What about the edge case where...?",
      "This could be more efficient.",
      "Are you handling null?",
    ],
  },

  bob_legacy_guardian: {
    id: 'bob_legacy_guardian',
    name: 'Bob Henderson',
    company: 'LegacyCorp',
    role: 'Senior Staff Engineer (20 YOE)',
    archetype: 'the_defensive_senior',
    avatar: '👴',
    personality: {
      patience: 40,
      warmth: 35,
      directness: 70,
      flexibility: 15,
      techDepth: 75,
      communicationValue: 45,
    },
    questionStyle: {
      opensWithSmallTalk: false,
      givesHints: false,
      acknowledgesProgress: false,
      interruptionFrequency: 'often',
      followUpDepth: 'shallow',
    },
    feedbackStyle: {
      immediate: true,
      encouraging: false,
      specific: false,
      suggestsImprovements: false,
    },
    triggerResponses: [
      { trigger: "refactor", response: "This code has been running in production for 10 years. Why fix what isn't broken?", moodChange: -15 },
      { trigger: "modern", response: "Modern is just a fancy word for 'not battle-tested'.", moodChange: -10 },
      { trigger: "better way", response: "Better? I wrote this system. It works.", moodChange: -20 },
    ],
    catchPhrases: [
      "That's how we've always done it.",
      "This works fine.",
      "You don't have the context.",
      "Rewriting is risky.",
      "Modern syntax is just sugar.",
    ],
  },

  // World 3 Interviewers
  lisa_vp: {
    id: 'lisa_vp',
    name: 'Lisa Armstrong',
    company: 'TechGiant',
    role: 'VP of Engineering',
    archetype: 'the_business_mind',
    avatar: '👩‍💼',
    personality: {
      patience: 50,
      warmth: 60,
      directness: 85,
      flexibility: 70,
      techDepth: 65,
      communicationValue: 95,
    },
    questionStyle: {
      opensWithSmallTalk: true,
      givesHints: false,
      acknowledgesProgress: true,
      interruptionFrequency: 'sometimes',
      followUpDepth: 'moderate',
    },
    feedbackStyle: {
      immediate: false,
      encouraging: true,
      specific: true,
      suggestsImprovements: true,
    },
    triggerResponses: [
      { trigger: "optimal algorithm", response: "That's great, but what's the business impact?", moodChange: 0 },
      { trigger: "technically", response: "How do we explain this to stakeholders?", moodChange: 5 },
      { trigger: "trade-off", response: "Excellent. That's exactly how we think here.", moodChange: 10 },
    ],
    catchPhrases: [
      "What's the customer impact?",
      "How does this affect our OKRs?",
      "Can you explain this to a non-technical exec?",
      "What's the ROI?",
      "How does this scale with the team?",
    ],
  },

  raj_architect: {
    id: 'raj_architect',
    name: 'Raj Patel',
    company: 'CloudScale',
    role: 'Principal Architect',
    archetype: 'the_big_picture',
    avatar: '🏗️',
    personality: {
      patience: 70,
      warmth: 55,
      directness: 75,
      flexibility: 65,
      techDepth: 95,
      communicationValue: 80,
    },
    questionStyle: {
      opensWithSmallTalk: false,
      givesHints: true,
      acknowledgesProgress: true,
      interruptionFrequency: 'sometimes',
      followUpDepth: 'deep',
    },
    feedbackStyle: {
      immediate: true,
      encouraging: true,
      specific: true,
      suggestsImprovements: true,
    },
    triggerResponses: [
      { trigger: "single server", response: "What happens when that server fails?", moodChange: -5 },
      { trigger: "distributed", response: "Good thinking. Now tell me about consistency.", moodChange: 10 },
      { trigger: "microservices", response: "Interesting choice. What's driving that decision?", moodChange: 5 },
    ],
    catchPhrases: [
      "Zoom out for a moment.",
      "What's the failure mode?",
      "How does this interact with...?",
      "Think about the data flow.",
      "What would this look like at 10x scale?",
    ],
  },

  // World 4 Interviewers
  emily_legend: {
    id: 'emily_legend',
    name: 'Emily Zhao',
    company: 'TechUnicorn',
    role: 'Distinguished Engineer',
    archetype: 'the_philosopher',
    avatar: '🌟',
    personality: {
      patience: 80,
      warmth: 70,
      directness: 75,
      flexibility: 85,
      techDepth: 100,
      communicationValue: 90,
    },
    questionStyle: {
      opensWithSmallTalk: true,
      givesHints: false,
      acknowledgesProgress: true,
      interruptionFrequency: 'rarely',
      followUpDepth: 'deep',
    },
    feedbackStyle: {
      immediate: false,
      encouraging: true,
      specific: true,
      suggestsImprovements: true,
    },
    triggerResponses: [
      { trigger: "best practice", response: "Best for whom? In what context?", moodChange: 0 },
      { trigger: "always", response: "Always? Even when...?", moodChange: -5 },
      { trigger: "depends", response: "Exactly. Tell me what it depends on.", moodChange: 15 },
    ],
    catchPhrases: [
      "Why is that the right abstraction?",
      "What are we optimizing for?",
      "Tell me about the second-order effects.",
      "How would you teach this to someone?",
      "What would you do differently next time?",
    ],
  },
};

// ============================================================================
// AI RESPONSE GENERATION
// ============================================================================

export interface AIResponseContext {
  interviewer: Interviewer;
  challenge: Challenge;
  currentPhase: ChallengePhase;
  conversation: ConversationMessage[];
  currentMood: InterviewerMood;
  playerMessage: string;
  timeElapsed: number;
  silenceTime: number;
  score: number;
}

export interface AIResponse {
  content: string;
  mood: InterviewerMood;
  moodChange: number;
  shouldInterrupt: boolean;
  followUp?: string;
  scoreImpact?: {
    category: string;
    delta: number;
  };
}

export class InterviewerAI {
  private interviewer: Interviewer;
  private conversationHistory: ConversationMessage[] = [];
  private currentMood: InterviewerMood = 'neutral';
  private moodScore: number = 50; // 0-100

  constructor(interviewerId: InterviewerId) {
    const interviewer = INTERVIEWERS[interviewerId];
    if (!interviewer) {
      throw new Error(`Interviewer not found: ${interviewerId}`);
    }
    this.interviewer = interviewer;
  }

  // ============================================================================
  // RESPONSE GENERATION
  // ============================================================================

  generateResponse(context: AIResponseContext): AIResponse {
    // Check for trigger responses first
    const triggerResponse = this.checkTriggers(context.playerMessage);
    if (triggerResponse) {
      this.updateMood(triggerResponse.moodChange);
      return {
        content: triggerResponse.response,
        mood: this.currentMood,
        moodChange: triggerResponse.moodChange,
        shouldInterrupt: false,
      };
    }

    // Generate context-appropriate response
    const response = this.generateContextualResponse(context);
    return response;
  }

  generateOpeningMessage(challenge: Challenge): ConversationMessage {
    const personality = this.interviewer.personality;
    let content: string;

    if (this.interviewer.questionStyle.opensWithSmallTalk && personality.warmth > 60) {
      content = this.generateSmallTalk() + '\n\n' + this.generateProblemIntro(challenge);
    } else {
      content = this.generateProblemIntro(challenge);
    }

    return {
      id: `msg_${Date.now()}`,
      timestamp: new Date(),
      speaker: 'interviewer',
      content,
      mood: 'neutral',
    };
  }

  generateSilenceResponse(silenceSeconds: number): AIResponse | null {
    const thresholds = this.getSilenceThresholds();

    if (silenceSeconds >= thresholds.awkward && silenceSeconds < thresholds.concern) {
      return {
        content: this.getSilenceComment('awkward'),
        mood: this.currentMood,
        moodChange: -3,
        shouldInterrupt: true,
      };
    }

    if (silenceSeconds >= thresholds.concern && silenceSeconds < thresholds.critical) {
      this.updateMood(-10);
      return {
        content: this.getSilenceComment('concern'),
        mood: this.currentMood,
        moodChange: -10,
        shouldInterrupt: true,
      };
    }

    if (silenceSeconds >= thresholds.critical) {
      this.updateMood(-15);
      return {
        content: this.getSilenceComment('critical'),
        mood: this.currentMood,
        moodChange: -15,
        shouldInterrupt: true,
      };
    }

    return null;
  }

  generateHintResponse(): string {
    const personality = this.interviewer.personality;

    if (!this.interviewer.questionStyle.givesHints) {
      if (personality.directness > 70) {
        return "I'd prefer if you worked through this on your own.";
      }
      return "Let's see what you come up with first.";
    }

    const hints = [
      "Have you considered breaking this down into smaller subproblems?",
      "What data structure might help here?",
      "Think about the time-space tradeoff.",
      "What's the simplest case you can solve first?",
      "Try thinking about this from the other direction.",
    ];

    this.updateMood(-5);
    return hints[Math.floor(Math.random() * hints.length)];
  }

  generateFollowUp(playerResponse: string, phase: ChallengePhase): AIResponse {
    const depth = this.interviewer.questionStyle.followUpDepth;

    let content: string;
    let scoreImpact: { category: string; delta: number } | undefined;

    switch (phase) {
      case 'clarification':
        content = this.generateClarificationFollowUp(playerResponse);
        if (this.wasGoodQuestion(playerResponse)) {
          scoreImpact = { category: 'communication.questioning', delta: 5 };
          this.updateMood(5);
        }
        break;

      case 'approach':
        content = this.generateApproachFollowUp(playerResponse, depth);
        if (this.mentionedTradeoffs(playerResponse)) {
          scoreImpact = { category: 'problemSolving.tradeoffs', delta: 5 };
          this.updateMood(10);
        }
        break;

      case 'execution':
        content = this.generateExecutionFollowUp(playerResponse);
        break;

      case 'defense':
        content = this.generateDefenseFollowUp(playerResponse, depth);
        break;

      default:
        content = this.getRandomCatchPhrase();
    }

    return {
      content,
      mood: this.currentMood,
      moodChange: 0,
      shouldInterrupt: false,
      scoreImpact,
    };
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private checkTriggers(message: string): TriggerResponse | null {
    const lowerMessage = message.toLowerCase();

    for (const trigger of this.interviewer.triggerResponses) {
      if (lowerMessage.includes(trigger.trigger)) {
        return trigger;
      }
    }

    return null;
  }

  private generateContextualResponse(context: AIResponseContext): AIResponse {
    const { currentPhase, playerMessage } = context;
    const personality = this.interviewer.personality;

    // Analyze player message quality
    const messageQuality = this.analyzeMessageQuality(playerMessage);

    // Generate appropriate response based on personality and phase
    let content: string;
    let moodChange = 0;

    if (messageQuality.isGood) {
      if (this.interviewer.questionStyle.acknowledgesProgress) {
        content = this.getPositiveAcknowledgment() + ' ' + this.generatePhaseSpecificResponse(currentPhase, messageQuality);
        moodChange = 5;
      } else {
        content = this.generatePhaseSpecificResponse(currentPhase, messageQuality);
      }
    } else if (messageQuality.isWeak) {
      if (personality.patience > 60) {
        content = this.getGentleRedirect() + ' ' + this.generatePhaseSpecificResponse(currentPhase, messageQuality);
        moodChange = -5;
      } else {
        content = this.getDirectRedirect();
        moodChange = -10;
      }
    } else {
      content = this.generatePhaseSpecificResponse(currentPhase, messageQuality);
    }

    this.updateMood(moodChange);

    return {
      content,
      mood: this.currentMood,
      moodChange,
      shouldInterrupt: false,
    };
  }

  private generateSmallTalk(): string {
    const phrases = [
      "Thanks for taking the time to chat with us today!",
      "I hope you're having a good day so far.",
      "Before we dive in, how are you doing?",
      "Nice to meet you! Ready to get started?",
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  private generateProblemIntro(challenge: Challenge): string {
    const personality = this.interviewer.personality;

    if (personality.directness > 70) {
      return `Let's get started. ${challenge.problem.description}`;
    }

    return `Alright, here's the problem I'd like you to work on today:\n\n${challenge.problem.description}\n\nTake a moment to read through it, and feel free to ask any questions.`;
  }

  private getSilenceThresholds() {
    const patience = this.interviewer.personality.patience;

    return {
      awkward: 15 + (patience / 10), // 15-25 seconds
      concern: 30 + (patience / 5),  // 30-50 seconds
      critical: 60 + (patience / 3), // 60-90 seconds
    };
  }

  private getSilenceComment(level: 'awkward' | 'concern' | 'critical'): string {
    const warmth = this.interviewer.personality.warmth;

    const comments = {
      awkward: {
        warm: ["Take your time, no rush.", "Feel free to think out loud."],
        neutral: ["...", "*shifts in seat*"],
        cold: ["I'm waiting.", "..."],
      },
      concern: {
        warm: ["Would you like a hint?", "Let me know if I can clarify anything."],
        neutral: ["Should we move on?", "Need any help?"],
        cold: ["We should probably move on.", "Time is limited."],
      },
      critical: {
        warm: ["Let's try a different approach. What if I simplify this?", "Would you like to skip to the next question?"],
        neutral: ["Let's move on.", "We need to make progress."],
        cold: ["We're out of time for this one.", "Moving on."],
      },
    };

    const warmthLevel = warmth > 66 ? 'warm' : warmth > 33 ? 'neutral' : 'cold';
    const options = comments[level][warmthLevel];
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateClarificationFollowUp(question: string): string {
    // Generate context-specific answers to clarifying questions
    const keywords = ['sorted', 'duplicates', 'negative', 'empty', 'null', 'size', 'constraint'];
    const mentioned = keywords.filter(k => question.toLowerCase().includes(k));

    if (mentioned.length > 0) {
      return this.generateClarifyingAnswer(mentioned[0]);
    }

    return "Good question. " + this.getGenericClarification();
  }

  private generateClarifyingAnswer(keyword: string): string {
    const answers: Record<string, string> = {
      sorted: "The array is not sorted. You can assume random order.",
      duplicates: "Yes, there can be duplicates in the input.",
      negative: "The numbers can be negative, zero, or positive.",
      empty: "You should handle the empty case and return an appropriate value.",
      null: "You can assume the input won't be null, but good to consider!",
      size: "The array can have up to 10^5 elements.",
      constraint: "Time complexity should ideally be O(n) or O(n log n).",
    };
    return answers[keyword] || "That's a fair assumption to make.";
  }

  private getGenericClarification(): string {
    const responses = [
      "That's a reasonable assumption to make.",
      "Good thinking to ask that. Let's say...",
      "For this problem, you can assume the standard case.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateApproachFollowUp(response: string, depth: 'shallow' | 'moderate' | 'deep'): string {
    if (depth === 'shallow') {
      return "Sounds good, let's see the code.";
    }

    if (depth === 'moderate') {
      return "Interesting approach. What's the time complexity?";
    }

    // Deep follow-up
    const deepQuestions = [
      "What are the potential edge cases you're thinking about?",
      "How would this approach change if the input size was 100x larger?",
      "What's the space complexity? Can we optimize that?",
      "Are there any tradeoffs you're making with this approach?",
    ];
    return deepQuestions[Math.floor(Math.random() * deepQuestions.length)];
  }

  private generateExecutionFollowUp(code: string): string {
    const responses = [
      "Walk me through what this does.",
      "What happens in line [X]?",
      "How does this handle the edge case we discussed?",
      "Can you trace through an example?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateDefenseFollowUp(response: string, depth: 'shallow' | 'moderate' | 'deep'): string {
    if (depth === 'shallow') {
      return "I see. Thank you for explaining.";
    }

    const challenges = [
      "But what if the requirements changed to...?",
      "How confident are you in this solution?",
      "Is there a way to make this more maintainable?",
      "How would you test this?",
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  private generatePhaseSpecificResponse(phase: ChallengePhase, quality: { isGood: boolean; isWeak: boolean }): string {
    // Generate appropriate response based on phase
    switch (phase) {
      case 'clarification':
        return "Anything else you'd like to clarify before we proceed?";
      case 'approach':
        return "Alright, show me how you'd implement this.";
      case 'execution':
        return "Let's trace through an example to verify.";
      case 'defense':
        return "How would you improve this if you had more time?";
      default:
        return this.getRandomCatchPhrase();
    }
  }

  private analyzeMessageQuality(message: string): { isGood: boolean; isWeak: boolean } {
    const goodIndicators = [
      'because', 'tradeoff', 'consider', 'edge case', 'complexity',
      'alternatively', 'first', 'then', 'finally', 'approach'
    ];

    const weakIndicators = [
      'idk', 'not sure', 'maybe', 'i guess', 'probably', 'um'
    ];

    const lowerMessage = message.toLowerCase();
    const isGood = goodIndicators.some(ind => lowerMessage.includes(ind)) && message.length > 50;
    const isWeak = weakIndicators.some(ind => lowerMessage.includes(ind)) || message.length < 20;

    return { isGood, isWeak };
  }

  private wasGoodQuestion(question: string): boolean {
    const goodQuestionIndicators = [
      'constraint', 'edge', 'input', 'output', 'size', 'duplicate',
      'empty', 'null', 'negative', 'complexity', 'what if'
    ];
    return goodQuestionIndicators.some(ind => question.toLowerCase().includes(ind));
  }

  private mentionedTradeoffs(response: string): boolean {
    const tradeoffIndicators = [
      'tradeoff', 'trade-off', 'but', 'however', 'downside', 'versus',
      'alternatively', 'or we could', 'space vs time'
    ];
    return tradeoffIndicators.some(ind => response.toLowerCase().includes(ind));
  }

  private getPositiveAcknowledgment(): string {
    const warmth = this.interviewer.personality.warmth;

    if (warmth > 70) {
      const phrases = [
        "Great thinking!",
        "Exactly what I was hoping to hear.",
        "Love that approach.",
        "That's a solid observation.",
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    }

    return "Good.";
  }

  private getGentleRedirect(): string {
    return "Let's think about this a bit more.";
  }

  private getDirectRedirect(): string {
    return "That's not quite right.";
  }

  private getRandomCatchPhrase(): string {
    const phrases = this.interviewer.catchPhrases;
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  private updateMood(delta: number): void {
    this.moodScore = Math.max(0, Math.min(100, this.moodScore + delta));
    this.currentMood = this.getMoodFromScore(this.moodScore);
  }

  private getMoodFromScore(score: number): InterviewerMood {
    if (score >= 80) return 'impressed';
    if (score >= 65) return 'interested';
    if (score >= 45) return 'neutral';
    if (score >= 30) return 'skeptical';
    if (score >= 15) return 'concerned';
    return 'frustrated';
  }

  getMood(): InterviewerMood {
    return this.currentMood;
  }

  getInterviewer(): Interviewer {
    return this.interviewer;
  }
}

// ============================================================================
// BOSS INTERVIEWER CONFIGURATIONS
// ============================================================================

export const BOSS_INTERVIEWERS: Record<string, InterviewerId[]> = {
  // World 1 Bosses
  'the_gatekeeper': ['david_friendly'], // Deceptively easy
  'the_speedrunner': ['alex_intimidator'],
  'the_silent_judge': ['sarah_silent'],
  'the_nitpicker': ['michael_nitpicker'],
  'the_algorithm_purist': ['alex_intimidator'],

  // World 2 Bosses
  'the_scope_creeper': ['jennifer_skeptic'],
  'the_legacy_guardian': ['bob_legacy_guardian'],
  'the_performance_fanatic': ['alex_intimidator'],
  'the_pair_programmer': ['margaret_mentor'],
  'the_on_call_nightmare': ['jennifer_skeptic'],

  // World 3 Bosses
  'the_vp': ['lisa_vp'],
  'the_skeptical_architect': ['raj_architect'],
  'the_bar_raiser': ['jennifer_skeptic', 'raj_architect'],

  // World 4 Bosses
  'the_distinguished_engineer': ['emily_legend'],
  'the_final_interview': ['emily_legend', 'raj_architect', 'lisa_vp'],
};
