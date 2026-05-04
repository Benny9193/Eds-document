# Table: `dbo.ReportFilterDocTypeField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterDocTypeField_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |
| `FK_ReportFilterDocTypeField_Report` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ReportFilterDocTypeFieldMatch`](dbo.ReportFilterDocTypeFieldMatch.md) | `ReportFilterDocTypeFieldId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterDocTypeField_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_ReportFilterDocTypeField_Report_DocTypeField` | YES | NONCLUSTERED | `ReportTemplateId`, `DocTypeFieldId` |  |
| `IX_ReportFilterDocTypeField_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
