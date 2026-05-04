# View: `dbo.vw_StatusHistory`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | YES |  |  |
| 2 | `StatusName` | varchar(104) | NO |  |  |
| 3 | `ApprovalDate` | datetime | YES |  |  |
| 4 | `ActionUserId` | int | NO |  |  |
| 5 | `ActionCometId` | int | YES |  |  |
| 6 | `ActionAttention` | varchar(50) | YES |  |  |
| 7 | `ApproverUserId` | int | YES |  |  |
| 8 | `ApproverAttention` | varchar(50) | YES |  |  |
| 9 | `ApproverCometId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_GetUserRequisitions` | SQL_STORED_PROCEDURE |
| [`dbo.vw_ApproveRequisitions`](dbo.vw_ApproveRequisitions.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsBySession`](dbo.vw_ApproveRequisitionsBySession.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsBySession_Test`](dbo.vw_ApproveRequisitionsBySession_Test.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsTest`](dbo.vw_ApproveRequisitionsTest.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_StatusHistory] as
select Approvals.RequisitionId, 
       isnull(case isnull(Approvals.StatusId,0) 
         when 29 then 
           StatusTable.Name + ' on Bid ' + 
             isnull(cast((select top 1 BidHeaders.BidHeaderId 
                            from BidHeaderDetail with (nolock)
                            join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId 
                                           and BidHeaders.Active = 1 
                                           and isnull(BidHeaders.BidType,2) = 2
                            join Detail on Detail.DetailId = BidHeaderDetail.DetailId 
                            join Requisitions r on r.RequisitionId = Detail.RequisitionId 
                                               and r.RequisitionId = Approvals.RequisitionId 
                           order by BidHeaders.BidHeaderId desc) as varchar(18)),'') 
         when 2 then 
           case ISNULL(na.UserId,0)
             when 0 then
			   'Approved' + 
					  case isnull(Approvals.Level,0) 
						when 0 then ' by ' + isnull(au.Attention,'User') 
						when 1 then ' by ' + isnull(au.Attention,'Principal') 
						when 2 then ' by ' + isnull(au.Attention,'Business Office') 
						when 5 then ' by ' + isnull(au.Attention,'Customer Service') 
						else ' by ' + isnull(au.Attention,'EDS') 
					  end 
			 else
			   isnull(StatusTable.Name,'Pending Approval') + 
					  case isnull(Approvals.Level,0) 
						when 0 then ' by ' + isnull(na.Attention,'User') 
						when 1 then ' by ' + isnull(na.Attention,'Principal') 
						when 2 then ' by ' + isnull(na.Attention,'Business Office') 
						when 5 then ' by ' + isnull(na.Attention,'Customer Service') 
						else ' by ' + isnull(na.Attention,'EDS') 
					  end 
		   end 
         else 
           isnull(StatusTable.Name,'On Hold') + 
                  case isnull(Approvals.Level,0) 
                    when 0 then ' by ' + isnull(au.Attention,'User') 
                    when 1 then ' by ' + isnull(au.Attention,'Principal') 
                    when 2 then ' by ' + isnull(au.Attention,'Business Office') 
                    when 5 then ' by ' + isnull(au.Attention,'Customer Service') 
                    else ' by ' + isnull(au.Attention,'EDS') 
                  end 
       end,'On Hold') StatusName,
       Approvals.ApprovalDate, 
       au.UserId ActionUserId, 
       au.CometId ActionCometId, 
       Au.Attention ActionAttention, 
       na.UserId ApproverUserId, 
       na.Attention ApproverAttention, 
       na.CometId ApproverCometId
  from Approvals 
  join StatusTable on StatusTable.StatusId = Approvals.StatusId
  join Users au on au.UserId = Approvals.ApprovalById
  left outer join Users na on na.UserId = Approvals.ApproverId
union (
select Requisitions.RequisitionId, 
       'Requisition Created' StatusName, 
       Requisitions.DateEntered, 
       au.UserId ActionUserId, 
       au.CometId ActionCometId, 
       Au.Attention ActionAttention, 
       na.UserId ApproverUserId, 
       na.Attention ApproverAttention, 
       na.CometId ApproverCometId
  from Requisitions with (nolock)
  join Users au on au.UserId = Requisitions.UserId
  left outer join Users na on na.UserId = au.ApproverId
)
```
