# Claude Code Rules for JSLingo Project

## Project Context
This is a React-based JavaScript learning platform with 15 interactive coding levels. The app uses localStorage for progress tracking and runs entirely client-side with no backend.

## Technology Constraints

### Allowed Technologies
- React 18+ (functional components only)
- Vite (build tool)
- Tailwind CSS (utility classes only)
- lucide-react (icons)
- JavaScript ES6+ (no TypeScript)
- Browser localStorage
- Standard browser APIs (eval, console)

### External Services (Optional)
- window.claude.complete() - AI-powered code evaluation API
- Falls back to local eval() with output comparison if unavailable
- Not required for basic app functionality
- Provides more intelligent code validation when available

### Development Dependencies
- ESLint with React Hooks plugin (enforces hooks rules)
- @types/react, @types/react-dom (IDE autocomplete only, no TS compilation)
- Tailwind CSS 4+ (uses new configuration format)
- Vite 7+ (build and dev server)

### Forbidden Technologies
- ❌ TypeScript source files (.ts, .tsx)
- ❌ State management libraries (Redux, MobX, Zustand)
- ❌ Component libraries (Material-UI, Chakra, Ant Design)
- ❌ Backend frameworks (Express, Next.js server routes)
- ❌ Database systems (SQL, MongoDB, Firebase)
- ❌ Additional dependencies not listed above
- ❌ Class components
- ❌ React Router (single page app only)
- ❌ Custom CSS files (Tailwind only)

