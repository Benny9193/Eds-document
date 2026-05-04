# Procedure: `dbo.sp_FA_GetAlert`

_Generated on 2026-05-04T13:07:57.461Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_GetAlert` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:03:35 |
| Modified | 2012-06-14 00:03:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Alerts` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_GetAlert] @sessionID int

AS

	SELECT	A.[Message]
	FROM	SessionTable ST, Alerts A
	WHERE	GETDATE() BETWEEN A.DisplayStart AND A.DisplayEnd
		AND	(A.DistrictID = ST.DistrictId OR A.DistrictID IS NULL)
		AND ST.SessionId=@sessionID
	ORDER	BY A.DistrictId DESC, A.AlertID DESC
```
