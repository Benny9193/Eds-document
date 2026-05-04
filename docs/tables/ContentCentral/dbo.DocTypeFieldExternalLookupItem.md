# Table: `dbo.DocTypeFieldExternalLookupItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeFieldExternalLookupId` | uniqueidentifier | NO |  |  |
| 3 | `ExternalColumn` | nvarchar(128) | YES |  |  |
| 4 | `Type` | nvarchar(50) | NO | `('')` |  |
| 5 | `DocTypeFieldId` | uniqueidentifier | YES |  |  |
| 6 | `StaticValue` | nvarchar(256) | YES |  |  |
| 7 | `NewGroup` | int | YES |  |  |
| 8 | `Boolean` | nvarchar(10) | NO | `('')` |  |
| 9 | `Operator` | nvarchar(10) | NO | `('')` |  |
| 10 | `Group` | int | NO | `((0))` |  |
| 11 | `ItemOrder` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFieldExternalLookupItem_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_DocTypeFieldExternalLookupItem_DocTypeFieldExternalLookup` | `DocTypeFieldExternalLookupId` | [`dbo.DocTypeFieldExternalLookup.Id`](dbo.DocTypeFieldExternalLookup.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeFieldExternalLookupItem_DocTypeFieldExternalLookupId` | no | NONCLUSTERED | `DocTypeFieldExternalLookupId` |  |
| `IX_DocTypeFieldExternalLookupItem_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
