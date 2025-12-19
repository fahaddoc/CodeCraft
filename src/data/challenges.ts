// ============================================================================
// CODECRAFT: INTERVIEW LEGENDS - Challenge Database
// ============================================================================

import { Challenge, WorldId } from '../types/game.types';

// ============================================================================
// WORLD 1: THE GAUNTLET (Junior → Mid-Level)
// ============================================================================

export const WORLD_1_CHALLENGES: Challenge[] = [
  // Level 1: Hello, Interview
  {
    id: 'w1_l1_two_sum',
    name: 'Hello, Interview',
    world: 'world_1',
    level: 1,
    difficulty: 1,
    type: 'algorithm',
    briefing: {
      context: "Your first phone screen! It's for a mid-sized startup. The interviewer seems friendly but busy.",
      companyType: 'Startup',
      roleLevel: 'Entry-Level',
      interviewer: 'david_friendly',
      timeLimit: 900,
      stakes: 'First impression matters. Nail the basics.',
      hints: ['Think about what data structure gives you O(1) lookup', 'Start with the brute force, then optimize'],
    },
    problem: {
      description: "Given an array of integers, find two numbers that add up to a target sum.",
      intentionallyVague: true,
      vagueAspects: [
        'Are there always exactly two numbers?',
        'Can we use the same element twice?',
        'What if no solution exists?',
        'Should we return indices or values?',
      ],
      starterCode: `function twoSum(nums, target) {
  // Your code here
}`,
      testCases: [
        { id: 't1', name: 'Basic case', input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], isHidden: false, isEdgeCase: false, points: 20 },
        { id: 't2', name: 'Middle elements', input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], isHidden: false, isEdgeCase: false, points: 20 },
      ],
      hiddenTestCases: [
        { id: 'h1', name: 'Duplicates', input: { nums: [3, 3], target: 6 }, expected: [0, 1], isHidden: true, isEdgeCase: true, points: 15 },
        { id: 'h2', name: 'Negative numbers', input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4], isHidden: true, isEdgeCase: true, points: 15 },
        { id: 'h3', name: 'Large array', input: { nums: Array.from({ length: 10000 }, (_, i) => i), target: 19997 }, expected: [9998, 9999], isHidden: true, isEdgeCase: false, points: 15 },
      ],
      expectedClarifications: [
        'Are there always exactly two numbers that add up to the target?',
        'Can the same element be used twice?',
        'What should I return if no solution exists?',
        'Should I return indices or the actual values?',
        'Is the array sorted?',
      ],
      antiPatterns: ['Using three nested loops', 'Not considering negative numbers', 'Returning wrong data type'],
      optimalApproach: 'hashmap',
    },
    phases: [
      { phase: 'briefing', duration: 30, instructions: 'Read the problem carefully', silenceThreshold: 20 },
      { phase: 'clarification', duration: 120, instructions: 'Ask questions to understand requirements', silenceThreshold: 30 },
      { phase: 'approach', duration: 180, instructions: 'Explain your approach before coding', silenceThreshold: 45 },
      { phase: 'execution', duration: 480, instructions: 'Implement your solution', silenceThreshold: 60 },
      { phase: 'defense', duration: 90, instructions: 'Explain and defend your solution', silenceThreshold: 30 },
    ],
    scoring: {
      weights: { technical: 0.45, communication: 0.25, problemSolving: 0.20, seniorSignals: 0.10 },
      bonuses: [
        { id: 'optimal', name: 'Optimal Solution', condition: 'Used hashmap for O(n) time', points: 20 },
        { id: 'edge_cases', name: 'Edge Case Master', condition: 'Discussed edge cases proactively', points: 10 },
      ],
      penalties: [
        { id: 'brute_force', name: 'Brute Force Only', trigger: 'Only submitted O(n²) solution', points: -15 },
        { id: 'no_questions', name: 'No Clarifications', trigger: 'Did not ask any clarifying questions', points: -20 },
      ],
      passingScore: 60,
    },
    feedback: {
      weak: "Jumped straight to coding without asking about edge cases. Used nested loops without considering hashmap. Didn't test the solution.",
      strong: "Asked about edge cases and duplicates. Explained the hashmap approach clearly. Walked through the solution with an example.",
      legend: "Immediately identified this as the classic Two Sum. Asked about follow-up constraints (sorted array = two pointers). Discussed time-space tradeoff. Wrote clean code with meaningful variable names. Proactively handled edge cases.",
      commonMistakes: [
        'Forgetting that indices should be different',
        'Not handling duplicates correctly',
        'Off-by-one errors',
      ],
      proTips: [
        'Always ask clarifying questions first',
        'Start with brute force, then optimize',
        'Trace through your solution with an example',
      ],
    },
    rewards: {
      baseXP: 100,
      skillPoints: { algorithms: 10, soft_skills: 5 },
      possibleCards: ['hashmap_master'],
      possibleModels: ['two_pointer_technique'],
      unlocks: ['w1_l2'],
    },
    tags: ['arrays', 'hashmaps', 'classic'],
    prerequisites: [],
  },

  // Level 2: String Surgery
  {
    id: 'w1_l2_valid_parentheses',
    name: 'String Surgery',
    world: 'world_1',
    level: 2,
    difficulty: 2,
    type: 'algorithm',
    briefing: {
      context: "A recruiter reached out from a fintech company. This is a technical screen for a junior developer position.",
      companyType: 'Fintech Startup',
      roleLevel: 'Junior Developer',
      interviewer: 'margaret_mentor',
      timeLimit: 1200,
      stakes: 'Standard junior-level problem. Execute cleanly.',
      hints: ['Think about the LIFO property', 'What data structure matches opening with closing?'],
    },
    problem: {
      description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
      intentionallyVague: false,
      testCases: [
        { id: 't1', name: 'Simple valid', input: '()', expected: true, isHidden: false, isEdgeCase: false, points: 20 },
        { id: 't2', name: 'Mixed valid', input: '()[]{}', expected: true, isHidden: false, isEdgeCase: false, points: 20 },
        { id: 't3', name: 'Nested valid', input: '{[]}', expected: true, isHidden: false, isEdgeCase: false, points: 20 },
        { id: 't4', name: 'Invalid', input: '(]', expected: false, isHidden: false, isEdgeCase: false, points: 20 },
      ],
      hiddenTestCases: [
        { id: 'h1', name: 'Empty string', input: '', expected: true, isHidden: true, isEdgeCase: true, points: 10 },
        { id: 'h2', name: 'Single bracket', input: '[', expected: false, isHidden: true, isEdgeCase: true, points: 10 },
        { id: 'h3', name: 'Extra closing', input: '(()))', expected: false, isHidden: true, isEdgeCase: true, points: 10 },
      ],
      expectedClarifications: [
        'What should I return for an empty string?',
        'Can the string contain other characters?',
        'What about whitespace?',
      ],
      antiPatterns: ['Using regex without understanding', 'Not using a stack', 'Forgetting to check stack at end'],
      optimalApproach: 'stack',
    },
    phases: [
      { phase: 'briefing', duration: 30, instructions: 'Read the problem carefully', silenceThreshold: 20 },
      { phase: 'clarification', duration: 90, instructions: 'Ask questions', silenceThreshold: 25 },
      { phase: 'approach', duration: 180, instructions: 'Explain your approach', silenceThreshold: 40 },
      { phase: 'execution', duration: 600, instructions: 'Implement your solution', silenceThreshold: 60 },
      { phase: 'defense', duration: 120, instructions: 'Defend your solution', silenceThreshold: 30 },
    ],
    scoring: {
      weights: { technical: 0.45, communication: 0.25, problemSolving: 0.20, seniorSignals: 0.10 },
      bonuses: [
        { id: 'stack_explanation', name: 'Stack Master', condition: 'Explained why stack is appropriate', points: 15 },
      ],
      penalties: [
        { id: 'forgot_empty_check', name: 'Forgot Empty Check', trigger: 'Did not handle empty string', points: -10 },
      ],
      passingScore: 60,
    },
    feedback: {
      weak: "Didn't recognize this as a stack problem. Tried to use counters instead of proper matching.",
      strong: "Immediately identified stack as the right data structure. Used a hashmap for bracket matching. Handled edge cases.",
      legend: "Explained the LIFO property and why it matches the problem. Wrote clean, readable code. Discussed potential follow-ups like handling other characters.",
      commonMistakes: ['Not checking if stack is empty before popping', 'Forgetting to verify stack is empty at the end'],
      proTips: ['Use a hashmap for clean bracket matching', 'Always handle the empty string case'],
    },
    rewards: {
      baseXP: 120,
      skillPoints: { algorithms: 12, soft_skills: 5 },
      possibleCards: ['stack_intuition'],
      possibleModels: ['lifo_principle'],
      unlocks: ['w1_l3'],
    },
    tags: ['stacks', 'strings', 'classic'],
    prerequisites: ['w1_l1_two_sum'],
  },

  // Level 5: The Debug Detective
  {
    id: 'w1_l5_debug_challenge',
    name: 'The Debug Detective',
    world: 'world_1',
    level: 5,
    difficulty: 3,
    type: 'debugging',
    briefing: {
      context: "You've made it to the on-site! This round focuses on debugging skills. You're given code that's 'almost working' but has bugs.",
      companyType: 'E-commerce Platform',
      roleLevel: 'Mid-Level',
      interviewer: 'margaret_mentor',
      timeLimit: 1500,
      stakes: 'Show you can find and fix bugs systematically.',
      hints: ['Read the code line by line', 'Test with edge cases mentally'],
    },
    problem: {
      description: "The following function is supposed to merge two sorted arrays into one sorted array, but it has bugs. Find and fix them.",
      intentionallyVague: false,
      brokenCode: `function mergeSortedArrays(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
    }
  }

  // Add remaining elements
  while (i < arr1.length) {
    result.push(arr1[i]);
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}`,
      testCases: [
        { id: 't1', name: 'Basic merge', input: { arr1: [1, 3, 5], arr2: [2, 4, 6] }, expected: [1, 2, 3, 4, 5, 6], isHidden: false, isEdgeCase: false, points: 25 },
        { id: 't2', name: 'Different lengths', input: { arr1: [1, 2], arr2: [3, 4, 5, 6] }, expected: [1, 2, 3, 4, 5, 6], isHidden: false, isEdgeCase: false, points: 25 },
      ],
      hiddenTestCases: [
        { id: 'h1', name: 'Empty first array', input: { arr1: [], arr2: [1, 2, 3] }, expected: [1, 2, 3], isHidden: true, isEdgeCase: true, points: 15 },
        { id: 'h2', name: 'Both empty', input: { arr1: [], arr2: [] }, expected: [], isHidden: true, isEdgeCase: true, points: 15 },
      ],
      expectedClarifications: [
        'Should I modify the original arrays or create a new one?',
        'What if one or both arrays are empty?',
        'Are the input arrays guaranteed to be sorted?',
      ],
      antiPatterns: ['Not testing the fix', 'Making unnecessary changes', 'Breaking working code'],
    },
    phases: [
      { phase: 'briefing', duration: 60, instructions: 'Read and understand the buggy code', silenceThreshold: 30 },
      { phase: 'clarification', duration: 60, instructions: 'Ask about expected behavior', silenceThreshold: 20 },
      { phase: 'execution', duration: 900, instructions: 'Find and fix the bugs', silenceThreshold: 60 },
      { phase: 'defense', duration: 180, instructions: 'Explain what was wrong and why', silenceThreshold: 30 },
    ],
    scoring: {
      weights: { technical: 0.50, communication: 0.20, problemSolving: 0.20, seniorSignals: 0.10 },
      bonuses: [
        { id: 'found_all', name: 'Bug Hunter', condition: 'Found all bugs', points: 20 },
        { id: 'explained_well', name: 'Clear Explanation', condition: 'Explained each bug clearly', points: 10 },
      ],
      penalties: [
        { id: 'broke_code', name: 'Broke Working Code', trigger: 'Introduced new bugs', points: -20 },
      ],
      passingScore: 65,
    },
    feedback: {
      weak: "Made random changes without systematic debugging. Didn't trace through the code to find the actual bugs.",
      strong: "Traced through the code with a test case. Found both bugs (missing j++ and missing i++). Tested the fix.",
      legend: "Immediately spotted the infinite loop potential. Explained the bugs clearly. Suggested defensive programming improvements like input validation.",
      commonMistakes: ['Changing code without understanding the bug', 'Not testing edge cases after fixing'],
      proTips: ['Trace through with a small example', 'Look for loop increment/decrement issues'],
    },
    rewards: {
      baseXP: 150,
      skillPoints: { algorithms: 8, soft_skills: 10 },
      possibleCards: ['debug_vision'],
      possibleModels: ['systematic_debugging'],
      unlocks: ['w1_l6'],
    },
    tags: ['debugging', 'arrays', 'loops'],
    prerequisites: ['w1_l4'],
  },
];

