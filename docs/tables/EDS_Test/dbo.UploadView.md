# View: `dbo.UploadView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UploadId` | int | NO |  |  |
| 2 | `FileName` | varchar(255) | YES |  |  |
| 3 | `DateCreated` | datetime | YES |  |  |
| 4 | `DateUploaded` | datetime | NO |  |  |
| 5 | `Status` | varchar(255) | YES |  |  |
| 6 | `VendorId` | int | NO |  |  |
| 7 | `VendorName` | varchar(50) | YES |  |  |
| 8 | `UploadEmailList` | varchar(4096) | YES |  |  |
| 9 | `HostURL` | varchar(255) | YES |  |  |
| 10 | `HostPort` | int | YES |  |  |
| 11 | `HostDirectory` | varchar(255) | YES |  |  |
| 12 | `HostUserName` | varchar(255) | YES |  |  |
| 13 | `HostPassword` | varchar(255) | YES |  |  |
| 14 | `DistrictId` | int | NO |  |  |
| 15 | `DistrictName` | varchar(50) | YES |  |  |
| 16 | `VendorAccountNumber` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `VendorUploads` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[UploadView] as
select VendorUploads.UploadId, VendorUploads.FileName, VendorUploads.DateCreated, isnull(VendorUploads.DateUploaded,convert(datetime,'01/01/1900 00:00')) DateUploaded, VendorUploads.Status, Vendors.VendorId, Vendors.Name VendorName, Vendors.UploadEmailList, Vendors.HostURL, Vendors.HostPort, Vendors.HostDirectory, Vendors.HostUserName, Vendors.HostPassword, District.DistrictId, District.Name DistrictName, (select top 1 DistrictVendor.VendorsAccountCode from DistrictVendor where DistrictVendor.DistrictId = District.DistrictId and DistrictVendor.VendorId = Vendors.VendorId and DistrictVendor.Active = 1) VendorAccountNumber
  from PO with (nolock)
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
  join VendorUploads on VendorUploads.UploadId = PO.UploadId 
  join Vendors on Vendors.VendorId = PO.VendorId
              and Vendors.UploadType is not null
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId 
  join District on District.DistrictId = Budgets.DistrictId
 where PO.ExportedToVendor >= dateadd(month,-3,getdate())
 group by Vendors.Name, Vendors.UploadEMailList, Vendors.HostURL, Vendors.HostPort, Vendors.HostDirectory, Vendors.HostUserName, Vendors.HostPassword, Vendors.VendorId, District.DistrictId, VendorUploads.UploadId, VendorUploads.FileName, VendorUploads.DateCreated, VendorUploads.DateUploaded, VendorUploads.Status, District.Name
```
