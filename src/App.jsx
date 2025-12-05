import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Lightbulb, CheckCircle, Lock, Trophy, Flame, Code, BookOpen, Repeat, Database, ArrowRight, Sparkles, Target, HelpCircle } from 'lucide-react';

const TRANSLATIONS = {
  "en-US": {
    "helloWorldTitle": "Hello World",
    "helloWorldDescription": "Welcome to JavaScript! In programming, we use console.log() to display messages. Think of it as telling the computer to show text on the screen. Text in JavaScript must be wrapped in quotes — either 'single' or \"double\" quotes work!",
    "helloWorldTask": "Use console.log() to display the message: Hello, World!",
    "helloWorldHint": "Type console.log() and put your message inside the parentheses. Remember: text needs quotes around it! Example: console.log('Your text here');",
    "variablesNumbersTitle": "Variables and Numbers",
    "variablesNumbersDescription": "Variables are like labeled boxes that store data. We create them using the 'let' keyword. Unlike text, numbers don't need quotes — just write the number directly! Once stored, you can use the variable name to access the value.",
    "variablesNumbersTask": "Create a variable called 'age' and store the number 25 in it. Then use console.log() to display its value.",
    "variablesNumbersHint": "Start with 'let age = 25;' to create the variable. Then use console.log(age) — notice the variable name has no quotes because we want the value, not the word 'age'.",
    "stringVariablesTitle": "String Variables",
    "stringVariablesDescription": "Text data in JavaScript is called a 'string'. You can combine strings with variables using template literals — special strings with backticks (`) that let you embed variables using ${variableName}.",
    "stringVariablesTask": "Create a variable 'name' with the value 'JavaScript', then print 'Hello, JavaScript!' using a template literal.",
    "stringVariablesHint": "Create your variable with let name = 'JavaScript'; then use backticks and ${} to embed it: console.log(`Hello, ${name}!`);",
    "userInputTitle": "Combining Strings",
    "userInputDescription": "Besides template literals, you can combine strings using the + operator. This is called concatenation. You can join text and variables together: 'Hello ' + name creates a new combined string.",
    "userInputTask": "Create a variable 'color' with value 'blue'. Use the + operator to print: 'Your favorite color is blue'",
    "userInputHint": "Use + to join strings: console.log('Your favorite color is ' + color). Don't forget the space before the closing quote!",
    "basicMathTitle": "Basic Math",
    "basicMathDescription": "JavaScript can perform calculations using arithmetic operators: + (add), - (subtract), * (multiply), / (divide). You can calculate directly in console.log() or store results in variables first.",
    "basicMathTask": "Calculate 15 + 27 and print the result.",
    "basicMathHint": "You can put math expressions directly inside console.log(): console.log(15 + 27). JavaScript will calculate first, then display the answer.",
    "conditionalsTitle": "Conditionals",
    "conditionalsDescription": "Programs need to make decisions! An 'if' statement runs code only when a condition is true. Use comparison operators like > (greater than), < (less than), or === (equals) to create conditions. Code inside the curly braces {} runs only if the condition is true.",
    "conditionalsTask": "The variable 'number' contains 10. Check if it's greater than 5, and if so, print: 'Yes, 10 is greater than 5'",
    "conditionalsHint": "Structure: if (condition) { code to run }. Your condition should be: number > 5. Put your console.log() inside the curly braces.",
    "forLoopsTitle": "For Loops",
    "forLoopsDescription": "Loops repeat code multiple times. A 'for' loop has three parts: 1) let i = 1 (start value), 2) i <= 3 (keep going while true), 3) i++ (add 1 after each loop). The i++ is shorthand for i = i + 1.",
    "forLoopsTask": "Use a for loop to print the numbers 1, 2, and 3 (each on a new line).",
    "forLoopsHint": "Structure: for (let i = 1; i <= 3; i++) { console.log(i); }. The loop starts at 1, runs while i is 3 or less, and adds 1 each time.",
    "whileLoopsTitle": "While Loops",
    "whileLoopsDescription": "A 'while' loop is simpler than 'for' — it just repeats while a condition is true. Important: you must change the condition inside the loop, or it will run forever! The variable 'count' starts at 1 for you.",
    "whileLoopsTask": "Using the 'count' variable (starts at 1), print 1, 2, 3 with a while loop.",
    "whileLoopsHint": "Structure: while (count <= 3) { console.log(count); count++; }. Don't forget count++ or the loop never ends!",
    "listsBasicsTitle": "Arrays",
    "listsBasicsDescription": "Arrays store multiple values in a single variable using square brackets []. Each item has an index (position number). Important: counting starts at 0, not 1! So the first item is [0], second is [1], etc.",
    "listsBasicsTask": "Create an array called 'fruits' with ['apple', 'banana', 'orange'], then print the second item (banana).",
    "listsBasicsHint": "Create array: let fruits = ['apple', 'banana', 'orange']; Access items with index: fruits[1] gets 'banana' (remember, counting starts at 0!).",
    "listOperationsTitle": "Array Methods",
    "listOperationsDescription": "Arrays have built-in methods (functions) you can use. The .push() method adds an item to the end of an array. Call it with a dot after the array name: myArray.push(newItem). This modifies the original array.",
    "listOperationsTask": "Create an array 'numbers' with [1, 2, 3], use .push() to add 4, then print the array.",
    "listOperationsHint": "First create the array, then call numbers.push(4) to add 4, then console.log(numbers) to see the result: [1,2,3,4].",
    "functionsBasicsTitle": "Functions",
    "functionsBasicsDescription": "Functions are reusable blocks of code. Define one with the 'function' keyword, give it a name, and put code inside curly braces. Important: defining a function doesn't run it — you must call it by name with parentheses: functionName().",
    "functionsBasicsTask": "Create a function called 'greet' that prints 'Hello!', then call the function to run it.",
    "functionsBasicsHint": "Two steps: 1) Define: function greet() { console.log('Hello!'); } 2) Call: greet(); — the parentheses tell JavaScript to run it!",
    "functionsParametersTitle": "Function Parameters",
    "functionsParametersDescription": "Parameters let functions accept input. Define them in the parentheses: function greet(name). When calling, the value you pass is called an 'argument': greet('World'). Inside the function, use the parameter like a variable.",
    "functionsParametersTask": "Create a function 'sayHello' that takes a 'name' parameter and prints 'Hello, [name]!'. Call it with 'World' to print 'Hello, World!'",
    "functionsParametersHint": "Define with parameter: function sayHello(name) { console.log(`Hello, ${name}!`); } Then call with an argument: sayHello('World');",
    "dictionariesTitle": "Objects",
    "dictionariesDescription": "Objects store data as key-value pairs inside curly braces {}. Each piece of data has a name (key) and a value: {name: 'Alice', age: 30}. Access values using dot notation: objectName.key.",
    "dictionariesTask": "Create an object 'person' with name='Alice' and age=30. Print the person's name.",
    "dictionariesHint": "Create: let person = {name: 'Alice', age: 30}; Access the name using dot notation: console.log(person.name);",
    "stringMethodsTitle": "String Methods",
    "stringMethodsDescription": "Strings also have methods, just like arrays! The .toUpperCase() method returns a new string with all letters capitalized. Other useful methods: .toLowerCase(), .trim() (removes spaces), .length (number of characters).",
    "stringMethodsTask": "The variable 'text' contains 'javascript programming'. Print it in all uppercase letters.",
    "stringMethodsHint": "Call the method on the string: console.log(text.toUpperCase()). This returns a new string without changing the original.",
    "finalChallengeTitle": "Final Challenge",
    "finalChallengeDescription": "Time to combine everything! You'll use arrays, loops, and math together. Loop through an array using its length property: for (let i = 0; i < array.length; i++) — then access each item with array[i].",
    "finalChallengeTask": "Create an array [1,2,3,4,5] and use a for loop to print each number multiplied by 2 (output: 2, 4, 6, 8, 10 on separate lines).",
    "finalChallengeHint": "Create the array, then loop: for (let i = 0; i < numbers.length; i++) { console.log(numbers[i] * 2); }. Access each number with numbers[i] and multiply by 2.",
    "starterCodeComment": "// Use console.log() to display your message\n",
    "createVariableComment": "// Create a variable and print it\n",
    "createStringComment": "// Create a string variable\n",
    "getUserInputComment": "// Get user input and respond\n",
    "calculateSumComment": "// Calculate and print the sum\n",
    "useIfStatementComment": "// Use an if statement\nlet number = 10;\n",
    "useForLoopComment": "// Use a for loop to print numbers\n",
    "useWhileLoopComment": "// Use a while loop\nlet count = 1;\n",
    "createListComment": "// Create an array and access items\n",
    "createListAddComment": "// Create array and add item\n",
    "defineFunctionComment": "// Define and call a function\n",
    "functionParameterComment": "// Function with parameter\n",
    "createDictionaryComment": "// Create and use an object\n",
    "stringMethodsComment": "// Use string methods\nlet text = 'javascript programming';\n",
    "finalChallengeComment": "// Final challenge - combine concepts\n",
    "appTitle": "JSLingo",
    "levelsProgress": "Levels",
    "streakLabel": "streak",
    "levelButton": "Level",
    "overallProgress": "Overall Progress",
    "selectLevel": "Select Level",
    "closeButton": "×",
    "taskLabel": "Task:",
    "showHint": "Show Hint",
    "hideHint": "Hide Hint",
    "pythonCodeEditor": "JavaScript Code Editor",
    "resetButton": "Reset",
    "runCodeButton": "Run Code",
    "codeEditorPlaceholder": "Write your JavaScript code here...",
    "previousLevel": "Previous Level",
    "nextLevel": "Next Level",
    "levelOf": "Level {current} of {total}",
    "evaluatingCode": "🤔 Evaluating your code...",
    "excellentComplete": "🎉 Excellent! You completed this level!",
    "notQuiteRight": "Not quite right. Let's review your solution:",
    "yourOutput": "Your output:",
    "expectedOutput": "Expected output:",
    "tipLabel": "Tip:",
    "welcome.title": "Welcome to JSLingo!",
    "welcome.subtitle": "Learn JavaScript through interactive coding challenges",
    "welcome.intro": "JSLingo is your friendly guide to learning JavaScript — the language that powers the web. No prior coding experience needed!",
    "welcome.whatYouLearn": "What You'll Learn",
    "welcome.skill.variables": "Variables & Data Types",
    "welcome.skill.variablesDesc": "Store and work with numbers, text, and more",
    "welcome.skill.functions": "Functions",
    "welcome.skill.functionsDesc": "Create reusable blocks of code",
    "welcome.skill.loops": "Loops",
    "welcome.skill.loopsDesc": "Repeat actions efficiently",
    "welcome.skill.arrays": "Arrays & Objects",
    "welcome.skill.arraysDesc": "Organize and manage collections of data",
    "welcome.howItWorks": "How It Works",
    "welcome.step1": "Read the Task",
    "welcome.step1Desc": "Each level gives you a coding challenge to solve",
    "welcome.step2": "Write Code",
    "welcome.step2Desc": "Type your JavaScript solution in the editor",
    "welcome.step3": "Run & Learn",
    "welcome.step3Desc": "Get instant feedback and progress to the next level",
    "welcome.features": "Features",
    "welcome.feature.progress": "Progress Tracking",
    "welcome.feature.progressDesc": "Your progress is saved automatically",
    "welcome.feature.streaks": "Streak System",
    "welcome.feature.streaksDesc": "Build momentum with consecutive correct answers",
    "welcome.feature.hints": "Helpful Hints",
    "welcome.feature.hintsDesc": "Stuck? Get a hint without losing your streak",
    "welcome.startButton": "Start Learning",
    "welcome.levels": "15 Levels"
  }
};

