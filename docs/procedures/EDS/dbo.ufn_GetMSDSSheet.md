# Function: table-valued: `dbo.ufn_GetMSDSSheet`

_Generated on 2026-05-04T13:07:57.742Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_GetMSDSSheet` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2017-03-16 13:28:51 |
| Modified | 2017-03-16 13:28:51 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@MSDSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `MSDS` | USER_TABLE |  |
| `RTK_Items` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.vw_GetMSDSInfo` | VIEW |
| `dbo.vw_SDSImportView` | VIEW |

## Definition

```sql
create function [dbo].[ufn_GetMSDSSheet] (@MSDSId int)
returns @SDS table(MSDSId int, ItemDescription varchar(512), ItemList varchar(1024))
as
begin
declare @ItemList varchar(max), @ItemDesc varchar(max)

  select @ItemList = null, @ItemDesc = null
  select @ItemDesc = coalesce(MSDS.AlternateDescription,(select top 1 RTK_Items.AlternateDesc from RTK_Items where RTK_Items.MSDSId = MSDS.MSDSId order by RTK_Items.ItemId),'')
    from MSDS
   where MSDS.MSDSId = @MSDSId
   
  select @ItemList = coalesce(@ItemList + ',','') + rtrim(RTK_Items.ItemCode)
    from RTK_Items 
   where RTK_Items.MSDSId = @MSDSId
   group by rtrim(RTK_Items.ItemCode)

  insert @SDS (MSDSId, ItemDescription, ItemList)
    select @MSDSId, @ItemDesc, @ItemList

  return
end
```
