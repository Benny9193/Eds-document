# Procedure: `dbo.sp_RegStatesUpdate`

_Generated on 2026-05-04T13:43:22.341Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RegStatesUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-07 19:51:12 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRegStateId` | IN | int |  |
| 2 | `@pRegistrationId` | IN | int |  |
| 3 | `@pStateId` | IN | int |  |
| 4 | `@pCategoryId` | IN | int |  |
| 5 | `@pValidFrom` | IN | datetime |  |
| 6 | `@pValidUntil` | IN | datetime |  |
| 7 | `@pCharge` | IN | money |  |
| 8 | `@pAction` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidLedger` | unresolved |  |
| `RegStates` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure sp_RegStatesUpdate @pRegStateId int, @pRegistrationId int, @pStateId int, @pCategoryId int, @pValidFrom datetime, @pValidUntil datetime, @pCharge money, @pAction tinyint
as
declare @RegStateId int,
	@AmountPaid money,
	@OldCharge money,
	@ElapsedHours int

set nocount on

if @pAction = 1 or @pAction = 2
begin
  if isnull(@pRegStateId,0) = 0
  begin
    -- Register for State
    insert RegStates (RegistrationId, StateId, CategoryId, ValidFrom, ValidUntil, Charge, Requested)
      values (@pRegistrationId, @pStateId, @pCategoryId, @pValidFrom, @pValidUntil, @pCharge, getdate())

    select @RegStateId = SCOPE_IDENTITY(),
           @AmountPaid = 0

    if isnull(@pCharge,0) != 0
    begin
      -- Post Billing to Vendor
      insert BidLedger (RegistrationId, RegStateId, TranTypeId, TranAmount, TranDate)
        values (@pRegistrationId, @RegStateId, 1, @pCharge, getdate())
    end
  end
  else
  begin
    select @OldCharge = isnull(Charge,0)
      from RegStates
     where RegStateId = @pRegStateId

    update RegStates
       set StateId = @pStateId,
           CategoryId = @pCategoryId,
           ValidFrom = @pValidFrom,
           ValidUntil = @pValidUntil,
           Charge = @pCharge
     where RegStateId = @pRegStateId

    select @RegStateId = @pRegStateId,
           @AmountPaid = isnull((select sum(TranAmount) from BidLedger where RegStateId = @pRegStateId),0)

    if isnull(@OldCharge,0) != isnull(@pCharge,0)
    begin
      -- Post Billing to Vendor
      insert BidLedger (RegistrationId, RegStateId, TranTypeId, TranAmount, TranDate)
        values (@pRegistrationId, @RegStateId, 1, isnull(@pCharge,0) - isnull(@OldCharge,0), getdate())
    end
  end

  if isnull(@AmountPaid,0) < isnull(@pCharge,0)
  begin
    -- Deny Access if Needed
    Update RegStates
       set Granted = null
     where RegStateId = @RegStateId
       and Granted is not null
  end
  else
  begin
    -- Grant Access if needed
    Update RegStates
       set Granted = getdate()
     where RegStateId = @RegStateId
       and Granted is null
  end
end
else
if @pAction = 3
begin
  select @AmountPaid = isnull(sum(TranAmount),0)
    from BidLedger 
   where RegStateId = @pRegStateId 
     and TranTypeId != 1

  select @ElapsedHours = datediff(Hour,Requested,getdate())
    from RegStates
   where RegStateId = @pRegStateId

  if @@rowcount != 0 or @AmountPaid != 0 or @ElapsedHours > 1
  begin
    Update RegStates
       set ValidUntil = getdate()
     where RegStateId = @pRegStateId
  end
  else
  begin
    Delete BidLedger
     where RegStateId = @pRegStateId 
       and TranTypeId = 1

    Delete RegStates
     where RegStateId = @pRegStateId
  end
end

set nocount off
```