**Note:** TypeScript type definitions (@types/*) are allowed for IDE support but no TypeScript source files should be created.

## Code Style & Standards

### React Patterns
```javascript
// ✅ DO: Functional components with hooks
const MyComponent = () => {
  const [state, setState] = useState(initialValue);
  useEffect(() => { ... }, [dependencies]);
  return <div>...</div>;
};

// ❌ DON'T: Class components
class MyComponent extends React.Component { ... }

// ✅ DO: Destructure props
const Button = ({ onClick, children }) => { ... };

// ❌ DON'T: Use props object
const Button = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

### State Management
```javascript
// ✅ DO: Lift state to parent component
const [currentLevel, setCurrentLevel] = useState(1);

// ❌ DON'T: Prop drilling more than 2 levels
// (Keep state in main component, JSLingo is acceptable size)

// ✅ DO: Use functional updates for state
setStreak(prev => prev + 1);

// ❌ DON'T: Direct state mutations
completedLevels.add(levelId); // Wrong! Set is immutable
setCompletedLevels(new Set([...completedLevels, levelId])); // Correct
```

### Styling Rules
```javascript
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center space-x-4 bg-blue-50 p-4">

// ❌ DON'T: Inline styles
<div style={{ display: 'flex', alignItems: 'center' }}>

// ❌ DON'T: Custom CSS classes
<div className="my-custom-class">

// ✅ DO: Conditional classes with template literals
className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-500'}`}

// ✅ DO: Multiple conditional classes
className={`
  px-4 py-2 rounded-lg
  ${isCompleted ? 'bg-green-500' : 'bg-gray-500'}
  ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
`}
```

### File Structure Rules
```
DO maintain this structure:
src/
├── App.jsx           # Single main component (all code here)
├── index.css         # Only Tailwind imports
├── main.jsx          # React entry point (don't modify)
└── assets/           # Static assets (Vite defaults, don't modify)

DON'T create:
- src/components/     # No component folder (single file app)
- src/utils/          # Keep helpers in App.jsx
- src/styles/         # Tailwind only
- src/hooks/          # Keep in App.jsx
- src/context/        # No context needed
- Empty CSS files     # Delete unused files like App.css
```

## Internationalization

### Translation Pattern
The app includes a complete internationalization (i18n) infrastructure:

```javascript
// TRANSLATIONS object contains all UI strings
const TRANSLATIONS = {
  "en-US": {
    "app.title": "JSLingo",
    "level.button": "Start Level",
    // ... more translations
  }
  // Additional locales can be added here
};

// Locale detection from browser
const locale = navigator.language || "en-US";

// Translation function
const t = (key) => TRANSLATIONS[locale]?.[key] || TRANSLATIONS["en-US"]?.[key] || key;

// Usage in JSX
<h1>{t('app.title')}</h1>
```

**Rules:**
- ✅ DO: Use `t('key')` for all user-facing text
- ✅ DO: Add all new UI strings to TRANSLATIONS object
- ✅ DO: Provide en-US fallback for all keys
- ❌ DON'T: Hardcode user-facing strings in JSX
- Currently only en-US is implemented, but structure supports additional locales

## Data Handling

### localStorage Pattern
```javascript
// ✅ DO: Wrap in try-catch
const loadProgress = () => {
  try {
    const saved = localStorage.getItem('jslingo-progress');
    if (saved) {
      const data = JSON.parse(saved);
      return data;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return defaultValue;
};

// ✅ DO: Save on state changes with useEffect
useEffect(() => {
  const progressData = { ... };
  localStorage.setItem('jslingo-progress', JSON.stringify(progressData));
}, [completedLevels, streak, currentLevel]);

// ❌ DON'T: Save on every render
localStorage.setItem('key', value); // Outside useEffect
```

### Data Validation
```javascript
// ✅ DO: Validate loaded data structure
if (data.completedLevels && Array.isArray(data.completedLevels)) {
  return new Set(data.completedLevels);
}

// ✅ DO: Provide fallbacks
const streak = data.streak || 0;
const currentLevel = data.currentLevel || 1;
```

## Code Execution Safety

### eval() Usage
```javascript
// ✅ DO: Isolate console.log
const originalLog = console.log;
console.log = (...args) => logs.push(...);
eval(userCode);
console.log = originalLog; // Always restore!

// ✅ DO: Wrap in try-catch
try {
  eval(code);
} catch (error) {
  return "Error: " + error.message;
}

// ❌ DON'T: Eval without error handling
eval(userCode); // Dangerous!
```

## Error Handling

### Best Practices
```javascript
// ✅ DO: Handle errors gracefully
try {
  const result = await someOperation();
} catch (error) {
  console.error('Operation failed:', error);
  setFeedback({ type: 'error', message: 'Something went wrong' });
}

// ✅ DO: Provide user-friendly messages
catch (error) {
  return "Error: " + error.message; // User sees this
}

// ❌ DON'T: Swallow errors silently
catch (error) {
  // nothing
}
```

## Performance Guidelines

### React Optimization
```javascript
// ✅ DO: Proper useEffect dependencies
useEffect(() => {
  // code
}, [dependency1, dependency2]);

// ❌ DON'T: Empty array when dependencies exist
useEffect(() => {
  doSomethingWith(prop);
}, []); // Missing prop dependency!

// ✅ DO: Cleanup effects
useEffect(() => {
  const timer = setTimeout(...);
  return () => clearTimeout(timer);
}, []);
```

### Avoid Unnecessary Re-renders
```javascript
// ✅ DO: Use callback pattern for events
const handleClick = () => { ... };
<button onClick={handleClick}>

// ❌ DON'T: Inline arrow functions in JSX (acceptable for small apps)
<button onClick={() => handleClick(id)}>
// ^ This is actually fine for JSLingo's scale
```

## Component Patterns

### Modal Pattern
```javascript
// ✅ DO: Conditional rendering with fixed positioning
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-xl">
      {/* Modal content */}
    </div>
  </div>
)}

// ✅ DO: Close handlers
<button onClick={() => setShowModal(false)}>×</button>
```

### Button Pattern
```javascript
// ✅ DO: Consistent button styling
<button
  onClick={handleClick}
  disabled={isDisabled}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
>
  {label}
</button>
```

## Testing Approach

### Manual Testing Protocol
1. Test each level individually
2. Test progress persistence (refresh browser)
3. Test level locking/unlocking
4. Test reset functionality
5. Test on multiple browsers
6. Test responsive layouts

### No Automated Testing Required
- Manual testing is sufficient for this project
- No Jest, React Testing Library, etc. needed
- Focus on functionality over test coverage

## Git Commit Message Format

Use conventional commits with detailed descriptions:

```
<type>: <short summary>

