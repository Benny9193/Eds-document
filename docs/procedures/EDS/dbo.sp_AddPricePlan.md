# Procedure: `dbo.sp_AddPricePlan`

_Generated on 2026-05-04T13:43:18.689Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AddPricePlan` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-10-16 16:00:17 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pPricePlanId` | IN | int |  |
| 3 | `@pCode` | IN | varchar(2) |  |
| 4 | `@pDescription` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PricePlans` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_AddPricePlan @pSessionId int, @pPricePlanId int, @pCode varchar(2), @pDescription varchar(255) AS

if @pPricePlanId = 0
begin
  if rtrim(@pCode) != ''
  begin
    insert PricePlans (Active, Code, [Description])
      values (1, @pCode, @pDescription)
  end
end
else
begin
  if rtrim(@pCode) = ''
  begin
    Update PricePlans
       set Active = 0
     where PricePlanId = @pPricePlanId
  end
  else
  begin
    Update PricePlans
       set Code = rtrim(@pCode),
           [Description] = rtrim(@pDescription),
	   Active = 1
     where PricePlanId = @pPricePlanId
  end
end
```
