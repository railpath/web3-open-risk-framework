# Swiss FIDLEG Extension

A prescriptive DeFi compliance engine for Swiss financial institutions. Enables systematic evaluation, management, and response to FIDLEG and GwG regulatory requirements when integrating DeFi protocols (Aave, Compound, Uniswap) into service offerings.

##  Documentation

- **[ Detailed Guide](./fidleg.md)** - Comprehensive implementation guide (PDF documentation)
- **[Risk Guide](./docs/risk.fidleg.md)** - FIDLEG-driven risk directives
- **[Indicator Guide](./docs/indicator.fidleg.md)** - Compliance monitoring triggers
- **[Measure Guide](./docs/measure.fidleg.md)** - Regulatory mitigation measures
- **[Assessment Guide](./docs/assessment.fidleg.md)** - Compliance evaluation outcomes
- **[Action Guide](./docs/action.fidleg.md)** - Automated compliance actions
- **[Schema Reference](./schema/)** - Extended JSON schemas with FIDLEG capabilities

##  Quick Start

1. **Read the Guide**: Start with the [detailed implementation guide](./fidleg.md)
2. **Review Schemas**: Examine [fidleg-action.schema.json](./schema/fidleg-action.schema.json)
3. **Study Components**: Check the [component guides](./docs/) for specific implementations
4. **See Examples**: Examine implementation examples in the [main demo](../../demo/)

##  Schema Extension Example

The FIDLEG extension adds `regulatoryExtensions.fidleg` objects to core schemas:

```json
{
  "actionId": "ACTION:INFORM_CLIENT:PROTOCOL_RISK",
  "actionType": "INFORM_CLIENT",
  "relevantArticles": ["FIDLEG_Art72", "GwG_Art6"],
  "actionDescription": "Inform client about critical vulnerability in Uniswap V3 protocol, explaining potential for total loss of assets and offering re-evaluation of investment strategy.",
  "priority": "HIGH",
  "dueBy": "24_HOURS",
  "responsibleRole": ["FRONT_OFFICE", "COMPLIANCE"],
  "requiredDocumentation": [
    "Client communication log entry",
    "Risk assessment update form"
  ],
  "impactOnClientRelation": "DIRECT_COMMUNICATION"
}
```

##  Implementation Examples

- **Risk**: [R:MEV_EXPLOITATION.FIDLEG.md](../../demo/risks/R:MEV_EXPLOITATION.FIDLEG.md)
- **Indicator**: [I:MEV_DETECTION.FIDLEG.md](../../demo/indicators/I:MEV_DETECTION.FIDLEG.md)
- **Measure**: [M:MEV_PROTECTION.FIDLEG.md](../../demo/measures/M:MEV_PROTECTION.FIDLEG.md)
- **Assessment**: [A:MEV_EXPLOITATION.FIDLEG.md](../../demo/assessments/A:MEV_EXPLOITATION.FIDLEG.md)

##  Core FIDLEG Articles

- **FIDLEG_Art72**: Operational Risk Management (Smart contract security, admin key risks)
- **FIDLEG_Art142**: Market Abuse Prevention (MEV detection, wash trading)
- **FIDLEG_Art8**: Informationpflichten (Client information requirements)
- **FIDLEG_Art9**: Angemessenheitsprüfung (Service appropriateness assessment)
- **FIDLEG_Art10**: Eignungsprüfung (Client suitability verification)
- **GwG_Art6**: Sorgfaltspflichten (Customer due diligence, AML monitoring)

> ** For detailed implementation guidance, schema tables, and comprehensive documentation, see the [FIDLEG Extension Guide](./fidleg.md).**
