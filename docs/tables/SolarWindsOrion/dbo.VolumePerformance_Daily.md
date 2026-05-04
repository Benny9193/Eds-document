# Table: `dbo.VolumePerformance_Daily`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `VolumeID` | int | NO |  |  |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `AvgDiskQueueLength` | float | NO | `((0))` |  |
| 5 | `MinDiskQueueLength` | float | NO | `((0))` |  |
| 6 | `MaxDiskQueueLength` | float | NO | `((0))` |  |
| 7 | `AvgDiskTransfer` | float | NO | `((0))` |  |
| 8 | `MinDiskTransfer` | float | NO | `((0))` |  |
| 9 | `MaxDiskTransfer` | float | NO | `((0))` |  |
| 10 | `AvgDiskReads` | float | NO | `((0))` |  |
| 11 | `MinDiskReads` | float | NO | `((0))` |  |
| 12 | `MaxDiskReads` | float | NO | `((0))` |  |
| 13 | `AvgDiskWrites` | float | NO | `((0))` |  |
| 14 | `MinDiskWrites` | float | NO | `((0))` |  |
| 15 | `MaxDiskWrites` | float | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VolumePerformance_Daily_DateTime` | no | CLUSTERED | `DateTime` |  |
| `IX_VolumePerformance_Daily_VolumeID` | no | NONCLUSTERED | `VolumeID` |  |
