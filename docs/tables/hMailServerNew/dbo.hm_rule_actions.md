# Table: `dbo.hm_rule_actions`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `actionid` | int | NO |  | YES |
| 2 | `actionruleid` | int | NO |  |  |
| 3 | `actiontype` | tinyint | NO |  |  |
| 4 | `actionimapfolder` | nvarchar(255) | NO |  |  |
| 5 | `actionsubject` | nvarchar(255) | NO |  |  |
| 6 | `actionfromname` | nvarchar(255) | NO |  |  |
| 7 | `actionfromaddress` | nvarchar(255) | NO |  |  |
| 8 | `actionto` | nvarchar(255) | NO |  |  |
| 9 | `actionbody` | ntext(1073741823) | NO |  |  |
| 10 | `actionfilename` | nvarchar(255) | NO |  |  |
| 11 | `actionsortorder` | int | NO |  |  |
| 12 | `actionscriptfunction` | nvarchar(255) | NO |  |  |
| 13 | `actionheader` | nvarchar(80) | NO |  |  |
| 14 | `actionvalue` | nvarchar(255) | NO |  |  |
| 15 | `actionrouteid` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_rule_actions` | no | CLUSTERED | `actionruleid` |  |
