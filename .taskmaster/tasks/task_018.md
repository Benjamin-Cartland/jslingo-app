# Task ID: 18

**Title:** Implement Achievement Badge System

**Status:** pending

**Dependencies:** 17

**Priority:** low

**Description:** Create an achievement system that awards badges for milestones like completing first level, achieving 5-streak, and finishing all levels.

**Details:**

1. Define achievements data structure:
```javascript
const ACHIEVEMENTS = [
  { id: 'first_step', icon: 'Star', condition: (state) => state.completedLevels.size >= 1 },
  { id: 'streak_5', icon: 'Flame', condition: (state) => state.maxStreak >= 5 },
  { id: 'streak_10', icon: 'Zap', condition: (state) => state.maxStreak >= 10 },
  { id: 'halfway', icon: 'Award', condition: (state) => state.completedLevels.size >= 8 },
  { id: 'completionist', icon: 'Trophy', condition: (state) => state.completedLevels.size >= 15 },
  { id: 'beginner_master', icon: 'GraduationCap', condition: (state) => [1,2,3,4,5].every(id => state.completedLevels.has(id)) }
];
```

2. Add translations for each achievement title and description

3. Add state for tracking:
```javascript
const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
const [maxStreak, setMaxStreak] = useState(0);
const [showAchievementModal, setShowAchievementModal] = useState(null);
```

4. Create useEffect to check achievements after state changes and show notification modal when new achievement unlocked

5. Add achievements display section in header showing unlocked badges with lucide-react icons

6. Update localStorage schema to persist unlockedAchievements and maxStreak

7. Create achievement notification modal with celebratory styling

**Test Strategy:**

1. Complete first level - verify 'first_step' achievement unlocks
2. Get 5 correct answers in a row - verify 'streak_5' unlocks
3. Complete all levels - verify 'completionist' unlocks
4. Refresh browser - verify achievements persist
5. Test achievement modal displays correctly
6. Verify duplicate achievements don't re-trigger notifications
