/**
 * @file flood-fill.js
 * @description Implementation of the Flood Fill algorithm
 * @problem LeetCode 733: https://leetcode.com/problems/flood-fill/
 */

/**
 * Performs a flood fill operation on an image starting from a specific pixel
 * 
 * The approach:
 * 1. Use BFS to find all connected pixels with the same color
 * 2. Replace their color with the new color
 * 
 * @param {number[][]} image - 2D array representing the image
 * @param {number} sr - Starting row
 * @param {number} sc - Starting column
 * @param {number} color - New color to fill with
 * @return {number[][]} - Modified image after flood fill
 */
function floodFill(image, sr, sc, color) {
   // If starting pixel already has the target color, no change needed
   const startColor = image[ sr ][ sc ];
   if (startColor === color) return image;

   const rows = image.length;
   const cols = image[ 0 ].length;

   // Initialize queue with starting position
   const queue = [ [ sr, sc ] ];

   // Possible directions: up, right, down, left
   const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

   // Process queue (BFS)
   while (queue.length > 0) {
      const [ r, c ] = queue.shift();

      // Fill current pixel
      image[ r ][ c ] = color;

      // Check all 4 adjacent pixels
      for (const [ dr, dc ] of directions) {
         const newR = r + dr;
         const newC = c + dc;

         // Ensure new position is valid and has the original color
         if (
            newR >= 0 && newR < rows &&
            newC >= 0 && newC < cols &&
            image[ newR ][ newC ] === startColor
         ) {
            queue.push([ newR, newC ]);
         }
      }
   }

   return image;
}

/**
 * Alternative implementation using DFS
 * Included to compare approaches
 * 
 * @param {number[][]} image - 2D array representing the image
 * @param {number} sr - Starting row
 * @param {number} sc - Starting column
 * @param {number} color - New color to fill with
 * @return {number[][]} - Modified image after flood fill
 */
function floodFillDFS(image, sr, sc, color) {
   const startColor = image[ sr ][ sc ];
   if (startColor === color) return image;

   const rows = image.length;
   const cols = image[ 0 ].length;

   // Define recursive DFS function
   function dfs(r, c) {
      // Check if current pixel is valid and has the original color
      if (
         r < 0 || r >= rows ||
         c < 0 || c >= cols ||
         image[ r ][ c ] !== startColor
      ) {
         return;
      }

      // Fill current pixel
      image[ r ][ c ] = color;

      // Recursively fill adjacent pixels
      dfs(r - 1, c); // Up
      dfs(r + 1, c); // Down
      dfs(r, c - 1); // Left
      dfs(r, c + 1); // Right
   }

   // Start DFS from the initial pixel
   dfs(sr, sc);
   return image;
}

