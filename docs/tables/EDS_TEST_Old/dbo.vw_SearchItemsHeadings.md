# View: `dbo.vw_SearchItemsHeadings`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `Title` | varchar(255) | NO |  |  |
| 3 | `Description` | varchar(4096) | YES |  |  |
| 4 | `HeadingId` | int | NO |  |  |
| 5 | `SearchLetter` | varchar(1) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SearchItemsHeadings] as
select Requisitions.RequisitionId, isnull(Headings.Title,'Last Year''s Addenda') Title, Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'') SearchLetter 
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
 where case isnull(Items.DistrictId,0) when 0 then Budgets.DistrictId else Items.DistrictId end = Budgets.DistrictId
 group by Requisitions.RequisitionId, Headings.Title, Headings.Description, Headings.HeadingId
union (
select Requisitions.RequisitionId, isnull(Headings.Title,'Last Year''s Addenda') Title, Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'') SearchLetter 
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Headings on Headings.CategoryId = Requisitions.CategoryId
               and Headings.Active = 1
  join Items on Items.HeadingId = Headings.HeadingId
            and Items.Active = 1
 where isnull(Requisitions.BidHeaderId,0) = 0
   and case isnull(Items.DistrictId,0) when 0 then Budgets.DistrictId else Items.DistrictId end = Budgets.DistrictId
 group by Requisitions.RequisitionId, Headings.Title, Headings.Description, Headings.HeadingId
)
union (
SELECT Requisitions.RequisitionId, isnull(Headings.Title,'Last Year''s Addenda') Title, Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'') SearchLetter
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
 where Requisitions.CategoryId = 82 -- Math Manipulatives
 group by Requisitions.RequisitionId, isnull(Headings.Title,'Last Year''s Addenda'), Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'')
)
```
