# View: `dbo.vw_ReqDetail-removed 12082010`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `ItemCode` | varchar(50) | NO |  |  |
| 4 | `Quantity` | int | NO |  |  |
| 5 | `LastYearsQuantity` | int | NO |  |  |
| 6 | `Description` | varchar(3650) | YES |  |  |
| 7 | `UnitCode` | varchar(20) | NO |  |  |
| 8 | `BidPrice` | money | NO |  |  |
| 9 | `Extended` | money | NO |  |  |
| 10 | `SessionId` | int | NO |  |  |
| 11 | `VendorName` | varchar(50) | NO |  |  |
| 12 | `VendorCode` | varchar(16) | NO |  |  |
| 13 | `CatalogName` | varchar(50) | NO |  |  |
| 14 | `AltDescription` | varchar(1024) | NO |  |  |
| 15 | `VendorItemCode` | varchar(50) | NO |  |  |
| 16 | `CatalogPage` | char(4) | YES |  |  |
| 17 | `NoBid` | int | NO |  |  |
| 18 | `ItemMustBeBid` | int | NO |  |  |
| 19 | `BidInfo` | varchar(51) | YES |  |  |
| 20 | `HasBeenBid` | int | NO |  |  |
| 21 | `AllowOverride` | int | NO |  |  |
| 22 | `VendorOverridden` | int | NO |  |  |
| 23 | `ItemBidType` | varchar(32) | YES |  |  |
| 24 | `SortSeq` | varchar(64) | YES |  |  |
| 25 | `RequisitionId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_DetailDescription` | VIEW |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ReqDetail-removed 12082010] as
SELECT Detail.DetailId as DetailId,Detail.ItemId as ItemId,
       case isnull(Detail.ItemMustBeBid,0)
         when 1 then isnull(Detail.ItemCode,'')
         else
           case isnull(Detail.BidItemId,0)
             when 0 then
               case isnull(Detail.VendorId,7691)
                 when 7691 then isnull(Detail.ItemCode,'')
                 else isnull(Detail.VendorItemCode,'')
               end
             else ISNULL(Detail.ItemCode,'')
           end
       end ItemCode,
       ISNULL(Detail.Quantity,0) as Quantity,
       ISNULL(Detail.LastYearsQuantity,0) as LastYearsQuantity,
       case isnull(Detail.ItemId,0) 
         when 0 then Detail.Description 
         else vw_DetailDescription.ItemDescription 
       end as Description,
       ISNULL(Detail.UnitCode,'') as UnitCode,
       ISNULL(Detail.BidPrice,0) as BidPrice,
       ISNULL((Detail.BidPrice * Detail.Quantity),0) as Extended,
       isnull(Detail.SessionId,0) SessionId,
       case isnull(Detail.ItemMustBeBid,0) 
         when 0 then ISNULL(Vendors.Name,'') 
         else 'Item Not Bid' 
       end as VendorName,
       ISNULL(Vendors.Code,'0000') VendorCode,
       isnull(Catalog.Name,ISNULL((select Catalog.Name 
                                     from Awards with (nolock) 
                                     join Catalog on Catalog.CatalogId = Awards.CatalogId 
                                    where Awards.AwardId = Detail.AwardId),'')) as CatalogName,
       ISNULL(Detail.Alternate,'') as AltDescription,
       isnull(Detail.VendorItemCode,'') VendorItemCode,
/*>>*/     case isnull((select Top 1 CrossRefs.Page 
                      from Awards with (nolock) 
                      join Catalog on Catalog.CatalogId = Awards.CatalogId 
                      join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId 
                                    and CrossRefs.ItemId = Detail.ItemId 
                                    and Crossrefs.Active = 1 
                     where Awards.AwardId = Detail.AwardId 
                     order by Catalog.CatalogYear desc, Catalog.CatalogId, CrossRefs.Page, CrossRefs.CrossRefId),'') 
         when '' then Detail.CatalogPage 
         else (select Top 1 CrossRefs.Page 
                 from Awards with (nolock) 
                 join Catalog on Catalog.CatalogId = Awards.CatalogId 
                 join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId 
                               and CrossRefs.ItemId = Detail.ItemId 
                               and Crossrefs.Active = 1 
                where Awards.AwardId = Detail.AwardId 
                order by Catalog.CatalogYear desc, Catalog.CatalogId, CrossRefs.Page, CrossRefs.CrossRefId) 
       end CatalogPage,        
       case isnull(Detail.ItemMustBeBid,0)
         when 1 then 0
         else
           case ISNULL(Vendors.Code,'0000')
             WHEN '0000' THEN 1
             else 0
           end
       end NoBid,
       isnull(Detail.ItemMustBeBid,0) ItemMustBeBid,
       case isnull(BidHeaders.BidHeaderId,0) 
         when 0 then 'Default' 
         else 
           convert(varchar(16),BidHeaders.BidHeaderId) + ' - ' + convert(varchar(32),BidHeaders.BidAwardDate,101) 
       end BidInfo,
       isnull((select top 1 1 
                 from BidRequestItems Bri with (nolock)
                 join BidHeaders bh on bh.BidHeaderId = Bri.BidHeaderId
                                   and bh.Active = 1
                                   and (getdate() between bh.EffectiveFrom and bh.EffectiveUntil 
                                        or (bh.EffectiveFrom is null 
                                            and getdate() between bh.BidDate and dateadd(month,6,bh.BidDate)))
                where Bri.ItemId = Detail.ItemId
                  and Bri.Active = 1),0) HasBeenBid,
       case isnull(Items.DistrictId,0)
         when 0 then 0
         else
           case isnull(Detail.ItemMustBeBid,0)
             when 0 then
               case isnull(bh.BidType,1)
                 when 2 then 1
                 else 0
               end
             else 1
           end
       end as AllowOverride,
       case isnull((select top 1 BidResults.OriginalAwardedItem 
                      from BidItems with (nolock)
                      join BidResults on BidResults.BidResultsId = BidItems.BidResultsId 
                     where BidItems.BidItemId = Detail.BidItemId),0)
         when 0 then 1
         else 0
       end VendorOverridden,
       case isnull(BidItems.ItemBidType,'') 
         when '' then 'Catalog Item' 
         else BidItems.ItemBidType 
       end as ItemBidType,
       Items.SortSeq SortSeq,
       Requisitions.RequisitionId
  FROM dbo.Detail  with (nolock)
  join vw_DetailDescription on vw_DetailDescription.DetailId = Detail.DetailId
  join Items on Items.ItemId = Detail.ItemId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
  left outer JOIN Vendors on Vendors.VendorId = case isnull(Detail.ItemMustBeBid,0) when 0 then Detail.VendorId else 0 end
  left outer join BidHeaders on BidHeaders.BidHeaderId = Detail.BidHeaderId
  left outer join BidHeaders bh on bh.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
  left outer join Catalog on Catalog.CatalogId = Detail.CatalogId
```
