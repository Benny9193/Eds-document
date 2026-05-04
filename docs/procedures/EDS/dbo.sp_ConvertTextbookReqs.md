# Procedure: `dbo.sp_ConvertTextbookReqs`

_Generated on 2026-05-04T13:43:18.749Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ConvertTextbookReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-06-12 15:13:07 |
| Modified | 2009-07-16 13:30:14 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRSId` | IN | int |  |
| 3 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_CreateNewPO` | unresolved |  |
| `sp_RefreshDistrictVendors` | unresolved |  |
| `sp_UpdatePOAmounts` | unresolved |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.uf_TotalSavings` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      procedure [dbo].[sp_ConvertTextbookReqs] @pSessionId int, @pRSId int, @pBidHeaderId int AS

declare @RequisitionId int,
	@VendorId int,
	@POId int,
	@DistrictId int,
	@AwardId int,
	@StatusId int,
	@AtEDSId int,
	@HoldDistrictId int

select @StatusId = StatusId
  from StatusTable
 where StatusCode = 'O'

select @AtEDSId = StatusId
  from StatusTable
 where StatusCode = 'I'

Delete ReportSessionLinks
  from ReportSessionLinks
  join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
  join PODetailItems on PODetailItems.DetailId = Detail.DetailId
 where ReportSessionLinks.RSId = @pRSId
   and Requisitions.StatusId != @AtEDSId

Select * into #PODetail
  from dbo.uf_TotalSavings(@pRSId, @pBidHeaderId)

declare POCur cursor fast_forward read_only for
select DistrictId, isnull(VendorId,0) VendorId, AwardId, RequisitionId
  from #PODetail
 group by DistrictId, VendorName, VendorId, AwardId, RequisitionId
 order by DistrictId, VendorName, VendorId, AwardId, RequisitionId

open POCur

fetch next from POCur into @DistrictId, @VendorId, @AwardId, @RequisitionId

while @@fetch_status = 0
begin
  select @HoldDistrictId = @DistrictId

  -- Create New PO
  exec sp_CreateNewPO @DistrictId, @VendorId, @AwardId, @RequisitionId, @POId output

  -- Assign Detail to PO
  insert PODetailItems (POId, DetailId, ItemId, Quantity, BidItemId, BidPrice, GrossPrice, DiscountRate, AwardId, VendorId, VendorItemCode, Alternate)
    select @POId, DetailId, ItemId, Quantity, BidItemId, BidPrice, GrossPrice, DiscountRate, AwardId, VendorId, VendorItemCode, Alternate
      from #PODetail
     where DistrictId = @DistrictId
       and isnull(VendorId,0) = @VendorId
       and AwardId = @AwardId
       and RequisitionId = @RequisitionId

  -- Update PO Totals
  exec sp_UpdatePOAmounts @POId

  delete Approvals
   where [Level] = 9 
     and RequisitionId = @RequisitionId

  insert Approvals (Level, StatusId, RequisitionId, ApprovalDate, ApprovalById)
    select 9, @StatusId, @RequisitionId, getdate(), Users.UserId
      from SessionTable
      join Users on Users.UserId = case isnull(SessionTable.RepUserId,0) when 0 then SessionTable.UserId else SessionTable.RepUserId end
     where SessionId = @pSessionId

  Update Requisitions
     set OrderDate = getdate(),
         StatusId = @StatusId
   where RequisitionId = @RequisitionId

  -- Get Next PO to Process
  fetch next from POCur into @DistrictId, @VendorId, @AwardId, @RequisitionId
end

close POCur
deallocate POCur

exec sp_RefreshDistrictVendors @HoldDistrictId
```
