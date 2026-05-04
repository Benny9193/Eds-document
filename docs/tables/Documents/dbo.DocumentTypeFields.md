# Table: `dbo.DocumentTypeFields`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 132

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 3 | `FieldId` | uniqueidentifier | NO |  |  |
| 4 | `Sequence` | int | YES |  |  |
| 5 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentTypeFields_DocumentTypes` | `DocumentTypeId` | [`dbo.DocumentTypes.Id`](dbo.DocumentTypes.md) | NO_ACTION | NO_ACTION |
| `FK_DocumentTypeFields_Fields` | `FieldId` | [`dbo.Fields.Id`](dbo.Fields.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_FieldDocumentType_` | no | NONCLUSTERED | `FieldId`, `DocumentTypeId`, `Sequence` | `deletedAt`, `Id` |
