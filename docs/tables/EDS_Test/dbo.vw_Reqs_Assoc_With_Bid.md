# View: `dbo.vw_Reqs_Assoc_With_Bid`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `RequisitionId` | int | NO |  |  |
| 4 | `ApprovalsStatusId` | int | NO |  |  |
| 5 | `WaitingBidReadyFlag` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `BidHeaderDetail` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_RptMarkedReadyEmailBlastStats`](dbo.vw_RptMarkedReadyEmailBlastStats.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_Reqs_Assoc_With_Bid] as
select BHD.BidHeaderId, District.DistrictId, Req.RequisitionId, Isnull(Approvals.StatusId,0) ApprovalsStatusId, 
       Case Isnull(Approvals.StatusId,0) When 29 Then 1 Else 0 End WaitingBidReadyFlag  
from BidHeaderDetail BHD
Join BidRequestItems BRI ON BRI.BidRequestItemId = BHD.BidRequestItemId AND BRI.Active = 1  -- ADDED KJM 7/28/2022
join Detail ON Detail.DetailId = BHD.DetailId
Join Requisitions Req ON Req.RequisitionId=Detail.RequisitionId
left outer Join Approvals ON Approvals.RequisitionId = Req.RequisitionId
                         and Approvals.ApprovalId=(Select Top 1 ApprovalId From Approvals Where Approvals.RequisitionId = Req.RequisitionId Order By Approvals.ApprovalDate Desc)
Join Budgets ON Budgets.BudgetId=Req.BudgetId
Join District ON District.DistrictId=Budgets.DistrictId
Where Req.Active=1 
--      and Approvals.StatusId = 29  /* 29="Out to Bid - Waiting Response" */
      --and BHD.BidHeaderId = 7465
Group By BHD.BidHeaderId, District.DistrictId, Req.RequisitionId, Isnull(Approvals.StatusId,0), Case Isnull(Approvals.StatusId,0) When 29 Then 1 Else 0 End
```
