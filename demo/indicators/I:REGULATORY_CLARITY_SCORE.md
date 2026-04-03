# Indicator: Regulatory Clarity Score

```yaml
id: I:REGULATORY_CLARITY_SCORE
title: Regulatory Clarity Score
version: "1.0"
lastUpdate: 2026-01-14T00:00:00.000Z
preconditions: []
methodology: []
limitations: []
extensions: []
regulatoryExtensions: {}
```

## Description

Assesses the clarity and favorability of the regulatory environment across key jurisdictions for a given protocol or asset. This composite score evaluates legal framework maturity, enforcement patterns, and regulatory guidance availability.

Regulatory clarity directly impacts protocol sustainability, market access, and investment risk.

##  Preconditions

- Access to regulatory tracking databases and legal analysis
- Expertise in financial regulation across multiple jurisdictions
- Monitoring of regulatory announcements and enforcement actions
- Understanding of protocol's operational footprint and user base

##  Methodology

- **Jurisdiction Mapping:** Identify relevant jurisdictions based on user base and operations
- **Framework Analysis:** Evaluate existence and clarity of applicable regulations
- **Enforcement Assessment:** Track regulatory actions and precedents
- **Guidance Quality:** Score availability of official regulatory guidance
- **Trend Analysis:** Monitor regulatory trajectory (improving, stable, deteriorating)

**Scoring Framework:**
```
Clarity Score = Σ(Jurisdiction_Score × Market_Weight)

Jurisdiction Score = 
  Regulatory Framework (0-30) +
  Enforcement Clarity (0-30) +
  Official Guidance (0-20) +
  Industry Engagement (0-10) +
  Stability/Predictability (0-10)

Total: 0-100 per jurisdiction
```

## Limitations

- **Rapid Changes:** Regulatory landscape evolves quickly
- **Interpretation Risk:** Legal analysis involves subjective judgment
- **Jurisdiction Complexity:** Overlapping and conflicting regulations
- **Future Uncertainty:** Score doesn't predict future regulatory changes
- **Political Risk:** Regulatory policy subject to political shifts

## Assessment

The assessment provides a composite regulatory clarity score across key markets.

## Standard Configurations

```yaml
jurisdiction_weights:
  tier_1: ["USA", "EU", "UK", "Switzerland", "Singapore"] # 60% combined
  tier_2: ["Japan", "Canada", "Australia", "UAE", "Hong Kong"] # 30% combined
  tier_3: ["Other jurisdictions"] # 10% combined

thresholds:
  critical: "< 30 (High regulatory uncertainty)"
  warning: "30-50 (Moderate uncertainty)"
  acceptable: "50-70 (Reasonable clarity)"
  excellent: "> 70 (High regulatory clarity)"

framework_factors:
  securities_classification: "0-10 points"
  aml_kyc_requirements: "0-10 points"
  licensing_regime: "0-10 points"
  tax_treatment: "0-10 points"
  enforcement_precedents: "0-10 points"

update_frequency: "Monthly or upon significant regulatory event"
```

## Usage Guidance

This indicator is particularly useful for:

- **Investment decisions** - Assessing regulatory risk before capital deployment
- **Compliance planning** - Identifying regulatory requirements
- **Market entry strategy** - Selecting favorable jurisdictions
- **Risk management** - Monitoring regulatory environment changes

**Recommended Actions by Score:**
- **< 30**: High risk, legal review required, consider market exit
- **30-50**: Proceed with caution, enhanced compliance monitoring
- **50-70**: Acceptable risk level, maintain standard compliance
- **> 70**: Favorable environment, opportunity for growth

**Jurisdiction-Specific Examples:**
- **Switzerland (Score: ~75-85)**: Clear DeFi framework, FINMA guidance, favorable
- **USA (Score: ~40-55)**: Unclear, case-by-case enforcement, evolving
- **EU (Score: ~60-70)**: MiCA provides clarity, implementation ongoing
- **China (Score: ~10-20)**: Hostile regulatory environment, high risk

## Related Risks

- **R:REGULATORY_CHANGE** - Primary risk this indicator measures
- **R:GOVERNANCE_ATTACK** - Regulatory pressure on governance
- **R:LIQUIDITY_CRISIS** - Regulatory actions can trigger liquidity events
