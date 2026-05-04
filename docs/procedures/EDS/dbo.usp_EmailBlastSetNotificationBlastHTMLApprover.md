# Procedure: `dbo.usp_EmailBlastSetNotificationBlastHTMLApprover`

_Generated on 2026-05-04T14:49:07.458Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_EmailBlastSetNotificationBlastHTMLApprover` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-03-31 21:22:24 |
| Modified | 2024-03-01 12:48:44 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pApproverEmailBlastId` | IN | int |  |
| 2 | `@pRequistionerEmailBlastId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ApprovalsHistory` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Notifications` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `vw_DetailNotifications` | VIEW |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.usp_EmailBlastProcessOrderDetailChangeNotifications` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE         procedure [dbo].[usp_EmailBlastSetNotificationBlastHTMLApprover]
@pApproverEmailBlastId int,
@pRequistionerEmailBlastId int  
as

set nocount on

Update Notifications
   Set EmailHTMLTable = SSApproverBlast.HTMLTable
From 
(
Select N2.EmailBlastId, N2.NotificationId, ReqBlastData.HTMLTable 
From Notifications N2
Join 
(
Select SS2.ApproverUserId, 
'<table border="1" cellpadding="1" cellspacing="1" style="height: 79px"><tbody>' +
'<tr><td>Username</td><td>Attention</td><td>Requisitions</td></tr>' +
STRING_AGG(   
  '<tr>' +
  '<td>' + SS2.UserName  + '</td>' +
  '<td>' + SS2.AttnRequisitioner + '</td>' +
  '<td>' + SS2.Reqs + '</td>' +
  '</tr>' 
, '') WITHIN GROUP (ORDER BY SS2.UserName) +
  '</tbody></table>' As HTMLTable 
From
(
Select SS.ApproverUserId, 
       SS.UserName, SS.AttnRequisitioner, STRING_AGG(Cast(SS.RequisitionNumber as nvarchar(max)),', ') WITHIN GROUP (ORDER BY SS.RequisitionNumber) Reqs
From
(
select Approvals.ApprovalById ApproverUserId,
       requser.UserId ReqUserId, requser.UserName, requser.Attention AttnRequisitioner, req.RequisitionNumber 
From Notifications N
Join vw_DetailNotifications DN ON DN.NotificationId = N.NotificationId 
--Join DetailNotifications DN ON DN.NotificationId = N.NotificationId 
Join Detail DTL ON DTL.DetailId = DN.DetailId
Join Requisitions REQ ON REQ.RequisitionId = DTL.RequisitionId
Join Users ReqUser ON ReqUser.UserId = REQ.UserId  
Join Budgets on Budgets.BudgetId = REQ.BudgetId
Join ApprovalsHistory Approvals on Approvals.RequisitionId = REQ.RequisitionId
              and Approvals.StatusId in (2,3)
Where REQ.UserId != Approvals.ApprovalById  -- Approver Only
  and N.EmailBlastId = @pRequistionerEmailBlastId
--  and Approvals.ApprovalById = @pUserId
group by Approvals.ApprovalById, --N.NotificationId,
         requser.UserId, requser.UserName, requser.Attention, req.RequisitionNumber 
) SS
Group By SS.ApproverUserId,
         SS.ReqUserId, SS.UserName, SS.AttnRequisitioner
) SS2
Group By SS2.ApproverUserId 
) ReqBlastData ON ReqBlastData.ApproverUserId = N2.UserId
Where N2.EmailBlastId = @pApproverEmailBlastId
) SSApproverBlast
Where SSApproverBlast.NotificationId = Notifications.NotificationId

set nocount on
```
