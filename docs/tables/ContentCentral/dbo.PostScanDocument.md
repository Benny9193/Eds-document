# Table: `dbo.PostScanDocument`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 92

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentPath` | nvarchar(260) | NO | `('')` |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |
| 4 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 5 | `QueueType` | nvarchar(50) | NO | `('')` |  |
| 6 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 7 | `CaptureSource` | nvarchar(50) | YES |  |  |
| 8 | `CreatedByUserId` | uniqueidentifier | YES |  |  |
| 9 | `CreatedByDomainUserName` | nvarchar(50) | YES |  |  |
| 10 | `MakeSearchableAsIsStoreOcr` | bit | YES |  |  |
| 11 | `PagesCaptured` | int | NO | `((1))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PostScanDocument_CreatedByUser` | `CreatedByUserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `FK_PostScanDocument_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_PostScanDocument_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PostScanDocumentApprovalProcess`](dbo.PostScanDocumentApprovalProcess.md) | `PostScanDocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.PostScanDocumentField`](dbo.PostScanDocumentField.md) | `PostScanDocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.PostScanDocumentThumbnail`](dbo.PostScanDocumentThumbnail.md) | `PostScanDocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.ServiceCommand`](dbo.ServiceCommand.md) | `PostScanDocumentId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowRuleCompletion`](dbo.WorkflowRuleCompletion.md) | `PostScanDocumentId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PostScanDocument_CreatedByUserId` | no | NONCLUSTERED | `CreatedByUserId` |  |
| `IX_PostScanDocument_CreatedUtc` | no | NONCLUSTERED | `CreatedUtc` |  |
| `IX_PostScanDocument_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_PostScanDocument_DocumentPath` | YES | NONCLUSTERED | `DocumentPath` |  |
| `IX_PostScanDocument_UserId` | no | NONCLUSTERED | `UserId` |  |
