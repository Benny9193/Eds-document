# Procedure: `dbo.sp_RegDistrictsUpdate`

_Generated on 2026-05-04T14:49:11.335Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RegDistrictsUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-07 20:25:55 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRegDistrictId` | IN | int |  |
| 2 | `@pRegistrationId` | IN | int |  |
| 3 | `@pDistrictId` | IN | int |  |
| 4 | `@pCategoryId` | IN | int |  |
| 5 | `@pValidFrom` | IN | datetime |  |
| 6 | `@pValidUntil` | IN | datetime |  |
| 7 | `@pCharge` | IN | money |  |
| 8 | `@pAction` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidLedger` | unresolved |  |
| `RegDistricts` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure sp_RegDistrictsUpdate @pRegDistrictId int, @pRegistrationId int, @pDistrictId int, @pCategoryId int, @pValidFrom datetime, @pValidUntil datetime, @pCharge money, @pAction tinyint
as
declare @RegDistrictId int,
	@AmountPaid money,
	@OldCharge money,
	@ElapsedHours tinyint

set nocount on

if @pAction = 1 or @pAction = 2
begin
  if isnull(@pRegDistrictId,0) = 0
  begin
    -- Register for District
    insert RegDistricts (RegistrationId, DistrictId, CategoryId, ValidFrom, ValidUntil, Charge, Requested)
      values (@pRegistrationId, @pDistrictId, @pCategoryId, @pValidFrom, @pValidUntil, @pCharge, getdate())

    select @RegDistrictId = SCOPE_IDENTITY(),
           @AmountPaid = 0

    if isnull(@pCharge,0) != 0
    begin
      -- Post Billing to Vendor
      insert BidLedger (RegistrationId, RegDistrictId, TranTypeId, TranAmount, TranDate)
        values (@pRegistrationId, @RegDistrictId, 2, @pCharge, getdate())
    end
  end
  else
  begin
    select @OldCharge = isnull(Charge,0)
      from RegDistricts
     where RegDistrictId = @pRegDistrictId

    update RegDistricts
       set DistrictId = @pDistrictId,
           CategoryId = @pCategoryId,
           ValidFrom = @pValidFrom,
           ValidUntil = @pValidUntil,
           Charge = @pCharge
     where RegDistrictId = @pRegDistrictId

    select @RegDistrictId = @pRegDistrictId,
           @AmountPaid = isnull((select sum(TranAmount) from BidLedger where RegDistrictId = @pRegDistrictId),0)

    if isnull(@OldCharge,0) != isnull(@pCharge,0)
    begin
      -- Post Billing to Vendor
      insert BidLedger (RegistrationId, RegDistrictId, TranTypeId, TranAmount, TranDate)
        values (@pRegistrationId, @RegDistrictId, 2, isnull(@pCharge,0) - isnull(@OldCharge,0), getdate())
    end
  end

  if isnull(@AmountPaid,0) < isnull(@pCharge,0)
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
