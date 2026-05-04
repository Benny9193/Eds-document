# Table: `dbo.ResetPasswordTracking`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 124824

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserIds` | varchar(255) | NO |  |  |
| 2 | `SchoolId` | int | NO |  |  |
| 3 | `DistrictId` | int | NO |  |  |
| 4 | `Email` | varchar(255) | YES |  |  |
| 5 | `ResetPasswordCode` | varchar(8) | YES |  |  |
| 6 | `Action` | varchar(100) | YES |  |  |
| 7 | `InsertAt` | datetime | YES | `(getdate())` |  |
| 8 | `ErrorMsg` | varchar(max) | YES |  |  |
| 9 | `Description` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ResetPasswordTracking_ResetCode` | no | NONCLUSTERED | `ResetPasswordCode` | `UserIds`, `SchoolId`, `DistrictId`, `Email` |
