# Table: `dbo.hm_fetchaccounts_uids`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `uidid` | int | NO |  | YES |
| 2 | `uidfaid` | int | NO |  |  |
| 3 | `uidvalue` | nvarchar(255) | NO |  |  |
| 4 | `uidtime` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_fetchaccounts_uids` | no | CLUSTERED | `uidfaid` |  |
