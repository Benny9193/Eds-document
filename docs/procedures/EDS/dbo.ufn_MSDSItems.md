# Function: scalar: `dbo.ufn_MSDSItems`

_Generated on 2026-05-04T13:04:24.346Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_MSDSItems` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2017-08-17 16:29:57 |
| Modified | 2017-08-17 16:29:57 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@MSDSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `RTK_Items` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.vw_SDSImportView` | VIEW |

## Definition

```sql
create function dbo.ufn_MSDSItems(@MSDSId int)
returns varchar(max)
as
begin
declare @ItemList varchar(max) = null

select @ItemList = coalesce(@ItemList + ',','') + rtrim(RTK_Items.ItemCode)
  from RTK_Items 
 where RTK_Items.MSDSId = @MSDSId
 group by rtrim(RTK_Items.ItemCode)

return @ItemList
end
```
