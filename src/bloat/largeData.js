/**
 * Generate large data structures to bloat bundle
 */

// Generate a large array of random words
const generateWords = (count) => {
  const words = [];
  const chars = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < count; i++) {
    let word = "";
    const len = Math.floor(Math.random() * 10) + 3;
    for (let j = 0; j < len; j++) {
      word += chars[Math.floor(Math.random() * chars.length)];
    }
    words.push(word);
  }
  return words;
};

// Large word list (will be inlined in bundle)
export const LARGE_WORD_LIST = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  "Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam.",
  "Quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
];

// Repeat the text many times to increase size
const repeatText = (arr, times) => {
  let result = [];
  for (let i = 0; i < times; i++) {
    result = result.concat(arr.map((s, idx) => `${s} [Copy ${i + 1}-${idx}]`));
  }
  return result;
};

export const MASSIVE_TEXT_DATA = repeatText(LARGE_WORD_LIST, 5000);

// Large configuration objects
export const HUGE_CONFIG = {
  settings: Array.from({ length: 1000 }, (_, i) => ({
    id: `setting-${i}`,
    name: `Configuration Setting Number ${i}`,
    description: `This is a detailed description for setting number ${i}. It contains various configuration options and parameters.`,
    value: Math.random() * 1000,
    enabled: Math.random() > 0.5,
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      author: `Author ${i}`,
      tags: Array.from({ length: 10 }, (_, j) => `tag-${i}-${j}`),
    },
  })),
};

// Large mock user database
export const MOCK_USERS = Array.from({ length: 5000 }, (_, i) => ({
  id: `user-${i}`,
  username: `user_${i}_${Math.random().toString(36).substring(7)}`,
  email: `user${i}@example.com`,
  firstName: `FirstName${i}`,
  lastName: `LastName${i}`,
  age: Math.floor(Math.random() * 50) + 18,
  address: {
    street: `${Math.floor(Math.random() * 9999)} Main Street`,
    city: `City${i % 100}`,
    state: `State${i % 50}`,
    zipCode: `${10000 + i}`,
    country: "United States",
  },
  preferences: {
    theme: Math.random() > 0.5 ? "dark" : "light",
    notifications: Math.random() > 0.5,
    language: ["en", "es", "fr", "de", "ja", "zh"][i % 6],
  },
  history: Array.from({ length: 50 }, (_, j) => ({
    action: `action-${j}`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    details: `User ${i} performed action ${j} with some detailed information about what happened.`,
  })),
}));

// Large product catalog
export const PRODUCT_CATALOG = Array.from({ length: 3000 }, (_, i) => ({
  id: `product-${i}`,
  name: `Amazing Product ${i} - Premium Edition`,
  description: `This is product number ${i}. It features exceptional quality and comes with a variety of options. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  price: Math.round(Math.random() * 10000) / 100,
  category: ["Electronics", "Clothing", "Books", "Home", "Sports", "Toys"][i % 6],
  tags: Array.from({ length: 15 }, (_, j) => `tag-${i}-${j}`),
  images: Array.from({ length: 5 }, (_, j) => `https://example.com/images/product-${i}-${j}.jpg`),
  reviews: Array.from({ length: 20 }, (_, j) => ({
    author: `Reviewer${j}`,
    rating: Math.floor(Math.random() * 5) + 1,
    comment: `This is review ${j} for product ${i}. Great product! Would recommend to anyone looking for quality.`,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  })),
  specifications: Object.fromEntries(
    Array.from({ length: 20 }, (_, j) => [`spec${j}`, `Value for specification ${j}`])
  ),
}));

export default {
  LARGE_WORD_LIST,
  MASSIVE_TEXT_DATA,
  HUGE_CONFIG,
  MOCK_USERS,
  PRODUCT_CATALOG,
};

