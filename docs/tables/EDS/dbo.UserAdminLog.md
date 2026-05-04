# Table: `dbo.UserAdminLog`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6466

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `logID` | int | NO |  | YES |
| 2 | `submituserid` | int | NO |  |  |
| 3 | `targetuserid` | int | YES |  |  |
| 4 | `action` | varchar(50) | NO |  |  |
| 5 | `commitString` | nvarchar(max) | YES |  |  |
| 6 | `actionDate` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
