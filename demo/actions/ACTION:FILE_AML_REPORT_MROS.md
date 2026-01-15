```yaml
actionId: "ACTION:FILE_AML_REPORT_MROS"
actionType: "FILE_AML_REPORT_MROS"
relevantArticles: ["GwG_Art6"]
actionDescription: "File suspicious transaction report with MROS (Money Laundering Reporting Office Switzerland) for MEV exploitation activities that may constitute money laundering or terrorist financing."
priority: "HIGH"
dueBy: "24_HOURS"
responsibleRole: ["COMPLIANCE"]
requiredDocumentation: [
  "MROS suspicious transaction report",
  "Transaction analysis documentation",
  "Customer due diligence records",
  "Internal investigation report"
]
impactOnClientRelation: "INTERNAL_PROCESSING"
```

# File AML Report with MROS

## Action Description

This action mandates filing a suspicious transaction report with MROS (Money Laundering Reporting Office Switzerland) for MEV exploitation activities that may constitute money laundering or terrorist financing under Swiss GwG regulations.

## Regulatory Context

- **GwG Article**: Art. 6 (Sorgfaltspflichten)
- **Reporting Authority**: MROS (Money Laundering Reporting Office Switzerland)
- **Deadline**: 24 hours from detection
- **Priority**: HIGH

## Required Documentation

1. **MROS Suspicious Transaction Report**: Official AML reporting form
2. **Transaction Analysis Documentation**: Detailed analysis of suspicious transactions
3. **Customer Due Diligence Records**: KYC and AML documentation
4. **Internal Investigation Report**: Results of internal AML investigation

## Implementation Requirements

### Technical Requirements
- Automated transaction monitoring
- Pattern recognition for suspicious activities
- Integration with MROS reporting systems
- Audit trail preservation

### Administrative Requirements
- Compliance team notification
- AML specialist involvement
- Senior management approval
- External AML counsel consultation (if required)

## Trigger Conditions

This action is triggered when:
- MEV exploitation patterns indicate potential money laundering
- Structuring activities detected
- Geographic risk patterns identified
- Rapid wallet creation/deletion patterns
- Suspicious transaction volumes exceeded

## Success Criteria

- MROS report filed within 24 hours
- All required documentation included
- Internal investigation completed
- Customer due diligence updated
- Audit trail maintained

## MROS Reporting Requirements

### Report Content
- Detailed transaction analysis
- Customer identification information
- Suspicious activity patterns
- Risk assessment findings
- Mitigation measures taken

### Technical Specifications
- XML format submission
- Encrypted transmission
- Receipt confirmation
- Follow-up reporting if required

## Related Actions

- [ACTION:REPORT_TO_FINMA:MEV_ABUSE](./ACTION:REPORT_TO_FINMA:MEV_ABUSE.md)
- [ACTION:INFORM_CLIENT:MEV_RISK](./ACTION:INFORM_CLIENT:MEV_RISK.md)

## Related Risks

- [R:MEV_EXPLOITATION.FIDLEG](../risks/R:MEV_EXPLOITATION.FIDLEG.md)

## AML Compliance Notes

- Report must be filed even if no customer is involved
- Suspicious activity includes attempted transactions
- Geographic risk factors must be considered
- Structuring patterns require immediate reporting
- Follow-up reports may be required based on MROS feedback
