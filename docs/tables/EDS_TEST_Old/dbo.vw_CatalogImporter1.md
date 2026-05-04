# View: `dbo.vw_CatalogImporter1`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `VendorName` | varchar(50) | YES |  |  |
| 3 | `VendorCode` | varchar(16) | YES |  |  |
| 4 | `CategoryId` | int | YES |  |  |
| 5 | `VendorId` | int | YES |  |  |

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
create   view  [dbo].[vw_CatalogImporter1] as
SELECT CAT.Name CategoryName, VEN.Name VendorName, VEN.Code VendorCode, BH.CategoryId, BIDS.VendorId
FROM BidHeaders BH with (nolock)
JOIN Bids ON Bids.BidHeaderId = BH.BidHeaderId and Bids.Active = 1 
JOIN Category CAT ON CAT.CategoryId = BH.CategoryId
JOIN Vendors VEN ON Ven.VendorId = BIDS.VendorId
where GETDATE() between BH.EffectiveFrom and BH.EffectiveUntil and BH.Active=1
      and BIDS.VendorId <> 7691
Group By CAT.Name, VEN.Name, VEN.Code, BH.CategoryId, BIDS.VendorId      
--Order By CAT.Name, VEN.Name
```
