/**
 * Extracts YAML metadata from code blocks in markdown files
 * Supports the format used in the risk catalogue:
 * 
 * # Title
 * 
 * ```yaml
 * id: R:ID
 * title: Title
 * ...
 * ```
 */

import yaml from 'js-yaml'

interface FrontmatterResult {
  metadata: any
  markdown: string
}

export function extractFrontmatterFromCodeblock(content: string): FrontmatterResult {
  // Match YAML code blocks
  const yamlMatch = content.match(/```yaml\s*([\s\S]*?)\s*```/)
  
  if (!yamlMatch) {
    throw new Error('PARSE_ERROR: No YAML code block found in file')
  }
  
  try {
    const metadata = yaml.load(yamlMatch[1]) as any
    if (!metadata || typeof metadata !== 'object') {
      throw new Error('PARSE_ERROR: Invalid YAML structure in code block')
    }
    
    // Validate required fields
    const requiredFields = ['id', 'title', 'category', 'type', 'scope', 'owner']
    for (const field of requiredFields) {
      if (!(field in metadata)) {
        throw new Error(`PARSE_ERROR: Missing required field '${field}' in YAML metadata`)
      }
    }
    
    // Remove the YAML code block from the content
    const markdown = content.replace(yamlMatch[0], '').trim()
    
    return { metadata, markdown }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`YAML_PARSE_ERROR: ${error.message}`)
    }
    throw new Error('YAML_PARSE_ERROR: Unknown error parsing YAML code block')
  }
}
