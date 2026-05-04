# View: `dbo.vw_HeadingsByReqTest`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `HeadingId` | int | NO |  |  |
| 3 | `Title` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create     view  [dbo].[vw_HeadingsByReqTest] as

select Requisitions.RequisitionId, Headings.HeadingId, Headings.Title
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Headings on Headings.CategoryId = Requisitions.CategoryId
               and Headings.Active = 1
               and isnull(Headings.DistrictId,0) = case ISNULL(Headings.DistrictId,0) when 0 then isnull(Headings.DistrictId,0) when 1 then isnull(Headings.DistrictId,0) else Budgets.DistrictId end
 where exists(  select Items.HeadingId
				  from Items
				  join Headings on Headings.HeadingId = Items.HeadingId
				 where Items.Active = 1
				   and Items.DistrictId = Budgets.DistrictId
				   and Items.CategoryId = Requisitions.CategoryId
				 group by Items.HeadingId
				union
				select Items.HeadingId
				  from Items
				  join Headings on Headings.HeadingId = Items.HeadingId
				               and (Headings.CategoryId is null
							        or Headings.CategoryId = Requisitions.CategoryId)
				               and (Headings.DistrictId is null
									or Headings.DistrictId = 0)
				 where Items.Active = 1
				   and Items.DistrictId != 0
				   and Items.CategoryId = Requisitions.CategoryId
				 group by Items.HeadingId
				 )
```
