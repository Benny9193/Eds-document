# View: `dbo.vw_VendorPOView1`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 8 | `Attention` | varchar(50) | NO |  |  |
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
| 22 | `Tagged` | int | NO |  |  |
| 23 | `POLines` | int | YES |  |  |
| 24 | `PayloadId` | varchar(255) | NO |  |  |
| 25 | `UploadUser` | varchar(50) | NO |  |  |
| 26 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 27 | `UploadEMailList` | varchar(4096) | NO |  |  |
| 28 | `UploadType` | int | NO |  |  |
| 29 | `VendorName` | varchar(50) | NO |  |  |
| 30 | `Cancelled` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_VendorPOView` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorPOView1] as
select *
  from vw_VendorPOView with (nolock)
```
