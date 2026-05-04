# Table: `dbo.SSOLoginTracking`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 119735

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SSOProvider` | varchar(50) | NO |  |  |
| 2 | `Email` | varchar(255) | YES |  |  |
| 3 | `Action` | varchar(100) | YES |  |  |
| 4 | `InsertAt` | datetime | YES | `(getdate())` |  |
| 5 | `ErrorMsg` | varchar(255) | YES |  |  |
| 6 | `Description` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SSOLoginTracking_ResetCode` | no | NONCLUSTERED | `Email`, `SSOProvider`, `Action` |  |
