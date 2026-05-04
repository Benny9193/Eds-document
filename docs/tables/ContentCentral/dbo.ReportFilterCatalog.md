# Table: `dbo.ReportFilterCatalog`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `CatalogId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterCatalog_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | CASCADE | CASCADE |
| `FK_ReportFilterCatalog_Report` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterCatalog_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `IX_ReportFilterCatalog_Report_Catalog` | YES | NONCLUSTERED | `ReportTemplateId`, `CatalogId` |  |
| `IX_ReportFilterCatalog_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
