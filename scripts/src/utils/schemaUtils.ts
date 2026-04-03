import Ajv from 'ajv';
import Ajv2020 from 'ajv/dist/2020.js';
import { ValidationResult } from '../types/types.js';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';

/**
 * Same as packages/risk-framework/scripts/validate-markdown.mjs: risk.schema.json uses
 * Draft 2020-12 (Ajv2020); other schemas use Draft-07 (default Ajv).
 * Do not merge into a single Ajv variant.
 */
export function createAjvForSchemaJson(schema: Record<string, unknown>): any {
    const is2020 = String(schema.$schema ?? '').includes('2020-12');
    // validateSchema: false — otherwise compile() fails on *-fidleg.schema.json
    // (wrapper declares Draft-07 in $schema but $refs risk.schema.json Draft 2020-12).
    const ajv = is2020
        ? new Ajv2020({ allErrors: true, strict: false, validateSchema: false })
        : new Ajv({ allErrors: true, strict: false, validateSchema: false });
    addFormats(ajv);
    return ajv;
}

/**
 * Load JSON schema from file
 */
export function loadSchema(schemaPath: string): any {
    return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

/**
 * Get appropriate schema path for FIDLEG files
 */
export function getSchemaPath(
    baseSchemaPath: string,
    filePath: string,
    scriptDir: string
): string {
    if (!filePath.includes('.FIDLEG.md')) {
        return baseSchemaPath;
    }
    
    const fidlegSchemaPath = path.resolve(
        scriptDir,
        '..',
        '..',
        'extensions',
        'fidleg',
        'schema',
        path.basename(baseSchemaPath).replace('.schema.json', '-fidleg.schema.json')
    );
    
    if (fs.existsSync(fidlegSchemaPath)) {
        return fidlegSchemaPath;
    }
    
    return baseSchemaPath;
}

/**
 * Create combined schema for FIDLEG files
 */
export function createCombinedSchema(baseSchema: any, fidlegSchema: any): any {
    const combinedSchema = {
        ...baseSchema,
        ...fidlegSchema,
        allOf: [
            baseSchema,
            fidlegSchema
        ]
    };
    delete combinedSchema.allOf; // Remove the allOf to avoid circular reference
    return combinedSchema;
}

/**
 * Compile schema for validation
 */
export function compileSchema(
    schemaPath: string,
    filePath: string,
    scriptDir: string,
    ajv: any
): any {
    const actualSchemaPath = getSchemaPath(schemaPath, filePath, scriptDir);
    const schema = loadSchema(actualSchemaPath);

    // For FIDLEG schemas, we need to resolve the $ref paths manually
    if (actualSchemaPath.includes('fidleg')) {
        const baseSchemaPath = path.resolve(
            scriptDir,
            '..',
            '..',
            'schema',
            path.basename(actualSchemaPath).replace('-fidleg.schema.json', '.schema.json')
        );
        const baseSchema = loadSchema(baseSchemaPath);
        const combinedSchema = createCombinedSchema(baseSchema, schema);
        return ajv.compile(combinedSchema);
    }

    return ajv.compile(schema);
}

/**
 * Validate data against schema
 */
export function validateAgainstSchema(
    data: any,
    schemaPath: string,
    filePath: string,
    scriptDir: string
): ValidationResult {
    const actualSchemaPath = getSchemaPath(schemaPath, filePath, scriptDir);
    let metaForAjv: Record<string, unknown> = loadSchema(actualSchemaPath);
    // risk-fidleg.schema.json declares Draft-07 in $schema but references risk (2020-12)
    if (actualSchemaPath.includes('risk-fidleg')) {
        const baseRiskPath = path.resolve(
            scriptDir,
            '..',
            '..',
            'schema',
            'risk.schema.json'
        );
        metaForAjv = loadSchema(baseRiskPath);
    }
    const ajv = createAjvForSchemaJson(metaForAjv);
    const validate = compileSchema(schemaPath, filePath, scriptDir, ajv);
    
    const valid = validate(data);
    if (!valid) {
        return {
            valid: false,
            error: ajv.errorsText(validate.errors, { separator: '\n' })
        };
    }
    
    return { valid: true };
}
