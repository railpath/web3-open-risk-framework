# Risk: Regulatory Change

```yaml
id: R:REGULATORY_CHANGE
title: Regulatory Change
category: COMPLIANCE
type: QUALITATIVE
scopes:
  - GOVERNANCE
owners:
  - COMPLIANCE_OFFICER
objectives:
  - type: VALUE
    direction: DECREASE
    goal: MITIGATE
  - type: LIQUIDITY
    direction: DECREASE
    goal: MITIGATE
  - type: TRUST
    direction: DECREASE
    goal: MITIGATE
indicators:
  - I:REGULATORY_CLARITY_SCORE
  - I:JURISDICTIONAL_EXPOSURE
measures:
  - M:COMPLIANCE_MONITORING
  - M:LEGAL_STRUCTURE
  - M:GEOGRAPHIC_DIVERSIFICATION
severity: HIGH
probability: HIGH
impact: CATASTROPHIC
```

## Description

Regulatory change risk encompasses the uncertainty and potential negative impacts arising from evolving legal frameworks governing digital assets and DeFi protocols. Regulatory actions can range from favorable clarity to outright bans, significantly affecting protocol viability, asset accessibility, and investment returns.

Common regulatory concerns include:
- **Securities classification** - Tokens classified as securities face registration requirements
- **AML/KYC mandates** - Know-Your-Customer requirements for DeFi protocols
- **Operational restrictions** - Limits on staking, lending, or derivatives
- **Tax treatment changes** - Retroactive or unfavorable tax policies
- **Geographic bans** - Jurisdictional prohibitions on crypto activities

## Context

Regulatory change is particularly impactful because:
- **Jurisdictional fragmentation**: Different countries adopt conflicting approaches
- **Retroactive application**: New rules may apply to existing positions
- **Enforcement uncertainty**: Unclear guidance creates compliance risk
- **Market access**: Regulatory actions can eliminate entire markets
- **Asset freezes**: Compliance failures can result in locked funds

Recent examples include EU MiCA regulation, US SEC enforcement actions, China's mining ban, and Swiss FINMA DeFi guidance.

## Scope Justification

**[LEGAL]**:
The Legal scope applies because regulatory change directly affects the legal status and permissibility of protocol operations.

**[PROTOCOL]**:
The Protocol scope applies because regulations may force fundamental protocol design changes or operational restrictions.

**[ASSET]**:
The Asset scope applies because regulatory classification affects asset tradability, custody requirements, and investor eligibility.

## Rationale for Action

Regulatory change requires proactive management because:
- **Market access preservation**: Compliance ensures continued operations
- **Legal liability avoidance**: Violations can result in penalties or criminal charges
- **Investor protection**: Proper compliance protects user interests
- **Value preservation**: Regulatory clarity supports sustainable valuations

Compliance monitoring, legal structuring, and geographic diversification are essential protective measures.

## Indicators

Indicators for regulatory change risk:

- **I:REGULATORY_CLARITY_SCORE**: Assessment of regulatory framework clarity
- **I:JURISDICTIONAL_EXPOSURE**: Concentration in high-risk jurisdictions
- **I:COMPLIANCE_GAP**: Distance from regulatory requirements
- **I:ENFORCEMENT_ACTIVITY**: Rate of regulatory actions in sector

## Measures

Potential mitigation strategies:

- **M:COMPLIANCE_MONITORING**: Continuous regulatory surveillance
- **M:LEGAL_STRUCTURE**: Appropriate corporate and legal frameworks
- **M:GEOGRAPHIC_DIVERSIFICATION**: Multi-jurisdiction operations
- **M:REGULATORY_ENGAGEMENT**: Proactive dialogue with regulators
- **M:COMPLIANCE_BUFFER**: Conservative interpretation of requirements

## Related Risks

- **R:GOVERNANCE_ATTACK**: Regulatory pressure can influence governance
- **R:LIQUIDITY_CRISIS**: Regulatory actions can trigger liquidity events
- **R:COUNTERPARTY_RISK**: Regulated entities may freeze relationships
