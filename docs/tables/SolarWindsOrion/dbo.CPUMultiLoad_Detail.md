# Table: `dbo.CPUMultiLoad_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 254046

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `TimeStampUTC` | datetime | NO |  | YES |
| 3 | `CPUIndex` | smallint | NO |  | YES |
| 4 | `MinLoad` | smallint | NO |  |  |
| 5 | `MaxLoad` | smallint | NO |  |  |
| 6 | `AvgLoad` | smallint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CPUMultiLoad_Detail_CPUIndex` | no | NONCLUSTERED | `CPUIndex` |  |
| `IX_CPUMultiLoad_Detail_TimeStampUTC` | no | NONCLUSTERED | `TimeStampUTC` |  |
