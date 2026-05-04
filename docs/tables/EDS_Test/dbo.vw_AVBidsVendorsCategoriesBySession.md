# View: `dbo.vw_AVBidsVendorsCategoriesBySession`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `CategoryType` | int | YES |  |  |
| 5 | `VendorId` | int | NO |  |  |
| 6 | `VendorName` | varchar(50) | YES |  |  |
| 7 | `VendorCode` | varchar(16) | YES |  |  |
| 8 | `BidHeaderId` | int | YES |  |  |
| 9 | `BidAdvertised` | datetime | YES |  |  |
| 10 | `BidAwardDate` | datetime | YES |  |  |
| 11 | `EffectiveFrom` | datetime | YES |  |  |
| 12 | `EffectiveUntil` | datetime | YES |  |  |
| 13 | `BidType` | tinyint | NO |  |  |
| 14 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 15 | `Comments` | varchar(1538) | YES |  |  |
| 16 | `Address1` | varchar(50) | YES |  |  |
| 17 | `Address2` | varchar(50) | YES |  |  |
| 18 | `City` | varchar(50) | YES |  |  |
| 19 | `State` | char(2) | YES |  |  |
| 20 | `Zipcode` | varchar(10) | YES |  |  |
| 21 | `VendorContactFullName` | varchar(150) | YES |  |  |
| 22 | `VendorContactEMail` | varchar(255) | YES |  |  |
| 23 | `VendorContactPhone` | varchar(25) | YES |  |  |
| 24 | `VendorContactFax` | varchar(20) | YES |  |  |
| 25 | `CatalogId` | int | YES |  |  |
| 26 | `BidYears` | varchar(11) | YES |  |  |
| 27 | `BidMessage` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImportCounties` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `bidinfolookup` | VIEW |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_Vendors` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_AVCategoriesBySession`](dbo.vw_AVCategoriesBySession.md) | VIEW |
| [`dbo.vw_AVVendorsBySession`](dbo.vw_AVVendorsBySession.md) | VIEW |

## Definition

```sql
CREATE     view  [dbo].[vw_AVBidsVendorsCategoriesBySession] as
select SessionTable.SessionId, 
       Category.CategoryId, Category.Name CategoryName, Category.Type CategoryType,
       Vendors.VendorId, coalesce(Vendors.DisplayAs,Vendors.Name,'') VendorName, Vendors.Code VendorCode,
       BidHeaders.BidHeaderId, BidHeaders.BidDate BidAdvertised, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, isnull(BidHeaders.BidType,2) BidType,
       Bids.VendorBidNumber, case isnull(rtrim(BidImports.Comments),'') when '' then '' else isnull(rtrim(BidImports.Comments),'') + char(13) + char(10) end + ISNULL(BidImports.CatalogDiscountComments,'') Comments,
       VendorContacts.Address1, VendorContacts.Address2,
       VendorContacts.City, VendorContacts.State, VendorContacts.Zipcode,
       VendorContacts.FullName VendorContactFullName, 
       VendorContacts.Email VendorContactEMail, VendorContacts.Phone VendorContactPhone, VendorContacts.Fax VendorContactFax,
       (select Top 1 Catalog.CatalogId
          from BidsCatalogList with (nolock)
          join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                      and Catalog.Active = 1
         where BidsCatalogList.BidId = Bids.BidId
         order by Catalog.CatalogYear desc, Catalog.CatalogId desc) CatalogId,
       bil.BidYears,
	   coalesce(BidHeaders.BidMessage,'') BidMessage
  from SessionTable with (nolock)
  join District on District.DistrictId = SessionTable.DistrictId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                         and DistrictCategories.Active = 1
  join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
                 and PPCategory.CategoryId = DistrictCategories.CategoryId
  join Category on Category.CategoryId = PPCategory.CategoryId
               and Category.Active = 1
               and Category.Type in (1,4,5)
  join BidHeaders on BidHeaders.CategoryId = Category.CategoryId
                 and BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and GETDATE() between case when SessionTable.ApprovalLevel > 2 then dateadd(month,-6,BidHeaders.EffectiveFrom) else BidHeaders.EffectiveFrom end and case when SessionTable.ApprovalLevel > 2 then dateadd(month,24,BidHeaders.EffectiveUntil) else BidHeaders.EffectiveUntil end
                 and BidHeaders.Active = 1
