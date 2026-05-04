# View: `dbo.vw_VendorPODistrictsAndBudgetsCF`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `VendorSessionId` | int | NO |  |  |
| 4 | `VendorId` | int | NO |  |  |
| 5 | `DistrictName` | varchar(50) | YES |  |  |
| 6 | `BudgetName` | varchar(30) | YES |  |  |
| 7 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 8 | `TotalPOCount` | int | YES |  |  |
| 9 | `TotalPOAmount` | money | NO |  |  |
| 10 | `ExportedPOCount` | int | YES |  |  |
| 11 | `ExportedPOAmount` | money | NO |  |  |
| 12 | `WaitingPOCount` | int | YES |  |  |
| 13 | `WaitingPOAmount` | money | NO |  |  |
| 14 | `BudgetFilterId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `VendorSessions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from [vw_VendorPODistrictsAndBudgetsCF] 

--select * from vw_VendorPODistrictsAndBudgets db where BudgetId = 7615 order by db.DistrictName, db.BudgetName
--select max(VendorSessionId) from vw_VendorPODistrictsAndBudgets db where BudgetId = 7615
--select * from Budgets where BudgetId = 7615
--select * from PO where POId = 1435887

create   view  [dbo].[vw_VendorPODistrictsAndBudgetsCF] as
select District.DistrictId, Budgets.BudgetId, VendorSessions.VendorSessionId, VendorSessions.VendorId, District.Name as DistrictName, Budgets.Name as BudgetName, isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
	   (select COUNT(*) 
	      from Requisitions with (nolock)
	      join PO on PO.RequisitionId = Requisitions.RequisitionId
	             and PO.VendorId = VendorSessions.VendorId
	             and PO.Cancelled is null
	     where Requisitions.BudgetId = Budgets.BudgetId
	       and Requisitions.OrderDate >= case PO.VendorId 
	                                       when 03 then CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime) 
	                                       else cast('03/01/2010' as datetime) 
	                                     end) TotalPOCount,
	   isnull((select SUM(Amount) 
	      from Requisitions with (nolock)
	      join PO on PO.RequisitionId = Requisitions.RequisitionId
	             and PO.VendorId = VendorSessions.VendorId
	             and PO.Cancelled is null
	     where Requisitions.BudgetId = Budgets.BudgetId
	       and Requisitions.OrderDate >= case PO.VendorId 
	                                       when 03 then CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime) 
	                                       else cast('03/01/2010' as datetime) 
	                                     end),0) TotalPOAmount,
	   (select COUNT(*) 
	      from Requisitions with (nolock)
	      join PO on PO.RequisitionId = Requisitions.RequisitionId
	             and PO.VendorId = VendorSessions.VendorId
	             and PO.Cancelled is null
	             and PO.UploadId is not null
	     where Requisitions.BudgetId = Budgets.BudgetId
	       and Requisitions.OrderDate >= case PO.VendorId 
	                                       when 03 then CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime) 
	                                       else cast('03/01/2010' as datetime) 
	                                     end) ExportedPOCount,
	   isnull((select SUM(Amount) 
	      from Requisitions with (nolock)
	      join PO on PO.RequisitionId = Requisitions.RequisitionId
	             and PO.VendorId = VendorSessions.VendorId
	             and PO.Cancelled is null
	             and PO.UploadId is not null
	     where Requisitions.BudgetId = Budgets.BudgetId
	       and Requisitions.OrderDate >= case PO.VendorId 
	                                       when 03 then CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime) 
	                                       else cast('03/01/2010' as datetime) 
	                                     end),0) ExportedPOAmount,
	   (select COUNT(*) 
	      from Requisitions with (nolock)
	      join PO on PO.RequisitionId = Requisitions.RequisitionId
	             and PO.VendorId = VendorSessions.VendorId
	             and PO.Cancelled is null
	             and PO.UploadId is null
	     where Requisitions.BudgetId = Budgets.BudgetId
	       and Requisitions.OrderDate >= case PO.VendorId 
	                                       when 03 then CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime) 
	                                       else cast('03/01/2010' as datetime) 
	                                     end) WaitingPOCount,
	   isnull((select SUM(Amount) 
	      from Requisitions with (nolock)
	      join PO on PO.RequisitionId = Requisitions.RequisitionId
	             and PO.VendorId = VendorSessions.VendorId
	             and PO.Cancelled is null
	             and PO.UploadId is null
	     where Requisitions.BudgetId = Budgets.BudgetId
	       and Requisitions.OrderDate >= case PO.VendorId 
	                                       when 03 then CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime) 
	                                       else cast('03/01/2010' as datetime) 
	                                     end),0) WaitingPOAmount,
       CAST(substring(Budgets.Name,1,4) as int) as BudgetFilterId
  from Budgets with (nolock)
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and District.County != 'TEST'
               and isnull(District.State,'') != ''
               and ISNULL(District.DistrictCode,'') != ''
  join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
  join VendorSessions on VendorSessions.VendorId = DistrictVendor.VendorId
 where Budgets.Active = 1
   and (   getdate() between Budgets.VisibleFrom and 
             case VendorSessions.VendorId 
               when 03 then cast('10/31/' + cast(year(Budgets.StartDate) as char(4)) as datetime) 
               else dateadd(month,1,Budgets.EndDate) 
             end
        )
```
