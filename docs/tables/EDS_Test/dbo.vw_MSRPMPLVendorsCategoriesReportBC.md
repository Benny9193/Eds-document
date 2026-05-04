# View: `dbo.vw_MSRPMPLVendorsCategoriesReportBC`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryId` | int | NO |  |  |
| 2 | `CategoryName` | varchar(50) | YES |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `VendorName` | varchar(50) | NO |  |  |
| 5 | `VendorCode` | varchar(16) | NO |  |  |
| 6 | `ManufacturerId` | int | NO |  |  |
| 7 | `ManufacturerName` | varchar(100) | NO |  |  |
| 8 | `BidHeaderId` | int | YES |  |  |
| 9 | `BidAdvertised` | datetime | YES |  |  |
| 10 | `BidAwardDate` | datetime | YES |  |  |
| 11 | `EffectiveFrom` | datetime | YES |  |  |
| 12 | `EffectiveUntil` | datetime | YES |  |  |
| 13 | `BidMessage` | varchar(1024) | YES |  |  |
| 14 | `HostAwardDate` | datetime | YES |  |  |
| 15 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 16 | `Comments` | varchar(1024) | YES |  |  |
| 17 | `Website` | varchar(255) | YES |  |  |
| 18 | `ManufacturersDiscountRate` | decimal(9,5) | YES |  |  |
| 19 | `ManufacturersDiscountRateStr` | varchar(32) | YES |  |  |
| 20 | `ManufacturersUpDownStr` | varchar(9) | NO |  |  |
| 21 | `Address1` | varchar(50) | YES |  |  |
| 22 | `Address2` | varchar(50) | YES |  |  |
| 23 | `City` | varchar(50) | YES |  |  |
| 24 | `State` | char(2) | YES |  |  |
| 25 | `Zipcode` | varchar(10) | YES |  |  |
| 26 | `VendorContactFullName` | varchar(150) | YES |  |  |
| 27 | `VendorContactEMail` | varchar(255) | YES |  |  |
| 28 | `VendorContactPhone` | varchar(25) | YES |  |  |
| 29 | `VendorContactFax` | varchar(20) | YES |  |  |
| 30 | `VendorsManufacturerNotes` | varchar(1000) | NO |  |  |
| 31 | `StateName` | varchar(50) | NO |  |  |
| 32 | `ProductLine` | varchar(100) | NO |  |  |
| 33 | `OptionName` | varchar(50) | NO |  |  |
| 34 | `ProductLineDiscountRate` | decimal(9,5) | YES |  |  |
| 35 | `ProductLineDiscountRateStr` | varchar(32) | YES |  |  |
| 36 | `ProductLineUpDownStr` | varchar(9) | NO |  |  |
| 37 | `RangeBase` | money | YES |  |  |
| 38 | `RangeTop` | numeric(20,4) | YES |  |  |
| 39 | `PriceRangeDiscountRate` | decimal(9,5) | YES |  |  |
| 40 | `PriceRangeDiscountRateStr` | varchar(32) | YES |  |  |
| 41 | `PriceRangeUpDownStr` | varchar(9) | NO |  |  |
| 42 | `BMAId` | int | NO |  |  |
| 43 | `ManufacturerProductLineId` | int | NO |  |  |
| 44 | `MSRPOptionId` | int | NO |  |  |
| 45 | `BidProductLineId` | int | NO |  |  |
| 46 | `HostDistrict` | varchar(50) | NO |  |  |
| 47 | `RangeStr` | varchar(43) | YES |  |  |
| 48 | `VendorNameAndAddress` | varchar(394) | YES |  |  |
| 49 | `ContactName` | varchar(170) | YES |  |  |
| 50 | `AwardType` | varchar(10) | NO |  |  |
| 51 | `ReawardDate` | datetime | YES |  |  |
| 52 | `ReawardFrom` | datetime | YES |  |  |
| 53 | `ReawardUntil` | datetime | YES |  |  |
| 54 | `PricePlanId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidManufacturers` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidProductLines` | USER_TABLE |
| `BidReawards` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |
| `Manufacturers` | USER_TABLE |
| `MSRPOptions` | USER_TABLE |
| `Salutations` | USER_TABLE |
| `States` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidProductLinePrices` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_MSRPMPLVendorsCategoriesReport where BidHeaderId = 10435


