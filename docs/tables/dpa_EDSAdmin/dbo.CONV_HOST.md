# Table: `dbo.CONV_HOST`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `NAME` | varchar(200) | NO |  |  |
| 3 | `MOBJ_ID` | varchar(50) | NO |  |  |
| 4 | `UUID` | varchar(100) | NO |  |  |
| 5 | `SERVER_ID` | smallint | NO |  |  |
| 6 | `DATACENTER_ID` | bigint | NO |  |  |
| 7 | `CLUSTER_ID` | bigint | YES |  |  |
| 8 | `MONITOR` | char(1) | NO |  |  |
| 9 | `LRCLEAN` | datetime | YES |  |  |
| 10 | `VISIBLE` | char(1) | NO | `('Y')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
