# View: `dbo.vw_KeywordsByReqHeading`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `HeadingId` | int | NO |  |  |
| 3 | `KeywordId` | int | NO |  |  |
| 4 | `Keyword` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Keywords` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view  [dbo].[vw_KeywordsByReqHeading] as
select Requisitions.RequisitionId, Headings.HeadingId, Keywords.KeywordId, Keywords.Keyword
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Headings on Headings.CategoryId = Requisitions.CategoryId
               and Headings.Active = 1
               and isnull(Headings.DistrictId,0) = case ISNULL(Headings.DistrictId,0) when 0 then isnull(Headings.DistrictId,0) when 1 then isnull(Headings.DistrictId,0) else Budgets.DistrictId end
  join Keywords on case when coalesce(Keywords.CategoryId,0) = 0 then Requisitions.CategoryId else coalesce(Keywords.CategoryId,0) end = Requisitions.CategoryId
               and Keywords.HeadingId = Headings.HeadingId
               and Keywords.Active = 1
               and isnull(Keywords.DistrictId,0) = case ISNULL(Keywords.DistrictId,0) when 0 then isnull(Keywords.DistrictId,0) when 1 then isnull(Keywords.DistrictId,0) else Budgets.DistrictId end
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
	or Keywords.DateCreated > dateadd(day,-1,getdate())
```
