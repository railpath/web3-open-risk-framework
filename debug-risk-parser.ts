/**
 * Debug script for risk parser
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

console.log('Debugging risk parser...')

// Simulate the exact code from listAllRisks
const risksDir = path.join(__dirname, 'src', 'parser', '..', '..', '..', 'catalogue', 'risks')
console.log('risksDir:', risksDir)
console.log('risksDir exists:', fs.existsSync(risksDir))

if (fs.existsSync(risksDir)) {
  const categories = fs.readdirSync(risksDir)
  console.log('Categories found:', categories.length)
  
  for (const category of categories) {
    const categoryPath = path.join(risksDir, category)
    console.log(`Checking category: ${category}`)
    console.log(`  Path: ${categoryPath}`)
    console.log(`  Is directory: ${fs.statSync(categoryPath).isDirectory()}`)
    
    if (fs.statSync(categoryPath).isDirectory()) {
      const riskFiles = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))
      console.log(`  Found ${riskFiles.length} .md files`)
      
      if (riskFiles.length > 0) {
        console.log(`  First file: ${riskFiles[0]}`)
        
        // Try to read the first file
        try {
          const filePath = path.join(category, riskFiles[0])
          const content = fs.readFileSync(path.join(categoryPath, riskFiles[0]), 'utf-8')
          console.log(`  File content length: ${content.length}`)
          
          const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/)
          if (frontmatterMatch) {
            console.log(`  Frontmatter found`)
            const metadata = yaml.load(frontmatterMatch[1]) as any
            console.log(`  Metadata: ${JSON.stringify(metadata, null, 2)}`)
          } else {
            console.log(`  No frontmatter found`)
          }
        } catch (error) {
          console.error(`  Error reading file:`, error)
        }
        break // Only test first file
      }
    }
  }
}
