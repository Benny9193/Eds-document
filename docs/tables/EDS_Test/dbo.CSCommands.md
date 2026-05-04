# Table: `dbo.CSCommands`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CSCommandId` | int | NO |  | YES |
| 2 | `ShortDesc` | varchar(50) | NO |  |  |
| 3 | `FullDescription` | varchar(1024) | YES |  |  |
| 4 | `Command` | varchar(255) | NO |  |  |
| 5 | `Target` | varchar(255) | YES |  |  |
| 6 | `SecurityRoleId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
