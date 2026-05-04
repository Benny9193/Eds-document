# Table: `dbo.VPOLoginAttempts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VPOLoginAttemptId` | int | NO |  | YES |
| 2 | `VPOUserCode` | varchar(50) | NO |  |  |
| 3 | `VPORegistrationId` | int | YES |  |  |
| 4 | `VPOEventDate` | datetime | NO | `(getdate())` |  |
| 5 | `IPAddress` | varchar(50) | YES |  |  |
| 6 | `LoginStatus` | int | NO | `((2))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
