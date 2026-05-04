# Table: `dbo.WorkQueueDocumentCompletion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkQueueDocumentId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkQueueDocumentCompletion_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `FK_WorkQueueDocumentCompletion_WorkQueueDocument` | `WorkQueueDocumentId` | [`dbo.WorkQueueDocument.Id`](dbo.WorkQueueDocument.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkQueueDocumentCompletion_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_WorkQueueDocumentCompletion_WorkQueueDocumentId` | no | NONCLUSTERED | `WorkQueueDocumentId` |  |
| `IX_WorkQueueDocumentCompletion_WorkQueueDocumentId_UserId` | YES | NONCLUSTERED | `WorkQueueDocumentId`, `UserId` |  |
