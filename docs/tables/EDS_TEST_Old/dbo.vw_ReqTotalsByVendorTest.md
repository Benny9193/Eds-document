# View: `dbo.vw_ReqTotalsByVendorTest`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 9 | `VendorTotal` | money | YES |  |  |
| 10 | `ItemsTotal` | money | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Vendors` | USER_TABLE |
| `vw_RequisitionShippingCosts` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_ReqTotalsByVendor where RequisitionId = 1949850
--select * from vw_RequisitionShippingCosts where RequisitionId = 1949850


create   view  [dbo].[vw_ReqTotalsByVendorTest] as
select rsc.RequisitionId, coalesce(Vendors.Code,'') VendorCode, rsc.VendorName, rsc.AdditionalHandlingAmount, rsc.FreeHandlingAmount, rsc.FreeHandlingStart, rsc.FreeHandlingEnd, rsc.ShippingCost HandlingAmount, rsc.Extended + rsc.ShippingCost VendorTotal, rsc.Extended ItemsTotal
  from vw_RequisitionShippingCosts rsc
  join Vendors on Vendors.VendorId = rsc.VendorId
/*
select Requisitions.RequisitionId, isnull(Vendors.Code,'0000') VendorCode, ISNULL(Vendors.Name,'') VendorName, isnull(Bids.AdditionalHandlingAmount,0) AdditionalHandlingAmount, isnull(Bids.FreeHandlingAmount,0) FreehandlingAmount, Bids.FreeHandlingStart, Bids.FreeHandlingEnd, case when GETDATE() between Bids.FreeHandlingStart and Bids.FreeHandlingEnd then 0 else case when SUM(isnull(Detail.BidPrice,0) * isnull(Detail.Quantity,0)) >= isnull(Bids.FreeHandlingAmount,0) then 0 else isnull(Bids.AdditionalHandlingAmount,0) end end HandlingAmount, SUM(isnull(Detail.BidPrice,0) * isnull(Detail.Quantity,0)) + case when GETDATE() between Bids.FreeHandlingStart and Bids.FreeHandlingEnd then 0 else case when SUM(isnull(Detail.BidPrice,0) * isnull(Detail.Quantity,0)) >= isnull(Bids.FreeHandlingAmount,0) then 0 else isnull(Bids.AdditionalHandlingAmount,0) end end VendorTotal, SUM(isnull(Detail.BidPrice,0) * isnull(Detail.Quantity,0)) ItemsTotal
  from Requisitions with (nolock)
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
             and isnull(Detail.ItemMustBeBid,0) = 0
  left outer join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
  left outer join Vendors on Vendors.VendorId = case isnull(Detail.VendorId,7691) when 0 then 7691 else ISNULL(Detail.VendorId,7691) end
  left outer join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                      and Bids.VendorId = Vendors.VendorId
                      and Bids.Active = 1
 where isnull(BidHeaders.BidType,2) = 1
    or Detail.AddedFromAddenda is not null
 group by Requisitions.RequisitionId, isnull(Vendors.Code,'0000'), ISNULL(Vendors.Name,''), Bids.AdditionalHandlingAmount, Bids.FreeHandlingAmount, Bids.FreeHandlingEnd, Bids.FreeHandlingStart
union (
select Requisitions.RequisitionId, '0000' VendorCode, 'Addenda Items' VendorName, 0 AdditionalHandlingAmount, 0 FreehandlingAmount, null FreeHandlingStart, null FreeHandlingEnd, 0 HandlingAmount, SUM(isnull(Detail.BidPrice,0) * isnull(Detail.Quantity,0))  VendorTotal, SUM(isnull(Detail.BidPrice,0) * isnull(Detail.Quantity,0)) ItemsTotal
  from Requisitions with (nolock)
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
  left outer join BidHeaders on BidHeaders.BidHeaderId = isnull(Detail.BidHeaderId,0)
 where Detail.AddedFromAddenda is null
   and (isnull(Detail.ItemMustBeBid,0) = 1
        and ISNULL(BidHeaders.BidType,2) = 2)
 group by Requisitions.RequisitionId
)
*/
```
