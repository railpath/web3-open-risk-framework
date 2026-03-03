/**
 * Test script for the parser functions - fixed version
 */

import { 
  parseRisk, 
  listAllRisks, 
  indicatorParser, 
  measureParser 
} from './src/parser'

console.log('Testing Risk Catalogue Parser...\n')

// Test 1: List all risks
console.log('1. Testing listAllRisks()...')
try {
  const risks = listAllRisks()
  console.log(`   Found ${risks.length} risks`)
  if (risks.length > 0) {
    console.log(`   First risk: ${risks[0].id} - ${risks[0].title}`)
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

// Test 2: Parse a specific risk
console.log('\n2. Testing parseRisk()...')
try {
  const risks = listAllRisks()
  if (risks.length > 0) {
    // Use the full path from the list
    const risk = parseRisk(risks[0].filePath)
    console.log(`   Parsed risk: ${risk.metadata.id}`)
    console.log(`   Title: ${risk.metadata.title}`)
    console.log(`   Category: ${risk.metadata.category}`)
    console.log(`   Sections: ${Object.keys(risk.sections).join(', ')}`)
  } else {
    console.log('   No risks found to parse')
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

// Test 3: List all indicators
console.log('\n3. Testing listAllIndicators()...')
try {
  const indicators = indicatorParser.listAllIndicators()
  console.log(`   Found ${indicators.length} indicators`)
  if (indicators.length > 0) {
    console.log(`   First indicator: ${indicators[0].id} - ${indicators[0].title}`)
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

// Test 4: Parse a specific indicator
console.log('\n4. Testing parseIndicator()...')
try {
  const indicators = indicatorParser.listAllIndicators()
  if (indicators.length > 0) {
    const indicator = indicatorParser.parseIndicator(indicators[0].filePath)
    console.log(`   Parsed indicator: ${indicator.id}`)
    console.log(`   Title: ${indicator.title}`)
    console.log(`   Description length: ${indicator.description.length} chars`)
  } else {
    console.log('   No indicators found to parse')
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

// Test 5: List all measures
console.log('\n5. Testing listAllMeasures()...')
try {
  const measures = measureParser.listAllMeasures()
  console.log(`   Found ${measures.length} measures`)
  if (measures.length > 0) {
    console.log(`   First measure: ${measures[0].id} - ${measures[0].title}`)
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

// Test 6: Parse a specific measure
console.log('\n6. Testing parseMeasure()...')
try {
  const measures = measureParser.listAllMeasures()
  if (measures.length > 0) {
    const measure = measureParser.parseMeasure(measures[0].filePath)
    console.log(`   Parsed measure: ${measure.id}`)
    console.log(`   Title: ${measure.title}`)
    console.log(`   Description length: ${measure.description.length} chars`)
  } else {
    console.log('   No measures found to parse')
  }
} catch (error) {
  console.error('   Error:', error instanceof Error ? error.message : error)
}

console.log('\nAll tests completed!')
