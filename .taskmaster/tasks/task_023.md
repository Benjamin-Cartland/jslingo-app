# Task ID: 23

**Title:** Create XP/Points System

**Status:** pending

**Dependencies:** 17, 18

**Priority:** low

**Description:** Implement an experience points system that awards points for completing levels based on difficulty and tracks total XP.

**Details:**

1. Define XP values by difficulty:
```javascript
const XP_VALUES = {
  beginner: 10,
  easy: 20,
  intermediate: 30,
  advanced: 50
};
```

2. Add XP state and persistence:
```javascript
const [totalXP, setTotalXP] = useState(0);
const [levelXPAwarded, setLevelXPAwarded] = useState(new Set());
```

3. Award XP on level completion (only first time):
```javascript
const awardXP = (levelId) => {
  if (levelXPAwarded.has(levelId)) return;
  const level = levels.find(l => l.id === levelId);
  const xp = XP_VALUES[level.difficulty];
  setTotalXP(prev => prev + xp);
  setLevelXPAwarded(new Set([...levelXPAwarded, levelId]));
};
```

4. Display XP in header:
```javascript
<div className="flex items-center gap-2 text-yellow-500">
  <Star className="w-5 h-5" />
  <span className="font-bold">{totalXP} XP</span>
</div>
```

5. Show XP gained animation on level complete:
- '+10 XP' floating text that fades up
- Brief celebration effect

6. Add XP-based achievements to achievement system:
- 'First Points' (10 XP)
- 'Century' (100 XP)
- 'XP Master' (500 XP)

7. Update localStorage schema

**Test Strategy:**

1. Complete beginner level, verify +10 XP awarded
2. Complete intermediate level, verify +30 XP awarded
3. Repeat same level, verify no duplicate XP
4. Refresh browser, verify XP persists
5. Test XP animation displays correctly
6. Verify XP-based achievements unlock at thresholds
