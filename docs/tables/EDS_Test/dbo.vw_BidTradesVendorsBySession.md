# View: `dbo.vw_BidTradesVendorsBySession`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `BidTradeCountyId` | int | NO |  |  |
| 3 | `BidImportId` | int | YES |  |  |
| 4 | `VendorBidComments` | varchar(1024) | NO |  |  |
| 5 | `VendorCountyBidComments` | varchar(4096) | NO |  |  |
| 6 | `BidHeaderId` | int | YES |  |  |
| 7 | `BidCounty` | varchar(50) | NO |  |  |
| 8 | `BidState` | varchar(50) | YES |  |  |
| 9 | `AwardType` | varchar(50) | YES |  |  |
| 10 | `VendorCode` | varchar(16) | NO |  |  |
| 11 | `VendorName` | varchar(50) | YES |  |  |
| 12 | `ContactName` | varchar(150) | NO |  |  |
| 13 | `ContactPhone` | varchar(25) | NO |  |  |
| 14 | `ContactFax` | varchar(20) | NO |  |  |
| 15 | `ContactEmail` | varchar(255) | NO |  |  |
| 16 | `Address1` | varchar(50) | NO |  |  |
| 17 | `Address2` | varchar(50) | NO |  |  |
| 18 | `City` | varchar(50) | NO |  |  |
| 19 | `State` | char(2) | NO |  |  |
| 20 | `Zipcode` | varchar(10) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImportCounties` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `States` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from [vw_BidTradesVendorsBySession] bt where bt.SessionId = 1784488957 and bt.BidHeaderId = 11659 and bt.BidTradeCountyId = 23015764
CREATE     view  [dbo].[vw_BidTradesVendorsBySession] as
select SessionTable.SessionId, BidTradeCounties.BidTradeCountyId, 
       BidImports.BidImportId, isnull(BidImports.Comments,'') VendorBidComments,
       isnull(BidImportCounties.Comments,'') VendorCountyBidComments,
       BidHeaders.BidHeaderId, Counties.Name BidCounty, States.Name BidState,
       TMAwards.AwardType,
       isnull(Vendors.Code,'') VendorCode, coalesce(Vendors.DisplayAs,Vendors.Name,'') VendorName, 
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactName 
                else VendorContacts.FullName
              end,'') ContactName,
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactPhone
                else VendorContacts.Phone
              end,'') ContactPhone,
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactFax
                else VendorContacts.Fax
              end,'') ContactFax,
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactEmail
                else VendorContacts.EMail
              end,'') ContactEmail,
       isnull(VendorContacts.Address1,'') Address1,
       isnull(VendorContacts.Address2,'') Address2,
       isnull(VendorContacts.City,'') City,
       isnull(VendorContacts.State,'') State,
       isnull(VendorContacts.Zipcode,'') Zipcode
  from SessionTable with (nolock)
  join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join States on States.code = District.State
  join Counties on Counties.StateId = States.StateId
               and (   Counties.Name = District.County
                    or Counties.Name = 'Statewide')
  join BidTradeCounties on BidTradeCounties.CountyId = Counties.CountyId
  join BidTrades on BidTrades.BidTradeId = BidTradeCounties.BidTradeId
  join Trades on Trades.TradeId = BidTrades.TradeId
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3, 4)
  join TMAwards on TMAwards.BidHeaderId = BidHeaders.BidHeaderId
               and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
               and TMAwards.Active = 1
  join Vendors on Vendors.VendorId = TMAwards.VendorId
  left outer join BidImports on BidImports.BidImportId = TMAwards.BidImportId
  left outer join BidImportCounties on BidImportCounties.BidImportId = BidImports.BidImportId
                                   and BidImportCounties.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
  outer apply (Select top 1 vc.*
                 from VendorContacts vc
				where vc.VendorId = Vendors.VendorId
				order by case when vc.VendorContactId = BidImports.POVendorContactId then 0 else 1 end, case when vc.POContact = 1 then 0 else 1 end, case when vc.BidContact = 1 then 0 else 1 end, case when isnull(vc.FullName,'') + isnull(vc.Address1,'') = '' then 1 else 0 end, vc.VendorContactId) VendorContacts
/*
  left outer join VendorContacts on VendorContacts.VendorContactId =
    (select Top 1 VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.POContact = 1
      order by vc.VendorContactId) */
 where BidHeaders.Active = 1
```
