/**
 * Parses a single indicator file
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { Indicator } from '../../types'

export function parseIndicator(filePath: string): Indicator {
  try {
    const absolutePath = path.isAbsolute(filePath) 
      ? filePath 
      : path.join(__dirname, '..', '..', '..', '..', 'catalogue', 'indicators', filePath)
    
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`FILE_NOT_FOUND: Indicator file not found: ${filePath}`)
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
      throw new Error('PARSE_ERROR: No YAML code block found in indicator file')
    }
    
    try {
      const metadata = yaml.load(yamlMatch[1]) as any
      if (!metadata || typeof metadata !== 'object') {
        throw new Error('PARSE_ERROR: Invalid YAML structure in code block')
      }
      
      // Validate required fields
      const requiredFields = ['id', 'title']
      for (const field of requiredFields) {
        if (!(field in metadata)) {
          throw new Error(`PARSE_ERROR: Missing required field '${field}' in YAML metadata`)
        }
      }
      
      // Remove the YAML code block from the content
      const markdown = content.replace(yamlMatch[0], '').trim()
      
      const indicator: Indicator = {
        id: metadata.id,
        title: metadata.title,
        category: metadata.category,
        description: markdown,
        relatedRisks: metadata.relatedRisks,
        filePath: absolutePath
      }
      
      return indicator
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
