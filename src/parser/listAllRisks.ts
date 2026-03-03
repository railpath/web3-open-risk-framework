/**
 * Lists all available risk files
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export function listAllRisks(): Array<{ id: string; title: string; filePath: string }> {
  // Use relative path from project root
  const risksDir = path.join(__dirname, '..', '..', '..', 'catalogue', 'risks')
  const results: Array<{ id: string; title: string; filePath: string }> = []
  
  // Read all category directories
  const categories = fs.readdirSync(risksDir)
  
  for (const category of categories) {
    const categoryPath = path.join(risksDir, category)
    if (!fs.statSync(categoryPath).isDirectory()) continue
    
    const riskFiles = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.md'))
    
    for (const file of riskFiles) {
      try {
        const filePath = path.join('risks', category, file)
        const content = fs.readFileSync(path.join(categoryPath, file), 'utf-8')
        const yamlMatch = content.match(/```yaml\s*([\s\S]*?)\s*```/)
        
        if (yamlMatch) {
          const metadata = yaml.load(yamlMatch[1]) as any
          results.push({
            id: metadata.id,
            title: metadata.title,
            filePath
          })
        }
      } catch (error) {
        console.warn(`Skipping invalid risk file: ${file}`, error)
      }
    }
  }
  
  return results
}
