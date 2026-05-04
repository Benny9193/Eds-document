# Function: scalar: `dbo.ufn_MSDSManufacturers`

_Generated on 2026-05-04T14:49:07.446Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_MSDSManufacturers` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2017-08-17 16:50:38 |
| Modified | 2017-08-17 16:50:38 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@MSDSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CrossRefs` | USER_TABLE |  |
| `RTK_Items` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.vw_SDSImportView` | VIEW |

## Definition

```sql
create function dbo.ufn_MSDSManufacturers(@MSDSId int)
returns varchar(max)
as
begin
declare @MPNList varchar(max) = null

select @MPNList = coalesce(@MPNList + ',','') + rtrim(CrossRefs.Manufacturor)
  from RTK_Items 
  join CrossRefs on CrossRefs.ItemId = RTK_Items.ItemId
                and CrossRefs.Active = 1
                and coalesce(CrossRefs.Manufacturor,'') != ''
                and coalesce(Crossrefs.MSDSRef,'') != ''
 where RTK_Items.MSDSId = @MSDSId
 group by rtrim(CrossRefs.Manufacturor)

return @MPNList
end
```
