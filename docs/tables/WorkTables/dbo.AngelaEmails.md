# Table: `dbo.AngelaEmails`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 100

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `origin_timestamp_utc` | nvarchar(50) | NO |  |  |
| 2 | `sender_address` | nvarchar(50) | NO |  |  |
| 3 | `recipient_status` | nvarchar(3000) | NO |  |  |
| 4 | `message_subject` | nvarchar(150) | YES |  |  |
| 5 | `total_bytes` | int | NO |  |  |
| 6 | `message_id` | nvarchar(100) | NO |  |  |
| 7 | `network_message_id` | nvarchar(50) | NO |  |  |
| 8 | `original_client_ip` | nvarchar(50) | NO |  |  |
| 9 | `directionality` | nvarchar(50) | NO |  |  |
| 10 | `connector_id` | nvarchar(50) | YES |  |  |
| 11 | `delivery_priority` | nvarchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
