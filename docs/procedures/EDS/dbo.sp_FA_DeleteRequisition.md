# Procedure: `dbo.sp_FA_DeleteRequisition`

_Generated on 2026-05-04T13:07:57.459Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_DeleteRequisition` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-03-13 10:41:06 |
| Modified | 2025-04-16 03:31:13 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |
| 3 | `@rStatus` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_UpdateReq` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE dbo.sp_FA_DeleteRequisition 
    @pSessionId INT, 
    @pRequisitionId INT, 
    @rStatus INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CSRepId INT;

    -- Check existence
    IF NOT EXISTS (SELECT 1 FROM Requisitions WITH (ROWLOCK, UPDLOCK) WHERE RequisitionId = @pRequisitionId)
    BEGIN
        -- Not found
        RETURN;
    END;

    -- Check POs
    IF EXISTS (SELECT 1 FROM PO WITH (NOLOCK) WHERE RequisitionId = @pRequisitionId)
    BEGIN
        -- POs exist
        RETURN;
    END;

    -- Check CSRepId
    SELECT @CSRepId = ISNULL(CSRepId, 0)
    FROM SessionTable WITH (NOLOCK)
    WHERE SessionId = @pSessionId;

    IF @CSRepId = 0
    BEGIN
        IF EXISTS (SELECT 1 FROM Detail WITH (NOLOCK) WHERE RequisitionId = @pRequisitionId)
        BEGIN
            -- Details exist
            RETURN;
        END;
    END;

    -- Update requisition
    EXEC sp_UpdateReq @pRequisitionId, NULL, NULL, NULL;

    -- Delete related data
    DELETE FROM Approvals WITH (ROWLOCK)
    WHERE RequisitionId = @pRequisitionId;

    DELETE FROM ApprovalsHistory WITH (ROWLOCK)
    WHERE RequisitionId = @pRequisitionId;

    DELETE FROM Detail WITH (ROWLOCK)
    WHERE RequisitionId = @pRequisitionId;

    DELETE FROM Requisitions WITH (ROWLOCK)
    WHERE RequisitionId = @pRequisitionId;

    SET @rStatus = 0; -- Success
END;
```
