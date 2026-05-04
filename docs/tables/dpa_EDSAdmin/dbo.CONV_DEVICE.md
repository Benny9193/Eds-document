# Table: `dbo.CONV_DEVICE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `DEVICE_TYPE` | varchar(50) | NO |  |  |
| 3 | `ENTITY_ID` | bigint | YES |  |  |
| 4 | `SERVER_ID` | smallint | NO |  |  |
| 5 | `INSTANCE_NAME` | varchar(500) | NO |  |  |
| 6 | `DISPLAY_NAME` | varchar(500) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
