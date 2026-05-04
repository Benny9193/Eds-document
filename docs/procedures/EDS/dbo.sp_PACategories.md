# Procedure: `dbo.sp_PACategories`

_Generated on 2026-05-04T13:04:00.422Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PACategories` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:50 |
| Modified | 2003-06-30 12:55:50 |
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
CREATE              PROCEDURE dbo.sp_PACategories @pSessionId varchar(255), @pCategoryId varchar(255), @pBudgetId varchar(255), @pAccountId varchar(255), @pSchoolId varchar(255), @pUserId varchar(255), @pStatusId varchar(255) AS
declare @DynamicSelect varchar(4096)

set transaction isolation level read uncommitted
select @DynamicSelect = 'set transaction isolation level read uncommitted' +
                        ' SELECT distinct PendingApprovals.CategoryId, Category.Name' +
                        '  FROM dbo.PendingApprovals with (nolock)' +
                        '  JOIN dbo.Category on dbo.Category.CategoryId = dbo.PendingApprovals.CategoryId' +
                        '  JOIN SessionTable on SessionTable.SessionId = PendingApprovals.SessionId' +
                        '  LEFT OUTER JOIN Users LastApprover on LastApprover.UserId = PendingApprovals.LastApproverId ' +
                        '  LEFT OUTER JOIN Users NextApprover on NextApprover.UserId = PendingApprovals.NextApproverId ' +
                        '  left outer join BidHeaders bh on bh.BidHeaderId = (select top 1 BidHeaders.BidHeaderId from BidHeaderDetail join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId and BidHeaders.Active = 1 and isnull(BidHeaders.BidType,2) = 2 join Detail on Detail.DetailId = BidHeaderDetail.DetailId join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.RequisitionId = PendingApprovals.RequisitionId order by BidHeaders.BidHeaderId desc)' +
--                        '  JOIN District on District.DistrictId = SessionTable.DistrictId' +
--                        '  JOIN Budgets on Budgets.DistrictId = District.DistrictId' +
                        ' WHERE PendingApprovals.SessionId = ' + @pSessionId 
--                        '   and Budgets.VisibleFrom <= getdate()' +
--                        '   and Budgets.VisibleUntil >= getdate()' +
--                        '   and dbo.uf_RequisitionIsVisible(' + @pSessionId + ',PendingApprovals.RequisitionId) = 1'

if CONVERT(int,@pCategoryId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND PendingApprovals.CategoryId = ' + @pCategoryId
end

if CONVERT(int,@pBudgetId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND PendingApprovals.BudgetId = ' + @pBudgetId
end

if CONVERT(int,@pAccountId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND PendingApprovals.AccountId = ' + @pAccountId
end

if CONVERT(int,@pSchoolId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND PendingApprovals.SchoolId = ' + @pSchoolId
end

if CONVERT(int,@pUserId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND PendingApprovals.UserId = ' + @pUserId
end

if CONVERT(int,@pStatusId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND isnull((dbo.PendingApprovals.StatusId * 16777216) + case isnull(PendingApprovals.StatusId,0) ' +
                        '   when 29 then isnull(bh.BidHeaderId,0) ' + 
                        '   else isnull(case PendingApprovals.StatusId when 2 then NextApprover.UserId else LastApprover.UserId end,0)  ' +
                        ' end,0) = ' + @pStatusId
end

select @DynamicSelect = @DynamicSelect + ' ORDER BY Category.Name' 

execute(@DynamicSelect)
```
