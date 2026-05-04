# Function: table-valued: `dbo.uf_CatalogFtsPageHighlights`

_Generated on 2026-05-04T13:04:24.231Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_CatalogFtsPageHighlights` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2012-07-08 22:57:52 |
| Modified | 2017-12-19 12:55:05 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |
| 2 | `@pPage` | IN | int |  |
| 3 | `@pSearchParams` | IN | varchar(4000) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `CatalogText` | USER_TABLE |  |
| `CatalogTextParts` | USER_TABLE |  |
| `dbo.uf_SetupSearch` | SQL_SCALAR_FUNCTION |  |
| `dbo.ufn_GoogleToFTS` | unresolved | `master` |
| `dbo.ufn_RegExIsMatch` | unresolved | `master` |
| `dbo.ufn_RegExMatches` | unresolved | `master` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from dbo.uf_CatalogFtsHighlights(2312, 'Calculator -TI')

CREATE function [dbo].[uf_CatalogFtsPageHighlights](@pCatalogId int, @pPage int, @pSearchParams varchar(4000))
returns @Hits table (
Page int,
Offset int,
Length int)
with EXECUTE AS owner
as
begin
declare @Page int,
		@BaseOffset int,
		@Text varchar(max),
		@MatchKey varchar(255),
		@PatMatchKey varchar(255),
		@RegExMatchKey varchar(255)
		
select @MatchKey = dbo.uf_SetupSearch(@pSearchParams)
select @PatMatchKey = master.dbo.ufn_GoogleToFTS(@MatchKey)
--print @PatMatchKey
select @RegExMatchKey = null

select @RegExMatchKey = coalesce(@RegExMatchKey + '|','') + '(\b' + p.display_term + '\b)'
--select @RegExMatchKey = coalesce(@RegExMatchKey + '|','') + '((\s|[^0-9a-zA-Z])' + p.display_term + '(\s|[^0-9a-zA-Z]))'
  from sys.dm_fts_parser(@PatMatchKey,1033,0,0) p
 where patINDEX('%[^0-9a-zA-Z]%',p.Source_term) = 0
select @RegExMatchKey = coalesce(@RegExMatchKey + '|','') + '(' + p.Source_term + ')'
  from sys.dm_fts_parser(@PatMatchKey,1033,0,0) p
 where patINDEX('%[^0-9a-zA-Z]%',p.Source_term) != 0
 group by p.source_term

declare sc cursor read_only for 
select PageNbr, CatalogTextParts.BaseOffset, TextPart
  from CatalogTextParts with (nolock)
  join CatalogText on CatalogText.CatalogTextId = CatalogTextParts.CatalogTextId
  join Catalog on Catalog.BaseCatalogId = CatalogText.CatalogId
              and Catalog.CatalogId = @pCatalogId
 where master.dbo.ufn_RegExIsMatch(CatalogTextParts.TextPart,@RegExMatchKey,1) != 0
   and CatalogText.PageNbr = @pPage + Catalog.Page1 - 1
  
open sc

fetch next from sc into @Page, @BaseOffset, @Text

while @@FETCH_STATUS = 0
begin
  insert @Hits (Page, Offset, Length)
  select @Page, @BaseOffset + MatchIndex, MatchLength
    from master.dbo.ufn_RegExMatches(@Text, @RegExMatchKey, 1) as m

  fetch next from sc into @Page, @BaseOffset, @Text
end
close sc
deallocate sc

return
end
```
