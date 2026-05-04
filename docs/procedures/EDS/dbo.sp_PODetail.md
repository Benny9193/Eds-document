# Procedure: `dbo.sp_PODetail`

_Generated on 2026-05-04T13:43:18.880Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PODetail` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2010-07-15 21:58:32 |
| Modified | 2010-07-15 22:25:11 |
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
CREATE procedure [dbo].[sp_PODetail] @POId int
as
select * from PODetail with (nolock) where POId = @POId order by SortSeq
```
