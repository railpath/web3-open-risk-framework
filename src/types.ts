/**
 * Type definitions for Risk Catalogue Parser
 */

export interface Risk {
  /**
   * Parsed YAML frontmatter metadata
   */
  metadata: {
    id: string
    title: string
    category: string
    type: string
    scopes: string[]
    owners: string[]
    severity: string
    probability: string
    impact: string
    indicators?: string[]
    measures?: string[]
    objectives?: Array<{
      type: string
      direction: string
      goal: string
    }>
    [key: string]: any  // Allow additional metadata fields
  }
  
  /**
   * Structured content sections parsed from markdown
   * Keys are section headings (e.g., "Description", "Context")
   */
  sections: Record<string, string>
  
  /**
   * Absolute file path to the risk markdown file
   */
  filePath: string
  
  /**
   * Optional raw content (only included when requested)
   */
  rawContent?: string
}

export interface Indicator {
  /**
   * Indicator ID (e.g., "I:LIQUIDITY")
   */
  id: string
  
  /**
   * Indicator title
   */
  title: string
  
  /**
   * Category (optional)
   */
  category?: string
  
  /**
   * Full description
   */
  description: string
  
  /**
   * Related risks (optional)
   */
  relatedRisks?: string[]
  
  /**
   * Absolute file path
   */
  filePath: string
}

export interface Measure {
  /**
   * Measure ID (e.g., "M:LIQUIDITY_MANAGEMENT")
   */
  id: string
  
  /**
   * Measure title
   */
  title: string
  
  /**
   * Category (optional)
   */
  category?: string
  
  /**
   * Full description
   */
  description: string
  
  /**
   * Related risks (optional)
   */
  relatedRisks?: string[]
  
  /**
   * Absolute file path
   */
  filePath: string
}

export interface RiskParserOptions {
  /**
   * Include raw markdown content in the result
   * @default false
   */
  includeRawContent?: boolean
}

export interface RiskListItem {
  id: string
  title: string
  filePath: string
}

export interface IndicatorListItem {
  id: string
  title: string
  filePath: string
}

export interface MeasureListItem {
  id: string
  title: string
  filePath: string
}
=======
