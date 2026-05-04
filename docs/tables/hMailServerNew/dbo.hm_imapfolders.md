# Table: `dbo.hm_imapfolders`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `folderid` | int | NO |  | YES |
| 2 | `folderaccountid` | int | NO |  |  |
| 3 | `folderparentid` | int | NO |  |  |
| 4 | `foldername` | nvarchar(255) | NO |  |  |
| 5 | `folderissubscribed` | tinyint | NO |  |  |
| 6 | `foldercreationtime` | datetime | NO |  |  |
| 7 | `foldercurrentuid` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_imapfolders_folderaccountid` | no | CLUSTERED | `folderaccountid` |  |
| `idx_hm_imapfolders_unique` | YES | NONCLUSTERED | `folderaccountid`, `folderparentid`, `foldername` |  |
