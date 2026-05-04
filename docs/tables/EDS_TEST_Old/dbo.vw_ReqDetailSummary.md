# View: `dbo.vw_ReqDetailSummary`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionNumber` | varchar(24) | NO |  |  |
| 2 | `DateEntered` | datetime | NO |  |  |
| 3 | `TotalRequisitionCost` | money | NO |  |  |
| 4 | `TotalItemsCost` | money | NO |  |  |
| 5 | `ShippingCost` | money | NO |  |  |
| 6 | `CategoryName` | varchar(50) | NO |  |  |
| 7 | `AccountCode` | varchar(50) | NO |  |  |
| 8 | `BudgetName` | varchar(30) | NO |  |  |
| 9 | `BidHeaderId` | int | NO |  |  |
| 10 | `BidMsg` | varchar(583) | YES |  |  |
| 11 | `FreeHandlingStart` | datetime | NO |  |  |
| 12 | `FreeHandlingEnd` | datetime | NO |  |  |
| 13 | `FreeHandlingAmount` | money | NO |  |  |
| 14 | `HandlingAmount` | money | NO |  |  |
| 15 | `RequisitionId` | int | NO |  |  |
| 16 | `VendorId` | int | NO |  |  |
| 17 | `VendorCode` | varchar(16) | NO |  |  |
| 18 | `VendorName` | varchar(50) | NO |  |  |
| 19 | `VendorBidNumber` | varchar(50) | NO |  |  |
| 20 | `DistrictVendorCode` | varchar(20) | NO |  |  |
| 21 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 22 | `FullDistrictInfo` | varchar(420) | NO |  |  |
| 23 | `FullShipToInfo` | varchar(315) | YES |  |  |
| 24 | `Lines` | int | YES |  |  |
| 25 | `TotalQuantity` | int | YES |  |  |
| 26 | `TotalBidCost` | decimal(38,4) | YES |  |  |
| 27 | `BidsThisVendor` | int | NO |  |  |
| 28 | `SortVendorKey` | varchar(51) | YES |  |  |
| 29 | `AdditionalShippingItems` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Detail` | USER_TABLE |
| `vw_ReqDetailPrint` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_ReqDetailSummary] as
SELECT
     RequisitionNumber,
     DateEntered,
     TotalRequisitionCost,
     TotalItemsCost,
     ShippingCost,
     CategoryName,
     AccountCode,
     BudgetName,
     BidHeaderId,
     BidMsg,
     FreeHandlingStart,
     FreeHandlingEnd,
     FreeHandlingAmount,
     HandlingAmount,
     RequisitionId,
     VendorId,
     VendorCode,
     VendorName,
     VendorBidNumber,
     DistrictVendorCode,
     VendorsAccountCode,
     FullDistrictInfo,
     FullShipToInfo,
     count(*) Lines,
     sum(Quantity) TotalQuantity,
     sum(ExtendedBidPrice) TotalBidCost,
     BidsThisVendor,
     SortVendorKey,
	 (select count(*) from Detail where Detail.RequisitionId = vw_ReqDetailPrint.RequisitionId and Detail.AdditionalShipping = 1 and Detail.VendorId = vw_ReqDetailPrint.VendorId) AdditionalShippingItems
FROM
     "vw_ReqDetailPrint" vw_ReqDetailPrint
GROUP BY
     RequisitionNumber,
     DateEntered,
     TotalRequisitionCost,
     TotalItemsCost,
     ShippingCost,
     CategoryName,
     AccountCode,
     BudgetName,
     BidHeaderId,
     BidMsg,
     FreeHandlingStart,
     FreeHandlingEnd,
     FreeHandlingAmount,
     HandlingAmount,
     RequisitionId,
     VendorId,
     VendorCode,
     VendorName,
     VendorBidNumber,
     DistrictVendorCode,
     VendorsAccountCode,
     FullDistrictInfo,
     FullShipToInfo,
     BidsThisVendor,
     SortVendorKey
```
