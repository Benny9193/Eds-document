# View: `dbo.vw_BidVendorItemCodes`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryId` | int | YES |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `VendorItemCode` | varchar(50) | YES |  |  |
| 5 | `ManufacturerBid` | varchar(50) | YES |  |  |
| 6 | `ManufPartNoBid` | varchar(50) | YES |  |  |
| 7 | `BidHeaderId` | int | YES |  |  |
| 8 | `PageNo` | int | YES |  |  |
| 9 | `BidResultsId` | int | NO |  |  |

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
| `dbo.usp_BidRequestItemMergeDetailDavidTest_notused` | SQL_STORED_PROCEDURE |

## Definition

```sql
create   view  [dbo].[vw_BidVendorItemCodes] as
select BidHeaders.CategoryId, BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode, BidResults.ManufacturerBid, BidResults.ManufPartNoBid, BidHeaders.BidHeaderId, BidResults.PageNo, BidResults.BidResultsId
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
				 and BidImports.VendorId != 7691
  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
                 and BidHeaders.BidType = 1
                 and BidHeaders.EffectiveFrom > dateadd(year,-2,getdate())
 where BidResults.ItemBidType = 'S'
   and BidResults.VendorItemCode != ''
   and BidResults.VendorItemCode is not null
-- group by BidHeaders.CategoryId, BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode, BidResults.ManufacturerBid, BidResults.ManufPartNoBid, BidHeaders.BidHeaderId, BidResults.PageNo
```
