# View: `dbo.vw_PendingDetailChangeNotifications`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailNotificationId` | bigint | NO |  |  |
| 2 | `DetailId` | bigint | NO |  |  |
| 3 | `NotificationId` | bigint | YES |  |  |
| 4 | `DateCreated` | datetime | NO |  |  |
| 5 | `OrigItemId` | int | YES |  |  |
| 6 | `NewItemId` | int | YES |  |  |
| 7 | `OrigVendorId` | int | YES |  |  |
| 8 | `NewVendorId` | int | YES |  |  |
| 9 | `OrigBidPrice` | decimal(11,5) | YES |  |  |
| 10 | `NewBidPrice` | decimal(11,5) | YES |  |  |
| 11 | `ReqUserId` | int | YES |  |  |
| 12 | `ApprovalById` | int | YES |  |  |
| 13 | `NotificationType` | varchar(8) | NO |  |  |
| 14 | `Email` | varchar(255) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_DetailNotifications` | VIEW |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.usp_EmailBlastProcessOrderDetailChangeNotifications` | SQL_STORED_PROCEDURE |

## Definition

```sql
/*
			Select * from DetailNotifications where DetailId = 1493689815
			select * 
			  from (select dns.DetailId from DetailNotifications dns where dns.DateCreated > cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime) group by dns.DetailId) rl
			  join Detail on Detail.DetailId = rl.DetailId
			             and Detail.DetailId = 1493689815
			  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) ap
			  outer apply (select top 1 ApprovalId, ApprovalDate from (select top 2 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) a order by ApprovalDate desc) ad
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, dn.OrigVendorId, dn.NewVendorId, dn.OrigItemId, dn.OrigBidPrice 
			                 from DetailNotifications dn 
							where dn.DetailId = rl.DetailId 
							  and dn.NewVendorId = dn.OrigVendorId 
							  and dn.OrigItemId = dn.NewItemId 
							order by dn.DateCreated) pc1
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, dn.OrigVendorId, dn.NewVendorId, dn.NewBidPrice 
			                 from DetailNotifications dn 
							where dn.DetailId = rl.DetailId 
							  and dn.OrigVendorId = dn.NewVendorId 
							  and dn.OrigVendorId = pc1.OrigVendorId 
							  and dn.NewItemId = dn.OrigItemId 
							  and dn.OrigItemId = pc1.OrigItemId 
							  and dn.NewBidPrice = pc1.OrigBidPrice 
							  and dn.DateCreated > coalesce(pc1.DateCreated,cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)) 
							order by dn.DateCreated) pc2
			  outer apply (select top 1  Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) and Approvals.ApprovalDate between pc1.DateCreated and pc2.DateCreated order by Approvals.ApprovalDate) bap
			 where pc1.DetailNotificationId is not null
			   and pc2.DetailNotificationId is not null
			   and bap.ApprovalId is null
			   and (pc2.DateCreated < ap.ApprovalDate
			        or (    pc1.DateCreated > ap.ApprovalDate
					    and pc2.DateCreated > ap.ApprovalDate))
			union
			select pc2.DetailNotificationId 
			  from (select dns.DetailId from DetailNotifications dns where dns.DateCreated > cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime) group by dns.DetailId) rl
			  join Detail on Detail.DetailId = rl.DetailId
			  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) ap
			  outer apply (select top 1 ApprovalId, ApprovalDate from (select top 2 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) a order by ApprovalDate desc) ad
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, dn.OrigVendorId, dn.NewVendorId, dn.OrigItemId, dn.OrigBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and dn.NewVendorId = dn.OrigVendorId and dn.OrigItemId != dn.NewItemId order by dn.DateCreated) pc1
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, dn.OrigVendorId, dn.NewVendorId, dn.NewBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and dn.OrigVendorId = dn.NewVendorId and dn.OrigVendorId = pc1.OrigVendorId and dn.NewItemId != dn.OrigItemId and dn.OrigItemId = pc1.OrigItemId and dn.NewBidPrice = pc1.OrigBidPrice and dn.DateCreated > coalesce(pc1.DateCreated,cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)) order by dn.DateCreated) pc2
			  outer apply (select top 1  Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) and Approvals.ApprovalDate between pc1.DateCreated and pc2.DateCreated order by Approvals.ApprovalDate) bap
			 where pc1.DetailNotificationId is not null
			   and pc2.DetailNotificationId is not null
			   and bap.ApprovalId is null
			   and (pc2.DateCreated < ap.ApprovalDate)
*/
/*
select *
  from vw_PendingDetailChangeNotifications dcn
 where dcn.DetailId in (1493689815,1495351877)
select *
  from Requisitions
 where RequisitionId = 56409971
select top 1000 *
  from DebugMsgs dm
 where LogDate > cast('03/01/2022 0:00' as datetime)
   and msg not like 'Copying Requisition%'
   and msg not like 'ReqList=%'
   and msg not like 'PricingConsolidated%'
   and msg not like 'Deleting Empty%'
select *
  from DetailNotifications dn
  join Detail on Detail.DetailId = dn.DetailId
 where Detail.RequisitionId = 59250297

select *
  from Detail
  join vw_DetailNotifications dn on dn.DetailId = Detail.DetailId
 where Detail.RequisitionId = 56408103
   and Detail.DetailId in (1493689815,1495351877)
 order by dn.DetailId, dn.DateCreated
--select * from SessionTable where SessionId = 1783195693
select *
  from Requisitions
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
  join DetailNotifications dn on dn.DetailId = Detail.DetailId
  join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
 where Requisitions.RequisitionId = 56420791
 order by Detail.RequisitionId, Detail.DetailId, Dn.DateCreated, Approvals.ApprovalDate
*/
/*
select District.Name, Budgets.Name, Users.CometId, Requisitions.UserAccountId, count(*), (Select count(*) from Requisitions r1 where r1.UserAccountId = Requisitions.UserAccountId)
  from Requisitions
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
  join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
  join Users on Users.UserId = Requisitions.UserId
 where Requisitions.DateEntered > cast('11/01/2021' as datetime)
   and exists(Select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (2,3))
   and (   (BudgetAccounts.UseAllocations = 1 and BudgetAccounts.AmountAvailable < 0)
        or (UserAccounts.UseAllocations = 1 and UserAccounts.AllocationAvailable < 0))
   and Requisitions.RequisitionId not in (
		select R.RequisitionId
		  from vw_PendingDetailChangeNotifications dcn 
		  join Detail on Detail.DetailId = dcn.DetailId 
		  join Requisitions R on R.RequisitionId = Detail.RequisitionId 
		 group by R.RequisitionId)
 group by District.Name, Budgets.Name, Users.CometId, Requisitions.UserAccountId --with cube
 having (Select count(*) from Requisitions r1 where r1.UserAccountId = Requisitions.UserAccountId) = 1
 order by District.Name, Budgets.Name, Users.CometId, Requisitions.UserAccountId
*/
/*
select Requisitions.userId
  from vw_PendingDetailChangeNotifications dcn 
  join Detail on Detail.DetailId = dcn.DetailId 
  join REquisitions on Requisitions.RequisitionId = Detail.RequisitionId 
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId 
                              and UserAccounts.UseAllocations = 1 
							  and UserAccounts.AllocationAvailable < 0 
 where UserAccounts.userAccountId is not null 
   and dcn.NotificationType = 'User'
 group by Requisitions.userId
 order by dcn.DetailId, DateCreated, NotificationType
select Notificationtype, Email
from (
select * from vw_PendingDetailChangeNotifications
) ss group by Notificationtype, Email order by Email, Notificationtype

*/

CREATE     view  [dbo].[vw_PendingDetailChangeNotifications] as
SELECT DN.DetailNotificationId, DN.DetailId, DN.NotificationId, DN.DateCreated, DN.OrigItemId, DN.NewItemId, DN.OrigVendorId, DN.NewVendorId, DN.OrigBidPrice, DN.NewBidPrice,
	   requisitions.UserId ReqUserId, Approvals.ApprovalById, CASE WHEN requisitions.UserId = Approvals.ApprovalById THEN 'User' ELSE 'Approver' END NotificationType, Isnull(Users.Email,'') Email
FROM [dbo].[Detail] DET
JOIN vw_DetailNotifications DN ON DN.DetailId = DET.DetailId
JOIN Requisitions ON Requisitions.RequisitionId = DET.RequisitionId 
                 and isnull(Requisitions.OrderType,1) = 1
JOIN Budgets on Budgets.BudgetId = Requisitions.BudgetId
JOIN Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
              and Approvals.StatusId in (2,3)
JOIN Users on Users.UserId = Approvals.ApprovalById
--join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
--join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
WHERE DN.NotificationId is Null                     -- select only "Unprocessed" detail notifications     
--  and DATEDIFF(MM, DN.DateCreated, GETDATE()) < 3   -- select only within last 3 months
  and DN.DateCreated >= cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)    -- use this date for testing
  and not exists(Select Ap.ApprovalId from Approvals ap where ap.RequisitionId = Requisitions.RequisitionId and ap.StatusId in (4,6,35,45,49))
  and exists(Select Ap.ApprovalId from Approvals ap where ap.RequisitionId = Requisitions.RequisitionId and ap.StatusId in (2,3))
--  and Budgets.DistrictId in (400)
  and 2198 in (dn.NewVendorId, dn.OrigVendorId)
group by DN.DetailNotificationId, DN.DetailId, DN.NotificationId, DN.DateCreated, DN.OrigItemId, DN.NewItemId, DN.OrigVendorId, DN.NewVendorId, DN.OrigBidPrice, DN.NewBidPrice,
	   requisitions.UserId, Approvals.ApprovalById, CASE WHEN requisitions.UserId = Approvals.ApprovalById THEN 'User' ELSE 'Approver' END, Isnull(Users.Email,'')
/* Standard Code temporarily replaced with Staples Only for Certain districts code
SELECT DN.DetailNotificationId, DN.DetailId, DN.NotificationId, DN.DateCreated, DN.OrigItemId, DN.NewItemId, DN.OrigVendorId, DN.NewVendorId, DN.OrigBidPrice, DN.NewBidPrice,
	   requisitions.UserId ReqUserId, Approvals.ApprovalById, CASE WHEN requisitions.UserId = Approvals.ApprovalById THEN 'User' ELSE 'Approver' END NotificationType, Isnull(Users.Email,'') Email
FROM [dbo].[Detail] DET
JOIN vw_DetailNotifications DN ON DN.DetailId = DET.DetailId
JOIN Requisitions ON Requisitions.RequisitionId = DET.RequisitionId 
                 and isnull(Requisitions.OrderType,1) = 1
JOIN Budgets on Budgets.BudgetId = Requisitions.BudgetId
JOIN Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
              and Approvals.StatusId in (2,3)
JOIN Users on Users.UserId = Approvals.ApprovalById
join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
WHERE DN.NotificationId is Null                     -- select only "Unprocessed" detail notifications     
--  and DATEDIFF(MM, DN.DateCreated, GETDATE()) < 3   -- select only within last 3 months
  and DN.DateCreated >= cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)    -- use this date for testing
  and not exists(Select Ap.ApprovalId from Approvals ap where ap.RequisitionId = Requisitions.RequisitionId and ap.StatusId in (4,6,35,45,49))
  and (   (BudgetAccounts.UseAllocations = 1 and BudgetAccounts.AmountAvailable < 0)
       or (UserAccounts.UseAllocations = 1 and UserAccounts.AllocationAvailable < 0))
group by DN.DetailNotificationId, DN.DetailId, DN.NotificationId, DN.DateCreated, DN.OrigItemId, DN.NewItemId, DN.OrigVendorId, DN.NewVendorId, DN.OrigBidPrice, DN.NewBidPrice,
	   requisitions.UserId, Approvals.ApprovalById, CASE WHEN requisitions.UserId = Approvals.ApprovalById THEN 'User' ELSE 'Approver' END, Isnull(Users.Email,'')
*/
```
