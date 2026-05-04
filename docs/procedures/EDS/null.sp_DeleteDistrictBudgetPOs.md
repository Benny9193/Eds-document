# Procedure: `null.sp_DeleteDistrictBudgetPOs`

_Generated on 2026-05-04T13:04:00.216Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_DeleteDistrictBudgetPOs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-08-14 11:59:37 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `sp_DeletePO` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_DeleteDistrictBudgetPOs @pDistrictId int, @pBudgetId int AS

declare @POId	int

declare POCur cursor fast_forward read_only for
select POId 
  from PO
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
             and School.DistrictId = @pDistrictId
 where Requisitions.BudgetId = @pBudgetId
 group by POId

open POCur

fetch next from POCur into @POId

while @@fetch_status = 0
begin
  exec sp_DeletePO @POId

  fetch next from POCur into @POId
end

close POCur
deallocate POCur
```
