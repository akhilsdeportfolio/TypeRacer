/**
 * Application Router Configuration
 * 
 * Centralized routing for the typing games platform
 */

import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ComponentLoader } from '../components/LazyComponents';

// Lazy load all pages for code splitting
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const HomePage = lazy(() => import('../pages/HomePage'));
const TypeRacerPage = lazy(() => import('../pages/TypeRacerPage'));
const WordScramblePage = lazy(() => import('../pages/WordScramblePage'));
const MemoryTypingPage = lazy(() => import('../pages/MemoryTypingPage'));
const SpeedChallengePage = lazy(() => import('../pages/SpeedChallengePage'));
const BotRacePage = lazy(() => import('../pages/BotRacePage'));
const DailyChallengePage = lazy(() => import('../pages/DailyChallengePage'));
const CodeTypingPage = lazy(() => import('../pages/CodeTypingPage'));
const ZenModePage = lazy(() => import('../pages/ZenModePage'));
const QuoteTypingPage = lazy(() => import('../pages/QuoteTypingPage'));
const MultiplayerPage = lazy(() => import('../pages/MultiplayerPage'));
const CustomPracticePage = lazy(() => import('../pages/CustomPracticePage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const LessonsPage = lazy(() => import('../pages/LessonsPage'));
const StatsPage = lazy(() => import('../pages/StatsPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));

// Page wrapper with suspense
const PageWrapper = ({ children }) => (
  <Suspense fallback={<ComponentLoader name="Page" size="large" />}>
    {children}
  </Suspense>
);

// Route configuration
export const routes = [
  {
    path: '/',
    element: <PageWrapper><MainLayout /></PageWrapper>,
    children: [
      { index: true, element: <PageWrapper><HomePage /></PageWrapper> },
      { path: 'typeracer', element: <PageWrapper><TypeRacerPage /></PageWrapper> },
      { path: 'word-scramble', element: <PageWrapper><WordScramblePage /></PageWrapper> },
      { path: 'memory-typing', element: <PageWrapper><MemoryTypingPage /></PageWrapper> },
      { path: 'speed-challenge', element: <PageWrapper><SpeedChallengePage /></PageWrapper> },
      { path: 'bot-race', element: <PageWrapper><BotRacePage /></PageWrapper> },
      { path: 'daily-challenge', element: <PageWrapper><DailyChallengePage /></PageWrapper> },
      { path: 'code-typing', element: <PageWrapper><CodeTypingPage /></PageWrapper> },
      { path: 'zen-mode', element: <PageWrapper><ZenModePage /></PageWrapper> },
      { path: 'quote-typing', element: <PageWrapper><QuoteTypingPage /></PageWrapper> },
      { path: 'multiplayer', element: <PageWrapper><MultiplayerPage /></PageWrapper> },
      { path: 'custom-practice', element: <PageWrapper><CustomPracticePage /></PageWrapper> },
      { path: 'lessons', element: <PageWrapper><LessonsPage /></PageWrapper> },
      { path: 'lessons/:lessonId', element: <PageWrapper><LessonsPage /></PageWrapper> },
      { path: 'profile', element: <PageWrapper><ProfilePage /></PageWrapper> },
      { path: 'stats', element: <PageWrapper><StatsPage /></PageWrapper> },
      { path: 'settings', element: <PageWrapper><SettingsPage /></PageWrapper> },
      { path: 'achievements', element: <PageWrapper><AchievementsPage /></PageWrapper> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

// Game metadata for navigation
export const GAMES = [
  {
    id: 'typeracer',
    name: 'Type Racer',
    path: '/typeracer',
    icon: '🏎️',
    description: 'Race against the clock typing paragraphs',
    color: '#667eea',
    difficulty: 'All Levels',
  },
  {
    id: 'word-scramble',
    name: 'Word Scramble',
    path: '/word-scramble',
    icon: '🔀',
    description: 'Unscramble words as fast as possible',
    color: '#f59e0b',
    difficulty: 'Easy-Medium',
  },
  {
    id: 'memory-typing',
    name: 'Memory Typing',
    path: '/memory-typing',
    icon: '🧠',
    description: 'See it, remember it, type it',
    color: '#8b5cf6',
    difficulty: 'Medium-Hard',
  },
  {
    id: 'speed-challenge',
    name: 'Speed Challenge',
    path: '/speed-challenge',
    icon: '⚡',
    description: 'Progressively faster typing',
    color: '#ef4444',
    difficulty: 'Hard',
  },
  {
    id: 'bot-race',
    name: 'Bot Race',
    path: '/bot-race',
    icon: '🤖',
    description: 'Race against AI opponents',
    color: '#10b981',
    difficulty: 'All Levels',
  },
  {
    id: 'daily-challenge',
    name: 'Daily Challenge',
    path: '/daily-challenge',
    icon: '📅',
    description: 'New challenge every day',
    color: '#ec4899',
    difficulty: 'Varies',
  },
  {
    id: 'code-typing',
    name: 'Code Typing',
    path: '/code-typing',
    icon: '💻',
    description: 'Practice typing code snippets',
    color: '#06b6d4',
    difficulty: 'Medium-Hard',
  },
  {
    id: 'zen-mode',
    name: 'Zen Mode',
    path: '/zen-mode',
    icon: '🧘',
    description: 'Relaxed typing with no pressure',
    color: '#84cc16',
    difficulty: 'Easy',
  },
  {
    id: 'quote-typing',
    name: 'Quote Typing',
    path: '/quote-typing',
    icon: '📜',
    description: 'Type famous quotes',
    color: '#f97316',
    difficulty: 'Medium',
  },
  {
    id: 'multiplayer',
    name: 'Multiplayer',
    path: '/multiplayer',
    icon: '🎮',
    description: 'Race against other players',
    color: '#a855f7',
    difficulty: 'All Levels',
  },
  {
    id: 'custom-practice',
    name: 'Custom Practice',
    path: '/custom-practice',
    icon: '✏️',
    description: 'Practice with your own text',
    color: '#64748b',
    difficulty: 'Custom',
  },
];

export const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/lessons', label: 'Lessons', icon: '📚' },
  { path: '/achievements', label: 'Achievements', icon: '🏆' },
  { path: '/stats', label: 'Statistics', icon: '📊' },
  { path: '/profile', label: 'Profile', icon: '👤' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

