# Table: `dbo.AgentManagement_Proxy`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProxyId` | int | NO |  | YES |
| 2 | `ProxyUrl` | nvarchar(255) | NO |  |  |
| 3 | `UseProxyAuthentication` | bit | NO | `((0))` |  |
| 4 | `ProxyCredentialId` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
