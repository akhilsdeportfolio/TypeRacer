/**
 * Word Lists for Typing Games
 * 
 * Categorized word lists for different game modes and difficulties
 */

export const COMMON_WORDS = {
  short: [
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
    'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his',
    'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who',
  ],
  medium: [
    'about', 'after', 'again', 'being', 'could', 'every', 'first', 'found',
    'great', 'house', 'large', 'learn', 'never', 'other', 'place', 'point',
    'right', 'small', 'sound', 'still', 'study', 'their', 'there', 'these',
    'think', 'three', 'water', 'where', 'which', 'world', 'would', 'write',
  ],
  long: [
    'another', 'because', 'between', 'country', 'different', 'example',
    'following', 'government', 'important', 'information', 'interesting',
    'knowledge', 'national', 'necessary', 'paragraph', 'particular',
    'performance', 'population', 'president', 'probably', 'production',
    'professional', 'question', 'remember', 'something', 'understand',
  ],
};

export const PROGRAMMING_WORDS = [
  'function', 'variable', 'constant', 'array', 'object', 'string', 'number',
  'boolean', 'interface', 'component', 'module', 'import', 'export', 'class',
  'method', 'property', 'callback', 'promise', 'async', 'await', 'return',
  'const', 'let', 'var', 'if', 'else', 'switch', 'case', 'default', 'for',
  'while', 'do', 'break', 'continue', 'try', 'catch', 'finally', 'throw',
];

export const PANGRAMS = [
  'The quick brown fox jumps over the lazy dog.',
  'Pack my box with five dozen liquor jugs.',
  'How vexingly quick daft zebras jump!',
  'Sphinx of black quartz, judge my vow.',
  'Two driven jocks help fax my big quiz.',
  'The five boxing wizards jump quickly.',
  'Jackdaws love my big sphinx of quartz.',
  'Crazy Frederick bought many very exquisite opal jewels.',
];

export const QUOTES = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
  { text: 'Life is what happens when you are busy making other plans.', author: 'John Lennon' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle' },
  { text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', author: 'Nelson Mandela' },
  { text: 'In the end, it is not the years in your life that count. It is the life in your years.', author: 'Abraham Lincoln' },
];

export const CODE_SNIPPETS = [
  'function add(a, b) { return a + b; }',
  'const greeting = "Hello, World!";',
  'for (let i = 0; i < 10; i++) { }',
  'if (condition) { doSomething(); }',
  'const arr = [1, 2, 3].map(x => x * 2);',
  'async function fetchData() { }',
  'import React from "react";',
  'export default Component;',
];

export const TOPICS = {
  technology: [
    'The internet connects billions of people worldwide.',
    'Artificial intelligence is transforming every industry.',
    'Cloud computing enables global data storage.',
    'Mobile devices have changed how we communicate.',
  ],
  nature: [
    'Mountains rise majestically above the clouds.',
    'Rivers flow endlessly toward the ocean.',
    'Forests provide oxygen for all living creatures.',
    'Stars illuminate the night sky beautifully.',
  ],
  science: [
    'Gravity keeps planets in orbit around stars.',
    'Atoms are the building blocks of matter.',
    'Evolution explains the diversity of life.',
    'Energy cannot be created or destroyed.',
  ],
};

/**
 * Get random words from a list
 */
export const getRandomWords = (list, count = 10) => {
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Get a random quote
 */
export const getRandomQuote = () => {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
};

/**
 * Get random pangram
 */
export const getRandomPangram = () => {
  return PANGRAMS[Math.floor(Math.random() * PANGRAMS.length)];
};

/**
 * Get words by difficulty
 */
export const getWordsByDifficulty = (difficulty, count = 10) => {
  const list = COMMON_WORDS[difficulty] || COMMON_WORDS.medium;
  return getRandomWords(list, count);
};

export default {
  COMMON_WORDS,
  PROGRAMMING_WORDS,
  PANGRAMS,
  QUOTES,
  CODE_SNIPPETS,
  TOPICS,
  getRandomWords,
  getRandomQuote,
  getRandomPangram,
  getWordsByDifficulty,
};

