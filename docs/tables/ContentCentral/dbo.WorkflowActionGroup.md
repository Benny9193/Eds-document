# Table: `dbo.WorkflowActionGroup`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowActionId` | uniqueidentifier | NO |  |  |
| 3 | `GroupId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowActionGroup_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | CASCADE | CASCADE |
| `FK_WorkflowActionGroup_WorkflowAction` | `WorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowActionGroup_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_WorkflowActionGroup_WorkflowActionId` | no | NONCLUSTERED | `WorkflowActionId` |  |
| `IX_WorkflowActionGroup_WorkflowActionId_GroupId` | YES | NONCLUSTERED | `WorkflowActionId`, `GroupId` |  |
