# Table: `dbo.hm_aliases`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `aliasid` | int | NO |  | YES |
| 2 | `aliasdomainid` | int | NO |  |  |
| 3 | `aliasname` | nvarchar(255) | NO |  |  |
| 4 | `aliasvalue` | nvarchar(255) | NO |  |  |
| 5 | `aliasactive` | tinyint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_aliases` | no | CLUSTERED | `aliasdomainid`, `aliasname` |  |
| `u_aliasname` | YES | NONCLUSTERED | `aliasname` |  |
