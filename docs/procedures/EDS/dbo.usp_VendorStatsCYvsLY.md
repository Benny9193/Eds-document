# Procedure: `dbo.usp_VendorStatsCYvsLY`

_Generated on 2026-05-04T13:04:00.769Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_VendorStatsCYvsLY` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-04-12 16:26:29 |
| Modified | 2025-05-08 16:15:38 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pVendorId` | IN | int |  |
| 2 | `@DistrictLevel` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_VendorStatsCYvsLY 9,1
CREATE   procedure [dbo].[usp_VendorStatsCYvsLY] @pVendorId int, @DistrictLevel int = 0
as
begin
set transaction isolation level read uncommitted

declare @Week1Start0 datetime,
	@Week1Start1 datetime,
	@WeekNbr int,
	@WeekStart0 datetime,
	@WeekStart1 datetime,
	@VendorId int,
	@VendorName varchar(50),
	@BudgetYear0 char(4),
	@BudgetYear1 char(4),
	@StartDate datetime,
	@PriorSaturday datetime,
	@Rundate datetime,
	@LastYearBidDate datetime,
	@ThisYearBidDate datetime

select @Rundate = CAST(cast(month(getdate()) as varchar(2)) + '/' + cast(day(getdate()) as varchar(2)) + '/' + cast(year(getdate()) as varchar(4)) as datetime)
select @PriorSaturday = case when datepart(weekday,@Rundate) <= 7 then dateadd(day,1-(datepart(weekday,@Rundate)),@Rundate) else @Rundate end

select @BudgetYear0 = cast(year(getdate())-1 as varchar),
       @BudgetYear1 = cast(year(getdate()) as varchar),
       @StartDate = CAST('12/01/' + cast(year(getdate())-2 as varchar) as datetime),
       @LastYearBidDate = dateadd(year,-1,GETDATE()),
       @ThisYearBiddate = GETDATE()

  select @Week1Start0 = case when datepart(weekday,@StartDate) <= 7 then dateadd(day,1-(datepart(weekday,@StartDate)),@StartDate) else @StartDate end
  select @Week1Start1 = case when datepart(weekday,dateadd(year,1,@StartDate)) <= 7 then dateadd(day,1-(datepart(weekday,dateadd(year,1,@StartDate))),dateadd(year,1,@StartDate)) else dateadd(year,1,@StartDate) end
 print @Week1Start0
 print @Week1Start1
 print @PriorSaturday
