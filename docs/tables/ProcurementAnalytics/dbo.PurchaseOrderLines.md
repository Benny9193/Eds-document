# Table: `dbo.PurchaseOrderLines`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16159

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LineID` | int | NO |  | YES |
| 2 | `POID` | int | NO |  |  |
| 3 | `LineNumber` | int | NO |  |  |
| 4 | `ItemCode` | varchar(30) | YES |  |  |
| 5 | `Description` | nvarchar(300) | YES |  |  |
| 6 | `Category` | nvarchar(100) | YES |  |  |
| 7 | `Quantity` | decimal(12,2) | NO |  |  |
| 8 | `UnitPrice` | decimal(12,4) | NO |  |  |
| 9 | `LineTotal` | decimal(25,6) | YES |  |  |
| 10 | `UnitOfMeasure` | varchar(20) | YES | `('EA')` |  |
| 11 | `ReceivedQty` | decimal(12,2) | YES | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__PurchaseOr__POID__52593CB8` | `POID` | [`dbo.PurchaseOrders.POID`](dbo.PurchaseOrders.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_POLines_ItemCode` | no | NONCLUSTERED | `ItemCode` |  |
| `IX_POLines_POID` | no | NONCLUSTERED | `POID` |  |
| `UQ_POLine` | YES | NONCLUSTERED | `POID`, `LineNumber` |  |
