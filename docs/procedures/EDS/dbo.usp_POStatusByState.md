# Procedure: `dbo.usp_POStatusByState`

_Generated on 2026-05-04T13:04:24.377Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_POStatusByState` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-05-05 07:31:34 |
| Modified | 2023-05-18 09:57:32 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `CSRep` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `ScheduleTypes` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_POStatusByState
CREATE     procedure [dbo].[usp_POStatusByState] as
begin
declare @BaseYear int = year(getdate()) - 1, 
		@CurrentYear int = year(getdate()),
		@NJGrowthFactor float = 0.0678,--0.10686128818636, --0.0678,
		@NYGrowthFactor float = 0.1155,--0.06097285239229, --0.1155,
		@NJPOFactor float = 1.3083,
		@NYPOFactor float = 1.4331

create table #WorkList (
StateId			int null,
ScheduleName	varchar(50) null,
[Year]			int null,
Reqs			int null,
POs				int null,
PITReqs			int null,
PITSubmittedReqs int null,
PITPOs			int null)

-- Get Base Year Numbers
insert #WorkList (StateId, ScheduleName, [Year], Reqs, POs, PITReqs, PITSubmittedReqs, PITPOs)
select Schedule.StateId, Schedule.Name ScheduleName, 
       @BaseYear [Year], count(*) Reqs, sum(POCount.Counter) POs,
       sum(case 
	         when Requisitions.DateEntered between cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@BaseYear as varchar) as datetime) then 1 
			 else 0 
		   end) PITReqs,
       sum(case 
	         when isnull(ap.StatusId,0) > 1 and Requisitions.DateEntered between cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@BaseYear as varchar) as datetime) then 1 
			 else 0 
		   end) PITSubmittedReqs,
	   sum(case 
	         when isnull(POCount.Counter,0) != 0 and Requisitions.OrderDate between cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@BaseYear as varchar) as datetime) then POCount.Counter 
			 else 0 
		   end) PITPOs
  from Requisitions
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and District.County != 'TEST'
  join CSRep on CSRep.CSRepId = District.CSRepId
  outer apply (select ScheduleTypes.StateId, ScheduleTypes.Name 
                 from ScheduleTypes 
				where ScheduleTypes.ScheduleId = case 
				                                   when District.ScheduleId is null 
													 then case 
													        when District.State = 'NJ' 
															  then 5 
															else 8 
														  end 
													 else District.ScheduleId 
												   end) Schedule
  outer apply (select count(*) Counter 
                 from (select count(*) Lines 
				         from Detail 
						where Detail.RequisitionId = Requisitions.RequisitionId 
						  and Detail.VendorId != 7691 
						group by Detail.VendorId) POs 
				where exists(select Approvals.ApprovalId 
				               from Approvals 
							  where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6,35,45,49))
			   ) POCount
  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate, Approvals.StatusId
                 from Approvals
				where Approvals.RequisitionId = Requisitions.RequisitionId
				  and case 
	                    when Approvals.ApprovalDate between cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@BaseYear as varchar) as datetime) then 1 
						else 0 
					  end = 1
				order by Approvals.ApprovalDate Desc) ap
--  outer apply (select count(*) Counter from PO where PO.RequisitionId = Requisitions.RequisitionId) POCount
--  outer apply (select count(*) Counter from PO where PO.RequisitionId = Requisitions.RequisitionId and Requisitions.OrderDate between cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@BaseYear as varchar) as datetime)) POCountBase
 where Requisitions.DateEntered between cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime) and cast('11/01/' + cast(@BaseYear as varchar) as datetime)
   and coalesce(Requisitions.OrderType,1) = 1
   and isnull(ap.StatusId,0) != 4
 group by Schedule.StateId, Schedule.Name

-- Get Current Year Numbers
insert #WorkList (StateId, ScheduleName, [Year], Reqs, POs, PITReqs, PITSubmittedReqs, PITPOs)
select Schedule.StateId, Schedule.Name ScheduleName, 
       @CurrentYear [Year], count(*) Reqs, sum(POCount.Counter) POs,
       count(*) PITReqs,
       sum(case 
	         when isnull(ap.StatusId,0) > 1 then 1 
			 else 0 
		   end) PITSubmittedReqs,
	   sum(isnull(POCount.Counter,0)) PITPOs
  from Requisitions
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and District.County != 'TEST'
  join CSRep on CSRep.CSRepId = District.CSRepId
  outer apply (select ScheduleTypes.StateId, ScheduleTypes.Name 
                 from ScheduleTypes 
				where ScheduleTypes.ScheduleId = case 
				                                   when District.ScheduleId is null 
													 then case 
													        when District.State = 'NJ' 
															  then 5 
															else 8 
														  end 
													 else District.ScheduleId 
												   end) Schedule
  outer apply (select count(*) Counter 
                 from (select count(*) Lines 
				         from Detail 
						where Detail.RequisitionId = Requisitions.RequisitionId 
						  and Detail.VendorId != 7691 
						group by Detail.VendorId) POs 
				where exists(select Approvals.ApprovalId 
				               from Approvals 
							  where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6,35,45,49))
			   ) POCount
  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate, Approvals.StatusId
                 from Approvals
				where Approvals.RequisitionId = Requisitions.RequisitionId
				  and case 
	                    when Approvals.ApprovalDate between cast('11/01/' + cast(@CurrentYear - 1 as varchar) as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@CurrentYear as varchar) as datetime) then 1 
						else 0 
					  end = 1
				order by Approvals.ApprovalDate Desc) ap
 where Requisitions.DateEntered > cast('11/01/' + cast(@CurrentYear - 1 as varchar) as datetime)
   and coalesce(Requisitions.OrderType,1) = 1
   and isnull(ap.StatusId,0) != 4
 group by Schedule.StateId, Schedule.Name

--Average Growth Rate last 4 years
--Reqs 0.082244093	
--POs  0.076855046


select StateId, Year, ScheduleName, Reqs, POs, PITReqs, PITSubmittedReqs, PITPOs, cast(PITReqs as float) / Reqs ReqPct, cast(PITSubmittedReqs as float) / Reqs SubmittedReqPct, case when POs != 0 then cast(PITPOs as float) / POs  else 0 end POPct
  into #TotalList
  from (
	select StateId, Year, ScheduleName, Reqs, POs, PITReqs, PITSubmittedReqs, PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	union
	Select StateId, Year, ScheduleName,
		   cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int),
		   cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int),
		   s.Reqs,
		   s.PITSubmittedReqs,
		   s.POs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.PITSubmittedReqs, wl.POs from #WorkList wl where wl.StateId = s.StateId and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	union
	select StateId, Year, substring(ScheduleName,1,2) + ' Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITSubmittedReqs) PITSubmittedReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by StateId, Year, substring(ScheduleName,1,2)
	union
	select StateId, Year, 'Year Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITSubmittedReqs) PITSubmittedReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by StateId, Year
	union
	Select StateId, Year, substring(ScheduleName,1,2) + ' Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.PITSubmittedReqs) PITSubmittedReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.StateId = s.StateId and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by StateId, Year, substring(ScheduleName,1,2)
	union
	Select StateId, Year, 'Year Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.PITSubmittedReqs) PITSubmittedReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.StateId = s.StateId and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by StateId, Year
	union
	select null StateId, Year, ScheduleName, sum(Reqs), sum(POs), sum(PITReqs), sum(PITSubmittedReqs) PITSubmittedReqs, sum(PITPOs)
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by Year, ScheduleName
	union
	select null StateId, Year, substring(ScheduleName,1,2) + ' Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITSubmittedReqs) PITSubmittedReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by Year, substring(ScheduleName,1,2)
	union
	select null StateId, Year, 'Year Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITSubmittedReqs) PITSubmittedReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by Year
	union
	Select null StateId, Year, ScheduleName,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)),
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)),
		   sum(s.Reqs),
		   sum(s.PITSubmittedReqs) PITSubmittedReqs,
		   sum(s.POs)
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.StateId = s.StateId and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by Year, ScheduleName
	union
	Select null StateId, Year, substring(ScheduleName,1,2) + ' Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.PITSubmittedReqs) PITSubmittedReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.StateId = s.StateId and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by Year, substring(ScheduleName,1,2)
	union
	Select null StateId, Year, 'Year Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.PITSubmittedReqs) PITSubmittedReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.StateId = s.StateId and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by Year
 ) fd

 drop table #WorkList

select case when tl.StateId is null then 'System Totals' when tl.StateId = 1 then 'NJ' when tl.StateId = 2 then 'NY' else 'Unknown' end [State], cast(tl.Year as varchar) [Year], tl.ScheduleName [Scedule], 
       tl.Reqs [Total Reqs], tl.POs [Total PO's], tl.PITReqs [PIT Reqs], tl.PITSubmittedReqs [PIT Submitted Reqs], tl.PITPOs [PIT PO's], tl.ReqPct [Reqs %], tl.SubmittedReqPct [Submitted Reqs %], tl.POPct [PO's %], 
       case when tl.[Year] = @CurrentYear then cast(cast((tl.ReqPct - py.ReqPct) * 100 as decimal(11,2)) as varchar) + '%' else '' end [Reqs Variance YoY %], 
       case when tl.[Year] = @CurrentYear then cast(cast((tl.SubmittedReqPct - py.SubmittedReqPct) * 100 as decimal(11,2)) as varchar) + '%' else '' end [Submited Reqs Variance YoY %], 
	   case when tl.[Year] = @CurrentYear then cast(cast((tl.POPct - py.POPct) * 100 as decimal(11,2)) as varchar) + '%' else '' end [PO's Variance YoY %]
  from #TotalList tl
  outer apply (select * from #TotalList pt where coalesce(pt.StateId,0) = coalesce(tl.StateId,0) and pt.Year = @BaseYear and pt.ScheduleName = tl.ScheduleName) py
 where tl.Reqs is not null
 order by tl.StateId, tl.Year, tl.ScheduleName

drop table #TotalList

end
```
