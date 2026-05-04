# Procedure: `dbo.sp_DeleteDistrictPOs`

_Generated on 2026-05-04T13:04:00.364Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteDistrictPOs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-04-16 16:01:15 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pBudgetId` | IN | int |  |
| 3 | `@pCategoryId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `sp_DeletePO` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure sp_DeleteDistrictPOs @pDistrictId int, @pBudgetId int, @pCategoryId int AS

declare @POId	int

declare POCur cursor fast_forward read_only for
select POId 
  from PO
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
                   and Requisitions.CategoryId = isnull(@pCategoryId,Requisitions.CategoryId)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.BudgetId = @pBudgetId
              and Budgets.DistrictId = @pDistrictId
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
