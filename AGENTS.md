# JSLingo Development Agents

This document defines specialized AI agents for common development tasks in the JSLingo project. These agents follow the rules in CLAUDE.md and automate repetitive workflows.

## Available Agents

### 1. Code Review Agent (`review`)

**Purpose:** Performs comprehensive code review against JSLingo standards

**Triggers:**
- After completing a feature
- Before committing changes
- When requested explicitly

**Checklist:**
- [ ] All code uses functional components with hooks (no class components)
- [ ] Only Tailwind CSS utility classes used (no custom CSS)
- [ ] No TypeScript source files (.ts, .tsx)
- [ ] No forbidden dependencies (Redux, MobX, Material-UI, etc.)
- [ ] localStorage wrapped in try-catch blocks
- [ ] useEffect has proper dependency arrays
- [ ] No empty or unused files (especially CSS files)
- [ ] All user-facing strings use t() translation function
- [ ] Error handling in place for async operations
- [ ] No console.errors in production code
- [ ] Code follows ES6+ patterns (const/let, arrow functions, template literals)
- [ ] Component structure matches CLAUDE.md guidelines

**What it does:**
1. Reads modified files
2. Checks for violations of CLAUDE.md rules
3. Verifies code quality standards
4. Checks for common anti-patterns
5. Suggests improvements
6. Verifies ESLint passes

**Output:**
- List of issues found with file:line references
- Severity ratings (critical, warning, suggestion)
- Specific fixes or improvements needed

---

### 2. Git Flow Agent (`git-flow`)

**Purpose:** Handles complete git workflow with proper commit messages

**Triggers:**
- After completing a task
- When changes are ready to commit
- Explicit request to "update git" or "commit changes"

**What it does:**
1. Runs `git status` to see changes
2. Runs `git diff` to review modifications
3. Analyzes changes and determines commit type (feat, fix, docs, refactor, etc.)
4. Stages relevant files only (excludes .DS_Store, node_modules, etc.)
5. Creates descriptive commit message following conventions
6. Includes co-authorship attribution (Claude + Happy)
7. Commits changes
8. Verifies commit success
9. Pushes to remote repository
10. Reports final status

