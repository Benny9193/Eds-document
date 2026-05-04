# Table: `EDSIQWebUser.cxml_order_ack_items`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | int | NO |  | YES |
| 2 | `order_ack_id` | int | NO |  |  |
| 3 | `po_detail_id` | int | YES |  |  |
| 4 | `line_number` | int | NO |  |  |
| 5 | `quantity` | decimal(18,4) | NO |  |  |
| 6 | `unit_price` | decimal(18,4) | YES |  |  |
| 7 | `ship_date` | date | YES |  |  |
| 8 | `status_type` | nvarchar(50) | YES |  |  |
| 9 | `comments` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_cxml_order_ack_items_order_ack` | `order_ack_id` | [`EDSIQWebUser.cxml_order_acks.id`](EDSIQWebUser.cxml_order_acks.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_cxml_order_ack_items_order_ack_id` | no | NONCLUSTERED | `order_ack_id` |  |
