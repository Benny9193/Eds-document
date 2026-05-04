# Table: `EDSIQWebUser.cxml_request_log`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | int | NO |  | YES |
| 2 | `vendor_id` | int | YES |  |  |
| 3 | `payload_id` | nvarchar(255) | NO |  |  |
| 4 | `document_type` | nvarchar(50) | NO |  |  |
| 5 | `request_xml` | nvarchar(max) | NO |  |  |
| 6 | `response_xml` | nvarchar(max) | NO |  |  |
| 7 | `status_code` | int | NO |  |  |
| 8 | `created_at` | datetime2 | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_cxml_request_log_created_at` | no | NONCLUSTERED | `created_at` |  |
| `IX_cxml_request_log_payload_id` | no | NONCLUSTERED | `payload_id` |  |
| `IX_cxml_request_log_vendor_id` | no | NONCLUSTERED | `vendor_id` |  |
