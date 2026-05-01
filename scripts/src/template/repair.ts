import fs from 'fs';
import path from 'path';
import { extractAndParseYaml } from '../utils/yamlUtils.js';
import { validateAgainstSchema } from '../utils/schemaUtils.js';
import { getFilesFromDirectory } from '../utils/fileUtils.js';
import { validateFileReferences } from '../utils/referenceUtils.js';
import { TemplateInput } from './types.js';

const VALID_RISK_CATEGORIES = new Set([
  'FINANCIAL',
  'DEPENDENCY',
  'TECHNICAL',
  'APPLICATION',
  'ORGANIZATIONAL',
  'CONTRACT',
  'HUMAN_ERROR',
  'COMPLIANCE'
]);

export interface ValidationGateResult {
  schemaValid: boolean;
  referenceValid: boolean;
  errors: string[];
}

function yamlValue(value: unknown): string {
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return value.map((item) => `\n  - ${yamlValue(item)}`).join('');
  }
  if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }
  if (typeof value === 'string') return value;
  return String(value);
}

function replaceOrAppendYamlField(content: string, key: string, value: unknown): string {
  const yamlBlockMatch = content.match(/```yaml\s*([\s\S]*?)\s*```/);
  if (!yamlBlockMatch) return content;

  const fullBlock = yamlBlockMatch[0];
  const yamlBody = yamlBlockMatch[1];
  const fieldRegex = new RegExp(`^${key}:.*$`, 'm');
  const serialized = `${key}: ${yamlValue(value)}`;
  const updatedBody = fieldRegex.test(yamlBody)
    ? yamlBody.replace(fieldRegex, serialized)
    : `${yamlBody.trimEnd()}\n${serialized}\n`;

  return content.replace(fullBlock, `\`\`\`yaml\n${updatedBody.trim()}\n\`\`\``);
}

export function runValidationGates(
  markdown: string,
  targetPath: string,
  schemaPath: string,
  scriptDir: string,
  catalogueDir: string
): ValidationGateResult {
  const normalizeRefs = (values: string[]): string[] => {
    const expanded = new Set<string>();
    for (const value of values) {
      expanded.add(value);
      expanded.add(value.replace(/\.FIDLEG$/, ''));
    }
    return Array.from(expanded);
  };

  const parseResult = extractAndParseYaml(markdown);
  if (parseResult.error) {
    return {
      schemaValid: false,
      referenceValid: false,
      errors: [parseResult.error]
    };
  }

  const schemaResult = validateAgainstSchema(parseResult.data, schemaPath, targetPath, scriptDir);
  const errors: string[] = [];
  if (!schemaResult.valid && schemaResult.error) {
    errors.push(`Schema: ${schemaResult.error}`);
  }

  const references = validateFileReferences(
    targetPath,
    normalizeRefs(getFilesFromDirectory(path.join(catalogueDir, 'indicators'))),
    normalizeRefs(getFilesFromDirectory(path.join(catalogueDir, 'measures'))),
    normalizeRefs(getFilesFromDirectory(path.join(catalogueDir, 'assessments'))),
    normalizeRefs(getFilesFromDirectory(path.join(catalogueDir, 'risks'))),
    normalizeRefs(getFilesFromDirectory(path.join(catalogueDir, 'actions')))
  );

  if (references.length > 0) {
    for (const refError of references) {
      errors.push(`Reference: ${refError.message}`);
    }
  }

  return {
    schemaValid: schemaResult.valid,
    referenceValid: references.length === 0,
    errors
  };
}

function dropMissingReferences(markdown: string, missing: string[]): string {
  if (missing.length === 0) return markdown;
  const lines = markdown.split('\n');
  const filtered = lines.filter((line) => !missing.some((token) => line.includes(`- ${token}`)));
  return filtered.join('\n');
}

function ensureArrayField(markdown: string, field: 'indicators' | 'measures'): string {
  const lines = markdown.split('\n');
  const startIndex = lines.findIndex((line) => line.trim() === `${field}:`);
  if (startIndex === -1) return markdown;

  const nextLine = lines[startIndex + 1] ?? '';
  if (nextLine.trim().startsWith('-')) return markdown;
  if (nextLine.trim() === '[]') return markdown;

  lines[startIndex] = `${field}: []`;
  return lines.join('\n');
}

export function applyRepairIteration(
  markdown: string,
  input: TemplateInput,
  errors: string[],
  changed: string[]
): string {
  let next = markdown;

  if (input.entity === 'risk') {
    const category = (input.category ?? 'TECHNICAL').toUpperCase();
    if (!VALID_RISK_CATEGORIES.has(category)) {
      next = replaceOrAppendYamlField(next, 'category', 'TECHNICAL');
      changed.push('Normalized invalid category to TECHNICAL');
    }
  }

  const missingRefs = errors
    .filter((line) => line.startsWith('Reference:'))
    .map((line) => {
      const match = line.match(/(I:[A-Z0-9_.]+|M:[A-Z0-9_.]+|R:[A-Z0-9_.]+|A:[A-Z0-9_.]+|ACTION:[A-Z_]+:[A-Z_]+)/);
      return match?.[1] ?? '';
    })
    .filter(Boolean);

  if (missingRefs.length > 0) {
    next = dropMissingReferences(next, missingRefs);
    next = ensureArrayField(next, 'indicators');
    next = ensureArrayField(next, 'measures');
    changed.push(`Removed missing references: ${missingRefs.join(', ')}`);
  }

  if (errors.some((line) => line.includes('must match pattern "^I:'))) {
    const normalized = input.id.startsWith('I:') ? input.id : `I:${input.id.replace(/^I:/, '')}`;
    next = replaceOrAppendYamlField(next, 'id', normalized);
    changed.push('Normalized indicator id format');
  }
  if (errors.some((line) => line.includes('must match pattern "^M:'))) {
    const normalized = input.id.startsWith('M:') ? input.id : `M:${input.id.replace(/^M:/, '')}`;
    next = replaceOrAppendYamlField(next, 'id', normalized);
    changed.push('Normalized measure id format');
  }
  if (errors.some((line) => line.includes('must match pattern "^R:'))) {
    const normalized = input.id.startsWith('R:') ? input.id : `R:${input.id.replace(/^R:/, '')}`;
    next = replaceOrAppendYamlField(next, 'id', normalized);
    changed.push('Normalized risk id format');
  }

  return next;
}

export function writeCandidateFile(targetPath: string, markdown: string): void {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, markdown, 'utf8');
}
