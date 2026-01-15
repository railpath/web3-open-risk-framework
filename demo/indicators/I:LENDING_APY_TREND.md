# Lending APY Trend

```yaml
id: I:LENDING_APY_TREND
title: Lending APY Trend
type: Indicator
version: "1.0"
lastUpdate: 2025-01-27
```

##  Description

Tracks the change in annual percentage yield (APY) for a specific lending pool over time. A consistent downward trend may indicate decreasing protocol competitiveness, shrinking demand, or changes in risk-adjusted returns. This indicator helps identify when lending strategies become unsustainable or misaligned with investment objectives.

##  Preconditions

- Minimum historical data span: 30 days  
- Consistent data source (e.g. Aave, Compound, Spark subgraph)  
- Preferably net APY after fees and incentives
- Pool must have sufficient liquidity and trading volume

##  Methodology

- **Data Collection:** Retrieve historical APY data for the lending pool on a daily basis
- **Smoothing:** Apply moving average (e.g. 7d or 14d) to reduce short-term noise
- **Trend Calculation:** Use linear regression or percentage delta over fixed intervals (e.g. 7/30/90 days)
- **Threshold Detection:** Define slope thresholds or relative percentage drops to flag significant trends
- **Normalization:** Adjust for changes in incentives or liquidity depth to isolate genuine rate trends
- **Benchmarking:** Compare against sector averages or similar protocols

##  Limitations

- **Noise Sensitivity:** APYs can be highly volatile short-term; smoothing must be applied carefully
- **Incentives:** Sudden changes in incentive programs may distort perceived trends
- **Liquidity Effects:** Shifts in liquidity or utilization rate can affect APY independently of protocol quality
- **Benchmarking:** Hard to compare across protocols without normalizing for risk and incentive structure
- **Time Lag:** Historical data may not reflect current market conditions

##  Assessment

The assessment evaluates how significantly the lending APY has decreased over a defined historical window (typically 90 days).  
The decline is expressed as a **percentage decrease relative to the starting APY**.

For example:  
If APY drops from 4.0% to 2.0% over 90 days, this represents a 50% decrease:

| Risk Level     | Threshold                         | Description                                               |
|----------------|------------------------------------|-----------------------------------------------------------|
| Very High (5)  | APY down > 60% (90d)               | Sharp, sustained decline in returns                       |
| High (4)       | APY down 40–60% (90d)              | Strong downward pressure on earnings                      |
| Medium (3)     | APY down 20–40% (90d)              | Noticeable yield erosion                                  |
| Low (2)        | APY down 10–20% (90d)              | Mild but persistent reduction in returns                  |
| Very Low (1)   | APY down < 10% (90d)               | Stable or minimally declining trend                       |

##  Standard Configurations

| Profile       | 5 – Very High | 4 – High | 3 – Medium | 2 – Low | 1 – Very Low |
|---------------|---------------|----------|------------|---------|--------------|
| Conservative  | >50%          | 40–50%   | 30–40%     | 20–30%  | <20%         |
| Moderate      | >60%          | 50–60%   | 35–50%     | 25–35%  | <25%         |
| Aggressive    | >70%          | 60–70%   | 40–60%     | 30–40%  | <30%         |

##  Usage Guidance

This indicator is especially useful for:

- Detecting long-term sustainability issues of a lending protocol  
- Triggering alerts when yields fall below an investor's target  
- Informing asset reallocation or early withdrawal decisions  
- Comparing yield trends across protocols to evaluate performance
- Monitoring protocol health and market dynamics

##  Related Risks

- R:DECREASING_YIELD - Direct correlation with decreasing yield risk
