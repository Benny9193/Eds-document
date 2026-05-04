# Table: `dbo.CONSW_EC_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `D` | datetime | NO |  |  |
| 2 | `VDSI` | varchar(100) | NO |  |  |
| 3 | `KEEQ` | bigint | NO |  |  |
| 4 | `ECID` | smallint | YES |  |  |
| 5 | `BLOCKED` | smallint | YES |  |  |
| 6 | `WAITTIME` | bigint | YES |  |  |
| 7 | `WAITRESOURCE` | varchar(750) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONSW_EC_1` | no | NONCLUSTERED | `D` |  |
