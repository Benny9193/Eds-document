# Procedure: `dbo.usp_EmailBlastVarsOrderDetailChangeApprover_NotUsed`

_Generated on 2026-05-04T13:04:00.701Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_EmailBlastVarsOrderDetailChangeApprover_NotUsed` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-03-28 16:21:56 |
| Modified | 2022-04-06 13:07:27 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequistionerEmailBlastId` | IN | int |  |
| 2 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Notifications` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `vw_DetailNotifications` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       procedure [dbo].[usp_EmailBlastVarsOrderDetailChangeApprover_NotUsed]
@pRequistionerEmailBlastId int,
@pUserId int
as
declare @TableHTML varchar(max)

-- Note: This code was tested and works but it is not currently being used. 
--       It was being used in the "Variable Data SQL" tab of the blast.  As such, it would be executed for each email when the blast was "sent".  
--       Instead... the sproc: usp_EmailBlastProcessOrderDetailChangeNotifications executes the sproc: usp_EmailBlastSetNotificationBlastHTMLApprover which builds 
--                  the HTML to be included in the email content and saves it in the notifications table.  (immediately after the notification inserts are done.)  

set nocount on

Select @TableHTML = 
'<table border="1" cellpadding="1" cellspacing="1" style="height: 79px"><tbody>' +
'<tr><td>Username</td><td>Attention</td><td>Requisitions</td></tr>' +
STRING_AGG(   
  '<tr>' +
  '<td>' + SS2.UserName  + '</td>' +
  '<td>' + SS2.AttnRequisitioner + '</td>' +
  '<td>' + SS2.Reqs + '</td>' +
  '</tr>' 
, '') WITHIN GROUP (ORDER BY SS2.UserName) +
  '</tbody></table>'
From
(
Select SS.UserName, SS.AttnRequisitioner, STRING_AGG(Cast(SS.RequisitionNumber as nvarchar(max)),', ') WITHIN GROUP (ORDER BY SS.RequisitionNumber) Reqs
From
(
select requser.UserId, requser.UserName, requser.Attention AttnRequisitioner, req.RequisitionNumber 
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
  and N.EmailBlastId = @pRequistionerEmailBlastId
  and Approvals.ApprovalById = @pUserId
group by requser.UserId, requser.UserName, requser.Attention, req.RequisitionNumber 
) SS
Group By SS.UserId, SS.UserName, SS.AttnRequisitioner
) SS2


SELECT 'DistrictName', District.Name FROM Users JOIN District ON District.DistrictId=Users.DistrictId WHERE Users.UserId=@pUserId
UNION
Select 'UserReqInfoTable', @TableHTML

set nocount off
```
