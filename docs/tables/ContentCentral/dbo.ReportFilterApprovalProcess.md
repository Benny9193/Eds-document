# Table: `dbo.ReportFilterApprovalProcess`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterApprovalProcess_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | CASCADE | CASCADE |
| `FK_ReportFilterApprovalProcess_Report` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterApprovalProcess_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
| `IX_ReportFilterApprovalProcess_Report_ApprovalProcess` | YES | NONCLUSTERED | `ReportTemplateId`, `ApprovalProcessId` |  |
| `IX_ReportFilterApprovalProcess_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
