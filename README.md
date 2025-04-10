# Coding Patterns for Technical Interviews

Hey there! 👋 Welcome to my collection of essential coding patterns for technical interviews!

I've built this repository to help you master the fundamental patterns that come up again and again in coding interviews. Instead of memorizing hundreds of problems, understanding these core patterns will help you tackle almost any algorithm challenge that comes your way.

## Why I Created This Repository

Honestly speaking, I struggled with technical interviews until I realized something important: most problems are variations of a few core patterns. Once I started recognizing these patterns, interview questions became much more approachable!

This repository contains my implementations of these patterns with detailed explanations, visualizations, and real LeetCode examples to help you build the same intuition.

## Patterns You'll Learn

1. **[Heap for Top-K Elements](./01-heap)** 📊
   - Perfect for finding the largest/smallest K elements efficiently
   - [Kth Largest Element in Array](./01-heap/kth-largest.js) (LeetCode 215)
   - _Coming soon: Top K Frequent Elements_

2. **[HashMap / HashSet](./02-hashmap)** 🗺️
   - Your go-to for O(1) lookups, counting, and duplicate detection
   - [Two Sum](./02-hashmap/two-sum.js) (LeetCode 1)
   - _Coming soon: Group Anagrams_

3. **[Sliding Window](./03-sliding-window)** 🪟
   - Master the art of processing contiguous subarrays/substrings
   - [Longest Substring Without Repeating Characters](./03-sliding-window/longest-substring.js) (LeetCode 3)
   - _Coming soon: Minimum Size Subarray Sum_

4. **[Breadth-First Search (BFS)](./04-bfs)** 🌳
   - Level-by-level traversal for finding shortest paths
   - [Flood Fill](./04-bfs/flood-fill.js) (LeetCode 733)
   - _Coming soon: Rotting Oranges_

5. **[Depth-First Search (DFS)](./05-dfs)** 🔍
   - Explore paths deeply before backtracking
   - [Number of Islands](./05-dfs/number-of-islands.js) (LeetCode 200)
   - _Coming soon: Max Area of Island_

6. **[Two Pointers](./06-two-pointers)** 👉👈
   - Efficient array scanning from both ends
   - [Two Sum II](./06-two-pointers/two-sum-ii.js) (LeetCode 167)
   - _Coming soon: Container With Most Water_

7. **[Binary Search](./07-binary-search)** 🔎
   - Not just for sorted arrays - for any monotonic search space!
   - [Binary Search](./07-binary-search/binary-search.js) (LeetCode 704)
   - _Coming soon: Search in Rotated Sorted Array_

8. **[Backtracking](./08-backtracking)** 🧩
   - Build solutions incrementally and abandon paths that fail
   - [Permutations](./08-backtracking/permutations.js) (LeetCode 46)
   - _Coming soon: N-Queens_

9. **[Stack](./09-stack)** 📚
   - Last-In-First-Out operations for matching pairs and more
   - [Valid Parentheses](./09-stack/valid-parentheses.js) (LeetCode 20)
   - _Coming soon: Evaluate Reverse Polish Notation_

10. **[Fast & Slow Pointers](./10-fast-slow-pointers)** 🐢🐇
    - Elegant cycle detection with minimal space complexity
    - [Linked List Cycle](./10-fast-slow-pointers/linked-list-cycle.js) (LeetCode 141)
    - _Coming soon: Find Cycle Start_

11. **[Dynamic Programming (DP)](./11-dynamic-programming)** 🧠
    - Break complex problems into overlapping subproblems
    - [Climbing Stairs](./11-dynamic-programming/climbing-stairs.js) (LeetCode 70)
    - _Coming soon: House Robber_

12. **[Trie (Prefix Tree)](./12-trie)** 🌲
    - Efficient operations on string collections
    - [Implement Trie](./12-trie/implement-trie.js) (LeetCode 208)
    - _Coming soon: Word Search II_

## How to Get the Most From This Repo

1. **Start with the fundamentals**: Each pattern folder contains a README that explains the core concepts – read this first!

2. **Understand through visualization**: I've added diagrams and step-by-step visualizations for each pattern to help build intuition.

3. **Run the code**: All implementations come with test cases – uncomment the `runTests()` function to see them in action.

4. **Practice makes perfect**: Try solving the LeetCode problems yourself first, then compare with my implementations.

5. **Contribute your solutions**: Found a better approach? I'd love to see your implementation!

## Setting Up

Let's get you started:

```bash
# Clone the repo
git clone https://github.com/your-username/coding-patterns.git
cd coding-patterns

# Install dependencies
npm install

# Run all tests
npm test

# Or run tests for a specific pattern
npm test -- 01-heap/kth-largest.test.js