# View: `dbo.vw_BidAnalysisDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `PricePlanName` | varchar(278) | NO |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidRequestItemId` | int | NO |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `DistrictName` | varchar(50) | NO |  |  |
| 7 | `ItemCode` | varchar(50) | YES |  |  |
| 8 | `Description` | varchar(1024) | YES |  |  |
| 9 | `UnitCode` | varchar(20) | YES |  |  |
| 10 | `VendorName` | varchar(50) | NO |  |  |
| 11 | `VendorCode` | varchar(16) | NO |  |  |
| 12 | `BidUnits` | varchar(16) | YES |  |  |
| 13 | `BidRequest` | int | YES |  |  |
| 14 | `BidType` | varchar(13) | YES |  |  |
| 15 | `QuantityBid` | int | YES |  |  |
| 16 | `UnitPrice` | decimal(34,13) | YES |  |  |
| 17 | `ExtendedCost` | decimal(38,6) | YES |  |  |
| 18 | `Alternate` | varchar(max) | YES |  |  |
| 19 | `VendorItemCode` | varchar(50) | NO |  |  |
| 20 | `BidRequestStatus` | varchar(50) | NO |  |  |
| 21 | `Status` | varchar(51) | NO |  |  |
| 22 | `ResultsStatus` | int | NO |  |  |
| 23 | `BidResultsId` | int | YES |  |  |
| 24 | `Comments` | varchar(1024) | NO |  |  |
| 25 | `ItemComments` | varchar(1024) | NO |  |  |
| 26 | `PriceVarianceLevel` | decimal(9,5) | YES |  |  |
| 27 | `FirstPrice` | decimal(34,13) | YES |  |  |
| 28 | `FirstPriceBidResultsId` | int | YES |  |  |
| 29 | `SecondPrice` | decimal(34,13) | YES |  |  |
| 30 | `SecondPriceBidResultsId` | int | YES |  |  |
| 31 | `Compliant1st` | int | YES |  |  |
| 32 | `SortKey` | varchar(124) | YES |  |  |
| 33 | `Variance` | decimal(38,6) | YES |  |  |
| 34 | `ItemStatus` | varchar(max) | YES |  |  |
| 35 | `PageNo` | int | YES |  |  |
| 36 | `BidResultsItemsPerUnit` | varchar(50) | YES |  |  |
| 37 | `ItemsItemsPerUnit` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `Items` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `Units` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidDescriptions` | VIEW |
| `vw_ItemDescription` | VIEW |
| `dbo.uf_RemoveTrailingCRs` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidResults`](dbo.vw_BidResults.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_BidAnalysisDetail]
as
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
       end) ItemStatus,
       (select BR.PageNo from BidResults BR with (nolock) where BR.BidResultsId=ss.BidResultsId) PageNo,  -- kjm added 9/19/08
       (select BR.ItemsPerUnit from BidResults BR with (nolock) where BR.BidResultsId=ss.BidResultsId) BidResultsItemsPerUnit,  -- kjm changed name 8/12/09
       (select Items.ItemsPerUnit from BidResults BR with (nolock) join Items on BR.ItemId=Items.ItemId where BR.BidResultsId=ss.BidResultsId) ItemsItemsPerUnit  -- kjm added 8/12/09
