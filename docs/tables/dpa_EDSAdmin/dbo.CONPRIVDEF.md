# Table: `dbo.CONPRIVDEF`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `DESCR` | varchar(100) | YES |  |  |
| 3 | `CATEGORY` | char(1) | NO |  |  |
| 4 | `SORTORDER` | bigint | YES |  |  |
| 5 | `READONLYPRIV` | char(1) | NO | `('N')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
