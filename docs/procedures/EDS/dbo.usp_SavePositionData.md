# Procedure: `dbo.usp_SavePositionData`

_Generated on 2026-05-04T13:04:24.379Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SavePositionData` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-21 20:52:26 |
| Modified | 2025-04-21 20:52:26 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@UserId` | IN | int |  |
| 2 | `@PositionData` | IN | nvarchar(4000) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure [dbo].[usp_SavePositionData] @UserId int, @PositionData nvarchar(4000)
as
Update Users
   set PositionData = @PositionData
  from Users
 where UserId = @UserId
```