// ============================================================================
// WORLD 1 BOSSES
// ============================================================================

export const WORLD_1_BOSSES: Challenge[] = [
  // Boss 1: The Gatekeeper (HR Screen)
  {
    id: 'w1_boss_gatekeeper',
    name: 'The Gatekeeper',
    world: 'world_1',
    level: 'boss',
    difficulty: 4,
    type: 'behavioral',
    briefing: {
      context: "This is the final HR screen before technical rounds. The recruiter seems nice, but they're secretly evaluating your salary expectations and communication skills.",
      companyType: 'FAANG-adjacent',
      roleLevel: 'Mid-Level',
      interviewer: 'david_friendly',
      timeLimit: 1800,
      stakes: 'They will try to anchor your salary low. Stay firm but diplomatic.',
      hints: ['Research market rates beforehand', 'Never give a number first if possible'],
    },
    problem: {
      description: "Navigate the HR screen. Answer behavioral questions well, and don't get lowballed on compensation.",
      intentionallyVague: true,
      vagueAspects: ['What salary range are you looking for?', 'Tell me about yourself', 'Why are you leaving your current role?'],
      testCases: [],
      hiddenTestCases: [],
      expectedClarifications: [],
      antiPatterns: ['Badmouthing current employer', 'Giving salary first', 'Being desperate'],
    },
    phases: [
      { phase: 'briefing', duration: 30, instructions: 'Prepare for HR questions', silenceThreshold: 15 },
      { phase: 'execution', duration: 1500, instructions: 'Answer HR questions', silenceThreshold: 45 },
      { phase: 'defense', duration: 270, instructions: 'Handle salary negotiation', silenceThreshold: 30 },
    ],
    scoring: {
      weights: { technical: 0.10, communication: 0.40, problemSolving: 0.20, seniorSignals: 0.30 },
      bonuses: [
        { id: 'salary_win', name: 'Negotiation Master', condition: 'Did not anchor low', points: 25 },
        { id: 'professional', name: 'Professional Demeanor', condition: 'Stayed positive about past experiences', points: 15 },
      ],
      penalties: [
        { id: 'badmouthed', name: 'Burned Bridges', trigger: 'Spoke negatively about past employers', points: -25 },
        { id: 'anchored_low', name: 'Anchored Low', trigger: 'Gave a low salary number first', points: -20 },
      ],
      passingScore: 70,
    },
    feedback: {
      weak: "Gave a salary range first and anchored low. Complained about current manager. Seemed desperate for the job.",
      strong: "Deflected salary questions politely. Framed past experiences positively. Showed genuine interest in the role.",
      legend: "Turned the salary question around ('What's the range for this role?'). Demonstrated clear career narrative. Asked insightful questions about the company.",
      commonMistakes: ['Sharing salary history unprompted', 'Being negative about past experiences'],
      proTips: ['Always ask for the range first', 'Frame everything as growth opportunities'],
    },
    rewards: {
      baseXP: 500,
      skillPoints: { soft_skills: 25, leadership: 10 },
      possibleCards: ['negotiation_shield'],
      possibleModels: ['salary_negotiation'],
      unlocks: ['w1_boss_speedrunner'],
    },
    tags: ['behavioral', 'negotiation', 'boss'],
    prerequisites: ['w1_l5_debug_challenge'],
  },

  // Boss 5: The Silent Judge
  {
    id: 'w1_boss_silent_judge',
    name: 'The Silent Judge',
    world: 'world_1',
    level: 'boss',
    difficulty: 5,
    type: 'algorithm',
    briefing: {
      context: "The interviewer says nothing. No feedback. No encouragement. No hints. Just... watching. This tests your ability to perform under psychological pressure.",
      companyType: 'Secretive Startup',
      roleLevel: 'Senior',
      interviewer: 'sarah_silent',
      timeLimit: 2400,
      stakes: 'Your only feedback is whether your code works. Stay calm.',
      hints: ['Trust yourself', 'Think out loud to fill the silence'],
    },
    problem: {
      description: "Implement a function that finds the longest substring without repeating characters.",
      intentionallyVague: true,
      vagueAspects: ['What counts as a character?', 'Case sensitivity?', 'Empty string handling?'],
      testCases: [
        { id: 't1', name: 'Basic', input: 'abcabcbb', expected: 3, isHidden: false, isEdgeCase: false, points: 25 },
        { id: 't2', name: 'All same', input: 'bbbbb', expected: 1, isHidden: false, isEdgeCase: false, points: 25 },
        { id: 't3', name: 'Mixed', input: 'pwwkew', expected: 3, isHidden: false, isEdgeCase: false, points: 25 },
      ],
      hiddenTestCases: [
        { id: 'h1', name: 'Empty', input: '', expected: 0, isHidden: true, isEdgeCase: true, points: 10 },
        { id: 'h2', name: 'Single char', input: 'a', expected: 1, isHidden: true, isEdgeCase: true, points: 10 },
        { id: 'h3', name: 'All unique', input: 'abcdefg', expected: 7, isHidden: true, isEdgeCase: true, points: 10 },
      ],
      expectedClarifications: [
        'Should I handle empty strings?',
        'Is it case-sensitive?',
        'What about special characters?',
      ],
      antiPatterns: ['Brute force O(n³)', 'Getting flustered by silence', 'Giving up'],
      optimalApproach: 'sliding window',
    },
    phases: [
      { phase: 'briefing', duration: 30, instructions: 'Read the problem', silenceThreshold: 15 },
      { phase: 'clarification', duration: 180, instructions: 'Ask questions (minimal response expected)', silenceThreshold: 45 },
      { phase: 'approach', duration: 300, instructions: 'Explain your approach out loud', silenceThreshold: 60 },
      { phase: 'execution', duration: 1200, instructions: 'Implement in silence', silenceThreshold: 90 },
      { phase: 'defense', duration: 300, instructions: 'Explain your solution', silenceThreshold: 45 },
    ],
    scoring: {
      weights: { technical: 0.45, communication: 0.25, problemSolving: 0.20, seniorSignals: 0.10 },
      bonuses: [
        { id: 'stayed_calm', name: 'Ice Cold', condition: 'Did not show frustration', points: 25 },
        { id: 'optimal', name: 'Sliding Window Master', condition: 'Used optimal O(n) approach', points: 20 },
      ],
      penalties: [
        { id: 'panicked', name: 'Cracked Under Pressure', trigger: 'Showed visible frustration', points: -20 },
        { id: 'gave_up', name: 'Surrendered', trigger: 'Asked to skip the question', points: -30 },
      ],
      passingScore: 70,
    },
    feedback: {
      weak: "Got flustered by the silence. Stopped thinking out loud. Submitted incomplete solution.",
      strong: "Maintained composure. Thought out loud consistently. Arrived at a working solution despite no feedback.",
      legend: "Treated the silence as a feature, not a bug. Explained approach clearly as if teaching. Submitted optimal sliding window solution with all edge cases handled.",
      commonMistakes: ['Getting psyched out by lack of feedback', 'Rushing to fill silence with code'],
      proTips: ['Silence is neutral, not negative', 'Keep talking through your process'],
    },
    rewards: {
      baseXP: 750,
      skillPoints: { algorithms: 20, soft_skills: 15 },
      possibleCards: ['zen_focus'],
      possibleModels: ['sliding_window'],
      unlocks: ['world_2'],
    },
    tags: ['algorithm', 'pressure', 'boss', 'sliding_window'],
    prerequisites: ['w1_boss_nitpicker'],
  },
];

