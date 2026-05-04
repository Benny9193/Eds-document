# Table: `dbo.hm_rule_criterias`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `criteriaid` | int | NO |  | YES |
| 2 | `criteriaruleid` | int | NO |  |  |
| 3 | `criteriausepredefined` | tinyint | NO |  |  |
| 4 | `criteriapredefinedfield` | tinyint | NO |  |  |
| 5 | `criteriaheadername` | nvarchar(255) | NO |  |  |
| 6 | `criteriamatchtype` | tinyint | NO |  |  |
| 7 | `criteriamatchvalue` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_rule_criterias` | no | CLUSTERED | `criteriaruleid` |  |
