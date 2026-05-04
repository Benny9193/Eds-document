# View: `dbo.vw_BrowseDistrictBidHeaders`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `HeadingId` | int | YES |  |  |
| 3 | `Title` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BrowseDistrictBidHeaders] as
SELECT R1.RequisitionId,
       case isnull(Headings.HeadingId,0) 
         when 0 then null 
         else Headings.HeadingId 
       end HeadingId,
       case isnull(Headings.HeadingId,0) 
         when 0 then ' Addenda Items' 
         else rtrim(ltrim(isnull(Headings.Title,' Addenda Items'))) 
       end Title
  from Requisitions r1 with (nolock)
  join Budgets b1 on b1.BudgetId = r1.BudgetId
  join Budgets b0 on b0.DistrictId = b1.DistrictId
                 and b0.Active = 1
                 and GETDATE() between b0.StartDate and b0.EndDate
  join Requisitions on Requisitions.BudgetId = b0.BudgetId
                   and Requisitions.CategoryId = r1.CategoryId
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
  join Items on Items.ItemId = Detail.ItemId 
            and Items.CategoryId = Requisitions.CategoryId 
            and Items.Active = 1
  left outer join Headings on Headings.HeadingId = Items.HeadingId 
                          and Headings.Active = 1
 group by r1.RequisitionId,
          case isnull(Headings.HeadingId,0) 
            when 0 then null 
            else Headings.HeadingId 
          end,
          case isnull(Headings.HeadingId,0) 
            when 0 then ' Addenda Items' 
            else rtrim(ltrim(isnull(Headings.Title,' Addenda Items'))) 
          end
```
