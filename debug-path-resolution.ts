/**
 * Debug path resolution
 */

import path from 'path'
import fs from 'fs'

console.log('Debugging path resolution...')

// Simulate what happens in parseRisk
const __dirname = '/Users/kcnpxcp/Dev/GitHub/risk-catalogue/framework/src/parser' // This is where the file is
const filePath = '1_FINANCIAL/R:ALGORITHMIC_STABLECOIN.md'

console.log('__dirname:', __dirname)
console.log('filePath:', filePath)

// Test different path resolutions
for (let i = 1; i <= 6; i++) {
  const testPath = path.join(__dirname, ...Array(i).fill('..'), 'catalogue', filePath)
  console.log(`Level ${i}: ${testPath}`)
  console.log(`  Exists: ${fs.existsSync(testPath)}`)
}

// Also test the actual catalogue path
const cataloguePath = path.join(__dirname, '..', '..', '..', '..', 'catalogue', filePath)
console.log('Catalogue path:', cataloguePath)
console.log('Catalogue exists:', fs.existsSync(cataloguePath))
