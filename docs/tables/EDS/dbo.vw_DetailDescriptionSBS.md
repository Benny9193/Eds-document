# View: `dbo.vw_DetailDescriptionSBS`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `ItemDescription` | varchar(2880) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.BidResults`](dbo.BidResults.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.BidsCatalogList`](dbo.BidsCatalogList.md) | USER_TABLE |
| [`dbo.BookTypes`](dbo.BookTypes.md) | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.DistrictCategories`](dbo.DistrictCategories.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| `dbo.uf_DetailItemDescription` | SQL_SCALAR_FUNCTION |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.rs_SBS_SchoolSummary_Detail`](dbo.rs_SBS_SchoolSummary_Detail.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_DetailDescriptionSBS]
AS  
    select Detail.DetailId,
           case 
             when (    isnull(BidHeaders.CompliantAlert,0) = 1 
                   and isnull(BidHeaders.BidType,0) = 2
                   and isnull(BidItems.BidItemId,0) != 0 
                   and BidItems.ItemBidType = 'Compliant')
               or (    isnull(BidHeaders.CompliantAlert,0) != 1
                   and isnull(BidItems.BidItemId,0) != 0 
                   and BidItems.ItemBidType = 'Compliant') then
/*               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then
                      CHAR(13) + char(10) +
                      CHAR(13) + char(10)
                 else ''
               end +
*/
               '** COMPLIANT ITEM - PLEASE REVIEW **' + CHAR(13) + CHAR(10) +
               isnull(rtrim(BidItems.Alternate),'') +
               case isnull(rtrim(BidResults.ManufacturerBid),'')
                 when '' then ''
                 else
                   char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
               end +
               case isnull(rtrim(BidResults.ManufPartNoBid),'')
                 when '' then ''
                 else
                   char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid)
               end +
			   case isnull(Detail.ExtraDescription,'')  
				 when '' then ''  
				 else char(13) + char(10) +   
				   case isnull(Category.ExtraTitle,'')  
					 when '' then 'Extra Information: '  
					 else isnull(Category.ExtraTitle,'')  
				   end + ' ' + 
				   isnull(Detail.ExtraDescription,'')  
			   end +
               CHAR(13) + char(10) +
               CHAR(13) + char(10) +
               'Bid As' + CHAR(13) + char(10)
             else ''
		   end + 
		   dbo.uf_DetailItemDescription(Requisitions.RequisitionId, Detail.ItemId) as ItemDescription
      from dbo.Detail with (nolock)
      join dbo.Items on Items.ItemId = Detail.ItemId
      join dbo.Category on Category.CategoryId = Items.CategoryId
      join dbo.Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join dbo.DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                                 and DistrictCategories.CategoryId = Requisitions.CategoryId
                                 and DistrictCategories.Active = 1
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
      left outer join dbo.BidItems on BidItems.BidItemId = Detail.BidItemId
      left outer join dbo.BidResults on BidResults.BidResultsId = BidItems.BidResultsId
      left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = case ISNULL(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
      left outer join dbo.CrossRefs as cxr on cxr.CrossRefId = 
        (select Top 1 CrossRefs.CrossRefId
           from dbo.CrossRefs with (nolock)
           join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
           join dbo.Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                                   and BidsCatalogList.CatalogId = Cat.CatalogId
          where CrossRefs.ItemId = Detail.ItemId
            and CrossRefs.Active = 1
          order by Catalog.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId)
/*
        (select Top 1 lxr.CrossRefId 
           from dbo.vw_LatestCrossRef lxr with (nolock) 
          where lxr.BidHeaderId = Requisitions.BidHeaderId 
            and lxr.ItemId = Detail.ItemId
          order by lxr.CatalogYear desc, lxr.CatalogPrice, lxr.CrossRefId)
*/
```
