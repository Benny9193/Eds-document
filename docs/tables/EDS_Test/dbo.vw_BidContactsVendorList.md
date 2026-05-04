# View: `dbo.vw_BidContactsVendorList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorCode` | varchar(16) | YES |  |  |
| 4 | `VendorName` | varchar(50) | NO |  |  |
| 5 | `FullName` | varchar(143) | YES |  |  |
| 6 | `ContactFullAddress` | varchar(170) | YES |  |  |
| 7 | `ContactAddress1` | varchar(50) | NO |  |  |
| 8 | `ContactAddress2` | varchar(50) | NO |  |  |
| 9 | `ContactCity` | varchar(50) | NO |  |  |
| 10 | `ContactState` | char(2) | NO |  |  |
| 11 | `ContactZipcode` | varchar(10) | NO |  |  |
| 12 | `CategoryName` | varchar(50) | YES |  |  |
| 13 | `Description` | varchar(278) | NO |  |  |
| 14 | `DistrictName` | varchar(57) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `Category` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `Items` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `Salutations` | USER_TABLE |
| `VendorCategoryPP` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidContactsVendorList] as
select BidHeaders.BidHeaderId, 
       Vendors.VendorId,
       Vendors.Code VendorCode, 
       isnull(Vendors.Name,'') VendorName,
       case ISNULL(Salutations.Title,'') 
         when '' then '' 
         else Salutations.Title + ' ' 
       end + 
       case isnull(VendorContacts.FirstName,'') 
         when '' then '' 
         else isnull(VendorContacts.FirstName,'') + ' ' 
       end + 
       case ISNULL(VendorContacts.LastName,'') 
         when '' then '' 
         else VendorContacts.LastName + ' ' 
       end + 
       ISNULL(VendorContacts.Suffix,'') FullName,
       case 
         when ISNULL(VendorContacts.Address1,'') like '%PAY%' then '' 
         when ISNULL(VendorContacts.Address1,'') = '' then '' 
         else VendorContacts.Address1 + char(10) + char(13) 
       end + 
       case 
         when ISNULL(VendorContacts.Address2,'') like '%PAY%' then '' 
         when isnull(VendorContacts.Address2,'') = '' then ''
         else VendorContacts.Address2 + char(10) + char(13) 
       end + 
       isnull(VendorContacts.City,'') + ', ' + ISNULL(VendorContacts.State,'') + '  ' + ISNULL(VendorContacts.Zipcode,'') ContactFullAddress,
       isnull(VendorContacts.Address1,'') ContactAddress1,
       ISNULL(VendorContacts.Address2,'') ContactAddress2,
       ISNULL(VendorContacts.City,'') ContactCity,
       ISNULL(VendorContacts.State,'') ContactState,
       ISNULL(VendorContacts.Zipcode,'') ContactZipcode,
       Category.Name CategoryName, 
       case isnull(PricePlans.PricePlanId,0) when 0 then 'All Price Plans' else isnull(PricePlans.Code,'') + ' - ' + isnull(PricePlans.Description,'') end Description, 
       case isnull(District.DistrictId,0) when 0 then 'All Districts' else isnull(District.DistrictCode,'') + ' - ' + isnull(District.Name,'') end DistrictName
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  left outer join (
    select BidHeaderDetail.BidHeaderId, Vendors.VendorId, Items.CategoryId
      from BidHeaderDetail
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
      join Items on Items.ItemId = Detail.ItemId
      join Vendors on Vendors.VendorId = Items.VendorId
                  and Vendors.Active = 1
--     where BidHeaderDetail.BidHeaderId = {BidHeaderId}
     group by BidHeaderDetail.BidHeaderId, Vendors.VendorId, Items.CategoryId
   union (
    select BidHeaders.BidHeaderId, VendorCategoryPP.VendorId, VendorCategoryPP.CategoryId
      from BidHeaders
      join DistrictPP on DistrictPP.PricePlanId = BidHeaders.PricePlanId
      join VendorCategoryPP on VendorCategoryPP.CategoryId = BidHeaders.CategoryId
                           and case isnull(VendorCategoryPP.PricePlanId,0) when 0 then BidHeaders.PricePlanId else VendorCategoryPP.PricePlanId end = BidHeaders.PricePlanId
                           and case isnull(VendorCategoryPP.DistrictId,0) when 0 then case isnull(BidHeaders.DistrictId,0) when 0 then DistrictPP.DistrictId else BidHeaders.DistrictId end else VendorCategoryPP.DistrictId end = case isnull(BidHeaders.DistrictId,0) when 0 then DistrictPP.DistrictId else BidHeaders.DistrictId end
      join Vendors on Vendors.VendorId = VendorCategoryPP.VendorId
                  and Vendors.Active = 1
--     where BidHeaders.BidHeaderId = {BidHeaderId}
     group by BidHeaders.BidHeaderId, VendorCategoryPP.VendorId, VendorCategoryPP.CategoryId
   )
       ) vcp on vcp.CategoryId = BidHeaders.CategoryId
            and vcp.BidHeaderId = BidHeaders.BidHeaderId
  join Vendors on Vendors.VendorId = vcp.VendorId
  join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
  left outer join Salutations on Salutations.SalutationId = VendorContacts.SalutationId
  left outer join District on District.DistrictId = BidHeaders.DistrictId
-- where BidHeaders.BidHeaderId = {BidHeaderId}
 where not (isnull(VendorContacts.Zipcode,'') = ''
            and isnull(VendorContacts.FirstName,'') = ''
            and ISNULL(VendorContacts.Lastname,'') = ''
            and ISNULL(VendorContacts.Address1,'') = ''
            and ISNULL(VendorContacts.Address2,'') = '')
-- order by Vendors.Name
```
