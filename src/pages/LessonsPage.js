/**
 * LessonsPage - Typing lessons and tutorials
 */

import React, { useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './GamePage.css';

const LESSONS = [
  {
    id: 'home-row',
    title: 'Home Row Keys',
    icon: '🏠',
    description: 'Learn the foundation: ASDF JKL;',
    keys: 'asdf jkl;',
    exercises: ['asdf', 'jkl;', 'asdf jkl;', 'fjdk', 'slaf', 'ask dad', 'sad lad', 'fall flask'],
  },
  {
    id: 'top-row',
    title: 'Top Row Keys',
    icon: '⬆️',
    description: 'Master QWERTY UIOP',
    keys: 'qwerty uiop',
    exercises: ['qwer', 'tyui', 'op', 'quit', 'were', 'type', 'port', 'poetry'],
  },
  {
    id: 'bottom-row',
    title: 'Bottom Row Keys',
    icon: '⬇️',
    description: 'Complete with ZXCV BNM',
    keys: 'zxcv bnm',
    exercises: ['zxcv', 'bnm', 'zoom', 'box', 'van', 'can', 'man', 'banana'],
  },
  {
    id: 'numbers',
    title: 'Number Row',
    icon: '🔢',
    description: 'Type numbers 1-9 and 0',
    keys: '1234567890',
    exercises: ['123', '456', '789', '1234567890', '2024', '99', '100', '500'],
  },
  {
    id: 'punctuation',
    title: 'Punctuation',
    icon: '❗',
    description: 'Common punctuation marks',
    keys: '.,!?\'"-',
    exercises: ['hello.', 'hi!', 'why?', '"quote"', "it's", 'hello, world!'],
  },
  {
    id: 'sentences',
    title: 'Full Sentences',
    icon: '📝',
    description: 'Put it all together',
    keys: 'all',
    exercises: [
      'The quick brown fox.',
      'Pack my box with jugs.',
      'How are you today?',
      'Type fast, think faster!',
    ],
  },
];

const LessonsPage = () => {
  const { lessonId } = useParams();
  const { darkMode } = useSettings();
  const [progress, setProgress] = useLocalStorage('typeracer-lessons', {});
  const inputRef = useRef(null);
  
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const lesson = lessonId ? LESSONS.find(l => l.id === lessonId) : null;

  const handleInput = useCallback((e) => {
    const value = e.target.value;
    setUserInput(value);
    
    if (lesson && value === lesson.exercises[currentExercise]) {
      // Completed exercise
      if (currentExercise < lesson.exercises.length - 1) {
        setCurrentExercise(c => c + 1);
        setUserInput('');
      } else {
        // Completed lesson
        setProgress(prev => ({
          ...prev,
          [lesson.id]: { completed: true, date: new Date().toISOString() }
        }));
        setIsStarted(false);
      }
    }
  }, [lesson, currentExercise, setProgress]);

  const startLesson = useCallback(() => {
    setCurrentExercise(0);
    setUserInput('');
    setIsStarted(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Lesson list view
  if (!lesson) {
    return (
      <div className={`game-page ${darkMode ? 'dark' : ''}`}>
        <div className="game-page__header">
          <h1>📚 Typing Lessons</h1>
          <p>Master your typing skills step by step</p>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {LESSONS.map((l, idx) => (
            <Link 
              key={l.id} 
              to={`/lessons/${l.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.2s, background 0.2s',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>{l.icon}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.25rem' }}>
                  Lesson {idx + 1}: {l.title}
                </h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{l.description}</p>
              </div>
              {progress[l.id]?.completed && (
                <span style={{ fontSize: '1.5rem' }}>✅</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Individual lesson view
  const exerciseText = lesson.exercises[currentExercise];
  const lessonProgress = Math.round((currentExercise / lesson.exercises.length) * 100);

  return (
    <div className={`game-page ${darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <Link to="/lessons" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
          ← Back to Lessons
        </Link>
        <h1>{lesson.icon} {lesson.title}</h1>
        <p>{lesson.description}</p>
      </div>

      {!isStarted ? (
        <div className="game-page__setup">
          <h2>Keys to Practice</h2>
          <div style={{ fontSize: '2rem', letterSpacing: '0.5em', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
            {lesson.keys.toUpperCase()}
          </div>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
            {lesson.exercises.length} exercises to complete
          </p>
          <button className="game-page__start-btn" onClick={startLesson}>
            Start Lesson 📖
          </button>
        </div>
      ) : (
        <div className="game-page__playing">
          <div className="game-page__stats-bar">
            <div className="game-page__stat">📝 {currentExercise + 1}/{lesson.exercises.length}</div>
            <div className="game-page__stat">📊 {lessonProgress}%</div>
          </div>

          {/* Progress bar */}
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '2rem' }}>
            <div style={{ width: `${lessonProgress}%`, height: '100%', background: '#10b981', borderRadius: '4px', transition: 'width 0.3s' }} />
          </div>

          <div className="game-page__word-display">
            <div style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
              {exerciseText.split('').map((char, i) => (
                <span key={i} style={{
                  color: i < userInput.length
                    ? (userInput[i] === char ? '#10b981' : '#ef4444')
                    : 'rgba(255,255,255,0.5)',
                }}>{char}</span>
              ))}
            </div>
          </div>

          <input ref={inputRef} type="text" value={userInput} onChange={handleInput}
            className="game-page__input" placeholder="Type here..." autoFocus />
        </div>
      )}

      {progress[lesson.id]?.completed && !isStarted && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: '#10b981', fontSize: '1.2rem' }}>✅ Lesson Completed!</p>
          <button className="game-page__start-btn" onClick={startLesson} style={{ marginTop: '1rem' }}>
            Practice Again 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;

