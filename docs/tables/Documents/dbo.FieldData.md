# Table: `dbo.FieldData`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6412792

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `FieldId` | uniqueidentifier | NO |  |  |
| 4 | `FieldValue` | varchar(max) | YES |  |  |
| 5 | `updatedAt` | datetime | YES | `(getdate())` |  |
| 6 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_FieldData_Documents` | `DocumentId` | [`dbo.Documents.Id`](dbo.Documents.md) | NO_ACTION | NO_ACTION |
| `FK_FieldData_Fields` | `FieldId` | [`dbo.Fields.Id`](dbo.Fields.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `cs_FieldData` | no | NONCLUSTERED COLUMNSTORE |  | `Id`, `DocumentId`, `FieldId`, `updatedAt`, `deletedAt` |
| `SKI_DeletedAT_DocumentFieldValue` | no | NONCLUSTERED | `deletedAt` | `DocumentId`, `FieldId`, `FieldValue` |
| `SKI_DeletedDocumentFieldValue_ID` | no | NONCLUSTERED | `deletedAt`, `DocumentId`, `FieldId` | `Id`, `FieldValue` |
| `SKI_DocumentFieldUpdated` | no | NONCLUSTERED | `DocumentId`, `FieldId`, `deletedAt`, `updatedAt` | `Id`, `FieldValue` |
| `SKI_FieldDeleted_DocumentValue` | no | NONCLUSTERED | `FieldId`, `deletedAt` | `DocumentId`, `FieldValue` |