/*
drop table #WeeklyTotals
--select * into #WeeklyTotals from WorkTables..weeklytotals

create table #WeeklyTotals (
VendorName varchar(50),
WeekStart0 datetime,
ReqsCreated0 int,
ReqLines0 int,
ReqsCreatedTotal0 money,
POsCreated0 int,
POsCreatedLines0 int,
POsCreatedTotal0 money,
POsSent0 int,
POsSentLines0 int,
POsSentTotal0 money,
WeekStart1 datetime,
ReqsCreated1 int,
ReqLines1 int,
ReqsCreatedTotal1 money,
POsCreated1 int,
POsCreatedLines1 int,
POsCreatedTotal1 money,
POsSent1 int,
POsSentLines1 int,
POsSentTotal1 money
)

declare VenCur cursor read_only for
select Vendors.VendorId, Vendors.Name
  from Vendors with (nolock)
 where Vendors.VendorId in (3, 9, 28, 168, 947, 1896, 10942)--(3, 9, 28, 168, 947)
 order by Vendors.Name

open VenCur

fetch next from vencur into @VendorId, @VendorName

while @@fetch_status = 0
begin
  select @Week1Start0 = case when datepart(weekday,@StartDate) < 7 then dateadd(day,0-(datepart(weekday,@StartDate)),@StartDate) else @StartDate end
  select @Week1Start1 = case when datepart(weekday,dateadd(year,1,@StartDate)) < 7 then dateadd(day,0-(datepart(weekday,dateadd(year,1,@StartDate))),dateadd(year,1,@StartDate)) else dateadd(year,1,@StartDate) end
--  select @Week1Start0 = dateadd(day,(1-datepart(weekday,@StartDate)) - 7,@StartDate)
--  select @Week1Start1 = dateadd(day,(1-datepart(weekday,dateadd(year,1,@StartDate))) - 7,dateadd(year,1,@StartDate))
  select @WeekNbr = 0
  while @WeekNbr < 52
  begin
    select @WeekStart0 = dateadd(day,@WeekNbr * 7,@Week1Start0)
    select @WeekStart1 = dateadd(day,@WeekNbr * 7,@Week1Start1)
    if @WeekStart1 >= @PriorSaturday
    begin
      break
    end
    print 'Processing ' + isnull(@VendorName,'') + ' for Week Starting ' + convert(varchar(20),@WeekStart1,101)
    insert #WeeklyTotals (VendorName, WeekStart0, WeekStart1, ReqsCreated0, ReqLines0, ReqsCreatedTotal0, POsCreated0, POsCreatedLines0, POsCreatedTotal0, POsSent0, POsSentLines0, POsSentTotal0,
    ReqsCreated1, ReqLines1, ReqsCreatedTotal1, POsCreated1, POsCreatedLines1, POsCreatedTotal1, POsSent1, POsSentLines1, POsSentTotal1)
      select @VendorName, @WeekStart0, @WeekStart1, 
             (select count(*) from Requisitions with (nolock) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where Requisitions.DateEntered between @WeekStart0 and dateadd(day,7,@WeekStart0) and Requisitions.StatusId != 4 and @VendorId in (select top 1 VendorId from Detail with (nolock) where Detail.VendorId = @VendorId and Detail.RequisitionId = Requisitions.RequisitionId)),
             (select count(*) from Detail with (nolock) join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.StatusId != 4 join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil left outer join SessionTable on SessionTable.SessionId = Detail.SessionId where Detail.VendorId = @VendorId and isnull(SessionTable.SessionStart, Requisitions.DateEntered) between @WeekStart0 and dateadd(day,7,@WeekStart0)),
             isnull((select sum(Detail.BidPrice * Detail.Quantity) from Detail with (nolock) join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.StatusId != 4 join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil left outer join SessionTable on SessionTable.SessionId = Detail.SessionId where Detail.VendorId = @VendorId and isnull(SessionTable.SessionStart, Requisitions.DateEntered) between @WeekStart0 and dateadd(day,7,@WeekStart0)),0),
             (select count(*) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId and Requisitions.OrderDate between @WeekStart0 and dateadd(day,7,@WeekStart0) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0),
             (select count(*) from PODetailItems with (nolock) join PO on PO.POId = PODetailItems.POId join Requisitions on Requisitions.RequisitionId = PO.RequisitionId and Requisitions.OrderDate between @WeekStart0 and dateadd(day,7,@WeekStart0) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0),
             isnull((select sum(PO.Amount) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId and Requisitions.OrderDate between @WeekStart0 and dateadd(day,7,@WeekStart0) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0),0),
             (select count(*) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId  and ISNULL(PO.Cancelled,0) = 0 and PO.ExportedToVendor between @WeekStart0 and dateadd(day,7,@WeekStart0)),
             (select count(*) from PODetailItems with (nolock) join PO on PO.POId = PODetailItems.POId join Requisitions on Requisitions.RequisitionId = PO.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId  and ISNULL(PO.Cancelled,0) = 0 and PO.ExportedToVendor between @WeekStart0 and dateadd(day,7,@WeekStart0)),
             isnull((select sum(PO.Amount) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @LastYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0 and PO.ExportedToVendor between @WeekStart0 and dateadd(day,7,@WeekStart0)),0),
             (select count(*) from Requisitions with (nolock) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where Requisitions.DateEntered between @WeekStart1 and dateadd(day,7,@WeekStart1) and @VendorId in (select top 1 VendorId from Detail with (nolock) where Detail.VendorId = @VendorId and Detail.RequisitionId = Requisitions.RequisitionId)),
             (select count(*) from Detail with (nolock) join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil left outer join SessionTable on SessionTable.SessionId = Detail.SessionId where Detail.VendorId = @VendorId and isnull(SessionTable.SessionStart, Requisitions.DateEntered) between @WeekStart1 and dateadd(day,7,@WeekStart1)),
             isnull((select sum(Detail.BidPrice * Detail.Quantity) from Detail with (nolock) join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil left outer join SessionTable on SessionTable.SessionId = Detail.SessionId where Detail.VendorId = @VendorId and isnull(SessionTable.SessionStart, Requisitions.DateEntered) between @WeekStart1 and dateadd(day,7,@WeekStart1)),0),
             (select count(*) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId and Requisitions.OrderDate between @WeekStart1 and dateadd(day,7,@WeekStart1) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0),
             (select count(*) from PODetailItems with (nolock) join PO on PO.POId = PODetailItems.POId join Requisitions on Requisitions.RequisitionId = PO.RequisitionId and Requisitions.OrderDate between @WeekStart1 and dateadd(day,7,@WeekStart1) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0),
             isnull((select sum(PO.Amount) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId and Requisitions.OrderDate between @WeekStart1 and dateadd(day,7,@WeekStart1) join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0),0),
             (select count(*) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0 and PO.ExportedToVendor between @WeekStart1 and dateadd(day,7,@WeekStart1)),
             (select count(*) from PODetailItems with (nolock) join PO on PO.POId = PODetailItems.POId join Requisitions on Requisitions.RequisitionId = PO.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0 and PO.ExportedToVendor between @WeekStart1 and dateadd(day,7,@WeekStart1)),
             isnull((select sum(PO.Amount) from PO with (nolock) join Requisitions on Requisitions.RequisitionId = PO.RequisitionId join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId and @ThisYearBidDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil where PO.vendorId = @VendorId and ISNULL(PO.Cancelled,0) = 0 and PO.ExportedToVendor between @WeekStart1 and dateadd(day,7,@WeekStart1)),0)
    select @WeekNbr = @WeekNbr + 1
  end
  fetch next from vencur into @VendorId, @VendorName
end

close vencur
deallocate vencur

drop table WorkTables..WeeklyTotals
select * into WorkTables..weeklytotals from #WeeklyTotals
*/

--select * from EDSWork..weeklytotals order by VendorName, WeekStart1

