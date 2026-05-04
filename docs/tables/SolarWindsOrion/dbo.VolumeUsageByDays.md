# View: `dbo.VolumeUsageByDays`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `VolumeID` | int | NO |  |  |
| 3 | `DateTime` | datetime | YES |  |  |
| 4 | `DiskSize` | float | YES |  |  |
| 5 | `AvgDiskUsed` | float | YES |  |  |
| 6 | `MinDiskUsed` | float | YES |  |  |
| 7 | `MaxDiskUsed` | float | YES |  |  |
| 8 | `PercentDiskUsed` | float | YES |  |  |
| 9 | `AllocationFailures` | float | YES |  |  |
| 10 | `Archive` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.DateOnly` | SQL_SCALAR_FUNCTION |
| [`dbo.VolumeUsage`](dbo.VolumeUsage.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VolumeUsageByDays AS
	SELECT	NodeID, VolumeID, dbo.DateOnly(DateTime) AS DateTime, 
			MAX(DiskSize) AS DiskSize, 
			AVG(AvgDiskUsed) AS AvgDiskUsed, 
			MIN(MinDiskUsed) AS MinDiskUsed, 
			MAX(MaxDiskUsed) AS MaxDiskUsed, 
			AVG(PercentDiskUsed) AS PercentDiskUsed, 
			SUM(AllocationFailures) AS AllocationFailures, 
			2 AS Archive
	FROM dbo.VolumeUsage
	GROUP BY NodeID, VolumeID, dbo.DateOnly(DateTime)
```
