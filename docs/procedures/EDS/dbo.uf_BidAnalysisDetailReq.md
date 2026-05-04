# Function: inline table-valued: `dbo.uf_BidAnalysisDetailReq`

_Generated on 2026-05-04T13:04:24.220Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidAnalysisDetailReq` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2004-02-18 22:36:45 |
| Modified | 2013-04-22 11:10:57 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PricePlans` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.uf_DetailItemDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RemoveTrailingCRs` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.BidAnalysisDetailReq` | VIEW |

## Definition

```sql
--select * from dbo.uf_BidAnalysisDetailReq( 1062, 198695) order by SortKey





CREATE                     function [dbo].[uf_BidAnalysisDetailReq](@pBidHeaderId int, @pRequisitionId int)
returns table
as
return(
select *, 
       case isnull(FirstPrice,0) when 0 then 0 else (isnull(SecondPrice,0) / isnull(FirstPrice,0)) end Variance,
       dbo.uf_RemoveTrailingCRs(
       case isnull(BidResultsId,0)
         when 0 then '*** No Bids ***'  + char(13) + char(10)
         else 
           case rtrim(isnull(BidRequestStatus,''))
             when '' then ''
             else isnull(BidRequestStatus,'') + char(13) + char(10)
           end
       end + 
       case Compliant1st
         when 0 then ''
         when 1 then 'Winning Bid Item is Compliant' + char(13) + char(10)
       end +
       case 
         when (isnull(SecondPrice,0) = isnull(FirstPrice,0) and isnull(FirstPriceBidResultsId,0) != isnull(SecondPriceBidResultsId,0)) then 'Winning Bid Price has tie with Next Bid' + char(13) + char(10)
         else ''
       end +
       case 
         when case isnull(FirstPrice,0) when 0 then 0 else (isnull(SecondPrice,0) / isnull(FirstPrice,0)) end > isnull(PriceVarianceLevel,0) then 'Price Variance Exception' + char(13) + char(10)
         else ''
       end +
       case OtherReqs
         when 0 then ''
         else 'This Item is on Multiple Requisitions' + char(13) + char(10)
       end) ItemStatus
from (
select Category.Name CategoryName, 
       isnull(PricePlans.Code,'') + ' - ' + isnull(PricePlans.Description,'') PricePlanName, 
       BidHeaders.BidHeaderId, 
       BidRequestItems.BidRequestItemId, 
       Items.DistrictId, 
       isnull((select Name from District where District.DistrictId = Items.DistrictId),'All Price Plan Districts') DistrictName, 
       Items.ItemCode, 
       dbo.uf_DetailItemDescription(@pRequisitionId, Items.ItemId) Description, 
       (select Code from Units where Units.UnitId = Items.UnitId) UnitCode,
--       Units.Code UnitCode, 
       isnull((select Name from Vendors where Vendors.VendorId = BidImports.VendorId),'*** No Bid ***') VendorName, 
       isnull((select Code from Vendors where Vendors.VendorId = BidImports.VendorId),'0000') VendorCode, 
--       isnull(Vendors.Name,'*** No Bid ***') VendorName, 
--       isnull(Vendors.Code,'0000') VendorCode, 
       BidResults.Units BidUnits, 
       BidResults.QuantityBid BidRequest, 
--       (select sum(Quantity) from Detail where Detail.RequisitionId = @pRequisitionId and Detail.ItemId = BidRequestItems.ItemId)/*BidRequestItems.BidRequest*/ QuantityBid, 
       case isnull(BidResults.ItemBidType,'') 
         when '' then 'Not Bid' 
         when 'C' then 'Compliant' 
         when 'S' then 'As Specified' 
         when 'N' then 'Not Compliant' 
       end BidType, 
       (select sum(Quantity) from Detail where Detail.RequisitionId = @pRequisitionId and Detail.ItemId = BidRequestItems.ItemId)/*BidRequestItems.BidRequest*/ QuantityBid, 
--       BidResults.QuantityBid BidRequest, 
       (round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2)) UnitPrice, 
       (isnull((select sum(Quantity) from Detail where Detail.RequisitionId = @pRequisitionId and Detail.ItemId = BidRequestItems.ItemId)/*BidResults.QuantityBid*/,0) * (round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2))) ExtendedCost, 
       --BidResults.Alternate, -- changed 9/21/12 kjm
       -- Concatenate Manuf/Manuf# and Liner Bid fields (when available) to Alternate  -- added 9/21/12 kjm
       Ltrim(dbo.uf_RemoveTrailingCRs(
       case isnull(dbo.uf_RemoveTrailingCRs(BidResults.Alternate),'') when '' then '' else dbo.uf_RemoveTrailingCRs(BidResults.Alternate) + char(13) + char(10) end +
       -- added manuf/manuf# info
       case isnull(BidResults.ManufacturerBid,'') when '' then '' else 'Manufacturer = ' + BidResults.ManufacturerBid + char(13) + char(10) end +
       case isnull(BidResults.ManufPartNoBid,'') when '' then '' else 'Manufacturer Part Number = ' + BidResults.ManufPartNoBid + char(13) + char(10) end +
       -- added liner bid info
       case isnull(BidResults.LinerGaugeMicrons,0) when 0 then '' else 'Liner Gauge (Microns) = ' + cast(BidResults.LinerGaugeMicrons as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerGaugeMil,0) when 0 then '' else 'Liner Gauge (Mils) = ' + cast(BidResults.LinerGaugeMil as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerCaseWeight,0) when 0 then '' else 'Liner Case Weight (Lbs) = ' + cast(BidResults.LinerCaseWeight as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerDimWidth,0) when 0 then '' else 'Liner Width (in.) = ' + cast(BidResults.LinerDimWidth as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerDimDepth,0) when 0 then '' else 'Liner Depth (in.) = ' + cast(BidResults.LinerDimDepth as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerDimLength,0) when 0 then '' else 'Liner Length (in.) = ' + cast(BidResults.LinerDimLength as varchar) + char(13) + char(10) end 
       )) Alternate, 
       BidResults.VendorItemCode,
       BidRequestItems.Status BidRequestStatus, 
       BidResults.Status, 
       BidResults.BidResultsId,
       BidResults.Comments, 
       BidRequestItems.Comments ItemComments,
       BidHeaders.PriceVarianceLevel,
       (select top 1 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice
          from BidHeaders
          join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
          join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S')
                                    and BidResults.Active = 1

         where BidHeaders.BidHeaderId = @pBidHeaderId
           and bri.Active = 1
         order by case isnull(BidResults.ItemBidType,'') 
            when '' then 1 
            when 'N' then 1 
            when 'C' then 0 
            when 'S' then 0 
          end, 
          round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
          case isnull(BidResults.ItemBidType,'')
            when 'S' then 0
            when 'C' then 1
            else 2
          end,
          BidResults.BidResultsId) FirstPrice,
       (select top 1 BidResults.BidResultsId
          from BidHeaders
          join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
          join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S')
                                    and BidResults.Active = 1
         where BidHeaders.BidHeaderId = @pBidHeaderId
           and bri.Active = 1
         order by case isnull(BidResults.ItemBidType,'') 
            when '' then 1 
            when 'N' then 1 
            when 'C' then 0 
            when 'S' then 0 
          end, 
          round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
          case isnull(BidResults.ItemBidType,'')
            when 'S' then 0
            when 'C' then 1
            else 2
          end,
          BidResults.BidResultsId) FirstPriceBidResultsId,
       (select top 1 UnitPrice
          from (
            select top 2 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice, BidResults.BidResultsId
              from BidHeaders
              join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                      and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
              join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                             and BidImports.Active = 1
              join Vendors on Vendors.VendorId = BidImports.VendorId
              left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                        and BidResults.BidRequestItemId = bri.BidRequestItemId
                                        and isnull(BidResults.ItemBidType,'') in ('C','S')
                                        and BidResults.Active = 1
             where BidHeaders.BidHeaderId = @pBidHeaderId
               and bri.Active = 1
             order by case isnull(BidResults.ItemBidType,'') 
                        when '' then 1 
                        when 'N' then 1 
                        when 'C' then 0 
                        when 'S' then 0 
                      end, 
                      round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
                      case isnull(BidResults.ItemBidType,'')
                        when 'S' then 0
                        when 'C' then 1
                        else 2
                      end,
                      BidResults.BidResultsId) ss
         order by case isnull(BidResults.ItemBidType,'') 
                    when '' then 1 
                    when 'N' then 1 
                    when 'C' then 0 
                    when 'S' then 0 
                  end, 
                  UnitPrice desc, 
                  case isnull(BidResults.ItemBidType,'')
                    when 'S' then 0
                    when 'C' then 1
                    else 2
                  end desc,
                  BidResultsId desc) SecondPrice,
       (select top 1 BidResultsId
          from (
            select top 2 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice, BidResults.BidResultsId
              from BidHeaders
              join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                      and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
              join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                             and BidImports.Active = 1
              join Vendors on Vendors.VendorId = BidImports.VendorId
              left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                        and BidResults.BidRequestItemId = bri.BidRequestItemId
                                        and isnull(BidResults.ItemBidType,'') in ('C','S')
                                        and BidResults.Active = 1
             where BidHeaders.BidHeaderId = @pBidHeaderId
               and bri.Active = 1
             order by case isnull(BidResults.ItemBidType,'') 
                        when '' then 1 
                        when 'N' then 1 
                        when 'C' then 0 
                        when 'S' then 0 
                      end, 
                      round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
                      case isnull(BidResults.ItemBidType,'')
                        when 'S' then 0
                        when 'C' then 1
                        else 2
                      end,
                      BidResults.BidResultsId) ss
         order by case isnull(BidResults.ItemBidType,'') 
                        when '' then 1 
                        when 'N' then 1 
                        when 'C' then 0 
                        when 'S' then 0 
                      end desc,
                  UnitPrice desc,
                  case isnull(BidResults.ItemBidType,'')
                    when 'S' then 0
                    when 'C' then 1
                    else 2
                  end desc,
                  BidResultsId desc) SecondPriceBidResultsId,
       (select top 1 case isnull(BidResults.ItemBidType,'')
                       when 'C' then 1
                       else 0
                     end
          from BidHeaders
          join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
          join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S')
                                    and BidResults.Active = 1
         where BidHeaders.BidHeaderId = @pBidHeaderId
           and bri.Active = 1
         order by case isnull(BidResults.ItemBidType,'') 
                    when '' then 1 
                    when 'N' then 1 
                    when 'C' then 0 
                    when 'S' then 0 
                  end, 
                  round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
                  case isnull(BidResults.ItemBidType,'')
                    when 'S' then 0
                    when 'C' then 1
                    else 2
                  end,
                 BidResults.BidResultsId) Compliant1st,
         isnull((select top 1 bhd.BidHeaderDetailId
                   from BidHeaderDetail bhd
                   join Detail on Detail.DetailId = bhd.DetailId
                              and Detail.RequisitionId != @pRequisitionId
                  where bhd.BidRequestItemId = BidRequestItems.BidRequestItemId
                  order by Detail.DetailId),0) OtherReqs,
         isnull(Items.SortSeq,'') + 
          right(replicate('0',18) + convert(varchar(18),isnull(BidRequestItems.BidRequestItemId,0)),18) +
          case isnull(BidImports.Active,0) 
            when 0 then '1' 
            else '0' 
          end +
          case isnull(BidResults.Active,0) 
            when 0 then '1' 
            else '0' 
          end +
          cast(case isnull(BidResults.ItemBidType,'') 
            when '' then 1 
            when 'N' then 1 
            when 'C' then 0 
            when 'S' then 0 
          end as char(1)) +
          right(replicate('0',20) + convert(varchar(32),convert(int,isnull(round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) * 100,0))),20) +
          case isnull(BidResults.ItemBidType,'')
            when 'S' then '0'
            when 'C' then '1'
            else '2'
          end +
          right(replicate('0',18) + convert(varchar(18),isnull(BidResults.BidResultsId,0)),18) SortKey
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                      and BidRequestItems.Active = 1
  join Items on Items.ItemId = BidRequestItems.ItemId
--  join Units on Units.UnitId = Items.UnitId
  join (
    select BidRequestItems.BidRequestItemId
      from BidRequestItems
      join BidHeaderDetail on BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
--      join Detail on Detail.ItemId = BidRequestItems.ItemId
                 and Detail.RequisitionId = @pRequisitionId
     where BidRequestItems.BidHeaderId = @pBidHeaderId
       and BidRequestItems.Active = 1
        ) s4 on s4.BidRequestItemId = BidRequestItems.BidRequestItemId
  left outer join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                            and isnull(BidResults.ItemBidType,'') in ('C','S','N')
  left outer join BidImports on BidImports.BidImportId = BidResults.BidImportId
                            and isnull(BidImports.VendorId,7691) != 0
--  join Vendors on Vendors.VendorId = isnull(BidImports.VendorId,7691)
--  left outer join District on District.DistrictId = Items.DistrictId
 where BidHeaders.BidHeaderId = @pBidHeaderId
-- group by Category.Name, PricePlans.Code, PricePlans.Description, BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, Items.DistrictId, isnull(District.Name,'All Price Plan Districts'), Items.ItemCode, Items.Description, Units.Code, isnull(Vendors.Name,'*** No Bid ***'), isnull(Vendors.Code,'0000'), BidResults.Units, BidRequestItems.BidRequest, isnull(BidResults.ItemBidType,''), BidResults.QuantityBid, isnull(BidResults.UnitPrice,0), isnull(BidResults.Cost,0), BidResults.Alternate, BidResults.VendorItemCode, BidResults.Status, BidResults.BidResultsId, BidRequestItems.Status, BidResults.Comments, BidRequestItems.Comments, Items.SortSeq, BidHeaders.PriceVarianceLevel, BidResults.UnitPrice
) ss
)
```
