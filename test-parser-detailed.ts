/**
 * Detailed test script for the parser functions
 */

import { 
  parseRisk, 
  listAllRisks, 
  indicatorParser, 
  measureParser 
} from './src/parser'
import fs from 'fs'
import path from 'path'

console.log('Testing Risk Catalogue Parser with details...\n')

// Test the actual catalogue directories
const cataloguePath = path.join(__dirname, '..', 'catalogue')
console.log('Catalogue path:', cataloguePath)
console.log('Catalogue exists:', fs.existsSync(cataloguePath))

if (fs.existsSync(cataloguePath)) {
  const risksDir = path.join(cataloguePath, 'risks')
  const indicatorsDir = path.join(cataloguePath, 'indicators')
  const measuresDir = path.join(cataloguePath, 'measures')
  
  console.log('Risks dir:', risksDir, fs.existsSync(risksDir))
  console.log('Indicators dir:', indicatorsDir, fs.existsSync(indicatorsDir))
  console.log('Measures dir:', measuresDir, fs.existsSync(measuresDir))
  
  if (fs.existsSync(risksDir)) {
    const categories = fs.readdirSync(risksDir)
    console.log('Risk categories:', categories)
    
    for (const category of categories) {
      const categoryPath = path.join(risksDir, category)
      if (fs.statSync(categoryPath).isDirectory()) {
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))
        console.log(`  ${category}: ${files.length} files`)
        if (files.length > 0) {
          console.log(`    First file: ${files[0]}`)
        }
      }
    }
  }
}

// Test 1: List all risks
console.log('\n1. Testing listAllRisks()...')
try {
  const risks = listAllRisks()
  console.log(`   Found ${risks.length} risks`)
  if (risks.length > 0) {
    console.log(`   First risk: ${risks[0].id} - ${risks[0].title}`)
    console.log(`   First risk path: ${risks[0].filePath}`)
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

// Test 2: List all indicators
console.log('\n2. Testing listAllIndicators()...')
try {
  const indicators = indicatorParser.listAllIndicators()
  console.log(`   Found ${indicators.length} indicators`)
  if (indicators.length > 0) {
    console.log(`   First indicator: ${indicators[0].id} - ${indicators[0].title}`)
    console.log(`   First indicator path: ${indicators[0].filePath}`)
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

// Test 3: List all measures
console.log('\n3. Testing listAllMeasures()...')
try {
  const measures = measureParser.listAllMeasures()
  console.log(`   Found ${measures.length} measures`)
  if (measures.length > 0) {
    console.log(`   First measure: ${measures[0].id} - ${measures[0].title}`)
    console.log(`   First measure path: ${measures[0].filePath}`)
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

console.log('\nAll tests completed!')
