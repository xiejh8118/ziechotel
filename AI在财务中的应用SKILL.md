---
name: ai-finance
description: Apply AI to corporate finance, accounting, FP&A, financial analysis, reporting, budgeting, forecasting, reconciliation, expense review, internal control, audit preparation, tax workflow support, and finance automation. Use when Codex is asked to design AI use cases for finance teams, write implementation plans, create prompts, analyze finance workflows, draft SOPs, build spreadsheet/report automation, or explain how AI can improve finance operations while controlling compliance and accuracy risk.
---

# AI In Finance

## Core Principle

Use AI as a finance productivity and decision-support layer, not as an unchecked decision maker.

For every finance task, separate:

- **Data work**: extraction, cleaning, classification, reconciliation, summarization
- **Analysis work**: variance analysis, trend explanation, forecast support, scenario comparison
- **Control work**: anomaly detection, policy checks, audit trail, approval routing
- **Communication work**: management reports, board summaries, email drafts, explanations

Always preserve human review for material accounting judgments, tax positions, legal conclusions, final payments, financial statements, and external disclosures.

## Default Output

Unless the user asks otherwise, produce:

1. A clear finance use-case map
2. Recommended AI workflow
3. Required data inputs
4. Controls and review checkpoints
5. Expected outputs
6. Implementation steps
7. Risks and mitigations

## Finance Domains

Select the relevant domain before answering:

- Accounting close: journal review, accrual support, account reconciliation, close checklist
- FP&A: budgeting, forecasting, variance analysis, scenario modeling, KPI reporting
- Reporting: monthly management reports, board packs, financial commentary
- Accounts payable: invoice capture, PO matching, payment review, vendor risk
- Accounts receivable: cash application, aging analysis, collection prioritization
- Expense management: reimbursement review, policy compliance, duplicate detection
- Treasury: cash forecasting, liquidity monitoring, bank reconciliation
- Tax: document organization, tax data preparation, risk flagging
- Audit: PBC list preparation, evidence indexing, audit response drafting
- Internal control: control testing, exception monitoring, segregation-of-duties review

## Use-Case Evaluation

Rank AI opportunities by:

- Repetition: repeated monthly, weekly, or daily
- Data volume: many invoices, transactions, emails, PDFs, spreadsheets
- Rule clarity: policies, mappings, thresholds, approval rules
- Reviewability: humans can quickly verify AI output
- Risk level: low-risk internal work before external or regulatory work
- Integration effort: available data sources and system access

Prioritize tasks that are high-volume, rule-guided, and easy to review.

Avoid starting with tasks where errors are hard to detect or consequences are material.

## Recommended Use Cases

### Month-End Close

Use AI to:

- Summarize close status by entity or account
- Identify unusual journal entries
- Draft variance explanations
- Compare balances against prior month, budget, and forecast
- Generate review questions for preparers
- Organize close evidence

Human must approve final entries and close sign-off.

### Financial Analysis

Use AI to:

- Explain revenue, margin, opex, working capital, and cash movements
- Generate first-draft commentary from structured data
- Highlight anomalies and drivers
- Convert raw analysis into executive language
- Build scenario narratives

Require source data, period definitions, metric formulas, and business context.

### Budgeting And Forecasting

Use AI to:

- Collect assumptions from department inputs
- Identify inconsistent assumptions
- Draft forecast narratives
- Compare scenarios
- Generate sensitivity questions
- Summarize changes from previous forecast

Do not let AI invent assumptions. Ask for explicit assumptions or mark gaps.

### Accounts Payable

Use AI to:

- Extract invoice fields
- Classify vendors and expenses
- Match invoice, PO, and receipt data
- Flag duplicate invoices
- Detect unusual payment terms or bank account changes
- Draft vendor query emails

Payment release must remain under approved human workflow.

### Expense Review

Use AI to:

- Check reimbursement claims against policy
- Flag missing receipts
- Detect duplicate or suspicious claims
- Categorize expenses
- Summarize exceptions for approvers

