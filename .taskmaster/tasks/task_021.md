# Task ID: 21

**Title:** Implement Practice Mode for Completed Levels

**Status:** pending

**Dependencies:** 17, 18

**Priority:** low

**Description:** Add a practice mode that generates variations of completed levels for additional practice without affecting progress.

**Details:**

1. Add practice variations to level data:
```javascript
{
  id: 1,
  // ... existing fields
  practiceVariations: [
    { task: 'Log "Goodbye World" instead', expectedOutput: 'Goodbye World' },
    { task: 'Log your name', expectedOutput: null, aiOnly: true }
  ]
}
```

2. Add state for practice mode:
```javascript
const [isPracticeMode, setIsPracticeMode] = useState(false);
const [currentVariation, setCurrentVariation] = useState(0);
```

3. Add 'Practice' button to completed levels (only shows when level is complete)

4. Create practice mode UI:
- Different header color (purple theme instead of blue)
- Shows variation number (e.g., 'Practice 1 of 3')
- 'Next Variation' button
- 'Exit Practice' button
- Streak does NOT increment in practice mode

5. Add translations for practice mode UI elements

6. Practice mode validation:
- If expectedOutput provided, use normal comparison
- If aiOnly: true, only use AI validation
- Show encouraging feedback regardless of streak impact

**Test Strategy:**

1. Complete Level 1, verify Practice button appears
2. Enter practice mode, verify UI changes to purple theme
3. Complete practice variation, verify streak unchanged
4. Test navigation between variations
5. Exit practice mode, verify returns to normal level view
6. Verify practice not available for incomplete levels
