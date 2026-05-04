# Table: `dbo.hm_logon_failures`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ipaddress1` | bigint | NO |  |  |
| 2 | `ipaddress2` | bigint | YES |  |  |
| 3 | `failuretime` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_logon_failures_failuretime` | no | CLUSTERED | `failuretime` |  |
| `idx_hm_logon_failures_ipaddress` | no | NONCLUSTERED | `ipaddress1`, `ipaddress2` |  |
