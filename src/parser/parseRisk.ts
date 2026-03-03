/**
 * Parses a single risk file
 */

import fs from 'fs'
import path from 'path'
import { extractFrontmatterFromCodeblock } from './extractFrontmatterFromCodeblock'
import { parseMarkdownSections } from './parseMarkdownSections'
import { Risk, RiskParserOptions } from '../types'

export function parseRisk(filePath: string, options: RiskParserOptions = {}): Risk {
  try {
    const absolutePath = path.isAbsolute(filePath) 
      ? filePath 
      : path.join(__dirname, '..', '..', '..', 'catalogue', filePath)
    
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`FILE_NOT_FOUND: Risk file not found: ${filePath}`)
    }
    
    let content
    try {
      content = fs.readFileSync(absolutePath, 'utf-8')
    } catch (readError) {
      throw new Error(`FILE_READ_ERROR: Could not read file ${filePath}: ${(readError as Error).message}`)
    }
    
    const { metadata, markdown } = extractFrontmatterFromCodeblock(content)
    const sections = parseMarkdownSections(markdown)
    
    const risk: Risk = {
      metadata,
      sections,
      filePath: absolutePath
    }
    
    // Optionally include raw content
    if (options.includeRawContent) {
      (risk as any).rawContent = content
    }
    
    return risk
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`PARSE_FAILED: ${message}`)
  }
}
