# View: `dbo.vw_VendorQueryMSRPStatus`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryMSRPId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `BidImportId` | int | YES |  |  |
| 5 | `EmailAddress` | varchar(255) | YES |  |  |
| 6 | `ContactName` | varchar(255) | YES |  |  |
| 7 | `SendDate` | datetime | YES |  |  |
| 8 | `VendorQueryMSRPNotes` | varchar(1000) | YES |  |  |
| 9 | `Status` | varchar(18) | YES |  |  |
| 10 | `StatusDate` | datetime | YES |  |  |
| 11 | `FollowUpDate` | datetime | YES |  |  |
| 12 | `VendorQueryMSRPStatusId` | int | YES |  |  |
| 13 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VendorQueryMSRPStatus` | USER_TABLE |
| [`dbo.VendorQueryMSRP`](dbo.VendorQueryMSRP.md) | USER_TABLE |
| [`dbo.VendorQueryMSRPStatus`](dbo.VendorQueryMSRPStatus.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorQueryMSRPStatus]
AS
SELECT VQ.VendorQueryMSRPId, VQ.BidHeaderId, VQ.VendorId, VQ.BidImportId,
       VQ.EmailAddress, VQ.ContactName, VQ.SendDate, VQ.VendorQueryMSRPNotes,
       Case Isnull(VQS.StatusId,0)
       When 0 Then 'Unknown'
       When 1 Then 'Email Sent'
       When 2 Then 'Email Acknowledged'
       When 3 Then 'Partially Resolved'
       When 4 Then 'Email Re-sent'
       When 5 Then 'Resolved'
       When 6 Then 'Non-responsive'
       End Status,
       VQS.StatusDate, VQS.FollowUpDate, VQS.VendorQueryMSRPStatusId, 
       V.Name VendorName 
FROM dbo.VendorQueryMSRP VQ
Join dbo.Vendors V ON V.VendorId = VQ.VendorId
Left Outer JOIN dbo.VendorQueryMSRPStatus VQS ON VQS.VendorQueryMSRPStatusId = 
     ( Select Top 1 VendorQueryMSRPStatusId
       From VendorQueryMSRPStatus VQS2
       Where VQS2.VendorQueryMSRPId=VQ.VendorQueryMSRPId
       Order By VQS2.VendorQueryMSRPStatusId Desc)
```
