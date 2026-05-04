# Table: `dbo.DocumentField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1276656

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `IndexFieldText` | nvarchar(560) | NO | `('')` |  |
| 4 | `MemoFieldText` | nvarchar(max) | NO | `('')` |  |
| 5 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |
| 6 | `IndexFieldNumeric` | decimal(38,8) | NO | `((0))` |  |
| 7 | `IndexFieldDate` | datetime | NO | `('2000-01-01')` |  |
| 8 | `ModifiedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentField_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |
| `FK_DocumentField_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocumentField_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` | `DocumentId`, `IndexFieldText`, `MemoFieldText` |
| `IX_DocumentField_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `SK_VendorBidDocuments` | no | NONCLUSTERED | `DocTypeFieldId`, `DocumentId` | `Id`, `IndexFieldText` |
