# Procedure: `dbo.sp_CreatePO_Saved062724`

_Generated on 2026-05-04T14:49:07.250Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreatePO_Saved062724` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2024-06-27 18:44:50 |
| Modified | 2024-06-27 18:44:50 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `AccountingFormats` | USER_TABLE |  |
| `Approvals` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.sp_CreateNewPO` | SQL_STORED_PROCEDURE |  |
| `dbo.sp_UpdatePOAmounts` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure [dbo].[sp_CreatePO_Saved062724] @pSessionId int, @pRequisitionId int AS

declare @POId int,
	@VendorId int,
	@DistrictId int,
	@AwardId int,
	@BidHeaderId int,
	@TotalItems int,
	@tempItemCount int,
	@MaxPODetailItems int,
	@MaxDetailId int,
	@TotalBidCost money,
	@TotalGrossCost money,
	@TotalItemsCost money,
	@tempTotalGrossCost money,
	@TotalCalcAmount money,
	@TotalDiscountAmount money,
	@DiscountRate decimal(9,5),
	@StatusId int,
	@StatusCode char(1),
	@ErrorMsg varchar(2048),
	@ReqNbr varchar(50),
	@DistrictApprovalLevel int,
	@POCount int,
	@WrongCategoryItems int,
	@ItemsMustBeBid int,
	@OutOfdateBids int,
	@InactiveVendors int

select Requisitions.RequisitionId
  from Requisitions
--  join StatusTable on StatusTable.StatusId = Requisitions.StatusId
  join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
                and Approvals.ApprovalId =
    (select Top 1 ap.ApprovalId
       from Approvals ap
      where ap.RequisitionId = Requisitions.RequisitionId
      order by ap.ApprovalDate desc)
  join StatusTable on StatusTable.StatusId = Approvals.StatusId
  join School on School.SchoolId = Requisitions.SchoolId
  join District on District.DistrictId = School.DistrictId
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
 where Requisitions.RequisitionId = @pRequisitionId
   and isnull(Requisitions.BidHeaderId,0) != 0
   and StatusTable.StatusCode = 'I'
   and isnull(Category.Type,1) in (1, 4, 5)
   and PO.POId is null
   and (select top 1 Detail.DetailId 
          from Detail 
		  join Items on Items.ItemId = Detail.ItemId 
		 where Detail.RequisitionId = Requisitions.RequisitionId 
		   and isnull(Items.CategoryId,0) != isnull(Requisitions.CategoryId,0)) is null
   and (select top 1 Detail.DetailId 
          from Detail 
		 where Detail.RequisitionId = Requisitions.RequisitionId 
		   and Detail.ItemMustBeBid = 1) is null
   and (select top 1 d1.DetailId 
          from Detail d1 
		  join Requisitions r1 on r1.RequisitionId = d1.RequisitionId 
		                      and r1.RequisitionId = Requisitions.RequisitionId 
		  outer apply (Select top 1 Bids.BidHeaderId
		                 from BidItems
						 join Bids on Bids.BidId = BidItems.BidId
						where BidItems.BidItemId = d1.BidItemId) bi
		  left outer join BidHeaders bh1 on bh1.BidHeaderId = coalesce(bi.BidHeaderId, case when d1.BidHeaderId = 0 then null else d1.BidHeaderId end, r1.BidHeaderId) 
		                                and bh1.Active = 1 
										and GETDATE() between bh1.EffectiveFrom and bh1.EffectiveUntil 
		 where case when d1.VendorId is null or d1.VendorId = 0 then 7691 else d1.VendorId end != 7691 
		   and bh1.BidHeaderId is null) is null
   and (select top 1 d1.DetailId 
          from Detail d1 
		  left outer join Vendors v1 on v1.VendorId = case ISNULL(d1.VendorId,0) when 0 then 7691 else d1.VendorId end 
		                            and v1.Active = 1 
		 where d1.RequisitionId = Requisitions.Requisitionid 
		   and v1.VendorId is null) is null
   
