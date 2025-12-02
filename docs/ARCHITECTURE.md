# JSLingo - Architecture Documentation

## System Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │              JSLingo React App                    │  │
│  │                                                   │  │
│  │  ┌─────────────┐  ┌──────────────┐             │  │
│  │  │   Header    │  │ Level Modal  │             │  │
│  │  └─────────────┘  └──────────────┘             │  │
│  │                                                   │  │
│  │  ┌────────────────────┐  ┌───────────────────┐  │  │
│  │  │  Instructions      │  │  Code Editor      │  │  │
│  │  │  - Task            │  │  - Textarea       │  │  │
│  │  │  - Hint            │  │  - Run Button     │  │  │
│  │  │  - Feedback        │  │  - Reset Button   │  │  │
│  │  └────────────────────┘  └───────────────────┘  │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Navigation Controls                 │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│                          ↕                              │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Browser localStorage                    │  │
│  │  {                                               │  │
│  │    completedLevels: [1,2,3],                    │  │
│  │    streak: 3,                                   │  │
│  │    currentLevel: 4,                             │  │
│  │    lastPlayed: "2025-11-11T10:30:00Z"          │  │
│  │  }                                               │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Component Architecture

### Component Hierarchy
```
App (JSLingo)
├── Header
│   ├── AppTitle
│   ├── ProgressIndicator
│   ├── StreakCounter
│   ├── ResetButton
│   └── LevelButton
│
├── LevelSelectorModal (conditional)
│   └── LevelCards[] (15 items)
│
├── MainContent
│   ├── InstructionsPanel
│   │   ├── LevelHeader
│   │   ├── Description
│   │   ├── TaskBox
│   │   ├── HintToggle
│   │   ├── HintBox (conditional)
│   │   └── FeedbackSection (conditional)
│   │
│   └── CodeEditorPanel
│       ├── EditorHeader
│       │   ├── ResetButton
│       │   └── RunButton
│       └── CodeTextarea
│
└── NavigationControls
    ├── PreviousButton
    ├── LevelIndicator
    └── NextButton
```

## State Management

### State Structure
All state is managed in the root `JSLingo` component using React hooks.

```javascript
// Core application state
const [currentLevel, setCurrentLevel] = useState(number)
const [userCode, setUserCode] = useState(string)
const [completedLevels, setCompletedLevels] = useState(Set)
const [showHint, setShowHint] = useState(boolean)
const [feedback, setFeedback] = useState(object | null)
const [streak, setStreak] = useState(number)
const [showLevelSelector, setShowLevelSelector] = useState(boolean)
```

### State Flow Diagram
```
User Action → State Update → UI Re-render → localStorage Save
     ↓              ↓              ↓                ↓
  Click Run → Set feedback → Show result → Save progress
  Complete  → Add to Set  → Update UI  → Persist data
  Navigate  → Change level → Load code → Update view
```

## Data Models

### Level Definition
```javascript
{
  id: number,              // Unique identifier (1-15)
  title: string,           // Display title
  description: string,     // Brief explanation
  task: string,            // What user needs to do
  starterCode: string,     // Initial code template
  expectedOutput: string,  // Correct output
  hint: string,           // Help text
  solution: string        // Reference solution
}
```

### Progress Data (localStorage)
```javascript
{
  completedLevels: number[],  // Array of completed level IDs
  streak: number,             // Consecutive completions
  currentLevel: number,       // Currently active level
  lastPlayed: string         // ISO timestamp
}
```

### Feedback Object
```javascript
{
  type: 'success' | 'error' | 'loading',
  message: string,
  explanation?: string,  // Detailed feedback
  output?: string,       // User's actual output
  expected?: string,     // Expected output
  hint?: string         // Additional help
}
```

## Core Functions & Logic

### Progress Management
```javascript
loadProgress()
  ↓
  Read from localStorage('jslingo-progress')
  ↓
  Parse JSON → Convert to state objects
  ↓
  Return: { completedLevels: Set, streak, currentLevel, lastPlayed }

saveProgress()
  ↓
  Triggered by useEffect on state changes
  ↓
  Convert Set to Array
  ↓
  JSON.stringify → localStorage.setItem()
```

### Code Execution Flow
```
handleSubmit()
  ↓
  Set loading feedback
  ↓
  executeCode(userCode)
    ↓
    Capture console.log output
    ↓
    Run eval(code)
    ↓
    Restore console.log
    ↓
    Return captured output
  ↓
  Compare output with expectedOutput
  ↓
  Update feedback & completedLevels
  ↓
  Trigger localStorage save
```

### Level Navigation Logic
```
handleLevelChange(levelId)
  ↓
  Calculate maxUnlockedLevel
    = max(1, max(...completedLevels) + 1)
  ↓
  if (levelId <= maxUnlockedLevel)
    ↓
    setCurrentLevel(levelId)
    ↓
    Load level's starterCode
    ↓
    Reset feedback & hints
```

## Internationalization (i18n)

### Translation System
```
TRANSLATIONS object
  ├── "en-US": { ...keys }
  └── "es-ES": { ...keys } (future)

Browser Detection
  ↓
  navigator.languages[0] || navigator.language
  ↓
  findMatchingLocale(locale)
  ↓
  Use matched locale or fallback to en-US

t(key) function
  ↓
  TRANSLATIONS[locale][key] || TRANSLATIONS['en-US'][key] || key
```

## Styling Architecture

### Tailwind Utility Patterns

**Color System:**
- Primary: blue-* (buttons, headers, progress)
- Success: green-* (completed states)
- Warning: yellow-* (hints)
- Error: red-* (validation errors)
- Neutral: gray-* (backgrounds, text)

