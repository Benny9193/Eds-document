# Procedure: `dbo.sp_ISBNAdd`

_Generated on 2026-05-04T13:07:57.483Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ISBNAdd` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-05-02 13:31:27 |
| Modified | 2013-07-15 11:39:16 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |
| 3 | `@pItemCode` | IN | varchar(25) |  |
| 4 | `@pQuantity` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DebugMsgs` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_ReqAdd` | unresolved |  |
| `dbo.uf_LookupItemCodeByReq` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      PROCEDURE [dbo].[sp_ISBNAdd] @pSessionId int, @pRequisitionId int, @pItemCode varchar(25), @pQuantity int AS

declare @ReturnValue int,
	@ItemId int,
	@DistrictId int,
	@DetailId int,
	@CategoryId int,
	@CatalogId int,
        @BudgetAccountId int,
	@TotalCost money,
	@paddedItemCode varchar(16),
	@EffectiveDate datetime

--BEGIN TRANSACTION

select @ReturnValue = 0
select @EffectiveDate = getdate()

select @DistrictId = DistrictId
  from SessionTable
 where SessionId = @pSessionId

if @@rowcount = 0
begin
--  RAISERROR('Bad Session Identifier',16,1)
  insert DebugMsgs(Msg)
    values ('Bad Session Identifier')
  select @ReturnValue = 0
end
else
begin
  select @CategoryId = CategoryId,
         @BudgetAccountId = BudgetAccountId
    from Requisitions
   where RequisitionId = @pRequisitionId

  if @@rowcount = 0
  begin
  --  RAISERROR('Bad Requisition Identifier',16,1)
    insert DebugMsgs(Msg)
      values ('Bad Requisition Identifier')
    select @ReturnValue = 2
  end
  else
  begin
--    if @CategoryId = 83
--    begin
      select @ItemId = ItemId,
             @CatalogId = CatalogId
        from dbo.uf_LookupItemCodeByReq(@pRequisitionId, @pItemCode, 0)
--    end
--    else
--    begin
--      select @ItemId = ItemId,
--             @CatalogId = CatalogId
--        from dbo.uf_LookupItemCode(@pItemCode, @CategoryId, 0, @EffectiveDate, 0, @DistrictId)
--    end
    if @@rowcount = 0
    begin
      select @ReturnValue = 4
    end
    else
    begin
      exec sp_ReqAdd @pRequisitionId, @pQuantity, @ItemId, @DistrictId, @BudgetAccountId, @CatalogId, @pSessionId
    end
  end
end

select ISNULL(@ReturnValue,0) as RetVal

--COMMIT TRANSACTION
```
