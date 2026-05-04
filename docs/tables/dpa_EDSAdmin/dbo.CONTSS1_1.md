# Table: `dbo.CONTSS1_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2944

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `KH` | bigint | NO |  |  |
| 2 | `H` | bigint | NO |  |  |
| 3 | `SORTS` | bigint | YES |  |  |
| 4 | `EXECS` | bigint | YES |  |  |
| 5 | `PARSES` | bigint | YES |  |  |
| 6 | `DREADS` | bigint | YES |  |  |
| 7 | `BGETS` | bigint | YES |  |  |
| 8 | `ROW_COUNT` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONTSS1_1` | no | NONCLUSTERED | `KH` |  |
