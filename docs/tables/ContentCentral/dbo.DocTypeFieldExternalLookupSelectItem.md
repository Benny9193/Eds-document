# Table: `dbo.DocTypeFieldExternalLookupSelectItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 21

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeFieldExternalLookupId` | uniqueidentifier | NO |  |  |
| 3 | `DestinationDocTypeFieldId` | uniqueidentifier | NO |  |  |
| 4 | `ExternalValueColumn` | nvarchar(128) | NO | `('')` |  |
| 5 | `ItemOrder` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFieldExternalLookupSelectItem_DocTypeField` | `DestinationDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_DocTypeFieldExternalLookupSelectItem_DocTypeFieldExternalLookup` | `DocTypeFieldExternalLookupId` | [`dbo.DocTypeFieldExternalLookup.Id`](dbo.DocTypeFieldExternalLookup.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeFieldExternalLookupSelectItem_DestinationDocTypeFieldId` | no | NONCLUSTERED | `DestinationDocTypeFieldId` |  |
| `IX_DocTypeFieldExternalLookupSelectItem_DocTypeFieldExternalLookupId` | no | NONCLUSTERED | `DocTypeFieldExternalLookupId` |  |
