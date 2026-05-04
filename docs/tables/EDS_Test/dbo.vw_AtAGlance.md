# View: `dbo.vw_AtAGlance`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CSRepId` | int | NO |  |  |
| 2 | `CSRepName` | varchar(30) | NO |  |  |
| 3 | `DistrictId` | int | NO |  |  |
| 4 | `DistrictName` | varchar(50) | NO |  |  |
| 5 | `BudgetId` | int | NO |  |  |
| 6 | `BudgetName` | varchar(30) | NO |  |  |
| 7 | `Schedule` | varchar(50) | NO |  |  |
| 8 | `ReqCount` | int | NO |  |  |
| 9 | `ProcessedReqCount` | int | NO |  |  |
| 10 | `ReqPOCount` | int | NO |  |  |
| 11 | `DownloadedCount` | int | NO |  |  |
| 12 | `ManualPOCount` | int | NO |  |  |
| 13 | `POCount` | int | NO |  |  |
| 14 | `ReadyToBidCount` | int | NO |  |  |
| 15 | `OutToBidCount` | int | NO |  |  |
| 16 | `NeedingToBeBidCount` | int | NO |  |  |
| 17 | `BAApprovals` | int | NO |  |  |
| 18 | `ReqsOverBudget` | int | NO |  |  |
| 19 | `ExcessiveReqs` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `CSRep` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `ScheduleTypes` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create    view  [dbo].[vw_AtAGlance] as
select isnull(District.CSRepId,0) CSRepId, isnull(CSRep.Name,'') CSRepName, District.DistrictId, isnull(District.Name,'') DistrictName, Budgets.BudgetId, isnull(Budgets.Name,'') BudgetName, ISNULL(ScheduleTypes.Name,'') Schedule,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
        order by ap.ApprovalDate desc),0) != 4),0) ReqCount,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where exists(select ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
		  and ap.StatusId in (6,35,45,49))),0) ProcessedReqCount,
isnull((select COUNT(*)
  from
  (select R1.RequisitionId, Detail.VendorId
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
   join Detail on Detail.RequisitionId = R1.RequisitionId
              and isnull(Detail.VendorId,0) not in (0, 7691)
  where isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
        order by ap.ApprovalDate desc),0) != 4
  group by R1.RequisitionId, Detail.VendorId) ss),0) ReqPOCount,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where exists(select ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId = 35)),0) DownloadedCount,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where exists(select ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId in (45, 49))),0) ManualPOCount,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
   join PO on PO.RequisitionId = R1.RequisitionId),0) POCount,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where (select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
        order by ap.ApprovalDate desc) = 27),0) ReadyToBidCount,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where (select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
        order by ap.ApprovalDate desc) = 29),0) OutToBidCount,
isnull((select COUNT(*)
   from Requisitions R1 
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
        order by ap.ApprovalDate desc),0) not in (4, 27, 29)
    and (select count(*) from Detail D1 with (nolock) where D1.RequisitionId = R1.RequisitionId and D1.ItemMustBeBid = 1) > 0),0) NeedingToBeBidCount,
ISNULL((select count(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
        order by ap.ApprovalDate desc),0) not in (4, 6, 27)
    and (select top 1 a.Level
           from Approvals a with (nolock) 
          where a.RequisitionId = R1.RequisitionId
          order by a.ApprovalDate desc, a.ApprovalId desc) = 2),0) BAApprovals,
ISNULL((select count(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
        order by ap.ApprovalDate desc),0) not in (4, 6, 27)
    and (
          (select top 1 ba.BudgetAccountId
             from BudgetAccounts ba with (nolock)
            where ba.BudgetAccountId = R1.BudgetAccountId
              and ba.UseAllocations = 1
              and ba.AmountAvailable < 0) IS not null
         or
          (select top 1 ua.UserAccountId
             from UserAccounts ua with (nolock)
            where ua.UserAccountId = R1.UserAccountId
              and ua.UseAllocations = 1
              and ua.AllocationAvailable < 0) is not null
        )),0) ReqsOverBudget,
ISNULL((select count(*)
   from Users U1, Category c1 with (nolock)
  where U1.DistrictId = District.DistrictId
    and U1.Active = 1
    and c1.Active = 1
    and (select COUNT(*)
           from Requisitions r2 with (nolock)
          where isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R2.RequisitionId
        order by ap.ApprovalDate desc),0) not in (4, 6, 27) 
            and r2.UserId = U1.UserId
            and r2.CategoryId = c1.CategoryId
            and r2.BudgetId = Budgets.BudgetId) > 5),0) ExcessiveReqs
  from District with (nolock)
  join Budgets on Budgets.DistrictId = District.DistrictId
              and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
  left outer join CSRep on CSRep.CSRepId = District.CSRepId
  left outer join ScheduleTypes on ScheduleTypes.ScheduleId = isnull(District.ScheduleId,0)
 where District.Active = 1
   and District.County != 'TEST'
   and isnull(District.State,'') != ''
   and District.CooperativeBids = 1
 group by isnull(District.CSRepId,0), isnull(CSRep.Name,''), District.DistrictId, isnull(District.Name,''), Budgets.BudgetId, isnull(Budgets.Name,''), ISNULL(ScheduleTypes.name,'')
-- order by isnull(District.Name,''), isnull(Budgets.Name,'')
```
