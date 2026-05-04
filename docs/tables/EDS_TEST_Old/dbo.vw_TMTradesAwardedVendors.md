# View: `dbo.vw_TMTradesAwardedVendors`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 19 | `StateName` | char(2) | NO |  |  |
| 20 | `CountyName` | varchar(50) | NO |  |  |
| 21 | `AwardType` | varchar(50) | YES |  |  |
| 22 | `EffectiveFrom` | datetime | YES |  |  |
| 23 | `EffectiveUntil` | datetime | YES |  |  |
| 24 | `BidAwardDate` | datetime | YES |  |  |
| 25 | `StateId` | int | YES |  |  |
| 26 | `HostDistrict` | varchar(50) | YES |  |  |
| 27 | `ContactName` | varchar(170) | YES |  |  |
| 28 | `CategoryName` | varchar(50) | YES |  |  |
| 29 | `CategoryId` | int | NO |  |  |
| 30 | `AwardingType` | varchar(10) | NO |  |  |
| 31 | `ReawardDate` | datetime | YES |  |  |
| 32 | `ReawardFrom` | datetime | YES |  |  |
| 33 | `ReawardUntil` | datetime | YES |  |  |
| 34 | `PricePlanId` | int | YES |  |  |
| 35 | `BidTradeCountyId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImportCounties` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidReawards` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `Salutations` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.TMSurvey_Trig` | SQL_TRIGGER |
| [`dbo.vw_TMCountyTrades`](dbo.vw_TMCountyTrades.md) | VIEW |
| [`dbo.vw_TMSurveyData`](dbo.vw_TMSurveyData.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_TMTradesAwardedVendors] as
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
       isnull(VendorContacts.FullName,'') ContactName,
       Category.Name CategoryName,
       Category.CategoryId CategoryId,
       case when BidReawards.BidReawardId is null then 'Awarded' else 'Re-Awarded' end AwardingType,
       BidReawards.ReawardDate,
       BidReawards.EffectiveFrom ReawardFrom,
       BidReawards.EffectiveUntil ReawardUntil,
       BidHeaders.PricePlanId,
	   BidTradeCounties.BidTradeCountyId
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
  left outer join BidReawards on BidReawards.BidHeaderId = BidHeaders.BidHeaderId
                             and BidReawards.BidReawardId =
    (select Top 1 bra.BidReawardId
       from BidReawards bra
      where bra.BidHeaderId = BidHeaders.BidHeaderId
      order by bra.ReawardDate desc)
 where /*GETDATE() between DATEADD(month,-2,BidHeaders.EffectiveFrom) and dateadd(month,+8,BidHeaders.EffectiveFrom)
   and */BidHeaders.Active = 1
-- order by Vendors.Name, BidHeaders.BidHeaderId, BidTrades.Title, Counties.State, Counties.Name, TMAwards.AwardType
```
