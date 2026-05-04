# Procedure: `dbo.usp_StoreImageError`

_Generated on 2026-05-04T13:04:00.761Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_StoreImageError` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-05-03 22:02:22 |
| Modified | 2021-05-03 22:02:22 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@imageURL` | IN | varchar(2048) |  |
| 2 | `@error` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ImageErrors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure [dbo].[usp_StoreImageError] @imageURL varchar(2048), @error varchar(max)
as
begin

	insert ImageErrors(ImageURL, error)
	  values(@imageURL, @error)
end
```
