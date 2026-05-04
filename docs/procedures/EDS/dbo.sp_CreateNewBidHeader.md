# Procedure: `dbo.sp_CreateNewBidHeader`

_Generated on 2026-05-04T13:43:18.773Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateNewBidHeader` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:48 |
| Modified | 2015-11-24 23:37:38 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pDistrictList` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateNewBidHeader] @pBidHeaderId int, @pDistrictList varchar(4096) as

declare @AllowAddenda int,
	@RSId int,
	@ValidCombo int,
	@ReqCount int,
	@BidType int,
	@DLRSId int,
	@DynSql varchar(4096)

set NOCOUNT ON
set transaction isolation level read uncommitted

select @ValidCombo = isnull(count(*),0)
  from BidHeaders with (nolock)
  join PPCategory on PPCategory.PricePlanId = BidHeaders.PricePlanId
                 and PPCategory.CategoryId = BidHeaders.CategoryId
 where BidHeaders.BidHeaderId = @pBidHeaderId

if @@rowcount = 0 or @ValidCombo = 0
begin
  RAISERROR('Category is not a part of this Price Plan',16,1)
  return
end

-- Create District List Id
insert ReportSession (ReportStarted) values (getdate())

select @DLRSId = scope_identity()

-- Create List in Table
select @DynSql = 'insert into ReportSessionLinks (RSId, IntId) ' +
     		 'select ' + isnull(cast(@DLRSId as varchar(18)),'0') + ', DistrictId' +
		 '  from District with (nolock)' +
		 ' where DistrictId in (' + isnull(@pDistrictList,'0') + ')'
exec(@DynSql)

-- Create Report Session
insert ReportSession (ReportStarted) values (getdate())

select @RSId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

-- Check for Addenda or Cooperative
select @AllowAddenda = isnull(DistrictCategories.AllowAddenda,0),
       @BidType = isnull(BidHeaders.BidType,0)
  from BidHeaders with (nolock)
  join DistrictCategories on DistrictCategories.CategoryId = BidHeaders.CategoryId
  join DistrictPP on DistrictPP.DistrictId = DistrictCategories.DistrictId
                 and DistrictPP.PriceplanId = BidHeaders.PricePlanId
 where BidHeaders.BidHeaderId = @pBidHeaderId

if @AllowAddenda = 1 and @BidType = 2
begin
  insert ReportSessionLinks (RSId, IntId)
    select @RSId, Requisitions.RequisitionId
      from Detail with (nolock)
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                  and Budgets.StartDate <= case isnull(BidHeaders.BudgetYearOption,0) when 0 then dateadd(year,1,getdate()) when 1 then BidHeaders.DateCreated when 2 then dateadd(year,1,BidHeaders.DateCreated) end
                  and Budgets.EndDate >= case isnull(BidHeaders.BudgetYearOption,0) when 0 then dateadd(year,1,getdate()) when 1 then BidHeaders.DateCreated when 2 then dateadd(year,1,BidHeaders.DateCreated) end
      join StatusTable on StatusTable.StatusId = Requisitions.StatusId
                      and StatusTable.StatusCode = 'B'
      join ReportSessionLinks rsl on rsl.RSId = @DLRSId
                                 and rsl.IntId = Budgets.DistrictId
     where Detail.ItemMustBeBid = 1
       and BidHeaders.BidHeaderId = @pBidHeaderId
     group by Requisitions.RequisitionId
end
else
begin
  insert ReportSessionLinks (RSId, IntId)
    select @RSId, Requisitions.RequisitionId
      from Requisitions with (nolock)
      join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                  and dateadd(month,4,Budgets.StartDate) <= case isnull(BidHeaders.BudgetYearOption,0) when 0 then dateadd(year,1,getdate()) when 1 then BidHeaders.DateCreated when 2 then dateadd(year,1,BidHeaders.DateCreated) end
                  and dateadd(month,4,Budgets.EndDate) >= case isnull(BidHeaders.BudgetYearOption,0) when 0 then dateadd(year,1,getdate()) when 1 then BidHeaders.DateCreated when 2 then dateadd(year,1,BidHeaders.DateCreated) end
      join ReportSessionLinks rsl on rsl.RSId = @DLRSId
                                 and rsl.IntId = Budgets.DistrictId
     where BidHeaders.BidHeaderId = @pBidHeaderId
end

-- Save Count of Reqs
select @ReqCount = @@rowcount

if @@rowcount = 0
begin
  RAISERROR('No Requisitions Available from which to Create the Bid Request',16,1)
  return
end

SET NOCOUNT OFF

select @RSId RSId, @ReqCount ReqCount

return
```