--Total # of Districts PO Created but some Not Pulled,# orders & # Lines & Amount
--Judy's Numbers
--drop table #CYCat
set transaction isolation level read uncommitted
select Vendorname, 
       SUM(Reqs) Reqs,
       SUM(ReqLines) ReqLines,
       SUM(ReqsAmount) ReqsAmount,
       SUM(case POsPending when 0 then 0 else 1 end) DistrictsPending, 
       SUM(case POsComplete when 0 then 0 else 1 end) DistrictsCompleted, 
       SUM(POsPending) POsPending, 
       sum(POsPendingLineCount) POsPendingLineCount, 
       SUM(POsPendingAmount) POsPendingAmount, 
       SUM(POsComplete) POsComplete, 
       sum(POsCompletedLineCount) POsCompletedLineCount, 
       SUM(POsCompleteAmount) POsCompleteAmount
  into #CYCat
  from (
select VendorName, DistrictName, 
       sum(ReqAmount) ReqsAmount,
       SUM(ReqLineCount) ReqLines,
       COUNT(*) Reqs,
       sum(case when POId is null then 0 else case UploadId when 0 then 1 else 0 end end) POsPending, 
       sum(case when POId is null then 0 else case UploadId when 0 then Amount else 0 end end) POsPendingAmount, 
       sum(case when POId is null then 0 else case UploadId when 0 then POLineCount else 0 end end) POsPendingLineCount,
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else 1 end end) POsComplete, 
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else Amount end end) POsCompleteAmount, 
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else POLineCount end end) POsCompletedLineCount
  from (
select Category.Name + '/' + vendors.name VendorName, District.Name DistrictName, PO.POId, Requisitions.RequisitionId, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end UploadId, PO.Amount, sum(Detail.Quantity * Detail.BidPrice) ReqAmount, sum(case when PODetailItems.PODetailItemId is null then 0 else 1 end) POLineCount, count(*) ReqLineCount
  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.StatusId != 4
                   and Requisitions.DateEntered between DATEADD(month,-1,@Week1Start1) and @PriorSaturday
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.County,'') != 'TEST'
               and isnull(District.DistrictCode,'') != ''
               and ISNULL(District.State,'') != ''
  join Vendors on Vendors.VendorId = Detail.VendorId
              and Vendors.VendorId = @pVendorId
--              and Vendors.Name like '%School Spec%'
--              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join PODetailItems on PODetailItems.DetailId = case when Requisitions.OrderDate < @PriorSaturday then Detail.DetailId else 0 end
  left outer join PO on PO.POId = case when Requisitions.OrderDate < @PriorSaturday then PODetailItems.POId else 0 end
                    and ISNULL(PO.Cancelled,0) = 0
 group by Vendors.name, Category.Name, Vendors.VendorId, District.Name, District.DistrictId, Requisitions.RequisitionId, PO.POId, PO.Amount, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.VendorName, s1.DistrictName 
 --order by s1.VendorName, s1.DistrictName 
 ) ss
 group by VendorName
 order by VendorName

/* 
set transaction isolation level read uncommitted
select Vendorname, SUM(case POsPending when 0 then 0 else 1 end) DistrictsPending, SUM(case POsComplete when 0 then 0 else 1 end) DistrictsCompleted, SUM(POsPending), sum(POsPendingLineCount), SUM(POsPendingAmount), SUM(POsComplete), sum(POsCompletedLineCount), SUM(POsCompleteAmount)
  from (
select VendorName, DistrictName, 
       sum(case UploadId when 0 then 1 else 0 end) POsPending, sum(case UploadId when 0 then Amount else 0 end) POsPendingAmount, sum(case UploadId when 0 then POLineCount else 0 end) POsPendingLineCount,
       sum(case UploadId when 0 then 0 else 1 end) POsComplete, sum(case UploadId when 0 then 0 else Amount end) POsCompleteAmount, sum(case UploadId when 0 then 0 else POLineCount end) POsCompletedLineCount
  from (
select vendors.name VendorName, District.Name DistrictName, PO.POId, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end UploadId, PO.Amount, COUNT(*) POLineCount
  from PODetailItems with (nolock)
  join PO on PO.POId = PODetailItems.POId
         and ISNULL(PO.Cancelled,0) = 0
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
                   and Requisitions.OrderDate < @PriorSaturday
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Vendors on Vendors.VendorId = PO.VendorId
              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
 group by Vendors.name, Vendors.VendorId, District.Name, District.DistrictId, PO.POId, PO.Amount, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.VendorName, s1.DistrictName 
 --order by s1.VendorName, s1.DistrictName 
 ) ss
 group by VendorName
 order by VendorName

set transaction isolation level read uncommitted
 select VendorName, DistrictName, DistrictState, BidHeaderId,
       sum(case UploadId when 0 then 1 else 0 end) POsPending, sum(case UploadId when 0 then Amount else 0 end) POsPendingAmount, sum(case UploadId when 0 then POLineCount else 0 end) POsPendingLineCount,
       sum(case UploadId when 0 then 0 else 1 end) POsComplete, sum(case UploadId when 0 then 0 else Amount end) POsCompleteAmount, sum(case UploadId when 0 then 0 else POLineCount end) POsCompletedLineCount
  from (
select vendors.name VendorName, District.Name DistrictName, District.State DistrictState, BidHeaders.BidHeaderId, PO.POId, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end UploadId, PO.Amount, COUNT(*) POLineCount
  from PODetailItems with (nolock)
  join PO on PO.POId = PODetailItems.POId
         and ISNULL(PO.Cancelled,0) = 0
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
                   and Requisitions.OrderDate < @PriorSaturday
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Vendors on Vendors.VendorId = PO.VendorId
              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
 group by BidHeaders.BidHeaderId, Vendors.name, Vendors.VendorId, District.Name, District.State, District.DistrictId, PO.POId, PO.Amount, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.VendorName, s1.DistrictName, s1.DistrictState, s1.BidHeaderId
 order by s1.VendorName, s1.DistrictName, s1.DistrictState, s1.BidHeaderId
*/
if @DistrictLevel = 1
begin
set transaction isolation level read uncommitted
 select VendorName, DistrictName, DistrictState, case when isnull(AllowElectronicPOs,0) = 0 then 'No' else 'Yes' end ePO, BidHeaderId,
       COUNT(*) Reqs,
       SUM(ReqLineCount) ReqLines,
       sum(ReqAmount) ReqsAmount,
	   sum(case when ApprovalId is null then 0 else 1 end) DownloadedReqs,
	   sum(case when ApprovalId is null then 0 else ReqLineCount end) DownloadedLines,
	   sum(case when ApprovalId is null then 0 else ReqAmount end) DownloadedAmount,
       sum(case when POId is null then 0 else case UploadId when 0 then 1 else 0 end end) POsPending, 
       sum(case when POId is null then 0 else case UploadId when 0 then Amount else 0 end end) POsPendingAmount, 
       sum(case when POId is null then 0 else case UploadId when 0 then POLineCount else 0 end end) POsPendingLineCount,
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else 1 end end) POsComplete, 
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else Amount end end) POsCompleteAmount, 
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else POLineCount end end) POsCompletedLineCount
  from (
select Category.Name + '/' + vendors.name VendorName, District.Name DistrictName, District.State DistrictState, District.AllowElectronicPOs, BidHeaders.BidHeaderId, P.POId, Requisitions.RequisitionId, case when P.ExportedToVendor < @PriorSaturday then isnull(P.UploadId,0) else 0 end UploadId, P.Amount, sum(Detail.Quantity * Detail.BidPrice) ReqAmount, sum(case when p.POId is null then 0 else 1 end) POLineCount, count(*) ReqLineCount, ap.ApprovalId
  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.StatusId != 4
                   and Requisitions.DateEntered between DATEADD(month,-1,@Week1Start1) and @PriorSaturday
  join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.County,'') != 'TEST'
               and isnull(District.DistrictCode,'') != ''
               and ISNULL(District.State,'') != ''
  join Vendors on Vendors.VendorId = Detail.VendorId
              and Vendors.VendorId = @pVendorId
