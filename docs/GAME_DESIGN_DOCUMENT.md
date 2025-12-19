# CodeCraft: Interview Legends
## Complete Game Design Document

---

# 1. EXECUTIVE SUMMARY

**CodeCraft: Interview Legends** is a skill-based learning game that transforms players into elite software engineers capable of dominating any technical interview. Unlike passive learning platforms, every game mechanic reinforces real interview skills through active gameplay, realistic pressure, and immediate feedback loops.

**Core Philosophy**: Learn by doing, fail forward, master under pressure.

---

# 2. GAME CONCEPT

## 2.1 The Hook
You are a developer navigating the treacherous world of tech interviews. Starting as a nervous junior, you'll face increasingly brutal interviewers, debug production nightmares, architect systems at scale, and ultimately become an "Interview Legend" — someone who makes senior engineers at FAANG companies nod in respect.

## 2.2 Core Loop
```
CHALLENGE → THINK → RESPOND → FEEDBACK → ADAPT → LEVEL UP
     ↑                                              |
     └──────────────────────────────────────────────┘
```

## 2.3 Unique Differentiators
1. **Ambiguity by Design**: Questions are intentionally vague — just like real interviews
2. **Personality-Based Interviewers**: Each interviewer has quirks, biases, and red flags
3. **Anti-Patterns Are Punished**: Over-engineering, premature optimization, and buzzword soup lose points
4. **Silence Pressure**: Taking too long to respond triggers anxiety mechanics
5. **The "Actually..." Trap**: Interviewers sometimes give wrong hints to test your conviction

---

# 3. WORLD STRUCTURE

## World 1: "The Gauntlet" (Junior → Mid-Level)
**Theme**: Survival — Prove you belong in tech
**Levels**: 20 core levels + 5 boss fights
**Focus Areas**:
- Basic data structures (arrays, hashmaps, trees)
- Simple algorithms (sorting, searching, recursion)
- Code reading and debugging
- Basic API understanding
- Communication fundamentals

**Boss Fights**:
1. **"The Gatekeeper"** - HR screen that tries to lowball you
2. **"The Speedrunner"** - Rapid-fire easy questions, tests composure
3. **"The Silent Judge"** - Gives no feedback, maximum anxiety
4. **"The Nitpicker"** - Obsesses over syntax and edge cases
5. **"The Algorithm Purist"** - Demands optimal Big-O for everything

---

## World 2: "The Crucible" (Mid → Senior)
**Theme**: Depth — Show you can own complex problems
**Levels**: 25 core levels + 6 boss fights
**Focus Areas**:
- Advanced algorithms (DP, graphs, advanced trees)
- System design fundamentals
- Database design and optimization
- API design principles
- Code review and critique
- Debugging production issues
- Frontend performance

**Boss Fights**:
1. **"The Scope Creeper"** - Keeps adding requirements mid-interview
2. **"The Legacy Guardian"** - Defends terrible code, tests diplomacy
3. **"The Performance Fanatic"** - Everything must be O(1)
4. **"The Microservices Evangelist"** - Tries to over-architect everything
5. **"The Pair Programming Partner"** - Live coding with interruptions
6. **"The On-Call Nightmare"** - Production is down, fix it NOW

---

## World 3: "The Ascent" (Senior → Staff/Lead)
**Theme**: Breadth & Leadership — Prove you can lead and scale
**Levels**: 30 core levels + 7 boss fights
**Focus Areas**:
- Large-scale system design
- Technical leadership scenarios
- Cross-team collaboration
- Mentoring simulations
- Architectural tradeoffs
- Cost optimization
- Security considerations
- Team dynamics and conflict resolution

**Boss Fights**:
1. **"The VP of Engineering"** - Tests business acumen + tech depth
2. **"The Skeptical Architect"** - Challenges every design decision
3. **"The Deadline Demon"** - Impossible timeline, negotiate scope
4. **"The Political Navigator"** - Cross-team conflict scenario
5. **"The Scale Monster"** - Design for 1B users, $0 budget
6. **"The Incident Commander"** - Major outage, lead the response
7. **"The Bar Raiser"** - Amazon-style bar raiser interview

---

## World 4: "Legendary Mode" (Principal / Interview God)
**Theme**: Mastery — You ARE the bar
**Levels**: 40 core levels + 10 boss fights
**Focus Areas**:
- Industry-shaping decisions
- Multi-year technical vision
- Org-wide architecture
- Executive communication
- Mentoring other interviewers
- Edge cases of edge cases
- "What would you do differently at your last company?"

**Boss Fights**:
1. **"The Founder"** - Startup CTO grilling you
2. **"The Distinguished Engineer"** - Google L8+ equivalent
3. **"The Board Presentation"** - Explain technical strategy to non-technical executives
4. **"The Acqui-hire"** - Your startup is being acquired, defend your tech
5. **"The Ethics Dilemma"** - Technical decision with moral implications
6. **"The Open-Ended Hour"** - No structure, prove your worth
7. **"The Debugging Legend"** - The hardest production bug ever
8. **"The System Design Gauntlet"** - Design 3 systems in 45 minutes
9. **"The Counter-Offer"** - Negotiate with competing offers
10. **"The Final Interview"** - Every skill tested, ultimate challenge

---

# 4. DETAILED GAME MECHANICS

## 4.1 Challenge Structure

Every challenge follows this structure:

