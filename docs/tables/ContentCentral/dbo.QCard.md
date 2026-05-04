# Table: `dbo.QCard`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32589

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Barcode` | nvarchar(50) | NO | `('')` |  |
| 3 | `QCardVersion` | nvarchar(50) | NO | `('ACC001')` |  |
| 4 | `Action` | nvarchar(50) | NO | `('')` |  |
| 5 | `UserId` | uniqueidentifier | YES |  |  |
| 6 | `DocumentId` | uniqueidentifier | YES |  |  |
| 7 | `FieldsXml` | nvarchar(max) | YES |  |  |
| 8 | `FixedPageCount` | int | NO | `((0))` |  |
| 9 | `CodingTime` | nvarchar(50) | YES |  |  |
| 10 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 11 | `LastUsedUtc` | datetime | YES |  |  |
| 12 | `Disabled` | bit | NO | `((0))` |  |
| 13 | `QueueType` | nvarchar(50) | YES |  |  |
| 14 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 15 | `CaptureSource` | nvarchar(50) | YES |  |  |
| 16 | `FolderOverride` | nvarchar(260) | YES | `('')` |  |
| 17 | `BaseNameOverride` | nvarchar(260) | YES | `('')` |  |
| 18 | `ApprovalProcessesXml` | nvarchar(max) | YES |  |  |
| 19 | `SkipOdbcLookup` | bit | NO | `((0))` |  |
| 20 | `ReservedDocumentId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_QCard_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_QCard_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_QCard_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CaptureFormSession`](dbo.CaptureFormSession.md) | `QCardId` | `Id` | CASCADE | CASCADE |
| [`dbo.CaptureJobSinglePageImageItem`](dbo.CaptureJobSinglePageImageItem.md) | `QCardId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DirectScan`](dbo.DirectScan.md) | `QCardId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_QCard_Barcode` | YES | NONCLUSTERED | `Barcode` |  |
| `IX_QCard_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_QCard_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_QCard_UserId` | no | NONCLUSTERED | `UserId` |  |