Always provide reason codes and evidence links.

### Audit Preparation

Use AI to:

- Map audit requests to internal files
- Create PBC trackers
- Summarize supporting documents
- Draft responses to auditors
- Identify missing evidence

Do not alter evidence. Maintain file lineage and version history.

## Workflow Pattern

Use this pattern for AI finance automation:

1. Define the finance decision or output.
2. Identify source systems and data owners.
3. Standardize input format.
4. Apply deterministic rules first.
5. Use AI for classification, summarization, explanation, and exception detection.
6. Require confidence scores or reason codes when possible.
7. Route exceptions to humans.
8. Log inputs, outputs, reviewer decisions, and final actions.
9. Measure accuracy, time saved, and error rate.

## Prompt Pattern

Use structured prompts for finance tasks:

```text
Role: You are a finance analyst supporting [team/process].
Task: [specific output].
Data: [paste table, file summary, or fields].
Rules: [accounting policy, expense policy, threshold, mapping].
Required output: [table/report/email/checklist].
Constraints:
- Do not invent missing numbers.
- Mark unknown items as "needs review".
- Explain each exception with evidence.
- Separate facts from judgment.
```

## Output Formats

Prefer structured outputs:

- Tables for exception lists
- Bullet points for management commentary
- Checklists for close and audit
- JSON or CSV for automation handoff
- Draft emails for vendor, department, or auditor communication

For analysis, separate:

- What happened
- Why it happened
- Financial impact
- Risk or opportunity
- Recommended next action

## Controls

Every AI finance workflow should include:

- Data source identification
- Version control for source files
- Review owner
- Approval threshold
- Exception handling
- Audit trail
- Access control
- Sensitive data policy
- Error sampling
- Periodic model/output review

## Risk Rules

Never present AI output as final for:

- Statutory financial statements
- Tax filings
- Legal positions
- Payment authorization
- Revenue recognition judgments
- Impairment judgments
- Related-party disclosures
- External investor or lender reporting

Use language like:

- `AI can prepare the first draft, but finance leadership must review and approve.`
- `This workflow supports analysis; it does not replace accounting judgment.`
- `The final tax/accounting treatment should be confirmed by qualified professionals.`

## Data Sensitivity

Before using AI with financial data, check:

- Does the data contain payroll, personal information, bank accounts, tax IDs, customer data, or vendor bank details?
- Is the AI tool approved by the company?
- Can sensitive fields be masked?
- Is data stored, logged, or used for training?
- Are there cross-border data transfer restrictions?

When uncertain, recommend anonymized samples or synthetic data for prototypes.

## Implementation Roadmap

For a practical finance team rollout:

1. Start with one low-risk workflow, such as management-report commentary or expense exception summaries.
2. Build a repeatable input template.
3. Test against historical periods.
4. Compare AI output with human-reviewed results.
5. Define accuracy targets and review rules.
6. Train users on what AI can and cannot do.
7. Expand to connected workflows only after controls are stable.

## KPI Metrics

Measure:

- Hours saved per close cycle
- Reduction in manual rework
- Exception detection rate
- False positive rate
- Review turnaround time
- Report production time
- Forecast commentary cycle time
- Audit request response time
- User adoption rate

## Common Deliverables

When asked to create materials, produce one of:

- AI finance use-case proposal
- Finance AI implementation roadmap
- Month-end close AI workflow
- FP&A AI reporting template
- Expense review AI SOP
- AP invoice review prompt
- Audit preparation checklist
- Board-report commentary template
- Risk and control matrix
- Pilot project plan

## Quality Bar

Before finalizing, check:

- Is the finance process clearly named?
- Are inputs and outputs explicit?
- Are accounting, tax, and compliance limits stated?
- Does the workflow include human review?
- Are risks and controls practical?
- Is the recommendation implementable with current finance tools?
- Does the answer avoid invented financial facts?

