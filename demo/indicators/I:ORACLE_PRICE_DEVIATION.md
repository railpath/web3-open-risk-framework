# Indicator: Oracle Price Deviation

```yaml
id: I:ORACLE_PRICE_DEVIATION
title: Oracle Price Deviation
version: "1.0"
lastUpdate: 2026-01-14T00:00:00.000Z
preconditions: []
methodology: []
limitations: []
extensions: []
regulatoryExtensions: {}
```

## Description

Measures the variance in price data between different oracle sources for the same asset. High deviation indicates potential manipulation, data quality issues, or market fragmentation that could be exploited.

Price deviation monitoring is essential for detecting oracle attacks before they can trigger liquidations or enable arbitrage exploitation.

##  Preconditions

- Multiple oracle sources available for comparison (minimum 3 recommended)
- Oracle price feeds must be for the same asset and denomination
- Access to real-time or near-real-time price data
- Baseline volatility metrics for the asset to distinguish normal variance from anomalies

##  Methodology

- **Data Collection:** Query multiple oracle sources simultaneously (Chainlink, Band Protocol, API3, Pyth, etc.)
- **Normalization:** Convert all prices to common denomination and precision
- **Variance Calculation:** Calculate standard deviation and percentage deviation from median
- **Outlier Detection:** Identify sources deviating significantly from consensus
- **Temporal Analysis:** Track deviation trends over time to detect manipulation patterns

**Deviation Formula:**
```
Price Deviation = (σ / μ) × 100

Where:
σ = Standard deviation of oracle prices
μ = Median oracle price

Outlier Threshold = μ ± (2.5 × σ)
```

## Limitations

- **Market Fragmentation:** Legitimate price differences across DEXs vs CEXs
- **Update Frequency:** Asynchronous oracle updates create temporary variance
- **Low Liquidity Assets:** Normal volatility can appear as manipulation
- **Source Correlation:** Many oracles use same upstream data sources
- **Gas Costs:** High-frequency monitoring can be expensive on-chain

## Assessment

The assessment flags potential oracle manipulation based on price variance across sources.

## Standard Configurations

```yaml
thresholds:
  critical: "> 5% deviation"
  warning: "2-5% deviation"
  normal: "0.5-2% deviation"
  excellent: "< 0.5% deviation"

measurement_windows:
  real_time: "Current snapshot"
  short_term: "5-minute rolling average"
  medium_term: "1-hour rolling average"
  
minimum_sources: 3

benchmarks:
  stablecoins: "< 0.5%"
  major_assets: "< 2%"
  volatile_assets: "< 5%"
  low_liquidity: "< 10%"

outlier_detection:
  method: "Modified Z-score"
  threshold: 2.5
  action: "Flag and exclude from median calculation"
```

## Usage Guidance

This indicator is particularly useful for:

- **Real-time monitoring** - Detecting oracle attacks in progress
- **Pre-transaction validation** - Verifying price integrity before large trades
- **Liquidation protection** - Preventing false liquidations from bad data
- **Protocol health checks** - Identifying systematic oracle issues

**Recommended Actions by Threshold:**
- **> 5%**: Halt protocol, investigate immediately, potential attack
- **2-5%**: Elevated monitoring, defer large transactions
- **0.5-2%**: Normal operation, continue monitoring
- **< 0.5%**: Healthy oracle network

## Related Risks

- **R:ORACLE_MANIPULATION** - Primary risk this indicator measures
- **R:FLASH_LOAN_ATTACKS** - Flash loans can manipulate oracle prices
- **R:LIQUIDITY_CRISIS** - Price deviation can trigger cascading liquidations
- **R:MEV_EXPLOITATION** - MEV bots exploit oracle update timing
