/**
 * Debug script to understand the path structure
 */

import path from 'path'

console.log('Debugging paths...')
console.log('Current __dirname:', __dirname)
console.log('Real path:', path.resolve(__dirname))

// Test different levels
for (let i = 1; i <= 8; i++) {
  const testPath = path.join(__dirname, ...Array(i).fill('..'), 'catalogue', 'risks')
  console.log(`Level ${i}: ${testPath}`)
  console.log(`Resolved: ${path.resolve(testPath)}`)
}
