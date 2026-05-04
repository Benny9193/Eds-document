# View: `dbo.vw_BidUPCs`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryId` | int | YES |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `VendorItemCode` | varchar(50) | YES |  |  |
| 5 | `BidHeaderId` | int | YES |  |  |
| 6 | `PageNo` | int | YES |  |  |
| 7 | `BidResultsId` | int | NO |  |  |
| 8 | `UPC_ISBN` | varchar(20) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidResults` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.usp_BidMatchRefs` | SQL_STORED_PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavid` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE     view  [dbo].[vw_BidUPCs] as
select BidHeaders.CategoryId, BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode, BidHeaders.BidHeaderId, BidResults.PageNo, BidResults.BidResultsId, BidResults.UPC_ISBN
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
                 and BidImports.VendorId != 7691
  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
	                 and BidHeaders.BidType = 1
	                 and BidHeaders.EffectiveFrom > dateadd(year,-2,getdate())
 where BidResults.ItemBidType = 'S'
   and BidResults.UPC_ISBN != ''
   and BidResults.UPC_ISBN is not null
-- group by BidHeaders.CategoryId, BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode, BidResults.ManufacturerBid, BidResults.ManufPartNoBid, BidHeaders.BidHeaderId, BidResults.PageNo
```