// ============================================================================
// WORLD 2: THE CRUCIBLE (Mid → Senior)
// ============================================================================

export const WORLD_2_CHALLENGES: Challenge[] = [
  // Level 1: Cache Me If You Can
  {
    id: 'w2_l1_lru_cache',
    name: 'Cache Me If You Can',
    world: 'world_2',
    level: 1,
    difficulty: 5,
    type: 'algorithm',
    briefing: {
      context: "Welcome to World 2. The problems are harder, and the expectations are higher. This is a classic system design problem disguised as coding.",
      companyType: 'High-Frequency Trading',
      roleLevel: 'Senior',
      interviewer: 'jennifer_skeptic',
      timeLimit: 2400,
      stakes: 'LRU Cache is a senior-level classic. Know it cold.',
      hints: ['Think about O(1) for both get and put', 'What combination of data structures gives you that?'],
    },
    problem: {
      description: "Design and implement an LRU (Least Recently Used) cache.",
      intentionallyVague: true,
      vagueAspects: [
        'What happens on capacity overflow?',
        'Should get() update recency?',
        'Thread safety requirements?',
      ],
      starterCode: `class LRUCache {
  constructor(capacity) {
    // Initialize your cache
  }

  get(key) {
    // Return value or -1 if not found
  }

  put(key, value) {
    // Insert or update, evict if needed
  }
}`,
      testCases: [
        { id: 't1', name: 'Basic operations', input: { ops: ['put(1,1)', 'put(2,2)', 'get(1)', 'put(3,3)', 'get(2)'], cap: 2 }, expected: [null, null, 1, null, -1], isHidden: false, isEdgeCase: false, points: 30 },
      ],
      hiddenTestCases: [
        { id: 'h1', name: 'Capacity 1', input: { ops: ['put(1,1)', 'put(2,2)', 'get(1)'], cap: 1 }, expected: [null, null, -1], isHidden: true, isEdgeCase: true, points: 20 },
        { id: 'h2', name: 'Update existing', input: { ops: ['put(1,1)', 'put(1,2)', 'get(1)'], cap: 2 }, expected: [null, null, 2], isHidden: true, isEdgeCase: true, points: 20 },
      ],
      expectedClarifications: [
        'What should be the time complexity for get and put?',
        'What happens when we put a key that already exists?',
        'Should the cache be thread-safe?',
        'What data types are keys and values?',
      ],
      antiPatterns: ['O(n) eviction', 'Using just an array', 'Forgetting to update on get'],
      optimalApproach: 'hashmap + doubly linked list',
    },
    phases: [
      { phase: 'briefing', duration: 60, instructions: 'Understand the LRU requirement', silenceThreshold: 30 },
      { phase: 'clarification', duration: 180, instructions: 'Clarify the interface', silenceThreshold: 45 },
      { phase: 'approach', duration: 360, instructions: 'Explain your data structure choice', silenceThreshold: 60 },
      { phase: 'execution', duration: 1200, instructions: 'Implement the cache', silenceThreshold: 90 },
      { phase: 'defense', duration: 300, instructions: 'Discuss complexity and tradeoffs', silenceThreshold: 45 },
    ],
    scoring: {
      weights: { technical: 0.45, communication: 0.20, problemSolving: 0.25, seniorSignals: 0.10 },
      bonuses: [
        { id: 'o1_both', name: 'Constant Time Master', condition: 'O(1) for both operations', points: 25 },
        { id: 'clean_impl', name: 'Clean Implementation', condition: 'Well-structured code', points: 10 },
      ],
      penalties: [
        { id: 'wrong_ds', name: 'Wrong Data Structure', trigger: 'Used only array', points: -20 },
      ],
      passingScore: 70,
    },
    feedback: {
      weak: "Used a simple array with O(n) eviction. Didn't understand why the combination of data structures is needed.",
      strong: "Used hashmap + doubly linked list. Explained the O(1) requirement clearly. Handled edge cases.",
      legend: "Immediately drew the data structure diagram. Discussed production considerations (thread safety, TTL). Mentioned alternative approaches like OrderedDict in Python.",
      commonMistakes: ['Forgetting to update recency on get()', 'Off-by-one in capacity'],
      proTips: ['Draw the data structure before coding', 'Consider using built-in OrderedDict for real production'],
    },
    rewards: {
      baseXP: 250,
      skillPoints: { algorithms: 20, systems: 10 },
      possibleCards: ['cache_intuition'],
      possibleModels: ['lru_eviction'],
      unlocks: ['w2_l2'],
    },
    tags: ['design', 'hashmap', 'linked_list', 'classic'],
    prerequisites: [],
  },
];

