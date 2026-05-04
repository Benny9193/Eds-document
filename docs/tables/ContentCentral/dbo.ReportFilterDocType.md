# Table: `dbo.ReportFilterDocType`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `DocTypeId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterDocType_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_ReportFilterDocType_Report` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterDocType_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_ReportFilterDocType_Report_DocType` | YES | NONCLUSTERED | `ReportTemplateId`, `DocTypeId` |  |
| `IX_ReportFilterDocType_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
