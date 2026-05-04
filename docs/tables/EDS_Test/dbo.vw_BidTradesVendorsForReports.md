# View: `dbo.vw_BidTradesVendorsForReports`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 7 | `PackageNumber` | int | YES |  |  |
| 8 | `TradeDescription` | varchar(255) | YES |  |  |
| 9 | `AwardType` | varchar(50) | YES |  |  |
| 10 | `BidDate` | datetime | YES |  |  |
| 11 | `BidAwardDate` | datetime | YES |  |  |
| 12 | `EffectiveFrom` | datetime | YES |  |  |
| 13 | `EffectiveUntil` | datetime | YES |  |  |
| 14 | `VendorCode` | varchar(16) | NO |  |  |
| 15 | `VendorName` | varchar(50) | NO |  |  |
| 16 | `ContactName` | varchar(150) | NO |  |  |
| 17 | `ContactPhone` | varchar(25) | NO |  |  |
| 18 | `ContactFax` | varchar(20) | NO |  |  |
| 19 | `ContactEmail` | varchar(255) | NO |  |  |
| 20 | `Address1` | varchar(50) | NO |  |  |
| 21 | `Address2` | varchar(50) | NO |  |  |
| 22 | `City` | varchar(50) | NO |  |  |
| 23 | `State` | char(2) | NO |  |  |
| 24 | `Zipcode` | varchar(10) | NO |  |  |
| 25 | `VendorContactInfo` | varchar(5824) | YES |  |  |
| 26 | `HostName` | varchar(50) | YES |  |  |
| 27 | `HostNameAndAddress` | varchar(222) | YES |  |  |
| 28 | `CategoryType` | int | YES |  |  |
| 29 | `CategoryName` | varchar(1074) | YES |  |  |
| 30 | `Grouping` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImportCounties` | USER_TABLE |
| `BidImports` | USER_TABLE |
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

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_BidTradesVendorsForReports] as
select BidTradeCounties.BidTradeCountyId, BidImports.BidImportId, BidHeaders.BidHeaderId, Counties.Name BidCounty, States.Name BidState,
       BidTrades.Title TradeName, Trades.PackageNumber, Trades.Description TradeDescription ,TMAwards.AwardType,
       BidHeaders.BidDate, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil,
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
       ISNULL(Vendors.Name,'') +
       case isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                     when 0 then BidImports.ContactName 
                     else VendorContacts.FullName
                   end,'')
         when '' then ''
         else
           CHAR(13) + CHAR(10) + isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                                          when 0 then BidImports.ContactName 
                                          else VendorContacts.FullName
                                        end,'')
       end +
       case isnull(VendorContacts.Address1,'') 
         when '' then ''
         else CHAR(13) + CHAR(10) + isnull(VendorContacts.Address1,'')
       end +
       case isnull(VendorContacts.Address2,'') 
         when '' then ''
         else CHAR(13) + CHAR(10) + isnull(VendorContacts.Address2,'')
       end +
       case isnull(VendorContacts.City,'') + isnull(VendorContacts.State,'') + isnull(VendorContacts.Zipcode,'')
         when '' then ''
         else CHAR(13) + CHAR(10) + isnull(VendorContacts.City,'') + ', ' + isnull(VendorContacts.State,'') + '  ' + isnull(VendorContacts.Zipcode,'')
       end +
       case isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                     when 0 then BidImports.ContactPhone
                     else VendorContacts.Phone
                   end,'')
         when '' then ''
         else
           CHAR(13) + CHAR(10) + 'Phone: ' + isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                                                      when 0 then BidImports.ContactPhone
                                                      else VendorContacts.Phone
                                                    end,'')
       end +
       case isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                     when 0 then BidImports.ContactFax
                     else VendorContacts.Fax
                   end,'') 
         when '' then ''
         else
           char(13) + char(10) + 'Fax: ' + isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                                                    when 0 then BidImports.ContactFax
                                                    else VendorContacts.Fax
                                                  end,'')
       end + 
       case isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                     when 0 then BidImports.ContactEmail
                     else VendorContacts.EMail
                   end,'') 
         when '' then ''
         else 
           char(13) + char(10) + 'E-Mail: ' + isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                                                       when 0 then BidImports.ContactEmail
                                                       else VendorContacts.EMail
                                                     end,'') 
       end +
       case isnull(BidImports.Comments,'') 
         when '' then ''
         else CHAR(13) + CHAR(10) + BidImports.Comments
       end +
       case isnull(BidImportCounties.Comments,'')
         when '' then ''
         else CHAR(13) + CHAR(10) + BidImportCounties.Comments
       end VendorContactInfo,
       HostDistrict.Name HostName,
       HostDistrict.Name +
       case ISNULL(HostContact.Address1,'') when '' then '' else CHAR(13) + CHAR(10) + HostContact.Address1 end +
       case ISNULL(HostContact.Address2,'') when '' then '' else CHAR(13) + CHAR(10) + HostContact.Address2 end +
       case ISNULL(HostContact.City,'') + isnull(HostContact.State,'') + ISNULL(HostContact.Zipcode,'') when '' then '' else CHAR(13) + CHAR(10) + ISNULL(HostContact.City,'') + ', ' + isnull(HostContact.State,'') + '  ' + ISNULL(HostContact.Zipcode,'')  end HostNameAndAddress,
       Category.Type CategoryType,
       Category.Name +
       case isnull(Category.AppendBidMessage,0) 
         when 0 then ''
         else ISNULL(BidHeaders.BidMessage,'')
       end CategoryName,
       isnull(Category.[Grouping], case isnull(Category.Type,3) when 4 then 'Ancillary Bids' else 'Skilled Trades' end) [Grouping]
  from States with (nolock)
  join Counties on Counties.StateId = States.StateId
  join BidTradeCounties on BidTradeCounties.CountyId = Counties.CountyId
  join BidTrades on BidTrades.BidTradeId = BidTradeCounties.BidTradeId
  join Trades on Trades.TradeId = BidTrades.TradeId
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 3 /*in (3, 4)*/
  join TMAwards on TMAwards.BidHeaderId = BidHeaders.BidHeaderId
               and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
               and TMAwards.Active = 1
  join Vendors on Vendors.VendorId = TMAwards.VendorId
  left outer join BidImports on BidImports.BidImportId = TMAwards.BidImportId
  left outer join BidImportCounties on BidImportCounties.BidImportId = BidImports.BidImportId
                                   and BidImportCounties.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
  left outer join District HostDistrict on HostDistrict.DistrictId = BidHeaders.HostDistrictId
  outer apply (Select top 1 vc.*
                 from VendorContacts vc
				where vc.VendorId = Vendors.VendorId
				order by case when vc.VendorContactId = BidImports.POVendorContactId then 0 else 1 end, case when vc.POContact = 1 then 0 else 1 end, case when vc.BidContact = 1 then 0 else 1 end, case when isnull(vc.FullName,'') + isnull(vc.Address1,'') = '' then 1 else 0 end, vc.VendorContactId) VendorContacts

/*  left outer join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                and VendorContacts.VendorContactId =
    (select Top 1 VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.POContact = 1
      order by vc.VendorContactId)
*/
  outer apply (select Top 1 DistrictContacts.*
				   from DistrictContacts with (nolock)
				  where DistrictContacts.DistrictId = HostDistrict.DistrictId
					and DistrictContacts.DistrictContactTypeId = 1
				  order by DistrictContacts.DistrictContactId) HostContact

/*
  left outer join DistrictContacts HostContact on HostContact.DistrictId = HostDistrict.DistrictId
                                              and HostContact.DistrictContactId =
    (select Top 1 DistrictContacts.DistrictContactId
       from DistrictContacts with (nolock)
      where DistrictContacts.DistrictId = HostDistrict.DistrictId
        and DistrictContacts.DistrictContactTypeId = 1
      order by DistrictContacts.DistrictContactId)
*/
 where BidHeaders.Active = 1
```
