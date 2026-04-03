# Measure: Oracle Diversification

```yaml
id: M:ORACLE_DIVERSIFICATION
title: Multi-Source Oracle Diversification
type: Measure
version: '1.0'
lastUpdate: 2026-01-14T00:00:00.000Z
impactPotential: HIGH
difficulty: HIGH
riskReductionScope:
  severity: true
  likelihood: true
  persistence: false
cost: MEDIUM
effectiveness: HIGH
implementation_time: 2-4 weeks
```

## Description

Oracle diversification involves integrating multiple independent oracle providers to aggregate price data and reduce single-point-of-failure risk. By combining data from Chainlink, Band Protocol, API3, Pyth, and other sources, protocols can detect and mitigate manipulation attempts.

A robust multi-oracle system uses median or weighted aggregation to filter out outliers and malicious data.

## Objective

Eliminate oracle manipulation risk by ensuring no single oracle source can unilaterally control price feeds used for liquidations, minting, or trading decisions.

## Effectiveness

**High** - Multi-oracle systems with 5+ independent sources make manipulation economically infeasible (attacker must control majority of sources).

**Limitations:**
- Sources may share upstream data providers (apparent diversity)
- Increased complexity and gas costs
- Slower update times with multi-source consensus
- Some oracles may lack coverage for niche assets

##  Cost

**Implementation Cost:** $10,000 - $50,000

**Factors:**
- Number of oracle integrations
- Smart contract complexity
- Testing and security review
- On-chain gas costs for aggregation

**Ongoing Costs:**
```
Oracle Fees: $500-$5,000/month depending on update frequency
Gas Costs: Higher per-update costs with multiple sources
Maintenance: Monitoring and updating oracle configurations
```

##  Implementation

### Prerequisites
- Multiple oracle providers support target assets
- Clear understanding of each oracle's methodology
- Smart contract architecture supporting dynamic oracle integration
- Monitoring infrastructure for deviation detection

### Steps

1. **Oracle Selection** (Week 1)
   - Identify 5-7 supported oracle providers
   - Verify asset coverage and update frequency
   - Assess geographic and infrastructure diversity
   - Check historical reliability metrics

2. **Integration Architecture** (Week 2)
   - Design median aggregatio logic
   - Implement outlier detection (±2.5σ)
   - Add circuit breakers for extreme deviations
   - Build fallback mechanisms

3. **Smart Contract Development** (Week 3)
   - Develop oracle aggregator contract
   - Implement weighted median calculation
   - Add staleness checks (max update age)
   - Include admin controls for oracle management

4. **Testing & Validation** (Week 4)
   - Test with historical price data
   - Simulate manipulation scenarios
   - Verify gas costs are acceptable
   - Conduct security audit of oracle logic

### Reference Implementation

```solidity
contract OracleAggregator {
    struct OracleSource {
        address oracle;
        uint256 weight;
        bool active;
    }
    
    OracleSource[] public sources;
    uint256 public constant STALENESS_THRESHOLD = 1 hours;
    uint256 public constant MAX_DEVIATION = 5e16; // 5%
    
    function getPrice() external view returns (uint256) {
        uint256[] memory prices = new uint256[](sources.length);
        uint256 count = 0;
        
        // Collect prices from all active sources
        for (uint i = 0; i < sources.length; i++) {
            if (sources[i].active) {
                (uint256 price, uint256 timestamp) = 
                    IOracle(sources[i].oracle).latestRoundData();
                
                require(block.timestamp - timestamp < STALENESS_THRESHOLD, 
                    "Stale price");
                prices[count++] = price;
            }
        }
        
        // Calculate median
        uint256 median = _median(prices, count);
        
        // Verify no outliers beyond threshold
        for (uint i = 0; i < count; i++) {
            uint256 deviation = _percentDifference(prices[i], median);
            require(deviation <= MAX_DEVIATION, "Price outlier detected");
        }
        
        return median;
    }
}
```

##  Metrics

**Success Indicators:**
- ≥5 independent oracle sources active
- Median price deviation < 2% across sources
- < 1% downtime over 90 days
- Zero successful manipulation attempts

**KPIs:**
```yaml
oracle_count: ">= 5 active sources"
geographic_diversity: ">= 3 continents"
update_frequency: "< 5 minutes max staleness"
deviation_threshold: "< 5% to trigger circuit breaker"
uptime: "> 99.9%"
```

## Challenges

- **Gas Costs:** Querying multiple oracles increases transaction costs
- **Latency:** Consensus across sources may delay updates
- **Source Correlation:** Many oracles use same upstream APIs (e.g., CoinGecko)
- **Asset Coverage:** Not all assets have 5+ independent oracles
- **Complexity:** More failure modes to monitor

## Related Risks

- **R:ORACLE_MANIPULATION** - Primary risk this measure mitigates
- **R:FLASH_LOAN_ATTACKS** - Diversification prevents flash loan price attacks
- **R:LIQUIDITY_CRISIS** - Accurate pricing prevents false liquidations

## Related Indicators

- **I:ORACLE_PRICE_DEVIATION** - Monitors source consensus
- **I:ORACLE_SOURCE_COUNT** - Tracks diversification level

## Best Practices

1. **True Independence:** Verify oracles use different upstream sources
2. **Outlier Rejection:** Exclude prices deviating >2.5σ from median
3. **Circuit Breakers:** Pause protocol if deviation exceeds threshold
4. **Time-Weighted Average:** Use TWAP to smooth out short-term manipulation
5. **Regular Audits:** Review oracle configurations quarterly
