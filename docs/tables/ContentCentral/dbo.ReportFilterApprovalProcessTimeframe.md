# Table: `dbo.ReportFilterApprovalProcessTimeframe`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessTimeframeKey` | nvarchar(50) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterApprovalProcessTimeframe_Report` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ReportFilterApprovalProcessTimeframeMatch`](dbo.ReportFilterApprovalProcessTimeframeMatch.md) | `ReportFilterApprovalProcessTimeframeId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterApprovalProcessTimeframe_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
