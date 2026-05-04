# Procedure: `dbo.usp_POStatusByRep`

_Generated on 2026-05-04T13:04:24.376Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_POStatusByRep` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-04-21 15:27:48 |
| Modified | 2021-04-21 17:44:45 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `CSRep` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `ScheduleTypes` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_POStatusByRep as
begin
declare @BaseYear int = year(getdate()) - 1, 
		@CurrentYear int = year(getdate()),
		@NJGrowthFactor float = 0.0678,--0.10686128818636, --0.0678,
		@NYGrowthFactor float = 0.1155,--0.06097285239229, --0.1155,
		@NJPOFactor float = 1.3083,
		@NYPOFactor float = 1.4331


select CSrep.Name RepName, Schedule.StateId, Schedule.Name ScheduleName, case when Requisitions.DateEntered > cast('11/01/' + cast(@BaseYear as varchar) as datetime) then @CurrentYear else @BaseYear end Year, count(*) Reqs, sum(POCount.Counter) POs,
       sum(case when Requisitions.DateEntered between cast('11/01/2016' as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@BaseYear as varchar) as datetime) then 1 else 0 end) PITReqs,
	   sum(POCountBase.Counter) PITPOs
  into #WorkList
  from Requisitions
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and District.County != 'TEST'
   join CSRep on CSRep.CSRepId = District.CSRepId
  outer apply (select ScheduleTypes.StateId, ScheduleTypes.Name from ScheduleTypes where ScheduleTypes.ScheduleId = case when District.ScheduleId is null then case when District.State = 'NJ' then 5 else 8 end else District.ScheduleId end) Schedule
  outer apply (select count(*) Counter from PO where PO.RequisitionId = Requisitions.RequisitionId) POCount
  outer apply (select count(*) Counter from PO where PO.RequisitionId = Requisitions.RequisitionId and Requisitions.OrderDate between cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime) and cast(cast(month(getdate()) as varchar) + '/' + cast(day(getdate()) as varchar) + '/' + cast(@BaseYear as varchar) as datetime)) POCountBase
 where Requisitions.DateEntered > cast('11/01/' + cast(@BaseYear - 1 as varchar) as datetime)
   and coalesce(Requisitions.OrderType,1) = 1
 group by CSrep.Name, Schedule.StateId, Schedule.Name, case when Requisitions.DateEntered > cast('11/01/' + cast(@BaseYear as varchar) as datetime) then @CurrentYear else @BaseYear end

--Average Growth Rate last 4 years
--Reqs 0.082244093	
--POs  0.076855046


select RepName, Year, ScheduleName, Reqs, POs, PITReqs, PITPOs, cast(PITReqs as float) / Reqs ReqPct, case when POs != 0 then cast(PITPOs as float) / POs  else 0 end POPct
  into #TotalList
  from (
	select RepName, Year, ScheduleName, Reqs, POs, PITReqs, PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	union
	Select RepName, Year, ScheduleName,
		   cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int),
		   cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int),
		   s.Reqs,
		   s.POs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.RepName = s.RepName and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	union
	select RepName, Year, substring(ScheduleName,1,2) + ' Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by RepName, Year, substring(ScheduleName,1,2)
	union
	select RepName, Year, 'Year Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by RepName, Year
	union
	Select RepName, Year, substring(ScheduleName,1,2) + ' Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.RepName = s.RepName and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by RepName, Year, substring(ScheduleName,1,2)
	union
	Select RepName, Year, 'Year Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.RepName = s.RepName and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by RepName, Year
	union
	select 'System Totals', Year, ScheduleName, sum(Reqs), sum(POs), sum(PITReqs), sum(PITPOs)
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by Year, ScheduleName
	union
	select 'System Totals', Year, substring(ScheduleName,1,2) + ' Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by Year, substring(ScheduleName,1,2)
	union
	select 'System Totals', Year, 'Year Totals', sum(Reqs) Reqs, sum(POs) POs, sum(PITReqs) PITReqs, sum(PITPOs) PITPOs
	  from #WorkList s
	 where s.Year = @BaseYear
	 group by Year
	union
	Select 'System Totals', Year, ScheduleName,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)),
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)),
		   sum(s.Reqs),
		   sum(s.POs)
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.RepName = s.RepName and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by Year, ScheduleName
	union
	Select 'System Totals', Year, substring(ScheduleName,1,2) + ' Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.RepName = s.RepName and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by Year, substring(ScheduleName,1,2)
	union
	Select 'System Totals', Year, 'Year Totals',
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) as int)) Reqs,
		   sum(cast((cast(py.Reqs as float) / (cast(1 as float) - case when s.StateId = 1 then @NJGrowthFactor else @NYGrowthFactor end)) * case when s.StateId = 1 then @NJPOFactor else @NYPOFactor end as int)) POs,
		   sum(s.Reqs) PITReqs,
		   sum(s.POs) PITPOs
	  from #WorkList s
	  outer apply (select wl.Reqs, wl.POs from #WorkList wl where wl.RepName = s.RepName and wl.Year = @BaseYear and wl.ScheduleName = s.ScheduleName) py
	 where s.Year = @CurrentYear
	 group by Year
 ) fd

 drop table #WorkList

select tl.RepName [Rep], cast(tl.Year as varchar) [Year], tl.ScheduleName [Scedule], tl.Reqs [Total Reqs], tl.POs [Total PO's], tl.PITReqs [PIT Reqs], tl.PITPOs [PIT PO's], tl.ReqPct [Reqs %], tl.POPct [PO's %], 
       case when tl.[Year] = @CurrentYear then cast(cast((tl.ReqPct - py.ReqPct) * 100 as decimal(11,2)) as varchar) + '%' else '' end [Reqs Variance YoY %], 
	   case when tl.[Year] = @CurrentYear then cast(cast((tl.POPct - py.POPct) * 100 as decimal(11,2)) as varchar) + '%' else '' end [PO's Variance YoY %]
  from #TotalList tl
  outer apply (select * from #TotalList pt where pt.RepName = tl.RepName and pt.Year = @BaseYear and pt.ScheduleName = tl.ScheduleName) py
 where tl.Reqs is not null
 order by tl.RepName, tl.Year, tl.ScheduleName

drop table #TotalList
/*
 select District.State, District.Name, sum(EstPOCount.Count), sum(POCount.Count)
   from District
   join Budgets on Budgets.DistrictId = District.DistrictId
               and year(Budgets.StartDate) = 2019
   join CSRep on CSRep.CSRepId = District.CSRepId
   join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
   outer apply (select count(*) [Count] from (select Detail.VendorId from Detail where Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 and coalesce(Detail.ItemMustBeBid,0) = 0 group by Detail.VendorId) vc) EstPOCount
   outer apply (select count(*) [Count] from PO where PO.RequisitionId = REquisitions.RequisitionId) POCount
 where District.County != 'TEST'
   and exists(select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6,35,45))
 group by District.State, District.Name
 having sum(EstPOCount.Count) != sum(POCount.Count)
 order by District.State, District.Name

select *
  from #WorkList

*/
end
```
