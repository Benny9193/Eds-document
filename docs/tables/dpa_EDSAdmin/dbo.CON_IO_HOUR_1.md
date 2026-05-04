# Table: `dbo.CON_IO_HOUR_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 190328

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
| 9 | `HOUR_OF_DAY` | tinyint | NO |  |  |
| 10 | `DAY_OF_WEEK` | tinyint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_IO_HOUR_1` | no | NONCLUSTERED | `FILEID`, `HOUR_OF_DAY` |  |
