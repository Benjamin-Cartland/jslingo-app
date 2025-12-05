# Task ID: 17

**Title:** Add Difficulty Ratings to Existing Levels

**Status:** pending

**Dependencies:** 16 ✓

**Priority:** low

**Description:** Extend the level data model to include difficulty ratings and display them in the UI for all 15 existing levels.

**Details:**

1. Add a 'difficulty' property to each level object in the levels array with values: 'beginner' (levels 1-5), 'easy' (levels 6-10), 'intermediate' (levels 11-15)

2. Update the level data structure:
```javascript
{
  id: 1,
  title: 'Hello World',
  difficulty: 'beginner', // NEW FIELD
  // ... existing fields
}
```

3. Create difficulty badge component inline:
```javascript
const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    easy: 'bg-blue-100 text-blue-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty]}`}>
      {t(`difficulty.${difficulty}`)}
    </span>
  );
};
```

4. Add translations for difficulty labels to TRANSLATIONS object:
```javascript
'difficulty.beginner': 'Beginner',
'difficulty.easy': 'Easy',
'difficulty.intermediate': 'Intermediate',
'difficulty.advanced': 'Advanced'
```

5. Display badge in level header and level selector modal cards

**Test Strategy:**

1. Verify all 15 levels have difficulty property set
2. Check badge renders with correct color for each difficulty tier
3. Test translations work correctly
4. Verify badge displays in both main view and level selector modal
5. Test responsive layout with badge doesn't break on mobile
