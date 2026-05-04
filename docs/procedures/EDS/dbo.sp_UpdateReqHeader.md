# Procedure: `dbo.sp_UpdateReqHeader`

_Generated on 2026-05-04T13:07:57.550Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateReqHeader` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-10-12 10:53:56 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pChangeField` | IN | varchar(255) |  |
| 2 | `@pSessionId` | IN | int |  |
| 3 | `@pRequisitionId` | IN | int |  |
| 4 | `@pCharField` | IN | varchar(255) |  |
| 5 | `@pChar2Field` | IN | varchar(255) |  |
| 6 | `@pIntField` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `CSRep` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `RequisitionChangeLog` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_AddAccount` | unresolved |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.sp_UpdateReq` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_UpdateReqHeader @pChangeField varchar(255), @pSessionId int, @pRequisitionId int, @pCharField varchar(255), @pChar2Field varchar(255), @pIntField int AS

declare	@BudgetAccountId int,
	@UserAccountId int,
	@BudgetId int,
        @DistrictId int,
	@ShippingId int,
	@ItemCount int,
	@UserId int,
	@AccountCode varchar(255),
	@CharSessionId varchar(16),
	@Attention varchar(255),
        @StartDate varchar(32),
	@OrigSchoolId int,
	@OrigUserId int,
	@OrigBudgetId int,
	@OrigBudgetAccountId int,
	@OrigUserAccountId int,
	@OrigCategoryId int,
	@OrigShippingId int,
	@OrigAttention varchar(50),
	@OrigAccountCode varchar(50),
	@OrigBidHeaderId int,
	@NewSchoolId int,
	@NewUserId int,
	@NewBudgetId int,
	@NewBudgetAccountId int,
	@NewUserAccountId int,
	@NewCategoryId int,
	@NewShippingId int,
	@NewAttention varchar(50),
	@NewAccountCode varchar(50),
	@NewBidHeaderId int

select 	@OrigSchoolId = SchoolId,
	@OrigUserId = UserId,
	@OrigBudgetId = BudgetId,
	@OrigBudgetAccountId = BudgetAccountId,
	@OrigUserAccountId = UserAccountId,
	@OrigCategoryId = CategoryId,
	@OrigShippingId = ShippingId,
	@OrigAttention = Attention,
	@OrigAccountCode = AccountCode,
	@OrigBidHeaderId = BidHeaderId,
	@NewSchoolId = SchoolId,
	@NewUserId = UserId,
	@NewBudgetId = BudgetId,
	@NewBudgetAccountId = BudgetAccountId,
	@NewUserAccountId = UserAccountId,
	@NewCategoryId = CategoryId,
	@NewShippingId = ShippingId,
	@NewAttention = Attention,
	@NewAccountCode = AccountCode,
	@NewBidHeaderId = BidHeaderId
  from Requisitions
 where RequisitionId = @pRequisitionId

  Select @DistrictId = DistrictId,
         @UserId = case isnull(SessionTable.CSRepId,0) when 0 then SessionTable.UserId else CSRep.UserId end
    from SessionTable
    left outer join CSRep on CSRep.CSRepId = SessionTable.CSRepId
   where SessionId = @pSessionId

if @pChangeField = 'Attention'
begin
  Update Requisitions
     set Attention = rtrim(@pCharField)
   where RequisitionId = @pRequisitionId

  select @NewAttention = rtrim(@pCharField)
end

if @pChangeField = 'SchoolId'
begin
  Select @DistrictId = DistrictId
    from SessionTable
   where SessionId = @pSessionId

  select @BudgetId = Requisitions.BudgetId
    from Requisitions
   where RequisitionId = @pRequisitionId

  if @@rowcount = 0 or isnull(@BudgetId,0) = 0
  begin
    if month(getdate()) >= 11
    begin
      select @StartDate = '07/01/' + convert(char(4),year(getdate()) + 1)
    end
    else
    begin
      select @StartDate = '07/01/' + convert(char(4),year(getdate()))
    end

    Select @BudgetId = BudgetId,
           @NewBudgetId = BudgetId
      from Budgets
     where DistrictId = @DistrictId
       and StartDate >= @StartDate
       and EndDate <= @StartDate
       and Active = 1
  end

  Select @ShippingId = ShippingId,
         @NewShippingId = ShippingId,
         @NewSchoolId = SchoolId
    from School
   where SchoolId = @pIntField

  Update SessionTable
     set SchoolId = @pIntField,
	 UserId = 0
   where SessionId = @pSessionId

  Update Requisitions
     set SchoolId = @pIntField,
         ShippingId = @ShippingId
   where RequisitionId = @pRequisitionId

  exec dbo.sp_UpdateReq @pRequisitionId, null, @BudgetId, null
end

if @pChangeField = 'ShippingId'
begin
  select @NewShippingId = @pIntField

  Update Requisitions
     set ShippingId = @pIntField
   where RequisitionId = @pRequisitionId
end

