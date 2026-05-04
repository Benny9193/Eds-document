# Procedure: `dbo.usp_GetItemAIData`

_Generated on 2026-05-04T13:04:00.711Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetItemAIData` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-27 18:18:06 |
| Modified | 2025-05-07 16:46:32 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@IdList` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CrossRefs` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_GetItemAIData] @IdList varchar(max)
as
-- Return Existing Data for AI Process
select CrossRefs.CrossRefId,
       coalesce(trim(CrossRefs.ShortDescription),'') ShortDescription,
	   coalesce(trim(CrossRefs.FullDescription),'') FullDescription,
	   coalesce(trim(CrossRefs.Manufacturor),'') Manufacturer,
	   coalesce(trim(CrossRefs.ManufacturorPartNumber),'') ManufacturerPartNumber,
	   coalesce(trim(CrossRefs.UNSPSC),'') UNSPSC
  from CrossRefs with (nolock)
 where CrossRefs.CrossRefId in (Select cast(ss.value as int) Id from string_split(@IdList,',') ss)
```