--              and Vendors.Name like '%School Spec%'
--              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
  join Category on Category.CategoryId = Requisitions.CategoryId
  outer apply (Select PO.POId, PO.Amount, PO.ExportedToVendor, PO.UploadId
                 from PODetailItems
				 join PO on PO.POId = case when Requisitions.OrderDate < @PriorSaturday then PODetailItems.POId else 0 end
				        and ISNULL(PO.Cancelled,0) = 0
				where PODetailItems.DetailId = case when Requisitions.OrderDate < @PriorSaturday then Detail.DetailId else 0 end) p
  outer apply (Select top 1 Approvals.ApprovalId
                 from Approvals
				where Approvals.RequisitionId = Requisitions.RequisitionId
				  and Approvals.ApprovalDate < @PriorSaturday
				  and Approvals.StatusId in (35,45,49)) ap
--  left outer join PODetailItems on PODetailItems.DetailId = case when Requisitions.OrderDate < @PriorSaturday then Detail.DetailId else 0 end
--  left outer join PO on PO.POId = case when Requisitions.OrderDate < @PriorSaturday then PODetailItems.POId else 0 end
--                    and ISNULL(PO.Cancelled,0) = 0
 group by Vendors.name, Category.Name, Vendors.VendorId, District.Name, District.State, District.DistrictId, District.AllowElectronicPOs, BidHeaders.BidHeaderId, Requisitions.RequisitionId, p.POId, p.Amount, case when p.ExportedToVendor < @PriorSaturday then isnull(p.UploadId,0) else 0 end, ap.ApprovalId
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.VendorName, s1.DistrictName, s1.DistrictState, s1.AllowElectronicPOs, s1.BidHeaderId
 order by s1.VendorName, s1.DistrictName, s1.DistrictState, s1.BidHeaderId
end
/*
set transaction isolation level read uncommitted
 select RepName, VendorName, DistrictName, 
       sum(case UploadId when 0 then 1 else 0 end) POsPending, sum(case UploadId when 0 then Amount else 0 end) POsPendingAmount, sum(case UploadId when 0 then POLineCount else 0 end) POsPendingLineCount,
       sum(case UploadId when 0 then 0 else 1 end) POsComplete, sum(case UploadId when 0 then 0 else Amount end) POsCompleteAmount, sum(case UploadId when 0 then 0 else POLineCount end) POsCompletedLineCount,
       SUM(case UploadId when 0 then case when Amount < 50 then 1 else 0 end else 0 end)
  from (
select CSRep.Name RepName, Category.Name + '/' + vendors.name VendorName, District.Name DistrictName, PO.POId, isnull(PO.UploadId,0) UploadId, PO.Amount, COUNT(*) POLineCount
  from PODetailItems with (nolock)
  join PO on PO.POId = PODetailItems.POId
         and ISNULL(PO.Cancelled,0) = 0
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
--                   and Requisitions.OrderDate < @PriorSaturday
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and isnull(District.County,'') != 'TEST'
  join Vendors on Vendors.VendorId = PO.VendorId
--              and Vendors.VendorId in (3, 9, 28, 168, 947, 1896, 10942)--(3, 9, 28, 168, 947)
  join Category on Category.CategoryId = Requisitions.CategoryId
  join CSRep on CSRep.CSRepId = District.CSRepId
 group by CSRep.Name, Vendors.name, Category.Name, Vendors.VendorId, District.Name, District.DistrictId, PO.POId, PO.Amount, isnull(PO.UploadId,0) 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.RepName, s1.VendorName, s1.DistrictName 
 order by s1.RepName, s1.VendorName, s1.DistrictName 
*/