```
┌─────────────────────────────────────────────────┐
│  SCENARIO BRIEFING                              │
│  - Context (company, role, situation)           │
│  - Initial problem statement (intentionally     │
│    vague)                                       │
│  - Interviewer personality hints                │
│  - Time limit                                   │
│  - Stakes (XP multiplier)                       │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  CLARIFICATION PHASE (30-60 seconds)            │
│  - Player asks questions                        │
│  - AI responds with more context                │
│  - Some answers reveal traps                    │
│  - Some answers are deliberately unhelpful      │
│  - SCORED: Quality of questions asked           │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  APPROACH PHASE (60-120 seconds)                │
│  - Player outlines their approach               │
│  - Can use whiteboard/diagram tools             │
│  - Interviewer may interrupt with curveballs    │
│  - SCORED: Structure, clarity, tradeoffs        │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  EXECUTION PHASE (varies by challenge)          │
│  - Code, design, debug, or explain              │
│  - Real-time feedback from interviewer          │
│  - Hints available (costs XP)                   │
│  - SCORED: Correctness, efficiency, style       │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  DEFENSE PHASE (30-60 seconds)                  │
│  - Interviewer challenges your solution         │
│  - "What if X happens?"                         │
│  - "Why not use Y instead?"                     │
│  - SCORED: Confidence, adaptability, honesty    │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  DEBRIEF & FEEDBACK                             │
│  - Detailed scoring breakdown                   │
│  - What weak candidates do                      │
│  - What strong candidates do                    │
│  - What legends do                              │
│  - XP awarded, items unlocked                   │
└─────────────────────────────────────────────────┘
```

## 4.2 Response Types

### Code Challenges
```typescript
interface CodeChallenge {
  type: 'algorithm' | 'debugging' | 'refactoring' | 'implementation';
  starterCode?: string;
  brokenCode?: string;  // For debugging
  testCases: TestCase[];
  hiddenTestCases: TestCase[];  // Edge cases revealed after submission
  timeLimit: number;
  memoryLimit?: number;
  allowedLanguages: Language[];
}
```

### System Design Challenges
```typescript
interface SystemDesignChallenge {
  type: 'greenfield' | 'scaling' | 'migration' | 'optimization';
  constraints: {
    users?: string;      // "1M DAU", "100M monthly"
    latency?: string;    // "p99 < 100ms"
    availability?: string; // "99.99%"
    budget?: string;     // "Startup budget", "Unlimited"
    team?: string;       // "3 engineers", "50 person org"
  };
  requiredComponents: string[];  // Must mention these
  antiPatterns: string[];        // Lose points for these
  followUpCurveballs: string[];  // "What if X 10x overnight?"
}
```

### Behavioral Challenges
```typescript
interface BehavioralChallenge {
  type: 'conflict' | 'leadership' | 'failure' | 'influence' | 'growth';
  situation: string;
  redFlags: string[];      // Things that lose points
  greenFlags: string[];    // Things that gain points
  followUps: string[];     // "Tell me more about..."
  silenceThreshold: number; // Seconds before awkward pause penalty
}
```

### Debugging Challenges
```typescript
interface DebuggingChallenge {
  type: 'production' | 'logic' | 'performance' | 'memory' | 'race-condition';
  symptoms: string[];
  logs: LogEntry[];
  metrics: MetricData[];
  redHerrings: string[];   // False leads
  actualBug: Bug;
  timeToMTTR: number;      // Bonus for fast resolution
}
```

## 4.3 Time Pressure Mechanics

### The Silence Clock
- Visible timer showing how long since last meaningful input
- After 10 seconds: Interviewer shifts uncomfortably
- After 20 seconds: "Take your time..." (passive aggressive)
- After 30 seconds: Anxiety effect (screen edges pulse red)
- After 45 seconds: Score penalty begins
- After 60 seconds: "Should we move on to something else?"

### Dynamic Difficulty
- Performing well? Interviewer asks harder follow-ups
- Struggling? Subtle hints appear (costs XP to use)
- Completely stuck? "Let me rephrase..." (major XP cost)

## 4.4 Tradeoff System

Every significant decision requires explicit tradeoff acknowledgment:

```
┌────────────────────────────────────────────────────────┐
│  TRADEOFF CHECKPOINT                                   │
│                                                        │
│  You chose: "Use Redis for caching"                    │
│                                                        │
│  Acknowledge tradeoffs (select all that apply):        │
│  □ Additional infrastructure complexity                │
│  □ Cache invalidation challenges                       │
│  □ Memory costs at scale                               │
│  □ Potential consistency issues                        │
│  □ Operational overhead                                │
│                                                        │
│  [ ] I chose this because: ________________            │
│                                                        │
└────────────────────────────────────────────────────────┘
```

Missing tradeoffs = penalty
Acknowledging wrong tradeoffs = penalty
Perfect tradeoff awareness = bonus XP

---

# 5. SCORING ALGORITHM

## 5.1 Core Scoring Dimensions

```typescript
interface ScoreBreakdown {
  // Technical Excellence (40% of total)
  technical: {
    correctness: number;      // 0-100: Does it work?
    efficiency: number;       // 0-100: Time/space complexity
    codeQuality: number;      // 0-100: Readable, maintainable
    edgeCases: number;        // 0-100: Handled edge cases
    scalability: number;      // 0-100: Would it scale?
  };

  // Communication (25% of total)
  communication: {
    clarity: number;          // 0-100: Easy to follow
    structure: number;        // 0-100: Organized thinking
    questioning: number;      // 0-100: Quality of clarifying Qs
    collaboration: number;    // 0-100: Worked with interviewer
    confidence: number;       // 0-100: Appropriate confidence
  };

  // Problem Solving (20% of total)
  problemSolving: {
    approach: number;         // 0-100: Systematic approach
    tradeoffs: number;        // 0-100: Acknowledged tradeoffs
    adaptability: number;     // 0-100: Handled curveballs
    creativity: number;       // 0-100: Novel solutions
    pragmatism: number;       // 0-100: Practical solutions
  };

  // Senior Signals (15% of total)
  seniorSignals: {
    businessAwareness: number;  // 0-100: Understood business context
    mentorMindset: number;      // 0-100: Explained well
    ownershipMentality: number; // 0-100: Took responsibility
    humility: number;           // 0-100: Admitted unknowns
    leadership: number;         // 0-100: Led the conversation
  };
}
```

