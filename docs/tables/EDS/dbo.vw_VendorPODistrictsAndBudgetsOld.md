# View: `dbo.vw_VendorPODistrictsAndBudgetsOld`

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
| 8 | `SummaryName` | varchar(111) | YES |  |  |
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
create   view  [dbo].[vw_VendorPODistrictsAndBudgetsOld] as
select District.DistrictId, Budgets.BudgetId, VendorSessions.VendorSessionId, VendorSessions.VendorId, District.Name as DistrictName, Budgets.Name as BudgetName, isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
       rtrim(ltrim(District.Name)) + ' / ' + rtrim(ltrim(Budgets.Name)) + 
         case (select count(*) 
                 from PO with (nolock) 
                 join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
                                  and Requisitions.BudgetId = Budgets.BudgetId 
                                  and Requisitions.OrderDate >= case PO.VendorId when 3 then CAST('01/01/' + CAST(year(Budgets.StartDate) as CHAR(4)) as datetime) else cast('03/01/2010' as datetime) end--DATEADD(month,-9,getdate())
                where PO.VendorId = VendorSessions.VendorId) 
           when 0 then '' 
           else ' ( ' + 
             cast((select count(*) 
                     from PO with (nolock) 
                     join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
                                      and Requisitions.BudgetId = Budgets.BudgetId 
                                      and Requisitions.OrderDate >= case PO.VendorId when 3 then CAST('01/01/' + CAST(year(Budgets.StartDate) as CHAR(4)) as datetime) else cast('03/01/2010' as datetime) end--DATEADD(month,-9,getdate())
                    where PO.VendorId = VendorSessions.VendorId 
                      and PO.UploadId is null
                      and PO.Cancelled is null) as varchar(10)) 
             + ' / ' + 
             cast((select count(*) 
                     from PO with (nolock) 
                     join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
                                      and Requisitions.BudgetId = Budgets.BudgetId 
                                      and Requisitions.OrderDate >= case PO.VendorId when 3 then CAST('01/01/' + CAST(year(Budgets.StartDate) as CHAR(4)) as datetime) else cast('03/01/2010' as datetime) end--DATEADD(month,-9,getdate())
                    where PO.VendorId = VendorSessions.VendorId) as varchar(10))
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
 where Budgets.Active = 1
   and getdate() between dateadd(month,-6,Budgets.StartDate) and case VendorSessions.VendorId when 3 then cast('10/31/' + cast(year(Budgets.StartDate) as char(4)) as datetime) else dateadd(month,1,Budgets.EndDate) end
   and ((select count(*) 
                 from PO with (nolock) 
                 join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
                                  and Requisitions.BudgetId = Budgets.BudgetId 
                                  and Requisitions.OrderDate >= case PO.VendorId when 3 then CAST('01/01/' + CAST(year(Budgets.StartDate) as CHAR(4)) as datetime) else cast('03/01/2010' as datetime) end --DATEADD(month,-9,getdate())
                where PO.VendorId = VendorSessions.VendorId) > 0
         or getdate() between DATEADD(year,-1,Budgets.StartDate) and DATEADD(year,-1,Budgets.EndDate))
```
