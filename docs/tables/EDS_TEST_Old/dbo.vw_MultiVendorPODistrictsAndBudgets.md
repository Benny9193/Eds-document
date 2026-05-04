# View: `dbo.vw_MultiVendorPODistrictsAndBudgets`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `VendorSessionId` | int | NO |  |  |
| 4 | `DistrictName` | varchar(50) | YES |  |  |
| 5 | `BudgetName` | varchar(30) | YES |  |  |
| 6 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 7 | `BudgetFilterId` | int | YES |  |  |
| 8 | `CurrentBidPOCount` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `VendorSessions` | USER_TABLE |
| `VPOVendorLinks` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_MultiVendorPODistrictsAndBudgets] as
select District.DistrictId, Budgets.BudgetId, VendorSessions.VendorSessionId, District.Name as DistrictName, Budgets.Name as BudgetName, isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
       CAST(substring(Budgets.Name,1,4) as int) as BudgetFilterId,
/*       (select count(*) 
          from PO with (nolock) 
          join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
                           and Requisitions.BudgetId = Budgets.BudgetId 
          join VPOVendorLinks VPOL on VPOL.VendorId = PO.VendorId
                                  and VPOL.VPORegistrationId = VendorSessions.VPORegistrationId
         where PO.UploadId is null
           and PO.Cancelled is null) as UnExportedPOCount,
       (select count(*) 
          from PO with (nolock) 
          join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
                           and Requisitions.BudgetId = Budgets.BudgetId 
          join VPOVendorLinks VPOL on VPOL.VendorId = PO.VendorId
                                  and VPOL.VPORegistrationId = VendorSessions.VPORegistrationId) as TotalPOCount,
*/       (select COUNT(*)
          from PO with (nolock)
          join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
                           and Requisitions.BudgetId = Budgets.BudgetId 
/*          join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                         and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
                         and BidHeaders.Active = 1*/
          join VPOVendorLinks VPOL on VPOL.VendorId = PO.VendorId
                                  and VPOL.VPORegistrationId = VendorSessions.VPORegistrationId) as CurrentBidPOCount
  from Budgets with (nolock)
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and District.County != 'TEST'
               and isnull(District.State,'') != ''
               and ISNULL(District.DistrictCode,'') != ''
  join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
  join VPOVendorLinks on VPOVendorLinks.VendorId = DistrictVendor.VendorId
  join VendorSessions on VendorSessions.VPORegistrationId = VPOVendorLinks.VPORegistrationId
 where Budgets.Active = 1
   and getdate() between dateadd(month,-6,Budgets.StartDate) and dateadd(month,1,Budgets.EndDate)
 group by District.DistrictId, Budgets.BudgetId, VendorSessions.VendorSessionId, District.Name, Budgets.Name, isnull(DistrictVendor.VendorsAccountCode,''), Budgets.StartDate, Budgets.EndDate, VendorSessions.VPORegistrationId
```