## 5.2 Score Calculation

```typescript
function calculateFinalScore(breakdown: ScoreBreakdown): GameScore {
  const technicalWeight = 0.40;
  const communicationWeight = 0.25;
  const problemSolvingWeight = 0.20;
  const seniorSignalsWeight = 0.15;

  const technical = average(Object.values(breakdown.technical));
  const communication = average(Object.values(breakdown.communication));
  const problemSolving = average(Object.values(breakdown.problemSolving));
  const seniorSignals = average(Object.values(breakdown.seniorSignals));

  const baseScore =
    (technical * technicalWeight) +
    (communication * communicationWeight) +
    (problemSolving * problemSolvingWeight) +
    (seniorSignals * seniorSignalsWeight);

  // Apply multipliers
  let finalScore = baseScore;

  // Time bonus: Finishing early with good score
  if (timeRemaining > expectedTime * 0.2 && baseScore > 70) {
    finalScore *= 1.1;
  }

  // No-hint bonus
  if (hintsUsed === 0) {
    finalScore *= 1.15;
  }

  // Elegance bonus: Simple solution to complex problem
  if (solutionComplexity < expectedComplexity * 0.7 && baseScore > 80) {
    finalScore *= 1.2;
  }

  // Streak bonus
  finalScore *= (1 + currentStreak * 0.02);  // 2% per streak day

  return {
    score: Math.min(100, finalScore),
    grade: getGrade(finalScore),
    xpEarned: calculateXP(finalScore),
    rankProgress: calculateRankProgress(finalScore)
  };
}

function getGrade(score: number): Grade {
  if (score >= 95) return 'S+';  // Legend
  if (score >= 90) return 'S';   // Principal level
  if (score >= 85) return 'A+';  // Staff level
  if (score >= 80) return 'A';   // Strong senior
  if (score >= 75) return 'B+';  // Senior
  if (score >= 70) return 'B';   // Mid-level
  if (score >= 60) return 'C';   // Junior
  if (score >= 50) return 'D';   // Struggling
  return 'F';                     // No hire
}
```

## 5.3 Anti-Pattern Penalties

```typescript
const penalties = {
  // Technical anti-patterns
  prematureOptimization: -15,
  overEngineering: -20,
  noEdgeCaseHandling: -10,
  magicNumbers: -5,
  poorNaming: -5,

  // Communication anti-patterns
  jumpedToCode: -15,        // Didn't clarify requirements
  buzzwordSoup: -10,        // Used terms without understanding
  defensiveness: -15,       // Couldn't handle criticism
  overConfidence: -10,      // Claimed expertise they don't have

  // Behavioral anti-patterns
  blamedOthers: -25,        // "It was the PM's fault"
  noOwnership: -20,         // Didn't take responsibility
  toxicAttitude: -30,       // Negative about past teams

  // Process anti-patterns
  ignoredInterviewer: -15,  // Didn't collaborate
  stubbornness: -10,        // Refused to consider alternatives
  gaveUp: -25,              // Stopped trying
};
```

---

# 6. PROGRESSION & REWARDS

## 6.1 XP System

```typescript
interface XPRewards {
  // Base XP by world
  worldMultipliers: {
    world1: 1.0,
    world2: 1.5,
    world3: 2.0,
    world4: 3.0
  };

  // Grade XP
  gradeXP: {
    'S+': 1000,
    'S': 800,
    'A+': 650,
    'A': 500,
    'B+': 350,
    'B': 250,
    'C': 150,
    'D': 75,
    'F': 25
  };

  // Bonus XP
  bonuses: {
    firstTryPerfect: 500,
    noHints: 200,
    speedBonus: 100,
    streakBonus: (days: number) => days * 50,
    bossDefeated: 1000,
    secretFound: 300
  };
}
```

## 6.2 Rank System

```
TIER 1: THE GRIND
├── Rank 1: "Fresh Bootcamper" (0 XP)
├── Rank 2: "Bug Squasher" (1,000 XP)
├── Rank 3: "Code Monkey" (3,000 XP)
├── Rank 4: "Junior Dev" (6,000 XP)
└── Rank 5: "Rising Developer" (10,000 XP)

TIER 2: GETTING SERIOUS
├── Rank 6: "Solid Engineer" (15,000 XP)
├── Rank 7: "Debug Detective" (22,000 XP)
├── Rank 8: "Algorithm Adept" (30,000 XP)
├── Rank 9: "System Thinker" (40,000 XP)
└── Rank 10: "Interview Survivor" (52,000 XP)

TIER 3: SENIOR TERRITORY
├── Rank 11: "Tech Lead Material" (66,000 XP)
├── Rank 12: "Architecture Apprentice" (82,000 XP)
├── Rank 13: "Scale Specialist" (100,000 XP)
├── Rank 14: "Performance Prophet" (120,000 XP)
└── Rank 15: "Senior Certified" (145,000 XP)

TIER 4: ELITE STATUS
├── Rank 16: "Staff Candidate" (175,000 XP)
├── Rank 17: "Principal Path" (210,000 XP)
├── Rank 18: "System Sage" (250,000 XP)
├── Rank 19: "Interview Master" (300,000 XP)
└── Rank 20: "Interview Legend" (400,000 XP)

SECRET RANKS (Achievements unlock these)
├── "The One Who Asks" (Asked perfect clarifying Qs 50 times)
├── "Bug Slayer" (Found 100 bugs)
├── "System Architect" (Aced 25 system design challenges)
├── "Performance God" (Optimized 50 solutions to O(1))
├── "Negotiation Ninja" (Won 10 salary negotiations)
└── "The Complete Engineer" (Maxed all skill trees)
```

