# Table: `dbo.WorkflowTriggerUser`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowTriggerId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowTriggerUser_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |
| `FK_WorkflowTriggerUser_WorkflowTrigger` | `WorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowTriggerUser_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_WorkflowTriggerUser_WorkflowTriggerId` | no | NONCLUSTERED | `WorkflowTriggerId` |  |
| `IX_WorkflowTriggerUser_WorkflowTriggerId_UserId` | YES | NONCLUSTERED | `WorkflowTriggerId`, `UserId` |  |
