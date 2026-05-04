# View: `dbo.vw_BudgetPrice`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidPrice` | money | YES |  |  |
| 2 | `BidItemId` | int | YES |  |  |
| 3 | `CrossRefId` | int | NO |  |  |
| 4 | `VendorId` | int | YES |  |  |
| 5 | `CatalogId` | int | YES |  |  |
| 6 | `CatalogPrice` | money | YES |  |  |
| 7 | `GrossPrice` | money | YES |  |  |
| 8 | `DiscountRate` | int | YES |  |  |
| 9 | `CatalogPage` | char(4) | YES |  |  |
| 10 | `PricePlanId` | int | YES |  |  |
| 11 | `AwardId` | int | YES |  |  |
| 12 | `VendorItemCode` | varchar(50) | YES |  |  |
| 13 | `Alternate` | int | YES |  |  |
| 14 | `ItemMustBeBid` | int | NO |  |  |
| 15 | `CatalogYear` | char(2) | YES |  |  |
| 16 | `ItemId` | int | NO |  |  |
| 17 | `SortKey` | varchar(42) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Catalog` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Items` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_OrderBookTest` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
create   view  [dbo].[vw_BudgetPrice] as
          select round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear, Items.ItemId, right('00' + cast(99 - cast(isnull(Catalog.CatalogYear,'') as int) as varchar(2)),2) + right('0000' + cast(isnull(case isnumeric(CrossRefs.Page) when 1 then case convert(int,CrossRefs.Page) when 0 then 9999 else convert(int,CrossRefs.Page) end else 9999 end,9999) as varchar(4)),4) + cast(9999 - Catalog.CatalogId as varchar(4)) + right('0000000000000000' + cast(isnull(round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2),0) as varchar(16)),16) + right('0000000000000000' + cast(isnull(CrossRefs.CrossRefId,0) as varchar(16)),16) SortKey
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CrossRefs.Page) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
--                        and Catalog.CatalogYear = CrossRefs.CatalogYear
-- Above Line of Code Added 9/17/2004 DCH
           where Items.Active = 1
```
