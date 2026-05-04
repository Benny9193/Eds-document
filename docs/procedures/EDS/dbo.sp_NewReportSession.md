# Procedure: `dbo.sp_NewReportSession`

_Generated on 2026-05-04T14:49:07.298Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_NewReportSession` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-05-13 23:42:21 |
| Modified | 2015-11-24 23:37:41 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pReportRequest` | IN | varchar(4096) |  |
| 2 | `@rRSId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ReportSession` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_NewReportSession] @pReportRequest varchar(4096), @rRSId int output AS

insert ReportSession (RSData) values (@pReportRequest)

select @rRSId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

return
```