## 6.3 Skill Trees

```
┌─────────────────────────────────────────────────────────────────┐
│                        SKILL TREES                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ALGORITHMS        SYSTEMS           FRONTEND        SOFT SKILLS │
│      │                │                  │               │       │
│      ▼                ▼                  ▼               ▼       │
│  ┌──────┐        ┌──────┐          ┌──────┐        ┌──────┐     │
│  │Arrays│        │ APIs │          │ React│        │Clarity│    │
│  └──┬───┘        └──┬───┘          └──┬───┘        └──┬───┘     │
│     │               │                 │               │          │
│  ┌──▼───┐       ┌──▼───┐         ┌──▼───┐        ┌──▼───┐      │
│  │Trees │       │ DBs  │         │State │        │Listen│       │
│  └──┬───┘       └──┬───┘         └──┬───┘        └──┬───┘       │
│     │              │                 │               │           │
│  ┌──▼───┐      ┌──▼───┐         ┌──▼───┐        ┌──▼───┐       │
│  │Graphs│      │Cache │         │ Perf │        │Collab│        │
│  └──┬───┘      └──┬───┘         └──┬───┘        └──┬───┘        │
│     │              │                │                │           │
│  ┌──▼───┐      ┌──▼───┐         ┌──▼───┐        ┌──▼───┐       │
│  │  DP  │      │Scale │         │  A11y│        │ Lead │        │
│  └──────┘      └──────┘         └──────┘        └──────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

Each skill has 5 levels:
- Level 1: Awareness (can recognize)
- Level 2: Understanding (can explain)
- Level 3: Application (can implement)
- Level 4: Mastery (can optimize)
- Level 5: Teaching (can mentor others)

## 6.4 Loot System

### Skill Cards (Collectible abilities)

```typescript
interface SkillCard {
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  effect: string;
  usesPerDay: number;
}

const skillCards: SkillCard[] = [
  // Common
  { name: "Quick Sort", rarity: "common",
    effect: "Auto-complete any sorting implementation", usesPerDay: 3 },
  { name: "HashMap Mastery", rarity: "common",
    effect: "+10% score on array problems", usesPerDay: 5 },

  // Uncommon
  { name: "The Clarifier", rarity: "uncommon",
    effect: "Reveals one hidden requirement", usesPerDay: 2 },
  { name: "Time Extension", rarity: "uncommon",
    effect: "+60 seconds on any challenge", usesPerDay: 2 },

  // Rare
  { name: "Tradeoff Intuition", rarity: "rare",
    effect: "Shows all tradeoffs for current decision", usesPerDay: 1 },
  { name: "Debug Vision", rarity: "rare",
    effect: "Highlights the bug location", usesPerDay: 1 },

  // Epic
  { name: "System Design Template", rarity: "epic",
    effect: "Auto-generates component diagram", usesPerDay: 1 },
  { name: "The Senior's Perspective", rarity: "epic",
    effect: "Shows how a senior would approach this", usesPerDay: 1 },

  // Legendary
  { name: "Interview God Mode", rarity: "legendary",
    effect: "Auto-pass one phase of any challenge", usesPerDay: 1 },
  { name: "Principal's Wisdom", rarity: "legendary",
    effect: "Reveals optimal solution approach", usesPerDay: 1 }
];
```

### Mental Model Cards (Permanent knowledge)

```typescript
const mentalModels = [
  { name: "CAP Theorem", unlockCondition: "Complete 'Distributed Database' challenge",
    description: "Consistency, Availability, Partition tolerance - pick 2" },
  { name: "SOLID Principles", unlockCondition: "Refactor 10 classes correctly",
    description: "The 5 principles of object-oriented design" },
  { name: "Premature Optimization", unlockCondition: "Get penalized for it 3 times",
    description: "The root of all evil - optimize only when needed" },
  // ... 50+ mental models
];
```

---

# 7. AI INTERVIEWER SYSTEM

## 7.1 Interviewer Archetypes

```typescript
interface Interviewer {
  id: string;
  name: string;
  company: string;
  archetype: InterviewerArchetype;
  personality: PersonalityTraits;
  questionStyle: QuestionStyle;
  feedbackStyle: FeedbackStyle;
  biases: Bias[];
  triggerPhrases: TriggerPhrase[];
}

type InterviewerArchetype =
  | 'the_mentor'        // Helpful, gives hints, wants you to succeed
  | 'the_skeptic'       // Questions everything, needs convincing
  | 'the_silent'        // Minimal feedback, poker face
  | 'the_rapid_fire'    // Fast questions, tests composure
  | 'the_deep_diver'    // Goes deep on one topic
  | 'the_big_picture'   // Cares about architecture over code
  | 'the_nitpicker'     // Obsesses over details
  | 'the_friendly'      // Warm but still evaluating
  | 'the_intimidator'   // Tries to make you nervous
  | 'the_philosopher'   // Asks about principles and values
  | 'the_practitioner'  // Only cares about practical experience
  | 'the_academic'      // Wants theoretical knowledge
  | 'the_business_mind' // Focuses on business impact;
