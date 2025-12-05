# Task ID: 26

**Title:** Implement Full Keyboard Navigation

**Status:** pending

**Dependencies:** None

**Priority:** low

**Description:** Add comprehensive keyboard shortcuts and ensure all interactive elements are accessible via keyboard navigation.

**Details:**

1. Define keyboard shortcuts:
```javascript
const KEYBOARD_SHORTCUTS = {
  'ctrl+enter': 'runCode',
  'cmd+enter': 'runCode',
  'escape': 'closeModal',
  'h': 'toggleHint',
  'n': 'nextLevel',
  'p': 'prevLevel',
  'l': 'openLevelSelector',
  '?': 'showKeyboardHelp'
};
```

2. Add useEffect for keyboard listener:
```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    // Don't capture when typing in editor
    if (e.target.tagName === 'TEXTAREA') {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      return;
    }
    // Handle global shortcuts
    const key = e.key.toLowerCase();
    switch(key) {
      case 'h': toggleHint(); break;
      case 'n': nextLevel(); break;
      // ... etc
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [dependencies]);
```

3. Add keyboard help modal:
- Triggered by '?' key
- Lists all available shortcuts
- Accessible via button for discoverability

4. Ensure focus management:
- Modal trap focus when open
- Return focus to trigger on modal close
- Visible focus indicators (ring-2 ring-blue-500)

5. Add tabIndex where needed for custom interactive elements

6. Add aria-labels and roles for screen readers

7. Add translations for keyboard help content

**Test Strategy:**

1. Press Ctrl+Enter in editor - verify code runs
2. Press 'h' outside editor - verify hint toggles
3. Press Escape - verify modals close
4. Tab through entire app - verify all elements reachable
5. Test with screen reader (VoiceOver/NVDA)
6. Verify focus visible on all interactive elements
7. Test modal focus trap works correctly
