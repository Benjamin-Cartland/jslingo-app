import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Lightbulb, CheckCircle, Lock, Trophy, Flame } from 'lucide-react';

const TRANSLATIONS = {
  "en-US": {
    "helloWorldTitle": "Hello World",
    "helloWorldDescription": "Welcome to JavaScript! Let's start with the traditional first program.",
    "helloWorldTask": "Write a program that prints 'Hello, World!' to the console.",
    "helloWorldHint": "Use the console.log() function with the text in quotes: console.log('Hello, World!');",
    "variablesNumbersTitle": "Variables and Numbers",
    "variablesNumbersDescription": "Learn to store and work with numbers using variables.",
    "variablesNumbersTask": "Create a variable called 'age' with value 25, then print it.",
    "variablesNumbersHint": "Create a variable: let age = 25; then log it: console.log(age);",
    "stringVariablesTitle": "String Variables",
    "stringVariablesDescription": "Work with text data using string variables.",
    "stringVariablesTask": "Create a variable called 'name' with your name, then print 'Hello, [name]!'",
    "stringVariablesHint": "Use template literals: console.log(`Hello, ${name}!`);",
    "userInputTitle": "User Input",
    "userInputDescription": "Learn to work with variables and output.",
    "userInputTask": "Create a variable 'color' with value 'blue' and print 'Your favorite color is [color]'",
    "userInputHint": "Use template literals: let color = 'blue'; console.log(`Your favorite color is ${color}`);",
    "basicMathTitle": "Basic Math",
    "basicMathDescription": "Perform mathematical operations in JavaScript.",
    "basicMathTask": "Calculate 15 + 27 and print the result.",
    "basicMathHint": "Use the + operator: console.log(15 + 27);",
    "conditionalsTitle": "Conditionals",
    "conditionalsDescription": "Make decisions in your code with if statements.",
    "conditionalsTask": "Check if the number 10 is greater than 5. If true, print 'Yes, 10 is greater than 5'",
    "conditionalsHint": "Use if statement with curly braces: if (number > 5) { console.log('Yes, 10 is greater than 5'); }",
    "forLoopsTitle": "For Loops",
    "forLoopsDescription": "Repeat actions using for loops.",
    "forLoopsTask": "Print numbers from 1 to 3 using a for loop.",
    "forLoopsHint": "Use a for loop: for (let i = 1; i <= 3; i++) { console.log(i); }",
    "whileLoopsTitle": "While Loops",
    "whileLoopsDescription": "Use while loops for conditional repetition.",
    "whileLoopsTask": "Print numbers from 1 to 3 using a while loop.",
    "whileLoopsHint": "Increment count each iteration: while (count <= 3) { console.log(count); count++; }",
    "listsBasicsTitle": "Arrays Basics",
    "listsBasicsDescription": "Store multiple items in arrays.",
    "listsBasicsTask": "Create an array with fruits ['apple', 'banana', 'orange'] and print the second item.",
    "listsBasicsHint": "Arrays use zero-based indexing: fruits[1] gets the second item",
    "listOperationsTitle": "Array Operations",
    "listOperationsDescription": "Add and modify array items.",
    "listOperationsTask": "Create an array [1, 2, 3], add the number 4, then print the entire array.",
    "listOperationsHint": "Use push() method: numbers.push(4); then console.log(numbers);",
    "functionsBasicsTitle": "Functions Basics",
    "functionsBasicsDescription": "Create reusable code with functions.",
    "functionsBasicsTask": "Define a function called 'greet' that prints 'Hello!' and then call it.",
    "functionsBasicsHint": "Use function keyword: function greet() { console.log('Hello!'); } then call greet();",
    "functionsParametersTitle": "Functions with Parameters",
    "functionsParametersDescription": "Pass data to functions using parameters.",
    "functionsParametersTask": "Create a function 'sayHello' that takes a name parameter and prints 'Hello, [name]!'. Call it with 'World'.",
    "functionsParametersHint": "function sayHello(name) { console.log(`Hello, ${name}!`); } then call sayHello('World');",
    "dictionariesTitle": "Objects",
    "dictionariesDescription": "Store key-value pairs using objects.",
    "dictionariesTask": "Create an object with person info: name='Alice', age=30. Print the name.",
    "dictionariesHint": "Use curly braces: let person = {name: 'Alice', age: 30}; access with person.name",
    "stringMethodsTitle": "String Methods",
    "stringMethodsDescription": "Manipulate strings with built-in methods.",
    "stringMethodsTask": "Take the string 'javascript programming' and print it in uppercase.",
    "stringMethodsHint": "Use the toUpperCase() method: text.toUpperCase();",
    "finalChallengeTitle": "Final Challenge",
    "finalChallengeDescription": "Combine everything you've learned!",
    "finalChallengeTask": "Create an array of numbers [1,2,3,4,5], use a for...of loop to print each number multiplied by 2.",
    "finalChallengeHint": "Loop through the array: for (let num of numbers) { console.log(num * 2); }",
    "starterCodeComment": "// Write your code here\n",
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
    "tipLabel": "Tip:"
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
      solution: "let color = 'blue';\nconsole.log(`Your favorite color is ${color}`);"
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
      solution: "let numbers = [1, 2, 3, 4, 5];\nfor (let num of numbers) {\n  console.log(num * 2);\n}"
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

  // Simple code execution simulation
  const executeCode = (code) => {
    try {
      // Capture console.log output
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(arg => {
          if (Array.isArray(arg)) {
            return JSON.stringify(arg).replace(/\s/g, '');
          }
          return String(arg);
        }).join(' '));
      };

      // Execute the code
      eval(code);

      // Restore console.log
      console.log = originalLog;

      return logs.join('\n');
    } catch (error) {
      return "Error: " + error.message;
    }
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
      const output = executeCode(userCode);
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