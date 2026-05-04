# Lookup: `dbo.ForecastMetrics`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 3 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| Id | EntityType | SourceDataEntityName | Name | DisplayName | UsePeakValues | ThresholdType | Icon | CriticalThresholdSettingID | WarningThresholdSettingID | CapacityThresholdSettingID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Orion.Nodes | Orion.CPULoadAverageByDays | Forecast.Metric.CpuLoad | CPU Load | false | 1 | cpu.png | NetPerfMon-CPULoad-Error | NetPerfMon-CPULoad-Warning | NetPerfMon-Forecast-Capacity |
| 2 | Orion.Nodes | Orion.CPUMemoryAverageUsageByDays | Forecast.Metric.PercentMemoryUsed | Percent Memory Usage | false | 1 | memory.gif | NetPerfMon-PercentMemoryUsed-Error | NetPerfMon-PercentMemoryUsed-Warning | NetPerfMon-Forecast-Capacity |
| 3 | Orion.Volumes | Orion.VolumeAverageUsageByDays | Forecast.Metric.PercentDiskUsed | Percent Disk Usage | false | 0 | volumeutilization.png | NetPerfMon-DiskSpace-Error | NetPerfMon-DiskSpace-Warning | NetPerfMon-Forecast-Capacity |
