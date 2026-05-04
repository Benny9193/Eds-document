# View: `dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionersBlastId` | int | YES |  |  |
| 2 | `ApproverUserId` | int | YES |  |  |
| 3 | `EmailHTMLTable` | nvarchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Notifications` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_DetailNotifications` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE         view  [dbo].[vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed]
  as 
Select SS2.RequisitionersBlastId, SS2.ApproverUserId,                                                  -- added fields 3/31
'<table border="1" cellpadding="1" cellspacing="1" style="height: 79px"><tbody>' +
'<tr><td>Username</td><td>Attention</td><td>Requisitions</td></tr>' +
STRING_AGG(   
  '<tr>' +
  '<td>' + SS2.UserName  + '</td>' +
  '<td>' + SS2.AttnRequisitioner + '</td>' +
  '<td>' + SS2.Reqs + '</td>' +
  '</tr>' 
, '') WITHIN GROUP (ORDER BY SS2.UserName) +
  '</tbody></table>' EmailHTMLTable
From
(
Select SS.RequisitionersBlastId, SS.ApproverUserId,                                                    -- added fields 3/31
       SS.UserName, SS.AttnRequisitioner, STRING_AGG(Cast(SS.RequisitionNumber as nvarchar(max)),', ') WITHIN GROUP (ORDER BY SS.RequisitionNumber) Reqs
From
(
select N.EmailBlastId RequisitionersBlastId, Approvals.ApprovalById ApproverUserId,                   -- added fields 3/31
       requser.UserId, requser.UserName, requser.Attention AttnRequisitioner, req.RequisitionNumber 
From Notifications N
Join vw_DetailNotifications DN ON DN.NotificationId = N.NotificationId 
--Join DetailNotifications DN ON DN.NotificationId = N.NotificationId 
Join Detail DTL ON DTL.DetailId = DN.DetailId
Join Requisitions REQ ON REQ.RequisitionId = DTL.RequisitionId
Join Users ReqUser ON ReqUser.UserId = REQ.UserId  
Join Budgets on Budgets.BudgetId = REQ.BudgetId
Join Approvals on Approvals.RequisitionId = REQ.RequisitionId
              and Approvals.StatusId in (2,3)
Where REQ.UserId != Approvals.ApprovalById  -- Approver Only
--  and N.EmailBlastId = @pRequistionerEmailBlastId
--  and Approvals.ApprovalById = @pUserId
group by N.EmailBlastId, Approvals.ApprovalById,                                                      -- added fields 3/31
          requser.UserId, requser.UserName, requser.Attention, req.RequisitionNumber 
) SS
Group By SS.RequisitionersBlastId, SS.ApproverUserId,                                                 -- added fields 3/31
         SS.UserId, SS.UserName, SS.AttnRequisitioner
) SS2
Group By SS2.RequisitionersBlastId, SS2.ApproverUserId
```
