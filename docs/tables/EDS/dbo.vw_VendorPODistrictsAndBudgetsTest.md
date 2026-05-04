# View: `dbo.vw_VendorPODistrictsAndBudgetsTest`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 8 | `SummaryName` | varchar(150) | YES |  |  |
| 9 | `BudgetFilterId` | int | YES |  |  |

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
--select * from vw_VendorPODistrictsAndBudgets db where BudgetId = 7615 order by db.DistrictName, db.BudgetName
--select max(VendorSessionId) from vw_VendorPODistrictsAndBudgets db where BudgetId = 7615
--select * from Budgets where BudgetId = 7615
--select * from PO where POId = 1435887

create   view  [dbo].[vw_VendorPODistrictsAndBudgetsTest] as
select District.DistrictId, Budgets.BudgetId, VendorSessions.VendorSessionId, VendorSessions.VendorId, District.Name as DistrictName, Budgets.Name as BudgetName, isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
       rtrim(ltrim(District.Name)) + ' / ' + rtrim(ltrim(Budgets.Name)) + 
/*         case ( select COUNT(*) TotalPOs
				  from PO with (nolock) 
				  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
				                   and Requisitions.BudgetId = Budgets.BudgetId
				 where Requisitions.OrderDate >= CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime))
           when 0 then '' 
           else ' ( ' + 
             cast(( select COUNT(*) TotalPOs
					  from Requisitions with (nolock) 
					  join PO on PO.RequisitionId = Requisitions.RequisitionId
					         and PO.VendorId = DistrictVendor.VendorId
					 where Requisitions.BudgetId = Budgets.BudgetId
					   and Requisitions.OrderDate >=  CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime)) as varchar(10) ) 
             + ' / ' + 
             cast(( select count(*) ReadyForUpload
					  from Requisitions with (nolock) 
					  join PO on PO.RequisitionId = Requisitions.RequisitionId
					         and PO.VendorId = DistrictVendor.VendorId
							 and PO.UploadId is null 
							 and PO.Cancelled is null
					 where Requisitions.BudgetId = Budgets.BudgetId
					   and Requisitions.OrderDate >=  CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime)) as varchar(10))
             + ' )' 
         end */
         case when POCounts.TotalPOs = 0 then '' else '( ' + cast(POCounts.TotalPOs as varchar) + ' / ' + cast(POCounts.ReadyForUpload as varchar) + ' )' end as SummaryName, CAST(substring(Budgets.Name,1,4) as int) as BudgetFilterId
  from VendorSessions with (nolock)
  join DistrictVendor on DistrictVendor.VendorId = VendorSessions.VendorId
  join District on District.DistrictId = DistrictVendor.DistrictId
               and District.Active = 1
               and District.County != 'TEST'
               and isnull(District.State,'') != ''
               and ISNULL(District.DistrictCode,'') != ''
  join Budgets on Budgets.DistrictId = DistrictVendor.DistrictId
              and Budgets.Active = 1
              and Budgets.EndDate > dateadd(day,-45,getdate())
/*
  from Budgets with (nolock)
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and District.County != 'TEST'
               and isnull(District.State,'') != ''
               and ISNULL(District.DistrictCode,'') != ''
  join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
  join VendorSessions on VendorSessions.VendorId = DistrictVendor.VendorId
*/
  outer apply (select count(*) TotalPOs, sum(case when PO.UploadId is null and PO.Cancelled is null then 1 else 0 end) ReadyForUpload
                 from Requisitions with (nolock)
				 join PO on PO.RequisitionId = Requisitions.RequisitionId
				        and PO.VendorId = VendorSessions.VendorId
				where Requisitions.BudgetId = Budgets.BudgetId
				  and Requisitions.OrderDate >= datefromparts(year(Budgets.StartDate)-1,12,1)) POCounts
 where POCounts.TotalPOs > 0
/*   and ( exists(select Requisitions.RequisitionId
					  from Requisitions with (nolock) 
					  join PO on PO.RequisitionId = Requisitions.RequisitionId
					         and PO.VendorId = DistrictVendor.VendorId
					 where Requisitions.BudgetId = Budgets.BudgetId
					   and Requisitions.OrderDate >= datefromparts(year(Budgets.StartDate)-1,12,1) ))
*/

/*
select District.DistrictId, Budgets.BudgetId, VendorSessions.VendorSessionId, VendorSessions.VendorId, District.Name as DistrictName, Budgets.Name as BudgetName, isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
       rtrim(ltrim(District.Name)) + ' / ' + rtrim(ltrim(Budgets.Name)) + 
         case pc.TotalPOs 
           when 0 then '' 
           else ' ( ' + 
             cast(pc.POsReadyForUpload as varchar(10)) 
             + ' / ' + 
             cast(pc.TotalPOs as varchar(10))
             + ' )' 
         end as SummaryName, CAST(substring(Budgets.Name,1,4) as int) as BudgetFilterId
  from Budgets with (nolock)
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and District.County != 'TEST'
               and isnull(District.State,'') != ''
               and ISNULL(District.DistrictCode,'') != ''
  join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
  join VendorSessions on VendorSessions.VendorId = DistrictVendor.VendorId
  join (select b1.BudgetId, PO.VendorId, COUNT(*) TotalPOs, sum(case when PO.UploadId is null and PO.Cancelled is null then 1 else 0 end) POsReadyForUpload
          from PO with (nolock) 
          join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
          join Budgets b1 on b1.BudgetId = Requisitions.BudgetId
                         and getdate() between b1.VisibleFrom and dateadd(month,1,b1.EndDate)
--         where Requisitions.OrderDate >= cast('03/01/2010' as datetime) 
         where Requisitions.OrderDate >= case PO.VendorId 
		                                   when 03 then CAST('12/01/' + CAST(year(B1.StartDate)-1 as CHAR(4)) as datetime) 
										   else cast('03/01/2010' as datetime) 
										 end--DATEADD(month,-9,getdate())
         group by b1.BudgetId, PO.VendorId) pc on pc.BudgetId = Budgets.BudgetId
	                                          and pc.VendorId = DistrictVendor.VendorId
 where Budgets.Active = 1
   and (   getdate() between Budgets.VisibleFrom and 
             case VendorSessions.VendorId 
               when 03 then cast('10/31/' + cast(year(Budgets.StartDate) as char(4)) as datetime) 
               else dateadd(month,1,Budgets.EndDate) 
             end
        or (select COUNT(*)
			  from Requisitions r
			  join PO on PO.RequisitionId = r.RequisitionId
					 and PO.VendorId = DistrictVendor.VendorId
             where r.BudgetId = Budgets.BudgetId
               and r.OrderDate > 
					 case VendorSessions.VendorId 
					   when 03 then cast('10/31/' + cast(year(Budgets.StartDate) as char(4)) as datetime) 
					   else dateadd(month,1,Budgets.EndDate) 
					 end) > 0)
--   and getdate() between Budgets.VisibleFrom and dateadd(month,1,Budgets.EndDate)
   and (pc.TotalPOs > 0
        or getdate() between DATEADD(year,-1,Budgets.StartDate) and DATEADD(year,-1,Budgets.EndDate))
*/
```
