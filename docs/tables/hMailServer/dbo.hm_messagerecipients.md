# Table: `dbo.hm_messagerecipients`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `recipientid` | bigint | NO |  | YES |
| 2 | `recipientmessageid` | bigint | NO |  |  |
| 3 | `recipientaddress` | nvarchar(255) | NO |  |  |
| 4 | `recipientlocalaccountid` | int | NO |  |  |
| 5 | `recipientoriginaladdress` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_messagerecipients_recipientmessageid` | no | CLUSTERED | `recipientmessageid` |  |
