# Procedure: `dbo.sp_ReqAdd`

_Generated on 2026-05-04T13:04:00.441Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ReqAdd` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-10-18 09:08:34 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pQuantity` | IN | int |  |
| 3 | `@ItemId` | IN | int |  |
| 4 | `@DistrictId` | IN | int |  |
| 5 | `@BudgetAccountId` | IN | int |  |
| 6 | `@CatalogId` | IN | int |  |
| 7 | `@pSessionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_LookupPriceByBH` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_easyadd` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE    procedure dbo.sp_ReqAdd @pRequisitionId int, @pQuantity int, @ItemId int, @DistrictId int, @BudgetAccountId int, @CatalogId int, @pSessionId int as

declare @DetailId int,
	@BidHeaderId int,
	@TotalCost money,
	@TodaysDate datetime

      select @TodaysDate = getdate()

      select @BidHeaderId = isnull(BidHeaderId,0) 
        from Requisitions with (nolock)
       where RequisitionId = @pRequisitionId

      select @DetailId = DetailId 
        from detail with (nolock)
       where RequisitionId = @pRequisitionId 
	 and ItemId = @ItemId

      if @@rowcount > 0
      begin
	update Detail
	   set Quantity = Quantity + @pQuantity
	 where DetailId = @DetailId
      end
      else
      begin
        -- Try Adding using Bid Item Entry First
	insert Detail (RequisitionId, CatalogId, ItemId, ItemCode, Quantity, [Description], UnitId, UnitCode, BidPrice, CatalogPrice, PricePlanId, PriceId, VendorId, VendorItemCode, CatalogPage, DiscountRate, GrossPrice, AwardId, BidItemId, Alternate, ItemMustBeBid, SessionId)
	  select top 1 @pRequisitionId, /*ParentCatalogId*/CatalogId, ItemId, ItemCode, @pQuantity, dbo.uf_ItemDescription(ItemId)/*[Description]*/, UnitId, UnitCode, BidPrice, CatalogPrice, PricePlanId, PriceId, VendorId, VendorItemCode, Page, DiscountRate, GrossPrice, AwardId, BidItemId, Alternate, ItemMustBeBid, @pSessionId
            from dbo.uf_LookupPriceByBH(@ItemId, @BidHeaderId)
            order by BidItemId, BidPrice, CatalogPrice desc, CatalogYear desc, CatalogId desc
      end

--      execute sp_UpdateReq @pRequisitionId, @BudgetAccountId, 0, 0
```
