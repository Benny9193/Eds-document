# Table: `EDSIQWebUser.cxml_ship_notices`

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
| 5 | `shipment_id` | nvarchar(255) | NO |  |  |
| 6 | `notice_date` | datetime2 | NO |  |  |
| 7 | `ship_date` | date | YES |  |  |
| 8 | `delivery_date` | date | YES |  |  |
| 9 | `carrier` | nvarchar(255) | YES |  |  |
| 10 | `tracking_number` | nvarchar(255) | YES |  |  |
| 11 | `raw_xml` | nvarchar(max) | NO |  |  |
| 12 | `received_at` | datetime2 | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`EDSIQWebUser.cxml_ship_notice_items`](EDSIQWebUser.cxml_ship_notice_items.md) | `ship_notice_id` | `id` | CASCADE | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_cxml_ship_notices_payload_id` | no | NONCLUSTERED | `payload_id` |  |
| `IX_cxml_ship_notices_po_id` | no | NONCLUSTERED | `po_id` |  |
| `IX_cxml_ship_notices_shipment_id` | no | NONCLUSTERED | `shipment_id` |  |
| `IX_cxml_ship_notices_vendor_id` | no | NONCLUSTERED | `vendor_id` |  |
