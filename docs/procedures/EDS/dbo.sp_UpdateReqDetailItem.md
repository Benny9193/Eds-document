# Procedure: `dbo.sp_UpdateReqDetailItem`

_Generated on 2026-05-04T14:49:07.335Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateReqDetailItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-03-11 15:26:20 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Detail` | USER_TABLE |  |
| `NewFF` | unresolved |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `dbo.sp_UpdateReq` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure sp_UpdateReqDetailItem @pItemId int AS

declare @ReqId int

select Requisitions.RequisitionId
  into #ReqList
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join NewFF on NewFF.ItemId = Detail.ItemId
            and NewFF.DistrictId = School.DistrictId
  left outer join StatusTable on StatusTable.StatusId = Requisitions.StatusId
 where isnull(StatusTable.StatusCode,'') != 'O'
   and Detail.ItemId = @pItemId
 group by Requisitions.RequisitionId

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
       Alternate = NewFF.PricesDescription
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join NewFF on NewFF.ItemId = Detail.ItemId
            and NewFF.DistrictId = School.DistrictId
  join #ReqList on #ReqList.RequisitionId = Requisitions.RequisitionId
 where Detail.ItemId = @pItemId

-- Update Requisition Headers and Accounts
if @@rowcount > 0
begin
  declare ReqCur cursor fast_forward read_only for
  select RequisitionId from #ReqList

  open ReqCur

  fetch next from ReqCur into @ReqId

  while @@fetch_status = 0
  begin
    -- Update Requisition and Account Totals
    exec dbo.sp_UpdateReq @ReqId, 0, 0, 0

    -- Get Next Req to Update
    fetch next from ReqCur into @ReqId
  end
 
  close ReqCur
  deallocate ReqCur
end
```
