import {
    FileType,
    ValidationResult,
    ValidationStats,
    extractAndParseYaml,
    findFiles,
    getRelativePath,
    printFileResults,
    printSuccessMessage,
    printValidationHeader,
    printValidationSummary,
    readFileSafely,
    validateAgainstSchema
} from './utils/index.js';

import fs from 'fs';
import path from 'path';

// Find the module root directory (where demo/ and schema/ folders are located)
const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const baseDir = path.resolve(scriptDir, '..', '..', 'demo');
const schemaDir = path.resolve(scriptDir, '..', '..', 'schema');

// File type configurations
const fileTypes: FileType[] = [
    {
        name: 'Risk',
        pattern: /risks\/[\w_\-:.]+\.md$/,
        schema: 'risk.schema.json',
    },
    {
        name: 'Indicator',
        pattern: /indicators\/[\w_\-:.]+\.md$/,
        schema: 'indicator.schema.json',
    },
    {
        name: 'Assessment',
        pattern: /assessments\/[\w_\-:.]+\.md$/,
        schema: 'assessment.schema.json',
    },
    {
        name: 'Measure',
        pattern: /measures\/[\w_\-:.]+\.md$/,
        schema: 'measure.schema.json',
    },
];

// Validate a single file against its schema
function validateFile(filePath: string, schemaPath: string): ValidationResult {
    const content = readFileSafely(filePath);
    if (!content) {
        return { 
            valid: false, 
            error: `Could not read file ${filePath}` 
        };
    }
    
    const parseResult = extractAndParseYaml(content);
    if (parseResult.error) {
        return { 
            valid: false, 
            error: parseResult.error 
        };
    }
    
    return validateAgainstSchema(parseResult.data, schemaPath, filePath, scriptDir);
}

// Main validation function
async function main(): Promise<void> {
    printValidationHeader(
        'Validating Markdown files with YAML metadata...',
        'Expected format: ```yaml ... ``` blocks (preferred) or --- frontmatter (legacy)'
    );
    
    const stats: ValidationStats = { total: 0, valid: 0, invalid: 0 };
    
    for (const type of fileTypes) {
        const dir = path.join(baseDir, type.name.toLowerCase() + 's');
        if (!fs.existsSync(dir)) continue;
        
        const files = findFiles(dir, type.pattern);
        if (files.length === 0) continue;
        
        console.log(`\nValidating ${type.name} Files:`);
        const schemaPath = path.join(schemaDir, type.schema);
        
        for (const file of files) {
            stats.total++;
            const result = validateFile(file, schemaPath);
            const shortName = getRelativePath(file, baseDir);
            
            printFileResults(shortName, result.valid, result.error);
            
            if (result.valid) {
                stats.valid++;
            } else {
                stats.invalid++;
            }
        }
    }
    
    printValidationSummary(stats);
    
    if (stats.invalid > 0) {
        process.exit(1);
    } else {
        printSuccessMessage();
        process.exit(0);
    }
}

// Run validation
main();
