/**
 * @file implement-trie.js
 * @description Implementation of a Trie (Prefix Tree)
 * @problem LeetCode 208: https://leetcode.com/problems/implement-trie-prefix-tree/
 */

/**
 * Trie Node class
 * Each node contains a map of child nodes and a flag indicating if it's the end of a word
 */
class TrieNode {
   constructor () {
      this.children = {}; // Map characters to child nodes
      this.isEndOfWord = false; // Flag to mark complete words
   }
}

/**
 * Trie class (Prefix Tree)
 * A tree-like data structure for efficient storage and retrieval of strings
 */
class Trie {
   constructor () {
      this.root = new TrieNode();
   }

   /**
    * Inserts a word into the trie
    * 
    * @param {string} word - Word to insert
    */
   insert(word) {
      let node = this.root;

      for (const char of word) {
         // Create node if it doesn't exist
         if (!node.children[ char ]) {
            node.children[ char ] = new TrieNode();
         }

         // Move to the child node
         node = node.children[ char ];
      }

      // Mark end of word
      node.isEndOfWord = true;
   }

   /**
    * Returns if the word is in the trie
    * 
    * @param {string} word - Word to search for
    * @return {boolean} - True if the word exists in the trie
    */
   search(word) {
      let node = this.root;

      for (const char of word) {
         // If character doesn't exist, word not found
         if (!node.children[ char ]) {
            return false;
         }

         // Move to next node
         node = node.children[ char ];
      }

      // Word exists only if we reached end of word marker
      return node.isEndOfWord;
   }

   /**
    * Returns if there is any word in the trie that starts with the given prefix
    * 
    * @param {string} prefix - Prefix to search for
    * @return {boolean} - True if any word with this prefix exists
    */
   startsWith(prefix) {
      let node = this.root;

      for (const char of prefix) {
         if (!node.children[ char ]) {
            return false;
         }
         node = node.children[ char ];
      }

      // If we reach here, prefix exists
      return true;
   }

   /**
    * Returns all words in the trie with the given prefix
    * 
    * @param {string} prefix - Prefix to search for
    * @return {string[]} - Array of words with the given prefix
    */
   findWordsWithPrefix(prefix) {
      const results = [];

      // Find the node corresponding to the prefix
      let node = this.root;
      for (const char of prefix) {
         if (!node.children[ char ]) {
            return results; // Prefix not found
         }
         node = node.children[ char ];
      }

      // Helper function to collect words using DFS
      function dfs(currentNode, currentWord) {
         // If current node is end of a word, add it to results
         if (currentNode.isEndOfWord) {
            results.push(currentWord);
         }

         // Explore all child nodes
         for (const char in currentNode.children) {
            dfs(currentNode.children[ char ], currentWord + char);
         }
      }

      // Start DFS from the prefix node
      dfs(node, prefix);
      return results;
   }

   /**
    * Deletes a word from the trie
    * 
    * @param {string} word - Word to delete
    * @return {boolean} - True if word was found and deleted
    */
   delete(word) {
      // Helper function for recursive deletion
      function deleteHelper(node, word, index) {
         // Base case: end of word
         if (index === word.length) {
            // Word not found
            if (!node.isEndOfWord) {
               return false;
            }

            // Mark as not the end of a word
            node.isEndOfWord = false;

            // Return true if this node has no children, indicating it can be deleted
            return Object.keys(node.children).length === 0;
         }

         const char = word[ index ];
         const childNode = node.children[ char ];

         // Word not found
         if (!childNode) {
            return false;
         }

         // Check if child should be deleted
         const shouldDeleteChild = deleteHelper(childNode, word, index + 1);

         // If child should be deleted, remove it
         if (shouldDeleteChild) {
            delete node.children[ char ];

            // Return true if this node is not end of another word and has no other children
            return !node.isEndOfWord && Object.keys(node.children).length === 0;
         }

         return false;
      }

      return deleteHelper(this.root, word, 0);
   }
}

// Export the Trie class
module.exports = {
   Trie,
   TrieNode
};

/**
 * Test cases
 */
