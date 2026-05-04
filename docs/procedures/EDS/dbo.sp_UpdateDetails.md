# Procedure: `dbo.sp_UpdateDetails`

_Generated on 2026-05-04T13:04:00.468Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateDetails` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | varchar(255) |  |
| 2 | `@pItemId` | IN | varchar(255) |  |
| 3 | `@pDetailId` | IN | varchar(255) |  |
| 4 | `@pQuantity` | IN | varchar(255) |  |
| 5 | `@pSessionId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `CSRep` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DetailChangeLog` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `dbo.uf_LookupPriceByBH` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  PROCEDURE sp_UpdateDetails @pRequisitionId varchar(255), @pItemId varchar(255), @pDetailId varchar(255), @pQuantity varchar(255), @pSessionId varchar(255) AS

declare @NextDetailId int,
	@DistrictId int,
	@ItemId int,
	@UserId int,
	@OrigQuantity int,
	@OrigBidPrice money,
	@OrigBidItemId int,
	@OrigVendorId int,
	@TodaysDate datetime,
	@BidHeaderId int,
	@ApprovalId int

select @ItemId = convert(int,@pItemId),
       @TodaysDate = getdate()

select @DistrictId = DistrictId,
       @UserId = case isnull(SessionTable.CSRepId,0) when 0 then SessionTable.UserId else CSRep.UserId end
  from SessionTable with (nolock)
  left outer join CSRep on CSRep.CSRepId = SessionTable.CSRepId
 where SessionId = CONVERT(int,@pSessionId)

if @@rowcount < 1
begin
  RAISERROR('Bad Session Id. SessionId=%d',16,1,@pSessionId)
  return
end

select @BidHeaderId = isnull(BidHeaderId,0)
  from Requisitions with (nolock)
 where RequisitionId = CONVERT(int,@pRequisitionId)

if CONVERT(int,@pDetailId) = 0
begin
  select @pDetailId = CONVERT(varchar(255),DetailId)
    from Detail with (nolock)
   where RequisitionId = CONVERT(int,@pRequisitionId)
     and ItemId = CONVERT(int,@pItemId)
end

if CONVERT(int,@pDetailId) <> 0
begin
  select @OrigQuantity = Detail.Quantity,
         @OrigBidPrice = Detail.BidPrice,
         @OrigBidItemId = Detail.BidItemId,
         @OrigVendorId = Detail.VendorId
    from Detail with (nolock)
   where Detail.DetailId = convert(int,@pDetailId)

  update Detail
     set Quantity = CONVERT(int,@pQuantity),
         SessionId = @pSessionId
   where DetailId = CONVERT(int,@pDetailId)
     and RequisitionId = CONVERT(int,@pRequisitionId)

  if @@rowcount = 0
  begin
    RAISERROR('Request does not match Requisition for Detail',16,1)
    return
  end

  -- Audit Log Change
  insert DetailChangeLog (DetailId, RequisitionId, ItemId, OrigQty, NewQty, OrigBidPrice, NewBidPrice, OrigBidItemId, NewBidItemId, OrigVendorId, NewVendorId, UserId, SessionId, ChangeDate)
    select convert(int,@pDetailId), convert(int,@pRequisitionId), convert(int,@pItemId), @OrigQuantity, Detail.Quantity, @OrigBidPrice, Detail.BidPrice, @OrigBidItemId, Detail.BidItemId, @OrigVendorId, Detail.VendorId, @UserId, convert(int,@pSessionId), getdate()
      from Detail with (nolock)
     where Detail.DetailId = convert(int,@pDetailId)
end
else
begin
  insert Detail (RequisitionId,CatalogId,ItemId,ItemCode,Quantity,[Description],UnitId,UnitCode,BidPrice,CatalogPrice,PricePlanId,PriceId,VendorId,VendorItemCode,CatalogPage,DiscountRate,GrossPrice,AwardId,BidItemId,ItemMustBeBid,SessionId)
    select top 1 CONVERT(int,@pRequisitionId), ParentCatalogId, ItemId, ItemCode, CONVERT(int,@pQuantity), [Description], UnitId, UnitCode, BidPrice, CatalogPrice, PricePlanId, PriceId, VendorId, VendorItemCode, Page, DiscountRate, GrossPrice, AwardId, BidItemId, ItemMustBeBid, @pSessionId
      from dbo.uf_LookupPriceByBH(@ItemId, @BidHeaderId) lp
     Order by BidItemId desc, BidPrice

  if @@rowcount = 0
  begin
    RAISERROR('Unable to locate Item for this District. ItemId=%d DistrictId=%d',16,1,@pItemId,@DistrictId)
    return
  end
  else
  begin
    select @NextDetailId = scope_identity()
  end

  select @OrigQuantity = null,
         @OrigBidPrice = null,
         @OrigBidItemId = null

  -- Audit Log Change
  insert DetailChangeLog (DetailId, RequisitionId, ItemId, OrigQty, NewQty, OrigBidPrice, NewBidPrice, OrigBidItemId, NewBidItemId, UserId, SessionId, ChangeDate)
    select @NextDetailId, convert(int,@pRequisitionId), convert(int,@pItemId), @OrigQuantity, Detail.Quantity, @OrigBidPrice, Detail.BidPrice, @OrigBidItemId, Detail.BidItemId, @UserId, convert(int,@pSessionId), getdate()
      from Detail with (nolock)
     where Detail.DetailId = convert(int,@pDetailId)
end

select top 1 @ApprovalId = ApprovalId
  from Approvals
 where RequisitionId = @pRequisitionId
 order by ApprovalDate desc

if isnull(@ApprovalId,0) != 0
begin
  INSERT INTO ApprovalsHistory([ApprovalId], [ApprovalById], [Level], [StatusId], [RequisitionId], [ApprovalDate], [ApproverId])
    select [ApprovalId], [ApprovalById], [Level], [StatusId], [RequisitionId], [ApprovalDate], [ApproverId]
      from Approvals
     where Approvals.RequisitionId = @pRequisitionId

-- Delete Old Approval
  delete Approvals
   where Approvals.RequisitionId = @pRequisitionId

  Update Requisitions
     set StatusId = 1
   where RequisitionId = @pRequisitionId
end
```
