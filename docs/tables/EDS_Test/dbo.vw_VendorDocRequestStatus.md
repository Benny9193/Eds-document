# View: `dbo.vw_VendorDocRequestStatus`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorDocRequestId` | int | NO |  |  |
| 2 | `Status` | varchar(18) | YES |  |  |
| 3 | `StatusDate` | datetime | YES |  |  |
| 4 | `FollowUpDate` | datetime | YES |  |  |
| 5 | `VendorDocRequestStatusId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VendorDocRequestStatus` | USER_TABLE |
| [`dbo.VendorDocRequest`](dbo.VendorDocRequest.md) | USER_TABLE |
| [`dbo.VendorDocRequestStatus`](dbo.VendorDocRequestStatus.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorDocRequestStatus]
AS
SELECT VDR.VendorDocRequestId,
       Case Isnull(VDRS.StatusId,0)
       When 0 Then 'Unknown'
       When 1 Then 'Email Sent'
       When 2 Then 'Email Acknowledged'
       When 3 Then 'Partially Resolved'
       When 4 Then 'Email Re-sent'
       When 5 Then 'Resolved'
       When 6 Then 'Non-responsive'
       End Status,
       VDRS.StatusDate, VDRS.FollowUpDate, VDRS.VendorDocRequestStatusId  
FROM dbo.VendorDocRequest VDR
Left Outer JOIN dbo.VendorDocRequestStatus VDRS ON VDRS.VendorDocRequestStatusId = 
     ( Select Top 1 VendorDocRequestStatusId
       From VendorDocRequestStatus VDRS2
       Where VDRS2.VendorDocRequestId=VDR.VendorDocRequestId
       Order By VDRS2.VendorDocRequestStatusId Desc)
```