const appLocale = '{{APP_LOCALE}}';
const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';
const findMatchingLocale = (locale) => {
  if (TRANSLATIONS[locale]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};
const locale = (appLocale !== '{{APP_LOCALE}}') ? findMatchingLocale(appLocale) : findMatchingLocale(browserLocale);
const t = (key) => TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key;

const JSLingo = () => {
  // Level definitions
  const levels = [
    {
      id: 1,
      title: t('helloWorldTitle'),
      description: t('helloWorldDescription'),
      task: t('helloWorldTask'),
      starterCode: t('starterCodeComment'),
      expectedOutput: "Hello, World!",
      hint: t('helloWorldHint'),
      solution: "console.log('Hello, World!');"
    },
    {
      id: 2,
      title: t('variablesNumbersTitle'),
      description: t('variablesNumbersDescription'),
      task: t('variablesNumbersTask'),
      starterCode: t('createVariableComment'),
      expectedOutput: "25",
      hint: t('variablesNumbersHint'),
      solution: "let age = 25;\nconsole.log(age);"
    },
    {
      id: 3,
      title: t('stringVariablesTitle'),
      description: t('stringVariablesDescription'),
      task: t('stringVariablesTask'),
      starterCode: t('createStringComment'),
      expectedOutput: "Hello, JavaScript!",
      hint: t('stringVariablesHint'),
      solution: "let name = 'JavaScript';\nconsole.log(`Hello, ${name}!`);"
    },
    {
      id: 4,
      title: t('userInputTitle'),
      description: t('userInputDescription'),
      task: t('userInputTask'),
      starterCode: t('getUserInputComment'),
      expectedOutput: "Your favorite color is blue",
      hint: t('userInputHint'),
      solution: "let color = 'blue';\nconsole.log('Your favorite color is ' + color);"
    },
    {
      id: 5,
      title: t('basicMathTitle'),
      description: t('basicMathDescription'),
      task: t('basicMathTask'),
      starterCode: t('calculateSumComment'),
      expectedOutput: "42",
      hint: t('basicMathHint'),
      solution: "console.log(15 + 27);"
    },
    {
      id: 6,
      title: t('conditionalsTitle'),
      description: t('conditionalsDescription'),
      task: t('conditionalsTask'),
      starterCode: t('useIfStatementComment'),
      expectedOutput: "Yes, 10 is greater than 5",
      hint: t('conditionalsHint'),
      solution: "let number = 10;\nif (number > 5) {\n  console.log('Yes, 10 is greater than 5');\n}"
    },
    {
      id: 7,
      title: t('forLoopsTitle'),
      description: t('forLoopsDescription'),
      task: t('forLoopsTask'),
      starterCode: t('useForLoopComment'),
      expectedOutput: "1\n2\n3",
      hint: t('forLoopsHint'),
      solution: "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}"
    },
    {
      id: 8,
      title: t('whileLoopsTitle'),
      description: t('whileLoopsDescription'),
      task: t('whileLoopsTask'),
      starterCode: t('useWhileLoopComment'),
      expectedOutput: "1\n2\n3",
      hint: t('whileLoopsHint'),
      solution: "let count = 1;\nwhile (count <= 3) {\n  console.log(count);\n  count++;\n}"
    },
    {
      id: 9,
      title: t('listsBasicsTitle'),
      description: t('listsBasicsDescription'),
      task: t('listsBasicsTask'),
      starterCode: t('createListComment'),
      expectedOutput: "banana",
      hint: t('listsBasicsHint'),
      solution: "let fruits = ['apple', 'banana', 'orange'];\nconsole.log(fruits[1]);"
    },
    {
      id: 10,
      title: t('listOperationsTitle'),
      description: t('listOperationsDescription'),
      task: t('listOperationsTask'),
      starterCode: t('createListAddComment'),
      expectedOutput: "[1,2,3,4]",
      hint: t('listOperationsHint'),
      solution: "let numbers = [1, 2, 3];\nnumbers.push(4);\nconsole.log(numbers);"
    },
    {
      id: 11,
      title: t('functionsBasicsTitle'),
      description: t('functionsBasicsDescription'),
      task: t('functionsBasicsTask'),
      starterCode: t('defineFunctionComment'),
      expectedOutput: "Hello!",
      hint: t('functionsBasicsHint'),
      solution: "function greet() {\n  console.log('Hello!');\n}\n\ngreet();"
    },
    {
      id: 12,
      title: t('functionsParametersTitle'),
      description: t('functionsParametersDescription'),
      task: t('functionsParametersTask'),
      starterCode: t('functionParameterComment'),
      expectedOutput: "Hello, World!",
      hint: t('functionsParametersHint'),
      solution: "function sayHello(name) {\n  console.log(`Hello, ${name}!`);\n}\n\nsayHello('World');"
    },
    {
      id: 13,
      title: t('dictionariesTitle'),
      description: t('dictionariesDescription'),
      task: t('dictionariesTask'),
      starterCode: t('createDictionaryComment'),
      expectedOutput: "Alice",
      hint: t('dictionariesHint'),
      solution: "let person = {name: 'Alice', age: 30};\nconsole.log(person.name);"
    },
    {
      id: 14,
      title: t('stringMethodsTitle'),
      description: t('stringMethodsDescription'),
      task: t('stringMethodsTask'),
      starterCode: t('stringMethodsComment'),
      expectedOutput: "JAVASCRIPT PROGRAMMING",
      hint: t('stringMethodsHint'),
      solution: "let text = 'javascript programming';\nconsole.log(text.toUpperCase());"
    },
    {
      id: 15,
      title: t('finalChallengeTitle'),
      description: t('finalChallengeDescription'),
      task: t('finalChallengeTask'),
      starterCode: t('finalChallengeComment'),
      expectedOutput: "2\n4\n6\n8\n10",
      hint: t('finalChallengeHint'),
      solution: "let numbers = [1, 2, 3, 4, 5];\nfor (let i = 0; i < numbers.length; i++) {\n  console.log(numbers[i] * 2);\n}"
    }
  ];

  // Load saved progress from localStorage
  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('jslingo-progress');
      if (saved) {
        const data = JSON.parse(saved);
        return {
          completedLevels: new Set(data.completedLevels || []),
          streak: data.streak || 0,
          currentLevel: data.currentLevel || 1,
          lastPlayed: data.lastPlayed || null
        };
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    return {
      completedLevels: new Set(),
      streak: 0,
      currentLevel: 1,
      lastPlayed: null
    };
  };

  const savedProgress = loadProgress();

  // State management
  const [currentLevel, setCurrentLevel] = useState(savedProgress.currentLevel);
  const [userCode, setUserCode] = useState(levels[savedProgress.currentLevel - 1].starterCode);
  const [completedLevels, setCompletedLevels] = useState(savedProgress.completedLevels);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(savedProgress.streak);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return !localStorage.getItem('jslingo-hasSeenWelcome');
    } catch {
      return true;
    }
  });

  const handleStartLearning = () => {
    try {
      localStorage.setItem('jslingo-hasSeenWelcome', 'true');
    } catch (error) {
      console.error('Error saving welcome state:', error);
    }
    setShowWelcome(false);
  };

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const progressData = {
      completedLevels: Array.from(completedLevels),
      streak: streak,
      currentLevel: currentLevel,
      lastPlayed: new Date().toISOString()
    };
    localStorage.setItem('jslingo-progress', JSON.stringify(progressData));
  }, [completedLevels, streak, currentLevel]);

  // Update user code when level changes
  useEffect(() => {
    const level = levels.find(l => l.id === currentLevel);
    setUserCode(level.starterCode);
    setShowHint(false);
    setFeedback(null);
  }, [currentLevel]);

  // Secure sandboxed code execution using iframe isolation
  const executeCode = (code) => {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.sandbox = 'allow-scripts'; // No same-origin = complete isolation
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const timeoutId = setTimeout(() => {
        cleanup();
        resolve('Error: Execution timed out (infinite loop?)');
      }, 5000);

      const cleanup = () => {
        window.removeEventListener('message', onMessage);
        iframe.remove();
      };

      const onMessage = (e) => {
        if (e.source !== iframe.contentWindow) return;
        clearTimeout(timeoutId);
        cleanup();
        resolve(e.data.error ? 'Error: ' + e.data.error : e.data.output);
      };

      window.addEventListener('message', onMessage);

      iframe.srcdoc = `<!DOCTYPE html><script>
        // Block dangerous APIs
        ['localStorage','sessionStorage','indexedDB','fetch','XMLHttpRequest','WebSocket','Worker'].forEach(k => delete window[k]);
        window.open = window.alert = window.confirm = window.prompt = () => {};

        const logs = [];
        console.log = (...args) => logs.push(args.map(a =>
          Array.isArray(a) ? JSON.stringify(a).replace(/\\s/g,'') : String(a)
        ).join(' '));

        try {
          ${code.replace(/<\/script>/gi, '<\\/script>')}
          parent.postMessage({ output: logs.join('\\n') }, '*');
        } catch(e) {
          parent.postMessage({ error: e.message }, '*');
        }
      <\/script>`;
    });
  };

  const handleSubmit = async () => {
    const level = levels.find(l => l.id === currentLevel);
    
    // Set loading state
    setFeedback({
      type: 'loading',
      message: t('evaluatingCode')
    });

    try {
      const prompt = `
You are evaluating JavaScript code submissions for a learning platform. Compare the user's code with the expected solution to determine if they are functionally equivalent.

Task: ${level.task}
Expected Output: ${level.expectedOutput}

User's Code:
${userCode}

Expected Solution:
${level.solution}

Evaluate if the user's code will produce the same output as the expected solution. Consider:
1. Does the user's code accomplish the same task?
2. Will it produce the exact same output?
3. Are there any syntax errors?
4. Does it follow reasonable JavaScript practices?

Please respond in ${locale} language.

Respond ONLY with a valid JSON object in this exact format:
{
  "isCorrect": true/false,
  "explanation": "Brief explanation of why the code is correct or incorrect",
  "feedback": "Constructive feedback for the learner",
  "outputMatches": true/false
}

DO NOT OUTPUT ANYTHING OTHER THAN VALID JSON.
`;

      const response = await window.claude.complete(prompt);
      const evaluation = JSON.parse(response);

      if (evaluation.isCorrect) {
        setCompletedLevels(prev => new Set([...prev, currentLevel]));
        setStreak(prev => prev + 1);
        setFeedback({
          type: 'success',
          message: t('excellentComplete'),
          explanation: evaluation.feedback
        });
      } else {
        setStreak(0);
        setFeedback({
          type: 'error',
          message: t('notQuiteRight'),
          explanation: evaluation.feedback,
          hint: evaluation.explanation,
          expectedOutput: level.expectedOutput
        });
      }
    } catch (error) {
      console.error('Error evaluating code:', error);
      // Fallback to simple output comparison if Claude evaluation fails
      const output = await executeCode(userCode);
      const isCorrect = output.trim() === level.expectedOutput.trim();

      if (isCorrect) {
        setCompletedLevels(prev => new Set([...prev, currentLevel]));
        setStreak(prev => prev + 1);
        setFeedback({
          type: 'success',
          message: t('excellentComplete'),
          output: output
        });
      } else {
        setStreak(0);
        setFeedback({
          type: 'error',
          message: t('notQuiteRight'),
          output: output,
          expected: level.expectedOutput,
          explanation: level.hint
        });
      }
    }
  };

  const handleReset = () => {
    const level = levels.find(l => l.id === currentLevel);
    setUserCode(level.starterCode);
    setFeedback(null);
    setShowHint(false);
  };

  const resetAllProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('jslingo-progress');
      setCompletedLevels(new Set());
      setStreak(0);
      setCurrentLevel(1);
      setUserCode(levels[0].starterCode);
      setFeedback(null);
      setShowHint(false);
    }
  };

  const handleLevelChange = (levelId) => {
    // Only allow access to level 1 or completed levels or the next uncompleted level
    const maxUnlockedLevel = Math.max(1, Math.max(...Array.from(completedLevels)) + 1);
    if (levelId <= maxUnlockedLevel) {
      setCurrentLevel(levelId);
      setShowLevelSelector(false);
    }
  };

  const currentLevelData = levels.find(l => l.id === currentLevel);
  const progressPercentage = (completedLevels.size / levels.length) * 100;

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code className="w-12 h-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-blue-600">{t('appTitle')}</h1>
            </div>
            <p className="text-2xl text-gray-700 mb-2">{t('welcome.subtitle')}</p>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('welcome.intro')}</p>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              {t('welcome.whatYouLearn')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">{t('welcome.skill.variables')}</h3>
                <p className="text-sm text-gray-600">{t('welcome.skill.variablesDesc')}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Code className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">{t('welcome.skill.functions')}</h3>
                <p className="text-sm text-gray-600">{t('welcome.skill.functionsDesc')}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Repeat className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">{t('welcome.skill.loops')}</h3>
                <p className="text-sm text-gray-600">{t('welcome.skill.loopsDesc')}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Database className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">{t('welcome.skill.arrays')}</h3>
                <p className="text-sm text-gray-600">{t('welcome.skill.arraysDesc')}</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              {t('welcome.howItWorks')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex-1 text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-800">{t('welcome.step1')}</h3>
                <p className="text-sm text-gray-600">{t('welcome.step1Desc')}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
              <div className="flex-1 text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-800">{t('welcome.step2')}</h3>
                <p className="text-sm text-gray-600">{t('welcome.step2Desc')}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
              <div className="flex-1 text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-800">{t('welcome.step3')}</h3>
                <p className="text-sm text-gray-600">{t('welcome.step3Desc')}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              {t('welcome.features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3">
                <Trophy className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">{t('welcome.feature.progress')}</h3>
                  <p className="text-sm text-gray-600">{t('welcome.feature.progressDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3">
                <Flame className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">{t('welcome.feature.streaks')}</h3>
                  <p className="text-sm text-gray-600">{t('welcome.feature.streaksDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3">
                <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">{t('welcome.feature.hints')}</h3>
                  <p className="text-sm text-gray-600">{t('welcome.feature.hintsDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleStartLearning}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              {t('welcome.startButton')}
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-gray-500 mt-4">{t('welcome.levels')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-blue-600">{t('appTitle')}</h1>
              <div className="hidden md:flex items-center space-x-2 text-gray-600">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">{completedLevels.size}/{levels.length} {t('levelsProgress')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-orange-700">{streak}</span>
                <span className="text-orange-600 text-sm">{t('streakLabel')}</span>
              </div>
              
              <button
                onClick={resetAllProgress}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm"
                title="Reset all progress"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setShowLevelSelector(!showLevelSelector)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t('levelButton')} {currentLevel}
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{t('overallProgress')}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Level Selector Modal */}
      {showLevelSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{t('selectLevel')}</h2>
                <button
                  onClick={() => setShowLevelSelector(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  {t('closeButton')}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {levels.map((level) => {
                  const isCompleted = completedLevels.has(level.id);
                  const isLocked = level.id > Math.max(1, Math.max(...Array.from(completedLevels)) + 1);
                  const isCurrentLevel = level.id === currentLevel;
                  
                  return (
                    <button
                      key={level.id}
                      onClick={() => !isLocked && handleLevelChange(level.id)}
                      disabled={isLocked}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isCurrentLevel
                          ? 'border-blue-500 bg-blue-50'
                          : isCompleted
                          ? 'border-green-500 bg-green-50 hover:bg-green-100'
                          : isLocked
                          ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                          : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-gray-600">{t('levelButton')} {level.id}</span>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : null}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{level.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{level.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {t('levelButton')} {currentLevel}: {currentLevelData.title}
                </h2>
                {completedLevels.has(currentLevel) && (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{currentLevelData.description}</p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-blue-800 mb-2">{t('taskLabel')}</h3>
                <p className="text-blue-700">{currentLevelData.task}</p>
              </div>
            </div>

            {/* Hint Section */}
            <div className="mb-6">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                <Lightbulb className="w-5 h-5" />
                <span className="font-medium">
                  {showHint ? t('hideHint') : t('showHint')}
                </span>
              </button>
              
              {showHint && (
                <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-yellow-800">{currentLevelData.hint}</p>
                </div>
              )}
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`p-4 rounded-lg mb-6 ${
                feedback.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : feedback.type === 'loading'
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-medium mb-2 ${
                  feedback.type === 'success' 
                    ? 'text-green-800' 
                    : feedback.type === 'loading'
                    ? 'text-blue-800'
                    : 'text-red-800'
                }`}>
                  {feedback.message}
                </p>
                
                {feedback.explanation && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-700">{feedback.explanation}</p>
                  </div>
                )}
                
                {feedback.output && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-1">{t('yourOutput')}</p>
                    <pre className="bg-gray-100 p-2 rounded text-sm font-mono">{feedback.output}</pre>
                  </div>
                )}
                
                {feedback.expected && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-1">{t('expectedOutput')}</p>
                    <pre className="bg-gray-100 p-2 rounded text-sm font-mono">{feedback.expected}</pre>
                  </div>
                )}
                
                {feedback.hint && feedback.type === 'error' && (
                  <div className="mt-3 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800"><strong>{t('tipLabel')}</strong> {feedback.hint}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold">JavaScript Code Editor</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t('resetButton')}</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-1 bg-green-600 hover:bg-green-500 px-3 py-1 rounded transition-colors text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>{t('runCodeButton')}</span>
                </button>
              </div>
            </div>
            
            <div className="p-0">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 border-0 resize-none focus:outline-none focus:ring-0"
                placeholder={t('codeEditorPlaceholder')}
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => currentLevel > 1 && handleLevelChange(currentLevel - 1)}
            disabled={currentLevel === 1}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('previousLevel')}
          </button>
          
          <div className="text-center">
            <p className="text-gray-600">
              {t('levelOf').replace('{current}', currentLevel).replace('{total}', levels.length)}
            </p>
          </div>
          
          <button
            onClick={() => {
              if (completedLevels.has(currentLevel) && currentLevel < levels.length) {
                handleLevelChange(currentLevel + 1);
              }
            }}
            disabled={!completedLevels.has(currentLevel) || currentLevel === levels.length}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('nextLevel')}
          </button>
        </div>
      </main>
    </div>
  );
};

export default JSLingo;