--                 and BidHeaders.BidType = 1
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidImports on BidImports.BidImportId = Bids.BidImportId
                 and BidImports.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
              and Vendors.VendorId != 7691
  left outer join bidinfolookup bil on bil.BidHeaderKey = BidHeaders.BidHeaderKey
  left outer join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                and VendorContacts.VendorContactId = 
     (select Top 1 vc.VendorContactId
        from VendorContacts vc with (nolock)
       where vc.VendorId = Vendors.VendorId
         and vc.Active = 1
       Order by case 
                  when isnull(BidImports.POVendorContactId,0) = vc.VendorContactId then 0 
                  else 1 
                end, 
                case 
                  when isnull(BidImports.BidVendorContactId,0) = vc.VendorContactId then 0 
                  else 1 
                end, 
                case 
                  when isnull(vc.POContact,0) = 1 then 0 
                  else 1
                end, 
                case 
                  when ISNULL(vc.BidContact,0) = 1 then 0
                  else 1
                end, 
                vc.VendorContactId)
 where BidHeaders.BidType = 1
    or exists(select Detail.DetailId
                from Detail with (nolock)
                join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                            and Budgets.DistrictId = District.DistrictId
                join BidItems on BidItems.BidItemId = Detail.BidItemId
                /*join BidResults on BidResults.ItemId = Detail.ItemId
                               and BidResults.BidImportId = BidImports.BidImportId
                               and BidResults.Active = 1
                               and BidResults.ItemBidType in ('A', 'C', 'S')
                               and BidResults.BidResultsId = BidItems.BidResultsId
                               and BidResults.BidHeaderId = BidHeaders.BidHeaderId*/)
 group by SessionTable.SessionId, 
       Category.CategoryId, Category.Name, Category.Type,
       Vendors.VendorId, coalesce(Vendors.DisplayAs,Vendors.Name,''), Vendors.Code,
       BidHeaders.BidHeaderId, BidHeaders.BidDate, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, isnull(BidHeaders.BidType,2),
       Bids.VendorBidNumber, case isnull(rtrim(BidImports.Comments),'') when '' then '' else isnull(rtrim(BidImports.Comments),'') + char(13) + char(10) end + ISNULL(BidImports.CatalogDiscountComments,''),
       VendorContacts.Address1, VendorContacts.Address2,
       VendorContacts.City, VendorContacts.State, VendorContacts.Zipcode,
       VendorContacts.FullName, 
       VendorContacts.Email, VendorContacts.Phone, VendorContacts.Fax, Bids.BidId, bil.BidYears, coalesce(BidHeaders.BidMessage,'')
