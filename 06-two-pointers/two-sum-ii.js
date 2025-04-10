/**
 * @file two-sum-ii.js
 * @description Implementation of Two Sum II - Input Array Is Sorted
 * @problem LeetCode 167: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 */

/**
 * Find two numbers in a sorted array that add up to a target value
 * 
 * The approach:
 * 1. Use two pointers starting from both ends of the array
 * 2. Move pointers based on sum comparison with target
 * 3. Return 1-indexed positions when target is found
 * 
 * @param {number[]} numbers - Sorted array of integers (ascending order)
 * @param {number} target - Target sum
 * @return {number[]} - 1-indexed positions of the two numbers
 */
function twoSum(numbers, target) {
   let left = 0;
   let right = numbers.length - 1;

   while (left < right) {
      const sum = numbers[ left ] + numbers[ right ];

      if (sum === target) {
         // Found the pair! Return 1-indexed positions
         return [ left + 1, right + 1 ];
      } else if (sum < target) {
         // Sum too small, move left pointer to increase the sum
         left++;
      } else {
         // Sum too large, move right pointer to decrease the sum
         right--;
      }
   }

   // No solution found (problem states there is exactly one solution)
   return [ -1, -1 ];
}

/**
 * Alternative implementation using binary search
 * This is O(n log n) vs O(n) for the two pointers approach
 * 
 * @param {number[]} numbers - Sorted array of integers
 * @param {number} target - Target sum
 * @return {number[]} - 1-indexed positions of the two numbers
 */
function twoSumBinarySearch(numbers, target) {
   for (let i = 0; i < numbers.length; i++) {
      // For each number, search for its complement using binary search
      const complement = target - numbers[ i ];

      // Binary search for complement (starting from i+1 to avoid using same element)
      let left = i + 1;
      let right = numbers.length - 1;

      while (left <= right) {
         const mid = Math.floor((left + right) / 2);

         if (numbers[ mid ] === complement) {
            // Found the complement, return both indices (1-indexed)
            return [ i + 1, mid + 1 ];
         } else if (numbers[ mid ] < complement) {
            left = mid + 1;
         } else {
            right = mid - 1;
         }
      }
   }

   return [ -1, -1 ]; // Not found
}

// Export both implementations
module.exports = {
   twoSum,
   twoSumBinarySearch
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      { numbers: [ 2, 7, 11, 15 ], target: 9, expected: [ 1, 2 ] },
      { numbers: [ 2, 3, 4 ], target: 6, expected: [ 1, 3 ] },
      { numbers: [ -1, 0 ], target: -1, expected: [ 1, 2 ] },
      { numbers: [ 0, 0, 3, 4 ], target: 0, expected: [ 1, 2 ] },
      { numbers: [ 5, 25, 75 ], target: 100, expected: [ 2, 3 ] }
   ];

   let allPassed = true;

   // Test two pointers solution
   console.log("Testing Two Pointers solution:");
   for (const { numbers, target, expected } of testCases) {
      const result = twoSum([ ...numbers ], target);
      const passed = arraysEqual(result, expected);

      console.log(
         `Input: numbers = [${numbers}], target = ${target}`,
         `| Output: [${result}]`,
         `| Expected: [${expected}]`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test binary search solution
   console.log("\nTesting Binary Search solution:");
   for (const { numbers, target, expected } of testCases) {
      const result = twoSumBinarySearch([ ...numbers ], target);
      const passed = arraysEqual(result, expected);

      console.log(
         `Input: numbers = [${numbers}], target = ${target}`,
         `| Output: [${result}]`,
         `| Expected: [${expected}]`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison
   console.log("\nPerformance comparison:");
   const largeArray = Array.from({ length: 10000 }, (_, i) => i + 1); // Sorted array 1-10000
   const largeTarget = 19999; // Sum of 9999 + 10000

   console.time("Two Pointers solution");
   twoSum(largeArray, largeTarget);
   console.timeEnd("Two Pointers solution");

   console.time("Binary Search solution");
   twoSumBinarySearch(largeArray, largeTarget);
   console.timeEnd("Binary Search solution");

   // Visualize the two pointers approach
   console.log("\nVisualizing Two Pointers approach for [2, 7, 11, 15], target = 9:");
   visualizeTwoPointers([ 2, 7, 11, 15 ], 9);
}

/**
 * Helper function to check if two arrays are equal
 */
function arraysEqual(arr1, arr2) {
   if (arr1.length !== arr2.length) return false;

   for (let i = 0; i < arr1.length; i++) {
      if (arr1[ i ] !== arr2[ i ]) return false;
   }

   return true;
}

/**
 * Helper function to visualize the two pointers approach
 */
function visualizeTwoPointers(numbers, target) {
   let left = 0;
   let right = numbers.length - 1;
   let step = 1;

   console.log(`Starting with pointers at left=${left} (value=${numbers[ left ]}) and right=${right} (value=${numbers[ right ]})`);

   while (left < right) {
      const sum = numbers[ left ] + numbers[ right ];
      console.log(`\nStep ${step}: left=${left} (value=${numbers[ left ]}), right=${right} (value=${numbers[ right ]}), sum=${sum}`);

      if (sum === target) {
         console.log(`✅ Target found! Returning 1-indexed positions: [${left + 1}, ${right + 1}]`);
         return;
      } else if (sum < target) {
         console.log(`Sum ${sum} < target ${target}, moving left pointer to increase sum`);
         left++;
      } else {
         console.log(`Sum ${sum} > target ${target}, moving right pointer to decrease sum`);
         right--;
      }

      step++;
   }

   console.log("No solution found");
}

// Uncomment to run tests
// runTests();