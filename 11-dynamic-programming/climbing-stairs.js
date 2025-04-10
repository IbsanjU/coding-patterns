/**
 * Generate all possible ways to climb stairs using backtracking
 * This is for demonstration only and is not efficient for large n
 * 
 * @param {number} n - Number of steps
 * @return {number[][]} - All possible ways to climb (each array is a sequence of 1s and 2s)
 */
function generateAllWays(n) {
   const result = [];

   function backtrack(remaining, currentPath) {
      // Base cases
      if (remaining === 0) {
         result.push([ ...currentPath ]);
         return;
      }
      if (remaining < 0) {
         return;
      }

      // Take 1 step
      currentPath.push(1);
      backtrack(remaining - 1, currentPath);
      currentPath.pop();

      // Take 2 steps
      currentPath.push(2);
      backtrack(remaining - 2, currentPath);
      currentPath.pop();
   }

   backtrack(n, []);
   return result;
}

/**
 * Helper function to show the Fibonacci relationship
 */
function showFibonacciRelationship(n) {
   console.log("The climbing stairs problem follows the Fibonacci sequence starting from F(1) = 1, F(2) = 2:");

   const fib = [ 1, 1, 2 ];
   console.log(`n = 1: ${fib[ 1 ]} way`);
   console.log(`n = 2: ${fib[ 2 ]} ways`);

   for (let i = 3; i <= n; i++) {
      fib[ i ] = fib[ i - 1 ] + fib[ i - 2 ];
      console.log(`n = ${i}: ${fib[ i ]} ways = ${fib[ i - 1 ]} + ${fib[ i - 2 ]}`);
   }

   console.log("\nThis matches the Fibonacci sequence (shifted by 1):");
   console.log(`Fibonacci: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...`);
   console.log(`Stairs:     -, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...`);
}

// Enhance visualizeDP function with more visual elements
function visualizeDP(n) {
   console.log(`Calculating ways to climb ${n} stairs:`);

   // Initialize DP array with base cases
   const dp = new Array(n + 1);
   dp[ 0 ] = 1; // By convention (useful for the recurrence)
   dp[ 1 ] = 1; // One way to climb 1 stair

   console.log(`dp[0] = 1 (base case)`);
   console.log(`dp[1] = 1 (base case - one way to climb 1 stair)`);

   if (n >= 2) {
      dp[ 2 ] = 2;
      console.log(`dp[2] = 2 (base case - two ways to climb 2 stairs: [1,1] or [2])`);
   }

   // Build up the solution
   for (let i = 3; i <= n; i++) {
      dp[ i ] = dp[ i - 1 ] + dp[ i - 2 ];
      console.log(`dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[ i - 1 ]} + ${dp[ i - 2 ]} = ${dp[ i ]}`);
   }

   // Create a visual representation
   console.log("\nVisual representation of DP array:");
   let header = "Index: ";
   let values = "Value: ";

   for (let i = 0; i <= n; i++) {
      header += `${i.toString().padStart(4)}`;
      values += `${dp[ i ].toString().padStart(4)}`;
   }

   console.log(header);
   console.log("-".repeat(header.length));
   console.log(values);

   // Show all the ways for n = 5 as an example
   if (n === 5) {
      console.log("\nAll ways to climb 5 stairs:");
      const ways = generateAllWays(5);
      ways.forEach((way, index) => {
         console.log(`${index + 1}. Take steps: [${way.join(', ')}]`);
      });
   } else {
      // For other values of n, show hardcoded solutions for n=5 as an example
      console.log("\nFor reference, here are all ways to climb 5 stairs:");
      console.log("1. [1, 1, 1, 1, 1]");
      console.log("2. [1, 1, 1, 2]");
      console.log("3. [1, 1, 2, 1]");
      console.log("4. [1, 2, 1, 1]");
      console.log("5. [2, 1, 1, 1]");
      console.log("6. [1, 2, 2]");
      console.log("7. [2, 1, 2]");
      console.log("8. [2, 2, 1]");
   }

   // Add a simple staircase visualization
   console.log("\nStaircase visualization:");
   for (let i = 0; i <= n; i++) {
      let stairs = "";
      for (let j = 0; j < i; j++) {
         stairs += "[]";
      }
      const waysCount = i <= 2 ? i : dp[ i ];
      console.log(`${stairs}${i > 0 ? "🏁" : ""} Step ${i}: ${waysCount} ways`);
   }
}

// Don't forget to add the new functions to the exports
module.exports = {
   climbStairs,
   climbStairsOptimized,
   climbStairsTopDown,
   generateAllWays,
   visualizeDP,
   showFibonacciRelationship
};

// Enhanced test function to include the new features
function runTests() {
   const testCases = [
      { n: 1, expected: 1 },
      { n: 2, expected: 2 },
      { n: 3, expected: 3 },
      { n: 4, expected: 5 },
      { n: 5, expected: 8 },
      { n: 6, expected: 13 },
      { n: 45, expected: 1836311903 } // Larger test case
   ];

   let allPassed = true;

   // Test bottom-up implementation
   console.log("Testing Bottom-Up (Tabulation) Implementation:");
   for (const { n, expected } of testCases) {
      const result = climbStairs(n);
      const passed = result === expected;

      console.log(
         `Input: n = ${n}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test space-optimized implementation
   console.log("\nTesting Space-Optimized Implementation:");
   for (const { n, expected } of testCases) {
      const result = climbStairsOptimized(n);
      const passed = result === expected;

      console.log(
         `Input: n = ${n}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test top-down implementation
   console.log("\nTesting Top-Down (Memoization) Implementation:");
   for (const { n, expected } of testCases.slice(0, -1)) { // Skip the largest test case for recursive solution
      const result = climbStairsTopDown(n);
      const passed = result === expected;

      console.log(
         `Input: n = ${n}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison
   console.log("\nPerformance comparison:");

   const mediumN = 35;

   console.time("Bottom-Up (Tabulation)");
   climbStairs(mediumN);
   console.timeEnd("Bottom-Up (Tabulation)");

   console.time("Space-Optimized");
   climbStairsOptimized(mediumN);
   console.timeEnd("Space-Optimized");

   console.time("Top-Down (Memoization)");
   climbStairsTopDown(mediumN);
   console.timeEnd("Top-Down (Memoization)");

   // Generate and display all ways for a small example
   console.log("\nAll possible ways to climb 4 stairs:");
   const ways = generateAllWays(4);
   ways.forEach((way, index) => {
      console.log(`${index + 1}. Take steps: [${way.join(', ')}]`);
   });

   // Visualize the DP process
   console.log("\nVisualizing DP process for n = 5:");
   visualizeDP(5);

   // Show Fibonacci relationship
   console.log("\nDemonstrating the Fibonacci relationship:");
   showFibonacciRelationship(10);
}

// Uncomment to run tests
// runTests();