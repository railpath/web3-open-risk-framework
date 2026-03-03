/**
 * Debug parseRisk function - simple version
 */

import { parseRisk } from './src/parser'

console.log('Debugging parseRisk...')

// Test with a known good path
const testPath = 'risks/1_FINANCIAL/R:ALGORITHMIC_STABLECOIN.md'
console.log('Test path:', testPath)

try {
  const risk = parseRisk(testPath)
  console.log('Successfully parsed risk:')
  console.log('  ID:', risk.metadata.id)
  console.log('  Title:', risk.metadata.title)
  console.log('  File path:', risk.filePath)
} catch (error) {
  console.error('Error parsing risk:', error instanceof Error ? error.message : error)
}
