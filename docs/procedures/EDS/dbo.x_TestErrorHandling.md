# Procedure: `dbo.x_TestErrorHandling`

_Generated on 2026-05-04T13:07:57.817Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `x_TestErrorHandling` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2016-04-27 22:11:28 |
| Modified | 2016-04-27 22:37:36 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Utility.Log_ProcedureCall` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		sm
-- Create date: 4/26/16
-- Description:	test error catching
-- =============================================
CREATE PROCEDURE [dbo].[x_TestErrorHandling] 
	-- Add the parameters for the stored procedure here

AS
BEGIN
	Begin Try
		RaisError('Forced error for testing',16,1); 
	End Try
	Begin Catch
		EXEC [Utility].[Log_ProcedureCall] @objectID = @@PROCID
	End Catch
END
```
