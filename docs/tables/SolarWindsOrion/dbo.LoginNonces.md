# Table: `dbo.LoginNonces`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LoginNonceID` | uniqueidentifier | NO |  | YES |
| 2 | `Expiration` | datetime | NO | `(dateadd(minute,(2),getdate()))` |  |
| 3 | `AccountID` | nvarchar(100) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
