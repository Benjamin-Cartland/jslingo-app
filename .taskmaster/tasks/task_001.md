# Task ID: 1

**Title:** Create Welcome Landing Page

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Add a welcome landing page that explains what JSLingo is and how it works, displayed before users start their first level.

**Details:**

Create a welcoming landing page that:

1. Introduces JSLingo as an interactive JavaScript learning platform
2. Explains the learning approach (bite-sized coding challenges)
3. Shows what users will learn (variables, functions, loops, arrays, etc.)
4. Explains how the app works:
   - Read the task description
   - Write code in the editor
   - Click 'Run Code' to test
   - Get instant feedback
   - Progress through 15 levels
5. Include a prominent 'Start Learning' button
6. Consider showing:
   - Progress tracking feature
   - Streak system
   - Hint availability
7. Store 'hasSeenWelcome' in localStorage to only show on first visit
8. Add translations for all welcome page content
9. Design should be engaging and encouraging for beginners

**Test Strategy:**

1. Clear localStorage, reload app - verify landing page shows
2. Click 'Start Learning' - verify navigates to Level 1
3. Refresh - verify landing page doesn't show again
4. Clear localStorage again - verify it shows once more
5. Test on mobile viewport
6. Verify all text uses t() translation function
