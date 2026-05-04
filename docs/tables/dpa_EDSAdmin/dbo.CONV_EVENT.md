# Table: `dbo.CONV_EVENT`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `SERVER_ID` | bigint | NO |  |  |
| 3 | `ENTITY_ID` | bigint | NO |  | YES |
| 4 | `PARENT_ID` | bigint | YES |  |  |
| 5 | `PARENT_ENTITY_ID` | bigint | YES |  |  |
| 6 | `EVENT_DATE` | datetime | NO |  | YES |
| 7 | `EVENT_DESCRIPTION` | varchar(4000) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
