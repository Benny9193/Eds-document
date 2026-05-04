# Procedure: `dbo.sp_DSHeadings`

_Generated on 2026-05-04T13:04:24.119Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DSHeadings` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2017-10-23 16:29:03 |
| Modified | 2022-12-20 11:46:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@RequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `PricingAddenda` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec sp_DSHeadings 51652881

CREATE procedure [dbo].[sp_DSHeadings] @RequisitionId int as
set nocount on
declare @DistrictId int, @CategoryId int, @AllowAddenda int
declare @Headings table (HeadingId bigint, HeadingTitle varchar(255))

select @DistrictId = isnull(Budgets.DistrictId,0),
	   @CategoryId = isnull(Requisitions.CategoryId,0),
	   @AllowAddenda = isnull(AllowAddenda.AllowAddenda,0)
  from Requisitions with (nolock) 
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  outer apply (select DistrictCategories.AllowAddenda 
                 from DistrictCategories 
				where DistrictCategories.DistrictId = Budgets.DistrictId
                  and DistrictCategories.CategoryId = Requisitions.CategoryId) AllowAddenda
 where RequisitionId = @RequisitionId

if @AllowAddenda = 1
begin
	insert @Headings (HeadingId, HeadingTitle)
	select min(cast(Headings.HeadingId as bigint)) HeadingId, Headings.Title
	  from PricingAddenda
	  join Headings on Headings.HeadingId = PricingAddenda.HeadingId
	               and Headings.Active = 1
	 where coalesce(PricingAddenda.DistrictId,0) in (0,@DistrictId)
	   and PricingAddenda.CategoryId = @CategoryId
	 group by Headings.Title
	union
	select min((cast(case when Keywords.KeywordId is null then 0 else Keywords.KeywordId end as bigint) * cast(4294967296 as bigint)) + cast(Headings.HeadingId as bigint)) HeadingId, Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end HeadingTitle
	  from PricingAddenda
	  join Headings on Headings.HeadingId = PricingAddenda.HeadingId
	               and Headings.Active = 1
	  join Keywords on Keywords.KeywordId = PricingAddenda.KeywordId
	               and Keywords.Active = 1
	 where coalesce(PricingAddenda.DistrictId,0) in (0,@DistrictId)
	   and PricingAddenda.CategoryId = @CategoryId
	 group by Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end
/*
select min(cast(Headings.HeadingId as bigint)) HeadingId, Headings.Title HeadingTitle
	  from Items 
	  join Headings on Headings.HeadingId = Items.HeadingId
				   and Headings.CategoryId in (0, @CategoryId)
	 where Items.DistrictId = @DistrictId
	   and Items.CategoryId = @CategoryId
	   and Items.Active = 1
	   and (exists(select Detail.DetailId 
	                 from Detail 
			 		 join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
					                  and Requisitions.DateEntered > dateadd(year,-4,getdate()) 
				    where Detail.ItemId = Items.ItemId)
			or exists(select Crossrefs.CrossRefId
			            from CrossRefs
					   where CrossRefs.ItemId = Items.ItemId
					     and CrossRefs.DateUpdated > dateadd(year,-4,getdate())))
	group by Headings.Title
	union
	select min((cast(case when Keywords.KeywordId is null then 0 else Keywords.KeywordId end as bigint) * cast(4294967296 as bigint)) + cast(Headings.HeadingId as bigint)) HeadingId, Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end HeadingTitle
	  from Items
	  join Headings on Headings.HeadingId = Items.HeadingId
				   and Headings.CategoryId = Items.CategoryId
				   and (   Headings.DistrictId is null
						or Headings.DistrictId in (0, @DistrictId))
	  join Keywords on Keywords.KeywordId = Items.KeywordId
				   and Keywords.CategoryId in (0, Items.CategoryId)
				   and (   Keywords.DistrictId is null
						or Keywords.DistrictId in (0, @DistrictId))
	 where Items.DistrictId = @DistrictId
	   and Items.CategoryId = @CategoryId
	   and Items.Active = 1
	   and (exists(select Detail.DetailId 
	                 from Detail 
			 		 join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
					                  and Requisitions.DateEntered > dateadd(year,-4,getdate()) 
				    where Detail.ItemId = Items.ItemId)
			or exists(select Crossrefs.CrossRefId
			            from CrossRefs
					   where CrossRefs.ItemId = Items.ItemId
					     and CrossRefs.DateUpdated > dateadd(year,-4,getdate())))
	 group by Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end
*/
end

select HeadingId, HeadingTitle from @Headings order by HeadingTitle
```
