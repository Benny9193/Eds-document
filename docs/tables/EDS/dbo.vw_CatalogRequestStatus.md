# View: `dbo.vw_CatalogRequestStatus`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogRequestId` | int | NO |  |  |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `EmailAddress` | varchar(255) | YES |  |  |
| 4 | `ContactName` | varchar(255) | YES |  |  |
| 5 | `SendDate` | datetime | YES |  |  |
| 6 | `CatalogRequestNotes` | varchar(1000) | YES |  |  |
| 7 | `Status` | varchar(18) | YES |  |  |
| 8 | `StatusDate` | datetime | YES |  |  |
| 9 | `FollowUpDate` | datetime | YES |  |  |
| 10 | `CatalogRequestStatusId` | int | YES |  |  |
| 11 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CatalogRequestStatus` | USER_TABLE |
| [`dbo.CatalogRequest`](dbo.CatalogRequest.md) | USER_TABLE |
| [`dbo.CatalogRequestStatus`](dbo.CatalogRequestStatus.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_CatalogRequestStatus]
AS
SELECT CR.CatalogRequestId, CR.VendorId, 
       CR.EmailAddress, CR.ContactName, CR.SendDate, CR.CatalogRequestNotes,
       Case Isnull(CRS.StatusId,0)
       When 0 Then 'Unknown'
       When 1 Then 'Email Sent'
       When 2 Then 'Email Acknowledged'
       When 3 Then 'Partially Resolved'
       When 4 Then 'Email Re-sent'
       When 5 Then 'Resolved'
       When 6 Then 'Non-responsive'
       End Status,
       CRS.StatusDate, CRS.FollowUpDate, CRS.CatalogRequestStatusId, 
       V.Name VendorName 
FROM dbo.CatalogRequest CR
Join dbo.Vendors V ON V.VendorId = CR.VendorId
Left Outer JOIN dbo.CatalogRequestStatus CRS ON CRS.CatalogRequestStatusId = 
     ( Select Top 1 CatalogRequestStatusId
       From CatalogRequestStatus CRS2
       Where CRS2.CatalogRequestId=CR.CatalogRequestId
       Order By CRS2.CatalogRequestStatusId Desc)
```
