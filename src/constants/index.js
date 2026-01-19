export const PARAGRAPHS = {
  EASY: "The cat sat on the mat. The dog ran in the park. Birds fly in the sky. Fish swim in the sea. The sun is bright today.",
  MEDIUM: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  HARD: "A quick brown lazy fox has jumped over ten hens and catched the eleventh duck then it ran in to the forest where lion lives and discussed with lion about the event that is going to happen over the next 3 days in the jungle.",
  EXPERT: "Sphinx of black quartz, judge my vow. The five boxing wizards jump quickly while juggling flaming torches. Cwm fjord bank glyphs vext quiz. Jackdaws love my big sphinx of quartz and complex spectrograms."
};

export const DIFFICULTY_LEVELS = {
  EASY: { name: "Easy", time: 45, color: "#10b981", description: "Perfect for beginners" },
  MEDIUM: { name: "Medium", time: 60, color: "#f59e0b", description: "Standard challenge" },
  HARD: { name: "Hard", time: 75, color: "#ef4444", description: "For experienced typists" },
  EXPERT: { name: "Expert", time: 90, color: "#8b5cf6", description: "Ultimate challenge" }
};

export const TYPED_STATUS = {
  UN_TYPED: "UN_TYPED",
  TYPED: "TYPED",
};

export const GAME_STATUS = {
  RUNNING: "RUNNING",
  INITIAL: "INITIAL",
  FINISHED: "FINISHED",
};

export const STATUS = {
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT",
};

// Game Modes
export const GAME_MODES = {
  CLASSIC: {
    id: 'CLASSIC',
    name: 'Classic',
    description: 'Race against time with difficulty-based paragraphs',
    icon: '🏁',
    hasTimer: true,
    hasDifficulty: true
  },
  ZEN: {
    id: 'ZEN',
    name: 'Zen Mode',
    description: 'Practice without time pressure',
    icon: '🧘',
    hasTimer: false,
    hasDifficulty: true
  },
  RUSH: {
    id: 'RUSH',
    name: 'Rush',
    description: 'Speed challenge - 30 seconds only!',
    icon: '⚡',
    hasTimer: true,
    hasDifficulty: false,
    fixedTime: 30
  },
  MARATHON: {
    id: 'MARATHON',
    name: 'Marathon',
    description: 'Long-form typing endurance test',
    icon: '🏃',
    hasTimer: true,
    hasDifficulty: false,
    fixedTime: 180
  },
  QUOTE: {
    id: 'QUOTE',
    name: 'Quote Mode',
    description: 'Type famous quotes and sayings',
    icon: '💬',
    hasTimer: false,
    hasDifficulty: false
  },
  CODE: {
    id: 'CODE',
    name: 'Code Mode',
    description: 'Practice typing code snippets',
    icon: '💻',
    hasTimer: false,
    hasDifficulty: false
  },
  CUSTOM: {
    id: 'CUSTOM',
    name: 'Custom',
    description: 'Type your own text',
    icon: '✏️',
    hasTimer: false,
    hasDifficulty: false
  }
};

// Quotes for Quote Mode
export const QUOTES = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Stay hungry, stay foolish. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "In the middle of difficulty lies opportunity. - Albert Einstein",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt"
];

// Code snippets for Code Mode
export const CODE_SNIPPETS = [
  "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
  "const quickSort = (arr) => {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = arr.slice(1).filter(x => x < pivot);\n  const right = arr.slice(1).filter(x => x >= pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n};",
  "class BinaryTree {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}",
  "const debounce = (func, delay) => {\n  let timeoutId;\n  return (...args) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func(...args), delay);\n  };\n};",
  "async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
  "const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n};",
  "function* range(start, end, step = 1) {\n  for (let i = start; i < end; i += step) {\n    yield i;\n  }\n}",
  "const deepClone = (obj) => {\n  if (obj === null || typeof obj !== 'object') return obj;\n  const clone = Array.isArray(obj) ? [] : {};\n  for (let key in obj) {\n    clone[key] = deepClone(obj[key]);\n  }\n  return clone;\n};"
];

