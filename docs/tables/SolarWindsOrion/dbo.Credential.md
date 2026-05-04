# Table: `dbo.Credential`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(256) | NO |  |  |
| 3 | `Description` | nvarchar(1024) | YES |  |  |
| 4 | `CredentialType` | varchar(1024) | NO |  |  |
| 5 | `CredentialOwner` | varchar(24) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
