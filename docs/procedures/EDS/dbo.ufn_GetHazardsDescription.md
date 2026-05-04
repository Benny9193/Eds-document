# Function: scalar: `dbo.ufn_GetHazardsDescription`

_Generated on 2026-05-04T13:07:57.741Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_GetHazardsDescription` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2017-03-17 16:37:09 |
| Modified | 2017-03-17 16:39:50 |
| Encrypted | no |
| Returns | varchar(512) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@HazardCodes` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `RTK_HealthHazardCodes` | USER_TABLE |  |
| `dbo.ufn_RegExSplit` | unresolved | `master` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[ufn_GetHazardsDescription] (@HazardCodes varchar(50))
returns varchar(512)
as
begin
declare @HazardsDesc varchar(512)

  select @HazardsDesc = coalesce(@HazardsDesc + ',', '') + rtrim(RTK_HealthHazardCodes.Description)
    from RTK_HealthHazardCodes 
   where RTK_HealthHazardCodes.HealthHazardCode in (select Match from master.dbo.ufn_RegExSplit(@HazardCodes,',',1))
   group by RTK_HealthHazardCodes.Description

  return(@HazardsDesc)
end
```
