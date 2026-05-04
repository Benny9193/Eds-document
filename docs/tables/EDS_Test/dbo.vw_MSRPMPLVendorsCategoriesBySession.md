# View: `dbo.vw_MSRPMPLVendorsCategoriesBySession`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `VendorId` | int | NO |  |  |
| 5 | `VendorName` | varchar(50) | NO |  |  |
| 6 | `VendorCode` | varchar(16) | NO |  |  |
| 7 | `ManufacturerId` | int | NO |  |  |
| 8 | `ManufacturerName` | varchar(100) | NO |  |  |
| 9 | `BidHeaderId` | int | YES |  |  |
| 10 | `BidAdvertised` | datetime | YES |  |  |
| 11 | `BidAwardDate` | datetime | YES |  |  |
| 12 | `EffectiveFrom` | datetime | YES |  |  |
| 13 | `EffectiveUntil` | datetime | YES |  |  |
| 14 | `BidMessage` | varchar(1024) | YES |  |  |
| 15 | `HostAwardDate` | datetime | YES |  |  |
| 16 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 17 | `Comments` | varchar(1024) | YES |  |  |
| 18 | `Website` | varchar(255) | YES |  |  |
| 19 | `ManufacturersDiscountRate` | decimal(9,5) | YES |  |  |
| 20 | `ManufacturersDiscountRateStr` | varchar(32) | YES |  |  |
| 21 | `ManufacturersUpDownStr` | varchar(9) | NO |  |  |
| 22 | `Address1` | varchar(50) | YES |  |  |
| 23 | `Address2` | varchar(50) | YES |  |  |
| 24 | `City` | varchar(50) | YES |  |  |
| 25 | `State` | char(2) | YES |  |  |
| 26 | `Zipcode` | varchar(10) | YES |  |  |
| 27 | `VendorContactFullName` | varchar(150) | YES |  |  |
| 28 | `VendorContactEMail` | varchar(255) | YES |  |  |
| 29 | `VendorContactPhone` | varchar(25) | YES |  |  |
| 30 | `VendorContactFax` | varchar(20) | YES |  |  |
| 31 | `VendorsManufacturerNotes` | varchar(1000) | NO |  |  |
| 32 | `StateName` | varchar(50) | NO |  |  |
| 33 | `ProductLine` | varchar(100) | NO |  |  |
| 34 | `OptionName` | varchar(50) | NO |  |  |
| 35 | `ProductLineDiscountRate` | decimal(9,5) | YES |  |  |
| 36 | `ProductLineDiscountRateStr` | varchar(32) | YES |  |  |
| 37 | `ProductLineUpDownStr` | varchar(9) | NO |  |  |
| 38 | `RangeBase` | numeric(19,4) | YES |  |  |
| 39 | `RangeTop` | numeric(20,4) | YES |  |  |
| 40 | `PriceRangeDiscountRate` | decimal(9,5) | YES |  |  |
| 41 | `PriceRangeDiscountRateStr` | varchar(32) | YES |  |  |
| 42 | `PriceRangeUpDownStr` | varchar(9) | NO |  |  |
| 43 | `BMAId` | int | NO |  |  |
| 44 | `ManufacturerProductLineId` | int | NO |  |  |
| 45 | `MSRPOptionId` | int | NO |  |  |
| 46 | `BidProductLineId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidManufacturers` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidProductLines` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |
| `Manufacturers` | USER_TABLE |
| `MSRPOptions` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `States` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidProductLinePrices` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_MSRPMPLVendorsCategoriesBySession] as
select SessionTable.SessionId, 
       Category.CategoryId, Category.Name CategoryName, 
       Vendors.VendorId, isnull(Vendors.Name,'') VendorName, isnull(Vendors.Code,'') VendorCode, 
       Manufacturers.ManufacturerId, Manufacturers.Name ManufacturerName,
       BidHeaders.BidHeaderId, BidHeaders.BidDate BidAdvertised, BidHeaders.BidAwardDate,
       case when BidHeaders.HostAwardDate > BidHeaders.EffectiveFrom then BidHeaders.HostAwardDate else BidHeaders.EffectiveFrom end EffectiveFrom, BidHeaders.EffectiveUntil, BidHeaders.BidMessage, BidHeaders.HostAwardDate,
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
       coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) ProductLineDiscountRate,
       case
         when coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) is null then 
           'Varies'
         when coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) >= 0 then
		   cast(cast(BidProductLines.DiscountRate as float) as varchar) + ' %' 
         when coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) < 0 then
           cast(cast(coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) * -1 as float) as varchar) + ' %' 
         else
           cast(cast(coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) as float) as varchar) + ' %' 
       end ProductLineDiscountRateStr,
       case
         when coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) is null then 
           ''
         when coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) >= 0 then
		   'Mark Down' 
         when coalesce(BidManufacturers.DiscountRate,BidProductLines.DiscountRate) < 0 then
           'Mark Up' 
         else
           '' 
       end ProductLineUpDownStr,
       coalesce(vw_BidProductLinePrices.RangeBase,.01) RangeBase,
       vw_BidProductLinePrices.RangeTop,
       coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) PriceRangeDiscountRate,
       case
         when coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) is null then 
           'Varies'
         when coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) >= 0 then
		   cast(cast(coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) as float) as varchar) + ' %' 
         when coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) < 0 then
           cast(cast(coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) * -1 as float) as varchar) + ' %' 
         else
           cast(cast(coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) as float) as varchar) + ' %' 
       end PriceRangeDiscountRateStr,
       case
         when coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) is null then 
           ''
         when coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) >= 0 then
		   'Mark Down' 
         when coalesce(vw_BidProductLinePrices.DiscountRate,BidProductLines.DiscountRate,BidManufacturers.DiscountRate) < 0 then
           'Mark Up' 
         else
           '' 
       end PriceRangeUpDownStr,
       BidManufacturers.BMAId, BidProductLines.ManufacturerProductLineId, BidProductLines.MSRPOptionId, BidProductLines.BidProductLineId
  from SessionTable with (nolock)
  join District on District.DistrictId = SessionTable.DistrictId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                         and DistrictCategories.Active = 1
  join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
                 and PPCategory.CategoryId = DistrictCategories.CategoryId
  join Category on Category.CategoryId = PPCategory.CategoryId
               and Category.Active = 1
               and Category.Type = 5
  join BidHeaders on BidHeaders.CategoryId = Category.CategoryId
                 and BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
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
  left outer join vw_BidProductLinePrices on vw_BidProductLinePrices.BidProductLineId = BidProductLines.BidProductLineId
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
              and Vendors.VendorId != 7691
  left outer join States on States.StateId = BidHeaders.StateId
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
  left outer join BidMSRPResults on BidMSRPResults.BidImportId = BidImports.BidImportId
                                and BidMSRPResults.ManufacturerId = BidManufacturers.ManufacturerId
                                and BidMSRPResults.Active = 1
 group by SessionTable.SessionId, 
       Category.CategoryId, Category.Name, 
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
	   BidManufacturers.BMAId, BidProductLines.ManufacturerProductLineId, BidProductLines.MSRPOptionId, BidProductLines.BidProductLineId
```
