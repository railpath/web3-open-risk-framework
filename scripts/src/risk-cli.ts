#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

type ValidateMode = 'schema' | 'references' | 'all';

function printUsage(): void {
  console.log(`risk-cli usage:

  risk-cli validate schema
  risk-cli validate references
  risk-cli validate all
  risk-cli template run --input <json-file> [--dry-run] [--max-repair-iterations N]
`);
}

function runNodeScript(scriptPath: string, args: string[] = []): number {
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    stdio: 'inherit'
  });

  if (typeof result.status === 'number') {
    return result.status;
  }
  return 1;
}

function runValidate(mode: ValidateMode): number {
  const __filename = fileURLToPath(import.meta.url);
  const distDir = path.dirname(__filename);
  const frameworkRoot = path.resolve(distDir, '..', '..');
  const riskFrameworkRoot = path.resolve(frameworkRoot, '..');
  const rootScriptsDir = path.join(riskFrameworkRoot, 'scripts');

  const schemaScript = path.join(rootScriptsDir, 'validate-markdown.mjs');
  const referencesScript = path.join(rootScriptsDir, 'validate-references.mjs');

  if (!fs.existsSync(schemaScript) || !fs.existsSync(referencesScript)) {
    console.error('Cannot locate root catalogue validator scripts in packages/risk-catalogue/scripts.');
    return 1;
  }

  if (mode === 'schema') return runNodeScript(schemaScript);
  if (mode === 'references') return runNodeScript(referencesScript);

  const schemaExit = runValidate('schema');
  if (schemaExit !== 0) return schemaExit;
  return runValidate('references');
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }
  const [command, subcommand, ...rest] = args;

  if (command === 'validate') {
    if (subcommand !== 'schema' && subcommand !== 'references' && subcommand !== 'all') {
      console.error('Unknown validate mode. Expected one of: schema, references, all.');
      printUsage();
      process.exit(1);
    }
    process.exit(runValidate(subcommand));
  }

  if (command === 'template') {
    if (subcommand !== 'run') {
      console.error('Unknown template command. Expected: template run');
      printUsage();
      process.exit(1);
    }
    const __filename = fileURLToPath(import.meta.url);
    const distDir = path.dirname(__filename);
    const templateScript = path.join(distDir, 'template-cli.js');
    process.exit(runNodeScript(templateScript, rest));
  }

  console.error(`Unknown command: ${command}`);
  printUsage();
  process.exit(1);
}

main();
