# Table: `dbo.CONST_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 143052

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `H` | bigint | NO |  |  |
| 2 | `P` | bigint | NO |  |  |
| 3 | `ST` | varchar(4000) | YES |  |  |
| 4 | `SS` | int | YES |  |  |
| 5 | `SE` | int | YES |  |  |
| 6 | `PNAME` | varchar(750) | YES |  |  |
| 7 | `LN` | int | YES |  |  |
| 8 | `TRUNCATED` | char(1) | YES |  |  |
| 9 | `D` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONST_1` | no | NONCLUSTERED | `H` |  |
