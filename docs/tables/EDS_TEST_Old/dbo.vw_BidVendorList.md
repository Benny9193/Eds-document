# View: `dbo.vw_BidVendorList`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `VendorCode` | varchar(16) | YES |  |  |
| 4 | `VendorName` | varchar(max) | YES |  |  |
| 5 | `CategoryName` | varchar(50) | YES |  |  |
| 6 | `CategoryId` | int | NO |  |  |
| 7 | `Description` | varchar(278) | NO |  |  |
| 8 | `DistrictName` | varchar(57) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidVendorsSinceLastYear` | VIEW |
| `dbo.uf_VendorBidContacts` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_VendorBlast`](dbo.vw_VendorBlast.md) | VIEW |
| [`dbo.vw_VendorBlast_RegisteredByBid`](dbo.vw_VendorBlast_RegisteredByBid.md) | VIEW |
| [`dbo.vw_VendorBlast_RegisteredByCategory`](dbo.vw_VendorBlast_RegisteredByCategory.md) | VIEW |

## Definition

```sql
--select * from vw_BidVendorList where BidHeaderId = 10903


CREATE   view  [dbo].[vw_BidVendorList] as
--set rowcount 1000
select BidHeaders.BidHeaderId, 
       Vendors.VendorId,
       Vendors.Code VendorCode, 
       isnull(Vendors.Name,'') + char(13) + char(10) + isnull(dbo.uf_VendorBidContacts(Vendors.VendorId),'') VendorName, 
--       case rtrim(isnull(Vendors.Address1,'')) when '' then '' else char(13) + char(10) + rtrim(Vendors.Address1) end + case rtrim(isnull(Vendors.Address2,'')) when '' then '' else char(13) + char(10) + rtrim(Vendors.Address2) end + case rtrim(isnull(Vendors.Address3,'')) when '' then '' else char(13) + char(10) + rtrim(Vendors.Address3) end + case rtrim(isnull(Vendors.City,'') + isnull(Vendors.State,'') + isnull(Vendors.Zipcode,'')) when '' then '' else char(13) + char(10) + rtrim(isnull(Vendors.City,'')) + ', ' + rtrim(isnull(Vendors.State,'')) + '  ' + rtrim(isnull(Vendors.Zipcode,'')) end VendorName, 
       Category.Name CategoryName, 
       Category.CategoryId,
       case isnull(PricePlans.PricePlanId,0) when 0 then 'All Price Plans' else isnull(PricePlans.Code,'') + ' - ' + isnull(PricePlans.Description,'') end Description, 
       case isnull(District.DistrictId,0) when 0 then 'All Districts' else isnull(District.DistrictCode,'') + ' - ' + isnull(District.Name,'') end DistrictName
  from BidHeaders with (nolock)
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  left outer join vw_BidVendorsSinceLastYear vcp on vcp.CategoryId = BidHeaders.CategoryId
                                                and vcp.BidHeaderId = BidHeaders.BidHeaderId
  left outer join Vendors on Vendors.VendorId = vcp.VendorId
                         and Vendors.Active = 1
  left outer join District on District.DistrictId = BidHeaders.DistrictId
-- where BidHeaders.BidHeaderId = {BidHeaderId}
-- order by Vendors.Name
 where BidHeaders.BidAwardDate > DATEADD(year,-1,getdate())
   and BidHeaders.Active = 1
   and Vendors.Name is not null
```
