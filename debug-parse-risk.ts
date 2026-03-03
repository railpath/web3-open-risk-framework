/**
 * Debug parseRisk function
 */

import { parseRisk } from './src/parser'
import path from 'path'

console.log('Debugging parseRisk...')

// Test with a known good path
const testPath = '1_FINANCIAL/R:ALGORITHMIC_STABLECOIN.md'
console.log('Test path:', testPath)

try {
  const risk = parseRisk(testPath)
  console.log('Successfully parsed risk:')
  console.log('  ID:', risk.metadata.id)
  console.log('  Title:', risk.metadata.title)
  console.log('  File path:', risk.filePath)
} catch (error) {
  console.error('Error parsing risk:', error instanceof Error ? error.message : error)
  
  // Let's debug the path resolution
  const __dirname = path.dirname(new URL(import.meta.url).pathname)
  console.log('__dirname:', __dirname)
  
  const projectRoot = path.join(__dirname, '..', '..', '..')
  console.log('projectRoot:', projectRoot)
  
  const absolutePath = path.join(__dirname, '..', '..', '..', 'catalogue', testPath)
  console.log('absolutePath:', absolutePath)
}
