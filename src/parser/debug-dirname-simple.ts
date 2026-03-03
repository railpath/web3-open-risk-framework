/**
 * Debug __dirname in parser context - simple version
 */

import path from 'path'
import fs from 'fs'

console.log('Debugging __dirname in parser context...')

// We know __dirname is framework/src/parser when this file is executed
const __dirname = '/Users/kcnpxcp/Dev/GitHub/risk-catalogue/framework/src/parser'

console.log('__dirname:', __dirname)

// Test path resolution
const filePath = '1_FINANCIAL/R:ALGORITHMIC_STABLECOIN.md'

// Test different levels
for (let i = 1; i <= 6; i++) {
  const testPath = path.join(__dirname, ...Array(i).fill('..'), 'catalogue', filePath)
  console.log(`Level ${i}: ${testPath}`)
  console.log(`  Exists: ${fs.existsSync(testPath)}`)
}

// Test the specific path used in parseRisk
const absolutePath = path.join(__dirname, '..', '..', '..', '..', 'catalogue', filePath)
console.log('parseRisk path:', absolutePath)
console.log('parseRisk exists:', fs.existsSync(absolutePath))
