# View: `dbo.vw_BidVendor`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `CategoryId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `Description` | varchar(512) | YES |  |  |
| 5 | `BidMessage` | varchar(1024) | YES |  |  |
| 6 | `EffectiveFrom` | datetime | YES |  |  |
| 7 | `EffectiveUntil` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidVendor] as
-- View created for use with Catalog Importer Clarion Program
SELECT BH.BidHeaderId, BH.CategoryId, BIDS.VendorId, BH.Description, BH.BidMessage, BH.EffectiveFrom, BH.EffectiveUntil
FROM BidHeaders BH with (nolock)
JOIN Bids ON Bids.BidHeaderId = BH.BidHeaderId and Bids.Active = 1 
where GETDATE() between BH.EffectiveFrom and BH.EffectiveUntil and BH.Active=1
-- and Bids.VendorId = 317
```
