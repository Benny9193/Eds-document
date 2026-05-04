# Procedure: `dbo.sp_CreateNewPO`

_Generated on 2026-05-04T13:43:18.775Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateNewPO` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-03-14 08:16:16 |
| Modified | 2025-06-26 11:53:09 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pVendorId` | IN | int |  |
| 3 | `@pAwardId` | IN | int |  |
| 4 | `@pRequisitionId` | IN | int |  |
| 5 | `@POId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_CreatePO` | SQL_STORED_PROCEDURE |
| `dbo.sp_CreatePO_Saved062724` | SQL_STORED_PROCEDURE |
| `dbo.sp_CreatePOTest` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE procedure [dbo].[sp_CreateNewPO] @pDistrictId int, @pVendorId int, @pAwardId int, @pRequisitionId int, @POId int output AS

declare @PONumber varchar(20),
	@POPrefix varchar(10),
	@POSuffix varchar(10),
	@UseSchool int,
	@SchoolId int,
	@BudgetId int,
	@PODate datetime

set transaction isolation level repeatable read

Begin Transaction

/********************* Deleted ***************************
Select @PONumber = case UsePOLeadingZeros when 1 then right('00000000000000000000' + convert(varchar(20),isnull(PONextNumber,1)),PONumberLength) else convert(varchar(20),isnull(PONextNumber,1)) end,
       @POPrefix = isnull(POPrefix,''),
       @POSuffix = isnull(POSuffix,'')
  from District
 where DistrictId = @pDistrictId

Update District
   Set PONextNumber = PONextNumber + 1
 where DistrictId = @pDistrictId

Insert PO (RequisitionId, VendorId, PONumber, PODate, DateOrdered)
  values (@pRequisitionId, @pVendorId, @POPrefix + @PONumber + @POSuffix, getdate(), getdate())

Select @POId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
********************************************************/

  select @SchoolId = SchoolId,
         @BudgetId = BudgetId
    from Requisitions
   where RequisitionId = @pRequisitionId

  -- Validate BudgetId
  if ISNULL(@BudgetId,0) = 0
  begin
    RAISERROR('Bad BudgetId detected.',16,1)
    ROLLBACK
    set transaction isolation level read uncommitted
    return
  end
  
  select @UseSchool = POsbySchool
    from District
   where DistrictId = @pDistrictId

  if @@rowcount > 0
  begin
    if @UseSchool = 1
    begin
--      print 'Create PO By School'
      select @PONumber = ISNULL(Prefix,'') + case isnull(SuppressLZ,1) when 0 then right(replicate('0',case isnull(NumberLength,0) when 0 then 6 else isnull(NumberLength,0) end) + CONVERT(varchar(16),ISNULL(NextNumber,1)),case isnull(NumberLength,0) when 0 then 6 else isnull(NumberLength,0) end) else CONVERT(varchar(16),ISNULL(NextNumber,1)) end + ISNULL(Suffix,'')
        from NextNumber
       where DistrictId = @pDistrictId
         and SchoolId = @SchoolId
         and BudgetId = @BudgetId
         and IdType = 'P'

      if @@rowcount > 0
      begin
--        print 'Updating PO Number'
        update NextNumber
           set NextNumber = ISNULL(NextNumber,1) + 1
		  from NextNumber with (updlock,rowlock)
         where DistrictId = @pDistrictId
           and SchoolId = @SchoolId
           and BudgetId = @BudgetId
           and IdType = 'P'
      end
      else
      begin
        print 'Creating PO Number'
        insert NextNumber (DistrictId, SchoolId, BudgetId, IdType, NextNumber)
          values (@pDistrictId, @SchoolId, @BudgetId, 'P', 2)
        select @PONumber = '1'
      end 
    end
    else
    begin
--      print 'Create PO By District'
      select @PONumber = ISNULL(Prefix,'') + case isnull(SuppressLZ,1) when 0 then right(replicate('0',case isnull(NumberLength,0) when 0 then 6 else isnull(NumberLength,0) end) + CONVERT(varchar(16),ISNULL(NextNumber,1)),case isnull(NumberLength,0) when 0 then 6 else isnull(NumberLength,0) end) else CONVERT(varchar(16),ISNULL(NextNumber,1)) end + ISNULL(Suffix,'')
        from NextNumber
       where DistrictId = @pDistrictId
         and SchoolId is null
         and BudgetId = @BudgetId
         and IdType = 'P'

      if @@rowcount > 0
      begin
--        print 'Updating PO Number'
        update NextNumber
           set NextNumber = ISNULL(NextNumber,1) + 1
		  from NextNumber with (updlock,rowlock)
         where DistrictId = @pDistrictId
           and SchoolId is null
           and BudgetId = @BudgetId
           and IdType = 'P'
      end
      else
      begin
--        print 'Creating PO Number'
        insert NextNumber (DistrictId, SchoolId, BudgetId, IdType, NextNumber)
          values (@pDistrictId, null, @BudgetId, 'P', 2)
        select @PONumber = '1'
      end 
    end
  end
  else
  begin
    RAISERROR('Unable to Locate District.',16,1)
    ROLLBACK
    set transaction isolation level read uncommitted
    return
  end

--  print @POnumber
  select @PODate = StartDate
    from Budgets
   where BudgetId = @BudgetId

  if @PODate < getdate()
  begin
    select @PODate = getdate()
  end

Insert PO (RequisitionId, VendorId, AwardId, PONumber, PODate, DateOrdered)
  values (@pRequisitionId, @pVendorId, @pAwardId, @PONumber, @PODate, null)

Select @POId = SCOPE_IDENTITY()


Commit Transaction

set transaction isolation level read uncommitted
```
