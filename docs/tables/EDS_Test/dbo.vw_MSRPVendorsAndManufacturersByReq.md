# View: `dbo.vw_MSRPVendorsAndManufacturersByReq`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `ManufacturerId` | int | NO |  |  |
| 6 | `ManufacturerName` | varchar(100) | NO |  |  |
| 7 | `DiscountRate` | decimal(9,5) | NO |  |  |
| 8 | `FullName` | varchar(150) | YES |  |  |
| 9 | `Phone` | varchar(25) | YES |  |  |
| 10 | `VendorURL` | varchar(255) | NO |  |  |
| 11 | `ManufacturerURL` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidManufacturers` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `Manufacturers` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_MSRPVendorsAndManufacturersByReq] as
select Requisitions.RequisitionId, BidHeaders.BidHeaderId, Vendors.VendorId, Vendors.Name as VendorName, Manufacturers.ManufacturerId, Manufacturers.Name as ManufacturerName, isnull(BidManufacturers.DiscountRate,0) DiscountRate, VendorContacts.FullName, VendorContacts.Phone
		, isnull(BidImports.WebsiteLink,'') AS VendorURL, Manufacturers.WebsiteLink AS ManufacturerURL
  from Requisitions
  join Category on Category.CategoryId = Requisitions.CategoryId
               and Category.Type = 5
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
                 and BidHeaders.Active = 1
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
  join BidManufacturers on BidManufacturers.BidId = Bids.BidId
  join Manufacturers on Manufacturers.ManufacturerId = BidManufacturers.ManufacturerId
  join BidImports on BidImports.BidImportId = Bids.BidImportId
  left outer join VendorContacts on VendorContacts.VendorContactId =
    (select Top 1 vc.VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.Active = 1
      order by case 
                 when vc.VendorContactId = ISNULL(BidImports.BidVendorContactId,0) then 1
                 when vc.BidContact = 1 then 2
                 when vc.VendorContactId = ISNULL(BidImports.POVendorContactId,0) then 3
                 when vc.POContact = 1 then 4
                 else 5
               end, vc.VendorContactId)
```
