# Risk: Oracle Manipulation

```yaml
id: R:ORACLE_MANIPULATION
title: Oracle Manipulation
category: DEPENDENCY
type: HYBRID
scope: INFRASTRUCTURE
owner: OPERATOR
objectives:
  - type: VALUE
    direction: DECREASE
    goal: PREVENT
  - type: TRUST
    direction: DECREASE
    goal: PREVENT
indicators:
  - I:ORACLE_PRICE_DEVIATION
  - I:ORACLE_SOURCE_COUNT
  - I:ORACLE_UPDATE_FREQUENCY
measures:
  - M:ORACLE_DIVERSIFICATION
  - M:PRICE_BOUNDS
  - M:TIME_WEIGHTED_AVERAGE
severity: HIGH
probability: MEDIUM
impact: HIGH
```

## Description

Oracle manipulation occurs when attackers exploit price feed vulnerabilities to trigger profitable outcomes in DeFi protocols. Oracles are critical infrastructure components that bridge on-chain and off-chain data, making them attractive targets for manipulation.

Common manipulation vectors include:
- **Flash loan attacks** - Temporary price manipulation within a single transaction
- **Low liquidity exploitation** - Moving prices in thin markets
- **Source corruption** - Compromising upstream data providers
- **Network delays** - Exploiting stale price data
- **Sandwich attacks** - Frontrunning oracle updates

## Context

Oracle manipulation is particularly dangerous because:
- **Single point of failure**: Many protocols rely on few oracle sources
- **Economic incentives**: Profitable attacks can be executed atomically
- **Composability risk**: Corrupted data propagates across protocols
- **Limited verification**: On-chain validation of off-chain data is difficult
- **MEV opportunity**: Validators can manipulate oracle update ordering

Historical examples include Mango Markets ($110M), Cream Finance ($130M), and Venus Protocol ($200M).

## Scope Justification

**[INFRASTRUCTURE]**:
The Infrastructure scope applies because oracles are fundamental infrastructure components that multiple protocols depend on.

**[PROTOCOL]**:
The Protocol scope applies because oracle manipulation can trigger unintended protocol behavior like liquidations or minting.

**[TRADING]**:
The Trading scope applies because price oracle manipulation directly affects trading execution and market integrity.

## Rationale for Action

Oracle manipulation requires mitigation because:
- **Cascading liquidations**: False prices trigger mass liquidation events
- **Protocol insolvency**: Bad debt accumulation from manipulated prices
- **Market confidence**: Trust erosion in DeFi pricing mechanisms
- **Arbitrage losses**: Users suffer from incorrect execution prices

Multiple oracle sources, time-weighted averages, and circuit breakers are essential protective measures.

## Indicators

Indicators for detecting oracle manipulation risk:

- **I:ORACLE_PRICE_DEVIATION**: Variance between oracle sources
- **I:ORACLE_SOURCE_COUNT**: Number of independent data sources
- **I:ORACLE_UPDATE_FREQUENCY**: Time between price updates
- **I:ORACLE_RESPONSE_TIME**: Latency in price feed delivery

## Measures

Potential mitigation strategies:

- **M:ORACLE_DIVERSIFICATION**: Multiple independent oracle providers
- **M:PRICE_BOUNDS**: Maximum price change limits per update
- **M:TIME_WEIGHTED_AVERAGE**: TWAP to prevent flash manipulation
- **M:CIRCUIT_BREAKERS**: Automatic protocol pause on anomalies
- **M:ORACLE_MONITORING**: Real-time deviation alerts

## Related Risks

- **R:FLASH_LOAN_ATTACKS**: Flash loans enable oracle manipulation
- **R:LIQUIDITY_CRISIS**: Low liquidity enables price manipulation
- **R:MEV_EXPLOITATION**: Validators can manipulate oracle update timing
- **R:SMART_CONTRACT_VULNERABILITY**: Oracle integration bugs
