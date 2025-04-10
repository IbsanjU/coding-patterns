/**
 * @file linked-list-cycle.js
 * @description Implementation of linked list cycle detection
 * @problem LeetCode 141: https://leetcode.com/problems/linked-list-cycle/
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * Determines if a linked list has a cycle
 * Using the "tortoise and hare" algorithm (Floyd's cycle-finding algorithm)
 * 
 * The approach:
 * 1. Use two pointers moving at different speeds
 * 2. If there's a cycle, the fast pointer will eventually catch up to the slow pointer
 * 3. If there's no cycle, the fast pointer will reach the end of the list
 * 
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - Whether the linked list has a cycle
 */
function hasCycle(head) {
   // Edge cases
   if (!head || !head.next) return false;

   // Initialize two pointers
   let slow = head;
   let fast = head;

   // Move slow by 1 step and fast by 2 steps
   while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      // If they meet, there's a cycle
      if (slow === fast) {
         return true;
      }
   }

   // If fast pointer reaches the end, there's no cycle
   return false;
}

/**
 * Alternative implementation using a HashSet
 * This is O(n) space, whereas the two pointers approach is O(1) space
 * 
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - Whether the linked list has a cycle
 */
function hasCycleHashSet(head) {
   // Set to store nodes we've seen
   const visited = new Set();

   let current = head;
   while (current) {
      // If we've seen this node before, there's a cycle
      if (visited.has(current)) {
         return true;
      }

      // Otherwise, add it to the set
      visited.add(current);
      current = current.next;
   }

   // If we reach the end of the list, there's no cycle
   return false;
}

/**
 * Extended function that finds the start of the cycle if one exists
 * Based on Floyd's cycle-finding algorithm (the tortoise and hare algorithm)
 * 
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - The node where the cycle begins, or null if no cycle
 */
function detectCycleStart(head) {
   // Edge cases
   if (!head || !head.next) return null;

   // Phase 1: Detect if there's a cycle
   let slow = head;
   let fast = head;
   let hasCycle = false;

   while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
         hasCycle = true;
         break;
      }
   }

   // If no cycle, return null
   if (!hasCycle) return null;

   // Phase 2: Find the start of the cycle
   // Reset slow pointer to head, keep fast pointer at meeting point
   slow = head;

   // Move both pointers at the same pace until they meet
   // They will meet at the start of the cycle
   while (slow !== fast) {
      slow = slow.next;
      fast = fast.next;
   }

   return slow;
}

// Export all implementations
module.exports = {
   hasCycle,
   hasCycleHashSet,
   detectCycleStart
};

/**
 * Helper function to create a linked list with a cycle for testing
 * 
 * @param {number[]} values - Array of values for the linked list
 * @param {number} pos - Position to connect the tail to (-1 means no cycle)
 * @return {ListNode} - Head of the created linked list
 */
function createLinkedList(values, pos) {
   if (values.length === 0) return null;

   // Create nodes
   const nodes = values.map(val => ({ val, next: null }));

   // Connect nodes
   for (let i = 0; i < nodes.length - 1; i++) {
      nodes[ i ].next = nodes[ i + 1 ];
   }

   // Create cycle if pos is valid
   if (pos >= 0 && pos < nodes.length) {
      nodes[ nodes.length - 1 ].next = nodes[ pos ];
   }

   return nodes[ 0 ];
}

/**
 * Test cases
 */
