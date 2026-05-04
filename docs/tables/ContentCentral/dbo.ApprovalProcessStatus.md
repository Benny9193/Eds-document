# Table: `dbo.ApprovalProcessStatus`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4320

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ApprovalProcessId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessMemberId` | uniqueidentifier | YES |  |  |
| 4 | `DocumentId` | uniqueidentifier | NO |  |  |
| 5 | `StatusType` | nvarchar(50) | NO | `('')` |  |
| 6 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessStatus_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessStatus_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessStatus_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
| `IX_ApprovalProcessStatus_ApprovalProcessMemberId` | no | NONCLUSTERED | `ApprovalProcessMemberId` |  |
| `IX_ApprovalProcessStatus_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
