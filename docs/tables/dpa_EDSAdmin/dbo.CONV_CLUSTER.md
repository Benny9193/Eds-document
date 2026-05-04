# Table: `dbo.CONV_CLUSTER`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `NAME` | varchar(200) | NO |  |  |
| 3 | `MOBJ_ID` | varchar(50) | NO |  |  |
| 4 | `SERVER_ID` | smallint | NO |  |  |
| 5 | `DATACENTER_ID` | bigint | NO |  |  |
| 6 | `MONITOR` | char(1) | NO |  |  |
| 7 | `LRCLEAN` | datetime | YES |  |  |
| 8 | `VISIBLE` | char(1) | NO | `('Y')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
