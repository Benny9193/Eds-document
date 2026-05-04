# View: `dbo.vw_VendorCategoryBids`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorName` | varchar(50) | NO |  |  |
| 4 | `ContactInfo` | varchar(548) | YES |  |  |
| 5 | `CategoryId` | int | NO |  |  |
| 6 | `CategoryName` | varchar(308) | YES |  |  |
| 7 | `BidHeaderId` | int | YES |  |  |
| 8 | `VendorBidNumber` | varchar(50) | NO |  |  |
| 9 | `AdditionalHandlingAmount` | money | NO |  |  |
| 10 | `FreeHandlingAmount` | money | NO |  |  |
| 11 | `BidComments` | varchar(512) | NO |  |  |
| 12 | `CatalogId` | int | YES |  |  |
| 13 | `EMail` | varchar(255) | NO |  |  |
| 14 | `VendorCode` | varchar(16) | NO |  |  |
| 15 | `DistrictVendorCode` | varchar(20) | NO |  |  |
| 16 | `VendorsAccountCode` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImportCatalogList` | USER_TABLE |
| `BidImportCounties` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `vw_Vendors` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_VendorCategoryBids_Cats`](dbo.vw_VendorCategoryBids_Cats.md) | VIEW |
| [`dbo.vw_VendorCategoryBids_Vendors`](dbo.vw_VendorCategoryBids_Vendors.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_VendorCategoryBids] as
select Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name VendorName, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name CategoryName, BidHeaders.BidHeaderId, isnull(Bids.VendorBidNumber,'') VendorBidNumber, isnull(BidImports.AdditionalHandlingAmount,0) AdditionalHandlingAmount, isnull(BidImports.FreeHandlingAmount,0) FreeHandlingAmount, isnull(BidImports.CatalogDiscountComments,'') BidComments, 
       case isnull([Catalog].CatalogId,0) 
         when 0 then 
           case Category.CategoryId 
             when 15 then isnull((select Top 1 Cat.CatalogId 
                                    from [Catalog] cat 
                                   where cat.CategoryId = Category.CategoryId 
                                     and cat.Active = 1 
                                     and cat.Name = 'EDS'),0) 
             else 0 
           end 
         else
           [Catalog].CatalogId          
       end CatalogId, isnull(vw_Vendors.EMail,'') EMail,
       isnull(vw_Vendors.Code,'') as VendorCode,
       ISNULL(DistrictVendor.Value,'') DistrictVendorCode,
       ISNULL(DistrictVendor.VendorsAccountCode,'') VendorsAccountCode
  from Budgets
  join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
  join BidHeaders on BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and BidHeaders.Active = 1
                 and BidHeaders.BidType = 1
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join Awards on Awards.BidId = Bids.BidId
             and Awards.Active = 1
  join BidImports on BidImports.BidImportId = Bids.BidImportId
  join vw_Vendors on vw_Vendors.VendorId = Awards.VendorId
  join Category on Category.CategoryId = BidHeaders.CategoryId
  left outer join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
                                      and BidImportCatalogList.BidImportCatalogId =
    (select Top 1 bicl.BidImportCatalogId
       from BidImportCatalogList bicl with (nolock)
       join Catalog cat on cat.CatalogId = bicl.CatalogId
                       and cat.Active = 1
       join CrossRefs xr on xr.CatalogId = cat.CatalogId
                        and xr.Active = 1
      where bicl.BidImportId = BidImports.BidImportId
      order by cat.CatalogYear desc, cat.CatalogId desc)
  left outer join Catalog on Catalog.CatalogId = BidImportCatalogList.CatalogId
  left outer join DistrictVendor on DistrictVendor.VendorId = Awards.VendorId
                                and DistrictVendor.DistrictId = Budgets.DistrictId
 where Budgets.Active = 1
   and GETDATE() between Budgets.VisibleFrom and Budgets.VisibleUntil
 group by Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name, BidHeaders.BidHeaderId, isnull(Bids.VendorBidNumber,''), isnull(BidImports.AdditionalHandlingAmount,0), isnull(BidImports.FreeHandlingAmount,0), isnull(BidImports.CatalogDiscountComments,''), Catalog.CatalogId, isnull(vw_Vendors.EMail,''), isnull(vw_Vendors.Code,''), ISNULL(DistrictVendor.VendorsAccountCode,''), ISNULL(DistrictVendor.Value,'') 
union
select Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name VendorName, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name + case when isnull(BidTrades.Title,'') = '' then '' else ' - ' + isnull(BidTrades.Title,'') end CategoryName, BidHeaders.BidHeaderId, isnull(BidImports.VendorBidNumber,'') VendorBidNumber, isnull(BidImports.AdditionalHandlingAmount,0) AdditionalHandlingAmount, isnull(BidImports.FreeHandlingAmount,0) FreeHandlingAmount, isnull(BidImports.CatalogDiscountComments,'') BidComments, 
       0 CatalogId, isnull(vw_Vendors.EMail,'') EMail,
       isnull(vw_Vendors.Code,'') as VendorCode,
       ISNULL(DistrictVendor.Value,'') DistrictVendorCode,
       ISNULL(DistrictVendor.VendorsAccountCode,'') VendorsAccountCode
  from Budgets
  join District on District.DistrictId = Budgets.DistrictId
  join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
  join BidHeaders on BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and BidHeaders.Active = 1
                 and BidHeaders.BidType = 1
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
  join BidImportCounties on BidImportCounties.BidImportId = BidImports.BidImportId
                        and BidImportCounties.Active = 1
  join vw_Vendors on vw_Vendors.VendorId = BidImports.VendorId
  join BidTrades on BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
                       and BidTradeCounties.BidTradeCountyId = BidImportCounties.BidTradeCountyId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
               and District.County = Counties.Name
  join TMAwards on TMAwards.BidHeaderId = BidHeaders.BidHeaderId
               and TMAwards.BidImportId = BidImports.BidImportId
               and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
               and TMAwards.VendorId = BidImports.VendorId
               and TMAwards.Active = 1
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 3
  join Trades on Trades.TradeId = BidTrades.TradeId
  left outer join DistrictVendor on DistrictVendor.VendorId = BidImports.VendorId
                                and DistrictVendor.DistrictId = Budgets.DistrictId
 where BidHeaders.Active = 1
 group by Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name, isnull(BidTrades.Title,''), BidHeaders.BidHeaderId, isnull(BidImports.VendorBidNumber,''), isnull(BidImports.AdditionalHandlingAmount,0), isnull(BidImports.FreeHandlingAmount,0), isnull(BidImports.CatalogDiscountComments,''), isnull(vw_Vendors.EMail,''), isnull(vw_Vendors.Code,''), ISNULL(DistrictVendor.VendorsAccountCode,''), ISNULL(DistrictVendor.Value,'')
```
