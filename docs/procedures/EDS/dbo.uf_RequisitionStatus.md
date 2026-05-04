# Function: scalar: `dbo.uf_RequisitionStatus`

_Generated on 2026-05-04T13:04:24.312Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RequisitionStatus` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-03-13 14:01:08 |
| Modified | 2022-06-22 14:42:09 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_FA_RequisitionsForPurchaseOrderModal` | SQL_STORED_PROCEDURE |
| `dbo.sp_ReturnUserReqs` | SQL_STORED_PROCEDURE |
| `dbo.usp_getMyLastYearsReqs` | SQL_STORED_PROCEDURE |
| `dbo.vw_ExistingRequisitions` | VIEW |
| `dbo.vw_RefList` | VIEW |

## Definition

```sql
--SELECT dbo.uf_RequisitionStatus(55224629)

CREATE    function [dbo].[uf_RequisitionStatus] (@pRequisitionId int)
returns varchar(255) as
begin
declare @Visible int,
        @MaxLevel int,
	@StatusId int,
	@ApprovalId int,
	@ReturnMsg varchar(255)

  select top 1 @ApprovalId = coalesce(ApprovalId,0),
		 @MaxLevel = coalesce(Level,0)
    from Approvals 
    join StatusTable on StatusTable.StatusId = Approvals.StatusId
   where Approvals.RequisitionId = @pRequisitionId
   order by Approvals.ApprovalDate desc

  select @StatusId = StatusId
    from Approvals 
   where Approvals.ApprovalId = @ApprovalId

  if @StatusId = 2 -- Pending Approval
  begin
    select @MaxLevel = @MaxLevel + 1
  end

  select @ReturnMsg = case isnull(@StatusId,0) 
                        when 29 then StatusTable.Name + ' on Bid ' + isnull(convert(varchar(16),(select top 1 BidHeaders.BidHeaderId from BidHeaderDetail join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId and BidHeaders.Active = 1 join Detail on Detail.DetailId = BidHeaderDetail.DetailId join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.RequisitionId = Approvals.RequisitionId order by BidHeaders.BidHeaderId desc)),'') 
                        when 2 then isnull(StatusTable.Name,'Pending Approval') + case isnull(@MaxLevel,0) when 0 then ' by ' + isnull(Approver.Attention,'User') when 1 then ' by ' + isnull(Approver.Attention,'Principal') when 2 then ' by ' + isnull(Approver.Attention,'Business Office') when 5 then ' by ' + isnull(Approver.Attention,'Customer Service') else ' by ' + isnull(Approver.Attention,'EDS') end 
                        else isnull(StatusTable.Name,'On Hold') + case isnull(@MaxLevel,0) when 0 then ' by ' + isnull(Users.Attention,'User') when 1 then ' by ' + isnull(Users.Attention,'Principal') when 2 then ' by ' + isnull(Users.Attention,'Business Office') when 5 then ' by ' + isnull(Users.Attention,'Customer Service') else ' by ' + isnull(Users.Attention,'EDS') end 
                      end
    from Approvals 
    join StatusTable on StatusTable.StatusId = Approvals.StatusId
    left outer join Users on Users.UserId = Approvals.ApprovalById
    left outer join Users Approver on Approver.UserId = Approvals.ApproverId
   where Approvals.ApprovalId = @ApprovalId

  if @@rowcount = 0
  begin
    select @ReturnMsg = 'On Hold'
  end

  return (@ReturnMsg)
end
```
