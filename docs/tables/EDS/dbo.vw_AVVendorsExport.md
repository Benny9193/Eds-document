# View: `dbo.vw_AVVendorsExport`

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
| 12 | `EMail` | varchar(255) | NO |  |  |
| 13 | `VendorCode` | varchar(16) | NO |  |  |
| 14 | `DistrictVendorCode` | varchar(20) | NO |  |  |
| 15 | `VendorsAccountCode` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImportCounties` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `vw_Vendors` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view [dbo].[vw_AVVendorsExport] as
select Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name VendorName, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name CategoryName, BidHeaders.BidHeaderId, isnull(Bids.VendorBidNumber,'') VendorBidNumber, isnull(BidImports.AdditionalHandlingAmount,0) AdditionalHandlingAmount, isnull(BidImports.FreeHandlingAmount,0) FreeHandlingAmount, isnull(BidImports.CatalogDiscountComments,'') BidComments, 
       isnull(vw_Vendors.EMail,'') EMail,
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
  join BidImports on BidImports.BidImportId = Bids.BidImportId
  join vw_Vendors on vw_Vendors.VendorId = Bids.VendorId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (1,5)
  left outer join DistrictVendor on DistrictVendor.VendorId = Bids.VendorId
                                and DistrictVendor.DistrictId = Budgets.DistrictId
 where Budgets.Active = 1
--   and GETDATE() between Budgets.VisibleFrom and Budgets.VisibleUntil
 group by Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name, BidHeaders.BidHeaderId, isnull(Bids.VendorBidNumber,''), isnull(BidImports.AdditionalHandlingAmount,0), isnull(BidImports.FreeHandlingAmount,0), isnull(BidImports.CatalogDiscountComments,''), isnull(vw_Vendors.EMail,''), isnull(vw_Vendors.Code,''), ISNULL(DistrictVendor.VendorsAccountCode,''), ISNULL(DistrictVendor.Value,'') 
union
select Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name VendorName, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name + ' - ' + isnull(BidTrades.Title,'') CategoryName, BidHeaders.BidHeaderId, isnull(BidImports.VendorBidNumber,'') VendorBidNumber, isnull(BidImports.AdditionalHandlingAmount,0) AdditionalHandlingAmount, isnull(BidImports.FreeHandlingAmount,0) FreeHandlingAmount, isnull(BidImports.CatalogDiscountComments,'') BidComments, 
       isnull(vw_Vendors.EMail,'') EMail,
       isnull(vw_Vendors.Code,'') as VendorCode,
       ISNULL(DistrictVendor.Value,'') DistrictVendorCode,
       ISNULL(DistrictVendor.VendorsAccountCode,'') VendorsAccountCode
  from Budgets
  join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
  join District on District.DistrictId = District.DistrictId   -- Added 12/30/20 by DCH
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
               and Counties.Name = District.County
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
 group by Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name + ' - ' + isnull(BidTrades.Title,''), BidHeaders.BidHeaderId, isnull(BidImports.VendorBidNumber,''), isnull(BidImports.AdditionalHandlingAmount,0), isnull(BidImports.FreeHandlingAmount,0), isnull(BidImports.CatalogDiscountComments,''), isnull(vw_Vendors.EMail,''), isnull(vw_Vendors.Code,''), ISNULL(DistrictVendor.VendorsAccountCode,''), ISNULL(DistrictVendor.Value,'') 
union 
select Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name VendorName, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name CategoryName, BidHeaders.BidHeaderId, isnull(BidImports.VendorBidNumber,'') VendorBidNumber, isnull(BidImports.AdditionalHandlingAmount,0) AdditionalHandlingAmount, isnull(BidImports.FreeHandlingAmount,0) FreeHandlingAmount, isnull(BidImports.CatalogDiscountComments,'') BidComments, 
       isnull(vw_Vendors.EMail,'') EMail,
       isnull(vw_Vendors.Code,'') as VendorCode,
       ISNULL(DistrictVendor.Value,'') DistrictVendorCode,
       ISNULL(DistrictVendor.VendorsAccountCode,'') VendorsAccountCode
  from Budgets
  join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
  join BidHeaders on BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and BidHeaders.Active = 1
                 and BidHeaders.BidType = 1
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                 and BidImports.Active = 1
  join vw_Vendors on vw_Vendors.VendorId = BidImports.VendorId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 4
  left outer join District on District.DistrictId = BidHeaders.HostDistrictId
  left outer join DistrictVendor on DistrictVendor.VendorId = BidImports.VendorId
                                and DistrictVendor.DistrictId = Budgets.DistrictId
 where BidHeaders.Active = 1
 group by Budgets.BudgetId, vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.ContactInfo, Category.CategoryId, Category.Name, BidHeaders.BidHeaderId, isnull(BidImports.VendorBidNumber,''), isnull(BidImports.AdditionalHandlingAmount,0), isnull(BidImports.FreeHandlingAmount,0), isnull(BidImports.CatalogDiscountComments,''), isnull(vw_Vendors.EMail,''), isnull(vw_Vendors.Code,''), ISNULL(DistrictVendor.VendorsAccountCode,''), ISNULL(DistrictVendor.Value,'')
```
