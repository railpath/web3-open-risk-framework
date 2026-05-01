# Agent Template V1

This template command creates or updates catalogue markdown artifacts in English, validates them against schemas and cross references, and runs an automated repair loop.

## Supported entities

- `risk`
- `indicator`
- `measure`

## Profiles

- `core` (default)
- `fidleg` (optional extension profile)

## Input format

Pass an input JSON file with at least:

```json
{
  "entity": "risk",
  "id": "R:EXAMPLE_RISK",
  "title": "Example Risk",
  "description": "Short English description.",
  "profile": "core"
}
```

## Commands

Preferred unified entrypoint:

- Validate schema:
  - `npm run risk-cli -- validate schema`
- Validate references:
  - `npm run risk-cli -- validate references`
- Validate all:
  - `npm run risk-cli -- validate all`
- Run template generation:
  - `npm run risk-cli -- template run --input ./examples/template-risk-core.json`
- Show help:
  - `npm run risk-cli -- --help`

- Direct command (still supported):
  - `npm run template -- --input ./examples/template-risk-core.json`
- Dry run:
  - `npm run template -- --input ./examples/template-risk-core.json --dry-run`
- Limit repair iterations:
  - `npm run template -- --input ./examples/template-risk-core.json --max-repair-iterations 2`

## Repair loop behavior

The template command attempts targeted fixes before failing:

- normalize malformed IDs for `R:`, `I:`, `M:`
- normalize invalid risk category to `TECHNICAL`
- remove unresolved references (`I:*`, `M:*`, `R:*`, `A:*`, `ACTION:*`)

If no valid artifact is produced within the configured iteration limit, the command exits non-zero and prints all collected validation errors.
