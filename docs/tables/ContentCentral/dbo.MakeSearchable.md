# Table: `dbo.MakeSearchable`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | YES |  |  |
| 3 | `ExistingDocumentId` | uniqueidentifier | YES |  |  |
| 4 | `ElectronicCaptureDocumentName` | nvarchar(260) | YES |  |  |
| 5 | `ElectronicCaptureDocument` | varbinary(max) | YES |  |  |
| 6 | `FieldsXml` | nvarchar(max) | YES |  |  |
| 7 | `MakeSearchableAction` | nvarchar(50) | NO | `('')` |  |
| 8 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 9 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 10 | `ApprovalProcessesXml` | nvarchar(max) | YES |  |  |
| 11 | `CodingTime` | nvarchar(50) | YES |  |  |
| 12 | `QueueType` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_MakeSearchable_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_MakeSearchable_Document` | `ExistingDocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_MakeSearchable_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_MakeSearchable_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_MakeSearchable_ExistingDocumentId` | no | NONCLUSTERED | `ExistingDocumentId` |  |
| `IX_MakeSearchable_UserId` | no | NONCLUSTERED | `UserId` |  |
