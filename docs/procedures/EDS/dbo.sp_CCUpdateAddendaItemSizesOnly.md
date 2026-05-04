# Procedure: `dbo.sp_CCUpdateAddendaItemSizesOnly`

_Generated on 2026-05-04T13:04:00.324Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCUpdateAddendaItemSizesOnly` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-01-27 12:36:27 |
| Modified | 2013-09-24 09:31:33 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pListPrice` | IN | money |  |
| 2 | `@pExtraDetail` | IN | varchar(1024) |  |
| 3 | `@pRequisitionId` | IN | int |  |
| 4 | `@pQuantity` | IN | int |  |
| 5 | `@pDetailId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[sp_CCUpdateAddendaItemSizesOnly] @pListPrice money, @pExtraDetail varchar(1024), 
                                      @pRequisitionId int, @pQuantity int, @pDetailId int
as
declare @ItemId int,
	@BidItemId int,
	@PricePlanId int

  -- Get Detail Record Info
  select @ItemId = ItemId,
         @BidItemId = BidItemId
    from Detail
   where DetailId = @pDetailId

  if isnull(@BidItemId,0) = 0
  begin  
    -- Update Item
    Update Items
       set   ListPrice = convert(money,@pListPrice)
--           ExtraDetail = @pExtraDetail
     where ItemId = @ItemId

    -- Update Detail
    Update Detail
       set Quantity = @pQuantity,
           ExtraDescription = @pExtraDetail
     where DetailId = @pdetailId
  end
  else
  begin
    Update Detail
       set Quantity = @pQuantity,
           ExtraDescription = @pExtraDetail
     where DetailId = @pdetailId
  end
```