union
select SessionTable.SessionId, 
       Category.CategoryId, Category.Name CategoryName, Category.Type CategoryType,
       vw_Vendors.VendorId, vw_Vendors.Name VendorName, vw_Vendors.Code VendorCode,
       BidHeaders.BidHeaderId, BidHeaders.BidDate BidAdvertised, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, isnull(BidHeaders.BidType,2) BidType,
       BidImports.VendorBidNumber, case isnull(rtrim(BidImports.Comments),'') when '' then '' else isnull(rtrim(BidImports.Comments),'') + char(13) + char(10) end + ISNULL(BidImports.CatalogDiscountComments,'') Comments,
       vw_Vendors.Address1, vw_Vendors.Address2,
       vw_Vendors.City, vw_Vendors.State, vw_Vendors.Zipcode,
       vw_Vendors.FullName VendorContactFullName, 
       vw_Vendors.Email VendorContactEMail, vw_Vendors.Phone VendorContactPhone, vw_Vendors.Fax VendorContactFax,
       0 CatalogId,
       bil.BidYears,
	   coalesce(BidHeaders.BidMessage,'') BidMessage
  from SessionTable with (nolock)
  join DistrictPP on DistrictPP.DistrictId = SessionTable.DistrictId
  join District on District.DistrictId = DistrictPP.DistrictId -- Line added 12/30/20 by DCH
  join BidHeaders on BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and BidHeaders.Active = 1
                 and BidHeaders.BidType = 1
				 and GETDATE() between case when SessionTable.ApprovalLevel > 2 then dateadd(month,-6,BidHeaders.EffectiveFrom) else BidHeaders.EffectiveFrom end and case when SessionTable.ApprovalLevel > 2 then dateadd(month,24,BidHeaders.EffectiveUntil) else BidHeaders.EffectiveUntil end
--                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
  join BidImportCounties on BidImportCounties.BidImportId = BidImports.BidImportId
                        and BidImportCounties.Active = 1
  join vw_Vendors on vw_Vendors.VendorId = BidImports.VendorId
  join BidTrades on BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
                       and BidTradeCounties.BidTradeCountyId = BidImportCounties.BidTradeCountyId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
               and Counties.Name = District.County	-- Line added 12/30/20 by DCH
  join TMAwards on TMAwards.BidHeaderId = BidHeaders.BidHeaderId
               and TMAwards.BidImportId = BidImports.BidImportId
               and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
               and TMAwards.VendorId = BidImports.VendorId
               and TMAwards.Active = 1
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 3
  join Trades on Trades.TradeId = BidTrades.TradeId
  left outer join bidinfolookup bil on bil.BidHeaderKey = BidHeaders.BidHeaderKey
  left outer join DistrictVendor on DistrictVendor.VendorId = BidImports.VendorId
                                and DistrictVendor.DistrictId = SessionTable.DistrictId
 where BidHeaders.Active = 1
 group by SessionTable.SessionId, 
       Category.CategoryId, Category.Name, Category.Type,
       vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.Code,
       BidHeaders.BidHeaderId, BidHeaders.BidDate, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, isnull(BidHeaders.BidType,2),
       BidImports.VendorBidNumber, case isnull(rtrim(BidImports.Comments),'') when '' then '' else isnull(rtrim(BidImports.Comments),'') + char(13) + char(10) end + ISNULL(BidImports.CatalogDiscountComments,''),
       vw_Vendors.Address1, vw_Vendors.Address2,
       vw_Vendors.City, vw_Vendors.State, vw_Vendors.Zipcode,
       vw_Vendors.FullName, 
       vw_Vendors.Email, vw_Vendors.Phone, vw_Vendors.Fax,
         bil.BidYears, coalesce(BidHeaders.BidMessage,'')
