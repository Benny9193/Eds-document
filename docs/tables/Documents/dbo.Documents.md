# Table: `dbo.Documents`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 600590

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 3 | `DocumentFileId` | uniqueidentifier | YES |  |  |
| 4 | `PageCount` | int | YES |  |  |
| 5 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.FieldData`](dbo.FieldData.md) | `DocumentId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_DocumentType_` | no | NONCLUSTERED | `deletedAt`, `DocumentTypeId`, `Id` | `PageCount` |
| `SKI_TypeDeleted_IdFileId` | no | NONCLUSTERED | `DocumentTypeId`, `deletedAt` | `Id`, `DocumentFileId` |
