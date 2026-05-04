# Table: `dbo.ShadowNodes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeId` | int | NO |  | YES |
| 2 | `IPAddress` | nvarchar(50) | YES |  |  |
| 3 | `NodeName` | nvarchar(255) | YES |  |  |
| 4 | `MACAddress` | varchar(50) | NO |  |  |
| 5 | `IPAddressGUID` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