// ============================================================================
// WORLD 2 BOSSES
// ============================================================================

export const WORLD_2_BOSSES: Challenge[] = [
  // Boss: The Legacy Guardian
  {
    id: 'w2_boss_legacy_guardian',
    name: 'The Legacy Guardian',
    world: 'world_2',
    level: 'boss',
    difficulty: 7,
    type: 'code_review',
    briefing: {
      context: "You're reviewing code written by a senior engineer who's been at the company for 10 years. He's in the room. The code... has issues.",
      companyType: 'Enterprise Company',
      roleLevel: 'Senior',
      interviewer: 'bob_legacy_guardian',
      timeLimit: 2400,
      stakes: 'Give honest feedback without destroying the relationship. This is the hardest skill in engineering.',
      hints: ['Be diplomatic but honest', 'Focus on the code, not the person', 'Ask questions instead of making statements'],
    },
    problem: {
      description: "Review this code and provide constructive feedback.",
      intentionallyVague: false,
      brokenCode: `// UserManager.js - Written by Bob (10 years at company)
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
}`,
      testCases: [],
      hiddenTestCases: [],
      expectedClarifications: [
        'What is the context for this code?',
        'Are there performance requirements?',
        'Is this code currently in production?',
      ],
      antiPatterns: ['Being too harsh', 'Being too gentle', 'Not providing alternatives'],
    },
    phases: [
      { phase: 'briefing', duration: 120, instructions: 'Read and analyze the code', silenceThreshold: 60 },
      { phase: 'clarification', duration: 120, instructions: 'Ask about context and constraints', silenceThreshold: 30 },
      { phase: 'execution', duration: 1500, instructions: 'Provide feedback diplomatically', silenceThreshold: 60 },
      { phase: 'defense', duration: 360, instructions: 'Handle pushback gracefully', silenceThreshold: 45 },
    ],
    scoring: {
      weights: { technical: 0.30, communication: 0.35, problemSolving: 0.15, seniorSignals: 0.20 },
      bonuses: [
        { id: 'diplomatic', name: 'Master Diplomat', condition: 'Gave honest feedback diplomatically', points: 30 },
        { id: 'handled_pushback', name: 'Thick Skin', condition: 'Handled defensive reactions well', points: 20 },
      ],
      penalties: [
        { id: 'too_harsh', name: 'Burned Bridge', trigger: 'Made it personal', points: -30 },
        { id: 'too_soft', name: 'Avoided Conflict', trigger: 'Did not address real issues', points: -20 },
      ],
      passingScore: 70,
    },
    feedback: {
      weak: "Either destroyed Bob's confidence or failed to mention any real issues. Didn't frame feedback constructively.",
      strong: "Identified issues while respecting Bob's experience. Used questions like 'I wonder if we could...' instead of 'This is wrong.'",
      legend: "Acknowledged the code works and has been battle-tested. Framed improvements as 'future-proofing' rather than criticism. Handled Bob's defensiveness by agreeing with valid points. Left Bob wanting to collaborate on improvements.",
      commonMistakes: ['Attacking the person instead of the code', 'Not having specific suggestions'],
      proTips: ['Use "we" language', 'Start with what works', 'Ask questions instead of making statements'],
    },
    rewards: {
      baseXP: 1000,
      skillPoints: { soft_skills: 30, leadership: 20 },
      possibleCards: ['diplomatic_shield'],
      possibleModels: ['constructive_feedback'],
      unlocks: ['w2_boss_performance_fanatic'],
    },
    tags: ['code_review', 'behavioral', 'boss', 'diplomacy'],
    prerequisites: ['w2_l10'],
  },

  // Boss: On-Call Nightmare
  {
    id: 'w2_boss_oncall_nightmare',
    name: 'The On-Call Nightmare',
    world: 'world_2',
    level: 'boss',
    difficulty: 8,
    type: 'debugging',
    briefing: {
      context: "It's 3 AM. You're on call. Production is down. 500,000 users are affected. The CEO is awake and watching. Find the bug. NOW.",
      companyType: 'E-commerce Giant',
      roleLevel: 'Senior On-Call',
      interviewer: 'jennifer_skeptic',
      timeLimit: 1800,
      stakes: 'Every minute of downtime costs $10,000. The pressure is real.',
      hints: ['Check the metrics first', 'Look at what changed recently', 'Rollback might be faster than fixing'],
    },
    problem: {
      description: "Production is experiencing 50% error rate on the checkout API. Analyze the logs, metrics, and recent changes to find the root cause.",
      intentionallyVague: true,
      vagueAspects: [
        'What changed recently?',
        'Which service is failing?',
        'Is it a code issue or infrastructure?',
      ],
      testCases: [],
      hiddenTestCases: [],
      expectedClarifications: [
        'When did this start?',
        'What were the recent deployments?',
        'What do the error logs show?',
        'Is it affecting all users or a subset?',
      ],
      antiPatterns: ['Panicking', 'Making changes without understanding', 'Not communicating'],
    },
    phases: [
      { phase: 'briefing', duration: 60, instructions: 'Assess the situation', silenceThreshold: 20 },
      { phase: 'clarification', duration: 180, instructions: 'Gather information systematically', silenceThreshold: 30 },
      { phase: 'execution', duration: 1200, instructions: 'Find and fix the issue', silenceThreshold: 60 },
      { phase: 'defense', duration: 180, instructions: 'Write the post-mortem summary', silenceThreshold: 45 },
    ],
    scoring: {
      weights: { technical: 0.40, communication: 0.25, problemSolving: 0.25, seniorSignals: 0.10 },
      bonuses: [
        { id: 'fast_resolution', name: 'Speed Demon', condition: 'Resolved in under 15 minutes', points: 30 },
        { id: 'good_communication', name: 'Calm Communicator', condition: 'Kept stakeholders informed', points: 20 },
        { id: 'root_cause', name: 'Root Cause Found', condition: 'Identified actual root cause', points: 25 },
      ],
      penalties: [
        { id: 'panicked', name: 'Lost Composure', trigger: 'Showed panic', points: -20 },
        { id: 'made_worse', name: 'Made It Worse', trigger: 'Changes caused more issues', points: -30 },
      ],
      passingScore: 70,
    },
    feedback: {
      weak: "Panicked. Made random changes. Didn't communicate with the team. Took over an hour to resolve.",
      strong: "Stayed calm. Checked metrics first. Found the recent deployment. Rolled back quickly. Kept the channel updated.",
      legend: "Immediately established communication. Delegated tasks efficiently. Found root cause (database connection pool exhaustion from new feature). Rolled back within 10 minutes. Started post-mortem notes immediately.",
      commonMistakes: ['Not checking recent changes', 'Making changes without testing', 'Silent debugging'],
      proTips: ['Rollback first, debug later', 'Communicate constantly', 'Document everything'],
    },
    rewards: {
      baseXP: 1200,
      skillPoints: { systems: 25, soft_skills: 20, leadership: 15 },
      possibleCards: ['incident_commander'],
      possibleModels: ['incident_response'],
      unlocks: ['world_3'],
    },
    tags: ['debugging', 'production', 'boss', 'pressure'],
    prerequisites: ['w2_boss_pair_programmer'],
  },
];