/*
  join District on District.DistrictId = SessionTable.DistrictId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join BidHeaders on BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and GETDATE() between case when SessionTable.ApprovalLevel > 2 then dateadd(month,-6,BidHeaders.EffectiveFrom) else BidHeaders.EffectiveFrom end and case when SessionTable.ApprovalLevel > 2 then dateadd(month,24,BidHeaders.EffectiveUntil) else BidHeaders.EffectiveUntil end
                 and BidHeaders.Active = 1
--                 and BidHeaders.BidType = 1
--                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
  join BidImportCounties on BidImportCounties.BidImportId = BidImports.BidImportId
                        and BidImportCounties.Active = 1
  join vw_Vendors on vw_Vendors.VendorId = BidImports.VendorId
  join BidTrades on BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
                       and BidTradeCounties.BidTradeCountyId = BidImportCounties.BidTradeCountyId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
  join TMAwards on TMAwards.BidHeaderId = BidHeaders.BidHeaderId
               and TMAwards.BidImportId = BidImports.BidImportId
               and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
               and TMAwards.VendorId = BidImports.VendorId
               and TMAwards.Active = 1
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 3
  join Trades on Trades.TradeId = BidTrades.TradeId
  left outer join DistrictVendor on DistrictVendor.VendorId = BidImports.VendorId
                                and DistrictVendor.DistrictId = District.DistrictId
  left outer join bidinfolookup bil on bil.BidHeaderId = BidHeaders.BidHeaderId
 where BidHeaders.Active = 1
 group by SessionTable.SessionId, 
       Category.CategoryId, Category.Name, 
       vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.Code,
       BidHeaders.BidHeaderId, BidHeaders.BidDate, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, isnull(BidHeaders.BidType,2),
       BidImports.VendorBidNumber, case isnull(rtrim(BidImports.Comments),'') when '' then '' else isnull(rtrim(BidImports.Comments),'') + char(13) + char(10) end + ISNULL(BidImports.CatalogDiscountComments,''),
       vw_Vendors.Address1, vw_Vendors.Address2,
       vw_Vendors.City, vw_Vendors.State, vw_Vendors.Zipcode,
       vw_Vendors.FullName, 
       vw_Vendors.Email, vw_Vendors.Phone, vw_Vendors.Fax, bil.BidYears
*/
/*
union 
select SessionTable.SessionId, 
       Category.CategoryId, Category.Name CategoryName, 
       vw_Vendors.VendorId, vw_Vendors.Name VendorName, vw_Vendors.Code VendorCode,
       BidHeaders.BidHeaderId, BidHeaders.BidDate BidAdvertised, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, isnull(BidHeaders.BidType,2) BidType,
       BidImports.VendorBidNumber, case isnull(rtrim(BidImports.Comments),'') when '' then '' else isnull(rtrim(BidImports.Comments),'') + char(13) + char(10) end + ISNULL(BidImports.CatalogDiscountComments,'') Comments,
       vw_Vendors.Address1, vw_Vendors.Address2,
       vw_Vendors.City, vw_Vendors.State, vw_Vendors.Zipcode,
       vw_Vendors.FullName VendorContactFullName, 
       vw_Vendors.Email VendorContactEMail, vw_Vendors.Phone VendorContactPhone, vw_Vendors.Fax VendorContactFax,
       0 CatalogId,
       bil.BidYears
  from SessionTable with (nolock)
  join DistrictPP on DistrictPP.DistrictId = SessionTable.DistrictId
  join BidHeaders on BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and BidHeaders.Active = 1
                 and BidHeaders.BidType = 1
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                 and BidImports.Active = 1
  join vw_Vendors on vw_Vendors.VendorId = BidImports.VendorId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 4
  left outer join bidinfolookup bil on bil.BidHeaderKey = BidHeaders.BidHeaderKey
  left outer join District on District.DistrictId = BidHeaders.HostDistrictId
  left outer join DistrictVendor on DistrictVendor.VendorId = BidImports.VendorId
                                and DistrictVendor.DistrictId = SessionTable.DistrictId
 where BidHeaders.Active = 1
 group by SessionTable.SessionId, 
       Category.CategoryId, Category.Name, 
       vw_Vendors.VendorId, vw_Vendors.Name, vw_Vendors.Code,
       BidHeaders.BidHeaderId, BidHeaders.BidDate, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, isnull(BidHeaders.BidType,2),
       BidImports.VendorBidNumber, case isnull(rtrim(BidImports.Comments),'') when '' then '' else isnull(rtrim(BidImports.Comments),'') + char(13) + char(10) end + ISNULL(BidImports.CatalogDiscountComments,''),
       vw_Vendors.Address1, vw_Vendors.Address2,
       vw_Vendors.City, vw_Vendors.State, vw_Vendors.Zipcode,
       vw_Vendors.FullName, 
       vw_Vendors.Email, vw_Vendors.Phone, vw_Vendors.Fax, bil.BidYears
*/
```
