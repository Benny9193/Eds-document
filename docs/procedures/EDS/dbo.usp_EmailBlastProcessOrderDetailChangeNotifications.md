# Procedure: `dbo.usp_EmailBlastProcessOrderDetailChangeNotifications`

_Generated on 2026-05-04T13:43:19.156Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_EmailBlastProcessOrderDetailChangeNotifications` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-03-28 16:17:18 |
| Modified | 2022-04-01 10:36:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pTemplateRequisitionerEmailBlastId` | IN | int |  |
| 2 | `@pTemplateApproverEmailBlastId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `EmailBlast` | USER_TABLE |  |
| `Notifications` | USER_TABLE |  |
| `dbo.DetailNotifications` | USER_TABLE |  |
| `dbo.EmailBlast` | USER_TABLE |  |
| `dbo.Notifications` | USER_TABLE |  |
| `dbo.usp_EmailBlastSetNotificationBlastHTMLApprover` | SQL_STORED_PROCEDURE |  |
| `dbo.usp_EmailBlastSetNotificationBlastHTMLRequisitioner` | SQL_STORED_PROCEDURE |  |
| `dbo.vw_PendingDetailChangeNotifications` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE           procedure [dbo].[usp_EmailBlastProcessOrderDetailChangeNotifications]
@pTemplateRequisitionerEmailBlastId int,
@pTemplateApproverEmailBlastId int
as
declare @NewRequisitionerEmailBlastId int,
        @NewApproverEmailBlastId int

-- Notes: 
-- @pTemplateRequisitionerEmailBlastId = The Id of the "Template: Order Detail Change Requisitioner Notification".  Currently:  21950969 (verify - subject to change)
-- @pTemplateApproverEmailBlastId = The Id of the "Template: Order Detail Change Approver Notification".  Currently:  21950970  (verify - subject to change)

set nocount on
begin transaction
begin try
    lineno 31  -- set this number based on create sproc script

	-- Create copy of "Requisitioner" Template Blast
    insert EmailBlast (BlastName, BlastDescription,
	                   BlastHTML, SQLStmt,ReportWhereClause, EmailFrom, EmailCC, EmailBCC, EmailSubject, ReadReceipt, HighPriority, AddressFromRep, Attachments,
                       UseDefaultReadReceiptEmail, ReadReceiptEmail, BlastVar1, BlastVar2, VarDataSQL)
    Select 'Order Detail Change Notification of Requisitioners ' + Convert(varchar, cast(GETDATE() as Date) ) BlastName, 'Blast copied from Template Id: ' + convert(varchar, @pTemplateRequisitionerEmailBlastId) BlastDescription, 
	       BlastHTML, SQLStmt, ReportWhereClause, EmailFrom, EmailCC, EmailBCC, EmailSubject, ReadReceipt, HighPriority, AddressFromRep, Attachments, 
		   UseDefaultReadReceiptEmail, ReadReceiptEmail, BlastVar1, BlastVar2, VarDataSQL
	from EmailBlast
	Where EmailBlastId = @pTemplateRequisitionerEmailBlastId

	if @@rowcount != 1
	begin;
		Throw 51000,'Invalid Requisitioner Template EmailBlastId',16
	end

	Select @NewRequisitionerEmailBlastId = IDENT_CURRENT('EmailBlast')

	-- Update New Requisitioner Blast - String replacement of {EmailBlastId} with the new blast id where applicable
	UPDATE [dbo].[EmailBlast]
    SET SQLStmt             = replace( SQLStmt,           '{EmailBlastId}', convert(varchar, @NewRequisitionerEmailBlastId) )
       ,ReportWhereClause   = replace( ReportWhereClause, '{EmailBlastId}', convert(varchar, @NewRequisitionerEmailBlastId) )
       ,VarDataSQL          = replace( VarDataSQL,        '{EmailBlastId}', convert(varchar, @NewRequisitionerEmailBlastId) )
    WHERE EmailBlastId = @NewRequisitionerEmailBlastId
 
	-- Create copy of "APPROVER" Template Blast
    insert EmailBlast (BlastName, BlastDescription,
	                   BlastHTML, SQLStmt,ReportWhereClause, EmailFrom, EmailCC, EmailBCC, EmailSubject, ReadReceipt, HighPriority, AddressFromRep, Attachments,
                       UseDefaultReadReceiptEmail, ReadReceiptEmail, BlastVar1, BlastVar2, VarDataSQL)
    Select 'Order Detail Change Notification of Approvers ' + Convert(varchar, cast(GETDATE() as Date) ) BlastName, 
	       'Blast copied from Template Id: ' + convert(varchar, @pTemplateApproverEmailBlastId) + 
		   ' (Variable Data from Requisitioner BlastId: ' + convert(varchar, @NewRequisitionerEmailBlastId) + ')' BlastDescription, 
	       BlastHTML, SQLStmt, ReportWhereClause, EmailFrom, EmailCC, EmailBCC, EmailSubject, ReadReceipt, HighPriority, AddressFromRep, Attachments, 
		   UseDefaultReadReceiptEmail, ReadReceiptEmail, BlastVar1, BlastVar2, VarDataSQL
	from EmailBlast
	Where EmailBlastId = @pTemplateApproverEmailBlastId

	if @@rowcount != 1
	begin;
		Throw 51000,'Invalid Approver Template EmailBlastId',16
	end

	Select @NewApproverEmailBlastId = IDENT_CURRENT('EmailBlast')

	-- Update New APPROVER Blast - String replacement of {EmailBlastId} with the new blast id where applicable
	-- NOTE: The "VARIABLE DATA SQL" in the approver blast uses the Notification information from the Requisitioner Blast
	UPDATE [dbo].[EmailBlast]
    SET SQLStmt             = replace( SQLStmt,           '{EmailBlastId}', convert(varchar, @NewApproverEmailBlastId) )
       ,ReportWhereClause   = replace( ReportWhereClause, '{EmailBlastId}', convert(varchar, @NewApproverEmailBlastId) )
       ,VarDataSQL          = replace( VarDataSQL,        '{EmailBlastId}', convert(varchar, @NewApproverEmailBlastId) )
    WHERE EmailBlastId = @NewApproverEmailBlastId
	--UPDATE [dbo].[EmailBlast]
    --SET VarDataSQL          = replace( VarDataSQL,        '{RequisitionerEmailBlastId}', convert(varchar, @NewRequisitionerEmailBlastId) )  -- not currently used, but might be needed
    --WHERE EmailBlastId = @NewApproverEmailBlastId
 

    -- Create Notifications records for Req Users (aka Requisitioners)
    -- Note: The Req "User" Notifications will map 1 to many DetailNotifications 
	--       The Req "Approver" Notifications will NOT have a direct link to the DetailNotifications 
	--       (The approver notifications are potentially many to many, they are primarily added for processing by the email blast)
	INSERT dbo.Notifications (UserId, NotificationType, Email, DateSent, EmailBlastId)
    -- The view Uses the Approvals table to Select the User and ALL Approvers (of the Reqs that have changes)
  	SELECT vwDN.ApprovalById, vwDN.NotificationType, vwDN.Email, GetDate(), @NewRequisitionerEmailBlastId
    FROM [dbo].[vw_PendingDetailChangeNotifications] vwDN
	WHERE vwDN.NotificationType = 'User'
 	GROUP BY vwDN.NotificationType, vwDN.ApprovalById, vwDN.Email
	ORDER BY vwDN.NotificationType, vwDN.ApprovalById, vwDN.Email
 	
	if @@rowcount = 0
	begin;
		Throw 51000,'No New User Notifications Available',16  -- could do test before creating new blast, but rollback will undo
	end

    -- Create Notifications records for ALL approvers  
	INSERT dbo.Notifications (UserId, NotificationType, Email, DateSent, EmailBlastId)
    -- The view Uses the Approvals table to Select the User and ALL Approvers (of the Reqs that have changes)
  	SELECT vwDN.ApprovalById, vwDN.NotificationType, vwDN.Email, GetDate(), @NewApproverEmailBlastId
    FROM [dbo].[vw_PendingDetailChangeNotifications] vwDN
	WHERE vwDN.NotificationType = 'Approver'
 	GROUP BY vwDN.NotificationType, vwDN.ApprovalById, vwDN.Email
	ORDER BY vwDN.NotificationType, vwDN.ApprovalById, vwDN.Email
 	
	-- Disabled this code because it's (remotely) possible that there are no approvers 
	--if @@rowcount = 0
	--begin;
	--	Throw 51000,'No New Approver Notifications Available',16  -- could do test before creating new blast, but rollback will undo
	--end

	-- Note: after setting the NotificationId, these records will no longer appear in the view (of pending notifications) 
	--       ... for that reason ... any code using the [vw_PendingDetailChangeNotifications] must be before this step 
	--
	-- Update DetailNotifications with Link to Notifications 
	-- (User only NOT approver - There can be many detail notifications to one Notification - per User)
	Update [dbo].[DetailNotifications]
	--Update [dbo].[vw_PendingDetailChangeNotifications]
    Set NotificationId = SS.NotificationId 
    From
    (
    SELECT N.NotificationId, vwDN.DetailNotificationId
    FROM [dbo].[vw_PendingDetailChangeNotifications] vwDN
    JOIN Notifications N ON N.UserId = vwDN.ReqUserId and vwDN.NotificationType = 'User' 
    WHERE N.EmailBlastId = @NewRequisitionerEmailBlastId
    ) SS
    Where SS.DetailNotificationId = DetailNotifications.DetailNotificationId


    -- Update the Notifications.EmailHTMLTable field for the Approver Blast (using data from the Requisitioner Blast)
    EXECUTE [dbo].[usp_EmailBlastSetNotificationBlastHTMLApprover] @NewApproverEmailBlastId, @NewRequisitionerEmailBlastId
    -- Update the Notifications.EmailHTMLTable field for the Requisitioner Blast 
    EXECUTE [dbo].[usp_EmailBlastSetNotificationBlastHTMLRequisitioner] @NewRequisitionerEmailBlastId

/*
    -- Move Reqs from the Requisitioner Notification to "Hold"
	-- Note: This code is subject to change ... for now this process ONLY involves reqs that are over budget and for that reason, being moved to hold
	insert Approvals (ApprovalById, level, StatusId, RequisitionId, ApproverId, ApprovalDate)
    select 1, Users.ApprovalLevel, 1, Requisitions.RequisitionId, Users.UserId, getdate()
    from Requisitions
    join Users on Users.UserId = Requisitions.UserId
    where Requisitions.RequisitionId in
		(
		SELECT DTL.RequisitionId
		FROM Notifications N 
		JOIN DetailNotifications DN ON DN.NotificationId = N.NotificationId
		JOIN Detail DTL ON DTL.DetailId = DN.DetailId
		WHERE N.EmailBlastId = @NewRequisitionerEmailBlastId
		)
*/

	commit transaction
	select 1 [Status], 'Process Completed Normally' [StatusDesc], @NewRequisitionerEmailBlastId [NewRequisitionerEmailBlastId], @NewApproverEmailBlastId [NewApproverEmailBlastId]
end try
begin catch
	rollback transaction
	select 0 [Status],
	       'SQL Error#: ' + convert(varchar,ERROR_NUMBER()) + '  ' + ERROR_MESSAGE() +  + char(13) + char(10) + 
		   'Line: ' + convert(VARCHAR,ERROR_LINE()) + '  Procedure: ' + ERROR_PROCEDURE() [StatusDesc],
		   0 [NewRequisitionerEmailBlastId], 0 [NewApproverEmailBlastId]
	-- note: remember to add LINENO x at start of procedure after "begin try" to report the error line correctly
end catch
set nocount off
```