// ============================================================================
// WORLD 3: THE ASCENT (Senior → Staff/Lead)
// ============================================================================

export const WORLD_3_CHALLENGES: Challenge[] = [
  // Level 1: Design a Notification System
  {
    id: 'w3_l1_notification_system',
    name: 'Scale or Die',
    world: 'world_3',
    level: 1,
    difficulty: 7,
    type: 'system_design',
    briefing: {
      context: "Welcome to Staff-level territory. You're designing a real-time notification system for a social media app with 500M users.",
      companyType: 'Social Media Giant',
      roleLevel: 'Staff Engineer',
      interviewer: 'raj_architect',
      timeLimit: 2700,
      stakes: 'This is the kind of problem that makes or breaks staff-level candidates.',
      hints: ['Think about fan-out strategies', 'Consider the celebrity user problem', 'Push vs pull'],
    },
    problem: {
      description: "Design a notification system for a social media platform.",
      intentionallyVague: true,
      vagueAspects: [
        'What types of notifications?',
        'Real-time requirements?',
        'Delivery guarantees?',
        'User preferences?',
      ],
      constraints: {
        users: '500M monthly active users',
        notifications: '50 notifications per user per day average',
        latency: 'Must be delivered within 1 second for push',
        reliability: '99.99% delivery rate',
        types: 'push, email, in-app, SMS',
        budget: 'Reasonable startup budget',
      },
      testCases: [],
      hiddenTestCases: [],
      expectedClarifications: [
        'What counts as "delivered"?',
        'Can we batch notifications?',
        'What about priority levels?',
        'How do we handle user preferences?',
        'Rate limiting requirements?',
        'International users and time zones?',
      ],
      antiPatterns: [
        'Single point of failure',
        'Synchronous processing',
        'No backpressure handling',
        'Ignoring user preferences',
        'No monitoring',
      ],
    },
    phases: [
      { phase: 'briefing', duration: 60, instructions: 'Understand the scale', silenceThreshold: 30 },
      { phase: 'clarification', duration: 300, instructions: 'Gather all requirements', silenceThreshold: 60 },
      { phase: 'approach', duration: 600, instructions: 'Design the high-level architecture', silenceThreshold: 90 },
      { phase: 'execution', duration: 1200, instructions: 'Dive deep into components', silenceThreshold: 90 },
      { phase: 'defense', duration: 300, instructions: 'Handle curveballs', silenceThreshold: 45 },
    ],
    scoring: {
      weights: { technical: 0.35, communication: 0.25, problemSolving: 0.25, seniorSignals: 0.15 },
      bonuses: [
        { id: 'celebrity_problem', name: 'Celebrity Aware', condition: 'Addressed celebrity/influencer scenario', points: 20 },
        { id: 'backpressure', name: 'Backpressure Pro', condition: 'Discussed backpressure handling', points: 15 },
        { id: 'monitoring', name: 'Observable System', condition: 'Included monitoring and alerting', points: 15 },
      ],
      penalties: [
        { id: 'spof', name: 'Single Point of Failure', trigger: 'Did not address redundancy', points: -20 },
        { id: 'sync', name: 'Synchronous Thinking', trigger: 'Proposed synchronous processing at scale', points: -15 },
      ],
      passingScore: 72,
    },
    feedback: {
      weak: "Drew a basic request-response flow. Didn't consider scale. Missed the celebrity problem entirely.",
      strong: "Used message queue for async processing. Discussed push vs pull for different scales. Considered rate limiting and user preferences.",
      legend: "Started with requirements gathering. Drew a complete architecture with Kafka, worker pools, priority queues, dead letter queues, and monitoring. Addressed the thundering herd problem for celebrity posts. Discussed graceful degradation and backpressure. Considered cost optimization.",
      commonMistakes: ['Underestimating the scale', 'Forgetting about failures'],
      proTips: ['Always start with requirements', 'Draw before you talk', 'Think about failure modes'],
    },
    rewards: {
      baseXP: 500,
      skillPoints: { systems: 30, soft_skills: 10 },
      possibleCards: ['system_design_template'],
      possibleModels: ['fan_out_strategies'],
      unlocks: ['w3_l2'],
    },
    tags: ['system_design', 'scale', 'distributed'],
    prerequisites: [],
  },
];

