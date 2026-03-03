/**
 * Lists all available measure files
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export function listAllMeasures(): Array<{ id: string; title: string; filePath: string }> {
  // Use relative path from project root
  const measuresDir = path.join(__dirname, '..', '..', '..', '..', 'catalogue', 'measures')
  const results: Array<{ id: string; title: string; filePath: string }> = []
  
  const measureFiles = fs.readdirSync(measuresDir)
    .filter(f => f.endsWith('.md'))
  
  for (const file of measureFiles) {
    try {
      const content = fs.readFileSync(path.join(measuresDir, file), 'utf-8')
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
      console.warn(`Skipping invalid measure file: ${file}`, error)
    }
  }
  
  return results
}
