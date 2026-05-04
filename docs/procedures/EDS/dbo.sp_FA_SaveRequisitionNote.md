# Procedure: `dbo.sp_FA_SaveRequisitionNote`

_Generated on 2026-05-04T14:49:07.279Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SaveRequisitionNote` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:49:10 |
| Modified | 2025-04-16 16:45:52 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@requisitionID` | IN | int |  |
| 2 | `@note` | IN | varchar(max) |  |
| 3 | `@userID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.RequisitionNotes` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_SaveRequisitionNote] @requisitionID int, @note varchar(max), @userID int

AS

	INSERT INTO [dbo].[RequisitionNotes]
           ([RequisitionID]
           ,[Note]
           ,[CreateDate]
           ,[CreatedByUserID])
     VALUES
           (@requisitionID
           ,@note
           ,GETDATE()
           ,@userID)
    
    SELECT SCOPE_IDENTITY() AS RequisitionNoteID
```
