# Indicator: Bid-Ask Spread

```yaml
id: I:BID_ASK_SPREAD
title: Bid-Ask Spread
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

Measures the percentage difference between the highest buy order (bid) and lowest sell order (ask) in a market. Widening spreads indicate declining liquidity and increasing transaction costs, often signaling market stress or manipulation risk.

Bid-ask spread is a real-time indicator of market health and liquidity crisis risk.

##  Preconditions

- Access to order book data (DEX or CEX)
- Sufficient order book depth for meaningful measurement
- Ability to distinguish between natural spread and wash trading
- Minimum 24 hours of historical data for baseline comparison

##  Methodology

- **Data Collection:** Query top-of-book bid and ask prices from order books
- **Spread Calculation:** Calculate percentage spread relative to mid-price
- **Normalization:** Account for asset volatility using volatility-adjusted spread
- **Temporal Analysis:** Track spread evolution over time
- **Multi-Venue Aggregation:** Compare spreads across exchanges

**Formulas:**
```
Bid-Ask Spread (%) = ((Ask - Bid) / Mid-Price) × 100

Mid-Price = (Bid + Ask) / 2

Volatility-Adjusted Spread = Spread / (σ × √(1/t))
where σ is volatility, t is time interval
```

## Limitations

- **Market Fragmentation:** Different spreads across venues
- **Flash Crashes:** Temporary extreme spreads during volatility
- **Wash Trading:** Fake liquidity can mask true spread
- **Low Volume Assets:** Wide spreads are normal for some assets
- **Time-of-Day Effects:** Spreads vary by trading session

## Assessment

The assessment flags liquidity stress based on spread widening patterns.

## Standard Configurations

```yaml
thresholds:
  critical: "> 2% (Severe liquidity stress)"
  warning: "0.5-2 % (Elevated liquidity risk)"
  normal: "0.1-0.5% (Normal trading conditions)"
  excellent: "< 0.1% (High liquidity)"

asset_categories:
  major_pairs: "BTC/USD, ETH/USD (< 0.1% typical)"
  stablecoins: "USDC/USDT (< 0.05% typical)"
  altcoins: "Most altcoins (0.2-1% typical)"
  longtail: "Low-cap assets (> 1% typical)"

measurement_windows:
  instantaneous: "Current top-of-book"
  short_term: "5-minute TWAP"
  medium_term: "1-hour TWAP"

alert_conditions:
  spread_spike: "> 3× baseline"
  sustained_widening: "> 2× baseline for 30+ minutes"
```

## Usage Guidance

This indicator is particularly useful for:

- **Trade execution** - Assessing transaction cost before large orders
- **Liquidity monitoring** - Detecting market stress in real-time
- **Market making** - Calibrating spread targets
- **Risk management** - Triggering circuit breakers during stress

**Recommended Actions by Threshold:**
- **> 2%**: Defer non-urgent trades, investigate cause
- **0.5-2%**: Proceed with caution, use limit orders
- **0.1-0.5%**: Normal conditions, standard execution
- **< 0.1%**: Optimal liquidity, favorable for large orders

## Related Risks

- **R:LIQUIDITY_CRISIS** - Primary risk this indicator measures
- **R:MARKET_MANIPULATION** - Wide spreads enable manipulation
- **R:ORACLE_MANIPULATION** - Spread manipulation affects oracle prices
- **R:SLIPPAGE** - Wide spreads correlate with high slippage