// Export both implementations
module.exports = {
   floodFill,
   floodFillDFS
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      {
         image: [
            [ 1, 1, 1 ],
            [ 1, 1, 0 ],
            [ 1, 0, 1 ]
         ],
         sr: 1,
         sc: 1,
         color: 2,
         expected: [
            [ 2, 2, 2 ],
            [ 2, 2, 0 ],
            [ 2, 0, 1 ]
         ]
      },
      {
         image: [
            [ 0, 0, 0 ],
            [ 0, 1, 1 ]
         ],
         sr: 1,
         sc: 1,
         color: 1,
         expected: [
            [ 0, 0, 0 ],
            [ 0, 1, 1 ]
         ]
      },
      {
         image: [
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
         ],
         sr: 0,
         sc: 0,
         color: 2,
         expected: [
            [ 2, 2, 2 ],
            [ 2, 2, 2 ]
         ]
      }
   ];

   let allPassed = true;

   // Test BFS implementation
   console.log("Testing BFS implementation:");
   for (const { image, sr, sc, color, expected } of testCases) {
      // Deep copy the image to prevent modifications from affecting other tests
      const imageCopy = image.map(row => [ ...row ]);

      const result = floodFill(imageCopy, sr, sc, color);
      const passed = arraysEqual(result, expected);

      console.log(
         `Input: image=${formatMatrix(image)}, sr=${sr}, sc=${sc}, color=${color}`,
         `\nOutput: ${formatMatrix(result)}`,
         `\nExpected: ${formatMatrix(expected)}`,
         `\n${passed ? '✅ PASS' : '❌ FAIL'}\n`
      );

      if (!passed) allPassed = false;
   }

   // Test DFS implementation
   console.log("\nTesting DFS implementation:");
   for (const { image, sr, sc, color, expected } of testCases) {
      // Deep copy the image to prevent modifications from affecting other tests
      const imageCopy = image.map(row => [ ...row ]);

      const result = floodFillDFS(imageCopy, sr, sc, color);
      const passed = arraysEqual(result, expected);

      console.log(
         `Input: image=${formatMatrix(image)}, sr=${sr}, sc=${sc}, color=${color}`,
         `\nOutput: ${formatMatrix(result)}`,
         `\nExpected: ${formatMatrix(expected)}`,
         `\n${passed ? '✅ PASS' : '❌ FAIL'}\n`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Visualize the flood fill process
   console.log("\nVisualizing BFS Flood Fill process:");
   visualizeFloodFill([
      [ 1, 1, 1 ],
      [ 1, 1, 0 ],
      [ 1, 0, 1 ]
   ], 1, 1, 2);
}

/**
 * Helper function to check if two 2D arrays are equal
 */
function arraysEqual(arr1, arr2) {
   if (arr1.length !== arr2.length) return false;

   for (let i = 0; i < arr1.length; i++) {
      if (arr1[ i ].length !== arr2[ i ].length) return false;

      for (let j = 0; j < arr1[ i ].length; j++) {
         if (arr1[ i ][ j ] !== arr2[ i ][ j ]) return false;
      }
   }

   return true;
}

/**
 * Helper function to format a 2D array for better readability
 */
function formatMatrix(matrix) {
   return `\n${matrix.map(row => `  [${row.join(', ')}]`).join('\n')}`;
}

/**
 * Helper function to visualize the flood fill process
 */
function visualizeFloodFill(image, sr, sc, color) {
   const startColor = image[ sr ][ sc ];
   if (startColor === color) {
      console.log("Starting pixel already has the target color. No change needed.");
      return;
   }

   const rows = image.length;
   const cols = image[ 0 ].length;

   // Deep copy the original image
   const originalImage = image.map(row => [ ...row ]);

   // Create a copy for tracking the fill progress
   let currentImage = image.map(row => [ ...row ]);

   console.log("Original Image:");
   console.log(formatMatrix(originalImage));

   const queue = [ [ sr, sc ] ];
   let step = 1;

   // Directions: up, right, down, left
   const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

   // Process queue (BFS)
   while (queue.length > 0) {
      console.log(`\nStep ${step}:`);

      // Process all cells at the current level
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
         const [ r, c ] = queue.shift();

         // Fill current pixel
         currentImage[ r ][ c ] = color;

         console.log(`Filling pixel at (${r}, ${c}) with color ${color}`);

         // Check all 4 adjacent pixels
         for (const [ dr, dc ] of directions) {
            const newR = r + dr;
            const newC = c + dc;

            // Ensure new position is valid and has the original color
            if (
               newR >= 0 && newR < rows &&
               newC >= 0 && newC < cols &&
               currentImage[ newR ][ newC ] === startColor
            ) {
               queue.push([ newR, newC ]);
               console.log(`  Adding neighbor (${newR}, ${newC}) to the queue`);
            }
         }
      }

      console.log("Current Image:");
      console.log(formatMatrix(currentImage));

      step++;
   }

   console.log("\nFinal Image after Flood Fill:");
   console.log(formatMatrix(currentImage));
}

// Uncomment to run tests
// runTests();