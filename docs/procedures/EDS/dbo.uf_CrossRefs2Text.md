# Function: scalar: `dbo.uf_CrossRefs2Text`

_Generated on 2026-05-04T13:04:24.238Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_CrossRefs2Text` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-05-10 10:34:08 |
| Modified | 2025-07-18 13:52:29 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Vendors` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.BidMgrBidRequestDetail` | VIEW |
| `dbo.BidRequestDetail` | VIEW |
| `dbo.BidRequestDetail1` | VIEW |
| `dbo.BidRequestDetail2` | VIEW |
| `dbo.BidRequestItemsCrossRefsView` | VIEW |
| `dbo.BidRequestItemsView1` | VIEW |
| `dbo.BidRequestItemsView1Original` | VIEW |
| `dbo.vw_BidRequestItemsBidMgr` | VIEW |

## Definition

```sql
CREATE function [dbo].[uf_CrossRefs2Text] (@pItemId int)
returns varchar(1024)
  
as
begin
declare @ReturnValue varchar(1024),
	@XRefName varchar(128)

select @ReturnValue = coalesce( @ReturnValue + char(13) + char(10),'') + isnull(Catalog.Name,'') + ': ' + 
                      convert(varchar(50),isnull(CrossRefs.VendorItemCode,'')) + 
                      /*case when isnull(CrossRefs.ManufacturorPartNumber,'') != '' and isnull(CrossRefs.ManufacturorPartNumber,'') != isnull(CrossRefs.VendorItemCode,'') then ' Manufacturor Part Number: ' + rtrim(convert(varchar(16),CrossRefs.ManufacturorPartNumber)) else '' end + */
                      case isnull(CrossRefs.Page,'') when '' then '' else ' Page: ' + rtrim(convert(varchar(16),CrossRefs.Page)) end + 
                      case isnull(rtrim(Crossrefs.CatalogYear),'') when '' then '' else ' Year: ' + rtrim(CrossRefs.CatalogYear) end 
  from dbo.CrossRefs with (nolock)
  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
                  and Catalog.Active = 1
                  and Catalog.CatalogId in (select CatalogId 
                                             from dbo.Catalog cat 
                                            where cat.VendorId = Catalog.VendorId 
                                              and cat.CategoryId = Catalog.CategoryId 
                                              and cat.Active = 1)
                  and Catalog.CatalogYear = (select top 1 CatalogYear
                                             from dbo.Catalog cat 
                                            where cat.VendorId = Catalog.VendorId 
                                              and cat.CategoryId = Catalog.CategoryId 
                                              and cat.Active = 1 
                                            order by cat.CatalogYear desc, cat.CatalogId desc) 
  join Vendors on Vendors.VendorId = Catalog.VendorId
 where CrossRefs.ItemId = @pItemId
   and CrossRefs.Active = 1
 order by Vendors.Name, Catalog.CatalogYear desc, Catalog.Name, CrossRefs.VendorItemCode, Crossrefs.Page
/*
if @ReturnValue = ''
begin
  select @ReturnValue = null
end
*/

return(@ReturnValue)
end
```