create   view  [dbo].[vw_MSRPMPLVendorsCategoriesReportBC] as
select Category.CategoryId, Category.Name CategoryName, 
       Vendors.VendorId, isnull(Vendors.Name,'') VendorName, isnull(Vendors.Code,'') VendorCode, 
       Manufacturers.ManufacturerId, Manufacturers.Name ManufacturerName,
       BidHeaders.BidHeaderId, BidHeaders.BidDate BidAdvertised, BidHeaders.BidAwardDate,
       case when BidHeaders.HostAwardDate > BidHeaders.EffectiveFrom then BidHeaders.HostAwardDate else BidHeaders.EffectiveFrom end EffectiveFrom, BidHeaders.EffectiveUntil, coalesce(case when trim(BidHeaders.BidMessage) = '' then null else trim(BidHeaders.BidMessage) end,Category.Name,'') BidMessage, BidHeaders.HostAwardDate,
       Bids.VendorBidNumber, BidImports.Comments, BidImports.WebsiteLink Website,
       BidManufacturers.DiscountRate ManufacturersDiscountRate,
       case
         when BidManufacturers.DiscountRate is null then 
           'Varies'
         when BidManufacturers.DiscountRate >= 0 then
		   cast(cast(BidManufacturers.DiscountRate as float) as varchar) + ' %' 
         when BidManufacturers.DiscountRate < 0 then
           cast(cast(BidManufacturers.DiscountRate * -1 as float) as varchar) + ' %' 
         else
           cast(cast(BidManufacturers.DiscountRate as float) as varchar) + ' %' 
       end ManufacturersDiscountRateStr,
       case
         when BidManufacturers.DiscountRate is null then 
           ''
         when BidManufacturers.DiscountRate >= 0 then
		   'Mark Down' 
         when BidManufacturers.DiscountRate < 0 then
           'Mark Up' 
         else
           '' 
       end ManufacturersUpDownStr,
       VendorContacts.Address1, VendorContacts.Address2,
       VendorContacts.City, VendorContacts.State, VendorContacts.Zipcode,
       VendorContacts.FullName VendorContactFullName, 
       VendorContacts.Email VendorContactEMail, VendorContacts.Phone VendorContactPhone, VendorContacts.Fax VendorContactFax,
       isnull(BidMSRPResults.VendorNotes,'') VendorsManufacturerNotes,
       ISNULL(States.Name,'') StateName,
       ManufacturerProductLines.Name ProductLine,
       MSRPOptions.MSRPOptionName OptionName,
       BidProductLines.DiscountRate ProductLineDiscountRate,
       case
         when BidProductLines.DiscountRate is null then 
           'Varies'
         when BidProductLines.DiscountRate >= 0 then
		   cast(cast(BidProductLines.DiscountRate as float) as varchar) + ' %' 
         when BidProductLines.DiscountRate < 0 then
           cast(cast(BidProductLines.DiscountRate * -1 as float) as varchar) + ' %' 
         else
           cast(cast(BidProductLines.DiscountRate as float) as varchar) + ' %' 
       end ProductLineDiscountRateStr,
       case
         when BidProductLines.DiscountRate is null then 
           ''
         when BidProductLines.DiscountRate >= 0 then
		   'Mark Down' 
         when BidProductLines.DiscountRate < 0 then
           'Mark Up' 
         else
           '' 
       end ProductLineUpDownStr,
       vw_BidProductLinePrices.RangeBase,
       vw_BidProductLinePrices.RangeTop,
       vw_BidProductLinePrices.DiscountRate PriceRangeDiscountRate,
       case
         when vw_BidProductLinePrices.DiscountRate is null then 
           'Varies'
         when vw_BidProductLinePrices.DiscountRate >= 0 then
		   cast(cast(vw_BidProductLinePrices.DiscountRate as float) as varchar) + ' %' 
         when vw_BidProductLinePrices.DiscountRate < 0 then
           cast(cast(vw_BidProductLinePrices.DiscountRate * -1 as float) as varchar) + ' %' 
         else
           cast(cast(vw_BidProductLinePrices.DiscountRate as float) as varchar) + ' %' 
       end PriceRangeDiscountRateStr,
       case
         when vw_BidProductLinePrices.DiscountRate is null then 
           ''
         when vw_BidProductLinePrices.DiscountRate >= 0 then
		   'Mark Down' 
         when vw_BidProductLinePrices.DiscountRate < 0 then
           'Mark Up' 
         else
           '' 
       end PriceRangeUpDownStr,
       BidManufacturers.BMAId, BidProductLines.ManufacturerProductLineId, BidProductLines.MSRPOptionId, vw_BidProductLinePrices.BidProductLineId,
       isnull(District.Name,'') HostDistrict,
       cast(cast(RangeBase as decimal(12,2)) as varchar(20)) + case when RangeTop is null then '+' else ' - ' + cast(cast(RangeTop as decimal(12,2)) as varchar(20)) end RangeStr,
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
       case when Salutations.SalutationId is null then '' else Salutations.Title end +
       isnull(VendorContacts.FullName,'') ContactName,
       case when BidReawards.BidReawardId is null then 'Awarded' else 'Re-Awarded' end AwardType,
       BidReawards.ReawardDate,
       BidReawards.EffectiveFrom ReawardFrom,
       BidReawards.EffectiveUntil ReawardUntil,
       BidHeaders.PricePlanId
  from Category with (nolock)
  join BidHeaders on BidHeaders.CategoryId = Category.CategoryId
        --         and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil  -- removed 3/6/17 kjm
                 and BidHeaders.Active = 1
                 and BidHeaders.BidType = 1
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidImports on BidImports.BidImportId = Bids.BidImportId
                 and BidImports.Active = 1
                 and BidImports.BidHeaderId = BidHeaders.BidHeaderId
  join BidManufacturers on BidManufacturers.BidId = Bids.BidId
  join Manufacturers on Manufacturers.ManufacturerId = BidManufacturers.ManufacturerId
                    and Manufacturers.Active = 1
  join BidProductLines on BidProductLines.BMAId = BidManufacturers.BMAId
  join ManufacturerProductLines on ManufacturerProductLines.ManufacturerProductLineId = BidProductLines.ManufacturerProductLineId
  join MSRPOptions on MSRPOptions.MSRPOptionId = BidProductLines.MSRPOptionId
  join vw_BidProductLinePrices on vw_BidProductLinePrices.BidProductLineId = BidProductLines.BidProductLineId
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
              and Vendors.VendorId != 7691
  left outer join District on District.DistrictId = BidHeaders.HostDistrictId
  left outer join States on States.StateId = BidHeaders.StateId
  left outer join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                and VendorContacts.VendorContactId = 
     (select Top 1 vc.VendorContactId
        from VendorContacts vc with (nolock)
       where vc.VendorId = Vendors.VendorId
         and vc.Active = 1
       Order by case 
                  when isnull(BidImports.BidVendorContactId,0) = vc.VendorContactId then 0 
                  else 1 
                end, 
                case 
                  when ISNULL(vc.BidContact,0) = 1 then 0
                  else 1
                end,
				case 
                  when isnull(BidImports.POVendorContactId,0) = vc.VendorContactId then 0 
                  else 1 
                end, case 
                  when isnull(vc.POContact,0) = 1 then 0 
                  else 1
                end, 
                vc.VendorContactId)
  left outer join Salutations on Salutations.SalutationId = VendorContacts.SalutationId
  left outer join BidMSRPResults on BidMSRPResults.BidImportId = BidImports.BidImportId
                                and BidMSRPResults.ManufacturerId = BidManufacturers.ManufacturerId
                                and BidMSRPResults.Active = 1
  left outer join BidReawards on BidReawards.BidHeaderId = BidHeaders.BidHeaderId
                             and BidReawards.BidReawardId = 
    (select top 1 bra.BidReawardId
       from BidReawards bra 
      where bra.BidHeaderId = BidHeaders.BidHeaderId
      order by bra.ReawardDate desc)
 where Category.Active = 1
   and Category.Type = 5
 group by Category.CategoryId, Category.Name, 
       Vendors.VendorId, isnull(Vendors.Name,''), isnull(Vendors.Code,''),
       Manufacturers.ManufacturerId, Manufacturers.Name,
       BidHeaders.BidHeaderId, BidHeaders.BidDate, BidHeaders.BidAwardDate,
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, BidHeaders.BidMessage, BidHeaders.HostAwardDate,
       Bids.VendorBidNumber, BidImports.Comments, BidImports.WebsiteLink,
       BidManufacturers.DiscountRate,
       VendorContacts.Address1, VendorContacts.Address2,
       VendorContacts.City, VendorContacts.State, VendorContacts.Zipcode,
       VendorContacts.FullName, 
       VendorContacts.Email, VendorContacts.Phone, VendorContacts.Fax,
       isnull(BidMSRPResults.VendorNotes,''), ISNULL(States.Name,''),
       ManufacturerProductLines.Name,
       MSRPOptions.MSRPOptionName,
       BidProductLines.DiscountRate,
       vw_BidProductLinePrices.RangeBase,
       vw_BidProductLinePrices.RangeTop,
       vw_BidProductLinePrices.DiscountRate,
	   BidManufacturers.BMAId, BidProductLines.ManufacturerProductLineId, BidProductLines.MSRPOptionId, vw_BidProductLinePrices.BidProductLineId,
	   isnull(District.Name,''),
	   Salutations.SalutationId,
	   Salutations.Title,
	   case when BidReawards.BidReawardId is null then 'Awarded' else 'Re-Awarded' end,
       BidReawards.ReawardDate,
       BidReawards.EffectiveFrom,
       BidReawards.EffectiveUntil,
       BidHeaders.PricePlanId
```
