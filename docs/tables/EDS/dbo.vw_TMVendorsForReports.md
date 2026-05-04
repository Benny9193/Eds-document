# View: `dbo.vw_TMVendorsForReports`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidTradeCountyId` | int | YES |  |  |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidCounty` | varchar(30) | YES |  |  |
| 5 | `BidState` | varchar(50) | YES |  |  |
| 6 | `TradeName` | varchar(30) | YES |  |  |
| 7 | `PackageNumber` | int | YES |  |  |
| 8 | `TradeDescription` | varchar(30) | YES |  |  |
| 9 | `AwardType` | varchar(15) | NO |  |  |
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
| 25 | `VendorContactInfo` | varchar(1726) | YES |  |  |
| 26 | `HostName` | varchar(50) | YES |  |  |
| 27 | `HostNameAndAddress` | varchar(222) | YES |  |  |
| 28 | `CategoryType` | int | YES |  |  |
| 29 | `CategoryName` | varchar(1075) | YES |  |  |
| 30 | `Grouping` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `States` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_TMVendorsForReports] as
select cast(null as int) BidTradeCountyId, BidImports.BidImportId, BidHeaders.BidHeaderId, CAST(null as varchar) BidCounty, States.Name BidState,
       cast(null as varchar) TradeName, cast(null as int) PackageNumber, cast(null as varchar) TradeDescription, 
       case (select COUNT(*) 
               from Bids with (nolock) 
              where Bids.BidHeaderId = BidHeaders.BidHeaderId 
                and Bids.Active = 1 
                and Bids.VendorId != 7691) 
         when 0 then 'Trade Award'
         when 1 then 'Total Award' 
         else 'Line Item Award' 
       end AwardType,
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
         else ISNULL(' ' + BidHeaders.BidMessage,'')
       end CategoryName,
       isnull(Category.[Grouping], case isnull(Category.Type,3) when 4 then 'Ancillary Bids' else 'Skilled Trades' end) [Grouping]
  from States with (nolock)
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and GETDATE() between dateadd(month,-2,BidHeaders.EffectiveFrom) and dateadd(month,0,BidHeaders.EffectiveUntil/*4,BidHeaders.EffectiveFrom*/)
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 4 /*in (3,4)*/
  join (
        select BidHeaderId, VendorId, BidImportId
          from TMAwards with (nolock)
         where TMAwards.Active = 1
           and TMAwards.VendorId != 7691
         group by BidHeaderId, VendorId, BidImportId
        union (
          select BidHeaderId, VendorId, BidImportId
            from Bids with (nolock)
           where Bids.Active = 1
             and Bids.VendorId != 7691
           group by BidHeaderId, VendorId, BidImportId
               )
        ) ss on ss.BidHeaderId = BidHeaders.BidHeaderId
  join Vendors on Vendors.VendorId = ss.VendorId
  left outer join BidImports on BidImports.BidImportId = ss.BidImportId
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
