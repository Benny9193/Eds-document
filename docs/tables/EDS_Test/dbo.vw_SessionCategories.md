# View: `dbo.vw_SessionCategories`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SessionCategories] as
SELECT SessionTable.SessionId,
       Category.CategoryId, 
       case isnull(rtrim(DistrictCategories.Title),'') 
         when '' then Category.Name 
         else rtrim(DistrictCategories.Title) 
       end as Name  
  FROM Category with (nolock)
  INNER JOIN PPCategory on PPCategory.CategoryId = Category.CategoryId   
  INNER JOIN DistrictPP on DistrictPP.PricePlanId = PPCategory.PricePlanId 
  inner join DistrictCategories on DistrictCategories.DistrictId = DistrictPP.DistrictId 
                               and DistrictCategories.CategoryId = Category.CategoryId 
                               and DistrictCategories.Active = 1  
  inner join Budgets on Budgets.DistrictId = DistrictCategories.DistrictId
                    and Budgets.Active = 1
  inner join SessionTable on SessionTable.DistrictId = Budgets.DistrictId
                         and SessionTable.SessionEnd is null
  left outer join Users on Users.UserId = SessionTable.UserId
  WHERE Category.Active = 1 
    and Category.Type = 1
    and GETDATE() between case when (isnull(Users.AllowEarlyAccess,0) = 1 or ISNULL(SessionTable.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
  group by SessionTable.SessionId,
           Category.CategoryId, 
           case isnull(rtrim(DistrictCategories.Title),'') 
             when '' then Category.Name 
             else rtrim(DistrictCategories.Title) 
           end
```
