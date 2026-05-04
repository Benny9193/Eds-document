# View: `dbo.vw_VendorQueryTandMStatus`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryTandMId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `BidImportId` | int | YES |  |  |
| 5 | `EmailAddress` | varchar(255) | YES |  |  |
| 6 | `ContactName` | varchar(255) | YES |  |  |
| 7 | `SendDate` | datetime | YES |  |  |
| 8 | `VendorQueryTandMNotes` | varchar(1000) | YES |  |  |
| 9 | `Status` | varchar(18) | YES |  |  |
| 10 | `StatusDate` | datetime | YES |  |  |
| 11 | `FollowUpDate` | datetime | YES |  |  |
| 12 | `VendorQueryTandMStatusId` | int | YES |  |  |
| 13 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VendorQueryTandMStatus` | USER_TABLE |
| [`dbo.VendorQueryTandM`](dbo.VendorQueryTandM.md) | USER_TABLE |
| [`dbo.VendorQueryTandMStatus`](dbo.VendorQueryTandMStatus.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorQueryTandMStatus]
AS
SELECT VQ.VendorQueryTandMId, VQ.BidHeaderId, VQ.VendorId, VQ.BidImportId,
       VQ.EmailAddress, VQ.ContactName, VQ.SendDate, VQ.VendorQueryTandMNotes,
       Case Isnull(VQS.StatusId,0)
       When 0 Then 'Unknown'
       When 1 Then 'Email Sent'
       When 2 Then 'Email Acknowledged'
       When 3 Then 'Partially Resolved'
       When 4 Then 'Email Re-sent'
       When 5 Then 'Resolved'
       When 6 Then 'Non-responsive'
       End Status,
       VQS.StatusDate, VQS.FollowUpDate, VQS.VendorQueryTandMStatusId, 
       V.Name VendorName 
FROM dbo.VendorQueryTandM VQ
Join dbo.Vendors V ON V.VendorId = VQ.VendorId
Left Outer JOIN dbo.VendorQueryTandMStatus VQS ON VQS.VendorQueryTandMStatusId = 
     ( Select Top 1 VendorQueryTandMStatusId
       From VendorQueryTandMStatus VQS2
       Where VQS2.VendorQueryTandMId=VQ.VendorQueryTandMId
       Order By VQS2.VendorQueryTandMStatusId Desc)
```
