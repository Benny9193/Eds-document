# View: `dbo.vw_VendorPODistrictsAndBudgets`

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
| 8 | `SummaryName` | varchar(151) | YES |  |  |
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
--select * from vw_VendorPODistrictsAndBudgets db where VendorSessionId = (select top 1 VendorSessionId from VendorSessions where VendorSessions.VendorId = 9 order by VendorSessions.StartTime desc) order by db.DistrictName, db.BudgetName
--select max(VendorSessionId) from vw_VendorPODistrictsAndBudgets db where BudgetId = 7615
--select * from Budgets where BudgetId = 7615
--select * from PO where POId = 1435887

CREATE   view  [dbo].[vw_VendorPODistrictsAndBudgets] as
select District.DistrictId, Budgets.BudgetId, 
       VendorSessions.VendorSessionId, 
	   VendorSessions.VendorId, 
	   District.Name as DistrictName, 
	   Budgets.Name as BudgetName, 
	   isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
       rtrim(ltrim(District.Name)) + ' / ' + rtrim(ltrim(Budgets.Name)) + 
		 ' ( ' + cast(count(*) as varchar) + ' / ' + cast(sum(case when PO.UploadId is null and PO.Cancelled is null then 1 else 0 end) as varchar) + ' )' as SummaryName, 
		 CAST(substring(Budgets.Name,1,4) as int) as BudgetFilterId
  from PO with (nolock)
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.Active = 1
              and Budgets.EndDate > dateadd(day,-30,getdate())
  join VendorSessions on VendorSessions.VendorId = PO.VendorId
  join DistrictVendor on DistrictVendor.VendorId = PO.VendorId
                     and DistrictVendor.DistrictId = Budgets.DistrictId
  join District on District.DistrictId = DistrictVendor.DistrictId
               and District.Active = 1
               and District.County != 'TEST'
               and isnull(District.State,'') != ''
               and ISNULL(District.DistrictCode,'') != ''
			   and District.DistrictId not in (28, 46, 367) -- East Brunswick, Hide Lawrence Township, Brick Township
--  where VendorSessions.VendorSessionId = 1534630
  group by District.DistrictId, Budgets.BudgetId, 
       VendorSessions.VendorSessionId, 
	   VendorSessions.VendorId, 
	   District.Name, 
	   Budgets.Name, 
	   isnull(DistrictVendor.VendorsAccountCode,'')
/*
select District.DistrictId, Budgets.BudgetId, VendorSessions.VendorSessionId, VendorSessions.VendorId, District.Name as DistrictName, Budgets.Name as BudgetName, isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
       rtrim(ltrim(District.Name)) + ' / ' + rtrim(ltrim(Budgets.Name)) + 
         case when POCounts.TotalPOs = 0 then '' else '( ' + cast(POCounts.TotalPOs as varchar) + ' / ' + cast(POCounts.ReadyForUpload as varchar) + ' )' end as SummaryName, CAST(substring(Budgets.Name,1,4) as int) as BudgetFilterId
  from VendorSessions with (nolock)
  join DistrictVendor on DistrictVendor.VendorId = VendorSessions.VendorId
  join District on District.DistrictId = DistrictVendor.DistrictId
               and District.Active = 1
               and District.County != 'TEST'
               and isnull(District.State,'') != ''
               and ISNULL(District.DistrictCode,'') != ''
  join Budgets on Budgets.DistrictId = District.DistrictId
              and Budgets.Active = 1
              and Budgets.EndDate > dateadd(day,-30,getdate())
  outer apply (select count(*) TotalPOs, sum(case when PO.UploadId is null and PO.Cancelled is null then 1 else 0 end) ReadyForUpload
                 from PO with (nolock)
				 join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
				                  and Requisitions.BudgetId = Budgets.BudgetId
				                  and Requisitions.OrderDate >= datefromparts(year(Budgets.StartDate)-1,12,1) /* CAST('12/01/' + CAST(year(Budgets.StartDate)-1 as CHAR(4)) as datetime)*/
				where PO.VendorId = DistrictVendor.VendorId) POCounts
 where  POCounts.TotalPOs > 0 
 select * from District where DistrictCode = 'XE'
*/
```
