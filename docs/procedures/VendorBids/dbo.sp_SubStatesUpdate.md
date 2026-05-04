# Procedure: `dbo.sp_SubStatesUpdate`

_Generated on 2026-05-04T14:49:11.340Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SubStatesUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-10 11:35:19 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRegStateId` | IN | int |  |
| 2 | `@pSessionId` | IN | int |  |
| 3 | `@pStateId` | IN | int |  |
| 4 | `@pCategoryId` | IN | int |  |
| 5 | `@pAction` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidLedger` | unresolved |  |
| `RegStates` | unresolved |  |
| `TranTypes` | USER_TABLE |  |
| `VendorSessions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure sp_SubStatesUpdate @pRegStateId int, @pSessionId int, @pStateId int, @pCategoryId int, @pAction tinyint
as
declare @RegStateId int,
	@AmountPaid money,
	@OldCharge money,
	@ElapsedHours int,
	@Charge money,
	@RegistrationId int

set nocount on

select @RegistrationId = RegistrationId
  from VendorSessions
 where SessionId = @pSessionId

if @@rowcount = 0
begin
  return
end

if @pAction = 1 or @pAction = 2
begin
  select @Charge = DefaultAmount 
    from TranTypes 
   where TranTypeId = 1

  if isnull(@pRegStateId,0) = 0
  begin
    -- Register for State
    insert RegStates (RegistrationId, StateId, CategoryId, ValidFrom, ValidUntil, Charge, Requested)
      values (@RegistrationId, @pStateId, @pCategoryId, getdate(), dateadd(year,1,getdate()), @Charge, getdate())

    select @RegStateId = SCOPE_IDENTITY(),
           @AmountPaid = 0

    if isnull(@Charge,0) != 0
    begin
      -- Post Billing to Vendor
      insert BidLedger (RegistrationId, RegStateId, TranTypeId, TranAmount, TranDate)
        values (@RegistrationId, @RegStateId, 1, @Charge, getdate())
    end
  end
  else
  begin
    select @OldCharge = isnull(Charge,0)
      from RegStates
     where RegStateId = @pRegStateId

    update RegStates
       set StateId = @pStateId,
           CategoryId = @pCategoryId
     where RegStateId = @pRegStateId

    select @RegStateId = @pRegStateId,
           @AmountPaid = isnull((select sum(TranAmount) from BidLedger where RegStateId = @pRegStateId),0)
  end

  if isnull(@AmountPaid,0) < isnull(@Charge,0)
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
