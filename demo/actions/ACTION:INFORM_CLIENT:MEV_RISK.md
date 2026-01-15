```yaml
actionId: "ACTION:INFORM_CLIENT:MEV_RISK"
actionType: "INFORM_CLIENT"
relevantArticles: ["FIDLEG_Art8", "FIDLEG_Art9"]
actionDescription: "Inform client about MEV exploitation risks affecting their DeFi investments, including potential impact on their portfolio and available mitigation options."
priority: "HIGH"
dueBy: "48_HOURS"
responsibleRole: ["FRONT_OFFICE", "COMPLIANCE"]
requiredDocumentation: [
  "Client communication log entry",
  "Risk disclosure documentation",
  "Portfolio impact assessment",
  "Mitigation options presentation"
]
impactOnClientRelation: "DIRECT_COMMUNICATION"
```

# Inform Client About MEV Risk

## Action Description

This action requires informing clients about MEV exploitation risks that may affect their DeFi investments. The communication must include potential portfolio impact, available mitigation options, and regulatory context under Swiss FIDLEG requirements.

## Regulatory Context

- **FIDLEG Article**: Art. 8 (Informationpflichten), Art. 9 (Angemessenheitsprüfung)
- **Client Type**: Both retail and professional clients
- **Deadline**: 48 hours from risk detection
- **Priority**: HIGH

## Required Documentation

1. **Client Communication Log Entry**: Record of all client communications
2. **Risk Disclosure Documentation**: Formal risk disclosure materials
3. **Portfolio Impact Assessment**: Analysis of potential client impact
4. **Mitigation Options Presentation**: Available risk mitigation strategies

## Implementation Requirements

### Communication Requirements
- Clear, understandable language for retail clients
- Detailed technical information for professional clients
- Regulatory context explanation
- Impact assessment on client portfolio
- Available mitigation options

### Documentation Requirements
- All communications recorded
- Client acknowledgment obtained
- Risk disclosure documented
- Follow-up actions planned

## Trigger Conditions

This action is triggered when:
- MEV exploitation risk reaches CRITICAL severity
- Client portfolios are potentially affected
- Market manipulation patterns detected
- Regulatory reporting requirements met

## Success Criteria

- Client informed within 48 hours
- Risk disclosure completed
- Client acknowledgment obtained
- Portfolio impact assessed
- Mitigation options presented
- Communication documented

## Client Communication Template

### For Retail Clients
"Dear [Client Name],

We are writing to inform you about a potential risk affecting DeFi investments in your portfolio. Market manipulation through MEV exploitation has been detected, which may impact the protocols you are invested in.

**What this means for you:**
- Potential temporary price volatility
- Possible impact on yield generation
- Risk of unfair trading practices

**What we're doing:**
- Monitoring the situation closely
- Reporting to Swiss regulators (FINMA)
- Implementing additional protection measures

**Your options:**
- Continue with current investments (with increased monitoring)
- Reduce exposure to affected protocols
- Discuss alternative investment strategies

Please contact your relationship manager to discuss your specific situation and preferences.

Best regards,
[Bank Name] Compliance Team"

### For Professional Clients
[Detailed technical analysis with specific impact assessment and mitigation strategies]

## Related Actions

- [ACTION:REPORT_TO_FINMA:MEV_ABUSE](./ACTION:REPORT_TO_FINMA:MEV_ABUSE.md)
- [ACTION:FILE_AML_REPORT_MROS](./ACTION:FILE_AML_REPORT_MROS.md)

## Related Risks

- [R:MEV_EXPLOITATION.FIDLEG](../risks/R:MEV_EXPLOITATION.FIDLEG.md)
