# Table: `dbo.RetroFolderFileBuildItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentId` | uniqueidentifier | NO |  | YES |
| 2 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 3 | `ModifiedUtc` | datetime | NO | `(getutcdate())` |  |
| 4 | `OriginalFolder` | nvarchar(260) | NO | `('')` |  |
| 5 | `OriginalDocName` | nvarchar(260) | NO | `('')` |  |
| 6 | `OriginalBaseName` | nvarchar(260) | NO | `('')` |  |
| 7 | `TempFolder` | nvarchar(260) | NO | `('')` |  |
| 8 | `TempBaseName` | nvarchar(260) | NO | `('')` |  |
| 9 | `NewFolder` | nvarchar(260) | NO | `('')` |  |
| 10 | `NewBaseName` | nvarchar(260) | NO | `('')` |  |
| 11 | `TempRenameComplete` | bit | NO | `((0))` |  |
| 12 | `FolderBuilderDocTypeTracker` | varbinary(max) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_RetroFolderFileBuildItem_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
