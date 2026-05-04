# Table: `dbo.PostScanDocumentField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 887

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `PostScanDocumentId` | uniqueidentifier | NO |  |  |
| 3 | `FieldText` | nvarchar(256) | NO | `('')` |  |
| 4 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |
| 5 | `FieldNumeric` | decimal(38,8) | NO | `((0))` |  |
| 6 | `FieldDate` | datetime | NO | `('2000-01-01 00:00:00')` |  |
| 7 | `ModifiedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PostScanDocumentField_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_PostScanDocumentField_PostScanDocument` | `PostScanDocumentId` | [`dbo.PostScanDocument.Id`](dbo.PostScanDocument.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PostScanDocumentField_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_PostScanDocumentField_PostScanDocumentId` | no | NONCLUSTERED | `PostScanDocumentId` |  |
