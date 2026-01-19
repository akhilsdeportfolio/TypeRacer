# 🏆 TypeRacer - World-Class Typing Speed Game

A production-ready, feature-rich typing speed test application built with React, following Atomic Design principles and modern best practices.

![TypeRacer](https://img.shields.io/badge/TypeRacer-World%20Class-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-16.x-61DAFB?style=for-the-badge&logo=react)
![Webpack](https://img.shields.io/badge/Webpack-4.x-8DD6F9?style=for-the-badge&logo=webpack)

---

## ✨ Features

### 🎮 **7 Game Modes**
- **Classic** - Traditional timed typing with difficulty levels
- **Zen** - Relaxed practice without time pressure
- **Rush** - Fast-paced 30-second challenges
- **Marathon** - 3-minute endurance tests
- **Quote** - Type inspirational quotes
- **Code** - Practice typing JavaScript code
- **Custom** - Use your own text

### 🏅 **Achievement System**
- 15 unique achievements to unlock
- Progress tracking across races
- Real-time notifications
- Persistent achievement storage

### 📊 **Real-Time Analytics**
- Live WPM graph with canvas rendering
- Accuracy tracking
- Character count
- Progress visualization
- Performance history

### 🏆 **Leaderboard**
- Top 10 scores
- Medal system (🥇🥈🥉)
- Detailed statistics
- Persistent localStorage

### 🎨 **Themes & Customization**
- Dark/Light mode toggle
- 6 color themes ready
- Smooth transitions
- Responsive design

### 🔊 **Enhanced UX**
- Sound effects (toggle with Ctrl+M)
- Confetti celebrations
- Keyboard shortcuts
- Error boundaries
- Achievement notifications

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v12 or higher)
- Yarn Berry

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd e3e30a06-0efc-4060-938e-4a7401cc8398

# Install dependencies
yarn install

# Start development server
yarn start
```

The application will open at `http://localhost:8080/`

### Build for Production

```bash
# Create production build
yarn build
```

---

## 🏗️ Architecture

### Atomic Design Pattern

```
src/
├── components/
│   ├── atoms/           # Basic building blocks
│   ├── molecules/       # Composite components
│   ├── organisms/       # Complex components
│   └── TypeRacerRefactored.js
├── hooks/               # Custom React hooks
├── constants/           # Game data & configuration
└── utils/               # Helper functions
```

### Custom Hooks
- `useGameState` - Game state management
- `useTimer` - Countdown timer logic
- `useSound` - Sound effects
- `useLocalStorage` - Persistent state
- `useKeyboardShortcuts` - Keyboard shortcuts
- `useAchievements` - Achievement tracking
- `useWPMTracking` - Real-time WPM monitoring

---

## ⌨️ Keyboard Shortcuts

- **Ctrl+D** - Toggle dark mode
- **Ctrl+M** - Toggle sound
- **Ctrl+R** - Restart game

---

## 📦 Tech Stack

- **React 16.x** - UI library
- **Webpack 4** - Module bundler
- **Babel** - JavaScript compiler
- **PropTypes** - Runtime type checking
- **Canvas API** - Real-time graph rendering
- **LocalStorage** - Data persistence

---

## 📖 Documentation

See [WORLD_CLASS_FEATURES.md](./WORLD_CLASS_FEATURES.md) for complete feature documentation.

---

## 🎯 Performance

- ✅ React.memo for optimized re-renders
- ✅ useCallback for memoized handlers
- ✅ useMemo for cached computations
- ✅ Canvas rendering for smooth 60fps graphs
- ✅ Efficient state management

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 Acknowledgments

Built with ❤️ using modern React best practices and Atomic Design principles.


