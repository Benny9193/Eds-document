# Procedure: `dbo.sp_CCUpdateResults`

_Generated on 2026-05-04T13:43:18.739Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCUpdateResults` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-11-09 13:14:10 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |
| 3 | `@pDetailId` | IN | varchar(20) |  |
| 4 | `@pItemId` | IN | int |  |
| 5 | `@pQuantity` | IN | varchar(20) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure dbo.sp_CCUpdateResults @pSessionId int, @pRequisitionId int, @pDetailId varchar(20), @pItemId int, @pQuantity varchar(20) as
declare @Sessionid int,
	@RequisitionId int,
	@DetailId int,
	@ItemId int,
	@Quantity int

-- Validate Session
select @SessionId = SessionId
  from SessionTable
 where SessionId = @pSessionId

if @@rowcount = 0
begin
  raiserror('Invalid SessionId',16,1)
  return
end

-- Validate Requisition
select @RequisitionId = RequisitionId
  from Requisitions
 where RequisitionId = @pRequisitionId

if @@rowcount = 0
begin
  raiserror('Invalid Requisition Id',16,1)
  return
end

select @Quantity = case isnumeric(isnull(@pQuantity,'')) when 1 then convert(int,isnull(@pQuantity,'')) else 0 end,
       @DetailId = case isnumeric(isnull(@pDetailId,'')) when 1 then convert(int,isnull(@pDetailId,'')) else 0 end

-- Check for Existing in Requisition
if isnull(@DetailId,0) = 0
begin
  -- Item NOT in Requisition
  -- Check Quantity
  if isnull(@Quantity,0) != 0
  begin
    insert Detail (RequisitionId, ItemId, Quantity, SessionId, Active)
      values (@pRequisitionId, @pItemId, @Quantity, @pSessionId, 1)
  end
end
else
begin
  Update Detail
     set Quantity = @Quantity
   where Detail.DetailId = @DetailId
     and Detail.RequisitionId = @pRequisitionId
     and Detail.Quantity != @Quantity
end

return
```
