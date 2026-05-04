# Function: inline table-valued: `dbo.uf_SearchItemsHeadings`

_Generated on 2026-05-04T13:04:00.641Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SearchItemsHeadings` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2004-12-02 21:55:48 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from dbo.uf_SearchItemsHeadings(185831)
--select * from dbo.uf_SearchItemsHeadings(165945) order by Title

CREATE   function uf_SearchItemsHeadings (@pRequisitionId int) 
returns table
as
return (
select isnull(Headings.Title,'Last Year''s Addenda') Title, Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'') SearchLetter /*, dbo.uf_SearchKeywords(Headings.HeadingId) HeadingsKeywords*/
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
               and isnull(BidItems.Price,0) != 0
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.Active = 1
 where Requisitions.RequisitionId = @pRequisitionId
   and case isnull(Items.DistrictId,0) when 0 then Budgets.DistrictId else Items.DistrictId end = Budgets.DistrictId
 group by Headings.Title, Headings.Description, Headings.HeadingId
union (
select isnull(Headings.Title,'Last Year''s Addenda') Title, Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'') SearchLetter /*, dbo.uf_SearchKeywords(Headings.HeadingId) HeadingsKeywords*/
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Headings on Headings.CategoryId = Requisitions.CategoryId
               and Headings.Active = 1
  join Items on Items.HeadingId = Headings.HeadingId
            and Items.Active = 1
 where Requisitions.RequisitionId = @pRequisitionId
   and isnull(Requisitions.BidHeaderId,0) = 0
   and case isnull(Items.DistrictId,0) when 0 then Budgets.DistrictId else Items.DistrictId end = Budgets.DistrictId
 group by Headings.Title, Headings.Description, Headings.HeadingId
)
union (
SELECT isnull(Headings.Title,'Last Year''s Addenda') Title, Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'') SearchLetter
  from Requisitions with (nolock)
  join Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           and Bids.Active = 1
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join CrossRefs on CrossRefs.CatalogId = BidsCatalogList.CatalogId
                and Crossrefs.Active = 1
  join Items on Items.ItemId = CrossRefs.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.Active = 1
 where Requisitions.RequisitionId = @pRequisitionId
   and Requisitions.CategoryId = 82 -- Math Manipulatives
)
)
```
