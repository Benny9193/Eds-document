# View: `dbo.vw_CatalogImporter1Dtl`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `VendorName` | varchar(50) | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidDescription` | varchar(512) | YES |  |  |
| 5 | `EffectiveFrom` | datetime | YES |  |  |
| 6 | `EffectiveUntil` | datetime | YES |  |  |
| 7 | `CategoryId` | int | YES |  |  |
| 8 | `VendorId` | int | YES |  |  |
| 9 | `BidHeaderActive` | tinyint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_CatalogImporter1Dtl] as
SELECT CAT.Name CategoryName, VEN.Name VendorName, BH.BidHeaderId, BH.Description BidDescription, BH.EffectiveFrom, BH.EffectiveUntil, BH.CategoryId, BIDS.VendorId, BH.Active BidHeaderActive
FROM BidHeaders BH with (nolock)
JOIN Bids ON Bids.BidHeaderId = BH.BidHeaderId and Bids.Active = 1 
JOIN Category CAT ON CAT.CategoryId = BH.CategoryId
JOIN Vendors VEN ON Ven.VendorId = BIDS.VendorId
where GETDATE() between BH.EffectiveFrom and BH.EffectiveUntil and BH.Active=1
      and BIDS.VendorId <> 7691
--Order By CAT.Name, VEN.Name
```
