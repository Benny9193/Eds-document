# Procedure: `dbo.sp_UpdatePricePlan`

_Generated on 2026-05-04T13:07:57.545Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdatePricePlan` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-11-26 13:44:31 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPricePlanId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PricePlans` | USER_TABLE |  |
| `dbo.sp_UpdatePricePlan` | SQL_STORED_PROCEDURE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_UpdatePricePlan` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE                   procedure sp_UpdatePricePlan @pPricePlanId int AS

declare @PricePlanId int

select @PricePlanId = @pPricePlanId

if @PricePlanId = 0
begin
  declare PPCursor cursor read_only forward_only for
    select PricePlanId
      from PricePlans
     where Active = 1

  open PPCursor

  fetch next from PPCursor into @PricePlanId

  while @@fetch_status = 0
  begin
    exec dbo.sp_UpdatePricePlan @PricePlanId

    fetch next from PPCursor into @PricePlanId
  end

  close PPCursor
  deallocate PPCursor

end
else
begin
  Begin Transaction
 
  -- Mark Price Plan for Update
  Update PricePlans
     set LastAltered = getdate()
   where PricePlanId = @pPricePlanId

  Commit Transaction
end
```
