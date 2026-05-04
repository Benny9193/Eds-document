# Procedure: `dbo.usp_EmailBlastVarsOrderDetailChangeRequistioner_NotUsed`

_Generated on 2026-05-04T13:43:19.159Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_EmailBlastVarsOrderDetailChangeRequistioner_NotUsed` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-03-28 16:23:50 |
| Modified | 2022-04-06 13:09:18 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pEmailBlastId` | IN | int |  |
| 2 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Notifications` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_DetailNotifications` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       procedure [dbo].[usp_EmailBlastVarsOrderDetailChangeRequistioner_NotUsed]
@pEmailBlastId int,
@pUserId int
as
declare @EmailContentHTML varchar(max)

-- Note: This code was tested and works but it is not currently being used. 
--       It was being used in the "Variable Data SQL" tab of the blast.  As such, it would be executed for each email when the blast was "sent".  
--       Instead... the sproc: usp_EmailBlastProcessOrderDetailChangeNotifications executes the sproc: usp_EmailBlastSetNotificationBlastHTMLRequisitioner which builds 
--                  the HTML to be included in the email content and saves it in the notifications table.  (immediately after the notification inserts are done.)  

set nocount on

Select @EmailContentHTML = 
'<table border="1" cellpadding="1" cellspacing="1" style="height: 79px"><tbody>' +
'<tr><td>Requisition#</td><td>Username</td><td>Attention</td><td></td><td>Vendor</td><td>Item Code</td><td>Price</td></tr>' +
STRING_AGG(   
  '<tr>' +
  '<td rowspan="2">' + cast(REQ.RequisitionNumber as nvarchar(max)) + '</td>' +
  '<td rowspan="2">' + cast(ReqUser.UserName as varchar) + '</td>' +
  '<td rowspan="2">' + cast(ReqUser.Attention as varchar(50)) + '</td>' +
  '<td>' + 'Original Order:' + '</td>' +
  '<td>' + case when DN.OrigVendorId=7691 then 'No Vendor' else cast(OrigVen.Name as varchar(50)) end + '</td>' +
  '<td>' + case when DN.OrigVendorId=7691 then 'N/A' else cast(OrigItem.ItemCode as varchar(50)) end + '</td>' +
  '<td>' + isnull(cast(cast(DN.OrigBidPrice as Decimal(18,2)) as varchar),'') + '</td>' +
  '</tr>' +
  '<tr>' +
  '<td>' + 'Updated Order:' + '</td>' +
  '<td>' + case when DN.NewVendorId=7691 then 'No Vendor' else cast(NewVen.Name as varchar(50)) end + '</td>' +
  '<td>' + case when DN.NewVendorId=7691 then 'N/A' else cast(NewItem.ItemCode as varchar(50)) end + '</td>' +
  '<td>' + isnull(cast(cast(DN.NewBidPrice as Decimal(18,2)) as varchar),'') + '</td>' +
  '</tr>' +
  '<tr>' +
  '<td>' + 'Comment:' + '</td>' +
  '<td colspan="6">' + 
  cast(
  Case
  When DN.OrigVendorId != DN.NewVendorId
  Then 
    Case 
    When DN.NewVendorId=7691 
    Then 'Item has been discontinued. ' 
    Else 'Vendor has been updated. '
    End 
  Else ''
  End 
  +
  Case When isnull(DN.OrigBidPrice,0) != Isnull(DN.NewBidPrice,0) AND DN.NewVendorId != 7691 Then 'Price has been updated. ' Else '' End 
  +
  Case When Isnull(UA.UseAllocations,0)=1 AND UA.AllocationAvailable < 0 Then '<b> Warning: Account is Over Budget. </b>' Else '' End 
  as varchar(500)) +
  '</td>'+
  '</tr>'
, '') WITHIN GROUP (ORDER BY ReqUser.UserName, REQ.RequisitionNumber, DN.DetailNotificationId) +
--, '') WITHIN GROUP (ORDER BY ReqUser.UserName, REQ.RequisitionNumber) +
  '</tbody></table>'
From Notifications N
Join vw_DetailNotifications DN ON DN.NotificationId = N.NotificationId
--Join DetailNotifications DN ON DN.NotificationId = N.NotificationId
Join Items OrigItem ON OrigItem.ItemId = DN.OrigItemId
Join Items NewItem ON NewItem.ItemId = DN.NewItemId
Join Vendors OrigVen ON OrigVen.VendorId = DN.OrigVendorId
Join Vendors NewVen ON NewVen.VendorId = DN.NewVendorId
Join Detail DTL ON DTL.DetailId = DN.DetailId
Join Requisitions REQ ON REQ.RequisitionId = DTL.RequisitionId
Join Users ReqUser ON ReqUser.UserId = REQ.UserId  
Join UserAccounts UA ON UA.UserAccountId = REQ.UserAccountId  
Join Budgets on Budgets.BudgetId = REQ.BudgetId
Join Approvals on Approvals.RequisitionId = REQ.RequisitionId
              and Approvals.StatusId in (2,3)
Join Users ApprvlUser on ApprvlUser.UserId = Approvals.ApprovalById
Where REQ.UserId = Approvals.ApprovalById  -- Requisitioner Only
  and N.EmailBlastId = @pEmailBlastId
  and ApprvlUser.UserId = @pUserId


SELECT 'DistrictName', District.Name FROM Users JOIN District ON District.DistrictId=Users.DistrictId WHERE Users.UserId=@pUserId
UNION
Select 'ChangeDetailTable', @EmailContentHTML
UNION
SELECT 'OverBudgetMessage', 
       CASE 
       WHEN UPPER(@EmailContentHTML) LIKE '%OVER BUDGET%'
	   THEN '<p><strong>Important: Requisitions noted below as "Over Budget" will need to be revised and resubmitted.</strong></p>'
	   ELSE ''
	   END 

set nocount off
```
