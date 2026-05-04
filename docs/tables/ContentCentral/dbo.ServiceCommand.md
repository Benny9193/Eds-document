# Table: `dbo.ServiceCommand`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Service` | nvarchar(50) | NO | `('')` |  |
| 3 | `CommandXml` | nvarchar(max) | NO | `('')` |  |
| 4 | `CatalogId` | uniqueidentifier | YES |  |  |
| 5 | `DocumentId` | uniqueidentifier | YES |  |  |
| 6 | `PostScanDocumentId` | uniqueidentifier | YES |  |  |
| 7 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ServiceCommand_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | CASCADE | CASCADE |
| `FK_ServiceCommand_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_ServiceCommand_PostScanDocument` | `PostScanDocumentId` | [`dbo.PostScanDocument.Id`](dbo.PostScanDocument.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ServiceCommand_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `IX_ServiceCommand_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_ServiceCommand_PostScanDocumentId` | no | NONCLUSTERED | `PostScanDocumentId` |  |