// Marathon texts
export const MARATHON_TEXTS = [
  "In the realm of software development, understanding fundamental concepts is crucial for building robust applications. Programming paradigms such as object-oriented programming, functional programming, and procedural programming each offer unique approaches to solving problems. Object-oriented programming emphasizes encapsulation, inheritance, and polymorphism, allowing developers to create modular and reusable code. Functional programming, on the other hand, treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. This paradigm has gained popularity due to its ability to handle concurrent operations more effectively. Meanwhile, procedural programming focuses on a sequence of computational steps to be carried out, making it straightforward and easy to understand for beginners. As technology evolves, developers must adapt to new tools, frameworks, and methodologies while maintaining a solid grasp of these foundational principles. The modern software landscape demands versatility, continuous learning, and the ability to choose the right tool for the job.",
  "The history of computing is a fascinating journey through human innovation and ingenuity. From the earliest mechanical calculators to today's quantum computers, each advancement has built upon the discoveries of previous generations. Charles Babbage's Analytical Engine, though never completed, laid the groundwork for modern computing concepts. Ada Lovelace, often considered the first computer programmer, recognized that machines could go beyond pure calculation. The invention of the transistor revolutionized electronics, making computers smaller, faster, and more reliable. The development of integrated circuits further accelerated this miniaturization, leading to the microprocessor revolution. Personal computers brought computing power to individuals, democratizing access to technology. The internet connected these computers globally, creating an unprecedented network for information sharing and communication. Today, we stand on the threshold of new frontiers in artificial intelligence, quantum computing, and biotechnology, each promising to reshape our world in profound ways."
];

// Achievements
export const ACHIEVEMENTS = [
  { id: 'first_race', name: 'First Steps', description: 'Complete your first race', icon: '🎯', requirement: { type: 'races', value: 1 } },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Reach 60 WPM', icon: '⚡', requirement: { type: 'wpm', value: 60 } },
  { id: 'lightning_fast', name: 'Lightning Fast', description: 'Reach 80 WPM', icon: '🚀', requirement: { type: 'wpm', value: 80 } },
  { id: 'typing_master', name: 'Typing Master', description: 'Reach 100 WPM', icon: '👑', requirement: { type: 'wpm', value: 100 } },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Achieve 100% accuracy', icon: '💯', requirement: { type: 'accuracy', value: 100 } },
  { id: 'consistent', name: 'Consistent', description: 'Complete 10 races', icon: '🎖️', requirement: { type: 'races', value: 10 } },
  { id: 'dedicated', name: 'Dedicated', description: 'Complete 50 races', icon: '🏆', requirement: { type: 'races', value: 50 } },
  { id: 'marathon_runner', name: 'Marathon Runner', description: 'Complete a marathon mode', icon: '🏃', requirement: { type: 'mode', value: 'MARATHON' } },
  { id: 'code_ninja', name: 'Code Ninja', description: 'Complete 5 code mode races', icon: '💻', requirement: { type: 'code_races', value: 5 } },
  { id: 'combo_master', name: 'Combo Master', description: 'Achieve a 50 character streak', icon: '🔥', requirement: { type: 'streak', value: 50 } },
  { id: 'zen_master', name: 'Zen Master', description: 'Complete 10 zen mode races', icon: '🧘', requirement: { type: 'zen_races', value: 10 } },
  { id: 'speed_record', name: 'Speed Record', description: 'Reach 120 WPM', icon: '🌟', requirement: { type: 'wpm', value: 120 } },
  { id: 'accuracy_expert', name: 'Accuracy Expert', description: 'Maintain 95%+ accuracy for 10 races', icon: '🎯', requirement: { type: 'accuracy_streak', value: 10 } },
  { id: 'early_bird', name: 'Early Bird', description: 'Complete a race before 8 AM', icon: '🌅', requirement: { type: 'special', value: 'early_bird' } },
  { id: 'night_owl', name: 'Night Owl', description: 'Complete a race after 10 PM', icon: '🦉', requirement: { type: 'special', value: 'night_owl' } }
];

// Themes
export const THEMES = {
  DEFAULT: {
    id: 'DEFAULT',
    name: 'Default Purple',
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b'
  },
  OCEAN: {
    id: 'OCEAN',
    name: 'Ocean Blue',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    success: '#14b8a6',
    error: '#f43f5e',
    warning: '#f97316'
  },
  FOREST: {
    id: 'FOREST',
    name: 'Forest Green',
    primary: '#22c55e',
    secondary: '#16a34a',
    success: '#84cc16',
    error: '#dc2626',
    warning: '#eab308'
  },
  SUNSET: {
    id: 'SUNSET',
    name: 'Sunset Orange',
    primary: '#f97316',
    secondary: '#ea580c',
    success: '#10b981',
    error: '#dc2626',
    warning: '#fbbf24'
  },
  CYBERPUNK: {
    id: 'CYBERPUNK',
    name: 'Cyberpunk Pink',
    primary: '#ec4899',
    secondary: '#8b5cf6',
    success: '#06b6d4',
    error: '#f43f5e',
    warning: '#fbbf24'
  },
  MONOCHROME: {
    id: 'MONOCHROME',
    name: 'Monochrome',
    primary: '#6b7280',
    secondary: '#4b5563',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b'
  }
};
