# View: `dbo.vw_WincapVendorsMaster`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Vendor Name` | varchar(50) | YES |  |  |
| 2 | `Ed-Data Vendor Code` | varchar(16) | NO |  |  |
| 3 | `Contact Name` | varchar(150) | NO |  |  |
| 4 | `Address1` | varchar(50) | NO |  |  |
| 5 | `Address2` | varchar(50) | NO |  |  |
| 6 | `City` | varchar(50) | NO |  |  |
| 7 | `State` | char(2) | NO |  |  |
| 8 | `Zip` | varchar(10) | NO |  |  |
| 9 | `Phone` | varchar(25) | NO |  |  |
| 10 | `Fax` | varchar(20) | NO |  |  |
| 11 | `Email` | varchar(255) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_WincapVendorsMaster] as
select Vendors.Name [Vendor Name], 
       isnull(Vendors.Code,'') [Ed-Data Vendor Code], 
       isnull(vc.FullName,'') [Contact Name],
       isnull(vc.Address1,'') [Address1],
       isnull(vc.Address2,'') [Address2],
       isnull(vc.City,'') [City],
       ISNULL(vc.State,'') [State],
       ISNULL(vc.Zipcode,'') [Zip],
       isnull(vc.Phone,'') [Phone],
       isnull(vc.Fax,'') [Fax],
       isnull(vc.EMail,'') [Email]
  from Vendors with (nolock)
  left outer join VendorContacts vc on vc.VendorContactId =
    (select Top 1 VendorContacts.VendorContactId
       from VendorContacts with (nolock)
      where VendorContacts.VendorId = Vendors.VendorId
        and VendorContacts.Active = 1
      order by VendorContacts.POContact desc, VendorContacts.VendorContactId)
 where Vendors.Active = 1
   and isnull(rtrim(Vendors.Name),'') != ''
   and exists(select VendorId 
                from Bids with (nolock) 
                join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId 
                               and BidHeaders.EffectiveFrom > DATEADD(year,-2,getdate()) 
                join DistrictPP on DistrictPP.PricePlanId = BidHeaders.PricePlanId
                join DistrictCategories on DistrictCategories.CategoryId = BidHeaders.CategoryId
                                       and DistrictCategories.Active = 1
                join District on District.DistrictId = DistrictPP.DistrictId
                             and District.DistrictId = DistrictCategories.DistrictId
                             and District.AccountingFormatId in (24, 25, 27, 30)
               where Bids.VendorId = Vendors.VendorId 
                 and Bids.Active = 1)
```
