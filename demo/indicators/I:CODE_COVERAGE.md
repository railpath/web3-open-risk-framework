# Indicator: Code Coverage

```yaml
id: I:CODE_COVERAGE
title: Code Coverage
type: Indicator
version: '1.0'
lastUpdate: 2026-01-14T00:00:00.000Z
```

## Description

Measures the percentage of smart contract code that is covered by automated tests. Higher code coverage indicates more thorough testing and reduces the likelihood of undetected bugs in production code.

Code coverage is a foundational metric for smart contract security, though it should be combined with other indicators like audit status and formal verification for comprehensive risk assessment.

##  Preconditions

- Access to the project's test suite and coverage reports
- Smart contracts must be written in a testable language (Solidity, Vyper, etc.)
- Coverage tooling must be properly configured (e.g., solidity-coverage, hardhat-coverage)
- Minimum of 30 days since initial deployment for meaningful assessment

##  Methodology

- **Data Collection:** Extract coverage reports from CI/CD pipeline or local test runs
- **Metric Calculation:** Calculate percentage of lines, branches, and functions covered
- **Normalization:** Weight critical functions (e.g., financial logic) higher than utility functions
- **Trend Analysis:** Track coverage changes over time to identify regressions
- **Benchmark Comparison:** Compare against industry standards and similar protocols

**Formula:**
```
Coverage Score = (Lines Covered / Total Lines) × 0.4 + 
                 (Branches Covered / Total Branches) × 0.4 +
                 (Functions Covered / Total Functions) × 0.2
```

## Limitations

- **Quality vs Quantity:** High coverage doesn't guarantee meaningful tests
- **Edge Cases:** Coverage tools may miss complex edge cases
- **External Calls:** Difficult to test external contract interactions
- **Time-dependent Logic:** Block timestamp and number-based logic hard to test comprehensively
- **False Security:** 100% coverage can create false confidence

## Assessment

The assessment evaluates code coverage as a proxy for code quality and security preparedness.

## Standard Configurations

```yaml
thresholds:
  critical: "< 60%"
  warning: "60-80%"
  good: "80-95%"
  excellent: "> 95%"

weights:
  line_coverage: 0.4
  branch_coverage: 0.4
  function_coverage: 0.2

timeframes:
  snapshot: "Current coverage"
  trend: "30-day moving average"

benchmarks:
  industry_minimum: "80%"
  defi_protocols: "85-95%"
  audited_contracts: "> 90%"
```

## Usage Guidance

This indicator is particularly useful for:

- **Pre-deployment assessment** - Ensuring adequate testing before mainnet
- **Continuous monitoring** - Tracking coverage regressions in new releases
- **Audit preparation** - Demonstrating code quality to auditors
- **Risk scoring** - Weighting contract risk based on test coverage

**Recommended Actions by Threshold:**
- **< 60%**: Block deployment, mandatory test expansion
- **60-80%**: Require additional tests before production
- **80-95%**: Acceptable for deployment with monitoring
- **> 95%**: Excellent, maintain coverage in updates

## Related Risks

- **R:SMART_CONTRACT_VULNERABILITY** - Primary risk this indicator measures
- **R:GOVERNANCE_ATTACK** - Governance contracts require high coverage
- **R:ORACLE_MANIPULATION** - Oracle integration tests need coverage
