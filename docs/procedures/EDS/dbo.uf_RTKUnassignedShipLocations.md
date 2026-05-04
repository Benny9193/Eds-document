# Function: inline table-valued: `dbo.uf_RTKUnassignedShipLocations`

_Generated on 2026-05-04T13:07:57.702Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RTKUnassignedShipLocations` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2005-07-07 19:00:31 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pYear` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `RTK_Sites` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function uf_RTKUnassignedShipLocations(@pDistrictId int, @pYear int)
returns table as

return
(
select ShipLocations.ShippingId, ShipLocations.[Name]
  from Items
  join Detail on Detail.ItemId = Items.ItemId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.Requisitionid = (select top 1 Approvals.RequisitionId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6, 35) order by Approvals.ApprovalId)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.StartDate <= convert(datetime,'11/01/' + convert(varchar(16),@pYear))
              and Budgets.EndDate >= convert(datetime,'11/01/' + convert(varchar(16),@pYear))
  join District on District.DistrictId = Budgets.DistrictId
               and District.RTK = 1
               and District.DistrictId = @pDistrictId
  join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
  left outer join RTK_Sites on RTK_Sites.RTK_SitesId = ShipLocations.RTK_SitesId
 where Items.RTK = 1
   and RTK_Sites.RTK_SitesId is null
 group by ShipLocations.ShippingId, ShipLocations.[Name]
)
```
