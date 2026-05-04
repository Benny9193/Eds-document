# Function: scalar: `dbo.uf_Trim`

_Generated on 2026-05-04T13:07:58.753Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_Trim` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2004-09-30 14:20:44 |
| Modified | 2020-01-23 21:35:00 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pInputString` | IN | varchar(1024) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE FUNCTION dbo.uf_Trim(@pInputString varchar(1024))  
RETURNS varchar(1024) AS  
BEGIN 
  return(RTrim(LTrim(@pInputString)))
END
```
