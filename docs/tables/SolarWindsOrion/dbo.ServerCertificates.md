# Table: `dbo.ServerCertificates`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ServerCertificateID` | int | NO |  | YES |
| 2 | `ServerCertificate` | varbinary(max) | NO |  |  |
| 3 | `Installed` | datetime | NO |  |  |
| 4 | `Replaced` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
