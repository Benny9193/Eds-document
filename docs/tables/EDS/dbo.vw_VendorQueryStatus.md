# View: `dbo.vw_VendorQueryStatus`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryId` | int | NO |  |  |
| 2 | `Status` | varchar(18) | YES |  |  |
| 3 | `StatusDate` | datetime | YES |  |  |
| 4 | `FollowUpDate` | datetime | YES |  |  |
| 5 | `VendorQueryStatusId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VendorQueryStatus` | USER_TABLE |
| [`dbo.VendorQuery`](dbo.VendorQuery.md) | USER_TABLE |
| [`dbo.VendorQueryStatus`](dbo.VendorQueryStatus.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorQueryStatus]
AS
SELECT VQ.VendorQueryId,
       Case Isnull(VQS.StatusId,0)
       When 0 Then 'Unknown'
       When 1 Then 'Email Sent'
       When 2 Then 'Email Acknowledged'
       When 3 Then 'Partially Resolved'
       When 4 Then 'Email Re-sent'
       When 5 Then 'Resolved'
       When 6 Then 'Non-responsive'
       End Status,
       VQS.StatusDate, VQS.FollowUpDate, VQS.VendorQueryStatusId  -- added VendorQueryStatusId 3/15/12 kjm
FROM dbo.VendorQuery VQ
Left Outer JOIN dbo.VendorQueryStatus VQS ON VQS.VendorQueryStatusId = 
     ( Select Top 1 VendorQueryStatusId
       From VendorQueryStatus VQS2
       Where VQS2.VendorQueryId=VQ.VendorQueryId
       Order By VQS2.VendorQueryStatusId Desc)
```
