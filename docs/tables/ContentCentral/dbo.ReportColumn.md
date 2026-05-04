# Table: `dbo.ReportColumn`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `ItemOrder` | int | NO | `((0))` |  |
| 4 | `Type` | nvarchar(50) | NO | `('')` |  |
| 5 | `HeaderText` | nvarchar(128) | NO | `('')` |  |
| 6 | `DocTypeFieldId` | uniqueidentifier | YES |  |  |
| 7 | `SystemFieldTypeKey` | nvarchar(50) | YES |  |  |
| 8 | `SegmentTypeKey` | nvarchar(50) | YES |  |  |
| 9 | `ReportTypeKey` | nvarchar(50) | YES |  |  |
| 10 | `ApprovalProcessStage` | int | YES |  |  |
| 11 | `DocTypeFieldName` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportColumn_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |
| `FK_ReportColumn_Report` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportColumn_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_ReportColumn_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
