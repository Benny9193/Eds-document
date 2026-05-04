# Table: `dbo.CON_PROBLEM_SUMMARY_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3481

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ANALYSISID` | bigint | NO |  | YES |
| 2 | `PROBLEMID` | varchar(100) | NO |  | YES |
| 3 | `CATEGORY` | varchar(50) | NO |  |  |
| 4 | `ALARMLEVEL` | varchar(50) | NO |  |  |
| 5 | `SCORE` | numeric(25,5) | NO |  |  |
| 6 | `ITEM` | varchar(800) | NO |  |  |
| 7 | `SUMMARY` | varchar(2000) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
