# Function: scalar: `dbo.uf_POAttentionListCount`

_Generated on 2026-05-04T13:43:19.066Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_POAttentionListCount` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2007-05-01 12:40:26 |
| Modified | 2009-05-05 13:56:20 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPOId` | IN | int |  |
| 2 | `@pConsolidated` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_POAttentionListCount] (@pPOId int, @pConsolidated tinyint)
returns int
as
begin
declare @DistrictId int,
        @PONumber varchar(50),
        @NumberOfAttentionLines int,
        @BudgetId int

  if @pConsolidated = 1
  begin
    select @PONumber = PONumber,
           @DistrictId = DistrictId,
           @BudgetId = Budgets.BudgetId
      from PO
      join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
     where PO.POId = @pPOId

      select @NumberOfAttentionLines = count(*) from
      (
      select Budgets.DistrictId, PO.PONumber, Requisitions.Attention
        from PO
        join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
        join Budgets on Budgets.BudgetId = Requisitions.BudgetId
        join Users on Users.UserId = Requisitions.UserId
        join UserAccounts on UserAccounts.UserId = Users.UserId
                         and UserAccounts.BudgetId = Budgets.BudgetId
        join Accounts on Accounts.AccountId = UserAccounts.AccountId
       where Budgets.DistrictId = @DistrictId
         and PO.PONumber = @PONumber
         and Budgets.BudgetId = @BudgetId
       group by Budgets.DistrictId, PO.PONumber, Requisitions.Attention
      ) ss
  end
  else
  begin
      select @NumberOfAttentionLines = count(*) from
      (
      select Budgets.DistrictId, PO.PONumber, Requisitions.Attention
        from PO
        join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
        join Budgets on Budgets.BudgetId = Requisitions.BudgetId
        join Users on Users.UserId = Requisitions.UserId
        join UserAccounts on UserAccounts.UserId = Users.UserId
                         and UserAccounts.BudgetId = Budgets.BudgetId
        join Accounts on Accounts.AccountId = UserAccounts.AccountId
       where PO.POId = @pPOId
       group by Budgets.DistrictId, PO.PONumber, Requisitions.Attention
      ) ss
  end

  return @NumberOfAttentionLines
end
```
