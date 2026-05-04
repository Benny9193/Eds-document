# Procedure: `dbo.sp_CreateNewDistrictReqNumber`

_Generated on 2026-05-04T13:04:00.342Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateNewDistrictReqNumber` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-12-11 16:25:56 |
| Modified | 2012-09-06 12:37:20 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@DRNumber` | INOUT | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_DistrictRequisitionDetail` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE   procedure [dbo].[sp_CreateNewDistrictReqNumber] @pRequisitionId int, @DRNumber varchar(255) output AS

declare @DRPrefix varchar(10),
	@DRSuffix varchar(10),
	@UseSchool int,
	@SchoolId int,
	@BudgetId int,
	@DistrictId int

Begin Transaction

set transaction isolation level repeatable read

  select @SchoolId = Requisitions.SchoolId,
         @BudgetId = Requisitions.BudgetId,
         @DistrictId = Budgets.DistrictId
    from Requisitions
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where RequisitionId = @pRequisitionId

  select @UseSchool = DRsbySchool
    from District
   where DistrictId = @DistrictId

  if @@rowcount > 0
  begin
    if @UseSchool = 1
    begin
--      print 'Create District Req By School'
      select @DRNumber = ISNULL(Prefix,'') + case isnull(SuppressLZ,1) when 0 then right(replicate('0',isnull(NumberLength,6)) + CONVERT(varchar(16),ISNULL(NextNumber,1)),isnull(NumberLength,6)) else CONVERT(varchar(16),ISNULL(NextNumber,1)) end + ISNULL(Suffix,'')
        from NextNumber
       where DistrictId = @DistrictId
         and SchoolId = @SchoolId
         and BudgetId = @BudgetId
         and IdType = 'I'

      if @@rowcount > 0
      begin
--        print 'Updating District Req Number'
        update NextNumber
           set NextNumber = ISNULL(NextNumber,1) + 1
         where DistrictId = @DistrictId
           and SchoolId = @SchoolId
           and BudgetId = @BudgetId
           and IdType = 'I'
      end
      else
      begin
        print 'Creating District Req Number'
        insert NextNumber (DistrictId, SchoolId, BudgetId, IdType, NextNumber, SuppressLZ) -- changed 08/29/12 kjm
          values (@DistrictId, @SchoolId, @BudgetId, 'I', 2, 1)                            -- changed 08/29/12 kjm
--        insert NextNumber (DistrictId, SchoolId, BudgetId, IdType, NextNumber)  
--          values (@DistrictId, @SchoolId, @BudgetId, 'I', 2)                    
        select @DRNumber = '1'
      end 
    end
    else
    begin
--      print 'Create District Req By District'
      select @DRNumber = ISNULL(Prefix,'') + case isnull(SuppressLZ,1) when 0 then right(replicate('0',isnull(NumberLength,6)) + CONVERT(varchar(16),ISNULL(NextNumber,1)),isnull(NumberLength,6)) else CONVERT(varchar(16),ISNULL(NextNumber,1)) end + ISNULL(Suffix,'')
        from NextNumber
       where DistrictId = @DistrictId
         and Isnull(SchoolId,0)=0  -- changed 4/07/11 kjm
         and BudgetId = @BudgetId
         and IdType = 'I'

      if @@rowcount > 0
      begin
--        print 'Updating District Req Number'
        update NextNumber
           set NextNumber = ISNULL(NextNumber,1) + 1
         where DistrictId = @DistrictId
           and Isnull(SchoolId,0)=0  -- changed 4/07/11 kjm
           and BudgetId = @BudgetId
           and IdType = 'I'
      end
      else
      begin
--        print 'Creating District Req Number'
        insert NextNumber (DistrictId, SchoolId, BudgetId, IdType, NextNumber, SuppressLZ)
          values (@DistrictId, null, @BudgetId, 'I', 2, 1)
        select @DRNumber = '1'
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

Commit Transaction

set transaction isolation level read uncommitted
```
