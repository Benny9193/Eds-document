# Table: `dbo.WorkflowRuleAction`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowRuleId` | uniqueidentifier | NO |  |  |
| 3 | `WorkflowActionId` | uniqueidentifier | NO |  |  |
| 4 | `ItemOrder` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowRuleAction_WorkflowAction` | `WorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | CASCADE | CASCADE |
| `FK_WorkflowRuleAction_WorkflowRule` | `WorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowRuleAction_WorkflowActionId` | no | NONCLUSTERED | `WorkflowActionId` |  |
| `IX_WorkflowRuleAction_WorkflowRuleId` | no | NONCLUSTERED | `WorkflowRuleId` |  |
