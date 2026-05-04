# View: `dbo.vw_OverrideVendorBidders`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `Active` | int | YES |  |  |
| 3 | `BidResultsId` | int | NO |  |  |
| 4 | `BidPrice` | decimal(34,13) | YES |  |  |
| 5 | `VendorName` | varchar(69) | NO |  |  |
| 6 | `ItemBidType` | varchar(13) | NO |  |  |
| 7 | `VendorItemCode` | varchar(50) | YES |  |  |
| 8 | `Alternate` | varchar(512) | YES |  |  |
| 9 | `VendorDescription` | varchar(1497) | YES |  |  |
| 10 | `PageNumber` | varchar(30) | NO |  |  |
| 11 | `UOM` | varchar(16) | NO |  |  |
| 12 | `Original` | varchar(18) | NO |  |  |
| 13 | `VOMId` | int | YES |  |  |
| 14 | `Comments` | varchar(1024) | NO |  |  |
| 15 | `SortKey` | varchar(16) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImportCatalogList` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_OverrideVendorBidders] as
SELECT Detail.DetailId, BidResults.Active, BidResults.BidResultsId, 
isnull(BidResults.UnitPrice,0) - 
round(isnull(BidResults.UnitPrice,0) * isnull(BidImports.BidItemDiscountRate,0) / 100,2) as BidPrice, 
isnull(Vendors.Name,'') + ' (' + isnull(Vendors.Code,'') + ')' as VendorName,
case isnull(BidResults.ItemBidType,'') when 'S' then 'As Specified' when 'C' then 'Compliant' when 'N' then 'Non-Compliant' else 'Not Specified' end as ItemBidType,
rtrim(isnull(BidResults.VendorItemCode,'')) as VendorItemCode,
rtrim(isnull(BidResults.Alternate,'')) as Alternate,
case when rtrim(isnull(BidResults.Alternate,'')) = '' then '' else rtrim(isnull(BidResults.Alternate,'')) + '<br/>' end + 
case rtrim(isnull(BidResults.ManufacturerBid,'')) when '' then '' else 'Manufacturer Bid: ' + RTRIM(isnull(BidResults.ManufacturerBid,'')) + '<br/>' end +
case RTRIM(isnull(BidResults.ManufPartNoBid,'')) when '' then '' else 'Part Number Bid: ' + rtrim(isnull(BidResults.ManufPartNoBid,'')) + '<br/>' end +
case isnull(BidResults.LinerGaugeMicrons,0) when 0 then '' else 'Liner Gauge (Microns): ' + CAST(BidResults.LinerGaugeMicrons as varchar) + '<br/>' end +
case isnull(BidResults.LinerGaugeMil,0) when 0 then '' else 'Liner Gauge (Mil): ' + CAST(BidResults.LinerGaugeMil as varchar) + '<br/>' end +
case isnull(BidResults.LinerCaseWeight,0) when 0 then '' else 'Liner Case Weight: ' + CAST(BidResults.LinerCaseWeight as varchar) + '<br/>' end +
case isnull(BidResults.LinerDimDepth,0) when 0 then '' else 'Liner Dim Depth: ' + CAST(BidResults.LinerDimDepth as varchar) + '<br/>' end +
case isnull(BidResults.LinerDimLength,0) when 0 then '' else 'Liner Dim Length: ' + CAST(BidResults.LinerDimLength as varchar) + '<br/>' end +
case isnull(BidResults.LinerDimWidth,0) when 0 then '' else 'Liner Dim Width: ' + CAST(BidResults.LinerDimWidth as varchar) + '<br/>' end +
rtrim(isnull(Items.Description,'')) VendorDescription,
isnull(cast(BidResults.PageNo as varchar),ISNULL(Crossrefs.Page,'')) PageNumber,
isnull(BidResults.Units,'') UOM,
case isnull(BidResults.OriginalAwardedItem,0) when 0 then '' else 'Original Selection' end as Original,
BidResults.VOMId, isnull(BidResults.Comments,'') as Comments,
cast(case isnull(BidImports.Active,0) 
  when 0 then 1 
  else 
    case isnull(BidResults.Active,0) 
      when 0 then 1 
      else 0 
    end 
end as CHAR(1)) +
cast(case isnull(BidResults.ItemBidType,'') 
  when 'S' then 0 
  when 'C' then 0 
  else 1 
end as CHAR(1)) +
right(replicate('0',14) + cast(convert(decimal(14,2),(isnull(BidResults.UnitPrice,0) - ((isnull(BidImports.BidItemDiscountRate,0) * isnull(BidResults.UnitPrice,0)) / 100))) as varchar),14) SortKey
FROM Detail
join Requisitions ON Detail.RequisitionId = Requisitions.RequisitionId
join BidRequestItems ON BidRequestItems.ItemId = Detail.ItemId
                    and BidRequestItems.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
               and BidResults.ItemBidType in ('C','S','N')
               and isnull(BidResults.UnitPrice,0) > 0
join BidImports on BidImports.BidImportId = BidResults.BidImportId
join Vendors on Vendors.VendorId = BidImports.VendorId
left outer join CrossRefs on CrossRefs.CrossRefId =
  (select Top 1 xr.CrossRefId
     from BidImportCatalogList bicl with (nolock)
     join CrossRefs xr on xr.CatalogId = bicl.CatalogId
                      and xr.PackedCode = BidResults.PackedVendorItemCode
                      and xr.Active = 1
    where bicl.BidImportId = BidImports.BidImportId
    order by xr.CrossRefId)
left outer join Items on Items.ItemId = CrossRefs.ItemId
```
