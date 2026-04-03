# Indicator: Voting Concentration

```yaml
id: I:VOTING_CONCENTRATION
title: Voting Concentration
version: "1.0"
lastUpdate: 2026-01-14T00:00:00.000Z
preconditions: []
methodology: []
limitations: []
extensions: []
regulatoryExtensions: {}
```

## Description

Measures the concentration of governance voting power among token holders using the Gini coefficient and Herfindahl-Hirschman Index (HHI). High concentration indicates that a small number of holders can unilaterally control governance decisions.

Voting concentration is a critical indicator for assessing governance attack risk and protocol decentralization.

##  Preconditions

- Access to complete token holder distribution data
- Ability to distinguish voting-delegated tokens from non-voting tokens
- Historical voting participation data for trend analysis
- Minimum 90 days of governance activity for meaningful assessment

##  Methodology

- **Data Collection:** Query on-chain token balances and delegation records
- **Threshold Analysis:** Calculate percentage held by top 1, 10, 100 holders
- **Gini Coefficient:** Measure inequality in token distribution (0 = perfect equality, 1 = total inequality)
- **HHI Calculation:** Sum of squared market shares for concentration assessment
- **Voting Power vs Holdings:** Account for delegation and vote locking mechanisms

**Formulas:**
```
Gini Coefficient = (Σ(2i - n - 1) × x_i) / (n × Σx_i)
where x_i is holdings sorted ascending, n is number of holders

HHI = Σ(market_share_i)²
where market_share is percentage of total supply

Concentration Score = (Gini × 0.5) + (HHI_normalized × 0.5)
```

## Limitations

- **Sybil Resistance:** Single entity may control multiple addresses
- **Delegation Complexity:** Delegated votes obscure true concentration
- **Locked Tokens:** Vested or locked tokens may not reflect voting power
- **Historical Bias:** Past concentration doesn't predict future attacks
- **Market Changes:** Token distribution changes over time

## Assessment

The assessment flags governance centralization risk based on voting power distribution.

## Standard Configurations

```yaml
thresholds:
  critical: "Gini > 0.9 or HHI > 5000"
  warning: "Gini 0.7-0.9 or HHI 2500-5000"
  moderate: "Gini 0.5-0.7 or HHI 1500-2500"  
  good: "Gini < 0.5 and HHI < 1500"

top_holder_thresholds:
  critical: "Top 10 holders > 75%"
  warning: "Top 10 holders 50-75%"
  acceptable: "Top 10 holders < 50%"

delegation_analysis:
  track_delegate_concentration: true
  flag_whale_delegates: "> 10% voting power"

benchmarks:
  btc_like: "Gini ~0.88 (high concentration)"
  eth_like: "Gini ~0.71 (moderate concentration)"
  defi_governance: "Gini 0.60-0.85"
```

## Usage Guidance

This indicator is particularly useful for:

- **Governance attack risk** - Assessing vulnerability to voting manipulation
- **Decentralization assessment** - Measuring true protocol decentralization
- **Investment due diligence** - Evaluating governance risk before capital deployment
- **Protocol design** - Calibrating governance parameters

**Recommended Actions by Threshold:**
- **Critical (Gini > 0.9)**: Protocol is centralized, governance attack risk high
- **Warning (0.7-0.9)**: Monitor closely, consider diversification mechanisms
- **Moderate (0.5-0.7)**: Acceptable but room for improvement
- **Good (< 0.5)**: Well-distributed governance power

## Related Risks

- **R:GOVERNANCE_ATTACK** - Primary risk this indicator measures
- **R:FLASH_LOAN_ATTACKS** - Flash loans can temporarily concentrate voting
- **R:REGULATORY_CHANGE** - Centralized governance attracts regulatory scrutiny
