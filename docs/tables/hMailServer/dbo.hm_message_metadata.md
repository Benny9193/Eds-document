# Table: `dbo.hm_message_metadata`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `metadata_id` | bigint | NO |  | YES |
| 2 | `metadata_accountid` | int | NO |  |  |
| 3 | `metadata_folderid` | int | NO |  |  |
| 4 | `metadata_messageid` | bigint | NO |  |  |
| 5 | `metadata_dateutc` | datetime | YES |  |  |
| 6 | `metadata_from` | nvarchar(255) | NO |  |  |
| 7 | `metadata_subject` | nvarchar(255) | NO |  |  |
| 8 | `metadata_to` | nvarchar(255) | NO |  |  |
| 9 | `metadata_cc` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `hm_message_metadata_unique` | YES | NONCLUSTERED | `metadata_accountid`, `metadata_folderid`, `metadata_messageid` |  |
| `idx_message_metadata_id` | no | NONCLUSTERED | `metadata_messageid` |  |
