# View: `dbo.vw_DetailNotifications`

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

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `Detail` | USER_TABLE |
| `DetailNotifications` | USER_TABLE |
| `vw_RefList` | VIEW |

## Used by

| Object | Type |
|--------|------|
| `dbo.usp_EmailBlastSetNotificationBlastHTMLApprover` | SQL_STORED_PROCEDURE |
| `dbo.usp_EmailBlastSetNotificationBlastHTMLRequisitioner` | SQL_STORED_PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeApprover_NotUsed` | SQL_STORED_PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeRequistioner_NotUsed` | SQL_STORED_PROCEDURE |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed`](dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed.md) | VIEW |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed`](dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed.md) | VIEW |
| [`dbo.vw_PendingDetailChangeNotifications`](dbo.vw_PendingDetailChangeNotifications.md) | VIEW |

## Definition

```sql
--select * from Detail join vw_DetailNotifications dn on dn.DetailId = Detail.DetailId where Detail.RequisitionId = 58399095

CREATE   view [dbo].[vw_DetailNotifications] as
  select dn.DetailNotificationId, 
         dn.DetailId, 
		 dn.NotificationId, 
		 dn.DateCreated, 
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null then nbpi.OrigItemId else dn.OrigItemId end as int) OrigItemId, 
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null then nbpi.NewItemId else dn.NewItemId end as int) NewItemId, 
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null then nbpi.OrigVendorId else dn.OrigVendorId end as int) OrigVendorId, 
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null then nbpi.NewVendorId else coalesce(dn.NewVendorId,7691) end as int) NewVendorId, 
		 case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null then nbpi.OrigBidPrice else dn.OrigBidPrice end OrigBidPrice, 
		 case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null then nbpi.NewBidPrice else dn.NewBidPrice end NewBidPrice
/*
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null and nbpi.OrigItemId = nbpi.NewItemId and nbpi.OrigVendorId = nbpi.NewVendorId then nbpi.OrigItemId else dn.OrigItemId end as int) OrigItemId, 
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null and nbpi.OrigItemId = nbpi.NewItemId and nbpi.OrigVendorId = nbpi.NewVendorId then nbpi.NewItemId else dn.NewItemId end as int) NewItemId, 
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null and nbpi.OrigItemId = nbpi.NewItemId and nbpi.OrigVendorId = nbpi.NewVendorId then nbpi.OrigVendorId else dn.OrigVendorId end as int) OrigVendorId, 
		 cast(case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null and nbpi.OrigItemId = nbpi.NewItemId and nbpi.OrigVendorId = nbpi.NewVendorId then nbpi.NewVendorId else coalesce(dn.NewVendorId,7691) end as int) NewVendorId, 
		 case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null and nbpi.OrigItemId = nbpi.NewItemId and nbpi.OrigVendorId = nbpi.NewVendorId then nbpi.OrigBidPrice else dn.OrigBidPrice end OrigBidPrice, 
		 case when nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null and nbpi.OrigItemId = nbpi.NewItemId and nbpi.OrigVendorId = nbpi.NewVendorId then nbpi.NewBidPrice else dn.NewBidPrice end NewBidPrice
*/
    from DetailNotifications dn
	outer apply (select tonb.DetailNotificationId toDetailNotificationId, fromnb.DetailNotificationId fromDetailNotificationId, tonb.DateCreated toDateCreated, fromnb.DateCreated fromDateCreated,
						tonb.OrigVendorId, tonb.OrigBidPrice, tonb.OrigItemId, fromnb.NewVendorId, fromnb.NewBidPrice, fromnb.NewItemId
				   from (select dns.DetailId 
				           from DetailNotifications dns 
						   join vw_RefList vrl on vrl.DetailId = dns.DetailId
						  where dns.DetailId = dn.DetailId 
						    and dns.DateCreated > cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime) 
						  group by dns.DetailId) rl
				   join Detail on Detail.DetailId = rl.DetailId
				   outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate 
				                  from Approvals 
								 where Approvals.RequisitionId = Detail.RequisitionId 
								   and Approvals.StatusId in (2,3) 
								 order by Approvals.ApprovalDate) ap
				   outer apply (select top 1 ApprovalId, ApprovalDate 
				                  from (select top 2 Approvals.ApprovalId, Approvals.ApprovalDate 
								          from Approvals 
										 where Approvals.RequisitionId = Detail.RequisitionId 
										   and Approvals.StatusId in (2,3) 
										 order by Approvals.ApprovalDate) a 
								 order by ApprovalDate desc) ad
			       outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId,7691) NewVendorId, dn.OrigBidPrice, dn.OrigItemId
				                  from DetailNotifications dn 
								 where dn.DetailId = rl.DetailId 
								   and coalesce(dn.NewVendorId,7691) = 7691 
								   and coalesce(dn.OrigVendorId,7691) != 7691 
								 order by dn.DateCreated) tonb
			       outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId,7691) NewVendorId, dn.NewBidPrice, dn.NewItemId
				                  from DetailNotifications dn 
								 where dn.DetailId = rl.DetailId 
								   and coalesce(dn.OrigVendorId,7691) = 7691 
								   and coalesce(dn.NewVendorId,7691) != 7691 
								   and dn.DateCreated > coalesce(tonb.DateCreated,cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)) 
								 order by dn.DateCreated) fromnb
			       outer apply (select top 1  Approvals.ApprovalId 
				                  from Approvals 
								 where Approvals.RequisitionId = Detail.RequisitionId 
								   and Approvals.StatusId in (2,3) 
								   and Approvals.ApprovalDate between tonb.DateCreated and fromnb.DateCreated 
								 order by Approvals.ApprovalDate) bap
			      where tonb.DetailNotificationId is not null
			        and fromnb.DetailNotificationId is not null
--			        and bap.ApprovalId is null
			        and (   tonb.OrigBidPrice < fromnb.NewBidPrice
					     or fromnb.DateCreated < ap.ApprovalDate)) nbpi
   where not (nbpi.toDetailNotificationId is not null and nbpi.fromDetailNotificationId is not null and nbpi.fromDetailNotificationId = dn.DetailNotificationId)
     and dn.DetailNotificationId not in (
			select tonb.DetailNotificationId 
			  from (select dns.DetailId from DetailNotifications dns where dns.DetailId = dn.DetailId and dns.DateCreated > cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime) group by dns.DetailId) rl
			  join Detail on Detail.DetailId = rl.DetailId
			  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) ap
			  outer apply (select top 1 ApprovalId, ApprovalDate from (select top 2 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) a order by ApprovalDate desc) ad
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.OrigBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.NewVendorId,7691) = 7691 and coalesce(dn.OrigVendorId,7691) != 7691 order by dn.DateCreated) tonb
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.NewBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.OrigVendorId,7691) = 7691 and coalesce(dn.NewVendorId,7691) != 7691 and dn.DateCreated > coalesce(tonb.DateCreated,cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)) order by dn.DateCreated) fromnb
			  outer apply (select top 1  Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) and Approvals.ApprovalDate between tonb.DateCreated and fromnb.DateCreated order by Approvals.ApprovalDate) bap
			 where tonb.DetailNotificationId is not null
			   and fromnb.DetailNotificationId is not null
--			   and bap.ApprovalId is null
			   and (   tonb.OrigBidPrice >= fromnb.NewBidPrice
					or fromnb.DateCreated < ap.ApprovalDate)
			union
			select fromnb.DetailNotificationId 
			  from (select dns.DetailId from DetailNotifications dns where dns.DetailId = dn.DetailId and dns.DateCreated > cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime) group by dns.DetailId) rl
			  join Detail on Detail.DetailId = rl.DetailId
			  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) ap
			  outer apply (select top 1 ApprovalId, ApprovalDate from (select top 2 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) a order by ApprovalDate desc) ad
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.OrigBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.NewVendorId,7691) = 7691 and coalesce(dn.OrigVendorId,7691) != 7691 order by dn.DateCreated) tonb
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.NewBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.OrigVendorId,7691) = 7691 and coalesce(dn.NewVendorId,7691) != 7691 and dn.DateCreated > coalesce(tonb.DateCreated,cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)) order by dn.DateCreated) fromnb
			  outer apply (select top 1  Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) and Approvals.ApprovalDate between tonb.DateCreated and fromnb.DateCreated order by Approvals.ApprovalDate) bap
			 where tonb.DetailNotificationId is not null
			   and fromnb.DetailNotificationId is not null
--			   and bap.ApprovalId is null
			   and (   tonb.OrigBidPrice >= fromnb.NewBidPrice
					or fromnb.DateCreated < ap.ApprovalDate)
			union
			select pc1.DetailNotificationId 
			  from (select dns.DetailId from DetailNotifications dns where dns.DetailId = dn.DetailId and dns.DateCreated > cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime) group by dns.DetailId) rl
			  join Detail on Detail.DetailId = rl.DetailId
			  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) ap
			  outer apply (select top 1 ApprovalId, ApprovalDate from (select top 2 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) a order by ApprovalDate desc) ad
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.OrigItemId, dn.OrigBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.NewVendorId,7691) = dn.OrigVendorId and dn.OrigItemId = dn.NewItemId order by dn.DateCreated) pc1
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.NewBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.OrigVendorId,7691) = dn.NewVendorId and coalesce(dn.OrigVendorId,7691) = pc1.OrigVendorId and dn.NewItemId = dn.OrigItemId and dn.OrigItemId = pc1.OrigItemId and dn.NewBidPrice = pc1.OrigBidPrice and dn.DateCreated > coalesce(pc1.DateCreated,cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)) order by dn.DateCreated) pc2
			  outer apply (select top 1  Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) and Approvals.ApprovalDate between pc1.DateCreated and pc2.DateCreated order by Approvals.ApprovalDate) bap
			 where pc1.DetailNotificationId is not null
			   and pc2.DetailNotificationId is not null
--			   and bap.ApprovalId is null
			   and (pc2.DateCreated < ap.ApprovalDate
			        or (    pc1.DateCreated > ap.ApprovalDate
					    and pc2.DateCreated > ap.ApprovalDate))
			union
			select pc2.DetailNotificationId 
			  from (select dns.DetailId from DetailNotifications dns where dns.DetailId = dn.DetailId and dns.DateCreated > cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime) group by dns.DetailId) rl
			  join Detail on Detail.DetailId = rl.DetailId
			  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) ap
			  outer apply (select top 1 ApprovalId, ApprovalDate from (select top 2 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) order by Approvals.ApprovalDate) a order by ApprovalDate desc) ad
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.OrigItemId, dn.OrigBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.NewVendorId,7691) = dn.OrigVendorId and dn.OrigItemId = dn.NewItemId order by dn.DateCreated) pc1
			  outer apply (select top 1 dn.DetailNotificationId, dn.DateCreated, coalesce(dn.OrigVendorId, 7691) OrigVendorId, coalesce(dn.NewVendorId, 7691) NewVendorId, dn.NewBidPrice from DetailNotifications dn where dn.DetailId = rl.DetailId and coalesce(dn.OrigVendorId,7691) = dn.NewVendorId and coalesce(dn.OrigVendorId,7691) = pc1.OrigVendorId and dn.NewItemId = dn.OrigItemId and dn.OrigItemId = pc1.OrigItemId and dn.NewBidPrice = pc1.OrigBidPrice and dn.DateCreated > coalesce(pc1.DateCreated,cast('12/01/' + cast(year(getdate())-1 as varchar) as datetime)) order by dn.DateCreated) pc2
			  outer apply (select top 1  Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Detail.RequisitionId and Approvals.StatusId in (2,3) and Approvals.ApprovalDate between pc1.DateCreated and pc2.DateCreated order by Approvals.ApprovalDate) bap
			 where pc1.DetailNotificationId is not null
			   and pc2.DetailNotificationId is not null
--			   and bap.ApprovalId is null
			   and (pc2.DateCreated < ap.ApprovalDate
			        or (    pc1.DateCreated > ap.ApprovalDate
					    and pc2.DateCreated > ap.ApprovalDate))
			)
```
