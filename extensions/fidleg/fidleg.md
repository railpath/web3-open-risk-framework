# Swiss FIDLEG Extension (Work in progress)

A prescriptive DeFi compliance engine for Swiss financial institutions, enabling systematic evaluation, management, and response to FIDLEG and GwG regulatory requirements when integrating DeFi protocols.

##  Overview

The FIDLEG Extension transforms risk and assessment data into actionable compliance directives. It embeds Swiss regulatory requirements directly into core data structures, allowing banks to programmatically mandate FIDLEG and GwG-compliant responses for proactive, auditable DeFi protocol governance.

##  Quick Start

### 1. Define Actions
Create compliance steps using the FIDLEG action schema. Each action requires a unique identifier, specific action type, relevant regulatory articles, detailed description, priority level, completion timeline, responsible roles, required documentation, and impact assessment on client relations.

### 2. Integrate Triggers
Embed `fidlegActionTriggers` in risk, indicator, measure, and assessment schemas.

### 3. Review Documentation
Study the component guides for integration details.

### 4. See Examples
Examine implementation examples in the catalogue.

<!-- PAGEBREAK -->

### 5. Deploy
Implement for automated regulatory compliance.

##  Schema Extension

The FIDLEG extension adds `regulatoryExtensions.fidleg` objects to core schemas:

### Action Types

| Action Type | Description | Application Scope |
|-------------|-------------|-------------------|
| **[INFORM_CLIENT]** | Client Information | Direct communication with clients about risks |
| **[REPORT_TO_FINMA]** | FINMA Reporting | MROS reporting for suspicious activities |
| **[FILE_AML_REPORT]** | AML Reporting | Anti-Money Laundering reporting |

### Priority Levels

| Priority | Description | Timeline |
|----------|-------------|----------|
| **[CRITICAL]** | Immediate action required | < 1 hour |
| **[HIGH]** | High priority | < 24 hours |
| **[MEDIUM]** | Normal priority | < 72 hours |
| **[LOW]** | Low priority | < 1 week |

<!-- PAGEBREAK -->

### Due By Timelines

| Timeline | Description | Application |
|----------|-------------|-------------|
| **[IMMEDIATE]** | Immediate execution | Critical compliance violations |
| **[24_HOURS]** | Within 24 hours | High priority actions |
| **[72_HOURS]** | Within 72 hours | Standard compliance actions |
| **[1_WEEK]** | Within one week | Routine compliance |

### Responsible Roles

| Role | Responsibility | Application Scope |
|------|----------------|-------------------|
| **[FRONT_OFFICE]** | Client Relations | Client communication and support |
| **[COMPLIANCE]** | Regulatory Compliance | Regulatory monitoring and reporting |
| **[RISK_MANAGEMENT]** | Risk Assessment | Risk evaluation and management |
| **[LEGAL]** | Legal Affairs | Legal advice and documentation |

<!-- PAGEBREAK -->

##  Core FIDLEG Articles

### Operational Risk Management (Art. 72)
- **Smart Contract Security**: Assessment of protocol security risks
- **Admin Key Risks**: Management of administration keys
- **Operational Resilience**: Operational resistance capabilities

### Market Abuse Prevention (Art. 142)
- **MEV Detection**: Detection of Maximal Extractable Value activities
- **Wash Trading**: Identification of manipulative trading activities
- **Market Manipulation**: Monitoring of market manipulative practices

### Client Information Requirements (Art. 8)
- **Information Obligations**: Mandatory client information
- **Transparency**: Disclosure of risks and costs
- **Documentation**: Documentation requirements

### Service Appropriateness (Art. 9)
- **Appropriateness Assessment**: Assessment of service appropriateness
- **Risk Assessment**: Risk evaluation for services
- **Client Suitability**: Client suitability verification

### Customer Due Diligence (GwG Art. 6)
- **Due Diligence Obligations**: Customer verification obligations
- **AML Monitoring**: Anti-Money Laundering monitoring
- **Transaction Monitoring**: Transaction monitoring

<!-- PAGEBREAK -->

##  Key FIDLEG Articles

| Article | Description | Application Scope |
|---------|-------------|-------------------|
| **FIDLEG Art. 72** | Operational Risk Management | Smart contract security, admin key risks |
| **FIDLEG Art. 142** | Market Abuse Prevention | MEV detection, wash trading |
| **FIDLEG Art. 8** | Information Obligations | Client information requirements |
| **FIDLEG Art. 9** | Appropriateness Assessment | Service appropriateness assessment |
| **FIDLEG Art. 10** | Suitability Assessment | Client suitability verification |
| **GwG Art. 6** | Due Diligence Obligations | Customer due diligence, AML monitoring |

<!-- PAGEBREAK -->

##  Key Features

### Dynamic Action Triggering
Automatic initiation of FIDLEG actions based on predefined conditions and assessment results.

### FINMA-Compliant Reporting
Generation of auditable commands with MROS reporting specifications for suspicious activities.

### Suspicious Pattern Detection
Integration of detection for:
- MEV arbitrage activities
- Structuring patterns
- Geographic risk factors

### Automated Regulatory Triage
Linking assessment results with compliance mandates for structured decision-making.

### GwG Workflows
Comprehensive AML compliance through:
- Transaction monitoring
- Customer verification
- Suspicious activity reporting

<!-- PAGEBREAK -->

### Auditable Traceability
Immutable record of:
- Triggered actions
- Regulatory basis
- Compliance decisions

##  Implementation Benefits

- **Proactive Compliance**: Automatic enforcement of regulatory mandates
- **Operational Efficiency**: Automation of routine compliance tasks
- **Enhanced Auditability**: Machine-readable audit trails
- **Granular Control**: Precise action definitions and conditional triggering
- **Structured Decision-Making**: Clear framework for DeFi exposure evaluation
- **Future-Proof**: Adapts to evolving regulatory landscapes

<!-- HIDDEN -->
For additional details, see the [Detailed Component Guides](./docs/) and [Implementation Examples](../../demo/).
<!-- /HIDDEN -->