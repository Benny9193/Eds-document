# Procedure: `dbo.sp_GetUserRequisitions`

_Generated on 2026-05-04T13:43:18.850Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_GetUserRequisitions` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-16 00:23:39 |
| Modified | 2025-04-16 00:23:39 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SessionID` | IN | int |  |
| 2 | `@BudgetID` | IN | int |  |
| 3 | `@UserID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vw_FA_ALLUserAccounts` | VIEW |  |
| `vw_StatusHistory` | VIEW |  |
| `dbo.uf_FA_Requisitions` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |
| `dbo.uf_IsRequisitionLocked` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE dbo.sp_GetUserRequisitions
    @SessionID INT,
    @BudgetID INT,
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    WITH StatusHistoryCount AS (
        SELECT RequisitionId, COUNT(*) AS HistoryCount
        FROM vw_StatusHistory WITH (NOLOCK)
        GROUP BY RequisitionId
    )
    SELECT  R.*, 
            ISNULL(shc.HistoryCount, 0) AS HistoryCount,
            UA.UseAllocations | ISNULL(UA.UseBudgetAccountAllocations, 0) AS UseAllocations,
            CASE
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 1 AND UA.UseAllocations = 1 AND ISNULL(UA.AmountAvailable, 0) < UA.AllocationAvailable THEN ISNULL(UA.AmountAvailable, 0)
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 1 AND UA.UseAllocations = 1 AND ISNULL(UA.AmountAvailable, 0) >= UA.AllocationAvailable THEN UA.AllocationAvailable
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 1 AND UA.UseAllocations = 0 THEN ISNULL(UA.AmountAvailable, 0)
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 0 AND UA.UseAllocations = 1 THEN UA.AllocationAvailable
                ELSE ISNULL(UA.AmountAvailable, 0)
            END AS AllocationAvailable,
            CASE
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 1 AND UA.UseAllocations = 1 AND ISNULL(UA.AmountAvailable, 0) < UA.AllocationAvailable THEN ISNULL(UA.BudgetAmount, 0)
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 1 AND UA.UseAllocations = 1 AND ISNULL(UA.AmountAvailable, 0) >= UA.AllocationAvailable THEN UA.AllocationAmount
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 1 AND UA.UseAllocations = 0 THEN ISNULL(UA.BudgetAmount, 0)
                WHEN ISNULL(UA.UseBudgetAccountAllocations, 0) = 0 AND UA.UseAllocations = 1 THEN UA.AllocationAmount
                ELSE ISNULL(UA.AmountAvailable, 0)
            END AS AllocationAmount,
            R.AddendaTotal AS CalculatedAddendaTotal,
            dbo.uf_IsRequisitionLocked(R.RequisitionID) AS IsRequisitionLocked,
            R.AdditionalShipping,
            R.AdditionalShippingCost
    FROM    dbo.uf_FA_Requisitions(@SessionID, @BudgetID) R
            LEFT OUTER JOIN vw_FA_ALLUserAccounts UA WITH (NOLOCK) ON UA.UserAccountID = R.UserAccountID AND UA.SessionID = @SessionID
            LEFT OUTER JOIN StatusHistoryCount shc ON shc.RequisitionId = R.RequisitionID
    WHERE   R.UserID = @UserID
    ORDER   BY R.CategoryName ASC, R.RequisitionNumber ASC;
END;
```
