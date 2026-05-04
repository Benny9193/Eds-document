# Table: `dbo.VoipMetricTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipMetricTypeID` | smallint | NO |  | YES |
| 2 | `Name` | varchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipPathHopOperationHistoryResults`](dbo.VoipPathHopOperationHistoryResults.md) | `VoipMetricTypeID` | `VoipMetricTypeID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipPathHopOperationResults_Daily`](dbo.VoipPathHopOperationResults_Daily.md) | `VoipMetricTypeID` | `VoipMetricTypeID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipPathHopOperationResults_Detail`](dbo.VoipPathHopOperationResults_Detail.md) | `VoipMetricTypeID` | `VoipMetricTypeID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipPathHopOperationResults_Hourly`](dbo.VoipPathHopOperationResults_Hourly.md) | `VoipMetricTypeID` | `VoipMetricTypeID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UI_VoipMetricTypes_Name` | YES | NONCLUSTERED | `Name` |  |
