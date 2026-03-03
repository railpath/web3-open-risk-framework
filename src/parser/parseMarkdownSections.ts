/**
 * Parses markdown content into sections based on headings
 */

export function parseMarkdownSections(markdown: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const lines = markdown.split('\n')
  let currentSection = ''
  let currentContent = ''
  
  for (const line of lines) {
    // Match headings (## or ###)
    const headingMatch = line.match(/^(##|###)\s+(.+)/)
    if (headingMatch) {
      // Save previous section
      if (currentSection && currentContent.trim()) {
        sections[currentSection] = currentContent.trim()
      }
      
      // Start new section
      currentSection = headingMatch[2]
      currentContent = ''
    } else if (currentSection) {
      currentContent += line + '\n'
    }
  }
  
  // Save last section
  if (currentSection && currentContent.trim()) {
    sections[currentSection] = currentContent.trim()
  }
  
  return sections
}
