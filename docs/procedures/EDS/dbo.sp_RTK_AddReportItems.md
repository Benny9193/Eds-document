# Procedure: `dbo.sp_RTK_AddReportItems`

_Generated on 2026-05-04T13:07:57.521Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RTK_AddReportItems` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-03-21 15:18:19 |
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
| `RTK_ReportItems` | USER_TABLE |  |
| `RTK_Sites` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_RTK_AddReportItems @pDistrictId int, @pYear int
as
set nocount on
insert RTK_ReportItems ([Year], DistrictId, RTK_SitesId, CategoryId, ItemId, Quantity, DetailId)
select Year(Budgets.StartDate), Budgets.DistrictId, RTK_Sites.RTK_SitesId, Requisitions.CategoryId, Detail.ItemId, Detail.Quantity, Detail.DetailId
  from Items
  join Detail on Detail.ItemId = Items.ItemId
             and isnull(Detail.VendorId,7691) != 7691
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.Requisitionid = (select top 1 Approvals.RequisitionId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6, 35) order by Approvals.ApprovalId)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.StartDate <= convert(datetime,'11/01/' + convert(varchar(16),@pYear))
              and Budgets.EndDate >= convert(datetime,'11/01/' + convert(varchar(16),@pYear))
  join District on District.DistrictId = Budgets.DistrictId
               and District.RTK = 1
               and District.DistrictId = @pDistrictId
  join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
  join RTK_Sites on RTK_Sites.RTK_SitesId = ShipLocations.RTK_SitesId
  left outer join RTK_ReportItems on RTK_ReportItems.ItemId = Detail.ItemId
                                 and RTK_ReportItems.[Year] = Year(Budgets.StartDate)
                                 and RTK_ReportItems.DistrictId = Budgets.DistrictId
                                 and RTK_ReportItems.DetailId = Detail.DetailId
 where Items.RTK = 1
   and RTK_ReportItems.RTK_ReportItemsId is null

set nocount off
```
