# View: `dbo.vw_RequisitionsShippingLocations`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Requisitionid` | int | NO |  |  |
| 2 | `ShippingId` | int | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `ShipLocations` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RequisitionsShippingLocations] as
SELECT Requisitions.Requisitionid, ShipLocations.ShippingId, ShipLocations.Name
  FROM Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join ShipLocations on ShipLocations.DistrictId = Budgets.DistrictId 
                    and ShipLocations.Active = 1
--ORDER BY ShipLocations.Name
```
