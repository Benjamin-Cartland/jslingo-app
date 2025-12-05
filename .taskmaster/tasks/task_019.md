# Task ID: 19

**Title:** Add 5 New Intermediate Levels (Arrow Functions)

**Status:** pending

**Dependencies:** 16 ✓

**Priority:** low

**Description:** Create 5 new levels (16-20) introducing arrow function syntax, building progressively from basic arrow functions to arrow functions with array methods.

**Details:**

1. Add Level 16: Basic Arrow Function
```javascript
{
  id: 16,
  title: 'Arrow Functions',
  difficulty: 'intermediate',
  task: 'Convert the function below to an arrow function and call it',
  starterCode: '// Convert to arrow function\nfunction double(x) { return x * 2; }\n// Call it with 5',
  expectedOutput: '10',
  hint: 'Arrow syntax: const name = (params) => expression',
  solution: 'const double = (x) => x * 2;\nconsole.log(double(5));'
}
```

2. Add Level 17: Arrow Function with Multiple Params
- Task: Create arrow function that adds two numbers
- expectedOutput: '15'

3. Add Level 18: Arrow Function with Block Body
- Task: Create arrow function with if statement inside
- Teaches when to use {} and return

4. Add Level 19: Arrow Functions with Arrays (forEach)
- Task: Use forEach with arrow function to log each element
- Introduces callback pattern

5. Add Level 20: Arrow Function Shorthand
- Task: Use implicit return with object literal
- Teaches wrapping in parentheses

6. Add all translations for new level content

7. Update level unlocking logic to handle 20 levels

**Test Strategy:**

1. Play through all 5 new levels in sequence
2. Verify each level's expected output matches solution
3. Test hint content is helpful and accurate
4. Verify levels 16-20 are locked until level 15 complete
5. Test progress saves correctly for new levels
6. Verify difficulty badge shows 'intermediate' for all new levels
