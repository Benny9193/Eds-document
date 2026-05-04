# Table: `dbo.CONV_DATASTORE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `NAME` | varchar(200) | NO |  |  |
| 3 | `FILESYSTEM` | varchar(50) | YES |  |  |
| 4 | `URL` | varchar(500) | YES |  |  |
| 5 | `MOBJ_ID` | varchar(500) | NO |  |  |
| 6 | `SERVER_ID` | smallint | NO |  |  |
| 7 | `DATACENTER_ID` | bigint | NO |  |  |
| 8 | `VISIBLE` | char(1) | NO | `('Y')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
