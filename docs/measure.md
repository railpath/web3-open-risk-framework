#  Measure Template Guide

This document defines the standard structure and purpose of each section used when creating a new risk mitigation measure in the Web3 Open Risk Framework. Measures represent actionable strategies to reduce the severity, likelihood, or persistence of a risk.

Fields marked with **(optional)** can be skipped to create a quick, initial version of the measure entry. These can later be completed for a more detailed assessment.

##  Quick Version

To quickly document a measure, you only need to complete:

- id
- title
- version
- lastUpdate
- description (or the narrative under `## Description`)

The other sections can then be filled in later, based on your priorities or resources.

##  Header Metadata

Basic identifier and classification details.

- **ID**: A unique identifier for the measure. Recommended format: `M:NAME` (e.g., `M:SUBSTITUTION`).
- **Type**: Always `Measure`.
- **Title**: Clear and concise name of the measure.
- **Last Update**: Date of the last revision, **`YYYY-MM-DD`** only (calendar date, no time).
- **Version**: Incremental version number, starting from `1.0`.
- **`impactPotential`** (YAML): `LOW`, `MEDIUM`, or `HIGH` — coarse expected risk reduction (for catalog filtering).
- **`difficulty`** (YAML): `LOW`, `MEDIUM`, or `HIGH` — coarse effort / skill / infrastructure required (for catalog filtering).
- **`riskReductionScope`** (YAML): booleans `severity`, `likelihood`, `persistence` — which risk dimensions the measure can address.

The YAML block is intentionally small: **identity**, **coarse impact/difficulty** (for UIs that filter the catalog), and **scope flags**. Detailed explanation stays in Markdown.

Use **unquoted** enum values for `impactPotential` and `difficulty` (e.g. `HIGH`, not `"HIGH"`), consistent across all measure files.

Example:

```yaml
id: M:SUBSTITUTION
title: Asset Substitution
type: Measure
version: "1.1"
lastUpdate: 2025-06-04
impactPotential: HIGH
difficulty: MEDIUM
riskReductionScope:
  severity: true
  likelihood: true
  persistence: false
```

##  Description

Describe what the measure is and how it helps reduce risk. Clarify the mechanism of action, intended outcome, and what type of risk it targets.

**Example:**
Replaces highly volatile or correlated assets with safer alternatives to reduce portfolio-level exposure. Used when market instability threatens yield or value preservation.

##  Preconditions

Define the conditions under which this measure is applicable. This ensures the measure is only used where meaningful and technically feasible.

Example:

- Asset must be liquid and traded on at least two reputable exchanges
- Suitable benchmark (e.g., ETH or a sector index) should be defined for relative comparisons

##  Implementation

Outline the steps or actions typically required to apply this measure. Helps with operational clarity, automation logic, or dashboard instructions.

Example:

- Monitor yield and risk metrics of all current positions
- Compare with thresholds defined in strategy
- Trigger capital rotation into safer or higher-quality alternatives
- Confirm execution and update exposure logs

##  Risk Reduction Scope

Define which dimensions of risk this measure addresses:

- **Severity**: Can this reduce the impact if the risk materializes?
- **Likelihood**: Can this make the risk less likely to occur?
- **Persistence**: Can this shorten the duration of exposure?

| Dimension   | Addressed? | Comment                             |
| ----------- | ---------- | ----------------------------------- |
| Severity    |           | Reduces loss potential              |
| Likelihood  |           | Reduces exposure to risky positions |
| Persistence |           | Does not affect duration of risk    |

##  Difficulty

`difficulty` in the YAML block uses **`LOW`**, **`MEDIUM`**, or **`HIGH`** for filtering and sorting in catalog UIs.

Optionally expand under this heading with narrative (effort, tooling, expertise) — the heading does not need to repeat the YAML value verbatim.

- **Easy** (maps to `LOW` in YAML): Requires minimal technical or financial knowledge; mostly manual
- **Medium** (maps to `MEDIUM` in YAML): Requires moderate understanding or tooling (e.g., dashboards, yield monitors)
- **Hard** (maps to `HIGH` in YAML): Requires advanced modeling, automation, or multi-platform interaction

##  Impact Potential

`impactPotential` in the YAML block uses **`LOW`**, **`MEDIUM`**, or **`HIGH`**.

How effective is this measure in reducing the targeted risk?

- **Low**: Marginal effect; acts as signal or soft brake
- **Medium**: Helps realign exposure; meaningful risk improvement
- **High**: Strong protection; structural mitigation

##  Usage Guidance

- Measures are mandatory in risk definitions and must be linked by ID.
- Each measure file can be reused across risks and referenced from dashboards.
- **`difficulty`** and **`impactPotential`** in YAML support catalog filtering; narrative sections add context.
- Measures may be manually applied, semi-automated, or fully automated depending on the platform's capabilities.
- Measures should align with investor profile preferences and portfolio strategy.

##  Core schema

A formal `Measure` type in `packages/core` (e.g. Zod/OpenAPI) is **not** required until a product API or parser validates these files; until then, the YAML conventions above and the demo measures are the reference.
