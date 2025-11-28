# JSLingo - Project Requirements

## Project Overview
JSLingo is an interactive JavaScript learning platform that provides hands-on coding exercises with real-time feedback and progress tracking. The application should be a single-page React application with a clean, modern UI.

## Core Requirements

### Technology Stack
- **Framework**: React 19+ with Vite 7+
- **Styling**: Tailwind CSS v4 (utility-first approach) with @tailwindcss/postcss
- **Icons**: lucide-react
- **Language**: JavaScript (ES6+)
- **Build Requirements**: Node.js 20.19+ or 22.12+ (required for Vite 7+)
- **Storage**: Browser localStorage for progress persistence
- **Code Evaluation**: eval() with console.log interception for simple cases

### Application Structure

#### File Organization
```
jslingo-app/
├── src/
│   ├── App.jsx           # Main application component
│   ├── index.css         # Tailwind imports only
│   └── main.jsx          # React entry point
├── public/               # Static assets
├── index.html            # HTML entry point
└── package.json          # Dependencies
```

### Functional Requirements

#### 1. Learning Levels
- Must have 15 progressive learning levels covering:
  1. Hello World (console.log basics)
  2. Variables and Numbers
  3. String Variables
  4. Working with Variables
  5. Basic Math Operations
  6. Conditional Statements (if)
  7. For Loops
  8. While Loops
  9. Arrays Basics
  10. Array Operations (push, access)
  11. Functions Basics
  12. Functions with Parameters
  13. Objects (key-value pairs)
  14. String Methods
  15. Final Challenge (combining concepts)

- Each level must include:
  - Title
  - Description
  - Task instructions
  - Starter code template
  - Expected output
  - Hint (toggle-able)
  - Solution (for validation)

#### 2. Code Editor
- Syntax-highlighted textarea (monospace font)
- Dark theme (bg-gray-900, text-green-400)
- Auto-save to localStorage on level change
- Reset button to restore starter code
- Run button to execute and validate code

#### 3. Code Execution & Validation
- Execute user's JavaScript code safely using eval()
- Intercept console.log() output
- Compare output against expected output
- Provide immediate feedback:
  - Success: Green banner with encouragement
  - Error: Red banner with helpful feedback
  - Loading: Blue banner while evaluating

#### 4. Progress Tracking
- Track completed levels (Set data structure)
- Track current level
- Track streak counter (consecutive completions)
- Store last played date
- Persist all progress to localStorage with key: `jslingo-progress`
- Progress data structure:
  ```json
  {
    "completedLevels": [1, 2, 3],
    "streak": 3,
    "currentLevel": 4,
    "lastPlayed": "2025-11-11T10:30:00.000Z"
  }
  ```

#### 5. User Interface Components

**Header:**
- App title "JSLingo"
- Trophy icon with completion count (X/15 Levels)
- Streak indicator (flame icon + number)
- Reset all progress button (red, with confirmation)
- Current level button (opens level selector)
- Progress bar showing overall completion percentage

**Level Selector Modal:**
- Grid layout (3 columns on desktop, responsive)
- Each level card shows:
  - Level number
  - Title
  - Brief description
  - Status icon (checkmark for completed, lock for locked)
  - Visual state (blue for current, green for completed, gray for locked)
- Only allow access to:
  - Completed levels
  - Current level
  - Next uncompleted level (progression system)

**Main Content Area (2-column layout):**

Left Panel - Instructions:
- Level title with completion checkmark if completed
- Description text
- Task box (blue background, left border)
- Toggle-able hint button (yellow lightbulb icon)
- Hint box (yellow background when shown)
- Feedback section (dynamic based on result)

Right Panel - Code Editor:
- Editor header (gray-800 background)
- Reset button (gray)
- Run Code button (green)
- Textarea for code input
- Placeholder text: "Write your JavaScript code here..."

**Navigation:**
- Previous Level button (disabled on level 1)
- Current level indicator (e.g., "Level 5 of 15")
- Next Level button (disabled until current level completed)

