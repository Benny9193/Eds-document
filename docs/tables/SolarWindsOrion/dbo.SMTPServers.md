# Table: `dbo.SMTPServers`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SMTPServerID` | int | NO |  | YES |
| 2 | `BackupServerID` | int | YES |  |  |
| 3 | `Address` | nvarchar(255) | NO |  |  |
| 4 | `Port` | int | YES |  |  |
| 5 | `CredentialID` | int | YES |  |  |
| 6 | `IsDefault` | bit | NO |  |  |
| 7 | `EnabledSSL` | bit | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
