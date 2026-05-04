# View: `dbo.vw_MSRPManufacturersBySession`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `ManufacturerId` | int | NO |  |  |
| 4 | `ManufacturerName` | varchar(100) | NO |  |  |
| 5 | `WebsiteLink` | varchar(255) | NO |  |  |
| 6 | `BidHeaderId` | int | YES |  |  |
| 7 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 8 | `DiscountRateStr` | varchar(32) | YES |  |  |
| 9 | `UpDownStr` | varchar(10) | NO |  |  |
| 10 | `VendorsManufacturerNotes` | varchar(1000) | NO |  |  |
| 11 | `CategoryId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidManufacturers` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `Manufacturers` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_MSRPManufacturersBySession] as
select SessionTable.SessionId, 
       Vendors.VendorId, 
       Manufacturers.ManufacturerId, Manufacturers.Name ManufacturerName, isnull(Manufacturers.WebsiteLink,'') WebsiteLink,
       BidHeaders.BidHeaderId, 
       BidManufacturers.DiscountRate,
       case
         when BidManufacturers.DiscountRate is null then 'Varies'
         when BidManufacturers.DiscountRate < 0 then cast(cast((BidManufacturers.DiscountRate * -1) as float) as varchar) + ' %'
         when BidManufacturers.DiscountRate >= 0 then cast(cast(BidManufacturers.DiscountRate as float) as varchar) + ' %'
         else
		   cast(cast(BidManufacturers.DiscountRate as float) as varchar) + ' %' 
	   end DiscountRateStr,
       case
         when BidManufacturers.DiscountRate is null then ''
         when BidManufacturers.DiscountRate < 0 then ' Mark Up'
         when BidManufacturers.DiscountRate >= 0 then ' Mark Down'
         else
		   '' 
	   end UpDownStr,
       isnull(BidMSRPResults.VendorNotes,'') VendorsManufacturerNotes,
	   Category.CategoryId
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
  join BidManufacturers on BidManufacturers.BidId = Bids.BidId
  join Manufacturers on Manufacturers.ManufacturerId = BidManufacturers.ManufacturerId
                    and Manufacturers.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
              and Vendors.VendorId != 7691
  left outer join BidMSRPResults on BidMSRPResults.BidImportId = BidImports.BidImportId
                                and BidMSRPResults.ManufacturerId = BidManufacturers.ManufacturerId
                                and BidMSRPResults.Active = 1
 group by SessionTable.SessionId, 
       Vendors.VendorId, 
       Manufacturers.ManufacturerId, Manufacturers.Name, isnull(Manufacturers.WebsiteLink,''),
       BidHeaders.BidHeaderId,
       BidManufacturers.DiscountRate,
       isnull(BidMSRPResults.VendorNotes,''),
	   Category.CategoryId
```
