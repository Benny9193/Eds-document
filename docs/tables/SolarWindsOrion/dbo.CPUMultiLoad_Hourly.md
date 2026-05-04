# Table: `dbo.CPUMultiLoad_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `TimeStampUTC` | datetime | NO |  | YES |
| 3 | `CPUIndex` | smallint | NO |  | YES |
| 4 | `MinLoad` | smallint | YES |  |  |
| 5 | `MaxLoad` | smallint | YES |  |  |
| 6 | `AvgLoad` | smallint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CPUMultiLoad_Hourly_CPUIndex` | no | NONCLUSTERED | `CPUIndex` |  |
| `IX_CPUMultiLoad_Hourly_TimeStampUTC` | no | NONCLUSTERED | `TimeStampUTC` |  |
