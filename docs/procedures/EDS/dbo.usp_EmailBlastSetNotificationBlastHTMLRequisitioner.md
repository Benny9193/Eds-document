# Procedure: `dbo.usp_EmailBlastSetNotificationBlastHTMLRequisitioner`

_Generated on 2026-05-04T13:04:00.700Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_EmailBlastSetNotificationBlastHTMLRequisitioner` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-03-31 21:24:29 |
| Modified | 2024-02-29 14:56:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pEmailBlastId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Notifications` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_DetailNotifications` | VIEW |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.usp_EmailBlastProcessOrderDetailChangeNotifications` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE             procedure [dbo].[usp_EmailBlastSetNotificationBlastHTMLRequisitioner]
@pEmailBlastId int
as

set nocount on
/*
Select N.NotificationId, ApprvlUser.UserId ReqUserId,   
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
  '<td>' + case when DN.OrigVendorId=7691 then 'N/A' else cast(OrigItem.Description as varchar) end + '</td>' +   -- added 2/15/2024
  '</tr>' +
  '<tr>' +
  '<td>' + 'Updated Order:' + '</td>' +
  '<td>' + case when DN.NewVendorId=7691 then 'No Vendor' else cast(NewVen.Name as varchar(50)) end + '</td>' +
  '<td>' + case when DN.NewVendorId=7691 then 'N/A' else cast(DTL.ItemCode as varchar(50)) end + '</td>' +
  '<td>' + isnull(cast(cast(DN.NewBidPrice as Decimal(18,2)) as varchar),'') + '</td>' +
  '<td>' + case when DN.NewVendorId=7691 then 'N/A' else cast(DTL.Description as varchar) end + '</td>' +     -- added 2/15/2024
  '</tr>' +
  '<tr>' +
  '<td>' + 'Comment:' + '</td>' +
  -- '<td colspan="6">' +  
  '<td colspan="7">' +    -- changed 2/15/2024
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
--, '') WITHIN GROUP (ORDER BY ReqUser.UserName, REQ.RequisitionNumber) +
, '') WITHIN GROUP (ORDER BY ReqUser.UserName, REQ.RequisitionNumber, DN.DetailNotificationId) +
  '</tbody></table>' HTMLTable into #Temp
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
--  and ApprvlUser.UserId = @pUserId
Group by N.NotificationId, ApprvlUser.UserId
*/
Select N.NotificationId, ApprvlUser.UserId ReqUserId,   
'<table border="1" cellpadding="1" cellspacing="1" style="height: 79px"><tbody>' +
'<tr><td>Requisition#</td><td>Username</td><td>Attention</td><td></td><td>Vendor</td><td>Item Code</td><td>Price</td><td>Item Description</td></tr>' +
STRING_AGG(   
  '<tr>' +
  '<td rowspan="2">' + cast(REQ.RequisitionNumber as nvarchar(max)) + '</td>' +
  '<td rowspan="2">' + cast(ReqUser.UserName as varchar) + '</td>' +
  '<td rowspan="2">' + cast(ReqUser.Attention as varchar(50)) + '</td>' +
  '<td>' + 'Original Item:' + '</td>' +
  '<td>' + case when DN.OrigVendorId=7691 then 'No Vendor' else cast(coalesce(OrigVen.Name,'') as varchar(50)) end + '</td>' +
  '<td>' + cast(coalesce(OrigItem.ItemCode,'') as varchar(50)) + '</td>' +
  '<td>' + isnull(cast(cast(DN.OrigBidPrice as Decimal(18,2)) as varchar),'') + '</td>' +
  '<td>' + cast(coalesce(OrigItem.Description,'') as varchar(max)) + '</td>' +   -- added 2/15/2024
  '</tr>' +
  '<tr>' +
  '<td>' + 'Updated Item:' + '</td>' +
  '<td>' + case when DN.NewVendorId=7691 then 'No Vendor' else cast(coalesce(NewVen.Name,'') as varchar(50)) end + '</td>' +
  '<td>' + cast(coalesce(DTL.ItemCode,'') as varchar(50)) + '</td>' +
  '<td>' + isnull(cast(cast(DN.NewBidPrice as Decimal(18,2)) as varchar),'') + '</td>' +
  '<td>' + cast(coalesce(DTL.Description,'') as varchar(max)) + '</td>' +     -- added 2/15/2024
  '</tr>' +
  '<tr>' +
  '<td>' + 'Comment:' + '</td>' +
  -- '<td colspan="6">' +  
  '<td colspan="7">' +    -- changed 2/15/2024
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
  Case When isnull(DN.OrigItemId,0) != Isnull(DN.NewItemId,0) Then 'Item Code has been updated. ' Else '' End 
  +
  Case When isnull(DN.OrigBidPrice,0) != Isnull(DN.NewBidPrice,0) AND DN.NewVendorId != 7691 Then 'Price has been updated. ' Else '' End 
  +
  Case When Isnull(UA.UseAllocations,0)=1 AND UA.AllocationAvailable < 0 Then '<b> Warning: Account is Over Budget. </b>' Else '' End 
  as varchar(500)) +
  '</td>'+
  '</tr>'
--, '') WITHIN GROUP (ORDER BY ReqUser.UserName, REQ.RequisitionNumber) +
, '') WITHIN GROUP (ORDER BY ReqUser.UserName, REQ.RequisitionNumber, DN.DetailNotificationId) +
  '</tbody></table>' HTMLTable into #Temp
--select *
From vw_DetailNotifications DN 
join Notifications N ON N.NotificationId = DN.NotificationId
and N.EmailBlastId = @pEmailBlastId
Join Detail DTL ON DTL.DetailId = DN.DetailId
Join Requisitions REQ ON REQ.RequisitionId = DTL.RequisitionId
Join Users ReqUser ON ReqUser.UserId = REQ.UserId  
left outer Join UserAccounts UA ON UA.UserAccountId = REQ.UserAccountId  
Join Budgets on Budgets.BudgetId = REQ.BudgetId
Join Approvals on Approvals.RequisitionId = REQ.RequisitionId
              and Approvals.StatusId in (2,3)
			  and Approvals.ApprovalById = Req.UserId
Join Users ApprvlUser on ApprvlUser.UserId = Approvals.ApprovalById
--Join DetailNotifications DN ON DN.NotificationId = N.NotificationId
outer apply (Select ItemCode, Description from Items where ItemId = dn.OrigItemId) OrigItem
outer apply (Select ItemCode, Description from Items where ItemId = dn.NewItemId) NewItem
outer apply (Select Vendors.Name from Vendors where Vendors.VendorId = dn.OrigVendorId) OrigVen
outer apply (Select Vendors.Name from Vendors where Vendors.VendorId = dn.NewVendorId) NewVen
Group by N.NotificationId, ApprvlUser.UserId

Update Notifications
   Set EmailHTMLTable = t.HTMLTable
From Notifications
join #Temp t on t.NotificationId = Notifications.NotificationId


set nocount off
```