**Commit Message Format:**
```
<type>: <short summary>

- Bullet point describing change 1
- Bullet point describing change 2
- Bullet point describing change 3

Generated with [Claude Code](https://claude.ai/code)
via [Happy](https://happy.engineering)

Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes bug nor adds feature
- `test`: Adding missing tests
- `chore`: Updating build tasks, package manager configs, etc.

**Output:**
- Summary of files changed
- Commit hash
- Push confirmation
- Remote repository status

---

### 3. Level Creator Agent (`level-creator`)

**Purpose:** Creates new JSLingo learning levels with proper structure

**Triggers:**
- Explicitly requested: "create a new level about [topic]"
- After user describes a concept they want to teach

**What it does:**
1. Asks clarifying questions about the level:
   - What concept to teach?
   - What prerequisite knowledge?
   - Difficulty level?
   - What should user accomplish?
2. Generates level object structure
3. Creates translation keys
4. Writes starter code
5. Defines expected output
6. Creates hint text
7. Writes reference solution
8. Adds to levels array in App.jsx
9. Adds to TRANSLATIONS object
10. Tests the level manually

**Level Template:**
```javascript
{
  id: [next_number],
  title: "[concept_name]",
  description: "[2-3 sentences explaining what they'll learn]",
  task: "[clear instruction of what to do]",
  starterCode: "// Your code here\n",
  expectedOutput: "[exact_output_string]",
  hint: "[helpful guidance without giving away solution]",
  solution: "[working_reference_code]"
}
```

**Output:**
- Complete level definition
- Translation keys added
- Location in App.jsx where it was inserted
- Suggested test cases

---

### 4. Dependency Audit Agent (`dep-audit`)

**Purpose:** Checks dependencies for updates and security issues

**Triggers:**
- Weekly maintenance (if scheduled)
- Before major releases
- Explicit request: "audit dependencies"

**What it does:**
1. Runs `npm outdated` to check for updates
2. Runs `npm audit` to check security vulnerabilities
3. Analyzes update compatibility with Vite 7 and React 19
4. Checks if updates would break CLAUDE.md rules
5. Recommends safe updates
6. Warns about breaking changes
7. Suggests update strategy (minor vs major)

**Output:**
- List of outdated packages
- Security vulnerability report
- Safe-to-update recommendations
- Breaking change warnings
- Update commands to run

**Safety Checks:**
- ✅ Only suggests updates within project constraints
- ✅ Warns if update would require Node.js version change
- ✅ Checks for Tailwind CSS v4 compatibility
- ✅ Verifies Vite 7+ compatibility

---

### 5. Build & Deploy Agent (`deploy`)

**Purpose:** Builds and prepares app for deployment

**Triggers:**
- Explicit request: "build for production" or "prepare deployment"
- Before creating releases

**What it does:**
1. Runs `npm run lint` to check for errors
2. Fixes auto-fixable lint issues
3. Runs `npm run build` for production
4. Verifies build output in dist/
5. Checks bundle size
6. Tests build with `npm run preview`
7. Generates deployment checklist
8. Provides deployment instructions

**Pre-deployment Checklist:**
- [ ] All levels tested and working
- [ ] No console errors
- [ ] Progress persistence works
- [ ] ESLint passes
- [ ] Build completes successfully
- [ ] Bundle size under 500KB (gzipped)
- [ ] All translations present
- [ ] Mobile responsive
- [ ] Browser compatibility verified

**Output:**
- Build status
- Bundle size report
- Any warnings or errors
- Deployment-ready confirmation
- Next steps for deployment

---

### 6. Debug Helper Agent (`debug`)

**Purpose:** Helps diagnose and fix issues

**Triggers:**
- Bug reports
- Errors in console
- Unexpected behavior
- Explicit request: "debug this issue"

**What it does:**
1. Asks for error details (if not provided)
2. Reads relevant source code
3. Checks recent changes with git log
4. Analyzes error stack traces
5. Checks browser console logs
6. Reviews localStorage state
7. Identifies root cause
8. Suggests fixes with code examples
9. Explains why the bug occurred
10. Recommends preventive measures

**Debug Categories:**
- 🔴 Code execution errors (eval failures)
- 🟡 State management issues (useEffect, useState)
- 🟢 UI/styling problems (Tailwind, responsive)
- 🔵 Data persistence (localStorage)
- 🟣 Level logic (validation, progression)

**Output:**
- Root cause analysis
- Step-by-step fix instructions
- Code changes needed
- Testing steps
- Prevention tips

---

## How to Use These Agents

### Invoking an Agent

**Method 1: Natural language**
```
"Review my code changes"
"Create a git commit"
"Build for production"
"Debug this localStorage issue"
```

**Method 2: Explicit agent request**
```
"Run the code review agent"
"Use the git-flow agent to commit this"
"I need the debug helper for this error"
```

### Agent Workflow Example

**Scenario: Adding a new feature**

1. **Write code** (you or Claude)
2. **Code Review Agent** - Check for issues
3. **Fix issues** based on review
4. **Build & Deploy Agent** - Test build
5. **Git Flow Agent** - Commit and push

**Scenario: Bug fixing**

1. **Debug Helper Agent** - Identify issue
2. **Implement fix** (you or Claude)
3. **Code Review Agent** - Verify fix quality
4. **Git Flow Agent** - Commit fix

**Scenario: Creating new level**

1. **Level Creator Agent** - Generate level structure
2. **Test manually** in browser
3. **Code Review Agent** - Check integration
4. **Git Flow Agent** - Commit new level

---

## Agent Guidelines

### What Agents Should Do
✅ Follow CLAUDE.md rules strictly
✅ Provide actionable feedback
✅ Explain reasoning
✅ Give file:line references
✅ Offer code examples
✅ Ask clarifying questions when needed
✅ Work autonomously when scope is clear

### What Agents Should NOT Do
❌ Make assumptions about user intent
❌ Skip validation steps
❌ Create files not explicitly needed
❌ Add dependencies outside tech stack
❌ Bypass project constraints
❌ Use tools/languages not in CLAUDE.md

---

## Agent Configuration

### Code Review Agent Settings
- **Strictness**: High (enforce all CLAUDE.md rules)
- **Auto-fix**: No (suggest only, don't modify without permission)
- **Scope**: All modified files
- **Report format**: Markdown with severity indicators

### Git Flow Agent Settings
- **Auto-push**: Yes (after successful commit)
- **Branch**: main (as per project setup)
- **Message style**: Conventional commits
- **Attribution**: Always include Claude + Happy co-authorship

### Level Creator Agent Settings
- **Level numbering**: Auto-increment from highest existing ID
- **Starter code**: Minimal (let user write most code)
- **Hint quality**: Helpful but not revealing solution
- **Test validation**: Manual (no auto-testing yet)

### Dependency Audit Agent Settings
- **Update strategy**: Conservative (minor updates only by default)
- **Security threshold**: Medium (report all vulnerabilities)
- **Compatibility check**: Always verify with Vite 7+ and React 19

### Build & Deploy Agent Settings
- **Lint**: Always run before build
- **Preview**: Always test after build
- **Bundle analysis**: Report if over 500KB
- **Optimization**: Enabled (Vite defaults)

### Debug Helper Agent Settings
- **Verbosity**: Medium (explain reasoning but stay concise)
- **Suggestion style**: Step-by-step with code examples
- **Root cause**: Always provide explanation
- **Prevention**: Always include tips to avoid similar issues

---

## Custom Agent Requests

You can also request custom agent behavior:

**Examples:**
- "Create an agent that validates all translation keys are present"
- "Make an agent that checks localStorage schema compatibility"
- "I need an agent that verifies level difficulty progression"
- "Create an agent that generates a changelog from git commits"

The AI will create a specialized agent for your specific need.

---

## Agent Development Guidelines

When creating new agents:

1. **Define clear purpose** - One agent, one job
2. **Specify triggers** - When should it run?
3. **List actions** - What does it do step-by-step?
4. **Define output** - What does it report?
5. **Set boundaries** - What should it NOT do?
6. **Follow CLAUDE.md** - All agents must respect project rules
7. **Be autonomous** - Agent should work without constant prompting
8. **Provide value** - Agent should save time or improve quality

---

## Maintenance

This file should be updated when:
- New agents are created
- Agent behavior changes
- Project workflows evolve
- CLAUDE.md rules are updated
- New development needs emerge

---

**Last Updated:** 2025-11-29
**Version:** 1.0.0
**Maintained By:** Development Team