/* Code Below Replaces Code Commented below this code */
--drop table #LYCat
set transaction isolation level read uncommitted
select Vendorname, 
       SUM(Reqs) Reqs,
       SUM(ReqLines) ReqLines,
       SUM(ReqsAmount) ReqsAmount,
       SUM(case POsPending when 0 then 0 else 1 end) DistrictsPending, 
       SUM(case POsComplete when 0 then 0 else 1 end) DistrictsCompleted, 
       SUM(POsPending) POsPending, 
       sum(POsPendingLineCount) POsPendingLineCount, 
       SUM(POsPendingAmount) POsPendingAmount, 
       SUM(POsComplete) POsComplete, 
       sum(POsCompletedLineCount) POsCompletedLineCount, 
       SUM(POsCompleteAmount) POsCompleteAmount
  into #LYCat
  from (
select VendorName, DistrictName, 
       sum(ReqAmount) ReqsAmount,
       SUM(ReqLineCount) ReqLines,
       COUNT(*) Reqs,
       sum(case when POId is null then 0 else case UploadId when 0 then 1 else 0 end end) POsPending, 
       sum(case when POId is null then 0 else case UploadId when 0 then Amount else 0 end end) POsPendingAmount, 
       sum(case when POId is null then 0 else case UploadId when 0 then POLineCount else 0 end end) POsPendingLineCount,
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else 1 end end) POsComplete, 
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else Amount end end) POsCompleteAmount, 
       sum(case when POId is null then 0 else case UploadId when 0 then 0 else POLineCount end end) POsCompletedLineCount
  from (
select Category.Name + '/' + vendors.name VendorName, District.Name DistrictName, PO.POId, Requisitions.RequisitionId, case when PO.ExportedToVendor < dateadd(year,-1,@PriorSaturday) then isnull(PO.UploadId,0) else 0 end UploadId, PO.Amount, sum(Detail.Quantity * Detail.BidPrice) ReqAmount, sum(case when PODetailItems.PODetailItemId is null then 0 else 1 end) POLineCount, count(*) ReqLineCount
  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.StatusId != 4
--                   and Requisitions.DateEntered < DATEADD(month,-2,@Week1Start1)--DATEADD(year,-1,getdate())
                   and Requisitions.DateEntered between DATEADD(month,-1,@Week1Start0) and dateadd(year,-1,@PriorSaturday)--DATEADD(month,-2,@Week1Start1)--DATEADD(year,-1,getdate())
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and dateadd(year,-1,getdate()) between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.County,'') != 'TEST'
               and isnull(District.DistrictCode,'') != ''
               and ISNULL(District.State,'') != ''
  join Vendors on Vendors.VendorId = Detail.VendorId
              and Vendors.VendorId = @pVendorId
--              and Vendors.Name like '%School Spec%'
--              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join PODetailItems on PODetailItems.DetailId = case when Requisitions.OrderDate < dateadd(year,-1,@PriorSaturday) then Detail.DetailId else 0 end
  left outer join PO on PO.POId = case when Requisitions.OrderDate < dateadd(year,-1,@PriorSaturday) then PODetailItems.POId else 0 end
                    and ISNULL(PO.Cancelled,0) = 0
 group by Vendors.name, Category.Name, Vendors.VendorId, District.Name, District.DistrictId, Requisitions.RequisitionId, PO.POId, PO.Amount, case when PO.ExportedToVendor < dateadd(year,-1,@PriorSaturday) then isnull(PO.UploadId,0) else 0 end 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.VendorName, s1.DistrictName 
 --order by s1.VendorName, s1.DistrictName 
 ) ss
 group by VendorName
 order by VendorName
