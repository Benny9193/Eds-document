# Procedure: `dbo.sp_FA_CreatePO`

_Generated on 2026-05-04T13:04:24.125Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_CreatePO` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:58:41 |
| Modified | 2012-06-13 23:58:41 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@poTempID` | IN | int |  |
| 3 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `AccountingFormats` | USER_TABLE |  |
| `Approvals` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `POStatusTable` | USER_TABLE |  |
| `POTemp` | USER_TABLE |  |
| `POTempDetails` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.sp_UpdatePOAmounts` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_FA_CreatePO] @pSessionId int, @poTempID int, @pRequisitionId int AS

declare @POId int,
	@VendorId int,
	@DistrictId int,
	@AwardId int,
	@BidHeaderId int,
	@PONumber int,
	@Prefix varchar(20),
	@Suffix varchar(20),
	@BudgetID int,
	@PODate datetime,
	@tempItemCount int,
	@MaxPODetailItems int,
	@MaxDetailId int,
	@StatusId int,
	@CreatedPOStatusID int

/* we are doing a check before we pop open the PO modal now
select Requisitions.RequisitionId
  from Requisitions
  join StatusTable on StatusTable.StatusId = Requisitions.StatusId
  join School on School.SchoolId = Requisitions.SchoolId
  join District on District.DistrictId = School.DistrictId
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
 where Requisitions.RequisitionId = @pRequisitionId
   and isnull(Requisitions.BidHeaderId,0) != 0
   and StatusTable.StatusCode = 'I'
   and isnull(Category.Type,1) != 2
   and Requisitions.ApprovalLevel >= District.RequiredApprovalLevel
   and PO.POId is null
   and (select top 1 Detail.DetailId from Detail where Detail.RequisitionId = Requisitions.RequisitionId and Detail.ItemMustBeBid = 1 order by Detail.DetailId) is null
   and (select Top 1 d1.DetailId from Detail d1 join Requisitions r1 on r1.RequisitionId = d1.RequisitionId and r1.RequisitionId = Requisitions.RequisitionId left outer join BidHeaders bh1 on bh1.BidHeaderId = case ISNULL(d1.BidHeaderId,0) when 0 then r1.BidHeaderId else d1.BidHeaderId end and bh1.Active = 1 and GETDATE() between bh1.EffectiveFrom and bh1.EffectiveUntil where bh1.BidHeaderId is null) is null
   and (select Top 1 d1.DetailId from Detail d1 left outer join Vendors v1 on v1.VendorId = case ISNULL(d1.VendorId,0) when 0 then 7691 else d1.VendorId end and v1.Active = 1 where d1.RequisitionId = Requisitions.Requisitionid and v1.VendorId is null) is null
   
if @@rowcount = 0
begin
  return
end
*/
set transaction Isolation level read committed

begin transaction CreatePO

select @StatusId = StatusId
  from StatusTable
 where StatusCode = 'O'
 
-- get the Created PO status ID
SELECT	@CreatedPOStatusID = POStatusID
FROM	POStatusTable
WHERE	StatusName = 'Created'

declare POCur cursor fast_forward read_only for
select distinct POTempDetails.VendorId, School.DistrictId, case isnull(POTempDetails.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else POTempDetails.BidHeaderId end, Requisitions.BudgetID
		, POTempDetails.PONumber, ISNULL(NextNumber.prefix,'') AS Prefix, ISNULL(NextNumber.suffix,'') AS Suffix
  from POTempDetails
  join POTemp ON POTempDetails.POTempID = POTemp.POTempID AND POTemp.POTempID = @poTempID AND POTemp.SessionID = @pSessionId
  join Requisitions on Requisitions.RequisitionId = POTempDetails.RequisitionId
  left outer join NextNumber ON NextNumber.BudgetId = Requisitions.BudgetId AND NextNumber.IdType='P'
  join Detail ON Detail.RequisitionId = Requisitions.RequisitionId AND Detail.VendorId = POTempDetails.VendorID
  join School on School.SchoolId = Requisitions.SchoolId
  join Vendors on Vendors.VendorId = POTempDetails.VendorId
              and Vendors.Active = 1
 where	POTempDetails.RequisitionId = @pRequisitionId
	AND	POTempDetails.POTempID = @poTempID
	--AND	POTemp.SessionID = @pSessionId
	and isnull(Vendors.Code,'0000') != '0000'
   --and POTemp.ItemId is not null


/*
select distinct Detail.VendorId, School.DistrictId, case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join Vendors on Vendors.VendorId = Detail.VendorId
              and Vendors.Active = 1
 where Detail.RequisitionId = @pRequisitionId
   and isnull(Vendors.Code,'0000') != '0000'
   and Detail.ItemId is not null
*/

open POCur

fetch next from POCur into @VendorId, @DistrictId, @BidHeaderId, @BudgetID, @PONumber, @Prefix, @Suffix

-- Get Max PO Detail Items
select @MaxPODetailItems = isnull(MaxPODetailItems,0)
  from District
  left outer join AccountingFormats on AccountingFormats.AccountingFormatId = District.AccountingFormatId
 where District.DistrictId = @DistrictId

while @@fetch_status = 0
begin

	--print 'Vendor: ' + CAST(@VendorId AS varchar(20)) + ' - District: ' + CAST(@DistrictId AS varchar(20)) + ' - BidHeaderID: ' + CAST(@BidHeaderId AS varchar(20)) + ' - PONumber: ' + @PONumber + ' - Budget: ' + CAST(@BudgetID AS varchar(20))

  -- Get # of Items for PO
  select @tempItemCount = count(*),
         @MaxDetailId = 0
    from Detail
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join School on School.SchoolId = Requisitions.SchoolId
   where School.DistrictId = @DistrictId
     and Detail.VendorId = @VendorId
     and Detail.RequisitionId = @pRequisitionId
     and Detail.ItemId is not null
     and case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end = @BidHeaderId

  while isnull(@tempItemCount,0) > 0
  begin
	
    -- Create and Get Next PO Number
	select	@PODate = StartDate
    from	Budgets
	where	BudgetId = @BudgetId

	if @PODate < getdate()
		begin
			select @PODate = getdate()
		end
		
	set @tempItemCount = @tempItemCount - 1
	
	Insert PO (RequisitionId, VendorId, AwardId, PONumber, PODate, DateOrdered, POStatusID)
	values (@pRequisitionId, @VendorId, @AwardId, @Prefix+CAST(@PONumber AS varchar(20))+@Suffix, @PODate, null, @CreatedPOStatusID)
	
	Select @POId = @@IDENTITY
    
    if @MaxPODetailItems = 99
    begin
		-- Assign Detail to PO
      insert PODetailItems (POId, DetailId, ItemId, Quantity, BidItemId, BidPrice, GrossPrice, DiscountRate, AwardId, VendorId, VendorItemCode, Alternate, ContractNumber)
        select top 99 @POId, Detail.DetailId, Detail.ItemId, Detail.Quantity, Detail.BidItemId, Detail.BidPrice, Detail.GrossPrice, Detail.DiscountRate, Detail.AwardId, Detail.VendorId, Detail.VendorItemCode, Detail.Alternate, BidItems.ContractNumber
          from Detail
          join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
          join School on School.SchoolId = Requisitions.SchoolId
          left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
         where School.DistrictId = @DistrictId
           and Detail.VendorId = @VendorId
           and Detail.RequisitionId = @pRequisitionId
           and Detail.ItemId is not null
           and case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end = @BidHeaderId
           and Detail.DetailId > @MaxDetailId
         order by Detail.DetailId
    end
    else
    begin
		-- Assign Detail to PO
		insert PODetailItems (POId, DetailId, ItemId, Quantity, BidItemId, BidPrice, GrossPrice, DiscountRate, AwardId, VendorId, VendorItemCode, Alternate, ContractNumber)
        select @POId, Detail.DetailId, Detail.ItemId, Detail.Quantity, Detail.BidItemId, Detail.BidPrice, Detail.GrossPrice, Detail.DiscountRate, Detail.AwardId, Detail.VendorId, Detail.VendorItemCode, Detail.Alternate, BidItems.ContractNumber
          from Detail
          join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
          join School on School.SchoolId = Requisitions.SchoolId
          left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
         where School.DistrictId = @DistrictId
           and Detail.VendorId = @VendorId
           and Detail.RequisitionId = @pRequisitionId
           and Detail.ItemId is not null
           and case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end = @BidHeaderId
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
    
  end

  -- Get Next Details for PO
  fetch next from POCur into @VendorId, @DistrictId, @BidHeaderId, @BudgetID, @PONumber, @Prefix, @Suffix
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
