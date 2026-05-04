# Procedure: `dbo.sp_GetRequisitionShipping`

_Generated on 2026-05-04T13:07:57.480Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_GetRequisitionShipping` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-15 22:38:13 |
| Modified | 2025-04-15 22:38:13 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@RequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE dbo.sp_GetRequisitionShipping
    @RequisitionId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT  RequisitionID, TotalRequisitionCost, UserAccountID,
            COALESCE(AdditionalShippingCost, 0) AdditionalShippingCost,
            COALESCE(AdditionalFreight, 0) AdditionalFreight,
            COALESCE(det.UpdateRequired, 0) UpdateRequired
    FROM    Requisitions WITH (NOLOCK)
    OUTER APPLY (SELECT SUM(Detail.ShippingCost) ShippingCost,
                        MAX(CASE WHEN Detail.Quantity != COALESCE(Detail.ShippingQuantity, 0)
                                 OR Detail.ShippingUpdated IS NULL
                                 OR COALESCE(Detail.ShippingCost, 0) = 0 THEN 1 ELSE 0 END) UpdateRequired
                 FROM   Detail WITH (NOLOCK)
                 WHERE  Detail.RequisitionId = Requisitions.RequisitionId
                 AND    Detail.AdditionalShipping = 1) det
    WHERE   RequisitionID = @RequisitionId;
END;
```