#### 6. Visual Design Requirements
- Color Scheme:
  - Primary: Blue (#2563eb)
  - Success: Green (#16a34a)
  - Warning: Yellow (#eab308)
  - Error: Red (#dc2626)
  - Background: Gradient from blue-50 to indigo-100
  - Editor: Dark theme (gray-900 bg, green-400 text)

- Typography:
  - Headers: Bold, sans-serif
  - Code: Monospace font
  - Body: Sans-serif, readable size

- Spacing & Layout:
  - Use Tailwind spacing utilities
  - Responsive breakpoints (mobile-first)
  - Max-width container: 7xl (80rem)

#### 7. Internationalization (i18n)
- Currently implemented: English (en-US)
- Structure supports additional locales via TRANSLATIONS object
- Use t() function for all user-facing text
- Detect browser locale with fallback to en-US

### Non-Functional Requirements

#### Performance
- App must load within 2 seconds on standard broadband
- Code execution must complete within 1 second
- Smooth animations (CSS transitions)
- No unnecessary re-renders

#### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

#### Accessibility
- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast ratios
- Focus indicators visible

#### Data Persistence
- Progress must survive browser refresh
- Progress isolated per browser/device
- No server-side storage required
- Graceful handling of corrupted localStorage data

### Code Quality Standards

#### JavaScript
- Use ES6+ features (const, let, arrow functions, template literals)
- Use React Hooks (useState, useEffect)
- Avoid any TypeScript
- Handle errors gracefully with try-catch
- Console errors for debugging

#### React Best Practices
- Functional components only
- Use proper dependency arrays in useEffect
- Avoid prop drilling (all state in main component is acceptable)
- Clean up effects when needed

#### Styling
- Use only Tailwind utility classes
- No custom CSS (except in index.css for Tailwind imports)
- Responsive design with mobile-first approach
- Consistent spacing and sizing

### Security Considerations
- Code execution isolated to browser context
- No external API calls for code execution
- localStorage only (no sensitive data)
- Sanitize any user input displayed back to UI
- Use eval() cautiously (note: acceptable for learning platform with user's own code)

### Future Enhancements (Not Required Now)
- Backend database for cross-device sync
- User authentication system
- Social features (leaderboards, sharing)
- More learning tracks (Python, TypeScript, etc.)
- Code syntax highlighting library
- Multiplayer coding challenges
- Certificate generation
- Integration with LMS platforms

### Development Commands

#### Required npm Scripts
```json
{
  "dev": "vite",              // Start dev server
  "build": "vite build",      // Production build
  "preview": "vite preview"   // Preview production build
}
```

#### Development Workflow
1. Run `npm run dev` for development
2. Test in browser at localhost:5173
3. Build with `npm run build`
4. Deploy `dist/` folder to web server

### Deployment Requirements

#### Hosting Platform
- **Platform**: Cloudflare Pages
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist/`
- **Node Version**: 20.19 or higher (or 22.12+)
- **Framework Preset**: Vite (auto-detected)

#### Cloudflare Pages Configuration
- Static site deployment (no backend needed)
- Automatic builds from GitHub repository
- Deploy on push to `main` branch
- Environment: Production
- Single Page Application (SPA) routing:
  - All routes should serve `index.html`
  - Use `_redirects` file or Cloudflare Pages routing if needed

#### Build Settings
```
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 20.19 or 22.12+
```

#### Domain & Access
- Custom domain support via Cloudflare Pages
- Automatic HTTPS/SSL certificates
- Global CDN distribution
- No VPN or private network required (publicly accessible)

### Testing Requirements
- Manual testing of all 15 levels
- Test progress persistence (refresh browser)
- Test level locking/unlocking logic
- Test reset functionality
- Test responsive design on mobile
- Test in multiple browsers

### Documentation Requirements
- README.md with setup instructions
- Inline code comments for complex logic
- This REQUIREMENTS.md document
- ARCHITECTURE.md (separate document)
- DEPLOYMENT.md for hosting instructions

### Constraints & Limitations

#### What NOT to Include
- No backend server
- No database (except localStorage)
- No user authentication
- No network requests (except potential Claude API for advanced validation)
- No TypeScript
- No state management libraries (Redux, MobX)
- No routing library (React Router) - single page only
- No testing framework required
- No CI/CD pipeline

#### Must Avoid
- Overcomplicated state management
- External dependencies beyond specified list
- Custom webpack configuration
- jQuery or legacy libraries
- Heavy animation libraries
- Large bundle sizes (keep under 500KB)

### Success Criteria
The application is considered complete when:
1. All 15 levels are functional and testable
2. Progress persists across browser sessions
3. UI is responsive on desktop and mobile
4. Code execution works reliably
5. Validation provides accurate feedback
6. User can complete full learning path
7. Application deploys successfully to Cloudflare Pages
8. Production build is publicly accessible via HTTPS
9. Automatic deployments from GitHub work correctly
10. No critical bugs or crashes
11. Code is clean and maintainable

### License & Usage
- Project is for personal use
- No commercial restrictions
- Open to modifications
- Educational purpose