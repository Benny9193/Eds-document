# View: `dbo.vw_RequisitionStatusBySession`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `StatusId` | int | NO |  |  |
| 4 | `StatusDesc` | varchar(104) | NO |  |  |
| 5 | `StatusCode` | int | NO |  |  |
| 6 | `ApprovalDate` | datetime | YES |  |  |
| 7 | `BidStatus` | varchar(20) | NO |  |  |
| 8 | `BaseStatus` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_ApproveRequisitionsBySession`](dbo.vw_ApproveRequisitionsBySession.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsBySession_Test`](dbo.vw_ApproveRequisitionsBySession_Test.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsTest`](dbo.vw_ApproveRequisitionsTest.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_RequisitionStatusBySession] as
select Requisitions.RequisitionId, 
       SessionTable.SessionId,
       case 
         when isnull(Approvals.StatusId,0) = 3 and isnull(Approvals.ApproverId,0) = SessionTable.UserId then 2
         when isnull(Approvals.StatusId,0) = 2 and isnull(Approvals.ApproverId,0) = 0 then 3
         else ISNULL(Approvals.StatusId,0) 
       end StatusId,
       isnull(case  
         when isnull(Approvals.StatusId,0) = 29 then 
           StatusTable.Name + ' on Bid ' + 
             isnull(cast(BidHeaders.BidHeaderId as varchar(18)),'') 
         when isnull(Approvals.StatusId,0) = 2 and ISNULL(Approvals.ApproverId,0) = 0 then 
		   'Approved' + 
				  case isnull(Approvals.Level,0) 
					when 0 then ' by ' + isnull(LastApprover.Attention,'User') 
					when 1 then ' by ' + isnull(LastApprover.Attention,'Principal') 
					when 2 then ' by ' + isnull(LastApprover.Attention,'Business Office') 
					when 5 then ' by ' + isnull(LastApprover.Attention,'Customer Service') 
					else ' by ' + isnull(LastApprover.Attention,'EDS') 
				  end 
         when isnull(Approvals.StatusId,0) = 2 and ISNULL(Approvals.ApproverId,0) != 0 then 
		   isnull(StatusTable.Name,'Pending Approval') + 
				  case isnull(Approvals.Level,0) 
					when 0 then ' by ' + isnull(NextApprover.Attention,'User') 
					when 1 then ' by ' + isnull(NextApprover.Attention,'Principal') 
					when 2 then ' by ' + isnull(NextApprover.Attention,'Business Office') 
					when 5 then ' by ' + isnull(NextApprover.Attention,'Customer Service') 
					else ' by ' + isnull(NextApprover.Attention,'EDS') 
				  end 
         when isnull(Approvals.StatusId,0) = 3 and isnull(Approvals.ApproverId,0) = SessionTable.UserId then 
           'Pending Approval' + 
                  case isnull(NextApprover.ApprovalLevel,0) 
                    when 0 then ' by ' + isnull(NextApprover.Attention,'User') 
                    when 1 then ' by ' + isnull(NextApprover.Attention,'Principal') 
                    when 2 then ' by ' + isnull(NextApprover.Attention,'Business Office') 
                    when 5 then ' by ' + isnull(NextApprover.Attention,'Customer Service') 
                    else ' by ' + isnull(NextApprover.Attention,'EDS') 
                  end 
         else 
           isnull(StatusTable.Name,'On Hold') + 
                  case isnull(Approvals.Level,0) 
                    when 0 then ' by ' + isnull(LastApprover.Attention,'User') 
                    when 1 then ' by ' + isnull(LastApprover.Attention,'Principal') 
                    when 2 then ' by ' + isnull(LastApprover.Attention,'Business Office') 
                    when 5 then ' by ' + isnull(LastApprover.Attention,'Customer Service') 
                    else ' by ' + isnull(LastApprover.Attention,'EDS') 
                  end 
       end,'On Hold') StatusDesc,
       isnull((isnull(Approvals.StatusId,0) * 16777216) + 
          case isnull(Approvals.StatusId,0) 
            when 29 then 
              isnull(BidHeaders.BidHeaderId,0) 
            else 
              isnull(case Approvals.StatusId 
                       when 2 then NextApprover.UserId 
                       else LastApprover.UserId 
                     end,0)
          end,0) StatusCode,
          Approvals.ApprovalDate ApprovalDate,
          case
            when BidHeaders.BidHeaderId is null then 
              'No Supplemental Bids'
            when BidHeaders.BidAwardDate <= GETDATE()
             and (select COUNT(*) 
                    from Bids b with (nolock) 
                   where b.BidHeaderId = BidHeaders.BidHeaderId 
                     and b.Active = 1 
                     and b.VendorId != 7691) >= 1 then
              'Bidding Complete'
            when BidHeaders.BidAwardDate <= GETDATE()
             and (select COUNT(*) 
                    from Bids b with (nolock) 
                   where b.BidHeaderId = BidHeaders.BidHeaderId 
                     and b.Active = 1 
                     and b.VendorId != 7691) = 0 then
              'Bid being Analyzed'
            when BidHeaders.BidAwardDate is not null
             and BidHeaders.BidAwardDate > GETDATE() then
              'Out to Bid'
            when BidHeaders.BidAwardDate is null then
              'Bid being Created'
            else
              'Unknown Bid Status'
          end BidStatus,
          ISNULL(StatusTable.Name,'On Hold') BaseStatus
         from Requisitions with (nolock)
         join SessionTable on SessionTable.BudgetId = Requisitions.BudgetId
  left outer join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
                           and Approvals.ApprovalId =
    (select top 1 A.ApprovalId
       from Approvals a with (nolock)
      where a.RequisitionId = Requisitions.RequisitionId
      order by a.ApprovalDate desc, a.ApprovalId desc)
  left outer join StatusTable on StatusTable.StatusId = Approvals.StatusId
  left outer join Users LastApprover on LastApprover.UserId = Approvals.ApprovalById
  left outer join Users NextApprover on NextApprover.UserId = Approvals.ApproverId
  left outer join BidHeaders on BidHeaders.BidHeaderId =
    (select Top 1 bh.BidHeaderId
       from BidHeaders bh with (nolock)
       join BidHeaderDetail bhd on bhd.BidHeaderId = bh.BidHeaderId
       join Detail d on d.DetailId = bhd.DetailId
                    and d.RequisitionId = Requisitions.RequisitionId
      where bh.BidType = 2
      order by bh.BidHeaderId desc)
```
