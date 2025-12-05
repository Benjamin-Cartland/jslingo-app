# Task ID: 6

**Title:** Review & Update Level 5: Basic Math

**Status:** done

**Dependencies:** 5 ✓

**Priority:** high

**Description:** Review and improve Level 5 to ensure it properly teaches arithmetic operators, building on variable knowledge.

**Details:**

Assess and improve Level 5:

Current state:
- Title: Basic Math
- Task: Output the sum of 15 + 27
- Expected Output: '42'
- Solution: console.log(15 + 27);

Review checklist:
1. Does it explain arithmetic operators (+, -, *, /)?
2. Does it show that JS can do calculations?
3. Is it clear you can put expressions inside console.log?

CONCERN: This level doesn't use variables - seems like a step backward

Consider enhancing:
- Store result in variable first, then log
- Show multiple operators
- Combine with previous variable knowledge

Suggested improvement:
```javascript
let a = 15;
let b = 27;
let sum = a + b;
console.log(sum);
```

This reinforces variables while teaching math.

**Test Strategy:**

1. Verify arithmetic concepts are explained
2. Check if it builds on or ignores variable knowledge
3. Ensure progression is logical
4. Test solution works correctly