function runTests() {
   const testCases = [
      { values: [ 3, 2, 0, -4 ], pos: 1, expected: true },
      { values: [ 1, 2 ], pos: 0, expected: true },
      { values: [ 1 ], pos: -1, expected: false },
      { values: [], pos: -1, expected: false },
      { values: [ 1, 2, 3, 4, 5 ], pos: -1, expected: false }
   ];

   let allPassed = true;

   // Test two pointers implementation
   console.log("Testing Two Pointers Implementation:");
   for (const { values, pos, expected } of testCases) {
      const head = createLinkedList(values, pos);
      const result = hasCycle(head);
      const passed = result === expected;

      console.log(
         `Input: [${values}], pos=${pos}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test HashSet implementation
   console.log("\nTesting HashSet Implementation:");
   for (const { values, pos, expected } of testCases) {
      const head = createLinkedList(values, pos);
      const result = hasCycleHashSet(head);
      const passed = result === expected;

      console.log(
         `Input: [${values}], pos=${pos}`,
         `| Output: ${result}`,
         `| Expected: ${expected}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   // Test cycle start detection
   console.log("\nTesting Cycle Start Detection:");
   for (const { values, pos, expected } of testCases) {
      const head = createLinkedList(values, pos);
      const result = detectCycleStart(head);

      // For a cycle, check if detected node is at the expected position
      let expectedNode = null;
      if (pos >= 0) {
         let node = head;
         for (let i = 0; i < pos; i++) {
            node = node.next;
         }
         expectedNode = node;
      }

      const passed = (result === null && !expected) ||
         (result === expectedNode && expected);

      console.log(
         `Input: [${values}], pos=${pos}`,
         `| Output: ${result ? `Node at index ${pos}` : 'null'}`,
         `| Expected: ${expectedNode ? `Node at index ${pos}` : 'null'}`,
         `| ${passed ? '✅ PASS' : '❌ FAIL'}`
      );

      if (!passed) allPassed = false;
   }

   console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

   // Performance comparison
   console.log("\nPerformance comparison:");

   // Create a large linked list with a cycle at the end
   const largeListSize = 100000;
   const largeValues = Array(largeListSize).fill(0).map((_, i) => i);
   const largeList = createLinkedList(largeValues, largeListSize - 1);

   console.time("Two Pointers method");
   hasCycle(largeList);
   console.timeEnd("Two Pointers method");

   console.time("HashSet method");
   hasCycleHashSet(largeList);
   console.timeEnd("HashSet method");

   // Visualize the algorithm
   console.log("\nVisualizing Fast & Slow Pointers for [3,2,0,-4] with pos=1:");
   visualizeFastSlowPointers([ 3, 2, 0, -4 ], 1);
}

/**
 * Helper function to visualize the fast & slow pointers algorithm
 */
function visualizeFastSlowPointers(values, pos) {
   const head = createLinkedList(values, pos);

   console.log(`Input: [${values}], pos=${pos}`);
   console.log("Step-by-step pointer movements:");

   // Create a representation of the list with cycle
   let cycleString = "";
   let node = head;
   const nodeIndices = new Map();

   for (let i = 0; i < values.length; i++) {
      nodeIndices.set(node, i);
      cycleString += node.val;

      if (i < values.length - 1) {
         cycleString += " → ";
      } else if (pos >= 0) {
         cycleString += ` → [cycles back to index ${pos}]`;
      }

      node = node.next;
   }

   console.log(`List: ${cycleString}`);

   // Simulate the algorithm
   let slow = head;
   let fast = head;
   let step = 0;

   while (fast && fast.next) {
      console.log(`\nStep ${step}:`);
      console.log(`  Slow pointer at index ${nodeIndices.get(slow)}, value ${slow.val}`);
      console.log(`  Fast pointer at index ${nodeIndices.get(fast)}, value ${fast.val}`);

      slow = slow.next;
      fast = fast.next.next;
      step++;

      console.log(`  After move:`);
      console.log(`  - Slow pointer at index ${nodeIndices.get(slow)}, value ${slow.val}`);

      if (!fast) {
         console.log(`  - Fast pointer reached end of list, no cycle detected!`);
         return false;
      }

      console.log(`  - Fast pointer at index ${nodeIndices.get(fast)}, value ${fast.val}`);

      if (slow === fast) {
         console.log(`\n✅ Cycle detected! Pointers met at value ${slow.val}`);
         return true;
      }

      // Prevent infinite loops in visualization
      if (step > values.length * 2) {
         console.log("Visualization stopped to prevent infinite loop.");
         return;
      }
   }

   console.log(`\n❌ Fast pointer reached end of list, no cycle detected!`);
   return false;
}

// Uncomment to run tests
// runTests();