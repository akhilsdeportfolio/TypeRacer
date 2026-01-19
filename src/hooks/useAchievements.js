import { useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS } from '../constants';
import { useLocalStorage } from './useLocalStorage';

/**
 * useAchievements - Hook for managing achievements
 */
export const useAchievements = (stats, gameMode) => {
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage('typeracer-achievements', []);
  const [newAchievement, setNewAchievement] = useState(null);
  const [totalRaces, setTotalRaces] = useLocalStorage('typeracer-total-races', 0);
  const [codeRaces, setCodeRaces] = useLocalStorage('typeracer-code-races', 0);
  const [zenRaces, setZenRaces] = useLocalStorage('typeracer-zen-races', 0);
  const [maxStreak, setMaxStreak] = useLocalStorage('typeracer-max-streak', 0);
  const [accuracyStreak, setAccuracyStreak] = useLocalStorage('typeracer-accuracy-streak', 0);

  const checkAchievements = useCallback((completedStats, mode, streak) => {
    const newUnlocked = [];

    ACHIEVEMENTS.forEach((achievement) => {
      // Skip if already unlocked
      if (unlockedAchievements.includes(achievement.id)) return;

      let shouldUnlock = false;

      switch (achievement.requirement.type) {
        case 'races':
          shouldUnlock = totalRaces >= achievement.requirement.value;
          break;
        case 'wpm':
          shouldUnlock = completedStats.wpm >= achievement.requirement.value;
          break;
        case 'accuracy':
          shouldUnlock = completedStats.accuracy >= achievement.requirement.value;
          break;
        case 'mode':
          shouldUnlock = mode === achievement.requirement.value;
          break;
        case 'code_races':
          shouldUnlock = codeRaces >= achievement.requirement.value;
          break;
        case 'zen_races':
          shouldUnlock = zenRaces >= achievement.requirement.value;
          break;
        case 'streak':
          shouldUnlock = streak >= achievement.requirement.value;
          break;
        case 'accuracy_streak':
          shouldUnlock = accuracyStreak >= achievement.requirement.value;
          break;
        case 'special':
          if (achievement.requirement.value === 'early_bird') {
            const hour = new Date().getHours();
            shouldUnlock = hour < 8;
          } else if (achievement.requirement.value === 'night_owl') {
            const hour = new Date().getHours();
            shouldUnlock = hour >= 22;
          }
          break;
        default:
          break;
      }

      if (shouldUnlock) {
        newUnlocked.push(achievement.id);
      }
    });

    if (newUnlocked.length > 0) {
      setUnlockedAchievements([...unlockedAchievements, ...newUnlocked]);
      // Show the first new achievement
      const firstAchievement = ACHIEVEMENTS.find(a => a.id === newUnlocked[0]);
      setNewAchievement(firstAchievement);
      
      // Clear after 5 seconds
      setTimeout(() => setNewAchievement(null), 5000);
    }
  }, [unlockedAchievements, totalRaces, codeRaces, zenRaces, accuracyStreak, setUnlockedAchievements]);

  const recordRace = useCallback((completedStats, mode, streak) => {
    // Update race counts
    setTotalRaces(prev => prev + 1);
    
    if (mode === 'CODE') {
      setCodeRaces(prev => prev + 1);
    } else if (mode === 'ZEN') {
      setZenRaces(prev => prev + 1);
    }

    // Update max streak
    if (streak > maxStreak) {
      setMaxStreak(streak);
    }

    // Update accuracy streak
    if (completedStats.accuracy >= 95) {
      setAccuracyStreak(prev => prev + 1);
    } else {
      setAccuracyStreak(0);
    }

    // Check for new achievements
    checkAchievements(completedStats, mode, Math.max(streak, maxStreak));
  }, [maxStreak, setMaxStreak, setAccuracyStreak, setTotalRaces, setCodeRaces, setZenRaces, checkAchievements]);

  return {
    unlockedAchievements,
    newAchievement,
    recordRace,
    totalRaces,
    clearNewAchievement: () => setNewAchievement(null)
  };
};

