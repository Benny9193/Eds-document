# Table: `dbo.Websites`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebsiteID` | int | NO |  | YES |
| 2 | `ServerName` | nvarchar(50) | NO |  |  |
| 3 | `IPAddress` | nvarchar(512) | NO |  |  |
| 4 | `Port` | int | NO |  |  |
| 5 | `SSLEnabled` | int | NO |  |  |
| 6 | `Type` | nvarchar(50) | NO |  |  |
| 7 | `FQDN` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
