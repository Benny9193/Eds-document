# View: `dbo.vw_FA_ReqCategories`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | YES |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `CategoryType` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCategory` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_FA_ReqCategories]
AS

SELECT DISTINCT
	Budgets.DistrictId,
	Budgets.BudgetId,
       Category.CategoryId, 
       case isnull(rtrim(DistrictCategories.Title),'') 
         when '' then Category.Name 
         else rtrim(DistrictCategories.Title) 
       end as Name,
       Category.Type CategoryType 
  FROM Category with (nolock)
  INNER JOIN PPCategory on PPCategory.CategoryId = Category.CategoryId   
  INNER JOIN DistrictPP on DistrictPP.PricePlanId = PPCategory.PricePlanId 
  inner join DistrictCategories on DistrictCategories.DistrictId = DistrictPP.DistrictId 
                               and DistrictCategories.CategoryId = Category.CategoryId 
                               and DistrictCategories.Active = 1  
  inner join Budgets on Budgets.DistrictId = DistrictCategories.DistrictId
                    and Budgets.Active = 1
                    and GETDATE() between case when ISNULL(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
  WHERE Category.Active = 1
-- Line Below removed DCH 5/30/13 to allow all Categories to show
--    and Category.Type = 1   
    and isnull(DistrictCategories.AllowIncidentals,0) = case 
                                                         when GETDATE() > Budgets.AnnualCutoff then 1
                                                         else isnull(DistrictCategories.AllowIncidentals,0)
                                                       end
```
