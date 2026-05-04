# View: `dbo.vw_WincapVendors`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Vendor Code` | varchar(16) | NO |  |  |
| 2 | `Vendors Name` | varchar(50) | YES |  |  |
| 3 | `Full Name And Address` | varchar(704) | YES |  |  |
| 4 | `Category` | varchar(50) | YES |  |  |
| 5 | `Vendor Bid Number` | varchar(50) | NO |  |  |
| 6 | `Comments` | varchar(1024) | NO |  |  |
| 7 | `District Vendor Code` | varchar(20) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `AccountingFormats` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_WincapVendors] as
select isnull(Vendors.Code,'') [Vendor Code], 
       Vendors.Name [Vendors Name], 
       Vendors.Name + 
       case isnull(vc.FullName,'') 
         when '' then '' 
         else char(13) + char(10) + 'attn:' + vc.FullName 
       end +
       case isnull(vc.Address1,'') 
         when '' then '' 
         else char(13) + char(10) + vc.Address1
       end +
       case isnull(vc.Address2,'') 
         when '' then '' 
         else char(13) + char(10) + vc.Address2
       end +
       case isnull(vc.City,'') + ISNULL(vc.State,'') + ISNULL(vc.Zipcode,'')
         when '' then '' 
         else char(13) + char(10) + isnull(vc.City,'') + ', ' + ISNULL(vc.State,'') + '  ' + ISNULL(vc.Zipcode,'')
       end +
       case isnull(vc.Phone,'') 
         when '' then '' 
         else char(13) + char(10) + 'Phone: ' + vc.Phone
       end +
       case isnull(vc.Fax,'') 
         when '' then '' 
         else char(13) + char(10) + 'Fax: ' + vc.Fax
       end +
       case isnull(vc.EMail,'') 
         when '' then '' 
         else char(13) + char(10) + 'EMail: ' + vc.EMail
       end [Full Name And Address],
       Category.Name [Category],
       isnull(Bids.VendorBidNumber,'') [Vendor Bid Number],
       isnull(BidImports.Comments,'') [Comments],
       isnull(DistrictVendor.Value,'') [District Vendor Code]
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PPCategory on PPCategory.CategoryId = BidHeaders.CategoryId
                 and PPCategory.PricePlanId = BidHeaders.PricePlanId
  join DistrictCategories on DistrictCategories.CategoryId = PPCategory.CategoryId
  join DistrictPP on DistrictPP.PricePlanId = PPCategory.PricePlanId
  join District on District.DistrictId = DistrictCategories.DistrictId
               and District.DistrictId = DistrictPP.DistrictId
  join AccountingFormats on AccountingFormats.AccountingFormatId = District.AccountingFormatId
                        and AccountingFormats.AccountingFormatId in (24,25,27,30)
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidImports on BidImports.BidImportId = Bids.BidImportId
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
  left outer join VendorContacts vc on vc.VendorContactId =
    (select Top 1 VendorContacts.VendorContactId
       from VendorContacts with (nolock)
      where VendorContacts.VendorId = Vendors.VendorId
        and VendorContacts.Active = 1
      order by VendorContacts.POContact desc, VendorContacts.VendorContactId)
  join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
                     and DistrictVendor.VendorId = Vendors.VendorId
 where BidHeaders.Active = 1
   and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
```
