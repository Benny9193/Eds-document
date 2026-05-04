# Table: `dbo.ShippingCosts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 945

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ShippingCostId` | int | NO |  | YES |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `RequisitionId` | int | NO |  |  |
| 4 | `ShippingRequestId` | int | YES |  |  |
| 5 | `DateUpdated` | datetime | NO | `(getdate())` |  |
| 6 | `Quantity` | int | YES |  |  |
| 7 | `Cost` | decimal(9,2) | YES |  |  |
| 8 | `UpdatedBy` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_ShippingRequestId` | no | NONCLUSTERED | `ShippingRequestId` |  |
