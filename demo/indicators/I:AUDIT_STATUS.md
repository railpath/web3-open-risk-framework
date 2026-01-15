# Indicator: Audit Status

```yaml
id: I:AUDIT_STATUS
title: Audit Status
type: Indicator
version: '1.0'
lastUpdate: 2026-01-14T00:00:00.000Z
```

## Description

Assesses the quality and recency of professional security audits conducted on smart contracts. This indicator evaluates not just whether an audit was performed, but the reputation of auditors, severity of findings, and remediation status.

Security audits are a critical component of smart contract risk management, providing independent verification of code security and identifying vulnerabilities before deployment.

##  Preconditions

- Audit reports must be publicly available or accessible for review
- Auditor reputation data must be available (past performance, expertise)
- Issue tracking system to monitor remediation status
- Contracts must be deployed or near deployment to justify audit cost

##  Methodology

- **Auditor Assessment:** Score auditor based on reputation, expertise, and track record
- **Finding Analysis:** Categorize findings by severity (Critical, High, Medium, Low, Informational)
- **Remediation Tracking:** Monitor status of identified issues (Fixed, Acknowledged, Disputed)
- **Recency Evaluation:** Weight audits based on time since completion and code changes
- **Coverage Calculation:** Assess percentage of codebase audited

**Scoring Formula:**
```
Audit Score = (Auditor Reputation × 0.3) +
              (Remediation Rate × 0.3) +
              (Recency Weight × 0.2) +
              (Coverage Percentage × 0.2)

Auditor Reputation: 0-10 based on tier (Tier 1: 9-10, Tier 2: 7-8, Tier 3: 5-6)
Remediation Rate: (Fixed Issues / Total Critical+High Issues) × 10
Recency Weight: max(10 - (months_since_audit / 3), 0)
Coverage: (Audited Lines / Total Lines) × 10
```

## Limitations

- **Audit Quality Variance:** Not all audits are equally thorough
- **Post-Audit Changes:** Code modifications after audit reduce relevance
- **Zero-Day Vulnerabilities:** Audits can't detect unknown attack vectors
- **Economic Feasibility:** Multiple tier-1 audits may be cost-prohibitive
- **False Confidence:** Audited code can still have vulnerabilities

## Assessment

The assessment provides a composite score of audit coverage, quality, and remediation status.

## Standard Configurations

```yaml
auditor_tiers:
  tier_1: ["Trail of Bits", "OpenZeppelin", "Consensys Diligence", "ChainSecurity"]
  tier_2: ["Certora", "Quantstamp", "Hacken", "PeckShield"]
  tier_3: ["Community auditors", "Solo practitioners"]

thresholds:
  critical: "Score < 5 (No audit or poor quality)"
  warning: "Score 5-7 (Single audit or old)"
  good: "Score 7-8.5 (Recent tier-2 audit, remediated)"
  excellent: "Score > 8.5 (Multiple tier-1 audits, fully remediated)"

recency:
  fresh: "< 3 months"
  acceptable: "3-6 months"
  stale: "6-12 months"
  outdated: "> 12 months"

severity_weights:
  critical: 10
  high: 5
  medium: 2
  low: 1
  informational: 0.5
```

## Usage Guidance

This indicator is particularly useful for:

- **Investment decisions** - Assessing smart contract security before capital deployment
- **Pre-deployment validation** - Ensuring adequate security review
- **Continuous monitoring** - Tracking audit status after code updates
- **Insurance underwriting** - Pricing smart contract insurance policies

**Recommended Actions by Score:**
- **< 5**: Do not deploy or invest, commission audit immediately
- **5-7**: Acceptable with caveats, recommend additional review
- **7-8.5**: Good security posture, maintain through updates
- **> 8.5**: Excellent, industry-leading security practices

## Related Risks

- **R:SMART_CONTRACT_VULNERABILITY** - Primary risk this indicator measures
- **R:GOVERNANCE_ATTACK** - Governance contracts need thorough audits
- **R:FLASH_LOAN_ATTACKS** - Economic logic requires audit scrutiny
