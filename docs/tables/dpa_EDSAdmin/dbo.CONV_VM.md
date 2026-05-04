# Table: `dbo.CONV_VM`

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
| 5 | `DNS_NAME` | varchar(200) | YES |  |  |
| 6 | `PRIMARY_IP` | varchar(50) | YES |  |  |
| 7 | `SERVER_ID` | smallint | NO |  |  |
| 8 | `DATACENTER_ID` | bigint | NO |  |  |
| 9 | `CONTAINER_ID` | bigint | NO |  |  |
| 10 | `CONTAINER_TYPE` | varchar(10) | NO |  |  |
| 11 | `CURRENT_HOST_ID` | bigint | YES |  |  |
| 12 | `MONITOR` | char(1) | NO |  |  |
| 13 | `LRCLEAN` | datetime | YES |  |  |
| 14 | `VISIBLE` | char(1) | NO | `('Y')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
