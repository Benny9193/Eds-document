# Table: `dbo.VolumeUsage_ForecastCoefficients`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 751

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `VolumeID` | int | NO |  |  |
| 3 | `MinDateTime` | datetime | NO |  |  |
| 4 | `MaxDateTime` | datetime | NO |  |  |
| 5 | `Timestamp` | datetime | NO |  |  |
| 6 | `PercentDiskUsedAavg` | real | YES |  |  |
| 7 | `PercentDiskUsedBavg` | real | YES |  |  |
| 8 | `PercentDiskUsedApeak` | real | YES |  |  |
| 9 | `PercentDiskUsedBpeak` | real | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VolumeUsage_FC_VolumeID` | no | CLUSTERED | `VolumeID` |  |
