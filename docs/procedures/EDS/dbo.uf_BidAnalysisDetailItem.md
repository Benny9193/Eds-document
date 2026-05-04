# Function: inline table-valued: `dbo.uf_BidAnalysisDetailItem`

_Generated on 2026-05-04T13:43:18.957Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidAnalysisDetailItem` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2005-01-31 20:53:48 |
| Modified | 2013-08-08 23:34:51 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidRequestItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PricePlans` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_ItemDescription` | VIEW |  |
| `dbo.uf_RemoveTrailingCRs` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_VendorOverride` | SQL_STORED_PROCEDURE |
| `dbo.sp_VendorOverrideLine` | SQL_STORED_PROCEDURE |
| `dbo.sp_VendorOverrideOld` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE     function [dbo].[uf_BidAnalysisDetailItem](@pBidRequestItemId int)
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
         when 2 then 'Winning Bid Item is Non-Compliant' + char(13) + char(10)
       end +
       case isnull(FirstPrice,0) 
         when 0 then ''
         else
           case 
             when (isnull(SecondPrice,0) = isnull(FirstPrice,0) and isnull(FirstPriceBidResultsId,0) != isnull(SecondPriceBidResultsId,0)) then 'Winning Bid Price has tie with Next Bid' + char(13) + char(10)
             else ''
           end
       end +
       case isnull(FirstPrice,0)
         when 0 then ''
         else
           case 
             when (isnull(SecondPrice,0) / isnull(FirstPrice,0)) > isnull(PriceVarianceLevel,0) then 'Price Variance Exception' + char(13) + char(10)
             else ''
           end
       end) ItemStatus