function runTests() {
   // Test 1: Basic operations
   console.log("Test 1: Basic Trie Operations");
   const trie = new Trie();

   // Insert words
   trie.insert("apple");
   console.log(`After inserting "apple":`);
   console.log(`search("apple"): ${trie.search("apple")} (expected: true)`);
   console.log(`search("app"): ${trie.search("app")} (expected: false)`);
   console.log(`startsWith("app"): ${trie.startsWith("app")} (expected: true)`);

   trie.insert("app");
   console.log(`\nAfter inserting "app":`);
   console.log(`search("app"): ${trie.search("app")} (expected: true)`);

   // Test 2: Words with prefix
   console.log("\nTest 2: Finding Words with Prefix");
   const prefixTrie = new Trie();
   const words = [ "apple", "application", "append", "banana", "ball", "cat" ];

   for (const word of words) {
      prefixTrie.insert(word);
   }

   console.log(`Words with prefix "app": ${prefixTrie.findWordsWithPrefix("app")}`);
   console.log(`Words with prefix "ba": ${prefixTrie.findWordsWithPrefix("ba")}`);
   console.log(`Words with prefix "c": ${prefixTrie.findWordsWithPrefix("c")}`);
   console.log(`Words with prefix "d": ${prefixTrie.findWordsWithPrefix("d")}`);

   // Test 3: Deletion
   console.log("\nTest 3: Deletion");
   const deleteTrie = new Trie();
   deleteTrie.insert("apple");
   deleteTrie.insert("application");
   deleteTrie.insert("append");

   console.log(`Before deletion: Words with prefix "app": ${deleteTrie.findWordsWithPrefix("app")}`);

   deleteTrie.delete("apple");
   console.log(`After deleting "apple": Words with prefix "app": ${deleteTrie.findWordsWithPrefix("app")}`);
   console.log(`search("apple"): ${deleteTrie.search("apple")} (expected: false)`);
   console.log(`search("application"): ${deleteTrie.search("application")} (expected: true)`);

   deleteTrie.delete("application");
   deleteTrie.delete("append");
   console.log(`After deleting all words: Words with prefix "app": ${deleteTrie.findWordsWithPrefix("app")}`);

   // Test 4: Performance comparison with array search
   console.log("\nTest 4: Performance Comparison");

   // Generate a large set of words
   const largeWordCount = 10000;
   const largeWordLength = 10;
   const largeWords = [];

   for (let i = 0; i < largeWordCount; i++) {
      let word = "";
      for (let j = 0; j < largeWordLength; j++) {
         // Generate random lowercase letters
         word += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
      largeWords.push(word);
   }

   // Insert words into trie
   const largeTrie = new Trie();
   console.time("Trie insertion");
   for (const word of largeWords) {
      largeTrie.insert(word);
   }
   console.timeEnd("Trie insertion");

   // Search in trie
   const searchCount = 1000;
   const searchWords = largeWords.slice(0, searchCount);

   console.time("Trie search");
   for (const word of searchWords) {
      largeTrie.search(word);
   }
   console.timeEnd("Trie search");

   // Search in array
   console.time("Array search");
   for (const word of searchWords) {
      largeWords.includes(word);
   }
   console.timeEnd("Array search");

   // Prefix search comparison
   const prefix = "ab";

   console.time("Trie prefix search");
   largeTrie.findWordsWithPrefix(prefix);
   console.timeEnd("Trie prefix search");

   console.time("Array prefix search");
   largeWords.filter(word => word.startsWith(prefix));
   console.timeEnd("Array prefix search");

   // Visualize the trie structure
   console.log("\nVisualizing Trie Structure:");
   const visualTrie = new Trie();
   visualTrie.insert("a");
   visualTrie.insert("app");
   visualTrie.insert("apple");
   visualTrie.insert("bat");
   visualTrie.insert("ball");

   visualizeTrie(visualTrie);
}

/**
 * Helper function to visualize a trie structure
 */
function visualizeTrie(trie) {
   function printNode(node, prefix = "", isLast = true, chars = "") {
      // Print current node
      const marker = isLast ? "└── " : "├── ";
      let label = chars;

      if (node.isEndOfWord) {
         label = label ? `${label} ✓` : "root ✓";
      } else {
         label = label || "root";
      }

      console.log(`${prefix}${marker}${label}`);

      // Prepare for children
      const childrenPrefix = prefix + (isLast ? "    " : "│   ");
      const children = Object.keys(node.children);

      // Print children
      children.forEach((char, index) => {
         const isLastChild = index === children.length - 1;
         printNode(node.children[ char ], childrenPrefix, isLastChild, char);
      });
   }

   console.log("Trie Structure:");
   printNode(trie.root);
}

// Uncomment to run tests
// runTests();