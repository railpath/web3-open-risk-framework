# Risk: Liquidity Crisis

```yaml
id: R:LIQUIDITY_CRISIS
title: Liquidity Crisis
category: FINANCIAL
type: QUANTITATIVE
scopes:
  - TRADE
owners:
  - INVESTOR
objectives:
  - type: VALUE
    direction: DECREASE
    goal: PREVENT
  - type: LIQUIDITY
    direction: DECREASE
    goal: PREVENT
indicators:
  - I:BID_ASK_SPREAD
  - I:MARKET_DEPTH
  - I:UTILIZATION_RATIO
  - I:WITHDRAWAL_QUEUE_LENGTH
measures:
  - M:LIQUIDITY_BUFFERS
  - M:WITHDRAWAL_LIMITS
  - M:DIVERSIFIED_LIQUIDITY_SOURCES
severity: CRITICAL
probability: MEDIUM
impact: CATASTROPHIC
```

## Description

Liquidity crisis occurs when market participants cannot execute trades or withdrawals at reasonable prices due to insufficient market depth or available capital. In DeFi, this is particularly dangerous as it can trigger cascading liquidations, bank runs, and protocol insolvency.

Common triggers include:
- **Bank runs** - Mass simultaneous withdrawals from lending protocols
- **Market panic** - Sudden demand for exits during volatility
- **Liquidity pool imbalance** - One-sided trading draining liquidity
- **Utilization spikes** - Lending pools approaching 100% utilization
- **Contagion effects** - Liquidity crises spreading across protocols

## Context

Liquidity crises are particularly severe in DeFi because:
- **24/7 markets**: No trading halts or circuit breakers
- **Programmatic execution**: Automated liquidations compound stress
- **Composability**: Liquidity issues propagate across protocols
- **Limited reserves**: Protocols operate with thin liquidity buffers
- **No lender of last resort**: No central bank backstop

Historical examples include Iron Finance collapse, Anchor Protocol depegging, and Silicon Valley Bank's stETH crisis.

## Scope Justification

**[LENDING]**:
The Lending scope applies because liquidity crises often manifest in lending protocols as inability to withdraw supplied capital.

**[TRADING]**:
The Trading scope applies because liquidity crises result in extreme slippage and inability to execute trades at fair prices.

**[ASSET]**:
The Asset scope applies because liquidity crises affect asset values and the ability to realize value through sales.

## Rationale for Action

Liquidity crisis management is critical because:
- **Capital preservation**: Prevents forced sales at unfavorable prices
- **Solvency protection**: Avoids cascading liquidations and bad debt
- **Protocol stability**: Maintains confidence in withdrawal capabilities
- **Market integrity**: Prevents price manipulation during stress

Liquidity buffers, withdrawal limits, and diversified liquidity sources are essential safeguards.

## Indicators

Indicators for liquidity crisis risk:

- **I:BID_ASK_SPREAD**: Spread widening indicates liquidity stress
- **I:MARKET_DEPTH**: Available liquidity at various price levels
- **I:UTILIZATION_RATIO**: Percentage of available capital borrowed
- **I:WITHDRAWAL_QUEUE_LENGTH**: Pending withdrawal requests
- **I:LIQUIDITY_CONCENTRATION**: Dependency on few liquidity providers

## Measures

Potential mitigation strategies:

- **M:LIQUIDITY_BUFFERS**: Reserve capital for redemptions
- **M:WITHDRAWAL_LIMITS**: Rate limiting on large withdrawals
- **M:DIVERSIFIED_LIQUIDITY_SOURCES**: Multiple DEX and CEX integrations
- **M:DYNAMIC_INTEREST_RATES**: Incentivize supply during stress
- **M:CIRCUIT_BREAKERS**: Temporary halts during extreme conditions

## Related Risks

- **R:DECREASING_YIELD**: Yield compression reduces liquidity incentives
- **R:ORACLE_MANIPULATION**: Price manipulation can trigger liquidations
- **R:GOVERNANCE_ATTACK**: Malicious parameter changes can drain liquidity
- **R:REGULATORY_CHANGE**: Regulatory actions can freeze liquidity
