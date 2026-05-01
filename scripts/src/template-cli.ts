#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateMarkdown, getTargetPath } from './template/generator.js';
import { applyRepairIteration, runValidationGates, writeCandidateFile } from './template/repair.js';
import { TemplateInput, TemplateOptions, TemplateProfile, TemplateResult } from './template/types.js';

interface CliArgs {
  inputPath: string;
  dryRun: boolean;
  maxRepairIterations: number;
}

function parseArgs(argv: string[]): CliArgs {
  const args = argv.slice(2);
  const getArg = (name: string): string | undefined => {
    const flagIndex = args.indexOf(name);
    if (flagIndex === -1) return undefined;
    return args[flagIndex + 1];
  };

  const inputPath = getArg('--input');
  if (!inputPath) {
    throw new Error('Missing required --input <path-to-json>');
  }

  const dryRun = args.includes('--dry-run');
  const maxRepairRaw = getArg('--max-repair-iterations');
  const maxRepairIterations = maxRepairRaw ? Number(maxRepairRaw) : 3;

  if (!Number.isFinite(maxRepairIterations) || maxRepairIterations < 0) {
    throw new Error('--max-repair-iterations must be a non-negative number');
  }

  return { inputPath, dryRun, maxRepairIterations };
}

function assertEnglishInput(input: TemplateInput): void {
  if (/[äöüßÄÖÜ]/.test(input.title) || /[äöüßÄÖÜ]/.test(input.description)) {
    throw new Error('Input title/description must be English-only text in V1 (no German umlauts/ß).');
  }
}

function readInput(inputPath: string): TemplateInput {
  const raw = fs.readFileSync(inputPath, 'utf8');
  const parsed = JSON.parse(raw) as TemplateInput;

  if (!parsed.entity || !parsed.id || !parsed.title || !parsed.description) {
    throw new Error('Input JSON must include: entity, id, title, description');
  }

  assertEnglishInput(parsed);
  return parsed;
}

function getSchemaPath(frameworkRoot: string, input: TemplateInput): string {
  const schemaDir = path.join(frameworkRoot, 'schema');
  if (input.entity === 'risk') return path.join(schemaDir, 'risk.schema.json');
  if (input.entity === 'indicator') return path.join(schemaDir, 'indicator.schema.json');
  return path.join(schemaDir, 'measure.schema.json');
}

function resolveProfile(input: TemplateInput): TemplateProfile {
  return input.profile === 'fidleg' ? 'fidleg' : 'core';
}

function runTemplate(input: TemplateInput, options: TemplateOptions): TemplateResult {
  const __filename = fileURLToPath(import.meta.url);
  const scriptDir = path.dirname(__filename);
  const frameworkRoot = path.resolve(scriptDir, '..', '..');
  const riskFrameworkRoot = path.resolve(frameworkRoot, '..');
  const catalogueDir = path.join(riskFrameworkRoot, 'catalogue');
  const schemaPath = getSchemaPath(frameworkRoot, input);
  const profile = resolveProfile(input);

  const targetPath = getTargetPath(catalogueDir, input);
  const ctx = {
    nowDate: new Date().toISOString().split('T')[0],
    profile
  };

  const existedBeforeRun = fs.existsSync(targetPath);
  const originalContent = existedBeforeRun ? fs.readFileSync(targetPath, 'utf8') : null;
  let candidateMarkdown = generateMarkdown(input, ctx);
  const changes: string[] = ['Generated initial markdown from template'];
  const errors: string[] = [];
  let iterations = 0;

  while (iterations <= options.maxRepairIterations) {
    writeCandidateFile(targetPath, candidateMarkdown);
    const validation = runValidationGates(candidateMarkdown, targetPath, schemaPath, scriptDir, catalogueDir);
    if (validation.schemaValid && validation.referenceValid) {
      if (options.dryRun) {
        if (existedBeforeRun && originalContent !== null) {
          fs.writeFileSync(targetPath, originalContent, 'utf8');
        } else if (fs.existsSync(targetPath)) {
          fs.unlinkSync(targetPath);
        }
      }
      return {
        success: true,
        outputPath: targetPath,
        iterations,
        changes,
        errors
      };
    }

    errors.push(...validation.errors);
    if (iterations === options.maxRepairIterations) {
      break;
    }

    candidateMarkdown = applyRepairIteration(candidateMarkdown, input, validation.errors, changes);
    iterations += 1;
  }

  if (options.dryRun) {
    if (existedBeforeRun && originalContent !== null) {
      fs.writeFileSync(targetPath, originalContent, 'utf8');
    } else if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
  }

  return {
    success: false,
    outputPath: targetPath,
    iterations,
    changes,
    errors
  };
}

function printResult(result: TemplateResult): void {
  if (result.success) {
    console.log('Template CLI run completed successfully.');
    console.log(`Output: ${result.outputPath}`);
    console.log(`Repair iterations: ${result.iterations}`);
    if (result.changes.length > 0) {
      console.log('Applied changes:');
      for (const entry of result.changes) {
        console.log(`- ${entry}`);
      }
    }
    return;
  }

  console.error('Template CLI run failed to produce a valid artifact.');
  console.error(`Output candidate: ${result.outputPath}`);
  console.error(`Repair iterations: ${result.iterations}`);
  if (result.errors.length > 0) {
    console.error('Validation errors:');
    for (const entry of result.errors) {
      console.error(`- ${entry}`);
    }
  }
}

function main(): void {
  try {
    const args = parseArgs(process.argv);
    const input = readInput(path.resolve(args.inputPath));
    const result = runTemplate(input, {
      dryRun: args.dryRun,
      maxRepairIterations: args.maxRepairIterations
    });
    printResult(result);
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('Template execution failed:', error);
    process.exit(1);
  }
}

main();
