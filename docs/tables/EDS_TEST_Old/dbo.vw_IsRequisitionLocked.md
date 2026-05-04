# View: `dbo.vw_IsRequisitionLocked`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `IsLocked` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_IsRequisitionLocked] as
  select Requisitions.RequisitionId, 
         case 
           when isnull((select case
                                 when Budgets.EditFrom is null and Budgets.EditUntil is null then 1
                                 when getdate() between Budgets.EditFrom and Budgets.EditUntil then 1
                                 when getdate() between (select case 
                                                                  when (   isnull(Users.AllowEarlyAccess,0) = 1 
                                                                        or isnull(Users.ApprovalLevel,0) > 1) 
                                                                      and isnull(DistrictCategories.EarlyAccess,0) = 1 
                                                                   then coalesce(Budgets.EarlyAccess,Budgets.EditFrom) 
                                                                  else Budgets.EditFrom 
                                                                end 
                                                           from Users 
                                                           join DistrictCategories on DistrictCategories.DistrictId = Users.DistrictId 
                                                                                  and DistrictCategories.CategoryId = Requisitions.CategoryId 
                                                          where Users.UserId = Requisitions.UserId) 
                                                    and Budgets.EditUntil 
                                   then 1
                                 else 0
                               end
                          from Budgets
                         where Budgets.BudgetId = Requisitions.BudgetId),0) = 1
            and ISNULL((select top 1 case
                                       when StatusTable.StatusCode in ('R','C') then 0
                                       when StatusTable.StatusCode in ('B','W','M') then 1
                                       else Approvals.Level
                                     end MaxLevel
                          from Approvals
                          join StatusTable on StatusTable.StatusId = Approvals.StatusId
                         where Approvals.RequisitionId = Requisitions.RequisitionId
                         order by Approvals.ApprovalDate desc),0) = 0
           then 0
           else 1
         end IsLocked
    from Requisitions
```
