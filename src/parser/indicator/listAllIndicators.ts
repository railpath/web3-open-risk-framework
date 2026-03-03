/**
 * Lists all available indicator files
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export function listAllIndicators(): Array<{ id: string; title: string; filePath: string }> {
  // Use relative path from project root
  const indicatorsDir = path.join(__dirname, '..', '..', '..', '..', 'catalogue', 'indicators')
  const results: Array<{ id: string; title: string; filePath: string }> = []
  
  const indicatorFiles = fs.readdirSync(indicatorsDir)
    .filter(f => f.endsWith('.md'))
  
  for (const file of indicatorFiles) {
    try {
      const content = fs.readFileSync(path.join(indicatorsDir, file), 'utf-8')
      const yamlMatch = content.match(/```yaml\s*([\s\S]*?)\s*```/)
      
      if (yamlMatch) {
        const metadata = yaml.load(yamlMatch[1]) as any
        results.push({
          id: metadata.id,
          title: metadata.title,
          filePath: file
        })
      }
    } catch (error) {
      console.warn(`Skipping invalid indicator file: ${file}`, error)
    }
  }
  
  return results
}