from (
select Category.Name CategoryName, 
       isnull(PricePlans.Code,'') + ' - ' + isnull(PricePlans.Description,'') PricePlanName, 
       BidHeaders.BidHeaderId, 
       BidRequestItems.BidRequestItemId, 
       Items.DistrictId, 
       isnull((select Name from District with (nolock) where District.DistrictId = Items.DistrictId),'All Price Plan Districts') DistrictName, 
       Items.ItemCode, 
       -- dbo.uf_ItemDescription(Items.ItemId) Description, -- 08/17/09 kjm - replaced with next line    
       isnull(vw_BidDescriptions.ItemDescription, vw_ItemDescription.Itemdescription) Description,   
       (select Code from Units with (nolock) where Units.UnitId = Items.UnitId) UnitCode, 
       isnull((select Name from Vendors with (nolock) where Vendors.VendorId = BidImports.VendorId),'*** No Bid ***') VendorName, 
       isnull((select Code from Vendors with (nolock) where Vendors.VendorId = BidImports.VendorId),'0000') VendorCode, 
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
       --dbo.uf_RemoveTrailingCRs(BidResults.Alternate) Alternate, -- changed 8/12/09; 9/21/12
       -- Concatenate Manuf/Manuf# and Liner Bid fields (when available) to Alternate  -- added 9/21/12
       Ltrim(dbo.uf_RemoveTrailingCRs(
       case isnull(dbo.uf_RemoveTrailingCRs(BidResults.Alternate),'') when '' then '' else dbo.uf_RemoveTrailingCRs(BidResults.Alternate) + char(13) + char(10) end +
       -- added manuf/manuf# info
       case isnull(BidResults.ManufacturerBid,'') when '' then '' else 'Manufacturer: ' + BidResults.ManufacturerBid + char(13) + char(10) end +
       case isnull(BidResults.ManufPartNoBid,'') when '' then '' else 'Manuf Part#: ' + BidResults.ManufPartNoBid + char(13) + char(10) end +
       -- added liner bid info
       case isnull(BidResults.LinerGaugeMicrons,0) when 0 then '' else 'Liner Gauge (Microns) = ' + cast(BidResults.LinerGaugeMicrons as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerGaugeMil,0) when 0 then '' else 'Liner Gauge (Mils) = ' + cast(BidResults.LinerGaugeMil as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerCaseWeight,0) when 0 then '' else 'Liner Case Weight (Lbs) = ' + cast(BidResults.LinerCaseWeight as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerDimWidth,0) when 0 then '' else 'Liner Width (in.) = ' + cast(BidResults.LinerDimWidth as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerDimDepth,0) when 0 then '' else 'Liner Depth (in.) = ' + cast(BidResults.LinerDimDepth as varchar) + char(13) + char(10) end +
       case isnull(BidResults.LinerDimLength,0) when 0 then '' else 'Liner Length (in.) = ' + cast(BidResults.LinerDimLength as varchar) + char(13) + char(10) end 
       )) Alternate, 
       isnull(BidResults.VendorItemCode,'') VendorItemCode,
       isnull(BidRequestItems.Status,'') BidRequestStatus, 
       isnull(BidResults.Status,'') Status,
       case isnull(BidImports.Active,0) when 0 then 0 else isnull(BidResults.Active,0) end ResultsStatus,
       BidResults.BidResultsId,
       isnull(BidResults.Comments,'') Comments, 
       isnull(BidRequestItems.Comments,'') ItemComments,
       BidHeaders.PriceVarianceLevel,
       (select top 1 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice
          from BidHeaders bh with (nolock)
          join BidRequestItems bri on bri.BidHeaderId = bh.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
          join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S')
                                    and BidResults.Active = 1
         where bh.BidHeaderId = BidHeaders.BidHeaderId
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
          from BidHeaders bh with (nolock)
          join BidRequestItems bri on bri.BidHeaderId = bh.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
          join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S')
                                    and BidResults.Active = 1
         where bh.BidHeaderId = BidHeaders.BidHeaderId
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
              from BidHeaders bh with (nolock)
              join BidRequestItems bri on bri.BidHeaderId = bh.BidHeaderId
                                      and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
              join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
                             and BidImports.Active = 1
              join Vendors on Vendors.VendorId = BidImports.VendorId
              left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                        and BidResults.BidRequestItemId = bri.BidRequestItemId
                                        and isnull(BidResults.ItemBidType,'') in ('C','S')
                                        and BidResults.Active = 1
             where bh.BidHeaderId = BidHeaders.BidHeaderId 
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
                  BidResultsId desc) SecondPrice,
       (select top 1 BidResultsId
          from (
            select top 2 round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) UnitPrice, BidResults.BidResultsId
              from BidHeaders bh with (nolock)
              join BidRequestItems bri on bri.BidHeaderId = bh.BidHeaderId
                                      and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
              join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
                             and BidImports.Active = 1
              join Vendors on Vendors.VendorId = BidImports.VendorId
              left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                        and BidResults.BidRequestItemId = bri.BidRequestItemId
                                        and isnull(BidResults.ItemBidType,'') in ('C','S')
                                        and BidResults.Active = 1
             where bh.BidHeaderId = BidHeaders.BidHeaderId 
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
          from BidHeaders bh with (nolock)
          join BidRequestItems bri on bri.BidHeaderId = bh.BidHeaderId
                                  and bri.BidRequestItemId = BidRequestItems.BidRequestItemId
          join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
                         and BidImports.Active = 1
          join Vendors on Vendors.VendorId = BidImports.VendorId
          left outer join BidResults on BidResults.BidImportId = BidImports.BidImportId
                                    and BidResults.BidRequestItemId = bri.BidRequestItemId
                                    and isnull(BidResults.ItemBidType,'') in ('C','S')
                                    and BidResults.Active = 1
         where bh.BidHeaderId = BidHeaders.BidHeaderId 
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
         isnull(Items.SortSeq,'') + 
         right(replicate('0',18) + CAST(BidRequestItems.BidRequestItemId AS varchar(18)), 18) + -- added 11-11-10 kjm
         case isnull(BidImports.Active,0) 
           when 0 then '1' 
           else '0' 
         end +
         case isnull(BidResults.Active,0) 
           when 0 then '1' 
           else '0' 
         end +
         case isnull(BidResults.ItemBidType,'') 
           when '' then '1' 
           when 'N' then '1' 
           when 'C' then '0' 
           when 'S' then '0' 
           else '1'
         end +
         right(replicate('0',20) + convert(varchar(32),convert(int,round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) * 100)),20) +
         case isnull(BidResults.ItemBidType,'')
           when 'S' then '0'
           when 'C' then '1'
           else '2'
         end +
         right(replicate('0',18) + convert(varchar(18),isnull(BidResults.BidResultsId,0)),18) SortKey
  from BidHeaders with (nolock)
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                      and BidRequestItems.Active = 1
  join Items on Items.ItemId = BidRequestItems.ItemId
  /* added 8/17/09 kjm */
  join vw_ItemDescription on vw_Itemdescription.ItemId = Items.ItemId
  left outer join vw_BidDescriptions on vw_bidDescriptions.BidHeaderId = BidHeaders.BidHeaderId
                                    and vw_BidDescriptions.BidRequestItemId = BidRequestItems.BidRequestItemId
  /* end added code 8/17/09 */
  /* DCH Added first following condition 4/2/2018 */
  left outer join BidResults on BidResults.BidHeaderId = BidHeaders.BidHeaderId
                            and BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                            and isnull(BidResults.ItemBidType,'') in ('C','S','N')
  left outer join BidImports on BidImports.BidImportId = BidResults.BidImportId
                            and isnull(BidImports.VendorId,0) != 0
-- where BidHeaders.BidHeaderId = @pBidHeaderId
) ss
```
