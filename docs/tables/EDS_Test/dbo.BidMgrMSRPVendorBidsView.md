# View: `dbo.BidMgrMSRPVendorBidsView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `VendorsCode` | varchar(16) | YES |  |  |
| 5 | `VendorsName` | varchar(50) | YES |  |  |
| 6 | `VendorId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidMgrMSRP2VendorReportView`](dbo.BidMgrMSRP2VendorReportView.md) | VIEW |
| [`dbo.BidMgrMSRP2VendorReportViewTemp`](dbo.BidMgrMSRP2VendorReportViewTemp.md) | VIEW |

## Definition

```sql
create   view  [dbo].[BidMgrMSRPVendorBidsView]
AS
SELECT dbo.BidImports.BidHeaderId, dbo.BidImports.BidImportId, dbo.BidImports.Active, 
       dbo.Vendors.Code VendorsCode, dbo.Vendors.Name VendorsName, dbo.Vendors.VendorId 
FROM dbo.BidImports 
left JOIN dbo.Vendors ON dbo.Vendors.VendorId = dbo.BidImports.VendorId 
-- where BidImports.BidHeaderId =
```