```

## 7.2 Personality System

```typescript
interface PersonalityTraits {
  patience: number;        // 0-100: How long before showing frustration
  warmth: number;          // 0-100: How encouraging vs cold
  directness: number;      // 0-100: Blunt vs diplomatic
  flexibility: number;     // 0-100: Open to alternatives vs rigid
  techDepth: number;       // 0-100: Surface level vs deep dive
  communicationValue: number; // 0-100: How much communication matters
}
```

## 7.3 Dynamic Response Generation

```typescript
interface AIResponse {
  content: string;
  emotion: 'neutral' | 'interested' | 'skeptical' | 'impressed' | 'concerned';
  followUp?: string;
  hiddenEvaluation: EvaluationDelta;
}

function generateInterviewerResponse(
  interviewer: Interviewer,
  playerAction: PlayerAction,
  currentScore: ScoreBreakdown,
  challengeContext: Challenge
): AIResponse {
  // Consider interviewer personality
  // React to player's approach
  // Generate contextually appropriate response
  // Include subtle hints based on personality
  // Track hidden evaluation changes
}
```

## 7.4 Sample Interviewer Profiles

```typescript
const interviewers: Interviewer[] = [
  {
    id: "margaret_the_mentor",
    name: "Margaret Chen",
    company: "GoogleFlex (Google-like)",
    archetype: "the_mentor",
    personality: {
      patience: 85,
      warmth: 90,
      directness: 60,
      flexibility: 80,
      techDepth: 75,
      communicationValue: 85
    },
    questionStyle: {
      opensWithSmallTalk: true,
      givesHints: true,
      acknowledgesProgress: true
    },
    triggerPhrases: [
      { trigger: "I don't know", response: "That's okay! Let's think through it together..." },
      { trigger: "Is this right?", response: "What makes you think it might not be?" }
    ]
  },
  {
    id: "alex_the_intimidator",
    name: "Alex Volkov",
    company: "MetaVerse (Meta-like)",
    archetype: "the_intimidator",
    personality: {
      patience: 30,
      warmth: 20,
      directness: 95,
      flexibility: 40,
      techDepth: 90,
      communicationValue: 50
    },
    questionStyle: {
      opensWithSmallTalk: false,
      givesHints: false,
      acknowledgesProgress: false
    },
    triggerPhrases: [
      { trigger: "I don't know", response: "You should know this as a senior engineer." },
      { trigger: "Let me think", response: "*stares silently*" }
    ]
  }
];
```

---

# 8. SAMPLE LEVELS

## 8.1 World 1, Level 1: "Hello, Interview"

```typescript
const level_1_1: Challenge = {
  id: "w1_l1",
  name: "Hello, Interview",
  world: 1,
  level: 1,
  difficulty: 1,
  type: "algorithm",

  briefing: {
    context: "You're in a phone screen for a startup. The interviewer seems friendly but busy.",
    interviewer: "the_friendly",
    timeLimit: 900, // 15 minutes
    stakes: "Entry-level position"
  },

  problem: {
    description: "Given an array of integers, find two numbers that add up to a target.",
    intentionallyVague: true,  // Doesn't specify: sorted? duplicates? multiple solutions?
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
    ],
    hiddenTestCases: [
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },  // Duplicates
      { input: { nums: [1], target: 2 }, expected: [] },         // Edge case
    ]
  },

  expectedClarifications: [
    "Are there always exactly two numbers that sum to target?",
    "Can the same element be used twice?",
    "Are the numbers sorted?",
    "What should I return if no solution exists?",
    "Should I return indices or values?"
  ],

  scoring: {
    perfectClarifications: 20,
    bruteForce: 50,        // O(n²) solution
    optimal: 100,          // O(n) with hashmap
    withEdgeCases: 15,     // Bonus
    cleanCode: 10          // Bonus
  },

  feedback: {
    weak: "Jumped straight to coding without asking about edge cases. Used nested loops without considering hashmap. Didn't test the solution.",
    strong: "Asked about edge cases and duplicates. Explained the hashmap approach clearly. Walked through the solution with an example.",
    legend: "Immediately identified this as the classic Two Sum. Asked about follow-up constraints (sorted array = two pointers). Discussed time-space tradeoff. Wrote clean code with meaningful variable names. Proactively handled edge cases."
  }
};
```

## 8.2 World 2, Boss Fight: "The Legacy Guardian"

```typescript
const boss_legacy_guardian: Challenge = {
  id: "w2_boss_legacy",
  name: "The Legacy Guardian",
  world: 2,
  level: "boss",
  difficulty: 7,
  type: "code_review",

  briefing: {
    context: "You're reviewing code written by a senior engineer who's been at the company for 10 years. He's in the room. The code... has issues.",
    interviewer: "the_defensive_senior",
    timeLimit: 1800, // 30 minutes
    stakes: "Your ability to give honest feedback diplomatically"
  },

  problem: {
    description: "Review this code and provide constructive feedback.",
    code: `
      // UserManager.js - Written by Bob (10 years at company)
      function getAllUsersFromDatabaseAndFilterThemAndSortThemAndReturnTheTopOnes(n) {
        var users = [];
        for (var i = 0; i < database.length; i++) {
          if (database[i].active == true) {
            if (database[i].age > 18) {
              if (database[i].country == 'USA' || database[i].country == 'Canada') {
                users.push(database[i]);
              }
            }
          }
        }
        // Sort by registration date
        for (var i = 0; i < users.length; i++) {
          for (var j = 0; j < users.length - 1; j++) {
            if (users[j].registrationDate > users[j + 1].registrationDate) {
              var temp = users[j];
              users[j] = users[j + 1];
              users[j + 1] = temp;
            }
          }
        }
        var topUsers = [];
        for (var i = 0; i < n; i++) {
          if (users[i]) topUsers.push(users[i]);
        }
        return topUsers;
      }
    `,
    issues: [
      "Function name is too long",
      "Using var instead of const/let",
      "Nested if statements should use &&",
      "== instead of ===",
      "Bubble sort instead of .sort()",
      "Loading entire database into memory",
      "No error handling",
      "Magic numbers (18)",
      "Hardcoded country values"
    ],
    trap: "The senior will defend every decision. Being too aggressive = fail. Being too passive = fail."
  },

  scoring: {
    identifiedIssues: 30,
    diplomaticDelivery: 30,
    suggestedImprovements: 20,
    handledDefensiveness: 20
  },

  aiResponses: {
    onCriticism: [
      "That's how we've always done it here.",
      "It works, doesn't it?",
      "We don't have time to refactor everything.",
      "Modern syntax is just syntactic sugar."
    ],
    onGoodFeedback: "Hmm, I hadn't thought about it that way..."
  }
};
```

## 8.3 World 3, System Design: "Scale or Die"

```typescript
const level_scale_or_die: Challenge = {
  id: "w3_system_design_1",
  name: "Scale or Die",
  world: 3,
  level: 15,
  difficulty: 8,
  type: "system_design",

  briefing: {
    context: "You're designing a real-time notification system for a social media app. It's 10PM and the VP is watching.",
    interviewer: "the_skeptic",
    timeLimit: 2700, // 45 minutes
    stakes: "Staff Engineer position"
  },

  problem: {
    description: "Design a notification system",
    constraints: {
      users: "500M monthly active users",
      notifications: "50 notifications per user per day average",
      latency: "Must be delivered within 1 second",
      reliability: "99.99% delivery rate",
      types: ["push", "email", "in-app", "SMS"],
      budget: "Reasonable startup budget"
    },
    intentionallyVague: [
      "What counts as 'delivered'?",
      "Can we batch notifications?",
      "Priority levels?",
      "User preferences?",
      "Rate limiting?",
      "International users?"
    ]
  },

  expectedComponents: [
    "Message queue (Kafka/SQS)",
    "Worker fleet",
    "Priority queue",
    "User preference service",
    "Rate limiter",
    "Dead letter queue",
    "Monitoring/alerting",
    "Database for notification history"
  ],

  curveballs: [
    { trigger: "after_initial_design", question: "A celebrity with 50M followers posts. How do you handle the thundering herd?" },
    { trigger: "after_queue_mention", question: "What if Kafka goes down?" },
    { trigger: "after_database_mention", question: "How do you handle a user asking 'show me all my notifications from last year'?" }
  ],

  antiPatterns: [
    "Single point of failure",
    "Synchronous processing",
    "No backpressure handling",
    "Ignoring user preferences",
    "No monitoring"
  ],

  scoring: {
    requirementsGathering: 15,
    highLevelDesign: 25,
    componentDetails: 25,
    tradeoffs: 15,
    handledCurveballs: 20
  }
};
```

## 8.4 World 4, Final Boss: "The Complete Engineer"

```typescript
const final_boss: Challenge = {
  id: "w4_final_boss",
  name: "The Complete Engineer",
  world: 4,
  level: "final_boss",
  difficulty: 10,
  type: "multi_phase",

  briefing: {
    context: "This is it. The final round at MegaCorp. You'll face 4 different interviewers in 4 hours. Each has a different focus. Fail any round and it's over.",
    timeLimit: 14400, // 4 hours
    stakes: "Principal Engineer offer, $800K TC"
  },

  phases: [
    {
      name: "Technical Deep Dive",
      interviewer: "the_academic",
      duration: 3600,
      type: "algorithm",
      problem: "Design and implement a concurrent LRU cache with TTL support"
    },
    {
      name: "System Design",
      interviewer: "the_skeptic",
      duration: 3600,
      type: "system_design",
      problem: "Design a global payment processing system like Stripe"
    },
    {
      name: "Leadership & Influence",
      interviewer: "the_philosopher",
      duration: 2400,
      type: "behavioral",
      problem: "Tell me about a time you had to convince leadership to change technical direction"
    },
    {
      name: "The Stress Test",
      interviewer: "the_intimidator",
      duration: 2400,
      type: "debugging",
      problem: "Production is down. 1M users affected. You have logs. Find the issue."
    }
  ],

  globalChallenges: [
    "Interviewers share notes - inconsistencies are caught",
    "Energy management - showing fatigue loses points",
    "Previous phases inform later ones"
  ],

  reward: {
    xp: 50000,
    title: "Interview Legend",
    achievement: "The Complete Engineer",
    unlocks: "Mentor Mode - Train other players"
  }
};
```

---

# 9. UI/UX WIREFRAMES

## 9.1 Main Game Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ CODECRAFT: INTERVIEW LEGENDS                            🔥 Day 47   │   │
│  │                                                                      │   │
│  │ Rank: System Thinker (Tier 2)          XP: 42,350 / 52,000          │   │
│  │ ████████████████████░░░░░░░░░░░░  (81%)                             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────────┐│
│  │                     │  │                     │  │                      ││
│  │   🌍 WORLD MAP      │  │  📊 SKILL TREES     │  │  🎴 COLLECTION      ││
│  │                     │  │                     │  │                      ││
│  │  [World 1] ✓✓✓     │  │  Algorithms: ██░░░  │  │  Cards: 47/200       ││
│  │  [World 2] ✓✓○     │  │  Systems:    ███░░  │  │  Models: 23/75       ││
│  │  [World 3] ○○○     │  │  Frontend:   ██░░░  │  │  Titles: 8/50        ││
│  │  [World 4] 🔒      │  │  Soft Skills:████░  │  │                      ││
│  │                     │  │                     │  │                      ││
│  └─────────────────────┘  └─────────────────────┘  └──────────────────────┘│
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  🎯 DAILY CHALLENGES                                                   │ │
│  │                                                                        │ │
│  │  [⚡ Quick Fire] Solve 3 easy problems in 15 min         +500 XP     │ │
│  │  [🔥 Boss Rush] Defeat any boss without hints            +1000 XP    │ │
│  │  [🎲 Random Challenge] ???                               +??? XP     │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  📈 RECENT ACTIVITY                                                    │ │
│  │                                                                        │ │
│  │  ✅ "Two Sum" - Grade A (85%) - 2 hours ago                           │ │
│  │  ✅ "API Rate Limiter" - Grade A+ (88%) - 5 hours ago                 │ │
│  │  ❌ "The Silent Judge" (Boss) - Failed - 1 day ago                    │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [ 🎮 CONTINUE ]  [ ⚔️ BOSS FIGHT ]  [ 🎲 RANDOM ]  [ 📚 PRACTICE ]       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.2 Challenge Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  World 2, Level 12: "Cache Me If You Can"                    ⏱️ 23:45     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                              │
│  ┌─────────────────────────────────────────┐ ┌────────────────────────────┐ │
│  │ 👤 INTERVIEWER                          │ │ 📋 PHASE                   │ │
│  │                                         │ │                            │ │
│  │    [Avatar]                             │ │ [✓] Clarification          │ │
│  │    Alex Volkov                          │ │ [●] Approach ◄━━ YOU       │ │
│  │    MetaVerse (Meta-like)                │ │ [ ] Execution              │ │
│  │                                         │ │ [ ] Defense                │ │
│  │    Mood: 😐 Neutral                     │ │                            │ │
│  │                                         │ │                            │ │
│  └─────────────────────────────────────────┘ └────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 💬 CONVERSATION                                                        │ │
│  │                                                                        │ │
│  │ Alex: "Design a caching layer for our user service. It's getting      │ │
│  │        hammered with requests."                                        │ │
│  │                                                                        │ │
│  │ You: "What's the current traffic pattern? Read-heavy or balanced?"    │ │
│  │                                                                        │ │
│  │ Alex: "90% reads, 10% writes. About 100K requests per second."        │ │
│  │                                                                        │ │
│  │ You: "Got it. And what's the acceptable cache staleness?"             │ │
│  │                                                                        │ │
│  │ Alex: "Good question. We can tolerate up to 5 seconds of stale data." │ │
│  │                                                                        │ │
│  │ ─────────────────────────────────────────────────────────────────────  │ │
│  │                                                                        │ │
│  │ [Type your response...]                                         [Send]│ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │ 💡 HINTS (2 remaining)      │  │ 🎴 ACTIVE CARDS                     │   │
│  │                             │  │                                     │   │
│  │ [Use Hint: -50 XP]          │  │ [Tradeoff Intuition] Ready          │   │
│  │                             │  │ [Time Extension] x1                 │   │
│  └─────────────────────────────┘  └─────────────────────────────────────┘   │
│                                                                              │
│  Silence Clock: ██░░░░░░░░░░░░░░░░░░  (8 seconds)                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.3 Code Editor Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Execution Phase                                              ⏱️ 18:22     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 📝 CODE EDITOR                                          [Python ▼]    │ │
│  │                                                                        │ │
│  │   1 │ class LRUCache:                                                 │ │
│  │   2 │     def __init__(self, capacity: int):                          │ │
│  │   3 │         self.capacity = capacity                                │ │
│  │   4 │         self.cache = {}                                         │ │
│  │   5 │         self.order = []                                         │ │
│  │   6 │                                                                 │ │
│  │   7 │     def get(self, key: int) -> int:                             │ │
│  │   8 │         if key in self.cache:                                   │ │
│  │   9 │             self.order.remove(key)  # ⚠️ O(n) operation         │ │
│  │  10 │             self.order.append(key)                              │ │
│  │  11 │             return self.cache[key]                              │ │
│  │  12 │         return -1                                               │ │
│  │  13 │                                                                 │ │
│  │  14 │     def put(self, key: int, value: int) -> None:                │ │
│  │  15 │         # TODO: Implement put                                   │ │
│  │  16 │         pass                                                    │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌──────────────────────────────────┐ ┌───────────────────────────────────┐ │
│  │ 🧪 TEST CASES                    │ │ 📊 COMPLEXITY ANALYSIS            │ │
│  │                                  │ │                                   │ │
│  │ ✅ Test 1: Basic get/put         │ │ Current: O(n) for get            │ │
│  │ ✅ Test 2: Capacity limit        │ │ Expected: O(1) for get           │ │
│  │ ❓ Test 3: (Hidden)              │ │                                   │ │
│  │ ❓ Test 4: (Hidden)              │ │ ⚠️ Suboptimal complexity         │ │
│  │                                  │ │                                   │ │
│  │ [Run Tests]                      │ │                                   │ │
│  └──────────────────────────────────┘ └───────────────────────────────────┘ │
│                                                                              │
│  Alex: "I notice you're using a list for ordering. What's the complexity   │
│         of that remove operation?"                                          │
│                                                                              │
│  [Submit Solution]    [Ask Question]    [Request More Time: -100 XP]        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.4 Results/Feedback Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                        🏆 CHALLENGE COMPLETE 🏆                             │
│                                                                              │
│                          "Cache Me If You Can"                              │
│                                                                              │
│                         ╔════════════════════╗                              │
│                         ║    GRADE: A+       ║                              │
│                         ║    SCORE: 88%      ║                              │
│                         ╚════════════════════╝                              │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 📊 SCORE BREAKDOWN                                                     │ │
│  │                                                                        │ │
│  │ TECHNICAL (40%)                           COMMUNICATION (25%)          │ │
│  │ Correctness:    ████████░░ 85%           Clarity:      █████████░ 92% │ │
│  │ Efficiency:     ███████░░░ 75%           Structure:    ████████░░ 88% │ │
│  │ Code Quality:   █████████░ 90%           Questioning:  █████████░ 95% │ │
│  │ Edge Cases:     ████████░░ 80%           Collaboration:████████░░ 85% │ │
│  │                                                                        │ │
│  │ PROBLEM SOLVING (20%)                     SENIOR SIGNALS (15%)         │ │
│  │ Approach:       █████████░ 90%           Business:     ████████░░ 80% │ │
│  │ Tradeoffs:      █████████░ 92%           Ownership:    █████████░ 90% │ │
│  │ Adaptability:   ████████░░ 85%           Humility:     █████████░ 95% │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 📚 WHAT DIFFERENT CANDIDATES DO                                        │ │
│  │                                                                        │ │
│  │ 😰 WEAK CANDIDATE:                                                     │ │
│  │ "Uses a simple dictionary without ordering. Doesn't consider          │ │
│  │  eviction policy. Forgets about thread safety."                        │ │
│  │                                                                        │ │
│  │ 💪 STRONG SENIOR:                                                      │ │
│  │ "Uses OrderedDict or custom doubly-linked list + hashmap.              │ │
│  │  Discusses TTL, write-through vs write-back, cache warming."           │ │
│  │                                                                        │ │
│  │ 🏆 PRINCIPAL LEGEND:                                                   │ │
│  │ "Immediately asks about consistency requirements and CAP tradeoffs.    │ │
│  │  Discusses distributed caching, cache stampede prevention,             │ │
│  │  probabilistic early expiration. Mentions monitoring and alerting."    │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 🎁 REWARDS                                                             │ │
│  │                                                                        │ │
│  │ +680 XP (Base: 500 + No Hints Bonus: 100 + Streak: 80)                │ │
│  │ 🎴 NEW CARD: "Cache Invalidation Wisdom" (Rare)                       │ │
│  │ 🧠 NEW MODEL: "Write-Through vs Write-Back"                           │ │
│  │ 🔓 UNLOCKED: "Distributed Caching" challenge                          │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [🔄 Retry for S Rank]  [▶️ Next Challenge]  [🏠 Return to Hub]            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 10. EXPANSION ROADMAP

## Phase 1: Core Game (Months 1-3)
- World 1 & 2 complete
- 50 challenges
- 10 boss fights
- Core scoring system
- Basic skill trees
- 50 skill cards

## Phase 2: Advanced Content (Months 4-6)
- World 3 & 4 complete
- 100 additional challenges
- All boss fights
- Complete skill trees
- 200 skill cards
- Mental model collection

## Phase 3: Multiplayer (Months 7-9)
- 1v1 interview battles
- Team challenges
- Leaderboards
- Guilds/study groups
- Mock interview matching

## Phase 4: AI Enhancement (Months 10-12)
- GPT-powered dynamic interviewers
- Personalized difficulty adjustment
- Natural language code review
- Voice interview mode
- Real-time feedback during coding

## Phase 5: Enterprise (Year 2)
- Company-specific interview prep
- HR dashboard for training
- Integration with ATS systems
- Certification program
- Corporate licensing

---

# 11. TECHNICAL ARCHITECTURE

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React + TypeScript)                     │
│                                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Game UI    │  │ Code Editor  │  │  Whiteboard  │  │   Chat UI    │   │
│  │  (Canvas)    │  │  (Monaco)    │  │  (Excalidraw)│  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │                      State Management (Zustand)                     │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (Node.js)                              │
│                                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Game Logic  │  │  AI Service  │  │ Code Runner  │  │   Scoring    │   │
│  │              │  │  (OpenAI)    │  │  (Sandbox)   │  │   Engine     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │                         Database (PostgreSQL)                       │   │
│  │     Users | Progress | Challenges | Scores | Inventory | Ranks     │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# 12. SUCCESS METRICS

## Player Outcomes
- 80% of players who complete World 2 report improved interview confidence
- 60% of players who complete World 3 receive offers at senior+ level
- Average interview pass rate increases by 40% after 20 hours of play
- NPS score > 50

## Engagement Metrics
- Day 7 retention > 40%
- Day 30 retention > 20%
- Average session length > 25 minutes
- Daily active users completing at least 1 challenge > 70%

---

*This is CodeCraft: Interview Legends. Play to master. Master to succeed.*
