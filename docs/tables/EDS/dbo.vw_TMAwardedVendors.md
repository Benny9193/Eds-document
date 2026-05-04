# View: `dbo.vw_TMAwardedVendors`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | NO |  |  |
| 2 | `VendorCode` | varchar(16) | YES |  |  |
| 3 | `VendorName` | varchar(50) | YES |  |  |
| 4 | `VendorNameAndAddress` | varchar(394) | YES |  |  |
| 5 | `Address1` | varchar(50) | YES |  |  |
| 6 | `Address2` | varchar(50) | YES |  |  |
| 7 | `City` | varchar(50) | YES |  |  |
| 8 | `State` | char(2) | YES |  |  |
| 9 | `Zipcode` | varchar(10) | YES |  |  |
| 10 | `Phone` | varchar(25) | YES |  |  |
| 11 | `Fax` | varchar(20) | YES |  |  |
| 12 | `EMail` | varchar(255) | YES |  |  |
| 13 | `FullName` | varchar(150) | YES |  |  |
| 14 | `BidHeaderId` | int | YES |  |  |
| 15 | `BidMessage` | varchar(1024) | YES |  |  |
| 16 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 17 | `Title` | varchar(255) | NO |  |  |
| 18 | `PackageNumber` | int | YES |  |  |
| 19 | `StateName` | varchar(50) | YES |  |  |
| 20 | `CountyName` | varchar(50) | NO |  |  |
| 21 | `AwardType` | varchar(50) | YES |  |  |
| 22 | `EffectiveFrom` | datetime | YES |  |  |
| 23 | `EffectiveUntil` | datetime | YES |  |  |
| 24 | `BidAwardDate` | datetime | YES |  |  |
| 25 | `StateId` | int | YES |  |  |
| 26 | `HostDistrict` | varchar(50) | YES |  |  |
| 27 | `ContactName` | varchar(170) | YES |  |  |

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
| `Salutations` | USER_TABLE |
| `States` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_TMAwardedVendors] as
select Vendors.VendorId, Vendors.Code VendorCode, Vendors.Name VendorName, 
       case when Salutations.SalutationId is null then '' else Salutations.Title end +
       isnull(VendorContacts.FullName,'') + char(13) + char(10) +
       isnull(Vendors.Name,'') +
       case ISNULL(VendorContacts.Address1,'') 
         when '' then ''
         else char(13) + char(10) + VendorContacts.Address1
       end +
       case ISNULL(VendorContacts.Address2,'')
         when '' then ''
         else char(13) + char(10) + VendorContacts.Address2
       end +
       case ISNULL(VendorContacts.City,'') + ISNULL(VendorContacts.State,'') + ISNULL(VendorContacts.Zipcode,'')
         when '' then ''
         else char(13) + char(10) + ISNULL(VendorContacts.City,'') + ', ' + ISNULL(VendorContacts.State,'') + '  ' + ISNULL(VendorContacts.Zipcode,'')
       end VendorNameAndAddress,
       VendorContacts.Address1, VendorContacts.Address2, VendorContacts.City, VendorContacts.State, VendorContacts.Zipcode,
       VendorContacts.Phone, VendorContacts.Fax, VendorContacts.EMail, VendorContacts.FullName,
       BidHeaders.BidHeaderId, BidHeaders.BidMessage, 
       BidImports.VendorBidNumber, BidTrades.Title, Trades.PackageNumber, 
       Counties.State StateName, Counties.Name CountyName, TMAwards.AwardType, 
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, BidHeaders.BidAwardDate, BidHeaders.StateId,
       District.Name HostDistrict,        
       case when Salutations.SalutationId is null then '' else Salutations.Title end +
       isnull(VendorContacts.FullName,'') ContactName
  from BidHeaders with (nolock)
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
  join BidImportCounties on BidImportCounties.BidImportId = BidImports.BidImportId
                        and BidImportCounties.Active = 1
  join Vendors on Vendors.VendorId = BidImports.VendorId
  join BidTrades on BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
                       and BidTradeCounties.BidTradeCountyId = BidImportCounties.BidTradeCountyId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
  join TMAwards on TMAwards.BidHeaderId = BidHeaders.BidHeaderId
               and TMAwards.BidImportId = BidImports.BidImportId
               and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
               and TMAwards.VendorId = Vendors.VendorId
               and TMAwards.Active = 1
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3,4)
  join Trades on Trades.TradeId = BidTrades.TradeId
  left outer join District on District.DistrictId = BidHeaders.HostDistrictId
  left outer join VendorContacts on VendorContacts.VendorContactId =
    (select Top 1 vc.VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.Active = 1
      order by case vc.VendorContactId when BidImports.BidVendorContactId then 2 when BidImports.POVendorContactId then 1 else 0 end desc, vc.BidContact desc, vc.POContact desc, vc.VendorContactId)
  left outer join Salutations on Salutations.SalutationId = VendorContacts.SalutationId
 where BidHeaders.Active = 1
union 
select Vendors.VendorId, Vendors.Code VendorCode, Vendors.Name VendorName, 
       case when Salutations.SalutationId is null then '' else Salutations.Title end +
       isnull(VendorContacts.FullName,'') + char(13) + char(10) +
       isnull(Vendors.Name,'') +
       case ISNULL(VendorContacts.Address1,'') 
         when '' then ''
         else char(13) + char(10) + VendorContacts.Address1
       end +
       case ISNULL(VendorContacts.Address2,'')
         when '' then ''
         else char(13) + char(10) + VendorContacts.Address2
       end +
       case ISNULL(VendorContacts.City,'') + ISNULL(VendorContacts.State,'') + ISNULL(VendorContacts.Zipcode,'')
         when '' then ''
         else char(13) + char(10) + ISNULL(VendorContacts.City,'') + ', ' + ISNULL(VendorContacts.State,'') + '  ' + ISNULL(VendorContacts.Zipcode,'')
       end VendorNameAndAddress,
       VendorContacts.Address1, VendorContacts.Address2, VendorContacts.City, VendorContacts.State, VendorContacts.Zipcode,
       VendorContacts.Phone, VendorContacts.Fax, VendorContacts.EMail, VendorContacts.FullName,
       BidHeaders.BidHeaderId, BidHeaders.BidMessage, 
       BidImports.VendorBidNumber, '' Title, '' PackageNumber, 
       States.Name StateName, '' CountyName, '' AwardType, 
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, BidHeaders.BidAwardDate, BidHeaders.StateId,
       District.Name HostDistrict,
       case when Salutations.SalutationId is null then '' else Salutations.Title end +
       isnull(VendorContacts.FullName,'') ContactName
  from BidHeaders with (nolock)
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
  join Vendors on Vendors.VendorId = BidImports.VendorId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 4
  join States on States.StateId = BidHeaders.StateId
  left outer join District on District.DistrictId = BidHeaders.HostDistrictId
  left outer join VendorContacts on VendorContacts.VendorContactId =
    (select Top 1 vc.VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.Active = 1
      order by case vc.VendorContactId when BidImports.BidVendorContactId then 2 when BidImports.POVendorContactId then 1 else 0 end desc, vc.BidContact desc, vc.POContact desc, vc.VendorContactId)
  left outer join Salutations on Salutations.SalutationId = VendorContacts.SalutationId
 where BidHeaders.Active = 1
```
