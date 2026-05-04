# View: `dbo.vw_ReqTotalsByVendor`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `VendorCode` | varchar(16) | YES |  |  |
| 3 | `VendorName` | varchar(50) | YES |  |  |
| 4 | `AdditionalHandlingAmount` | money | NO |  |  |
| 5 | `FreeHandlingAmount` | money | NO |  |  |
| 6 | `FreeHandlingStart` | datetime | YES |  |  |
| 7 | `FreeHandlingEnd` | datetime | YES |  |  |
| 8 | `HandlingAmount` | money | NO |  |  |
| 9 | `VendorTotal` | decimal(38,2) | YES |  |  |
| 10 | `ItemsTotal` | money | YES |  |  |
| 11 | `POBelowMinimum` | int | NO |  |  |
| 12 | `MinimumPOAmount` | money | NO |  |  |
| 13 | `AdditionalShipping` | tinyint | YES |  |  |
| 14 | `TotalShippingCost` | decimal(38,2) | YES |  |  |
| 15 | `UpdateRequired` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Vendors` | USER_TABLE |
| `vw_RequisitionShippingCosts` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   VIEW [dbo].[vw_ReqTotalsByVendor] AS
SELECT
    rsc.RequisitionId,
    COALESCE(Vendors.Code, '') VendorCode,
    rsc.VendorName,
    rsc.AdditionalHandlingAmount,
    rsc.FreeHandlingAmount,
    rsc.FreeHandlingStart,
    rsc.FreeHandlingEnd,
    rsc.ShippingCost HandlingAmount,
    rsc.Extended + rsc.ShippingCost + rsc.TotalShippingCost VendorTotal,
    rsc.Extended ItemsTotal,
    rsc.POBelowMinimum,
    rsc.MinimumPOAmount,
    rsc.AdditionalShipping,
    rsc.TotalShippingCost,
    rsc.UpdateRequired
FROM vw_RequisitionShippingCosts rsc
JOIN Vendors ON Vendors.VendorId = rsc.VendorId
```
