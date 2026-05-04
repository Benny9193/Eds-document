# Table: `dbo.hm_messages`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `messageid` | bigint | NO |  | YES |
| 2 | `messageaccountid` | int | NO |  |  |
| 3 | `messagefolderid` | int | NO |  |  |
| 4 | `messagefilename` | nvarchar(255) | NO |  |  |
| 5 | `messagetype` | tinyint | NO |  |  |
| 6 | `messagefrom` | nvarchar(255) | NO |  |  |
| 7 | `messagesize` | bigint | NO |  |  |
| 8 | `messagecurnooftries` | int | NO |  |  |
| 9 | `messagenexttrytime` | datetime | NO |  |  |
| 10 | `messageflags` | tinyint | NO |  |  |
| 11 | `messagecreatetime` | datetime | NO |  |  |
| 12 | `messagelocked` | tinyint | NO |  |  |
| 13 | `messageuid` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_messages` | no | CLUSTERED | `messageaccountid`, `messagefolderid` |  |
| `idx_hm_messages_type` | no | NONCLUSTERED | `messagetype` |  |
