# Function: scalar: `dbo.uf_PackCode_New`

_Generated on 2026-05-04T13:07:57.674Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCode_New` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-11-10 22:17:36 |
| Modified | 2011-11-10 22:17:36 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.ufn_RegExReplace` | unresolved | `master` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function [dbo].[uf_PackCode_New] (@pCode varchar(255))
returns varchar(255) --with schemabinding AS
begin

  return isnull(isnull(master.dbo.ufn_RegExReplace(@pCode,'[^0-9A-Za-z]','',0),''),'null')
end
```
