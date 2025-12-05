# Task ID: 20

**Title:** Add 5 New Levels for Array Methods (map, filter, reduce)

**Status:** pending

**Dependencies:** 19

**Priority:** low

**Description:** Create 5 new levels (21-25) teaching modern array methods including map, filter, reduce, and combining them.

**Details:**

1. Add Level 21: Array.map() Basics
```javascript
{
  id: 21,
  title: 'Array Map',
  difficulty: 'intermediate',
  task: 'Use map() to double each number in the array',
  starterCode: 'const numbers = [1, 2, 3, 4, 5];\n// Use map to double each number and log the result',
  expectedOutput: '2,4,6,8,10',
  hint: 'array.map(item => transform(item)) returns a new array',
  solution: 'const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.map(n => n * 2).join(","));'
}
```

2. Add Level 22: Array.filter() Basics
- Task: Filter array to keep only even numbers
- expectedOutput: '2,4'

3. Add Level 23: Array.reduce() Introduction
- Task: Sum all numbers in array using reduce
- expectedOutput: '15'
- Includes detailed hint about accumulator pattern

4. Add Level 24: Chaining map and filter
- Task: Filter evens, then double them
- Teaches method chaining

5. Add Level 25: Array.find() and Array.includes()
- Task: Find first number greater than 3
- expectedOutput: '4'

6. Update TRANSLATIONS with all new content

7. Set difficulty to 'intermediate' for all

**Test Strategy:**

1. Complete levels 16-20 first to unlock
2. Play through all 5 array method levels
3. Test various correct solutions work (AI validation flexibility)
4. Verify solutions match expected output
5. Test hints provide useful guidance
6. Check progress persistence includes new levels
