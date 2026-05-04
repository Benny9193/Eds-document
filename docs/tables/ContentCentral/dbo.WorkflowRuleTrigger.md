# Table: `dbo.WorkflowRuleTrigger`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowRuleId` | uniqueidentifier | NO |  |  |
| 3 | `WorkflowTriggerId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowRuleTrigger_WorkflowRule` | `WorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | CASCADE | CASCADE |
| `FK_WorkflowRuleTrigger_WorkflowTrigger` | `WorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.WorkflowRule`](dbo.WorkflowRule.md) | `PrimaryWorkflowRuleTriggerId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowRuleTrigger_WorkflowRuleId` | no | NONCLUSTERED | `WorkflowRuleId` |  |
| `IX_WorkflowRuleTrigger_WorkflowTriggerId` | no | NONCLUSTERED | `WorkflowTriggerId` |  |
