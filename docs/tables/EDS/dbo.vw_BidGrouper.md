# View: `dbo.vw_BidGrouper`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MainBidHeaderId` | int | YES |  |  |
| 2 | `AltBidHeaderId` | int | YES |  |  |
| 3 | `BidType` | tinyint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Category` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_DMSBidDocuments_View`](dbo.vw_DMSBidDocuments_View.md) | VIEW |
| [`dbo.vw_DMSVendorBidDocuments_04232018`](dbo.vw_DMSVendorBidDocuments_04232018.md) | VIEW |
| [`dbo.vw_DMSVendorBidDocuments_View`](dbo.vw_DMSVendorBidDocuments_View.md) | VIEW |
| [`dbo.vw_DMSVendorBidDocuments_ViewTest`](dbo.vw_DMSVendorBidDocuments_ViewTest.md) | VIEW |
| [`dbo.vw_DMSVendorBidDocumentsTest`](dbo.vw_DMSVendorBidDocumentsTest.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_BidGrouper] as
select bh.BidHeaderId MainBidHeaderId, bcp.BidHeaderId AltBidHeaderId, bh.BidType
  from BidHeaders bh with (nolock)
  join Category on Category.CategoryId = bh.CategoryId
  join BidHeaders bcp on bcp.CategoryId = bh.CategoryId
					 and bcp.PricePlanId = bh.PricePlanId
					 and bcp.BidType = bh.BidType
					 and bcp.BidHeaderId = case when Category.Type = 3 then bh.BidHeaderId else case when ISNULL(bh.BidType,0) = 1 then bcp.BidHeaderId else bh.BidHeaderId end end
					 and bcp.BidAwardDate = bh.BidAwardDate
					 and bcp.Active = 1
 where bh.Active = 1
 group by bh.BidHeaderId, bcp.BidHeaderId, bh.BidType
```