- Bullet point describing change 1
- Bullet point describing change 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:** feat, fix, docs, style, refactor, test, chore

## When Making Changes

### Adding New Levels
1. Add level object to `levels` array
2. Add translations to `TRANSLATIONS` object
3. Test manually
4. No other changes needed

### Modifying UI
1. Use Tailwind classes only
2. Maintain responsive design
3. Test on mobile viewport
4. Ensure accessibility (keyboard nav, contrast)

### Fixing Bugs
1. Identify root cause
2. Add error handling if missing
3. Test fix thoroughly
4. Check for side effects

## Common Patterns to Use

### State Update Pattern
```javascript
// For simple values
const [value, setValue] = useState(initial);
setValue(newValue);

// For objects/arrays
const [obj, setObj] = useState({});
setObj({ ...obj, key: newValue });

// For Sets
const [set, setSet] = useState(new Set());
setSet(new Set([...set, newItem]));
```

### Event Handler Pattern
```javascript
const handleEvent = (param) => {
  // Validation
  if (!isValid) return;
  
  // State updates
  setState(newState);
  
  // Side effects
  someEffect();
};
```

### Conditional Rendering Pattern
```javascript
// Simple conditional
{condition && <Component />}

// Ternary operator
{condition ? <ComponentA /> : <ComponentB />}

// Multiple conditions
{loading ? <Spinner /> : error ? <Error /> : <Content />}
```

## What NOT to Do

### Avoid Over-Engineering
```javascript
// ❌ DON'T: Create custom hooks for simple logic
const useCounter = () => {
  const [count, setCount] = useState(0);
  return [count, () => setCount(c => c + 1)];
};

// ✅ DO: Keep it simple
const [count, setCount] = useState(0);
```

### Avoid Premature Optimization
```javascript
// ❌ DON'T: Optimize before profiling
const memoizedValue = useMemo(() => value, [deps]);

// ✅ DO: Optimize only if needed
const value = calculateValue();
// ^ This is fine for JSLingo's scale
```

### Avoid External Dependencies
```javascript
// ❌ DON'T: Add libraries for simple tasks
import moment from 'moment'; // Too heavy!

// ✅ DO: Use native APIs
new Date().toISOString();
```

### Don't Create Unused Files
```javascript
// ❌ DON'T: Create empty CSS files that aren't used
// Bad: Creating src/App.css with no content

// ❌ DON'T: Import files that provide no functionality
import './App.css'; // If App.css is empty

// ✅ DO: Clean up unused files
// Delete any empty or unused CSS, JS, or other files
```

## Review Checklist

Before committing changes, verify:
- [ ] No TypeScript source files (.ts, .tsx)
- [ ] No new dependencies added (except @types/* for IDE support)
- [ ] Tailwind classes only (no custom CSS)
- [ ] No empty or unused files (check for empty CSS files)
- [ ] Functional components with hooks
- [ ] localStorage wrapped in try-catch
- [ ] Error handling in place
- [ ] Responsive design maintained
- [ ] No console.errors in production code
- [ ] Progress persists after refresh
- [ ] All levels still work
- [ ] All user-facing strings use t() translation function
- [ ] ESLint passes with no errors

## Questions to Ask Before Changes

1. **Is this change necessary?** - Avoid feature creep
2. **Does it add dependencies?** - Keep bundle small
3. **Does it break existing functionality?** - Test thoroughly
4. **Is it maintainable?** - Keep code simple
5. **Does it follow these rules?** - Consistency matters

## Getting Help

If unsure about:
- **React patterns**: Check official React docs
- **Tailwind classes**: Use Tailwind docs search
- **JavaScript syntax**: MDN is authoritative source
- **Project decisions**: Refer to REQUIREMENTS.md and ARCHITECTURE.md

## Remember

- **Simplicity over complexity** - This is a learning platform, not enterprise software
- **Consistency over cleverness** - Boring code is good code
- **Working over perfect** - Ship it, iterate later
- **User experience first** - Code quality second, but still important