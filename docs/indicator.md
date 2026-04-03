#  Indicator Template Guide

This document defines the standard structure and purpose of each section used when creating a new risk indicator in the Web3 Open Risk Framework. Indicators serve as measurable signals that can be used to monitor, evaluate, and trigger risk-related assessments.

Fields marked with **(optional)** can be skipped to create a quick, initial version of the indicator entry. These can later be completed for a more detailed assessment.

##  Quick Version

To quickly document an indicator, you only need to complete:

- id
- title
- version
- lastUpdate
- description (or the `## Description` section)

The other sections can then be filled in later, based on your priorities or resources.

---

##  Header Metadata

Basic identifier and classification details.

- **ID**: A unique identifier for the indicator. Recommended format: `I:NAME` (e.g., `I:VOLATILITY`).
- **Type**: Always `Indicator`.
- **Title**: Clear and concise name of the indicator.
- **Last Update**: Date of the last revision, **`YYYY-MM-DD`** only (calendar date, no time).
- **Version**: Incremental version number, starting from `0.1`.
- **Summary** (optional): One-line preview; long narrative belongs under `## Description` in the Markdown body.

Example:

```yaml
id: I:VOLATILITY
type: Indicator
title: Volatility
version: "1.0"
lastUpdate: 2025-06-04
summary: Optional one-line preview; long text under ## Description.

preconditions:
  - name: Minimum history window
  - name: Comparable benchmark defined

methodology:
  - name: Data sourcing
  - name: Core calculation window

limitations:
  - name: Data quality
  - name: Interpretation

computation:
  frequency: daily
  dataSources:
    - type: api
    - type: oracle

thresholds:
  veryHigh: "> 60%"
  high: "40% – 60%"
  medium: "20% – 40%"
  low: "10% – 20%"
  veryLow: "< 10%"
```

Structured lists (`preconditions`, `methodology`, `limitations`) each require at least one entry (YAML and/or the matching `##` sections below). Long-form text uses `## Description` first; YAML `description` is fallback only.

---

## Description

Explain what the indicator measures and why it is relevant. Clarify the risk dimension it addresses (e.g., market fluctuations, protocol instability, behavioral signals) and how it contributes to identifying or tracking a specific risk condition.

**Example:**
Measures the degree of price fluctuations over time. High volatility is often correlated with uncertainty, low liquidity, or manipulation. Useful for identifying unstable asset behavior or risk exposure in trading.

---

##  Preconditions

Specify the conditions that must be met for this indicator to be meaningful or applicable.

Example:

- Minimum of 30 days of price data required
- Asset must be liquid and traded on at least two reputable exchanges
- Suitable benchmark (e.g., ETH or a sector index) should be defined for relative comparisons

---

##  Methodology

Describe the step-by-step process for calculating the indicator. This section ensures reproducibility and transparency.

Example structure:

- Data Source: Pull historical price data from on-chain oracles or off-chain APIs (e.g., CoinGecko, Chainlink).
- Cleaning: Handle missing values, outliers, and ensure consistent time intervals.
- Return Calculation: Compute daily log returns from closing prices.
- Volatility Calculation: Calculate the standard deviation of returns.
- Annualization: Multiply by √252 to annualize daily volatility.
- Rolling Window: Apply a 30-day rolling average to smooth the signal.
- Benchmarking: Compare the asset's volatility to ETH or BTC as baseline.

Optional additions:

- Clustering: Identify volatility regimes (low vs. high) with thresholds.
- Charting: Include historical volatility chart for visual representation.

---

##  Limitations

Describe key limitations and potential weaknesses of the indicator.

Structure:

- Data Quality: Susceptible to bad price feeds or oracle manipulation.
- Time Sensitivity: Lagging indicator; reacts to past events.
- Assumptions: Normal distribution of returns may not hold.
- Interpretation Risk: High volatility may indicate opportunity, not just risk.

---

##  Assessment

Define how the indicator translates into a risk level using thresholds. Include suggested actions (strategies) and responsibilities.

| **Risk Level** | **Threshold**       | **Description**                                      | **Strategy**         | **Risk Owner**         |
|----------------|---------------------|------------------------------------------------------|----------------------|-------------------------|
| 5 – Very High  | Volatility > 60%    | Extreme fluctuations, significant uncertainty        | Avoid or Reduce      | Protocol Team / Investor |
| 4 – High       | 40% – 60%           | High volatility, increased exposure risk             | Reduce               | Investor                 |
| 3 – Medium     | 20% – 40%           | Moderate volatility, manageable but notable          | Monitor              | Investor / Platform      |
| 2 – Low        | 10% – 20%           | Low but noticeable fluctuations                      | Accept               | Investor                 |
| 1 – Very Low   | < 10%               | Very stable, minimal fluctuation                     | Accept               | Investor                 |

 **Note**: When this indicator is assigned to a risk, it carries 100% influence by default. You can link multiple indicators to a single risk, in which case weighting must be determined manually.

Which risks reference an indicator is not duplicated in the indicator file; it is derived from each risk’s `indicators` list.

---

##  Standard Configurations (optional)

These values define what each investor profile considers "acceptable" or "concerning" based on their risk appetite.

| **Profile**   | **Very High** | **High**  | **Medium** | **Low**   | **Very Low** |
|---------------|---------------|-----------|------------|-----------|--------------|
| Conservative  | > 40%         | 30 – 40%  | 20 – 30%   | 10 – 20%  | < 10%        |
| Moderate      | > 50%         | 40 – 50%  | 25 – 40%   | 15 – 25%  | < 15%        |
| Aggressive    | > 60%         | 50 – 60%  | 30 – 50%   | 20 – 30%  | < 20%        |

 *These profiles are examples only. Investors must define their own acceptable ranges based on objectives and constraints.*

Investor profiles are not part of the core YAML block in the reference implementation.

---

##  Usage Guidance

- Indicators are reusable across risks, but relevance depends on context.
- Risks may link to one or more indicators. Weighting between indicators is not represented in the core YAML in the reference implementation.
- You may visualize this indicator in dashboards or alerts.
- Thresholds can be configured globally or per-investor using `Standard Configurations`.
- An indicator can trigger automated responses, but must always be paired with qualitative context for interpretation.

