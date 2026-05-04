# Table: `dbo.hm_rules`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ruleid` | int | NO |  | YES |
| 2 | `ruleaccountid` | int | NO |  |  |
| 3 | `rulename` | nvarchar(100) | NO |  |  |
| 4 | `ruleactive` | tinyint | NO |  |  |
| 5 | `ruleuseand` | tinyint | NO |  |  |
| 6 | `rulesortorder` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_rules` | no | CLUSTERED | `ruleaccountid` |  |
