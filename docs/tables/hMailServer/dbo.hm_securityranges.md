# Table: `dbo.hm_securityranges`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `rangeid` | int | NO |  | YES |
| 2 | `rangepriorityid` | int | NO |  |  |
| 3 | `rangelowerip1` | bigint | NO |  |  |
| 4 | `rangelowerip2` | bigint | YES |  |  |
| 5 | `rangeupperip1` | bigint | NO |  |  |
| 6 | `rangeupperip2` | bigint | YES |  |  |
| 7 | `rangeoptions` | int | NO |  |  |
| 8 | `rangename` | nvarchar(100) | NO |  |  |
| 9 | `rangeexpires` | tinyint | NO |  |  |
| 10 | `rangeexpirestime` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `u_rangename` | YES | NONCLUSTERED | `rangename` |  |