**Layout Patterns:**
- Container: max-w-7xl mx-auto px-4
- Grid: grid grid-cols-1 lg:grid-cols-2
- Flex: flex items-center justify-between
- Spacing: space-x-4, space-y-4, gap-8

**Responsive Strategy:**
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Hidden elements: hidden md:flex

## Performance Considerations

### Optimization Strategies

**State Updates:**
- Batch related state updates
- Use functional updates for counters
- Minimize re-renders with proper dependencies

**localStorage:**
- Debounce writes (via useEffect)
- Try-catch for read operations
- Graceful fallback on errors

**Code Execution:**
- Timeout protection (future enhancement)
- Error boundary for eval failures
- Memory cleanup after execution

**Bundle Size:**
- Tree-shake unused Tailwind classes
- Minimize dependencies
- Code splitting (if needed in future)

## Security Model

### Threat Analysis
```
Threat: Malicious code in user input
Mitigation: Sandboxed eval in browser context only
Risk: Low (user can only harm their own browser session)

Threat: localStorage tampering
Mitigation: Validate data structure on load
Risk: Low (only affects user's own progress)

Threat: XSS in feedback display
Mitigation: React's built-in XSS protection
Risk: Minimal (all content rendered via React)
```

### Safe Practices
- No server communication (no CSRF risk)
- No authentication (no credential theft)
- No external scripts (no supply chain attacks)
- Input isolated to code editor (no form injection)

## Extension Points

### Adding New Levels
```javascript
// 1. Add to levels array
{
  id: 16,
  title: "New Concept",
  description: "...",
  task: "...",
  starterCode: "...",
  expectedOutput: "...",
  hint: "...",
  solution: "..."
}

// 2. Add translations
TRANSLATIONS['en-US'].newConceptTitle = "..."

// 3. No other changes needed!
```

### Adding New Languages
```javascript
// 1. Add to TRANSLATIONS
TRANSLATIONS['fr-FR'] = {
  helloWorldTitle: "Bonjour le Monde",
  // ... all other keys
}

// 2. Translation system auto-detects browser locale
```

### Future Backend Integration
```javascript
// Replace localStorage with API calls
const saveProgress = async () => {
  await fetch('/api/progress', {
    method: 'POST',
    body: JSON.stringify(progressData)
  })
}

const loadProgress = async () => {
  const res = await fetch('/api/progress')
  return await res.json()
}
```

## Build & Deployment Pipeline

### Development Build
```
npm run dev
  ↓
Vite Dev Server
  ↓
Hot Module Reload (HMR)
  ↓
localhost:5173
```

### Production Build
```
npm run build
  ↓
Vite Build Process
  ↓
Transpile JSX → JS
Bundle with Rollup
Minify & Optimize
Process Tailwind CSS
  ↓
Output: dist/ folder
  ├── index.html
  ├── assets/
  │   ├── index-[hash].js
  │   └── index-[hash].css
```

### Deployment (Cloudflare Pages)
```
git push origin main
  ↓
Cloudflare Pages webhook triggered
  ↓
npm run build
  ↓
dist/ deployed to edge network
  ↓
Live at https://jslingo.cartland.cc
```

## Testing Strategy

### Manual Testing Checklist

**Level Progression:**
- [ ] Can complete level 1
- [ ] Level 2 unlocks after level 1
- [ ] Cannot skip to level 3 without completing 2
- [ ] All 15 levels completable in sequence

**Progress Persistence:**
- [ ] Refresh browser - progress retained
- [ ] Close/reopen browser - progress retained
- [ ] Completed checkmarks persist
- [ ] Streak counter persists

**Code Validation:**
- [ ] Correct code marked as success
- [ ] Incorrect code shows error feedback
- [ ] Syntax errors handled gracefully
- [ ] Output comparison works accurately

**UI Interactions:**
- [ ] Level selector opens/closes
- [ ] Hints toggle show/hide
- [ ] Reset button restores starter code
- [ ] Reset all progress clears everything
- [ ] Navigation buttons enable/disable correctly

**Responsive Design:**
- [ ] Mobile layout (< 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (> 1024px)

### Browser Testing Matrix
| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 120+    | ✓      |
| Firefox | 120+    | ✓      |
| Safari  | 17+     | ✓      |
| Edge    | 120+    | ✓      |

## Monitoring & Debugging

### Console Logging Strategy
- Development: Verbose logging
- Production: Error logging only
- Key events to log:
  - Progress save/load
  - Level changes
  - Code execution results
  - localStorage errors

### Debug Tools
```javascript
// Access app state in console (dev mode)
window.__JSLINGO_DEBUG__ = {
  getProgress: () => localStorage.getItem('jslingo-progress'),
  clearProgress: () => localStorage.removeItem('jslingo-progress'),
  setLevel: (n) => setCurrentLevel(n)
}
```

## Known Limitations

1. **Single Browser/Device:** Progress doesn't sync across devices
2. **No Undo:** Code changes can't be undone (beyond browser undo)
3. **Simple Validation:** Output matching only, no AST analysis
4. **No Syntax Highlighting:** Plain textarea, not a full code editor
5. **Mobile Typing:** Small screen keyboard can be challenging
6. **localStorage Limits:** Browser may clear data if storage full

## Future Architecture Considerations

### Backend Integration
- RESTful API for user management
- PostgreSQL for progress storage
- JWT authentication
- WebSocket for real-time features

### Enhanced Code Execution
- Web Worker isolation
- AST parsing for validation
- Step-by-step debugger
- Code quality metrics

### Advanced Features
- Monaco Editor integration
- Git-like version control for solutions
- Peer code review system
- Adaptive difficulty based on performance