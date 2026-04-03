# Indicator: Market Depth

```yaml
id: I:MARKET_DEPTH
title: Market Depth
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

Measures the total value of buy and sell orders within a specified price range from the current market price. Deeper markets can absorb larger trades with minimal price impact, while shallow markets are vulnerable to manipulation and liquidity crises.

Market depth is a fundamental indicator of market resilience and capacity to handle institutional-size orders.

##  Preconditions

- Access to full order book data (all price levels)
- Ability to filter out wash trading and fake liquidity
- Minimum market size threshold for meaningful measurement
- Historical baseline for depth comparison

##  Methodology

- **Order Book Analysis:** Aggregate bid and ask liquidity at each price level
- **Depth Calculation:** Sum liquidity within specified percentage bands (±1%, ±2%, ±5%)
- **Imbalance Detection:** Calculate bid/ask imbalance ratios
- **Volume Weight:** Weight depth by historical trade volume
- **Decay Adjustment:** Apply decay factor for orders far from mid-price

**Formulas:**
```
Market Depth (±X%) = Σ(Order Size) for all orders within X% of mid-price

Depth Score = log10(Depth in USD)

Imbalance Ratio = (Bid Depth - Ask Depth) / (Bid Depth + Ask Depth)
Range: -1 (all asks) to +1 (all bids), 0 = balanced
```

## Limitations

- **Spoofing Risk:** Large orders may be cancelled before execution
- **Hidden Liquidity:** Iceberg orders and dark pools not visible
- **Price Impact Complexity:** Depth doesn't capture non-linear slippage
- **Venue Fragmentation:** Liquidity spread across multiple venues
- **Wash Trading:** Fake orders inflate apparent depth

## Assessment

The assessment evaluates market capacity to absorb large orders without significant price impact.

## Standard Configurations

```yaml
depth_bands:
  tight: "±0.5% from mid-price"
  standard: "±2% from mid-price"
  wide: "±5% from mid-price"

thresholds_usd:
  critical: "< $100K (Very shallow)"
  warning: "$100K-$500K (Shallow)"
  acceptable: "$500K-$2M (Moderate)"
  good: "$2M-$10M (Deep)"
  excellent: "> $10M (Very deep)"

imbalance_thresholds:
  critical: "> 0.7 or < -0.7 (Severe imbalance)"
  warning: "0.5-0.7 or -0.5 to -0.7 (Moderate imbalance)"
  normal: "-0.5 to 0.5 (Balanced)"

benchmarks:
  btc_eth_majors: "> $50M depth @ ±2%"
  large_cap_alts: "$5M-$20M depth @ ±2%"
  mid_cap: "$500K-$5M depth @ ±2%"
  small_cap: "< $500K depth @ ±2%"
```

## Usage Guidance

This indicator is particularly useful for:

- **Large order execution** - Assessing feasible trade size
- **Market impact modeling** - Estimating slippage for large trades
- **Liquidity provision** - Calibrating market making strategies
- **Crisis detection** - Identifying liquidity evaporation

**Recommended Actions by Depth:**
- **< $100K**: High risk, avoid large orders, potential manipulation
- **$100K-$500K**: Limit order size to < $10K to minimize impact
- **$500K-$2M**: Moderate capacity, orders up to $50K acceptable
- **$2M-$10M**: Good capacity, institutional-size orders viable
- **> $10M**: Excellent depth, minimal impact for most orders

**Imbalance Interpretation:**
- **> 0.5**: Buy pressure, potential upward price movement
- **< -0.5**: Sell pressure, potential downward price movement
- **Near 0**: Balanced market, stable pricing

## Related Risks

- **R:LIQUIDITY_CRISIS** - Primary risk this indicator measures
- **R:MARKET_MANIPULATION** - Shallow depth enables manipulation
- **R:ORACLE_MANIPULATION** - Low depth enables oracle price attacks
- **R:SLIPPAGE** - Depth directly affects execution quality
