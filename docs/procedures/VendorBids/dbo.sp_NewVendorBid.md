# Procedure: `dbo.sp_NewVendorBid`

_Generated on 2026-05-04T13:43:22.338Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_NewVendorBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-06 10:19:59 |
| Modified | 2018-01-22 19:32:29 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pCalendarId` | IN | int |  |
| 3 | `@pPassword` | IN | varchar(50) |  |
| 4 | `@pBidHeaderId` | IN | int |  |
| 5 | `@pVendorBidNumber` | IN | varchar(50) |  |
| 6 | `@pBidItemDiscountRate` | IN | decimal(9,5) |  |
| 7 | `@pCatalogName` | IN | varchar(255) |  |
| 8 | `@pCatalogDiscountRate` | IN | decimal(9,5) |  |
| 9 | `@pComments` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `VendorBidItems` | USER_TABLE |  |
| `VendorBids` | USER_TABLE |  |
| `VendorBidsJournal` | USER_TABLE |  |
| `VendorSessions` | USER_TABLE |  |
| `BidRequestItems` | unresolved | `eds` |
| `Items` | unresolved | `eds` |
| `Units` | unresolved | `eds` |
| `dbo.uf_ItemDescription` | unresolved | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      procedure sp_NewVendorBid @pSessionId int, @pCalendarId int, @pPassword varchar(50), @pBidHeaderId int, @pVendorBidNumber varchar(50), @pBidItemDiscountRate decimal(9,5), @pCatalogName varchar(255), @pCatalogDiscountRate decimal(9,5), @pComments varchar(4096)
as
declare @VendorBidId int,
	@RegistrationId int

select top 1 @RegistrationId = RegistrationId
  from VendorSessions
 where SessionId = @pSessionId

if @@rowcount = 1
begin
  insert VendorBids (Active, RegistrationId, CalendarId, Password, BidHeaderId)
    Values (1, @RegistrationId, @pCalendarId, @pPassword, @pBidHeaderId)

  select @VendorBidId = SCOPE_IDENTITY()

  insert VendorBidsJournal (VendorBidId, SessionId, StatusId, VendorBidNumber, BidItemDiscountRate, CatalogName, CatalogDiscountRate, Comments, DateModified)
    Values (@VendorBidId, @pSessionId, 1, @pVendorBidNumber, @pBidItemDiscountRate, @pCatalogName, @pCatalogDiscountRate, @pComments, getdate())

  insert VendorBidItems (VendorBidId, BidRequestItemId, ItemId, ItemCode, Units, UnitId, Quantity, SortSeq, Description, ShipLocations)
    select @VendorBidId, bri.BidRequestItemId, Items.ItemId, Items.ItemCode, Units.Code, Items.UnitId, bri.BidRequest, Items.SortSeq, eds.dbo.uf_ItemDescription(Items.ItemId), bri.RequisitionCount
      from eds..BidRequestItems bri
      join eds..Items Items on Items.ItemId = Bri.ItemId
      left outer join eds..Units Units on Units.UnitId = Items.UnitId
     where bri.BidHeaderId = @pBidHeaderId
       and bri.Active = 1
end
```
