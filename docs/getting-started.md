# Getting Started with the Web3 Open Risk Framework

Welcome! This guide will help you get up and running with the Web3 Open Risk Framework in under 15 minutes.

## 🎯 What You'll Learn

- How to use the framework for risk assessment
- How to create your first risk definition
- How to validate your work
- How to extend the framework for your needs

## 📋 Prerequisites

- Basic understanding of Web3/DeFi concepts
- Familiarity with Markdown and YAML
- Node.js installed (for validation scripts)
- Git (optional, for version control)

---

## 🚀 Quick Start (5 Minutes)

### 1. Explore the Demo Examples

The `demo/` directory contains production-ready examples:

```bash
demo/
├── risks/        # 7 example risks across all categories
├── indicators/   # 11 measurement indicators
├── measures/     # 7 mitigation strategies
└── assessments/  # 2 assessment examples
```

**Start here:** Open `demo/risks/R:SMART_CONTRACT_VULNERABILITY.md` to see a complete risk definition.

### 2. Understand the Structure

Every risk file follows this pattern:

```markdown
# Risk: [Title]

```yaml
id: R:RISK_NAME
title: Descriptive Title
category: FINANCIAL | TECHNICAL | DEPENDENCY | etc.
type: QUANTITATIVE | QUALITATIVE | HYBRID
scopes: [LENDING, TRADING, etc.]
owners: [INVESTOR, OPERATOR, etc.]
indicators: [I:INDICATOR_1, I:INDICATOR_2]
measures: [M:MEASURE_1, M:MEASURE_2]
```\`

## Description
[What is this risk?]

## Context
[Why does it matter in Web3?]

## Indicators
[How do you measure it?]

## Measures
[How do you mitigate it?]
\```

### 3. Review Core Concepts

Read these foundation docs (10 minutes total):

1. **[Philosophy](./docs/philosophy.md)** - Framework principles (3 min)
2. **[Terminology](./docs/terminology.md)** - Key terms (5 min)
3. **[Risk Template](./docs/risk.md)** - Structure guide (2 min)

---

## 📝 Create Your First Risk (10 Minutes)

Let's create a risk for **Bridge Exploit** as a practical example.

### Step 1: Choose Your File Location

```bash
# Navigate to your working directory
cd demo/risks/

# Create your risk file (use R: prefix)
touch R:BRIDGE_EXPLOIT.md
```

### Step 2: Add YAML Frontmatter

Copy this template and customize:

```yaml
---
id: R:BRIDGE_EXPLOIT
title: Cross-Chain Bridge Exploit Risk
category: TECHNICAL
type: HYBRID
scopes:
  - INFRASTRUCTURE
  - PROTOCOL
owners:
  - OPERATOR
  - PROTOCOL_TEAM
objectives:
  - type: VALUE
    direction: DECREASE
    goal: PREVENT
indicators:
  - I:BRIDGE_TVL
  - I:AUDIT_STATUS
measures:
  - M:CODE_AUDIT
  - M:MULTI_SIG_CONTROL
severity: CRITICAL
probability: MEDIUM
impact: CRITICAL
---
```

### Step 3: Write the Description

```markdown
## 📋 Description

Cross-chain bridges are critical infrastructure that enable asset transfers 
between blockchains. Bridge exploits occur when attackers compromise the 
smart contracts or validators securing locked assets, leading to unauthorized 
minting or withdrawal of funds.

Historical losses from bridge exploits exceed $2.5 billion, representing 
~50% of all DeFi hacks.
```

### Step 4: Add Context and Mitigation

```markdown
## 🔍 Context

Bridges are particularly vulnerable because:
- Large concentrations of value in single contracts
- Complex cross-chain validation logic
- Limited options for recovery after exploit
- Often the weakest link in multi-chain ecosystems

## 🛡️ Measures

- **M:CODE_AUDIT** - Multiple independent security audits
- **M:MULTI_SIG_CONTROL** - Distributed validator control
- **M:TVL_LIMITS** - Gradual rollout with TVL caps
```

### Step 5: Validate Your Work

```bash
cd ../../scripts
npm install
npm run validate
```

Expected output:
```
✓ All files passed validation!
✓ All references are valid!
```

---

## 🔬 Working with Indicators

Indicators measure risks quantitatively. Let's create one for our bridge risk.

### Create `I:BRIDGE_TVL.md`

```yaml
---
id: I:BRIDGE_TVL
title: Bridge Total Value Locked
type: Indicator
version: '1.0'
---

## Description

Tracks the total value locked in a bridge contract. Higher TVL increases 
the economic incentive for attacks and potential impact of exploits.

## Methodology

- **Data Source:** On-chain contract balance queries
- **Calculation:** Sum of all assets locked in bridge contracts
- **Update Frequency:** Real-time or hourly snapshots
- **Formula:** `TVL = Σ(Asset_i × Price_i) for all locked assets`

## Thresholds

