# View: `dbo.vw_VendorPOView2`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorSessionId` | int | NO |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `DistrictId` | int | NO |  |  |
| 4 | `POId` | int | NO |  |  |
| 5 | `PONumber` | varchar(24) | YES |  |  |
| 6 | `Amount` | money | YES |  |  |
| 7 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 8 | `Attention` | varchar(50) | YES |  |  |
| 9 | `TotalRequisitionCost` | money | YES |  |  |
| 10 | `DistrictName` | varchar(50) | YES |  |  |
| 11 | `SchoolName` | varchar(50) | YES |  |  |
| 12 | `UserNbr` | int | YES |  |  |
| 13 | `CategoryId` | int | NO |  |  |
| 14 | `CategoryName` | varchar(50) | YES |  |  |
| 15 | `BudgetId` | int | NO |  |  |
| 16 | `BudgetName` | varchar(30) | YES |  |  |
| 17 | `OrderDate` | datetime | YES |  |  |
| 18 | `RequisitionId` | int | NO |  |  |
| 19 | `UploadId` | int | NO |  |  |
| 20 | `DateUploaded` | datetime | NO |  |  |
| 21 | `FileName` | varchar(255) | NO |  |  |
| 22 | `Tagged` | tinyint | NO |  |  |
| 23 | `POLines` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `PO` | USER_TABLE |
| `PODetailItems` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `Users` | USER_TABLE |
| `VendorPOTags` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `VendorSessions` | USER_TABLE |
| `VendorUploads` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorPOView2] as
select VendorSessions.VendorSessionId, Vendors.VendorId, District.DistrictId, 
       PO.POId, PO.PONumber, PO.Amount, 
       Requisitions.RequisitionNumber, Requisitions.Attention, Requisitions.TotalRequisitionCost, 
       District.Name DistrictName, School.Name SchoolName, Users.CometId UserNbr, 
       Category.CategoryId, Category.Name CategoryName, 
       Budgets.BudgetId, Budgets.Name BudgetName,
       Requisitions.OrderDate, Requisitions.RequisitionId,
       isnull(PO.UploadId,0) UploadId, isnull(VendorUploads.DateUploaded, cast('01/01/1900' as datetime)) DateUploaded, isnull(VendorUploads.FileName,'') FileName,
       isnull(VendorPOTags.Tagged,0) Tagged,
  (select count(*) from PODetailItems with (nolock) where PODetailItems.POId = PO.POId) POLines
  from PO with (nolock)
  join Vendors on Vendors.VendorId = PO.VendorId
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join School on School.SchoolId = Requisitions.SchoolId
  join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
  join Users on Users.UserId = Requisitions.UserId
  join Category on Category.CategoryId = Requisitions.CategoryId
  join VendorSessions on VendorSessions.VendorId = Vendors.VendorId
  join VendorPOTags on VendorPOTags.SessionId = VendorSessions.VendorSessionId
                   and VendorPOTags.ScreenId = 'POSelect'
  left outer join VendorUploads on VendorUploads.UploadId = PO.UploadId
```
