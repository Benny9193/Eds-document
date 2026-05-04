# Table: `EDSIQWebUser.cxml_ship_notice_items`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | int | NO |  | YES |
| 2 | `ship_notice_id` | int | NO |  |  |
| 3 | `po_detail_id` | int | YES |  |  |
| 4 | `line_number` | int | NO |  |  |
| 5 | `quantity` | decimal(18,4) | NO |  |  |
| 6 | `unit_of_measure` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_cxml_ship_notice_items_ship_notice` | `ship_notice_id` | [`EDSIQWebUser.cxml_ship_notices.id`](EDSIQWebUser.cxml_ship_notices.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_cxml_ship_notice_items_ship_notice_id` | no | NONCLUSTERED | `ship_notice_id` |  |
