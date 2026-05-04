# Function: table-valued: `dbo.uf_UserTreeBudget`

_Generated on 2026-05-04T13:07:57.729Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_UserTreeBudget` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2013-11-06 15:53:10 |
| Modified | 2013-11-07 12:28:44 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `dbo.uf_UserTree` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_UserTreeBudget] (@pBudgetId int)
returns @UserTable table (
utid int identity (1,1) primary key,
DistrictId int null,
UserId int null,
ApproverId int null,
ApprovalLevel int null,
Level int null,
Status int null,
BreakOnSchool int null,
SortKey varchar(512) null)
as
begin
declare @DistrictId int

declare ut_Cur cursor fast_forward read_only for
select Budgets.DistrictId from Budgets with (nolock) where Budgets.BudgetId = @pBudgetId

open ut_Cur

fetch next from ut_Cur into @DistrictId

while @@fetch_status = 0
begin
  -- insert District Data
  insert @UserTable (DistrictId, UserId, ApproverId, ApprovalLevel, Level, Status, BreakOnSchool, SortKey)
    select @DistrictId, UserId, ApproverId, ApprovalLevel, Level, Status, BreakOnSchool, SortKey
      from dbo.uf_UserTree(@DistrictId)

  fetch next from ut_Cur into @DistrictId
end

close ut_cur
deallocate ut_cur

return
end
```
