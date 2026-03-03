/**
 * Extracts YAML frontmatter and markdown content from a file
 */

import yaml from 'js-yaml'

interface FrontmatterResult {
  metadata: any
  markdown: string
}

export function extractFrontmatter(content: string): FrontmatterResult {
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/)
  if (!frontmatterMatch) {
    throw new Error('PARSE_ERROR: No YAML frontmatter found in risk file')
  }
  
  try {
    const metadata = yaml.load(frontmatterMatch[1]) as any
    if (!metadata || typeof metadata !== 'object') {
      throw new Error('PARSE_ERROR: Invalid YAML structure in frontmatter')
    }
    
    // Validate required fields
    const requiredFields = ['id', 'title', 'category', 'type', 'scopes', 'owners']
    for (const field of requiredFields) {
      if (!(field in metadata)) {
        throw new Error(`PARSE_ERROR: Missing required field '${field}' in YAML frontmatter`)
      }
    }
    
    const markdown = content.slice(frontmatterMatch[0].length).trim()
    return { metadata, markdown }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`YAML_PARSE_ERROR: ${error.message}`)
    }
    throw new Error('YAML_PARSE_ERROR: Unknown error parsing YAML frontmatter')
  }
}
