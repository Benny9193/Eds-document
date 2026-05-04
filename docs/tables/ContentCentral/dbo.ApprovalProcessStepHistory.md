# Table: `dbo.ApprovalProcessStepHistory`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5131

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessId` | uniqueidentifier | NO |  |  |
| 4 | `CurrentStage` | int | NO | `((0))` |  |
| 5 | `Action` | nvarchar(50) | NO | `('')` |  |
| 6 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 7 | `UserId` | uniqueidentifier | YES |  |  |
| 8 | `UserDesc` | nvarchar(150) | NO | `('')` |  |
| 9 | `Note` | nvarchar(256) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessStepHistory_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessStepHistory_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessStepHistory_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
| `IX_ApprovalProcessStepHistory_ApprovalProcessId_DocumentId` | no | NONCLUSTERED | `ApprovalProcessId`, `DocumentId` |  |
| `IX_ApprovalProcessStepHistory_ApprovalProcessId_DocumentId_CreatedUtc` | no | NONCLUSTERED | `ApprovalProcessId`, `DocumentId`, `CreatedUtc` |  |
| `IX_ApprovalProcessStepHistory_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
