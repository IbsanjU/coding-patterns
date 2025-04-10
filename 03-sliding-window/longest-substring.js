/**
 * @file longest-substring.js
 * @description Implementation of finding the longest substring without repeating characters
 * @problem LeetCode 3: https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */

/**
 * Find the length of the longest substring without repeating characters
 * 
 * The approach:
 * 1. Use a sliding window with variable size
 * 2. Track character positions in a Map
 * 3. When we encounter a repeated character, move window start just after the previous occurrence
 * 4. Update max length as we go
 * 
 * @param {string} s - Input string
 * @return {number} - Length of the longest substring without repeating characters
 */
function lengthOfLongestSubstring(s) {
   // Edge case
   if (!s) return 0;

   let maxLength = 0;
   let windowStart = 0;
   const charMap = new Map(); // Tracks character positions

   // Extend the window one character at a time
   for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
      const rightChar = s[ windowEnd ];

      // If we've seen this character before and it's inside our current window
      if (charMap.has(rightChar) && charMap.get(rightChar) >= windowStart) {
         // Move window start just past the previous occurrence
         windowStart = charMap.get(rightChar) + 1;
      }

      // Update character position
      charMap.set(rightChar, windowEnd);

      // Update maximum length found so far
      // Current window size is (windowEnd - windowStart + 1)
      maxLength = Math.max(maxLength, windowEnd - windowStart + 1);

      // Visual representation of the window for debugging
      // console.log(`Window: "${s.substring(windowStart, windowEnd + 1)}" [${windowStart}:${windowEnd}], Max: ${maxLength}`);
   }

   return maxLength;
}

/**
 * Alternative implementation using a Set for character tracking
 * This is slightly more concise but performs more window adjustments
 * 
 * @param {string} s - Input string
 * @return {number} - Length of the longest substring without repeating characters
 */
function lengthOfLongestSubstringSet(s) {
   let maxLength = 0;
   let windowStart = 0;
   const charSet = new Set(); // Tracks characters in current window

   for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
      const rightChar = s[ windowEnd ];

      // Contract window from the left until we remove the duplicate
      while (charSet.has(rightChar)) {
         charSet.delete(s[ windowStart ]);
         windowStart++;
      }

      // Add current character to set
      charSet.add(rightChar);

      // Update maximum length
      maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
   }

   return maxLength;
}

// Export both implementations
module.exports = {
   lengthOfLongestSubstring,
   lengthOfLongestSubstringSet
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      { input: "abcabcbb", expected: 3 },
      { input: "bbbbb", expected: 1 },
      { input: "pwwkew", expected: 3 },
      { input: "", expected: 0 },
      { input: "au", expected: 2 },
      { input: "dvdf", expected: 3 },
      { input: "anviaj", expected: 5 }
   ];

   let allPassed = true;

   // Test Map implementation
   console.log("Testing Map implementation:");
   for (const { input, expected } of testCases) {
      const result = lengthOfLongestSubstring(input);
      const passed = result === expected;

      console.log(
         `Input: "${input}"`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test Set implementation
   console.log("\nTesting Set implementation:");
   for (const { input, expected } of testCases) {
      const result = lengthOfLongestSubstringSet(input);
      const passed = result === expected;

      console.log(
         `Input: "${input}"`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison for large input
   console.log("\nPerformance comparison:");
   // Create string with some repetition patterns
   const largeString = Array(100000).fill('abcdefghijklmnopqrstuvwxyz').join('');

   console.time("Map implementation");
   lengthOfLongestSubstring(largeString);
   console.timeEnd("Map implementation");

   console.time("Set implementation");
   lengthOfLongestSubstringSet(largeString);
   console.timeEnd("Set implementation");

   // Visualize the sliding window for a simple example
   console.log("\nSliding window visualization for 'abcabcbb':");
   visualizeWindow("abcabcbb");
}

/**
 * Helper function to visualize the sliding window algorithm
 * This helps understand how the window expands and contracts
 */
function visualizeWindow(s) {
   let maxLength = 0;
   let windowStart = 0;
   const charMap = new Map();
   const steps = [];

   for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
      const rightChar = s[ windowEnd ];

      let action = "Expand";

      if (charMap.has(rightChar) && charMap.get(rightChar) >= windowStart) {
         const oldStart = windowStart;
         windowStart = charMap.get(rightChar) + 1;
         action = `Contract (found '${rightChar}' again)`;

         // Visualize removed characters
         const removed = s.substring(oldStart, windowStart);
         if (removed) {
            steps.push(`- Remove: '${removed}'`);
         }
      }

      charMap.set(rightChar, windowEnd);
      const currLength = windowEnd - windowStart + 1;
      maxLength = Math.max(maxLength, currLength);

      steps.push(
         `${action}: Add '${rightChar}' → Window: "${s.substring(windowStart, windowEnd + 1)}" [${windowStart}:${windowEnd}], Length: ${currLength}, Max: ${maxLength}`
      );
   }

   steps.forEach(step => console.log(step));
   console.log(`Final result: ${maxLength}`);
}

// Uncomment to run tests
// runTests();