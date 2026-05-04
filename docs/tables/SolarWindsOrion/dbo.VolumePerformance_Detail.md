# Table: `dbo.VolumePerformance_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 58727

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `VolumeID` | int | NO |  |  |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `DiskQueueLength` | float | NO | `((0))` |  |
| 5 | `AvgDiskTransfer` | float | NO | `((0))` |  |
| 6 | `DiskReads` | float | NO | `((0))` |  |
| 7 | `DiskWrites` | float | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VolumePerformance_Detail_DateTime` | no | CLUSTERED | `DateTime` |  |
| `IX_VolumePerformance_Detail_VolumeID` | no | NONCLUSTERED | `VolumeID` |  |
