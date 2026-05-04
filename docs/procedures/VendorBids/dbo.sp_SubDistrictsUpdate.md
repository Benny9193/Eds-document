# Procedure: `dbo.sp_SubDistrictsUpdate`

_Generated on 2026-05-04T14:49:11.339Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SubDistrictsUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-10 11:38:38 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRegDistrictId` | IN | int |  |
| 2 | `@pSessionId` | IN | int |  |
| 3 | `@pDistrictId` | IN | int |  |
| 4 | `@pCategoryId` | IN | int |  |
| 5 | `@pAction` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidLedger` | unresolved |  |
| `RegDistricts` | unresolved |  |
| `TranTypes` | USER_TABLE |  |
| `VendorSessions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_SubDistrictsUpdate @pRegDistrictId int, @pSessionId int, @pDistrictId int, @pCategoryId int, @pAction tinyint
as
declare @RegDistrictId int,
	@AmountPaid money,
	@OldCharge money,
	@ElapsedHours tinyint,
	@Charge money,
	@RegistrationId int

set nocount on

select @RegistrationId = RegistrationId
  from VendorSessions
 where SessionId = @pSessionId

if @pAction = 1 or @pAction = 2
begin
  select @Charge = DefaultAmount 
    from TranTypes 
   where TranTypeId = 1

  if isnull(@pRegDistrictId,0) = 0
  begin
    -- Register for District
    insert RegDistricts (RegistrationId, DistrictId, CategoryId, ValidFrom, ValidUntil, Charge, Requested)
      values (@RegistrationId, @pDistrictId, @pCategoryId, getdate(), dateadd(year,1,getdate()), @Charge, getdate())

    select @RegDistrictId = SCOPE_IDENTITY(),
           @AmountPaid = 0

    if isnull(@Charge,0) != 0
    begin
      -- Post Billing to Vendor
      insert BidLedger (RegistrationId, RegDistrictId, TranTypeId, TranAmount, TranDate)
        values (@RegistrationId, @RegDistrictId, 2, @Charge, getdate())
    end
  end
  else
  begin
    select @OldCharge = isnull(Charge,0)
      from RegDistricts
     where RegDistrictId = @pRegDistrictId

    update RegDistricts
       set DistrictId = @pDistrictId,
           CategoryId = @pCategoryId
     where RegDistrictId = @pRegDistrictId

    select @RegDistrictId = @pRegDistrictId,
           @AmountPaid = isnull((select sum(TranAmount) from BidLedger where RegDistrictId = @pRegDistrictId),0)
  end

  if isnull(@AmountPaid,0) < isnull(@Charge,0)
  begin
    -- Deny Access if Needed
    Update RegDistricts
       set Granted = null
     where RegDistrictId = @RegDistrictId
       and Granted is not null
  end
  else
  begin
    -- Grant Access if needed
    Update RegDistricts
       set Granted = getdate()
     where RegDistrictId = @RegDistrictId
       and Granted is null
  end
end
else
if @pAction = 3
begin
  select @AmountPaid = isnull(sum(TranAmount),0)
    from BidLedger 
   where RegDistrictId = @pRegDistrictId 
     and TranTypeId != 2

  select @ElapsedHours = datediff(Hour,Requested,getdate())
    from RegDistricts
   where RegDistrictId = @pRegDistrictId

  if @@rowcount != 0 or @AmountPaid != 0 or @ElapsedHours > 1
  begin
    Update RegDistricts
       set ValidUntil = getdate()
     where RegDistrictId = @pRegDistrictId
  end
  else
  begin
    Delete BidLedger
     where RegDistrictId = @pRegDistrictId 
       and TranTypeId = 2

    Delete RegDistricts
     where RegDistrictId = @pRegDistrictId
  end
end

set nocount off
```