// ============================================================================
// WORLD 4: LEGENDARY MODE (Principal / Interview God)
// ============================================================================

export const WORLD_4_CHALLENGES: Challenge[] = [
  // Final Boss: The Complete Engineer
  {
    id: 'w4_final_boss',
    name: 'The Complete Engineer',
    world: 'world_4',
    level: 'boss',
    difficulty: 10,
    type: 'multi_phase',
    briefing: {
      context: "This is it. The final round at MegaCorp. You'll face 4 different interviewers in 4 hours. Each has a different focus. Fail any round and it's over.",
      companyType: 'FAANG',
      roleLevel: 'Principal Engineer',
      interviewer: 'emily_legend',
      timeLimit: 14400,
      stakes: 'Principal Engineer offer, $800K TC. Everything you\'ve learned comes together here.',
      hints: ['Manage your energy', 'Each round builds on the last', 'Stay consistent'],
    },
    problem: {
      description: "Complete all four phases of the interview gauntlet.",
      intentionallyVague: true,
      vagueAspects: ['The problems will be revealed one at a time'],
      testCases: [],
      hiddenTestCases: [],
      expectedClarifications: [],
      antiPatterns: ['Inconsistency between rounds', 'Showing fatigue', 'Overconfidence'],
    },
    phases: [
      { phase: 'briefing', duration: 120, instructions: 'Prepare mentally for the marathon', silenceThreshold: 30 },
      { phase: 'execution', duration: 12000, instructions: 'Complete all 4 interview rounds', silenceThreshold: 120 },
      { phase: 'defense', duration: 1200, instructions: 'Final questions and wrap-up', silenceThreshold: 60 },
    ],
    scoring: {
      weights: { technical: 0.30, communication: 0.25, problemSolving: 0.25, seniorSignals: 0.20 },
      bonuses: [
        { id: 'perfect_run', name: 'Flawless Victory', condition: 'Aced all four rounds', points: 100 },
        { id: 'energy_management', name: 'Marathon Runner', condition: 'Maintained energy throughout', points: 30 },
        { id: 'consistent', name: 'Consistent Excellence', condition: 'Similar scores across all rounds', points: 25 },
      ],
      penalties: [
        { id: 'bombed_round', name: 'Weak Link', trigger: 'Failed one round significantly', points: -40 },
        { id: 'fatigue', name: 'Ran Out of Steam', trigger: 'Performance declined significantly', points: -25 },
      ],
      passingScore: 80,
    },
    feedback: {
      weak: "Started strong but faded. Inconsistent performance across rounds. Showed fatigue in the final round.",
      strong: "Maintained consistent performance. Showed depth in technical, breadth in design, and maturity in behavioral. Connected themes across rounds.",
      legend: "Each round built on the previous one. Referenced earlier discussions naturally. Showed genuine curiosity about the company. Left each interviewer excited to work with you. Made the complex simple. Demonstrated true mastery.",
      commonMistakes: ['Not managing energy', 'Not connecting themes between rounds'],
      proTips: ['Treat each round as fresh but reference earlier insights', 'Ask about your interviewers - they want to hire humans'],
    },
    rewards: {
      baseXP: 5000,
      skillPoints: { algorithms: 50, systems: 50, soft_skills: 50, leadership: 50 },
      possibleCards: ['interview_god_mode'],
      possibleModels: ['complete_engineer'],
      unlocks: ['mentor_mode'],
    },
    tags: ['multi_phase', 'boss', 'final', 'legendary'],
    prerequisites: ['w4_l30'],
  },
];

// ============================================================================
// CHALLENGE REGISTRY
// ============================================================================

export const ALL_CHALLENGES: Challenge[] = [
  ...WORLD_1_CHALLENGES,
  ...WORLD_1_BOSSES,
  ...WORLD_2_CHALLENGES,
  ...WORLD_2_BOSSES,
  ...WORLD_3_CHALLENGES,
  ...WORLD_4_CHALLENGES,
];

export function getChallengeById(id: string): Challenge | undefined {
  return ALL_CHALLENGES.find(c => c.id === id);
}

export function getChallengesByWorld(worldId: WorldId): Challenge[] {
  return ALL_CHALLENGES.filter(c => c.world === worldId);
}

export function getBossChallenges(worldId: WorldId): Challenge[] {
  return ALL_CHALLENGES.filter(c => c.world === worldId && c.level === 'boss');
}

export function getNextChallenge(currentId: string): Challenge | undefined {
  const current = getChallengeById(currentId);
  if (!current) return undefined;

  const unlocks = current.rewards.unlocks;
  if (unlocks.length === 0) return undefined;

  return getChallengeById(unlocks[0]);
}
