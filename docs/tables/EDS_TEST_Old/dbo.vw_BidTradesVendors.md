# View: `dbo.vw_BidTradesVendors`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidTradeCountyId` | int | NO |  |  |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `VendorId` | int | NO |  |  |
| 5 | `BidCounty` | varchar(50) | NO |  |  |
| 6 | `BidState` | varchar(50) | YES |  |  |
| 7 | `TradeName` | varchar(255) | YES |  |  |
| 8 | `VendorCode` | varchar(16) | NO |  |  |
| 9 | `VendorName` | varchar(50) | NO |  |  |
| 10 | `ContactName` | varchar(150) | NO |  |  |
| 11 | `ContactPhone` | varchar(25) | NO |  |  |
| 12 | `ContactFax` | varchar(20) | NO |  |  |
| 13 | `ContactEmail` | varchar(255) | NO |  |  |
| 14 | `Address1` | varchar(50) | NO |  |  |
| 15 | `Address2` | varchar(50) | NO |  |  |
| 16 | `City` | varchar(50) | NO |  |  |
| 17 | `State` | char(2) | NO |  |  |
| 18 | `Zipcode` | varchar(10) | NO |  |  |
| 19 | `AwardAmount` | numeric(19,4) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidAnswers` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidMgrBidTradeLowBidder` | VIEW |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `States` | USER_TABLE |
| `Trades` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_AwardBidHeader` | SQL_STORED_PROCEDURE |

## Definition

```sql
create   view  [dbo].[vw_BidTradesVendors] as
select BidTradeCounties.BidTradeCountyId, BidImports.BidImportId, BidHeaders.BidHeaderId, Vendors.VendorId,
       Counties.Name BidCounty, States.Name BidState, Trades.Description TradeName,
       isnull(Vendors.Code,'') VendorCode, isnull(Vendors.Name,'') VendorName, 
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
       isnull(VendorContacts.Zipcode,'') Zipcode,
       case 
         when Vendors.VendorId in (7691, 7692) then 9999999999.99
         else
           isnull((select CountyTotalUsedInAward
                     from BidMgrBidTradeLowBidder lb with (nolock)
                    where lb.BidHeaderId = BidHeaders.BidHeaderId
                      and lb.BidTradeId = BidTrades.BidTradeId
                      and lb.CountyId = Counties.CountyId
                      and lb.Active = 1
                      and lb.ActiveCounty = 1
                      and lb.BidImportId = isnull(BidImports.BidImportId,0)),0) 
       end AwardAmount
  from States with (nolock)
  join Counties on Counties.StateId = States.StateId
  join BidTradeCounties on BidTradeCounties.CountyId = Counties.CountyId
  join BidTrades on BidTrades.BidTradeId = BidTradeCounties.BidTradeId
  join Trades on Trades.TradeId = BidTrades.TradeId
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3, 4)
  join Vendors on Vendors.VendorId in
    (select top 2 with ties VendorId
       from (
         select lb.VendorId, CountyTotalUsedInAward
           from BidMgrBidTradeLowBidder lb with (nolock)
          where lb.BidHeaderId = BidHeaders.BidHeaderId
            and lb.BidTradeId = BidTrades.BidTradeId
            and lb.CountyId = Counties.CountyId
            and lb.Active = 1
            and lb.ActiveCounty = 1
         union (select 7691 VendorId, cast(9999999999.98 as money) CountyTotalUsedInAward
                )
         union (select 7692 VendorId, cast(9999999999.99 as money) CountyTotalUsedInAward
                )
             ) ss
      order by CountyTotalUsedInAward
      )
  left outer join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                            and BidImports.VendorId = Vendors.VendorId
                            and BidImports.BidImportId = 
    (select Top 1 bi.BidImportId
       from BidImports bi with (nolock)
       join BidAnswers ba on ba.BidImportId = bi.BidImportId
                         and ba.BidTradeId = BidTrades.BidTradeId
                         and ba.CountyId = Counties.CountyId
      where bi.BidHeaderId = BidHeaders.BidHeaderId
        and bi.VendorId = Vendors.VendorId
        and bi.Active = 1
      order by bi.BidImportId)
  left outer join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                and VendorContacts.VendorContactId =
    (select Top 1 VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.POContact = 1
      order by vc.VendorContactId)
 where BidHeaders.Active = 1
```
