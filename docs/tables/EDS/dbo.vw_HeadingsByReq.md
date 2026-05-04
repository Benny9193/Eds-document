# View: `dbo.vw_HeadingsByReq`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `HeadingId` | int | NO |  |  |
| 3 | `Title` | varchar(255) | YES |  |  |
| 4 | `DateCreated` | datetime | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |

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
CREATE       view  [dbo].[vw_HeadingsByReq] as

select Requisitions.RequisitionId, Headings.HeadingId, Headings.Title, Headings.DateCreated, Headings.DistrictId
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Headings on Headings.CategoryId = Requisitions.CategoryId
               and Headings.Active = 1
               and isnull(Headings.DistrictId,0) = case ISNULL(Headings.DistrictId,0) when 0 then isnull(Headings.DistrictId,0) when 1 then isnull(Headings.DistrictId,0) else Budgets.DistrictId end
 where exists(  select Items.HeadingId
				  from Items
				  join Headings h on h.HeadingId = Items.HeadingId
				 where Items.Active = 1
				   and Items.HeadingId = Headings.HeadingId
				   and Items.DistrictId is not null
				   and Items.DistrictId = Budgets.DistrictId
				   and Items.CategoryId = Requisitions.CategoryId
				 group by Items.HeadingId
				union
				select Items.HeadingId
				  from Items
				  join Headings h on h.HeadingId = Items.HeadingId
				               and (h.CategoryId is null
							        or h.CategoryId = Requisitions.CategoryId)
				               and (h.DistrictId is null
									or h.DistrictId = 0)
				 where Items.Active = 1
				   and Items.HeadingId = Headings.HeadingId
				   and Items.DistrictId is not null
				   and Items.DistrictId != 0
				   and Items.CategoryId = Requisitions.CategoryId
				 group by Items.HeadingId
				 )
	or (Headings.DateCreated is not null and Headings.DateCreated > dateadd(day,-1,getdate()))
```
