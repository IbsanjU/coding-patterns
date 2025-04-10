/**
 * @file valid-parentheses.js
 * @description Implementation of validating parentheses
 * @problem LeetCode 20: https://leetcode.com/problems/valid-parentheses/
 */

/**
 * Determines if a string of brackets is valid
 * Valid means every opening bracket has a matching closing bracket in the correct order
 * 
 * The approach:
 * 1. Use a stack to keep track of opening brackets
 * 2. When encountering a closing bracket, check if it matches the most recent opening bracket
 * 3. The string is valid only if all brackets are matched
 * 
 * @param {string} s - String containing only brackets: '(', ')', '{', '}', '[', ']'
 * @return {boolean} - Whether the string is valid
 */
function isValid(s) {
   const stack = [];
   const pairs = {
      ')': '(',
      '}': '{',
      ']': '['
   };

   for (const char of s) {
      if (char === '(' || char === '{' || char === '[') {
         // Push opening brackets onto stack
         stack.push(char);
      } else {
         // For closing brackets, check if it matches the most recent opening bracket
         const lastBracket = stack.pop();

         // If stack is empty or brackets don't match
         if (lastBracket !== pairs[ char ]) {
            return false;
         }
      }
   }

   // Valid only if all brackets were matched (stack is empty)
   return stack.length === 0;
}

/**
 * Alternative implementation using a Map for bracket pairs
 * 
 * @param {string} s - String containing only brackets
 * @return {boolean} - Whether the string is valid
 */
function isValidMap(s) {
   const stack = [];
   const bracketMap = new Map([
      [ '(', ')' ],
      [ '{', '}' ],
      [ '[', ']' ]
   ]);

   for (const char of s) {
      if (bracketMap.has(char)) {
         // It's an opening bracket
         stack.push(char);
      } else {
         // It's a closing bracket
         if (stack.length === 0) {
            return false; // No matching opening bracket
         }

         const lastBracket = stack.pop();
         if (bracketMap.get(lastBracket) !== char) {
            return false; // Mismatched brackets
         }
      }
   }

   return stack.length === 0;
}

// Export both implementations
module.exports = {
   isValid,
   isValidMap
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      { s: "()", expected: true },
      { s: "()[]{}", expected: true },
      { s: "(]", expected: false },
      { s: "([)]", expected: false },
      { s: "{[]}", expected: true },
      { s: "", expected: true },
      { s: "((", expected: false },
      { s: "){", expected: false }
   ];

   let allPassed = true;

   // Test object-based implementation
   console.log("Testing Object-Based Implementation:");
   for (const { s, expected } of testCases) {
      const result = isValid(s);
      const passed = result === expected;

      console.log(
         `Input: "${s}"`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test Map-based implementation
   console.log("\nTesting Map-Based Implementation:");
   for (const { s, expected } of testCases) {
      const result = isValidMap(s);
      const passed = result === expected;

      console.log(
         `Input: "${s}"`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison
   console.log("\nPerformance comparison:");
   // Generate a large valid string with nested brackets
   const generateLargeValidString = (depth) => {
      let result = '';
      for (let i = 0; i < depth; i++) {
         result += '({[';
      }
      for (let i = 0; i < depth; i++) {
         result += ']})';
      }
      return result;
   };

   const largeValidString = generateLargeValidString(10000);

   console.time("Object-based implementation");
   isValid(largeValidString);
   console.timeEnd("Object-based implementation");

   console.time("Map-based implementation");
   isValidMap(largeValidString);
   console.timeEnd("Map-based implementation");

   // Visualize the stack operations
   console.log("\nVisualizing stack operations for \"{[()]}\":");
   visualizeStackOperations("{[()]}");
}

/**
 * Helper function to visualize stack operations
 */
function visualizeStackOperations(s) {
   const stack = [];
   const pairs = {
      ')': '(',
      '}': '{',
      ']': '['
   };

   console.log(`Input: "${s}"`);
   console.log("Step-by-step stack operations:");

   for (let i = 0; i < s.length; i++) {
      const char = s[ i ];
      console.log(`\nProcessing character: '${char}' (position ${i})`);

      if (char === '(' || char === '{' || char === '[') {
         console.log(`  '${char}' is an opening bracket, pushing to stack`);
         stack.push(char);
      } else {
         console.log(`  '${char}' is a closing bracket, checking for match`);

         if (stack.length === 0) {
            console.log(`  ❌ Stack is empty, no matching opening bracket found!`);
            return false;
         }

         const lastBracket = stack.pop();
         console.log(`  Popped '${lastBracket}' from stack`);

         if (lastBracket !== pairs[ char ]) {
            console.log(`  ❌ Mismatch! Expected '${pairs[ char ]}', but got '${lastBracket}'`);
            return false;
         } else {
            console.log(`  ✅ Match found! '${lastBracket}' pairs with '${char}'`);
         }
      }

      console.log(`  Current stack: [${stack.join(', ')}]`);
   }

   if (stack.length === 0) {
      console.log("\n✅ Final stack is empty, all brackets are matched! String is valid.");
      return true;
   } else {
      console.log(`\n❌ Final stack still has elements [${stack.join(', ')}], some opening brackets weren't closed!`);
      return false;
   }
}

// Uncomment to run tests
// runTests();