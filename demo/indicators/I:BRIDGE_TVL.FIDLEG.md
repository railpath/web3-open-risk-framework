# Indicator: Bridge Total Value Locked (FIDLEG)

```yaml
id: I:BRIDGE_TVL.FIDLEG
title: Bridge Total Value Locked
version: "1.0"
lastUpdate: 2026-01-14T00:00:00.000Z
preconditions: []
methodology: []
limitations: []
extensions:
  - fidleg
regulatoryExtensions:
  fidleg:
    indicator_type: null
    articles: []
    thresholds: {}
    monitoring_frequency: null
    alert_threshold: null
    action_threshold: null
```

## Description

Tracks the total value of assets locked in cross-chain bridge contracts. Under FIDLEG Art. 72, bridges with high TVL represent operational risks requiring enhanced monitoring and customer disclosure.

Higher TVL increases both the economic incentive for attacks and the potential magnitude of customer losses.

##  FIDLEG Context

**Art. 72 - Operational Risk Management:**
Swiss financial institutions must monitor infrastructure dependencies that could impact operations or customer assets. Bridge TVL serves as a proxy for operational risk concentration.

**Regulatory Rationale:**
- Large TVL = High-value attack target
- Concentration risk for customer portfolios
- Systemic impact potential
- Recovery difficulty after exploit

##  Preconditions

- Access to on-chain contract data (Etherscan, blockchain explorers)
- Real-time price feeds for all bridged assets
- Historical TVL data for trend analysis (minimum 90 days)
- Automated alerting infrastructure

##  Methodology

### Data Collection
```javascript
// Example: Query bridge contract
const bridgeContract = new ethers.Contract(BRIDGE_ADDRESS, ABI, provider);
const assets = await bridgeContract.getLockedAssets();

let totalTVL = 0;
for (const asset of assets) {
  const balance = await asset.balanceOf(BRIDGE_ADDRESS);
  const price = await priceOracle.getPrice(asset.address);
  totalTVL += balance * price;
}
```

### Calculation
```
TVL = Σ(Asset_i × Price_USD_i) for all i locked assets

Risk Score = 
  TVL < $10M: 1 (Low)
  TVL $10M-$50M: 2 (Medium)
  TVL $50M-$100M: 3 (High)
  TVL > $100M: 4 (Critical)
```

### Update Frequency
- **Real-time:** WebSocket updates for large bridges
- **Hourly:** Scheduled snapshots for reporting
- **Daily:** Aggregated metrics for FINMA reporting

## Limitations

- **Price Volatility:** TVL fluctuates with market prices
- **Multi-Chain Complexity:** Assets exist on multiple chains
- **Hidden Liquidity:** Some bridges use multiple contracts
- **Wrapped Assets:** Double-counting risk if wrapped tokens included

## Assessment (FIDLEG Framework)

### Risk Bands

```yaml
LOW (< $10M):
  action: "Standard monitoring"
  customer_access: "Unrestricted"
  reporting: "Monthly"

MEDIUM ($10M - $50M):
  action: "Enhanced monitoring"
  customer_access: "Suitability assessment required"
  reporting: "Weekly"

HIGH ($50M - $100M):
  action: "Daily monitoring + alerts"
  customer_access: "Professional clients only"
  reporting: "Daily"
  
CRITICAL (> $100M):
  action: "Real-time monitoring + automated limits"
  customer_access: "Restricted pending governance approval"
  reporting: "Real-time + immediate incident reporting"
```

## Standard Configurations

```yaml
thresholds:
  alert: "$50M"
  pause_new_deposits: "$100M"
  emergency_exit_plan: "$150M"

monitoring:
  update_interval: "Real-time (WebSocket)"
  dashboard_refresh: "30 seconds"
  alert_latency: "< 60 seconds"

customer_limits:
  max_single_customer: "10% of bridge TVL"
  max_portfolio_allocation: "25% customer portfolio"
```

## Usage Guidance

### For Financial Institutions

**Pre-Approval:**
- Verify TVL <$50M before customer access
- Establish monitoring infrastructure
- Create incident response plan

**Ongoing Monitoring:**
- Daily TVL checks
- Alert on 20%+ TVL increase in 24h
- Customer concentration analysis weekly

**Actions by Threshold:**
- **$50M:** Activate enhanced monitoring
- **$75M:** Restrict retail customer access
- **$100M:** Pause new customer onboarding
- **>$100M:** Require governance approval + FINMA notification

### Automated Actions

```javascript
// Example monitoring script
async function monitorBridgeTVL() {
  const tvl = await calculateBridgeTVL();
  
  if (tvl > 100_000_000) {
    await pauseNewDeposits();
    await notifyFINMA('Bridge TVL exceeded $100M');
    await alertCompliance('CRITICAL: Bridge TVL limit');
  } else if (tvl > 50_000_000) {
    await restrictRetailAccess();
    await alertRiskTeam('WARNING: Bridge TVL > $50M');
  }
}
```

## Related Risks

- **R:BRIDGE_EXPLOIT.FIDLEG** - Primary risk measured
- **R:SMART_CONTRACT_VULNERABILITY** - Contract security risk
- **R:LIQUIDITY_CRISIS** - Large TVL withdrawals

## FIDLEG Compliance Documentation

**Required Documentation:**
- TVL monitoring procedures
- Alert escalation protocols
- Customer concentration limits
- Incident response playbook

**Reporting Templates:**
- Daily TVL snapshot
- Weekly trend analysis
- Monthly risk assessment
- Quarterly FINMA submission
