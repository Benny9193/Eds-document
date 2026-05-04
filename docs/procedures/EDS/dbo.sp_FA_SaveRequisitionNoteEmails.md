# Procedure: `dbo.sp_FA_SaveRequisitionNoteEmails`

_Generated on 2026-05-04T13:04:00.398Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SaveRequisitionNoteEmails` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:49:30 |
| Modified | 2025-04-16 16:48:52 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@requisitionNoteID` | IN | int |  |
| 2 | `@userID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.RequisitionNoteEmails` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_SaveRequisitionNoteEmails] @requisitionNoteID int, @userID int

AS

	INSERT INTO [dbo].[RequisitionNoteEmails]
           ([RequisitionNoteID]
           ,[UserID])
     VALUES
           (@requisitionNoteID
           ,@userID)
```