\```yaml
critical: "> $500M (High-value target)"
warning: "$100M-$500M (Medium risk)"
acceptable: "< $100M (Lower risk)"
\```

## Related Risks

- R:BRIDGE_EXPLOIT - Primary risk measured
```

---

## ✅ Validation Workflow

### Automated Validation

The framework includes validation scripts to ensure data integrity:

```bash
cd scripts

# Validate YAML structure
npm run validate

# Validate cross-references
npm run validate-references

# Run both
npm run validate-all
```

### Common Validation Errors

**Error: "Indicator I:NONEXISTENT does not exist"**
```
Solution: Either create the indicator or remove the reference
```

**Error: "Invalid YAML frontmatter"**
```
Solution: Check YAML syntax - common issues:
- Missing quotes around special characters
- Incorrect indentation (use 2 spaces)
- Missing required fields
```

**Error: "File naming convention violated"**
```
Solution: Files must follow pattern:
- Risks: R:RISK_NAME.md
- Indicators: I:INDICATOR_NAME.md
- Measures: M:MEASURE_NAME.md
```

---

## 🎨 Customization Guide

### Adding Custom Categories

Edit `docs/categories.md` to add your own risk categories:

```yaml
custom_categories:
  - INFRASTRUCTURE_RISK
  - ECONOMIC_RISK  
  - SOCIAL_RISK
```

### Creating Domain Extensions

Follow the FIDLEG extension pattern in `extensions/fidleg/`:

1. Create `extensions/[your-domain]/`
2. Add schema extensions in `extensions/[your-domain]/schema/`
3. Document in `extensions/[your-domain]/README.md`
4. Provide examples in `demo/`

### Protocol-Specific Risks

Adapt the framework for specific protocols:

```markdown
# R:PROTOCOL_SPECIFIC_RISK.md

Add protocol context:
- Protocol name and version
- Deployment addresses
- Governance model
- Historical incidents
```

---

## 🛠️ Advanced Usage

### Generating Reports

Use the framework data to generate risk reports:

```javascript
// Example: Parse all risks
const risks = await parseRiskCatalogue('./demo/risks/');
const criticalRisks = risks.filter(r => r.severity === 'CRITICAL');

console.log(`Found ${criticalRisks.length} critical risks`);
```

### Integration with Dashboards

The YAML frontmatter enables programmatic access:

```python
import yaml
import glob

# Load all risks
for risk_file in glob.glob('demo/risks/*.md'):
    with open(risk_file) as f:
        content = f.read()
        metadata = yaml.safe_load(content.split('---')[1])
        print(f"{metadata['id']}: {metadata['severity']}")
```

### Continuous Integration

Add to your CI/CD pipeline:

```yaml
# .github/workflows/validate.yml
name: Validate Risk Catalogue

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd scripts && npm install
      - run: cd scripts && npm run validate-all
```

---

## 🤝 Contributing

Want to contribute to the framework? See [CONTRIBUTING.md](../CONTRIBUTING.md).

### Contribution Workflow

1. Fork the repository
2. Create your risk/indicator/measure
3. Run validation: `npm run validate-all`
4. Submit a pull request
5. Ensure CI passes

---

## 📚 Next Steps

### Beginner Path
1. ✅ Complete this guide
2. 📖 Read [Philosophy](./docs/philosophy.md)
3. 🔍 Explore [Demo Examples](../demo/)
4. ✍️ Create your first risk

### Intermediate Path
1. 📊 Study [Assessment Guide](./docs/assessment.md)
2. 🎯 Create full risk-indicator-measure chain
3. 🔬 Implement quantitative indicators
4. 🧪 Develop automated monitoring

### Advanced Path
1. 🏗️ Build protocol-specific extension
2. 🚀 Integrate with live dashboards
3. 🤖 Automate risk assessments
4. 🇨🇭 Explore [FIDLEG Extension](./extensions/fidleg/)

---

## 🆘 Getting Help

- **Documentation:** Browse `/docs` for detailed guides
- **Examples:** Check `/demo` for production-ready templates
- **Issues:** Open a GitHub issue for bugs or questions
- **Email:** kontakt@benjamin-damm.ch

---

## ⭐ Quick Reference

### File Naming Patterns
```
R:DESCRIPTIVE_NAME.md     # Risks
I:DESCRIPTIVE_NAME.md     # Indicators
M:DESCRIPTIVE_NAME.md     # Measures
A:DESCRIPTIVE_NAME.md     # Assessments
```

### Required YAML Fields
```yaml
# Risk
id, title, category, type, scopes, owners, severity, probability, impact

# Indicator
id, title, type, version

# Measure  
id, title, type, version, effectiveness, cost
```

### Validation Commands
```bash
npm run validate              # Schema validation
npm run validate-references   # Cross-reference check
npm run validate-all          # Complete validation
```

---

**🎉 Congratulations!** You're now ready to use the Web3 Open Risk Framework.

Start by exploring the demo examples, then create your first risk assessment. Remember: the framework is designed to be extended and customized for your specific needs.

Happy risk management! 🛡️
