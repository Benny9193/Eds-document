# Procedure: `dbo.usp_CheckVendorComplianceForPOs`

_Generated on 2026-05-04T13:04:24.354Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_CheckVendorComplianceForPOs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2026-01-23 13:37:36 |
| Modified | 2026-01-23 13:37:36 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BudgetId` | IN | int |  |
| 2 | `@POJson` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[usp_CheckVendorComplianceForPOs]
    @BudgetId INT,
    @POJson VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Returns list of non-compliant vendors for selected POs
    SELECT DISTINCT 
        v.VendorId,
        v.Name AS VendorName,
        v.VendorComplianceFlag,
        po.POId,
        po.PONumber,
        b.StartDate AS BudgetStartDate
    FROM OPENJSON(@POJson) WITH (POId INT '$.POId') poi
    JOIN PO po WITH (NOLOCK) ON po.POId = poi.POId
    JOIN Vendors v WITH (NOLOCK) ON v.VendorId = po.VendorId
    JOIN Requisitions r WITH (NOLOCK) ON r.RequisitionId = po.RequisitionId
    JOIN Budgets b WITH (NOLOCK) ON b.BudgetId = r.BudgetId
    WHERE v.VendorComplianceFlag > 0
    ORDER BY v.Name;
END
```
