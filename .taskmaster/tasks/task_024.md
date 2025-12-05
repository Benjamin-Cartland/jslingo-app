# Task ID: 24

**Title:** Implement Progress Export/Import

**Status:** pending

**Dependencies:** 18, 23

**Priority:** low

**Description:** Add ability to export progress as JSON file and import to restore progress on different devices.

**Details:**

1. Create export function:
```javascript
const exportProgress = () => {
  const progress = {
    version: 1,
    exportDate: new Date().toISOString(),
    completedLevels: [...completedLevels],
    streak: streak,
    maxStreak: maxStreak,
    currentLevel: currentLevel,
    totalXP: totalXP,
    unlockedAchievements: [...unlockedAchievements]
  };
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jslingo-progress-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
};
```

2. Create import function:
```javascript
const importProgress = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      // Validate schema version
      if (data.version !== 1) throw new Error('Incompatible version');
      // Restore state
      setCompletedLevels(new Set(data.completedLevels));
      setStreak(data.streak || 0);
      // ... restore other fields
    } catch (err) {
      setFeedback({ type: 'error', message: t('import.error') });
    }
  };
  reader.readAsText(file);
};
```

3. Add UI in settings/menu area:
- Export button with Download icon
- Import button (hidden file input) with Upload icon
- Confirmation modal before import (warns about overwriting)

4. Add translations for import/export UI

**Test Strategy:**

1. Click export, verify JSON file downloads
2. Open exported file, verify all progress data present
3. Reset progress, then import file, verify restoration
4. Try importing invalid file, verify error message
5. Test import with missing fields uses defaults
6. Verify import confirmation modal prevents accidental overwrites
