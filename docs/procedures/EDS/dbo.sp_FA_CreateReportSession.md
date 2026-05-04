# Procedure: `dbo.sp_FA_CreateReportSession`

_Generated on 2026-05-04T14:49:07.271Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_CreateReportSession` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:50:28 |
| Modified | 2012-06-13 23:50:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ReportSession` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_CreateReportSession]
AS
	INSERT INTO ReportSession (RSData)
	VALUES	('')
	
	SELECT SCOPE_IDENTITY() AS ReportSessionID
```
