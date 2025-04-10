/**
 * @file permutations.js
 * @description Implementation of generating all permutations of an array
 * @problem LeetCode 46: https://leetcode.com/problems/permutations/
 */

/**
 * Generates all possible permutations of a distinct integer array
 * 
 * The approach:
 * 1. Use backtracking to build permutations one element at a time
 * 2. For each position, try each remaining number
 * 3. Recursively explore and backtrack to build all permutations
 * 
 * @param {number[]} nums - Array of distinct integers
 * @return {number[][]} - All possible permutations
 */
function permute(nums) {
   const result = [];

   // Helper function for backtracking
   function backtrack(current, remaining) {
      // If no numbers remaining, we have a complete permutation
      if (remaining.length === 0) {
         result.push([ ...current ]);
         return;
      }

      // Try each remaining number as the next in sequence
      for (let i = 0; i < remaining.length; i++) {
         // Choose one number
         current.push(remaining[ i ]);

         // Explore with this choice
         const newRemaining = [ ...remaining.slice(0, i), ...remaining.slice(i + 1) ];
         backtrack(current, newRemaining);

         // Undo the choice (backtrack)
         current.pop();
      }
   }

   backtrack([], nums);
   return result;
}

/**
 * Alternative implementation using swapping
 * This is more space-efficient as it doesn't create new arrays for remaining elements
 * 
 * @param {number[]} nums - Array of distinct integers
 * @return {number[][]} - All possible permutations
 */
function permuteSwap(nums) {
   const result = [];

   // Helper function for backtracking with swapping
   function backtrack(start) {
      // If we've reached the end of the array, add the current permutation
      if (start === nums.length) {
         result.push([ ...nums ]);
         return;
      }

      // Try each element as the next position
      for (let i = start; i < nums.length; i++) {
         // Swap elements to place nums[i] at position start
         [ nums[ start ], nums[ i ] ] = [ nums[ i ], nums[ start ] ];

         // Explore with this choice
         backtrack(start + 1);

         // Undo the swap (backtrack)
         [ nums[ start ], nums[ i ] ] = [ nums[ i ], nums[ start ] ];
      }
   }

   backtrack(0);
   return result;
}

// Export both implementations
module.exports = {
   permute,
   permuteSwap
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      {
         nums: [ 1, 2, 3 ],
         expected: [
            [ 1, 2, 3 ], [ 1, 3, 2 ], [ 2, 1, 3 ],
            [ 2, 3, 1 ], [ 3, 1, 2 ], [ 3, 2, 1 ]
         ]
      },
      { nums: [ 0, 1 ], expected: [ [ 0, 1 ], [ 1, 0 ] ] },
      { nums: [ 1 ], expected: [ [ 1 ] ] }
   ];

   let allPassed = true;

   // Helper function to check if two sets of permutations match
   function permutationsMatch(actual, expected) {
      if (actual.length !== expected.length) return false;

      // Convert arrays to strings for easier comparison
      const actualStrings = actual.map(arr => JSON.stringify(arr)).sort();
      const expectedStrings = expected.map(arr => JSON.stringify(arr)).sort();

      for (let i = 0; i < actualStrings.length; i++) {
         if (actualStrings[ i ] !== expectedStrings[ i ]) return false;
      }

      return true;
   }

   // Test standard implementation
   console.log("Testing Standard Implementation:");
   for (const { nums, expected } of testCases) {
      const result = permute([ ...nums ]); // Create a copy to avoid modifying original
      const passed = permutationsMatch(result, expected);

      console.log(
         `Input: nums = [${nums}]`,
         `\nOutput: ${formatPermutations(result)}`,
         `\nExpected: ${formatPermutations(expected)}`,
         `\n${passed ? '✅ PASS' : '❌ FAIL'}\n`
      );

      if (!passed) allPassed = false;
   }

   // Test swap implementation
   console.log("\nTesting Swap Implementation:");
   for (const { nums, expected } of testCases) {
      const result = permuteSwap([ ...nums ]); // Create a copy to avoid modifying original
      const passed = permutationsMatch(result, expected);

      console.log(
         `Input: nums = [${nums}]`,
         `\nOutput: ${formatPermutations(result)}`,
         `\nExpected: ${formatPermutations(expected)}`,
         `\n${passed ? '✅ PASS' : '❌ FAIL'}\n`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison
   console.log("\nPerformance comparison:");
   const largeArray = Array.from({ length: 9 }, (_, i) => i + 1); // [1,2,3,4,5,6,7,8,9]

   console.time("Standard implementation");
   const standardResult = permute([ ...largeArray ]);
   console.timeEnd("Standard implementation");
   console.log(`Generated ${standardResult.length} permutations`);

   console.time("Swap implementation");
   const swapResult = permuteSwap([ ...largeArray ]);
   console.timeEnd("Swap implementation");
   console.log(`Generated ${swapResult.length} permutations`);

   // Visualize the backtracking process for a small example
   console.log("\nVisualizing Backtracking Process for [1, 2]:");
   visualizeBacktracking([ 1, 2 ]);
}

/**
 * Helper function to format permutations for display
 */
function formatPermutations(perms) {
   if (perms.length <= 6) {
      return `[\n    ${perms.map(p => `[${p}]`).join(',\n    ')}\n  ]`;
   } else {
      const shown = perms.slice(0, 6);
      return `[\n    ${shown.map(p => `[${p}]`).join(',\n    ')}\n    ... (${perms.length - 6} more)\n  ]`;
   }
}

/**
 * Helper function to visualize the backtracking process
 */
function visualizeBacktracking(nums) {
   let steps = [];
   let stepCount = 1;

   function backtrack(current, remaining, indent) {
      steps.push(`${indent}Step ${stepCount}: current=[${current}], remaining=[${remaining}]`);
      stepCount++;

      // Base case
      if (remaining.length === 0) {
         steps.push(`${indent}✅ Complete permutation found: [${current}]`);
         return;
      }

      // Try each remaining number
      for (let i = 0; i < remaining.length; i++) {
         const num = remaining[ i ];
         steps.push(`${indent}Try ${num} at position ${current.length}`);

         // Choose
         current.push(num);
         steps.push(`${indent}  After choosing: current=[${current}]`);

         // Explore
         const newRemaining = [ ...remaining.slice(0, i), ...remaining.slice(i + 1) ];
         backtrack(current, newRemaining, indent + "  ");

         // Unchoose (backtrack)
         current.pop();
         steps.push(`${indent}  Backtrack: remove ${num}, current=[${current}]`);
      }
   }

   backtrack([], nums, "");
   console.log(steps.join('\n'));
}

// Uncomment to run tests
// runTests();