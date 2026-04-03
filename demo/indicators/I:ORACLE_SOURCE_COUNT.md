# Indicator: Oracle Source Count

```yaml
id: I:ORACLE_SOURCE_COUNT
title: Oracle Source Count
version: "1.0"
lastUpdate: 2026-01-14
description: null
preconditions: []
methodology: []
limitations: []
thresholds:
  veryHigh: null
  high: null
  medium: null
  low: null
  veryLow: null
extensions: []
regulatoryExtensions: {}
```

## Description

Tracks the number of independent data sources feeding into an oracle system. Higher source count reduces single-point-of-failure risk and makes price manipulation more difficult and expensive.

Diversified oracle sources are fundamental to preventing oracle attacks and ensuring data integrity in DeFi protocols.

##  Preconditions

- Ability to query oracle network configuration
- Clear definition of "independence" (distinct API endpoints, different providers)
- Understanding of data aggregation methodology (median, average, weighted)
- Minimum operational history to verify source reliability

##  Methodology

- **Source Enumeration:** Identify all active data providers in oracle network
- **Independence Verification:** Confirm sources use distinct upstream data
- **Weight Analysis:** Account for weighted vs equal contribution
- **Geographic Distribution:** Assess geographic diversity of sources
- **Update Frequency:** Verify all sources actively updating

**Effective Source Count:**
```
Effective Sources = Σ(Independent Sources) × Diversity Factor

Diversity Factor = 
  1.0 if all sources geographically distributed
  0.8 if sources concentrated in 2-3 regions
  0.6 if sources concentrated in single region
```

## Limitations

- **Apparent vs Real Independence:** Sources may share upstream providers
- **Sybil Attacks:** Multiple sources controlled by single entity
- **Quality vs Quantity:** More sources doesn't guarantee accuracy
- **Update Synchronization:** Asynchronous updates create temporary inconsistency
- **Cost Scaling:** More sources increase operational costs

## Assessment

The assessment evaluates oracle resilience based on source diversity and independence.

## Standard Configurations

```yaml
thresholds:
  critical: "1-2 sources (Single point of failure)"
  warning: "3-4 sources (Minimal diversity)"
  good: "5-7 sources (Adequate diversity)"
  excellent: "> 7 sources (High resilience)"

independence_requirements:
  minimum_unique_providers: 3
  maximum_common_upstream: 50%
  geographic_diversity: "3+ continents"

aggregation_methods:
  preferred: "Median (outlier resistant)"
  acceptable: "Weighted average"
  risky: "Simple average"

update_requirements:
  max_staleness: "5 minutes"
  minimum_active_sources: 3
```

## Usage Guidance

This indicator is particularly useful for:

- **Oracle risk assessment** - Evaluating oracle robustness before integration
- **Protocol configuration** - Setting minimum source requirements
- **Real-time monitoring** - Alerting on source failures
- **Comparative analysis** - Benchmarking oracle providers

**Recommended Actions by Threshold:**
- **1-2 sources**: Do not use, critical vulnerability
- **3-4 sources**: Acceptable for low-value protocols only
- **5-7 sources**: Good for production use
- **> 7 sources**: Excellent, suitable for high-value protocols

## Related Risks

- **R:ORACLE_MANIPULATION** - Primary risk this indicator measures
- **R:SMART_CONTRACT_VULNERABILITY** - Oracle integration risks
- **R:DEPENDENCY** - Over-reliance on oracle infrastructure
