/**
 * @file binary-search.js
 * @description Implementation of the Binary Search algorithm
 * @problem LeetCode 704: https://leetcode.com/problems/binary-search/
 */

/**
 * Performs binary search on a sorted array
 * 
 * The approach:
 * 1. Set left and right pointers to the array bounds
 * 2. Calculate middle position
 * 3. Compare middle element with target and adjust bounds accordingly
 * 4. Repeat until target is found or search space is empty
 * 
 * @param {number[]} nums - Sorted array of integers (ascending order)
 * @param {number} target - Value to search for
 * @return {number} - Index of target if found, -1 otherwise
 */
function search(nums, target) {
   let left = 0;
   let right = nums.length - 1;

   while (left <= right) {
      // Calculate middle index (avoiding integer overflow)
      const mid = left + Math.floor((right - left) / 2);

      if (nums[ mid ] === target) {
         return mid; // Found the target
      } else if (nums[ mid ] < target) {
         left = mid + 1; // Target is in the right half
      } else {
         right = mid - 1; // Target is in the left half
      }
   }

   return -1; // Target not found
}

/**
 * Recursive implementation of binary search
 * 
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Value to search for
 * @return {number} - Index of target if found, -1 otherwise
 */
function searchRecursive(nums, target) {
   // Helper function to perform recursive binary search
   function binarySearch(left, right) {
      // Base case: empty search space
      if (left > right) {
         return -1;
      }

      // Calculate middle index
      const mid = left + Math.floor((right - left) / 2);

      if (nums[ mid ] === target) {
         return mid; // Found the target
      } else if (nums[ mid ] < target) {
         return binarySearch(mid + 1, right); // Search right half
      } else {
         return binarySearch(left, mid - 1); // Search left half
      }
   }

   return binarySearch(0, nums.length - 1);
}

/**
 * Generic binary search function that can be adapted for different problems
 * 
 * @param {number} left - Left boundary of search space
 * @param {number} right - Right boundary of search space
 * @param {Function} condition - Function that determines search direction
 * @return {number} - The boundary where condition becomes true
 */
function binarySearchTemplate(left, right, condition) {
   while (left < right) {
      const mid = left + Math.floor((right - left) / 2);

      if (condition(mid)) {
         right = mid; // Look in the left half
      } else {
         left = mid + 1; // Look in the right half
      }
   }

   // At this point, left == right
   return condition(left) ? left : -1;
}

// Export all implementations
module.exports = {
   search,
   searchRecursive,
   binarySearchTemplate
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      { nums: [ -1, 0, 3, 5, 9, 12 ], target: 9, expected: 4 },
      { nums: [ -1, 0, 3, 5, 9, 12 ], target: 2, expected: -1 },
      { nums: [ 5 ], target: 5, expected: 0 },
      { nums: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], target: 10, expected: 9 },
      { nums: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], target: 1, expected: 0 },
      { nums: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], target: 11, expected: -1 }
   ];

   let allPassed = true;

   // Test iterative implementation
   console.log("Testing Iterative Binary Search:");
   for (const { nums, target, expected } of testCases) {
      const result = search(nums, target);
      const passed = result === expected;

      console.log(
         `Input: nums = [${nums}], target = ${target}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test recursive implementation
   console.log("\nTesting Recursive Binary Search:");
   for (const { nums, target, expected } of testCases) {
      const result = searchRecursive(nums, target);
      const passed = result === expected;

      console.log(
         `Input: nums = [${nums}], target = ${target}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test template-based implementation
   console.log("\nTesting Template-Based Binary Search:");
   for (const { nums, target, expected } of testCases) {
      // Using the template to find the first element >= target
      const result = binarySearchTemplate(0, nums.length - 1, mid => nums[ mid ] >= target);

      // Convert to match the expected output format
      const finalResult = (result !== -1 && nums[ result ] === target) ? result : -1;
      const passed = finalResult === expected;

      console.log(
         `Input: nums = [${nums}], target = ${target}`,
         `| Output: ${finalResult}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison
   console.log("\nPerformance comparison:");
   const largeArray = Array.from({ length: 10000000 }, (_, i) => i); // 10 million elements
   const largeTarget = 9876543;

   console.time("Iterative Binary Search");
   search(largeArray, largeTarget);
   console.timeEnd("Iterative Binary Search");

   console.time("Recursive Binary Search");
   searchRecursive(largeArray, largeTarget);
   console.timeEnd("Recursive Binary Search");

   // Visualize the binary search algorithm
   console.log("\nVisualizing Binary Search for [-1, 0, 3, 5, 9, 12], target = 9:");
   visualizeBinarySearch([ -1, 0, 3, 5, 9, 12 ], 9);
}

/**
 * Helper function to visualize the binary search algorithm
 */
function visualizeBinarySearch(nums, target) {
   let left = 0;
   let right = nums.length - 1;
   let step = 1;

   console.log(`Array: [${nums}], Target: ${target}`);
   console.log(`Initial search space: [${left}...${right}]`);

   while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      // Create a visual representation of the array with pointers
      const visual = nums.map((num, idx) => {
         if (idx === mid) return `[${num}]`; // Highlight mid
         if (idx === left && idx === right) return `{${num}}`; // Both left and right
         if (idx === left) return `{${num}`; // Left boundary
         if (idx === right) return `${num}}`; // Right boundary
         if (idx > left && idx < right) return ` ${num} `; // Within search space
         return ` ${num} `; // Outside search space
      }).join(' ');

      console.log(`\nStep ${step}: mid=${mid}, nums[mid]=${nums[ mid ]}`);
      console.log(visual);

      if (nums[ mid ] === target) {
         console.log(`✅ Target ${target} found at index ${mid}!`);
         return;
      } else if (nums[ mid ] < target) {
         console.log(`nums[mid]=${nums[ mid ]} < target=${target}, search right half`);
         left = mid + 1;
      } else {
         console.log(`nums[mid]=${nums[ mid ]} > target=${target}, search left half`);
         right = mid - 1;
      }

      console.log(`New search space: [${left}...${right}]`);
      step++;
   }

   console.log(`\n❌ Target ${target} not found in array`);
}

// Uncomment to run tests
// runTests();