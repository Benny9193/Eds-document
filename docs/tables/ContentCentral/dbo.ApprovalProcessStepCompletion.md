# Table: `dbo.ApprovalProcessStepCompletion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ApprovalProcessStepId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |
| 4 | `Direction` | nvarchar(50) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessStepCompletion_ApprovalProcessStep` | `ApprovalProcessStepId` | [`dbo.ApprovalProcessStep.Id`](dbo.ApprovalProcessStep.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessStepCompletion_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessStepCompletion_ApprovalProcessStepId` | no | NONCLUSTERED | `ApprovalProcessStepId` |  |
| `IX_ApprovalProcessStepCompletion_UserId` | no | NONCLUSTERED | `UserId` |  |