if @pChangeField = 'UserId'
begin
  Select @Attention = Attention,
         @ShippingId = ShippingId,
         @NewAttention = Attention,
         @NewShippingId = ShippingId
    from Users
   where UserId = @pIntField

  Select @DistrictId = DistrictId
    from SessionTable
   where SessionId = @pSessionId

  select @BudgetId = Requisitions.BudgetId
    from Requisitions
   where RequisitionId = @pRequisitionId

  if @@rowcount = 0 or isnull(@BudgetId,0) = 0
  begin
    if month(getdate()) >= 11
    begin
      select @StartDate = '07/01/' + convert(char(4),year(getdate()) + 1)
    end
    else
    begin
      select @StartDate = '07/01/' + convert(char(4),year(getdate()))
    end

    Select @BudgetId = BudgetId,
           @NewBudgetId = BudgetId
      from Budgets
     where DistrictId = @DistrictId
       and StartDate >= @StartDate
       and EndDate <= @StartDate
       and Active = 1
  end

  select @NewUserId = @pIntField

  Update SessionTable
     set UserId = @pIntField
   where SessionId = @pSessionId

  Update Requisitions
     set Attention = @Attention,
         ShippingId = @ShippingId
   where RequisitionId = @pRequisitionId

  exec dbo.sp_UpdateReq @pRequisitionId, null, @BudgetId, @pIntField
end

if @pChangeField = 'CategoryId'
begin
  select @ItemCount = 0

  select @ItemCount = isnull(count(*),0)
    from Detail
   where RequisitionId = @pRequisitionId

  if @ItemCount = 0
  begin
    select @NewCategoryId = @pIntField

    Update Requisitions
       set CategoryId = @pIntField
     where RequisitionId = @pRequisitionId

    Update SessionTable
       set CatalogId = (select min(AwardsCatalogList.CatalogId) from Requisitions join Budgets on Budgets.BudgetId = Requisitions.BudgetId join PPCategory on PPCategory.CategoryId = Requisitions.CategoryId join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId and DistrictPP.PricePlanId = PPCategory.PricePlanId join Awards on Awards.CategoryId = PPCategory.CategoryId and Awards.PricePlanId = PPCategory.PricePlanId and Awards.Active = 1 join Bids on Bids.BidId = Awards.BidId and Bids.EffectiveFrom <= getdate() and Bids.EffectiveUntil >= getdate() join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId where Requisitions.RequisitionId = @pRequisitionId)
      from SessionTable
     where SessionId = @pSessionId
  end
end

if @pChangeField = 'BudgetId'
begin
  select @NewBudgetId = @pIntField

  Update SessionTable
     set BudgetId = @pIntField
   where SessionId = @pSessionId

  exec dbo.sp_UpdateReq @pRequisitionId, null, @pIntField, 0
end

if @pChangeField = 'UserAccountId'
begin
  select @UserAccountId = @pIntField

  if @UserAccountId = 0 and rtrim(isnull(@pCharField,'')) != ''
  begin
    select @CharSessionId = convert(varchar(16),@pSessionId)
    EXEC sp_AddAccount @CharSessionId, @pCharField, @pChar2Field, @UserAccountId output
  end

  Select @BudgetAccountId = UserAccounts.BudgetAccountId,
	 @AccountCode = Accounts.Code,
         @NewUserAccountId = UserAccounts.UserAccountId,
         @NewBudgetAccountId = UserAccounts.BudgetAccountId,
         @NewAccountCode = Accounts.Code
    from UserAccounts
    join Accounts on Accounts.AccountId = UserAccounts.AccountId
   where UserAccounts.UserAccountId = @UserAccountId

  if @@rowcount = 0
  begin
    Select @BudgetAccountId = null,
           @NewBudgetAccountId = null
  end

  exec dbo.sp_UpdateReq @pRequisitionId, @BudgetAccountId, 0, 0
end

-- Log Change
insert RequisitionChangeLog (RequisitionId, OrigSchoolId, OrigUserId, OrigBudgetId, OrigBudgetAccountId, OrigUserAccountId, OrigCategoryId, OrigShippingId, OrigAttention, OrigAccountCode, OrigBidHeaderId, NewSchoolId, NewUserId, NewBudgetId, NewBudgetAccountId, NewUserAccountId, NewCategoryId, NewShippingId, NewAttention, NewAccountCode, NewBidHeaderId, UserId, SessionId, ChangeDate)
  values (@pRequisitionId, @OrigSchoolId, @OrigUserId, @OrigBudgetId, @OrigBudgetAccountId, @OrigUserAccountId, @OrigCategoryId, @OrigShippingId, @OrigAttention, @OrigAccountCode, @OrigBidHeaderId, @NewSchoolId, @NewUserId, @NewBudgetId, @NewBudgetAccountId, @NewUserAccountId, @NewCategoryId, @NewShippingId, @NewAttention, @NewAccountCode, @NewBidHeaderId, @UserId, @pSessionId, getdate())
```
