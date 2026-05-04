# Table: `dbo.CON_ALERT_LEVEL`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ALERTID` | smallint | NO |  | YES |
| 2 | `LEVELNAME` | varchar(10) | NO |  | YES |
| 3 | `LEVELMIN` | numeric(25,5) | YES |  |  |
| 4 | `LEVELMAX` | numeric(25,5) | YES |  |  |
| 5 | `LEVELVALUE` | varchar(50) | YES |  |  |
| 6 | `CONTACTID` | smallint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
