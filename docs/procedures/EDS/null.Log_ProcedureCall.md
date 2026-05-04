# Procedure: `null.Log_ProcedureCall`

_Generated on 2026-05-04T13:04:00.196Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `Log_ProcedureCall` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2016-04-27 23:15:10 |
| Modified | 2016-04-27 23:15:10 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.ProcedureLog` | unresolved | `Utility` |

## Called by

| Caller | Type |
|--------|------|
| `dbo.x_TestErrorHandling` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE PROCEDURE [utility].[Log_ProcedureCall]
 @ObjectID       INT,
 @DatabaseID     INT = NULL,
 @AdditionalInfo NVARCHAR(MAX) = NULL
AS
BEGIN
 SET NOCOUNT ON;
 
 DECLARE 
  @ProcedureName NVARCHAR(400);
  
 SELECT
  @DatabaseID = COALESCE(@DatabaseID, DB_ID()),
  @ProcedureName = COALESCE
  (
   QUOTENAME(DB_NAME(@DatabaseID)) + '.'
   + QUOTENAME(OBJECT_SCHEMA_NAME(@ObjectID, @DatabaseID)) 
   + '.' + QUOTENAME(OBJECT_NAME(@ObjectID, @DatabaseID)),
   ERROR_PROCEDURE()
  );
 
 INSERT Utility.dbo.ProcedureLog
 (
  DatabaseID,
  ObjectID,
  ProcedureName,
  ErrorLine,
  ErrorMessage,
  AdditionalInfo
 )
 SELECT
  @DatabaseID,
  @ObjectID,
  @ProcedureName,
  ERROR_LINE(),
  ERROR_MESSAGE(),
  @AdditionalInfo;
END
```
