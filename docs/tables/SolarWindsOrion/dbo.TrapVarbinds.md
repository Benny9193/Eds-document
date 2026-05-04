# Table: `dbo.TrapVarbinds`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TrapID` | bigint | NO |  | YES |
| 2 | `TrapIndex` | tinyint | NO |  | YES |
| 3 | `OID` | varchar(1000) | NO |  |  |
| 4 | `OIDName` | varchar(100) | NO |  |  |
| 5 | `OIDValue_ANSI` | varchar(1000) | NO | `('')` |  |
| 6 | `OIDValue_Unicode` | nvarchar(1000) | YES |  |  |
| 7 | `OIDValue` | nvarchar(1000) | NO |  |  |
| 8 | `RawValue_ANSI` | varchar(1000) | NO | `('')` |  |
| 9 | `RawValue_Unicode` | nvarchar(1000) | YES |  |  |
| 10 | `RawValue` | nvarchar(1000) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
