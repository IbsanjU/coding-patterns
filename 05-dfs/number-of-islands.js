/**
 * @file number-of-islands.js
 * @description Implementation of the Number of Islands problem
 * @problem LeetCode 200: https://leetcode.com/problems/number-of-islands/
 */

/**
 * Counts the number of islands in a 2D grid
 * An island is a group of connected '1's (land) surrounded by '0's (water)
 * 
 * The approach:
 * 1. Scan the grid cell by cell
 * 2. When we find land ('1'), increment island count and use DFS to mark all connected land as visited
 * 3. Continue scanning for unvisited land
 * 
 * @param {character[][]} grid - 2D grid of '1's (land) and '0's (water)
 * @return {number} - Number of islands
 */
function numIslands(grid) {
   if (!grid || grid.length === 0) return 0;

   const rows = grid.length;
   const cols = grid[ 0 ].length;
   let islandCount = 0;

   // Helper function for DFS
   function dfs(r, c) {
      // Check boundaries and if it's land
      if (
         r < 0 || r >= rows ||
         c < 0 || c >= cols ||
         grid[ r ][ c ] === '0'
      ) {
         return;
      }

      // Mark as visited by changing to water
      grid[ r ][ c ] = '0';

      // Explore in all 4 directions
      dfs(r - 1, c); // Up
      dfs(r + 1, c); // Down
      dfs(r, c - 1); // Left
      dfs(r, c + 1); // Right
   }

   // Scan the grid
   for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
         if (grid[ r ][ c ] === '1') {
            islandCount++;
            dfs(r, c); // Mark the entire island as visited
         }
      }
   }

   return islandCount;
}

/**
 * Alternative implementation using BFS
 * Included to compare approaches
 * 
 * @param {character[][]} grid - 2D grid of '1's (land) and '0's (water)
 * @return {number} - Number of islands
 */
function numIslandsBFS(grid) {
   if (!grid || grid.length === 0) return 0;

   const rows = grid.length;
   const cols = grid[ 0 ].length;
   let islandCount = 0;

   // Directions: up, right, down, left
   const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

   // Helper function for BFS
   function bfs(r, c) {
      const queue = [ [ r, c ] ];
      grid[ r ][ c ] = '0'; // Mark as visited

      while (queue.length > 0) {
         const [ currentR, currentC ] = queue.shift();

         // Check all 4 adjacent cells
         for (const [ dr, dc ] of directions) {
            const newR = currentR + dr;
            const newC = currentC + dc;

            // If valid land cell, add to queue and mark as visited
            if (
               newR >= 0 && newR < rows &&
               newC >= 0 && newC < cols &&
               grid[ newR ][ newC ] === '1'
            ) {
               queue.push([ newR, newC ]);
               grid[ newR ][ newC ] = '0'; // Mark as visited
            }
         }
      }
   }

   // Scan the grid
   for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
         if (grid[ r ][ c ] === '1') {
            islandCount++;
            bfs(r, c); // Process entire island
         }
      }
   }

   return islandCount;
}

// Export both implementations
module.exports = {
   numIslands,
   numIslandsBFS
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      {
         grid: [
            [ '1', '1', '1', '1', '0' ],
            [ '1', '1', '0', '1', '0' ],
            [ '1', '1', '0', '0', '0' ],
            [ '0', '0', '0', '0', '0' ]
         ],
         expected: 1
      },
      {
         grid: [
            [ '1', '1', '0', '0', '0' ],
            [ '1', '1', '0', '0', '0' ],
            [ '0', '0', '1', '0', '0' ],
            [ '0', '0', '0', '1', '1' ]
         ],
         expected: 3
      },
      {
         grid: [],
         expected: 0
      },
      {
         grid: [ [ '1' ] ],
         expected: 1
      },
      {
         grid: [ [ '0' ] ],
         expected: 0
      }
   ];

   let allPassed = true;

   // Test DFS implementation
   console.log("Testing DFS implementation:");
   for (const { grid, expected } of testCases) {
      // Deep copy the grid
      const gridCopy = grid.map ? grid.map(row => [ ...row ]) : [];

      const result = numIslands(gridCopy);
      const passed = result === expected;

      console.log(
         `Input: grid=${formatMatrix(grid)}`,
         `\nOutput: ${result}`,
         `\nExpected: ${expected}`,
         `\n${passed ? '✅ PASS' : '❌ FAIL'}\n`
      );

      if (!passed) allPassed = false;
   }

   // Test BFS implementation
   console.log("\nTesting BFS implementation:");
   for (const { grid, expected } of testCases) {
      // Deep copy the grid
      const gridCopy = grid.map ? grid.map(row => [ ...row ]) : [];

      const result = numIslandsBFS(gridCopy);
      const passed = result === expected;

      console.log(
         `Input: grid=${formatMatrix(grid)}`,
         `\nOutput: ${result}`,
         `\nExpected: ${expected}`,
         `\n${passed ? '✅ PASS' : '❌ FAIL'}\n`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Visualize island counting process
   console.log("\nVisualizing Island Counting Process:");
   visualizeIslandCounting([
      [ '1', '1', '0', '0', '0' ],
      [ '1', '1', '0', '0', '0' ],
      [ '0', '0', '1', '0', '0' ],
      [ '0', '0', '0', '1', '1' ]
   ]);
}

/**
 * Helper function to format a 2D array for better readability
 */
function formatMatrix(matrix) {
   if (!matrix || matrix.length === 0) return "[]";
   return `\n${matrix.map(row => `  [${row.join(', ')}]`).join('\n')}`;
}

/**
 * Helper function to visualize the island counting process
 */
function visualizeIslandCounting(grid) {
   if (!grid || grid.length === 0) {
      console.log("Empty grid, no islands.");
      return;
   }

   const rows = grid.length;
   const cols = grid[ 0 ].length;

   // Deep copy the original grid
   const originalGrid = grid.map(row => [ ...row ]);

   console.log("Original Grid:");
   console.log(formatMatrix(originalGrid));

   // Create a copy for visualization
   let visualGrid = grid.map(row => [ ...row ]);
   let islandCount = 0;

   // Directions for exploring
   const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

   // Helper function for DFS
   function dfs(r, c, islandNum) {
      if (
         r < 0 || r >= rows ||
         c < 0 || c >= cols ||
         visualGrid[ r ][ c ] !== '1'
      ) {
         return;
      }

      // Mark with island number for visualization
      visualGrid[ r ][ c ] = islandNum.toString();

      // Explore in all 4 directions
      for (const [ dr, dc ] of directions) {
         dfs(r + dr, c + dc, islandNum);
      }
   }

   // Scan the grid
   for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
         if (visualGrid[ r ][ c ] === '1') {
            islandCount++;
            console.log(`\nFound island #${islandCount} starting at position (${r}, ${c})`);

            // Mark this island with a unique identifier
            dfs(r, c, `I${islandCount}`);

            console.log("Grid after marking island #" + islandCount + ":");
            console.log(formatMatrix(visualGrid));
         }
      }
   }

   console.log(`\nTotal islands found: ${islandCount}`);
}

// Uncomment to run tests
// runTests();