from (
select Category.Name CategoryName, 
       isnull(PricePlans.Code,'') + ' - ' + isnull(PricePlans.Description,'') PricePlanName, 
       BidHeaders.BidHeaderId, 
       BidRequestItems.BidRequestItemId, 
       Items.DistrictId, 
       isnull((select Name from District where District.DistrictId = Items.DistrictId),'All Price Plan Districts') DistrictName, 
       Items.ItemCode, 
       vw_ItemDescription.ItemDescription, 
       (select Code from Units where Units.UnitId = Items.UnitId) UnitCode, 
       isnull((select Name from Vendors where Vendors.VendorId = BidImports.VendorId),'*** No Bid ***') VendorName, 
       isnull((select Code from Vendors where Vendors.VendorId = BidImports.VendorId),'0000') VendorCode, 
       BidResults.Units BidUnits, 
       BidRequestItems.BidRequest, 
       case isnull(BidResults.ItemBidType,'') 
         when '' then 'Not Bid' 
         when 'C' then 'Compliant' 
         when 'S' then 'As Specified' 
         when 'N' then 'Not Compliant' 
       end BidType, 
       BidResults.QuantityBid, 
       (round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2)) UnitPrice, 
       (isnull(BidResults.QuantityBid,0) * (round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2))) ExtendedCost, 
       BidResults.Alternate, 
       BidResults.VendorItemCode,
       BidRequestItems.Status BidRequestStatus, 
       BidResults.Status, 
       case isnull(BidImports.Active,0) when 0 then 0 else isnull(BidResults.Active,0) end ResultsStatus,
       BidResults.BidResultsId,
       BidResults.Comments, 
       BidRequestItems.Comments ItemComments,
       BidHeaders.PriceVarianceLevel,
       (select top 1 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice
          from BidHeaders
          join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
                                  and bri.Active = 1
          join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S','N')
                                    and BidResults.Active = 1
         order by case isnull(BidResults.ItemBidType,'') 
            when '' then 2 
            when 'N' then 1 
            when 'C' then 0 
            when 'S' then 0 
          end, 
          round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
          case isnull(BidResults.ItemBidType,'')
            when 'S' then 0
            when 'C' then 1
            when 'N' then 2
            else 3
          end,
          BidResults.BidResultsId) FirstPrice,
       (select top 1 BidResults.BidResultsId
          from BidHeaders
          join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
                                  and bri.Active = 1
          join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S','N')
                                    and BidResults.Active = 1
         order by case isnull(BidResults.ItemBidType,'') 
            when '' then 2 
            when 'N' then 1 
            when 'C' then 0 
            when 'S' then 0 
          end, 
          round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
          case isnull(BidResults.ItemBidType,'')
            when 'S' then 0
            when 'C' then 1
            when 'N' then 2
            else 3
          end,
          BidResults.BidResultsId) FirstPriceBidResultsId,
       (select top 1 UnitPrice
          from (
            select top 2 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice, BidResults.BidResultsId
              from BidHeaders
              join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                      and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
                                      and bri.Active = 1
              join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                             and BidImports.Active = 1
              join Vendors on Vendors.VendorId = BidImports.VendorId
              left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                        and BidResults.BidRequestItemId = bri.BidRequestItemId
                                        and isnull(BidResults.ItemBidType,'') in ('C','S','N')
                                        and BidResults.Active = 1
             order by case isnull(BidResults.ItemBidType,'') 
                        when '' then 2
                        when 'N' then 1 
                        when 'C' then 0 
                        when 'S' then 0 
                      end, 
                      round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
                      case isnull(BidResults.ItemBidType,'')
                        when 'S' then 0
                        when 'C' then 1
                        when 'N' then 2
                        else 3
                      end,
                      BidResults.BidResultsId) ss
         order by case isnull(BidResults.ItemBidType,'') 
                        when '' then 2 
                        when 'N' then 1 
                        when 'C' then 0 
                        when 'S' then 0 
                      end desc,
                  UnitPrice desc,
                  case isnull(BidResults.ItemBidType,'')
                    when 'S' then 0
                    when 'C' then 1
                    when 'N' then 2
                    else 3
                  end desc,
                  BidResultsId desc) SecondPrice,
       (select top 1 BidResultsId
          from (
            select top 2 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice, BidResults.BidResultsId
              from BidHeaders
              join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                      and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
                                      and bri.Active = 1
              join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                             and BidImports.Active = 1
              join Vendors on Vendors.VendorId = BidImports.VendorId
              left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                        and BidResults.BidRequestItemId = bri.BidRequestItemId
                                        and isnull(BidResults.ItemBidType,'') in ('C','S','N')
                                        and BidResults.Active = 1
             order by case isnull(BidResults.ItemBidType,'') 
                        when '' then 2
                        when 'N' then 1 
                        when 'C' then 0 
                        when 'S' then 0 
                      end, 
                      round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
                      case isnull(BidResults.ItemBidType,'')
                        when 'S' then 0
                        when 'C' then 1
                        when 'N' then 2
                        else 3
                      end,
                      BidResults.BidResultsId) ss
         order by case isnull(BidResults.ItemBidType,'') 
                        when '' then 2 
                        when 'N' then 1 
                        when 'C' then 0 
                        when 'S' then 0 
                      end desc,
                  UnitPrice desc,
                  case isnull(BidResults.ItemBidType,'')
                    when 'S' then 0
                    when 'C' then 1
                    when 'N' then 2
                    else 3
                  end desc,
                  BidResultsId desc) SecondPriceBidResultsId,
       (select top 1 case isnull(BidResults.ItemBidType,'')
                       when 'N' then 2
                       when 'C' then 1
                       else 0
                     end
          from BidHeaders
          join BidRequestItems bri on bri.BidHeaderId = BidHeaders.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
                                  and bri.Active = 1
          join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S','N')
                                    and BidResults.Active = 1
         order by case isnull(BidResults.ItemBidType,'') 
                    when '' then 2 
                    when 'N' then 1 
                    when 'C' then 0 
                    when 'S' then 0 
                  end, 
                  round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2),
                  case isnull(BidResults.ItemBidType,'')
                    when 'S' then 0
                    when 'C' then 1
                    when 'N' then 2
                    else 3
                  end,
                  BidResults.BidResultsId) Compliant1st,
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
         case isnull(BidResults.ItemBidType,'') 
           when '' then '2' 
           when 'N' then '1' 
           when 'C' then '0' 
           when 'S' then '0' 
           else '2'
         end +
         right(replicate('0',20) + convert(varchar(32),convert(int,round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) * 100)),20) +
         case isnull(BidResults.ItemBidType,'')
           when 'S' then '0'
           when 'C' then '1'
           when 'N' then '2'
           else '3'
         end +
         right(replicate('0',18) + convert(varchar(18),isnull(BidResults.BidResultsId,0)),18) SortKey
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                      and BidRequestItems.Active = 1
                      and BidRequestItems.BidRequestItemId = @pBidRequestItemId
  join Items on Items.ItemId = BidRequestItems.ItemId
  join vw_ItemDescription on vw_ItemDescription.ItemId = Items.ItemId
  left outer join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                            and isnull(BidResults.ItemBidType,'') in ('C','S','N')
  left outer join BidImports on BidImports.BidImportId = BidResults.BidImportId
                            and isnull(BidImports.VendorId,0) != 0
-- where BidHeaders.BidHeaderId = @pBidHeaderId
) ss
)
```
