# View: `dbo.vw_RequisitionsCategories`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `Name` | varchar(69) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RequisitionsCategories] as
SELECT Requisitions.RequisitionId, 
       Category.CategoryId, 
       Category.Code + ' - ' + 
       case isnull(rtrim(DistrictCategories.Title),'') 
         when '' then Category.Name 
         else rtrim(DistrictCategories.Title) 
       end as Name
  FROM Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId 
                         and DistrictCategories.Active = 1
  join Category on Category.Active = 1
               and Category.CategoryId = DistrictCategories.CategoryId
  JOIN DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
  JOIN PPCategory on PPCategory.CategoryId = Category.CategoryId
                 and PPCategory.PricePlanId = DistrictPP.PricePlanId
group by Requisitions.RequisitionId, 
         Category.CategoryId,
         Category.Code + ' - ' + 
         case isnull(rtrim(DistrictCategories.Title),'') 
           when '' then Category.Name 
           else rtrim(DistrictCategories.Title) 
         end 
--ORDER BY Category.Name
```
