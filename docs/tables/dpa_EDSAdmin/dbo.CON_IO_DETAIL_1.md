# Table: `dbo.CON_IO_DETAIL_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3165840

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `D` | datetime | NO |  | YES |
| 2 | `FILEID` | bigint | NO |  | YES |
| 3 | `READ_LATENCY` | int | NO |  |  |
| 4 | `WRITE_LATENCY` | int | NO |  |  |
| 5 | `READ_THROUGHPUT` | numeric(25,5) | NO |  |  |
| 6 | `WRITE_THROUGHPUT` | numeric(25,5) | NO |  |  |
| 7 | `READ_LATENCY_SCORE` | int | NO |  |  |
| 8 | `WRITE_LATENCY_SCORE` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
