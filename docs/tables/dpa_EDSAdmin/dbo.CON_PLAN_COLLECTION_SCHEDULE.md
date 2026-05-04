# Table: `dbo.CON_PLAN_COLLECTION_SCHEDULE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATABASEID` | smallint | NO |  | YES |
| 2 | `FREQUENCY` | smallint | NO |  |  |
| 3 | `BASEHOUR` | smallint | NO |  |  |
| 4 | `NUMSQLS` | smallint | NO |  |  |
| 5 | `LASTRUN` | datetime | YES |  |  |
| 6 | `NEXTRUN` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
