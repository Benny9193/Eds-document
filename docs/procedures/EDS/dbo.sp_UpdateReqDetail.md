# Procedure: `dbo.sp_UpdateReqDetail`

_Generated on 2026-05-04T14:49:07.335Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateReqDetail` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-01-28 12:56:31 |
| Modified | 2025-07-01 08:44:49 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pReqId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      procedure [dbo].[sp_UpdateReqDetail] @pReqId int AS

declare @ReqId int,
	@CategoryId int,
	@DistrictId int,
	@TodaysDate datetime

update Requisitions
   set BidHeaderId = BidHeaderId
 where RequisitionId = @pReqId

 return

select @TodaysDate = getdate()

print 'Building Requisition List'

select Requisitions.RequisitionId, Requisitions.CategoryId, School.DistrictId
  into #ReqList
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.StartDate <= dateadd(year,1,getdate())
              and Budgets.EndDate >= dateadd(year,1,getdate())
--  join NewFF on NewFF.ItemId = Detail.ItemId
--            and NewFF.DistrictId = School.DistrictId
  left outer join StatusTable on StatusTable.StatusId = Requisitions.StatusId
 where isnull(StatusTable.StatusCode,'') != 'O' and Requisitions.RequisitionId = @pReqId
 group by Requisitions.RequisitionId, Requisitions.CategoryId, School.DistrictId

print 'List Built'
/*
Update Detail
   set UnitId = NewFF.UnitId,
       UnitCode = NewFF.Code,
       BidPrice = NewFF.BidPrice,
       CatalogPrice = NewFF.CatalogPrice,
       GrossPrice = NewFF.GrossPrice,
       DiscountRate = NewFF.DiscountRate,
       CatalogPage = NewFF.Page,
       PriceId = NewFF.PriceId,
       VendorId = NewFF.VendorId,
       VendorItemCode = NewFF.VendorItemCode,
       Alternate = NewFF.PricesDescription,
       [Description] = NewFF.[Description]
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join NewFF on NewFF.ItemId = Detail.ItemId
            and NewFF.DistrictId = School.DistrictId
  join #ReqList on #ReqList.RequisitionId = Requisitions.RequisitionId
*/
print 'Updating Requisitions'

-- Update Requisition Headers and Accounts
--if @@rowcount > 0
--begin
  declare ReqCur cursor fast_forward read_only for
  select RequisitionId, CategoryId, DistrictId from #ReqList

  open ReqCur

  fetch next from ReqCur into @ReqId, @CategoryId, @DistrictId

  while @@fetch_status = 0
  begin
    print 'Updating Requisition ' + convert(varchar(16),@ReqId)

    Update Detail
/*
       set CatalogId = (select top 1 CatalogId from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           UnitId = (select top 1 UnitId from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           UnitCode = (select top 1 UnitCode from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           BidPrice = (select top 1 BidPrice from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           CatalogPrice = (select top 1 CatalogPrice from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           GrossPrice = (select top 1 GrossPrice from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           DiscountRate = (select top 1 DiscountRate from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           CatalogPage = (select top 1 Page from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           PricePlanId = (select top 1 PricePlanId from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           AwardId = (select top 1 AwardId from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           VendorId = (select top 1 VendorId from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           VendorItemCode = (select top 1 VendorItemCode from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           Alternate = (select top 1 Alternate from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
           [Description] = (select top 1 Description from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId),
	   BidItemId = (select top 1 BidItemId from Prices where Prices.ItemId = Detail.ItemId and Prices.PricePlanId =     (select top 1 DistrictPP.PricePlanId from dbo.DistrictPP join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId and PPCategory.CategoryId = Requisitions.CategoryId where DistrictPP.DistrictId = Budgets.DistrictId order by DistrictPP.PricePlanId) order by case isnull(Prices.BidItemId,0) when 0 then 1 else 0 end, Prices.BidPrice, Prices.CrossRefId)
*/
       set Reproc = 1
      from Detail with (updlock,rowlock)
--      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
--      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
     where Detail.RequisitionId = @ReqId                                                                                    

    -- Get Next Req to Update
    fetch next from ReqCur into @ReqId, @CategoryId, @DistrictId
  end
 
  close ReqCur
  deallocate ReqCur
--end

print 'Done'
```
