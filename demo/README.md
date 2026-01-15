#  Risk Catalogue Examples

This directory contains **example implementations** of the Web3 Risk Framework. These examples serve as templates and reference implementations to help you build your own comprehensive risk catalogue.

##  Purpose

The examples in this directory are designed to:

- **Demonstrate** the framework's capabilities and structure
- **Provide templates** for creating your own risk assessments
- **Show best practices** for risk documentation
- **Illustrate** the modular extension system (FIDLEG compliance)
- **Guide** implementation of regulatory requirements

##  Directory Structure

```
demo/
├── risks/           # Example risk definitions
├── indicators/      # Example indicator implementations  
├── measures/        # Example mitigation measures
└── assessments/     # Example risk assessments
```

##  How to Use These Examples

> **Just getting started?** Check out the [Getting Started Guide](../docs/getting-started.md) for a step-by-step tutorial on creating your first risk.

### 1. **Study the Structure**
- Review the YAML metadata format
- Understand the relationship between risks, indicators, and measures
- Examine the FIDLEG extension examples

### 2. **Adapt to Your Needs**
- Copy and modify examples for your specific protocols
- Add your own risk categories and indicators
- Extend with additional regulatory requirements

### 3. **Build Your Own Catalogue**
- Create your own risk definitions
- Develop protocol-specific indicators
- Implement custom mitigation measures
- Conduct tailored risk assessments

##  Example Categories

### Core Framework Examples
- **Decreasing Yield Risk** - Traditional DeFi risk assessment
- **Utilization Ratio Indicator** - Protocol health monitoring
- **Capital Reallocation Measure** - Risk mitigation strategy

### FIDLEG Extension Examples
- **MEV Exploitation Risk** - Market abuse prevention (Art. 142)
- **MEV Detection Indicator** - Suspicious pattern monitoring
- **MEV Protection Measure** - Technical mitigation implementation
- **MEV Exploitation Assessment** - Bank decision framework

##  Getting Started

1. **Read the Framework Documentation**
   - Start with [`docs/philosophy.md`](../docs/philosophy.md)
   - Review [`docs/terminology.md`](../docs/terminology.md)

2. **Understand the Templates**
   - Study [`docs/risk.md`](../docs/risk.md)
   - Examine [`docs/indicator.md`](../docs/indicator.md)
   - Review [`docs/measure.md`](../docs/measure.md)

3. **Explore Regulatory Extensions**
   - Check [`extensions/fidleg/docs/`](../extensions/fidleg/docs/) for Swiss FIDLEG examples
   - Understand how modular extensions work

4. **Build Your Own**
   - Copy example files as starting points
   - Modify content for your specific use case
   - Validate using the provided scripts

##  Important Notes

- **These are examples only** - Not a complete risk catalogue
- **Customize for your needs** - Adapt to your specific protocols and requirements
- **Regulatory compliance** - Ensure your implementation meets applicable regulations
- **Regular updates** - Keep your risk assessments current with protocol changes

##  Validation

Use the provided validation scripts to ensure your implementations are correct:

```bash
# Validate all markdown files
node scripts/validate-markdown.mjs

# Validate references between files
node scripts/validate-references.mjs
```

##  Further Reading

- **Framework Overview**: [`README.md`](../README.md)
- **FIDLEG Extension**: [`extensions/fidleg/README.md`](../extensions/fidleg/README.md)
- **Contributing Guide**: [`CONTRIBUTING.md`](../CONTRIBUTING.md)

---

*These examples provide a foundation for building comprehensive Web3 risk catalogues. Use them as inspiration and starting points for your own implementations.*
