# View: `dbo.vw_RequisitionCatalogList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `CatalogId` | int | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `AwardsCatalogList` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCatalogs` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RequisitionCatalogList] as
SELECT Requisitions.RequisitionId, Catalog.CatalogId, Catalog.Name
  FROM Catalog with (nolock)
  JOIN Requisitions on Requisitions.CategoryId = Catalog.CategoryId
  JOIN Awards on Awards.BidHeaderId = Requisitions.BidHeaderId
             and Awards.Active = 1
  join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
                        and AwardsCatalogList.CatalogId = Catalog.CatalogId
 WHERE Catalog.Active = 1
 group by Requisitions.RequisitionId, Catalog.CatalogId, Catalog.Name
union (
   SELECT Requisitions.RequisitionId, Catalog.CatalogId, Catalog.Name
     FROM Catalog with (nolock)
     JOIN Requisitions on Requisitions.CategoryId = Catalog.CategoryId
     JOIN Budgets on Budgets.BudgetId = Requisitions.BudgetId
     JOIN DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId                               and DistrictCategories.CategoryId = Catalog.CategoryId                               and DistrictCategories.AllowAddenda = 1        join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId        join PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId                       and PPCatalogs.CatalogId = Catalog.CatalogId
    WHERE Catalog.Active = 1
    group by Requisitions.RequisitionId, Catalog.CatalogId, Catalog.Name
)
--ORDER BY Catalog.Name
```
