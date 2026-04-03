import yaml from 'js-yaml';

/**
 * Extract YAML block from markdown content
 * Supports both ```yaml blocks (preferred) and --- frontmatter (legacy)
 */
export function extractYamlBlock(content: string): string | null {
  // Extract YAML from ```yaml code blocks (preferred format)
  const yamlMatch = content.match(/```yaml\s*([\s\S]*?)\s*```/);
  if (yamlMatch) {
    return yamlMatch[1];
  }

  // Fallback to YAML frontmatter (legacy support)
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (frontmatterMatch) {
    console.warn('⚠️  Using legacy frontmatter format (---). Please convert to ```yaml blocks.');
    return frontmatterMatch[1];
  }

  return null;
}

/**
 * Parse YAML content safely
 */
export function parseYaml(yamlContent: string): { data: any; error?: string } {
  try {
    const data = yaml.load(yamlContent);
    return { data };
  } catch (error: any) {
    return {
      data: null,
      error: 'YAML parse error: ' + error.message
    };
  }
}

/**
 * Calendar dates for schema validation: YYYY-MM-DD only (no date-time).
 */
export function normalizeDateFields(data: any): any {
  if (!data || typeof data !== 'object') return data;
  const toDay = (v: unknown) => {
    if (v instanceof Date) return v.toISOString().split('T')[0];
    if (typeof v === 'string' && v.includes('T')) return v.split('T')[0];
    return v;
  };
  const out = { ...data };
  for (const key of ['lastUpdate', 'date', 'nextReviewDate']) {
    if (key in out) out[key] = toDay(out[key]);
  }
  if (Array.isArray(out.timeline)) {
    out.timeline = out.timeline.map((row: any) =>
      row && typeof row === 'object' && row.date != null
        ? { ...row, date: toDay(row.date) }
        : row
    );
  }
  return out;
}

/**
 * Extract and parse YAML from markdown content
 */
export function extractAndParseYaml(content: string): { data: any; error?: string } {
  const yamlBlock = extractYamlBlock(content);

  if (!yamlBlock) {
    return {
      data: null,
      error: 'Missing or invalid YAML block. Expected ```yaml ... ``` format.'
    };
  }

  const parseResult = parseYaml(yamlBlock);
  if (parseResult.error) {
    return parseResult;
  }

  const normalizedData = normalizeDateFields(parseResult.data);
  return { data: normalizedData };
}
