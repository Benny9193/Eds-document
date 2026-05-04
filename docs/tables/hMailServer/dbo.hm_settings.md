# Table: `dbo.hm_settings`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 108

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `settingid` | int | NO |  | YES |
| 2 | `settingname` | nvarchar(30) | NO |  |  |
| 3 | `settingstring` | nvarchar(4000) | NO |  |  |
| 4 | `settinginteger` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `u_settingname` | YES | NONCLUSTERED | `settingname` |  |
