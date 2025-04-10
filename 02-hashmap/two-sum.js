/**
 * @file two-sum.js
 * @description Implementation of the Two Sum problem
 * @problem LeetCode 1: https://leetcode.com/problems/two-sum
 */

/**
 * Find two numbers in an array that add up to a target value
 * 
 * The approach:
 * 1. Use a hashmap to store numbers we've seen and their indices
 * 2. For each number, check if its complement (target - num) is in the map
 * 3. If found, return the current index and the stored index
 * 
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[]} - Indices of the two numbers that add up to target
 */
function twoSum(nums, target) {
   // Map to store numbers we've seen so far and their indices
   const seen = new Map();

   for (let i = 0; i < nums.length; i++) {
      // Calculate what number we need to find
      const complement = target - nums[ i ];

      // Check if we've seen the complement before
      if (seen.has(complement)) {
         // Found the pair! Return both indices
         return [ seen.get(complement), i ];
      }

      // Store current number and its index for future lookups
      seen.set(nums[ i ], i);
   }

   // No solution found (problem states there is always exactly one solution)
   return [];
}

/**
 * Alternative brute force solution - O(n²)
 * Included to demonstrate the efficiency gain from using a HashMap
 * 
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[]} - Indices of the two numbers that add up to target
 */
function twoSumBruteForce(nums, target) {
   for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
         if (nums[ i ] + nums[ j ] === target) {
            return [ i, j ];
         }
      }
   }
   return [];
}

// Export both implementations
module.exports = {
   twoSum,
   twoSumBruteForce
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      { nums: [ 2, 7, 11, 15 ], target: 9, expected: [ 0, 1 ] },
      { nums: [ 3, 2, 4 ], target: 6, expected: [ 1, 2 ] },
      { nums: [ 3, 3 ], target: 6, expected: [ 0, 1 ] },
      { nums: [ -1, -2, -3, -4, -5 ], target: -8, expected: [ 2, 4 ] }
   ];

   let allPassed = true;

   // Test hashmap solution
   console.log("Testing HashMap solution:");
   for (const { nums, target, expected } of testCases) {
      const result = twoSum([ ...nums ], target);
      // Check if arrays have the same elements (order might differ but both valid)
      const passed = result.length === expected.length &&
         result.every(val => expected.includes(val));

      console.log(
         `Input: nums = [${nums}], target = ${target}`,
         `| Output: [${result}]`,
         `| Expected: [${expected}]`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test brute force solution
   console.log("\nTesting Brute Force solution:");
   for (const { nums, target, expected } of testCases) {
      const result = twoSumBruteForce([ ...nums ], target);
      // Check if arrays have the same elements (order might differ but both valid)
      const passed = result.length === expected.length &&
         result.every(val => expected.includes(val));

      console.log(
         `Input: nums = [${nums}], target = ${target}`,
         `| Output: [${result}]`,
         `| Expected: [${expected}]`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison
   console.log("\nPerformance comparison:");
   const largeArray = Array.from({ length: 10000 }, (_, i) => i);
   const target = 19990; // Sum of indices 9990 + 10000
   largeArray.push(target - 9990);

   console.time("HashMap solution");
   twoSum(largeArray, target);
   console.timeEnd("HashMap solution");

   console.time("Brute force solution");
   twoSumBruteForce(largeArray, target);
   console.timeEnd("Brute force solution");
}

// Uncomment to run tests
// runTests();