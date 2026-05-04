# Table: `EDSIQWebUser.cxml_order_acks`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | int | NO |  | YES |
| 2 | `vendor_id` | int | NO |  |  |
| 3 | `po_id` | int | YES |  |  |
| 4 | `payload_id` | nvarchar(255) | NO |  |  |
| 5 | `confirmation_type` | nvarchar(50) | NO |  |  |
| 6 | `status_code` | nvarchar(10) | YES |  |  |
| 7 | `status_text` | nvarchar(255) | YES |  |  |
| 8 | `raw_xml` | nvarchar(max) | NO |  |  |
| 9 | `received_at` | datetime2 | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`EDSIQWebUser.cxml_order_ack_items`](EDSIQWebUser.cxml_order_ack_items.md) | `order_ack_id` | `id` | CASCADE | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_cxml_order_acks_payload_id` | no | NONCLUSTERED | `payload_id` |  |
| `IX_cxml_order_acks_po_id` | no | NONCLUSTERED | `po_id` |  |
| `IX_cxml_order_acks_vendor_id` | no | NONCLUSTERED | `vendor_id` |  |
