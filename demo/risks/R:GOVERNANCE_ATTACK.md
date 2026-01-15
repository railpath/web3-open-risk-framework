# Risk: Governance Attack

```yaml
id: R:GOVERNANCE_ATTACK
title: Governance Attack
category: ORGANIZATIONAL
type: QUALITATIVE
scope: GOVERNANCE
owner: COMMUNITY
objectives:
  - type: TRUST
    direction: DECREASE
    goal: PREVENT
  - type: VALUE
    direction: DECREASE
    goal: PREVENT
indicators:
  - I:VOTING_CONCENTRATION
  - I:PROPOSAL_VELOCITY
  - I:VOTER_PARTICIPATION
measures:
  - M:GOVERNANCE_SAFEGUARDS
  - M:TIME_LOCKS
  - M:MULTI_SIG_CONTROL
severity: HIGH
probability: MEDIUM
impact: CATASTROPHIC
```

## Description

Governance attacks occur when malicious actors exploit voting mechanisms to pass proposals that benefit themselves at the expense of the protocol or its users. This can include parameter changes, treasury drains, or malicious code upgrades.

Common attack vectors include:
- **Vote buying** - Acquiring governance tokens to control decisions
- **Flash loan governance** - Temporary voting power through borrowed tokens
- **Proposal spam** - Overwhelming governance with meaningless proposals
- **Cartel formation** - Coordinated voting blocks
- **Admin key compromise** - Exploiting centralized control points

## Context

Governance attacks are particularly concerning because:
- **Legitimate appearance**: Attacks can pass through "proper" governance channels
- **Irreversibility**: Malicious proposals become binding protocol changes
- **Low participation**: Many token holders don't vote, lowering attack threshold
- **Plutocracy risk**: Whale dominance enables unilateral decisions
- **Short-term incentives**: Voters may support extractive proposals

Historical examples include Beanstalk ($181M), Build Finance, and Tornado Cash governance manipulation.

## Scope Justification

**[PROTOCOL]**:
The Protocol scope applies because governance attacks can fundamentally alter protocol parameters and operation.

**[GOVERNANCE]**:
The Governance scope applies as this risk directly targets the decision-making mechanisms of the protocol.

## Rationale for Action

Governance attacks require protection because:
- **Protocol capture**: Attackers can redirect value to themselves
- **User trust erosion**: Legitimate users lose faith in protocol
- **Irreversible damage**: Malicious upgrades may be permanent
- **Economic exploitation**: Treasury and user funds at risk

Time-locks, multi-signature requirements, and voting thresholds are critical safeguards.

## Indicators

Indicators for governance attack risk:

- **I:VOTING_CONCENTRATION**: Gini coefficient of token distribution
- **I:PROPOSAL_VELOCITY**: Rate of governance proposals
- **I:VOTER_PARTICIPATION**: Percentage of tokens participating in votes
- **I:WHALE_DOMINANCE**: Percentage controlled by top holders

## Measures

Potential mitigation strategies:

- **M:GOVERNANCE_SAFEGUARDS**: Time-locks and voting thresholds
- **M:TIME_LOCKS**: Mandatory delay before proposal execution
- **M:MULTI_SIG_CONTROL**: Multi-party approval for critical actions
- **M:QUADRATIC_VOTING**: Reduce whale influence through voting curves
- **M:VETO_POWER**: Emergency abort mechanisms for malicious proposals

## Related Risks

- **R:FLASH_LOAN_ATTACKS**: Flash loans can boost temporary voting power
- **R:SMART_CONTRACT_VULNERABILITY**: Governance contract exploits
- **R:REGULATORY_CHANGE**: Regulatory pressure on governance decisions
