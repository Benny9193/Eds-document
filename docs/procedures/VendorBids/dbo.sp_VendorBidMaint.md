# Procedure: `dbo.sp_VendorBidMaint`

_Generated on 2026-05-04T13:08:01.429Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VendorBidMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-26 12:40:26 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pVendorBidId` | IN | int |  |
| 3 | `@pCalendarId` | IN | int |  |
| 4 | `@pPassword` | IN | varchar(50) |  |
| 5 | `@pVendorBidNumber` | IN | varchar(50) |  |
| 6 | `@pBidItemDiscountRate` | IN | decimal(9,5) |  |
| 7 | `@pCatalogName` | IN | varchar(255) |  |
| 8 | `@pCatalogDiscountRate` | IN | decimal(9,5) |  |
| 9 | `@pComments` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `VendorBidsJournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_VendorBidMaint @pSessionId int, @pVendorBidId int, @pCalendarId int, @pPassword varchar(50), @pVendorBidNumber varchar(50), @pBidItemDiscountRate decimal(9,5), @pCatalogName varchar(255), @pCatalogDiscountRate decimal(9,5), @pComments varchar(4096)
as
declare @VendorBidId int,
	@PrevVendorBidNumber varchar(50),
	@PrevBidItemDiscountRate decimal(9,5),
	@PrevCatalogName varchar(255),
	@PrevCatalogDiscountRate decimal(9,5),
	@PrevComments varchar(4096),
	@StatusId int

select top 1 @VendorBidId = VendorBidId,
             @PrevVendorBidNumber = VendorBidNumber,
             @PrevBidItemDiscountRate = BidItemDiscountRate,
             @PrevCatalogName = CatalogName,
             @PrevCatalogDiscountRate = CatalogDiscountRate,
             @PrevComments = Comments,
             @StatusId = StatusId
  from VendorBidsJournal
 where VendorBidId = @pVendorBidId
 order by VBJId desc

if @@rowcount = 1
begin
  if isnull(@PrevVendorBidNumber,'') != isnull(@pVendorBidNumber,'') or
     isnull(@PrevBidItemDiscountRate,0) != isnull(@pBidItemDiscountRate,0) or
     isnull(@PrevCatalogName,'') != isnull(@pCatalogName,'') or
     isnull(@PrevCatalogDiscountRate,0) != isnull(@pCatalogDiscountRate,0) or
     isnull(@PrevComments,'') != isnull(@pComments,'')
  begin
    insert VendorBidsJournal (VendorBidId, SessionId, StatusId, VendorBidNumber, BidItemDiscountRate, CatalogName, CatalogDiscountRate, Comments, DateModified)
      Values (@VendorBidId, @pSessionId, @StatusId, @pVendorBidNumber, @pBidItemDiscountRate, @pCatalogName, @pCatalogDiscountRate, @pComments, getdate())
  end
end
```
