# Table: `dbo.ShippingCosts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1113

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-line shipping cost lookup (~1.1K rows). One row per (`DetailId`, `RequisitionId`) with `Quantity`, `Cost`, `UpdatedBy`, and an optional link to the originating `ShippingRequestId`. Surfaced on POs that need explicit shipping line items.

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
