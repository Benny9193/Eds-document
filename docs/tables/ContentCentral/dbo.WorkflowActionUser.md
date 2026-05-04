# Table: `dbo.WorkflowActionUser`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowActionId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowActionUser_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |
| `FK_WorkflowActionUser_WorkflowAction` | `WorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowActionUser_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_WorkflowActionUser_WorkflowActionId` | no | NONCLUSTERED | `WorkflowActionId` |  |
| `IX_WorkflowActionUser_WorkflowActionId_UserId` | YES | NONCLUSTERED | `WorkflowActionId`, `UserId` |  |
