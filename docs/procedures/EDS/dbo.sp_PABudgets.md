# Procedure: `dbo.sp_PABudgets`

_Generated on 2026-05-04T13:43:18.871Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PABudgets` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:49 |
| Modified | 2014-10-07 17:53:20 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pCategoryId` | IN | varchar(255) |  |
| 3 | `@pBudgetId` | IN | varchar(255) |  |
| 4 | `@pAccountId` | IN | varchar(255) |  |
| 5 | `@pSchoolId` | IN | varchar(255) |  |
| 6 | `@pUserId` | IN | varchar(255) |  |
| 7 | `@pStatusId` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_PABudgets] @pSessionId varchar(255), @pCategoryId varchar(255), @pBudgetId varchar(255), @pAccountId varchar(255), @pSchoolId varchar(255), @pUserId varchar(255), @pStatusId varchar(255) AS

declare @DynamicSelect varchar(4096)

set transaction isolation level read uncommitted
select @DynamicSelect = 'set transaction isolation level read uncommitted' +
                        ' select Budgets.BudgetId, Budgets.Name' +
						'  from (' +
						'    select SessionTable.BudgetId, SessionTable.ApprovalLevel' +
						'      from SessionTable with (nolock)' +
						'     where SessionTable.SessionId = ' + @pSessionId +
						'    union ' +
						'      SELECT distinct PendingApprovals.BudgetId, SessionTable.ApprovalLevel' +
						'        FROM dbo.PendingApprovals with (nolock)' +
						'        JOIN SessionTable on SessionTable.SessionId = PendingApprovals.SessionId' +
						'	WHERE SessionTable.SessionId = ' + @pSessionId +
									'   ) ss ' +
						'  join Budgets b1 on b1.BudgetId = ss.BudgetId' +
                        '  join Budgets Budgets on Budgets.DistrictId = b1.DistrictId' +
                        ' where Budgets.VisibleFrom <= case ss.ApprovalLevel when 9 then dateadd(year,5,getdate()) when 8 then dateadd(year,5,getdate()) when 5 then dateadd(year,1,getdate()) else getdate() end' +
                        '   and Budgets.VisibleUntil >= case ss.ApprovalLevel when 9 then dateadd(year,-5,getdate()) when 8 then dateadd(year,-5,getdate()) when 5 then dateadd(year,-1,getdate()) else getdate() end' +
                        '   and Budgets.Active = 1' +
                        ' ORDER BY Budgets.Name'

execute(@DynamicSelect)


/*                                        ' where Budgets.VisibleFrom <= case SessionTable.ApprovalLevel when 9 then dateadd(year,5,getdate()) when 8 then dateadd(year,5,getdate()) when 5 then dateadd(year,1,getdate()) else getdate() end' +
                                        '   and Budgets.VisibleUntil >= case SessionTable.ApprovalLevel when 9 then dateadd(year,-5,getdate() when 8 then dateadd(year,-5,getdate()) when 5 then dateadd(year,-1,getdate()) else getdate() end' +
*/
```
