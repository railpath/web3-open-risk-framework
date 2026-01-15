# MEV Arbitrage Detection (Protocol Assessment)

```yaml
id: I:MEV_DETECTION.FIDLEG
title: "MEV Arbitrage Detection (Protocol Assessment)"
type: Indicator
version: "1.0"
lastUpdate: "2024-01-15"
extensions: ["fidleg"]
regulatoryExtensions:
  fidleg:
    fidlegTriggerEvent: "POTENTIAL_MARKET_ABUSE_DETECTED"
    triggeredFidlegActions: []
    fidlegMonitoringRationale: "Real-time monitoring required to comply with Art. 142 for market abuse prevention and Art. 24 for timely client information on significant changes."
    suspiciousPatternsFidlegImpacts:
      - pattern: "mev_arbitrage"
        impactDescription: "MEV arbitrage patterns may indicate market manipulation requiring immediate Art. 142 compliance review and potential client notification under Art. 24."
        patternTriggeredActions: []
      - pattern: "wash_trading"
        impactDescription: "Wash trading patterns constitute market abuse under Art. 142, requiring immediate FINMA reporting and client protection measures."
        patternTriggeredActions: []
      - pattern: "flash_loan_exploitation"
        impactDescription: "Flash loan exploitation indicates protocol vulnerability requiring Art. 72 security assessment and client risk notification."
        patternTriggeredActions: []
```

## Description

Detects MEV (Maximum Extractable Value) arbitrage activities that may indicate market manipulation or unfair trading practices in DeFi protocols. This indicator helps banks assess whether a protocol is susceptible to MEV exploitation.

## Risk Categories

- **MARKET**: Market manipulation and unfair trading practices
- **TECHNICAL**: Protocol-level vulnerabilities

## Risk Types

- **Quantitative**: Measurable through transaction analysis
- **Qualitative**: Requires interpretation of trading patterns

## Scope of Action

- **PROTOCOL**: Core protocol functionality
- **TRADE**: Individual transaction level
- **MARKET**: Market-wide impact

## Investment Objectives

- **Value**: MEV extraction reduces value for other users
- **Trust**: Undermines trust in protocol fairness
- **Liquidity**: Can impact liquidity provision incentives

## Risk Owners

- **Protocol Developers**: Implement MEV protection measures
- **Validators**: Can be influenced by MEV opportunities
- **Users**: Directly affected by MEV extraction

## Measurement

### Primary Metrics

- **MEV Extraction Volume**: Total value extracted through MEV
- **MEV Transaction Frequency**: Number of MEV transactions per day
- **MEV Impact on Users**: Average loss per user transaction

### Data Sources

- **On-chain transaction data**: Direct measurement from blockchain
- **MEV detection services**: Specialized MEV monitoring tools
- **Protocol analytics**: Protocol-specific MEV metrics

### Measurement Frequency

- **Real-time**: Continuous monitoring for immediate detection
- **Daily**: Aggregated daily reports for trend analysis
- **Weekly**: Weekly summaries for risk assessment

## Thresholds

### Risk Levels

- **LOW**: < 0.1% of transaction volume affected by MEV
- **MEDIUM**: 0.1% - 1% of transaction volume affected by MEV
- **HIGH**: 1% - 5% of transaction volume affected by MEV
- **CRITICAL**: > 5% of transaction volume affected by MEV

### Alert Conditions

- **Immediate**: MEV extraction > 1% of daily volume
- **Warning**: MEV extraction > 0.5% of daily volume
- **Monitor**: MEV extraction > 0.1% of daily volume

## Regulatory Context

This indicator supports Swiss banks in evaluating DeFi protocols for customer access by monitoring market abuse patterns as required under FIDLEG Art. 142.

## Implementation Notes

- Requires real-time blockchain data access
- Should integrate with protocol-specific MEV detection tools
- Consider protocol's MEV protection mechanisms in assessment