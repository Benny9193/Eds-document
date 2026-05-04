# View: `dbo.vw_RequisitionList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Tagged` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `UserId` | int | YES |  |  |
| 5 | `RequisitionId` | int | NO |  |  |
| 6 | `BudgetId` | int | YES |  |  |
| 7 | `AccountId` | int | YES |  |  |
| 8 | `CategoryId` | int | YES |  |  |
| 9 | `TotalRequisitionCost` | money | NO |  |  |
| 10 | `ApprovalLevel` | tinyint | NO |  |  |
| 11 | `StatusId` | int | YES |  |  |
| 12 | `LastApprovalId` | int | NO |  |  |
| 13 | `NextApproverId` | int | NO |  |  |
| 14 | `LastApproverId` | int | NO |  |  |
| 15 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 16 | `AccountCode` | varchar(50) | YES |  |  |
| 17 | `SchoolName` | varchar(50) | YES |  |  |
| 18 | `CategoryName` | varchar(50) | YES |  |  |
| 19 | `Attention` | varchar(50) | YES |  |  |
| 20 | `CometId` | varchar(5) | YES |  |  |
| 21 | `DateEntered` | datetime | YES |  |  |
| 22 | `OrderDate` | datetime | YES |  |  |
| 23 | `POCreated` | int | NO |  |  |
| 24 | `BidInfo` | varchar(51) | YES |  |  |
| 25 | `Status` | varchar(104) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `Approvals` | USER_TABLE |
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Category` | USER_TABLE |
| `Detail` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_RequisitionIsVisible` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RequisitionList] as
  select 0 Tagged, SessionTable.SessionId, Requisitions.SchoolId, Requisitions.UserId, 
         Requisitions.RequisitionId, 
         Requisitions.BudgetId, BudgetAccounts.AccountId, Requisitions.CategoryId,
         ISNULL(Requisitions.TotalRequisitionCost,0) TotalRequisitionCost,
         isnull(SessionTable.ApprovalLevel,0) ApprovalLevel,
         (isnull(StatusTable.StatusId,0) * 16777216) + 
                     case isnull(StatusTable.StatusId,0) 
                       when 29 then isnull((select top 1 BidHeaders.BidHeaderId 
                                              from BidHeaderDetail 
                                              join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId 
                                                             and BidHeaders.Active = 1 
                                                             and isnull(BidHeaders.BidType,2) = 2
                                              join Detail on Detail.DetailId = BidHeaderDetail.DetailId 
                                                         and Detail.RequisitionId = Requisitions.RequisitionId 
                                             order by BidHeaders.BidHeaderId desc),0) 
                       else isnull(case StatusTable.StatusId 
                                     when 2 then NextApprover.UserId 
                                     else LastApprover.UserId 
                                   end,0)
                     end StatusId,
         isnull(la.ApprovalId,0) LastApprovalId,
         isnull(la.ApproverId,0) NextApproverId,
         isnull(la.ApprovalById,0) LastApproverId,
         RequisitionNumber,
         Accounts.Code as AccountCode, 
         School.[Name] as SchoolName, 
         Category.[Name] as CategoryName, 
         Requisitions.Attention, 
         RIGHT('00000' + convert(varchar(6),Users.CometId),5) as CometId, 
         Requisitions.DateEntered, 
         Requisitions.OrderDate, 
         case isnull((select top 1 PO.POId from PO where PO.RequisitionId = Requisitions.RequisitionId order by PO.POId),0)
           when 0 then 0 
           else 1 
         end POCreated, 
         case isnull(BidHeaders.BidHeaderId,0) 
           when 0 then 'Not Bid' 
           else convert(varchar(16),BidHeaders.BidHeaderId) + ' - ' + convert(varchar(32),BidHeaders.BidAwardDate,101) 
         end BidInfo,
         isnull(StatusTable.Name + 
                  case StatusTable.StatusId
                    when 29 then ' on Bid ' + cast(isnull((select top 1 BidHeaders.BidHeaderId 
                                                             from BidHeaderDetail 
                                                             join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId 
                                                                            and BidHeaders.Active = 1 
                                                                            and isnull(BidHeaders.BidType,2) = 2
                                                             join Detail on Detail.DetailId = BidHeaderDetail.DetailId 
                                                                        and Detail.RequisitionId = Requisitions.RequisitionId 
                                                            order by BidHeaders.BidHeaderId desc),0) as varchar(16))
                    when 23 then ''
                    when 2 then ' by ' + isnull(NextApprover.Attention,'')
                    when 0 then ''
                    when 1 then ''
                    else ' by ' + isnull(LastApprover.Attention,'')
                  end,'On Hold') Status
    from SessionTable with (nolock)
    join Requisitions on Requisitions.BudgetId = SessionTable.BudgetId
    join vw_RequisitionIsVisible rv on rv.SessionId = SessionTable.SessionId
                                   and rv.RequisitionId = Requisitions.RequisitionId
                                   and rv.IsVisible = 1
    JOIN StatusTable on StatusTable.StatusId = 
      isnull((select top 1 Approvals.StatusId 
                from Approvals with (nolock)
               where Approvals.RequisitionId = Requisitions.RequisitionId 
               Order by ApprovalDate desc),
             (select top 1 StatusId 
                from StatusTable with (nolock) 
               where StatusCode = 'H'))
    left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
    LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId
    LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
    LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId
    LEFT OUTER JOIN UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId and UserAccounts.Active = 1
    LEFT OUTER JOIN Accounts on Accounts.AccountId = UserAccounts.AccountId
    LEFT OUTER JOIN BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
    left outer join Approvals la on la.ApprovalId =
      (select top 1 Approvals.ApprovalId 
         from Approvals  with (nolock)
        where Approvals.RequisitionId = Requisitions.RequisitionId 
        Order by ApprovalDate desc)
    LEFT OUTER JOIN Users LastApprover on LastApprover.UserId = la.ApprovalById
    LEFT OUTER JOIN Users NextApprover on NextApprover.UserId = la.ApproverId
--    left outer join vw_StatusDetailed rs on rs.RequisitionId = Requisitions.RequisitionId
```
