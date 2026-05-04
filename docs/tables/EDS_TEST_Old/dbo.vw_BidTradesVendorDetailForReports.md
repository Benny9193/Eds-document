# View: `dbo.vw_BidTradesVendorDetailForReports`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidTradeCountyId` | int | NO |  |  |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidCounty` | varchar(50) | NO |  |  |
| 5 | `BidState` | varchar(50) | YES |  |  |
| 6 | `TradeName` | varchar(255) | NO |  |  |
| 7 | `AwardType` | varchar(50) | YES |  |  |
| 8 | `BidDate` | datetime | YES |  |  |
| 9 | `BidAwardDate` | datetime | YES |  |  |
| 10 | `VendorCode` | varchar(16) | NO |  |  |
| 11 | `VendorName` | varchar(50) | NO |  |  |
| 12 | `ContactName` | varchar(150) | NO |  |  |
| 13 | `ContactPhone` | varchar(25) | NO |  |  |
| 14 | `ContactFax` | varchar(20) | NO |  |  |
| 15 | `ContactEmail` | varchar(255) | NO |  |  |
| 16 | `Address1` | varchar(50) | NO |  |  |
| 17 | `Address2` | varchar(50) | NO |  |  |
| 18 | `City` | varchar(50) | NO |  |  |
| 19 | `State` | char(2) | NO |  |  |
| 20 | `Zipcode` | varchar(10) | NO |  |  |
| 21 | `HostName` | varchar(50) | YES |  |  |
| 22 | `HostNameAndAddress` | varchar(222) | YES |  |  |
| 23 | `BidEntryDisplayLabel` | varchar(255) | YES |  |  |
| 24 | `BidAnswer` | varchar(4096) | YES |  |  |
| 25 | `UOM` | varchar(51) | NO |  |  |
| 26 | `Sequence` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidQuestions` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `States` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidAnswers` | VIEW |
| `dbo.uf_FormatData` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidTradesVendorDetailForReports] as
select BidTradeCounties.BidTradeCountyId, BidImports.BidImportId, BidHeaders.BidHeaderId, Counties.Name BidCounty, States.Name BidState,
       BidTrades.Title TradeName, TMAwards.AwardType,
       BidHeaders.BidDate, BidHeaders.BidAwardDate,
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
       HostDistrict.Name HostName,
       HostDistrict.Name +
       case ISNULL(HostContact.Address1,'') when '' then '' else CHAR(13) + CHAR(10) + HostContact.Address1 end +
       case ISNULL(HostContact.Address2,'') when '' then '' else CHAR(13) + CHAR(10) + HostContact.Address2 end +
       case ISNULL(HostContact.City,'') + isnull(HostContact.State,'') + ISNULL(HostContact.Zipcode,'') when '' then '' else CHAR(13) + CHAR(10) + ISNULL(HostContact.City,'') + ', ' + isnull(HostContact.State,'') + '  ' + ISNULL(HostContact.Zipcode,'')  end HostNameAndAddress,
       BidQuestions.BidEntryDisplayLabel,
       dbo.uf_FormatData(ba.AnswerTypeMask, Ba.BidAnswer) BidAnswer,
       case 
         when ba.AnswerTypeId in (2,3,5) then '%'
         else ''
       end + isnull(ba.UOM,'') UOM,
       BidQuestions.Sequence
  from States with (nolock)
  join Counties on Counties.StateId = States.StateId
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
  join vw_BidAnswers ba on ba.BidImportId = TMAwards.BidImportId
                       and ba.BidTradeId = BidTrades.BidTradeId
                       and ba.CountyId = Counties.CountyId
  join BidQuestions on BidQuestions.BidQuestionId = ba.BidQuestionId
                   and BidQuestions.ExtdCalcTypeId not in (4,5,6)
  left outer join BidImports on BidImports.BidImportId = TMAwards.BidImportId
  left outer join VendorContacts on VendorContacts.VendorContactId =
    (select Top 1 VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.POContact = 1
      order by vc.VendorContactId)
  left outer join District HostDistrict on HostDistrict.DistrictId = BidHeaders.HostDistrictId
  left outer join DistrictContacts HostContact on HostContact.DistrictContactId =
    (select Top 1 DistrictContacts.DistrictContactId
       from DistrictContacts with (nolock)
      where DistrictContacts.DistrictId = HostDistrict.DistrictId
        and DistrictContacts.DistrictContactTypeId = 1
      order by DistrictContacts.DistrictContactId)
 where BidHeaders.Active = 1
```
