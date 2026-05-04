# Table: `dbo.ReportFilterWorkQueueArrivalMatch`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportFilterWorkQueueArrivalId` | uniqueidentifier | NO |  |  |
| 3 | `MatchType` | nvarchar(50) | NO | `('')` |  |
| 4 | `MatchValue` | nvarchar(560) | NO | `('')` |  |
| 5 | `MatchValue2` | nvarchar(560) | YES | `('')` |  |
| 6 | `ItemOrder` | int | NO | `((1))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterWorkQueueArrivalMatch_ReportFilterWorkQueueArrival` | `ReportFilterWorkQueueArrivalId` | [`dbo.ReportFilterWorkQueueArrival.Id`](dbo.ReportFilterWorkQueueArrival.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterWorkQueueArrivalMatch_ReportFilterWorkQueueArrivalId` | no | NONCLUSTERED | `ReportFilterWorkQueueArrivalId` |  |
