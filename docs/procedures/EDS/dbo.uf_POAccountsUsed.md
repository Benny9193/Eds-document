# Function: table-valued: `dbo.uf_POAccountsUsed`

_Generated on 2026-05-04T13:43:19.064Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_POAccountsUsed` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2003-04-03 16:32:54 |
| Modified | 2009-05-05 15:01:14 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPOId` | IN | int |  |
| 2 | `@pConsolidated` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_POAccountsUsed] (@pPOId int, @pConsolidated tinyint)
returns @AccountTable table (
DistrictId	int null,
PONumber	varchar(50) null,
AccountCode	varchar(50) null,
Amount		money null)
as
begin
declare @DistrictId int,
        @PONumber varchar(50),
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

    insert @AccountTable (DistrictId, PONumber, AccountCode, Amount)
      select Budgets.DistrictId, PO.PONumber, Requisitions.AccountCode, sum(PO.Amount) POAmount
        from PO
        join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
        join Budgets on Budgets.BudgetId = Requisitions.BudgetId
        join Users on Users.UserId = Requisitions.UserId
       where Budgets.DistrictId = @DistrictId
         and PO.PONumber = @PONumber
         and Budgets.BudgetId = @BudgetId
       group by Budgets.DistrictId, PO.PONumber, Requisitions.AccountCode
  end
  else
  begin
    insert @AccountTable (DistrictId, PONumber, AccountCode, Amount)
      select Budgets.DistrictId, PO.PONumber, Requisitions.AccountCode, sum(PO.Amount) POAmount
        from PO
        join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
        join Budgets on Budgets.BudgetId = Requisitions.BudgetId
        join Users on Users.UserId = Requisitions.UserId
       where PO.POId = @pPOId
       group by Budgets.DistrictId, PO.PONumber, Requisitions.AccountCode
  end

  return
end
```
