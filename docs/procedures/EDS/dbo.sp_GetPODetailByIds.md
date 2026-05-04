# Procedure: `dbo.sp_GetPODetailByIds`

_Generated on 2026-05-04T13:43:18.848Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_GetPODetailByIds` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-24 22:18:22 |
| Modified | 2025-04-24 22:25:22 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@POIds` | IN | nvarchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PODetail` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE dbo.sp_GetPODetailByIds
    @POIds NVARCHAR(MAX)
AS
BEGIN
/*
    SELECT pd.*
    FROM PODetail pd
    WHERE pd.POId IN (
        SELECT CAST(value AS INT)
        FROM STRING_SPLIT(@POIds, ',')
    )
    ORDER BY 
        pd.SortSeq;
*/
    -- Create a temp table to store POIds
    CREATE TABLE #POIds (POId INT);
    INSERT INTO #POIds (POId)
    SELECT CAST(value AS INT)
    FROM STRING_SPLIT(@POIds, ',');

    SELECT pd.*
    FROM PODetail pd WITH(NOLOCK)
    JOIN #POIds p ON pd.POId = p.POId
    --ORDER BY pd.SortSeq;

    DROP TABLE #POIds;
END;
```
