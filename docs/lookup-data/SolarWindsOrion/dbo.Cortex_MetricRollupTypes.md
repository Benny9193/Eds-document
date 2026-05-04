# Lookup: `dbo.Cortex_MetricRollupTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 3 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| minutesPerRollup | label | CreateTableScript | NumberOfDaysPerPartition | NumberOfDaysAhead | ReadableViewColumns |
| --- | --- | --- | --- | --- | --- |
| 0 | Detail | IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[@TableNamePrefix_@enddatestr]') AND type in (N'U'))         BEGIN C… | 1 | 7 | *, Value AS AvgValue, Value AS MinValue, Value AS MaxValue, 1 AS Count |
| 60 | Hourly | IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[@TableNamePrefix_@enddatestr]') AND type in (N'U'))         BEGIN C… | 1 | 7 | * |
| 1440 | Daily | IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[@TableNamePrefix_@enddatestr]') AND type in (N'U'))         BEGIN C… | 7 | 8 | * |
