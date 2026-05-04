# Table: `dbo.GridResultsField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1503

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | NO |  |  |
| 3 | `GridType` | nvarchar(50) | NO | `('')` |  |
| 4 | `DocumentFolderId` | uniqueidentifier | YES | `(NULL)` |  |
| 5 | `FieldOrder` | int | NO | `((0))` |  |
| 6 | `SortIndex` | int | NO | `((0))` |  |
| 7 | `SortOrder` | nvarchar(50) | NO | `('')` |  |
| 8 | `GridColumnKey` | nvarchar(60) | NO | `('')` |  |
| 9 | `FieldType` | nvarchar(50) | NO | `('')` |  |
| 10 | `DisplayInGrid` | bit | NO | `((1))` |  |
| 11 | `IsGroupBy` | bit | NO | `((0))` |  |
| 12 | `IsFiltered` | bit | NO | `((0))` |  |
| 13 | `FilterCondition` | nvarchar(50) | YES |  |  |
| 14 | `FilterText` | nvarchar(560) | YES |  |  |
| 15 | `FilterNumeric` | decimal(38,8) | YES |  |  |
| 16 | `FilterDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_GridResultsField_DocumentFolder` | `DocumentFolderId` | [`dbo.DocumentFolder.Id`](dbo.DocumentFolder.md) | CASCADE | CASCADE |
| `FK_GridResultsField_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_GridResultsField_DocumentFolderId` | no | NONCLUSTERED | `DocumentFolderId` |  |
| `IX_GridResultsField_UserId` | no | NONCLUSTERED | `UserId` |  |
