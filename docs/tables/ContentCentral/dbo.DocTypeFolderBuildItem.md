# Table: `dbo.DocTypeFolderBuildItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 18

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ItemType` | nvarchar(50) | NO | `('')` |  |
| 3 | `DocTypeFieldId` | uniqueidentifier | YES |  |  |
| 4 | `ItemText` | nvarchar(50) | NO | `('')` |  |
| 5 | `ItemOrder` | int | NO | `((0))` |  |
| 6 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 7 | `NumFieldSubfolderChars` | int | YES | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFolderBuildItem_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_DocTypeFolderBuildItem_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeFolderBuildItem_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_DocTypeFolderBuildItem_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
