# Table: `dbo.ReportFilterWorkQueueArrival`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `WorkQueueArrivalKey` | nvarchar(50) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterWorkQueueArrival_Report` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ReportFilterWorkQueueArrivalMatch`](dbo.ReportFilterWorkQueueArrivalMatch.md) | `ReportFilterWorkQueueArrivalId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterWorkQueueArrival_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
