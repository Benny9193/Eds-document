# Procedure: `dbo.sp_VendorBidItemMaint`

_Generated on 2026-05-04T13:43:22.351Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VendorBidItemMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-07 10:01:29 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pVendorBidItemId` | IN | int |  |
| 2 | `@pItemBidType` | IN | varchar(50) |  |
| 3 | `@pUnitPrice` | IN | money |  |
| 4 | `@pQuantityBid` | IN | int |  |
| 5 | `@pVendorItemCode` | IN | varchar(50) |  |
| 6 | `@pPageNo` | IN | int |  |
| 7 | `@pAlternate` | IN | varchar(1024) |  |
| 8 | `@pItemsPerUnit` | IN | varchar(50) |  |
| 9 | `@pSessionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `VendorBidItems` | USER_TABLE |  |
| `VendorBidItemsJournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure sp_VendorBidItemMaint @pVendorBidItemId int, @pItemBidType varchar(50), @pUnitPrice money, @pQuantityBid int, @pVendorItemCode varchar(50), @pPageNo int, @pAlternate varchar(1024), @pItemsPerUnit varchar(50), @pSessionId int
as
declare @VendorBidItemId int,
	@PrevItemBidType varchar(50),
	@PrevUnitPrice money,
	@PrevQuantityBid int,
	@PrevVendorItemCode varchar(50),
	@PrevAlternate varchar(1024),
	@PrevItemsPerUnit varchar(50),
	@PrevPageNo int,
	@ErrorCount int

set nocount on

select @ErrorCount = 0

if rtrim(isnull(@pItemBidType,'')) != ''
begin
  -- Validate Data
  if rtrim(@pItemBidType) != ''
  begin
    if isnull(@pUnitPrice,0) = 0
    begin
      raiserror('A valid Unit Price MUST be entered.',16,1)
      select @ErrorCount = @ErrorCount + 1
    end

    if isnull(@pVendorItemCode,'') = ''
    begin
      raiserror('A Vendor Item Code MUST be entered.',16,1)
      select @ErrorCount = @ErrorCount + 1
    end
  end

  if rtrim(@pItemBidType) = 'C' or rtrim(@pItemBidType) = 'N'
  begin
    if rtrim(isnull(@pAlternate,'')) = ''
    begin
      raiserror('Alternate Information MUST be entered when an item is of a Compliant or Non-Compliant type.',16,1)
      select @ErrorCount = @ErrorCount + 1
    end
  end

  if @ErrorCount > 0
  begin
    set nocount off
    return
  end

  select top 1 @VendorBidItemId = VendorBidItemId
    from VendorBidItems
   where VendorBidItemId = @pVendorBidItemId

  if @@rowcount = 1
  begin
    -- Get Old Info - If Any
    select @PrevItemBidType = ItemBidType,
	   @PrevUnitPrice = UnitPrice,
           @PrevQuantityBid = QuantityBid,
           @PrevVendorItemCode = VendorItemCode,
           @PrevAlternate = Alternate,
           @PrevItemsPerUnit = ItemsPerUnit,
           @PrevPageNo = PageNo
      from VendorBidItemsJournal
     where VendorBidItemsJournal.VBIJId = (select top 1 VBIJ.VBIJId from VendorBidItemsJournal VBIJ where VBIJ.VendorBidItemId = VendorBidItemsJournal.VendorBidItemId order by VBIJ.VBIJId desc)
  end

  -- If No Previous Info or Info Changed - Insert New Entry
  if @@rowcount = 0 or 
     @PrevItemBidType != rtrim(@pItemBidType) or
     @PrevUnitPrice != @pUnitPrice or
     @PrevQuantityBid != @pQuantityBid or
     @PrevVendorItemCode != rtrim(@pVendorItemCode) or
     @PrevAlternate != rtrim(@pAlternate) or
     @PrevItemsPerUnit != rtrim(@pItemsPerUnit) or
     @PrevPageNo != @pPageNo
  begin
    insert VendorBidItemsJournal (VendorBidItemId, SessionId, ItemBidType, UnitPrice, Cost, VendorItemCode, QuantityBid, Alternate, ItemsPerUnit, PageNo, DateModified, SessionModified)
      values (@VendorBidItemId, @pSessionId, rtrim(@pItemBidType), @pUnitPrice, @pUnitPrice * @pQuantityBid, rtrim(@pVendorItemCode), @pQuantityBid, rtrim(@pAlternate), rtrim(@pItemsPerUnit), @pPageNo, getdate(), @pSessionId)
  end
end
else
begin
  if isnull(@pUnitPrice,0) != 0
  begin
    raiserror('You must select an "Item Bid Type"',16,1)
    select @ErrorCount = @ErrorCount + 1
  end
end

set nocount off
```
