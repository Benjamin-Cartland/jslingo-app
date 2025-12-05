# Task ID: 25

**Title:** Add Common Mistakes Database with Targeted Hints

**Status:** pending

**Dependencies:** 22

**Priority:** low

**Description:** Create a system that detects common coding mistakes and provides specific, helpful error messages instead of generic errors.

**Details:**

1. Define common mistakes patterns:
```javascript
const COMMON_MISTAKES = [
  {
    pattern: /console\.Log\(/i,
    wrongPattern: true,
    message: 'JavaScript is case-sensitive! Use console.log() with lowercase "l"'
  },
  {
    pattern: /console\.log\([^'"][^)]*[^'"]\)/,
    levelHint: [1, 3, 4], // Applicable to string levels
    message: 'Strings need quotes! Wrap your text in "double" or \'single\' quotes'
  },
  {
    pattern: /=(?!=)/,
    checkContext: (code) => code.includes('if') && !code.includes('=='),
    message: 'In conditions, use == or === for comparison, not = (assignment)'
  },
  {
    pattern: /for\s*\([^;]*;[^;]*;[^)]*\)\s*;/,
    message: 'Oops! You have a semicolon right after your for loop - the loop body won\'t execute'
  },
  {
    pattern: /function\s+\w+\s*\([^)]*\)\s*[^{]/,
    message: 'Functions need curly braces {} around their body'
  }
];
```

2. Create mistake detection function:
```javascript
const detectCommonMistake = (code, levelId) => {
  for (const mistake of COMMON_MISTAKES) {
    if (mistake.levelHint && !mistake.levelHint.includes(levelId)) continue;
    if (mistake.pattern.test(code)) {
      if (mistake.checkContext && !mistake.checkContext(code)) continue;
      return mistake.message;
    }
  }
  return null;
};
```

3. Integrate into code execution:
- Run mistake detection before eval
- Show targeted hint in feedback if mistake detected
- Still show actual error if no common mistake matches

4. Add 15-20 common JavaScript beginner mistakes

5. Track which mistakes user makes for potential analytics

**Test Strategy:**

1. Type 'console.Log("test")' - verify case-sensitivity hint
2. Type 'console.log(hello)' without quotes - verify string hint
3. Type 'if (x = 5)' - verify assignment vs comparison hint
4. Test actual runtime errors still display correctly
5. Verify hints don't trigger false positives on correct code
