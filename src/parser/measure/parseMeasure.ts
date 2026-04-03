/**
 * Parses a single measure file
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { Measure } from '../../types'

export function parseMeasure(filePath: string): Measure {
  try {
    const absolutePath = path.isAbsolute(filePath) 
      ? filePath 
      : path.join(__dirname, '..', '..', '..', '..', 'catalogue', 'measures', filePath)
    
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`FILE_NOT_FOUND: Measure file not found: ${filePath}`)
    }
    
    let content
    try {
      content = fs.readFileSync(absolutePath, 'utf-8')
    } catch (readError) {
      throw new Error(`FILE_READ_ERROR: Could not read file ${filePath}: ${(readError as Error).message}`)
    }
    
    // Match YAML code blocks
    const yamlMatch = content.match(/```yaml\s*([\s\S]*?)\s*```/)
    if (!yamlMatch) {
      throw new Error('PARSE_ERROR: No YAML code block found in measure file')
    }
    
    try {
      const metadata = yaml.load(yamlMatch[1]) as any
      if (!metadata || typeof metadata !== 'object') {
        throw new Error('PARSE_ERROR: Invalid YAML structure in code block')
      }

      // Schema validation runs via npm scripts in this package (e.g. validate:catalogue), not at parse time — same as risks/indicators.
      const requiredFields = ['id', 'title']
      for (const field of requiredFields) {
        if (!(field in metadata)) {
          throw new Error(`PARSE_ERROR: Missing required field '${field}' in YAML metadata`)
        }
      }

      // Remove the YAML code block from the content
      const markdown = content.replace(yamlMatch[0], '').trim()
      
      const measure: Measure = {
        id: metadata.id,
        title: metadata.title,
        category: metadata.category,
        description: markdown,
        relatedRisks: metadata.relatedRisks,
        filePath: absolutePath
      }
      
      return measure
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`YAML_PARSE_ERROR: ${error.message}`)
      }
      throw new Error('YAML_PARSE_ERROR: Unknown error parsing YAML code block')
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`PARSE_FAILED: ${message}`)
  }
}
