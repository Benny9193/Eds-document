# Table: `dbo.ApprovalProcessCompletion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 811

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessName` | nvarchar(50) | NO | `('')` |  |
| 4 | `CompletionType` | nvarchar(50) | NO | `('')` |  |
| 5 | `CompletionDomainUserName` | nvarchar(50) | NO | `('')` |  |
| 6 | `StartDateUtc` | datetime | NO | `(getutcdate())` |  |
| 7 | `EndDateUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessCompletion_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessCompletion_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
