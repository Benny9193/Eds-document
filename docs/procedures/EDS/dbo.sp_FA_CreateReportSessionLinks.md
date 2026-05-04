# Procedure: `dbo.sp_FA_CreateReportSessionLinks`

_Generated on 2026-05-04T13:43:18.824Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_CreateReportSessionLinks` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:50:35 |
| Modified | 2012-06-13 23:50:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@reportSessionID` | IN | int |  |
| 2 | `@intID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ReportSessionLinks` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_CreateReportSessionLinks] @reportSessionID int, @intID int
AS
	INSERT INTO ReportSessionLinks (RSId, IntId)
	VALUES	(@reportSessionID, @intID)
```