/*
set transaction isolation level read uncommitted
select Vendorname, SUM(case POsPending when 0 then 0 else 1 end) DistrictsPending, SUM(case POsComplete when 0 then 0 else 1 end) DistrictsCompleted, SUM(POsPending), sum(POsPendingLineCount), SUM(POsPendingAmount), SUM(POsComplete), sum(POsCompletedLineCount), SUM(POsCompleteAmount)
  from (
select VendorName, DistrictName, 
       sum(case UploadId when 0 then 1 else 0 end) POsPending, sum(case UploadId when 0 then Amount else 0 end) POsPendingAmount, sum(case UploadId when 0 then POLineCount else 0 end) POsPendingLineCount,
       sum(case UploadId when 0 then 0 else 1 end) POsComplete, sum(case UploadId when 0 then 0 else Amount end) POsCompleteAmount, sum(case UploadId when 0 then 0 else POLineCount end) POsCompletedLineCount
  from (
select vendors.name VendorName, District.Name DistrictName, PO.POId, case when PO.ExportedToVendor < dateadd(year,-1,@PriorSaturday) then isnull(PO.UploadId,0) else 0 end UploadId, PO.Amount, COUNT(*) POLineCount
  from PODetailItems with (nolock)
  join PO on PO.POId = PODetailItems.POId
         and ISNULL(PO.Cancelled,0) = 0
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
                   and Requisitions.OrderDate < dateadd(year,-1,@PriorSaturday)
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and dateadd(year,-1,getdate()) between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and isnull(District.County,'') != 'TEST'
  join Vendors on Vendors.VendorId = PO.VendorId
              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
 group by Vendors.name, Vendors.VendorId, District.Name, District.DistrictId, PO.POId, PO.Amount, case when PO.ExportedToVendor < dateadd(year,-1,@PriorSaturday) then isnull(PO.UploadId,0) else 0 end 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.VendorName, s1.DistrictName 
 --order by s1.VendorName, s1.DistrictName 
 ) ss
 group by VendorName
 order by VendorName
*/
if @DistrictLevel = 1
begin
set transaction isolation level read uncommitted
 select VendorName, DistrictName, DistrictState, BidHeaderId,
       sum(case UploadId when 0 then 1 else 0 end) POsPending, sum(case UploadId when 0 then Amount else 0 end) POsPendingAmount, sum(case UploadId when 0 then POLineCount else 0 end) POsPendingLineCount,
       sum(case UploadId when 0 then 0 else 1 end) POsComplete, sum(case UploadId when 0 then 0 else Amount end) POsCompleteAmount, sum(case UploadId when 0 then 0 else POLineCount end) POsCompletedLineCount
  from (
select Category.Name + '/' + vendors.name VendorName, District.Name DistrictName, District.State DistrictState, BidHeaders.BidHeaderId, PO.POId, case when PO.ExportedToVendor < dateadd(year,-1,@PriorSaturday) then isnull(PO.UploadId,0) else 0 end UploadId, PO.Amount, COUNT(*) POLineCount
  from PODetailItems with (nolock)
  join PO on PO.POId = PODetailItems.POId
         and ISNULL(PO.Cancelled,0) = 0
  join Detail on Detail.DetailId = PODetailItems.DetailId
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
--                   and Requisitions.OrderDate < DATEADD(month,-2,@Week1Start1)--dateadd(year,-1,@PriorSaturday)
-- summary line                   and Requisitions.DateEntered < DATEADD(month,-2,@Week1Start1)--DATEADD(year,-1,getdate())
                   and Requisitions.DateEntered between DATEADD(month,-1,@Week1Start0) and dateadd(year,-1,@PriorSaturday)--DATEADD(month,-2,@Week1Start1)--DATEADD(year,-1,getdate())
  join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                 and dateadd(year,-1,getdate()) between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and isnull(District.County,'') != 'TEST'
  join Vendors on Vendors.VendorId = PO.VendorId
              and Vendors.VendorId = @pVendorId
--              and Vendors.Name like '%School Spec%'
--              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
  join Category on Category.CategoryId = Requisitions.CategoryId
 group by BidHeaders.BidHeaderId, Vendors.name, Category.Name, Vendors.VendorId, District.Name, District.State, District.DistrictId, PO.POId, PO.Amount, case when PO.ExportedToVendor < dateadd(year,-1,@PriorSaturday) then isnull(PO.UploadId,0) else 0 end 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.VendorName, s1.DistrictName, s1.DistrictState, s1.BidHeaderId
 order by s1.VendorName, s1.DistrictName, s1.DistrictState, s1.BidHeaderId
end
/*
set transaction isolation level read uncommitted
select DistrictName, DistrictState, 
       SUM(case s1.VendorId
             when 9 then 1 
             else 0
           end) as [EE POs Pending],
       SUM(case s1.VendorId
             when 9 then Amount
             else 0
           end) as [EE PO's Pending Amount],
       SUM(case s1.VendorId
             when 9 then POLineCount
             else 0
           end) as [EE PO's Pending Line Count],
       SUM(case s1.VendorId
             when 28 then 1 
             else 0
           end) as [Sax POs Pending],
       SUM(case s1.VendorId
             when 28 then Amount
             else 0
           end) as [Sax PO's Pending Amount],
       SUM(case s1.VendorId
             when 28 then POLineCount
             else 0
           end) as [Sax PO's Pending Line Count],
       SUM(case s1.VendorId
             when 168 then 1 
             else 0
           end) as [Sportime POs Pending],
       SUM(case s1.VendorId
             when 168 then Amount
             else 0
           end) as [Sportime PO's Pending Amount],
       SUM(case s1.VendorId
             when 168 then POLineCount
             else 0
           end) as [Sportime PO's Pending Line Count],
       SUM(case s1.VendorId
             when 947 then 1 
             else 0
           end) as [Frey POs Pending],
       SUM(case s1.VendorId
             when 947 then Amount
             else 0
           end) as [Frey PO's Pending Amount],
       SUM(case s1.VendorId
             when 947 then POLineCount
             else 0
           end) as [Frey PO's Pending Line Count],
       SUM(case s1.VendorId
             when 1896 then 1 
             else 0
           end) as [ChildCraft POs Pending],
       SUM(case s1.VendorId
             when 1896 then Amount
             else 0
           end) as [ChildCraft PO's Pending Amount],
       SUM(case s1.VendorId
             when 1896 then POLineCount
             else 0
           end) as [ChildCraft PO's Pending Line Count],
       SUM(case s1.VendorId
             when 4169 then 1 
             else 0
           end) as [BG POs Pending],
       SUM(case s1.VendorId
             when 4169 then Amount
             else 0
           end) as [BG PO's Pending Amount],
       SUM(case s1.VendorId
             when 4169 then POLineCount
             else 0
           end) as [BG PO's Pending Line Count],
       SUM(case s1.VendorId
             when 10942 then 1 
             else 0
           end) as [Abilitations POs Pending],
       SUM(case s1.VendorId
             when 10942 then Amount
             else 0
           end) as [Abilitations PO's Pending Amount],
       SUM(case s1.VendorId
             when 10942 then POLineCount
             else 0
           end) as [Abilitations PO's Pending Line Count]
  from (
select vendors.name VendorName, Vendors.VendorId, District.Name DistrictName, District.State DistrictState, BidHeaders.BidHeaderId, PO.POId, Requisitions.RequisitionId, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end UploadId, PO.Amount, sum(Detail.Quantity * Detail.BidPrice) ReqAmount, sum(case when PODetailItems.PODetailItemId is null then 0 else 1 end) POLineCount, count(*) ReqLineCount
  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.StatusId != 4
  join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.County,'') != 'TEST'
               and isnull(District.DistrictCode,'') != ''
               and ISNULL(District.State,'') != ''
  join Vendors on Vendors.VendorId = Detail.VendorId
              and Vendors.VendorId in (9, 28, 168, 947, 1896, 4169, 10942)--(9, 28, 168, 947)
  left outer join PODetailItems on PODetailItems.DetailId = case when Requisitions.OrderDate < @PriorSaturday then Detail.DetailId else 0 end
  left outer join PO on PO.POId = case when Requisitions.OrderDate < @PriorSaturday then PODetailItems.POId else 0 end
                    and ISNULL(PO.Cancelled,0) = 0
 where PO.POId is not null
   and isnull(PO.UploadId,0) = 0
 group by Vendors.name, Vendors.VendorId, District.Name, District.State, District.DistrictId, BidHeaders.BidHeaderId, Requisitions.RequisitionId, PO.POId, PO.Amount, case when PO.ExportedToVendor < @PriorSaturday then isnull(PO.UploadId,0) else 0 end 
 --order by Vendors.Name, District.Name
 ) s1
 group by s1.DistrictName, s1.DistrictState
 order by s1.DistrictName, s1.DistrictState
*/
declare @CYInfo table (
Vendor	varchar(100) null,
Reqs	int null,
[Req Lines] int null,
[Reqs Amount] money null,
[Districts Pending] int null,
[Districts Completed] int null,
[PO's Pending] int null,
[Lines Pending] int null,
[Amount Pending] money null,
[PO's Processed] int null,
[Lines Processed] int null,
[Amount Processed] money null,
[Total PO's] int null,
[Total PO Lines] int null,
[Total PO Amount] money null,
[Pending PO Amount vs LY] money null,
[Processed PO Amount vs LY] money null)

insert @CYInfo(Vendor,Reqs,[Req Lines],[Reqs Amount],[Districts Pending],[Districts Completed],[PO's Pending],[Lines Pending],[Amount Pending],[PO's Processed],[Lines Processed],[Amount Processed],[Total PO's],[Total PO Lines],[Total PO Amount],[Pending PO Amount vs LY],[Processed PO Amount vs LY])
select 'Grand Totals' Vendor, sum(cy.Reqs) Reqs, sum(cy.ReqLines) [Req Lines], sum(cy.ReqsAmount) [Reqs Amount], sum(cy.DistrictsPending) [Districts Pending], sum(cy.DistrictsCompleted) [Districts Completed],
       sum(cy.POsPending) [PO's Pending], sum(cy.POsPendingLineCount) [Lines Pending], sum(cy.POsPendingAmount) [Amount Pending], 
	   sum(cy.POsComplete) [PO's Processed], sum(cy.POsCompletedLineCount) [Lines Processed], sum(cy.POsCompleteAmount) [Amount Processed],
	   sum(cy.POsPending) + sum(cy.POsComplete) [Total PO's], sum(cy.POsPendingLineCount) + sum(cy.POsCompletedLineCount) [Total PO Lines], sum(cy.POsPendingAmount) + sum(cy.POsCompleteAmount) [Total PO Amount],
	   sum(cy.POsPendingAmount) - sum(ly.POsPendingAmount) [Pending PO Amount vs LY], sum(cy.POsCompleteAmount) - sum(ly.POsCompleteAmount) [Processed PO Amount vs LY]
  from #CYCat cy
  outer apply (select sum(Reqs) Reqs, sum(ReqLines) [ReqLines], sum(ReqsAmount) [ReqsAmount], sum(DistrictsPending) [DistrictsPending], sum(DistrictsCompleted) [DistrictsCompleted],
       sum(POsPending) [POsPending], sum(POsPendingLineCount) [POsPendingLineCount], sum(POsPendingAmount) [POsPendingAmount], 
	   sum(POsComplete) [POsComplete], sum(POsCompletedLineCount) POsCompletedLineCount, sum(POsCompleteAmount) [POsCompleteAmount],
	   sum(POsPending) + sum(POsComplete) [TotalPOs], sum(POsPendingLineCount) + sum(POsCompletedLineCount) [TotalPOLines], sum(POsPendingAmount) + sum(POsCompleteAmount) [TotalPOAmount]
	   from #LYCat lc 
	  where lc.VendorName = cy.VendorName) ly

insert @CYInfo(Vendor,Reqs,[Req Lines],[Reqs Amount],[Districts Pending],[Districts Completed],[PO's Pending],[Lines Pending],[Amount Pending],[PO's Processed],[Lines Processed],[Amount Processed],[Total PO's],[Total PO Lines],[Total PO Amount],[Pending PO Amount vs LY],[Processed PO Amount vs LY])
select cy.VendorName [Vendor], cy.Reqs, cy.ReqLines [Req Lines], cy.ReqsAmount [Reqs Amount], cy.DistrictsPending [Districts Pending], cy.DistrictsCompleted [Districts Completed],
       cy.POsPending [PO's Pending], cy.POsPendingLineCount [Lines Pending], cy.POsPendingAmount [Amount Pending], 
	   cy.POsComplete [PO's Processed], cy.POsCompletedLineCount [Lines Processed], cy.POsCompleteAmount [Amount Processed],
	   cy.POsPending + cy.POsComplete [Total PO's], cy.POsPendingLineCount + cy.POsCompletedLineCount [Total PO Lines], cy.POsPendingAmount + cy.POsCompleteAmount [Total PO Amount],
	   cy.POsPendingAmount - ly.POsPendingAmount [Pending PO Amount vs LY], cy.POsCompleteAmount - ly.POsCompleteAmount [Processed PO Amount vs LY]
  from #CYCat cy
  outer apply (select Reqs, ReqLines [ReqLines], ReqsAmount [ReqsAmount], DistrictsPending [DistrictsPending], DistrictsCompleted [DistrictsCompleted],
       POsPending [POsPending], POsPendingLineCount [POsPendingLineCount], POsPendingAmount [POsPendingAmount], 
	   POsComplete [POsComplete], POsCompletedLineCount POsCompletedLineCount, POsCompleteAmount [POsCompleteAmount],
	   POsPending + POsComplete [TotalPOs], POsPendingLineCount + POsCompletedLineCount [TotalPOLines], POsPendingAmount + POsCompleteAmount [TotalPOAmount]
	   from #LYCat l
	  where l.VendorName = cy.VendorName) ly

select *
  from @CYInfo
 order by case when Vendor = 'Grand Totals' then 0 else 1 end, Vendor

declare @LYInfo table (
Vendor	varchar(100) null,
Reqs	int null,
[Req Lines] int null,
[Reqs Amount] money null,
[Districts Pending] int null,
[Districts Completed] int null,
[PO's Pending] int null,
[Lines Pending] int null,
[Amount Pending] money null,
[PO's Processed] int null,
[Lines Processed] int null,
[Amount Processed] money null,
[Total PO's] int null,
[Total PO Lines] int null,
[Total PO Amount] money null)

insert @LYInfo(Vendor,Reqs,[Req Lines],[Reqs Amount],[Districts Pending],[Districts Completed],[PO's Pending],[Lines Pending],[Amount Pending],[PO's Processed],[Lines Processed],[Amount Processed],[Total PO's],[Total PO Lines],[Total PO Amount])
select 'Grand Totals' Vendor, sum(cy.Reqs) Reqs, sum(cy.ReqLines) [Req Lines], sum(cy.ReqsAmount) [Reqs Amount], sum(cy.DistrictsPending) [Districts Pending], sum(cy.DistrictsCompleted) [Districts Completed],
       sum(cy.POsPending) [PO's Pending], sum(cy.POsPendingLineCount) [Lines Pending], sum(cy.POsPendingAmount) [Amount Pending], 
	   sum(cy.POsComplete) [PO's Processed], sum(cy.POsCompletedLineCount) [Lines Processed], sum(cy.POsCompleteAmount) [Amount Processed],
	   sum(cy.POsPending) + sum(cy.POsComplete) [Total PO's], sum(cy.POsPendingLineCount) + sum(cy.POsCompletedLineCount) [Total PO Lines], sum(cy.POsPendingAmount) + sum(cy.POsCompleteAmount) [Total PO Amount]
  from #LYCat cy

insert @LYInfo(Vendor,Reqs,[Req Lines],[Reqs Amount],[Districts Pending],[Districts Completed],[PO's Pending],[Lines Pending],[Amount Pending],[PO's Processed],[Lines Processed],[Amount Processed],[Total PO's],[Total PO Lines],[Total PO Amount])
select VendorName, Reqs, ReqLines [ReqLines], ReqsAmount [ReqsAmount], DistrictsPending [DistrictsPending], DistrictsCompleted [DistrictsCompleted],
       POsPending [POsPending], POsPendingLineCount [POsPendingLineCount], POsPendingAmount [POsPendingAmount], 
	   POsComplete [POsComplete], POsCompletedLineCount POsCompletedLineCount, POsCompleteAmount [POsCompleteAmount],
	   POsPending + POsComplete [TotalPOs], POsPendingLineCount + POsCompletedLineCount [TotalPOLines], POsPendingAmount + POsCompleteAmount [TotalPOAmount]
  from #LYCat l
 order by l.VendorName

select *
  from @LYInfo
 order by case when Vendor = 'Grand Totals' then 0 else 1 end, Vendor
end
```
