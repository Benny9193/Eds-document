# View: `dbo.vw_InventoryRange`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FacilityNumber` | varchar(20) | YES |  |  |
| 2 | `Base` | int | YES |  |  |
| 3 | `SurveyYear` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.RTK_Inventories` | unresolved |
| `dbo.RTK_ReportItems` | unresolved |
| `dbo.RTK_Sites` | unresolved |
| [`eds.dbo.RTK_Inventories`](../eds/dbo.RTK_Inventories.md) | cross-database |
| [`eds.dbo.RTK_ReportItems`](../eds/dbo.RTK_ReportItems.md) | cross-database |
| [`eds.dbo.RTK_Sites`](../eds/dbo.RTK_Sites.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view vw_InventoryRange as
select s.NJEIN FacilityNumber, coalesce(inv.RTK_InventoryYear,2013) Base, coalesce(Years.[Year],2013) [SurveyYear]
  from eds.dbo.RTK_Sites s
  outer apply (select ri.[Year] from eds.dbo.RTK_ReportItems ri where ri.[Year] >= 2013 group by ri.[Year]) Years
  outer apply (select i.RTK_InventoryYear from eds.dbo.RTK_Inventories i where i.RTK_SiteId = s.RTK_SitesId and i.RTK_InventoryYear <= Years.[Year]) inv
  outer apply (select top 1 i1.RTK_InventoryYear from eds.dbo.RTK_Inventories i1 where i1.RTK_SiteId = s.RTK_SitesId and i1.RTK_InventoryYear <= coalesce(inv.RTK_InventoryYear,2013) order by i1.RTK_InventoryYear desc) inv1
```
