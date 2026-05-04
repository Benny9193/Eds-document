# Procedure: `dbo.sp_AcknowledgeBidDocument`

_Generated on 2026-05-04T13:08:01.406Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AcknowledgeBidDocument` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-11-18 14:40:58 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pBidDocumentId` | IN | int |  |
| 3 | `@pVendorBidId` | IN | int |  |
| 4 | `@pAckName` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidDocumentAcks` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure dbo.sp_AcknowledgeBidDocument @pSessionId int, @pBidDocumentId int, @pVendorBidId int, @pAckName varchar(255)
as
declare @VendorBidId int,
	@BidDocumentAckId int
/*
if isnull(@pVendorBidId,0) = 0
begin
  -- Bid Not Started
end
*/

select @BidDocumentAckId = BidDocumentAckId
  from BidDocumentAcks
 where BidDocumentId = @pBidDocumentId
   and VendorBidId = @pVendorBidId

if @@rowcount = 0
begin
  insert BidDocumentAcks (BidDocumentId, SessionId, AckDateTime, AckName, VendorBidId)
    values (@pBidDocumentId, @pSessionId, getdate(), @pAckName, @pVendorBidId)

  select @BidDocumentAckId = scope_identity()
end
```
