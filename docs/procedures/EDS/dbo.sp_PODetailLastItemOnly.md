# Procedure: `dbo.sp_PODetailLastItemOnly`

_Generated on 2026-05-04T13:43:18.881Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PODetailLastItemOnly` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-05-20 11:07:07 |
| Modified | 2025-05-20 11:07:07 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@POId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PODetail` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure [dbo].[sp_PODetailLastItemOnly] @POId int
as
select top 1 * from PODetail with (nolock) where POId = @POId order by SortSeq desc
```