if @@rowcount = 0
begin
  select @ErrorMsg = ''
  select @ReqNbr = Requisitions.RequisitionNumber,
         @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
         @StatusId = isnull(StatusTable.StatusId,0),
         @StatusCode = isnull(StatusTable.StatusCode,''),
         @DistrictApprovalLevel = isnull(District.RequiredApprovalLevel,0),
         @POCount = isnull((select count(*) 
		                      from PO 
							 where PO.RequisitionId = Requisitions.RequisitionId),0),
         @WrongCategoryItems = (select count(*) 
		                          from Detail 
								  join Items on Items.ItemId = Detail.ItemId 
								 where Detail.RequisitionId = Requisitions.RequisitionId 
								   and isnull(Items.CategoryId,0) != isnull(Requisitions.CategoryId,0)),
         @ItemsMustBeBid = (select count(*) 
		                      from Detail 
							 where Detail.RequisitionId = Requisitions.RequisitionId 
							   and Detail.ItemMustBeBid = 1),
         @OutOfDateBids = (select count(*) 
		                     from Detail d1 
							 join Requisitions r1 on r1.RequisitionId = d1.RequisitionId 
							                     and r1.RequisitionId = Requisitions.RequisitionId 
							 outer apply (Select top 1 Bids.BidHeaderId
											from BidItems
											join Bids on Bids.BidId = BidItems.BidId
										   where BidItems.BidItemId = d1.BidItemId) bi
							 left outer join BidHeaders bh1 on bh1.BidHeaderId = coalesce(bi.BidHeaderId, case when d1.BidHeaderId = 0 then null else d1.BidHeaderId end, r1.BidHeaderId) 
							                               and bh1.Active = 1 
														   and GETDATE() between bh1.EffectiveFrom and bh1.EffectiveUntil 
						    where case when d1.VendorId is null or d1.VendorId = 0 then 7691 else d1.VendorId end != 7691 
							  and bh1.BidHeaderId is null),
         @InactiveVendors = (select count(*) 
		                       from Detail d1 
							   left outer join Vendors v1 on v1.VendorId = case ISNULL(d1.VendorId,0) when 0 then 7691 else d1.VendorId end 
							                             and v1.Active = 1 
							  where d1.RequisitionId = Requisitions.Requisitionid 
							    and v1.VendorId is null)
    from Requisitions
    join School on School.SchoolId = Requisitions.SchoolId
    join District on District.DistrictId = School.DistrictId
    left outer join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
                             and Approvals.ApprovalId =
      (select Top 1 ap.ApprovalId
         from Approvals ap
        where ap.RequisitionId = Requisitions.RequisitionId
        order by ap.ApprovalDate desc)
    left outer join StatusTable on StatusTable.StatusId = Approvals.StatusId
   where Requisitions.RequisitionId = @pRequisitionId
   
  if @BidHeaderId = 0
  begin
	select @ErrorMsg += 'No Bid Selected for Requisition #' + @ReqNbr + char(10) + '. '
  end
  
  if @StatusCode != 'I'
  begin
    select @ErrorMsg += 'Requisition #' + @ReqNbr + ' is not At EDS.' + char(10) + ' '
  end
  
  if @POCount > 0
  begin
    select @ErrorMsg += 'Requisition #' + @ReqNbr + ' has PO''s associated with it.' + char(10) + ' '
  end

  if @WrongcategoryItems > 0
  begin
    select @ErrorMsg += 'Requisition #' + @ReqNbr + ' has Items of the incorrect category associated with it.' + char(10) + ' '
  end
  
  if @ItemsMustBeBid > 0
  begin
    select @ErrorMsg += 'Requisition #' + @ReqNbr + ' has Items that must be bid.' + char(10) + ' '
  end
  
  if @OutOfDateBids > 0
  begin
    select @ErrorMsg += 'Requisition #' + @ReqNbr + ' has Out Of Date Bids associated with it.' + char(10) + ' '
  end
  
  if @InactiveVendors > 0
  begin
    select @ErrorMsg += 'Requisition #' + @ReqNbr + ' has Inactive Vendors associated with it.' + char(10) + ' '
  end
  
  Raiserror(@ErrorMsg,16,0)
  
  return
end

set transaction Isolation level read committed

begin transaction CreatePO

select @StatusId = StatusId
  from StatusTable
 where StatusCode = 'O'

declare POCur cursor fast_forward read_only for
select distinct Detail.VendorId, School.DistrictId, coalesce(bi.BidHeaderId, case when Detail.BidHeaderId = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId)
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join Vendors on Vendors.VendorId = Detail.VendorId
              and Vendors.Active = 1
  outer apply (Select top 1 Bids.BidHeaderId
                 from BidItems
				 join Bids on Bids.BidId = BidItems.BidId
				where BidItems.BidItemId = Detail.BidItemId) bi
 where Detail.RequisitionId = @pRequisitionId
   and isnull(Vendors.Code,'0000') != '0000'
   and Detail.ItemId is not null

open POCur

fetch next from POCur into @VendorId, @DistrictId, @BidHeaderId

-- Get Max PO Detail Items
select @MaxPODetailItems = isnull(MaxPODetailItems,0)
  from District
  left outer join AccountingFormats on AccountingFormats.AccountingFormatId = District.AccountingFormatId
 where District.DistrictId = @DistrictId

