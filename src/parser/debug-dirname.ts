/**
 * Debug __dirname in parser context
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

console.log('Debugging __dirname in parser context...')

// Get the actual __dirname for this file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('__filename:', __filename)
console.log('__dirname:', __dirname)

// Test path resolution
const filePath = '1_FINANCIAL/R:ALGORITHMIC_STABLECOIN.md'
const absolutePath = path.join(__dirname, '..', '..', '..', '..', 'catalogue', filePath)

console.log('absolutePath:', absolutePath)
console.log('exists:', fs.existsSync(absolutePath))

// Also test going up different levels
for (let i = 1; i <= 6; i++) {
  const testPath = path.join(__dirname, ...Array(i).fill('..'), 'catalogue', filePath)
  console.log(`Level ${i}: ${testPath}`)
  console.log(`  Exists: ${fs.existsSync(testPath)}`)
}
