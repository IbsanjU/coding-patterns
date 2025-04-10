/**
 * @file kth-largest.js
 * @description Implementation of finding the kth largest element in an array
 * @problem LeetCode 215: https://leetcode.com/problems/kth-largest-element-in-an-array
 */

/**
 * Finds the kth largest element in an array using a min heap
 * 
 * The approach:
 * 1. Build a min heap of size k
 * 2. For each element in the array:
 *    a. Add it to the heap
 *    b. If heap size exceeds k, remove the smallest element
 * 3. After processing all elements, the top of the heap is the kth largest
 * 
 * @param {number[]} nums - Array of numbers
 * @param {number} k - Position of the element to find (1-based index from largest)
 * @return {number} - The kth largest element
 */
function findKthLargest(nums, k) {
   // Let's implement a simple MinHeap class for this problem
   class MinHeap {
      constructor () {
         this.heap = [];
      }

      // Get parent index
      getParentIndex(i) {
         return Math.floor((i - 1) / 2);
      }

      // Get left child index
      getLeftChildIndex(i) {
         return 2 * i + 1;
      }

      // Get right child index
      getRightChildIndex(i) {
         return 2 * i + 2;
      }

      // Swap elements at two indexes
      swap(i1, i2) {
         [ this.heap[ i1 ], this.heap[ i2 ] ] = [ this.heap[ i2 ], this.heap[ i1 ] ];
      }

      // Add value to the heap and maintain heap property
      push(value) {
         this.heap.push(value);
         this.siftUp(this.heap.length - 1);
      }

      // Remove and return minimum value (root)
      pop() {
         if (this.heap.length === 0) return null;

         const min = this.heap[ 0 ];
         const last = this.heap.pop();

         if (this.heap.length > 0) {
            this.heap[ 0 ] = last;
            this.siftDown(0);
         }

         return min;
      }

      // Move an element up to its correct position
      siftUp(index) {
         let parent = this.getParentIndex(index);

         while (index > 0 && this.heap[ parent ] > this.heap[ index ]) {
            this.swap(parent, index);
            index = parent;
            parent = this.getParentIndex(index);
         }
      }

      // Move an element down to its correct position
      siftDown(index) {
         let smallest = index;
         const left = this.getLeftChildIndex(index);
         const right = this.getRightChildIndex(index);
         const size = this.heap.length;

         // Find the smallest among node and its children
         if (left < size && this.heap[ left ] < this.heap[ smallest ]) {
            smallest = left;
         }

         if (right < size && this.heap[ right ] < this.heap[ smallest ]) {
            smallest = right;
         }

         // If one of the children is smaller, swap and continue sifting down
         if (smallest !== index) {
            this.swap(index, smallest);
            this.siftDown(smallest);
         }
      }

      // Get the minimum element without removing it
      peek() {
         return this.heap[ 0 ];
      }

      // Get heap size
      size() {
         return this.heap.length;
      }
   }

   // Create min heap to keep track of k largest elements
   const minHeap = new MinHeap();

   // Process all elements in the array
   for (const num of nums) {
      // Add current element to heap
      minHeap.push(num);

      // If heap size exceeds k, remove the smallest element
      // This ensures we always have k largest elements in the heap
      if (minHeap.size() > k) {
         minHeap.pop();
      }
   }

   // The root of our min heap will be the kth largest element
   return minHeap.peek();
}

/**
 * Alternative solution using QuickSelect algorithm
 * This approach has O(n) average time complexity but O(n²) worst case
 * 
 * @param {number[]} nums - Array of numbers
 * @param {number} k - Position of the element to find (1-based index from largest)
 * @return {number} - The kth largest element
 */
function findKthLargestQuickSelect(nums, k) {
   // Convert to 0-indexed for array (kth largest = (n-k)th smallest)
   const targetIndex = nums.length - k;

   // QuickSelect helper function
   function quickSelect(left, right) {
      // Base case: array of size 1
      if (left === right) return nums[ left ];

      // Choose pivot (using median of three for better performance)
      const pivotIndex = partition(left, right);

      // If pivot is the target, we found our element
      if (pivotIndex === targetIndex) {
         return nums[ pivotIndex ];
      }

      // If target is in left partition
      if (targetIndex < pivotIndex) {
         return quickSelect(left, pivotIndex - 1);
      }

      // If target is in right partition
      return quickSelect(pivotIndex + 1, right);
   }

   // Partition function for QuickSelect
   function partition(left, right) {
      // Choose pivot (for simplicity, using right element)
      const pivot = nums[ right ];
      let i = left;

      // Move all elements smaller than pivot to the left
      for (let j = left; j < right; j++) {
         if (nums[ j ] <= pivot) {
            [ nums[ i ], nums[ j ] ] = [ nums[ j ], nums[ i ] ];
            i++;
         }
      }

      // Place pivot in its final position
      [ nums[ i ], nums[ right ] ] = [ nums[ right ], nums[ i ] ];
      return i;
   }

   return quickSelect(0, nums.length - 1);
}

// Export both implementations
module.exports = {
   findKthLargest,
   findKthLargestQuickSelect
};

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      { nums: [ 3, 2, 1, 5, 6, 4 ], k: 2, expected: 5 },
      { nums: [ 3, 2, 3, 1, 2, 4, 5, 5, 6 ], k: 4, expected: 4 },
      { nums: [ 1 ], k: 1, expected: 1 },
      { nums: [ 7, 6, 5, 4, 3, 2, 1 ], k: 5, expected: 3 },
   ];

   let allPassed = true;

   // Test heap implementation
   console.log("Testing MinHeap implementation:");
   for (const { nums, k, expected } of testCases) {
      const result = findKthLargest([ ...nums ], k);
      const passed = result === expected;

      console.log(
         `Input: nums = [${nums}], k = ${k}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test quickselect implementation
   console.log("\nTesting QuickSelect implementation:");
   for (const { nums, k, expected } of testCases) {
      const result = findKthLargestQuickSelect([ ...nums ], k);
      const passed = result === expected;

      console.log(
         `Input: nums = [${nums}], k = ${k}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
}

// Uncomment to run tests
// runTests();