while @@fetch_status = 0
begin
  -- Get # of Items for PO
  select @tempItemCount = count(*),
         @MaxDetailId = 0
    from Detail
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join School on School.SchoolId = Requisitions.SchoolId
    outer apply (Select top 1 Bids.BidHeaderId
                   from BidItems
				   join Bids on Bids.BidId = BidItems.BidId
				  where BidItems.BidItemId = Detail.BidItemId) bi
   where School.DistrictId = @DistrictId
     and Detail.VendorId = @VendorId
     and Detail.RequisitionId = @pRequisitionId
     and Detail.ItemId is not null
     and coalesce(bi.BidHeaderId, case when Detail.BidHeaderId = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId) = @BidHeaderId

  while isnull(@tempItemCount,0) > 0
  begin
    -- Create and Get Next PO Number
    exec dbo.sp_CreateNewPO @DistrictId, @VendorId, @AwardId, @pRequisitionId, @POId output

    if @MaxPODetailItems = 99
    begin
      -- Assign Detail to PO
      insert PODetailItems (POId, DetailId, ItemId, Quantity, BidItemId, BidPrice, GrossPrice, DiscountRate, AwardId, VendorId, VendorItemCode, Alternate, ContractNumber)
        select top 99 @POId, Detail.DetailId, Detail.ItemId, Detail.Quantity, Detail.BidItemId, Detail.BidPrice, Detail.GrossPrice, Detail.DiscountRate, Detail.AwardId, Detail.VendorId, Detail.VendorItemCode, Detail.Alternate, bi.ContractNumber
          from Detail
          join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
          join School on School.SchoolId = Requisitions.SchoolId
		  outer apply (Select top 1 Bids.BidHeaderId, BidItems.ContractNumber
					     from BidItems
					     join Bids on Bids.BidId = BidItems.BidId
					    where BidItems.BidItemId = Detail.BidItemId) bi
         where School.DistrictId = @DistrictId
           and Detail.VendorId = @VendorId
           and Detail.RequisitionId = @pRequisitionId
           and Detail.ItemId is not null
           and coalesce(bi.BidHeaderId, case when Detail.BidHeaderId = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId) = @BidHeaderId
           and Detail.DetailId > @MaxDetailId
         order by Detail.DetailId
    end
    else
    begin
      -- Assign Detail to PO
      insert PODetailItems (POId, DetailId, ItemId, Quantity, BidItemId, BidPrice, GrossPrice, DiscountRate, AwardId, VendorId, VendorItemCode, Alternate, ContractNumber)
        select @POId, Detail.DetailId, Detail.ItemId, Detail.Quantity, Detail.BidItemId, Detail.BidPrice, Detail.GrossPrice, Detail.DiscountRate, Detail.AwardId, Detail.VendorId, Detail.VendorItemCode, Detail.Alternate, bi.ContractNumber
          from Detail
          join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
          join School on School.SchoolId = Requisitions.SchoolId
		  outer apply (Select top 1 Bids.BidHeaderId, BidItems.ContractNumber
					     from BidItems
					     join Bids on Bids.BidId = BidItems.BidId
					    where BidItems.BidItemId = Detail.BidItemId) bi
         where School.DistrictId = @DistrictId
           and Detail.VendorId = @VendorId
           and Detail.RequisitionId = @pRequisitionId
           and Detail.ItemId is not null
           and coalesce(bi.BidHeaderId, case when Detail.BidHeaderId = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId) = @BidHeaderId
    end

    -- Reduce Count by # of Items Added
    select @tempItemCount = @tempItemCount - count(*)
      from PODetailItems
     where PODetailItems.POId = @POId

    -- Set Max Detail Id
    select @MaxDetailId = max(PODetailItems.DetailId)
      from PODetailItems
     where PODetailItems.POId = @POId

    -- Update PO Totals
    exec dbo.sp_UpdatePOAmounts @POId

    -- Recalculate # of Available Items
	select @tempItemCount = count(*)
      from Detail
	  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
	  join School on School.SchoolId = Requisitions.SchoolId
      outer apply (Select top 1 Bids.BidHeaderId
                     from BidItems
				     join Bids on Bids.BidId = BidItems.BidId
				    where BidItems.BidItemId = Detail.BidItemId) bi
	 where School.DistrictId = @DistrictId
	   and Detail.VendorId = @VendorId
	   and Detail.RequisitionId = @pRequisitionId
	   and Detail.ItemId is not null
       and Detail.DetailId > @MaxDetailId
	   and coalesce(bi.BidHeaderId, case when Detail.BidHeaderId = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId) = @BidHeaderId
  end

  -- Get Next Details for PO
  fetch next from POCur into @VendorId, @DistrictId, @BidHeaderId
end

close POCur
deallocate POCur

delete Approvals
 where [Level] = 9 
   and RequisitionId = @pRequisitionId

insert Approvals (Level, StatusId, RequisitionId, ApprovalDate, ApprovalById)
  select 9, @StatusId, @pRequisitionId, getdate(), Users.UserId
    from SessionTable
    join Users on Users.UserId = case isnull(SessionTable.RepUserId,0) when 0 then SessionTable.UserId else SessionTable.RepUserId end
   where SessionId = @pSessionId

Update Requisitions
   set OrderDate = getdate(),
       StatusId = @StatusId
 where RequisitionId = @pRequisitionId

commit transaction CreatePO
```
