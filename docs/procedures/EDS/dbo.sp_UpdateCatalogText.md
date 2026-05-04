# Procedure: `dbo.sp_UpdateCatalogText`

_Generated on 2026-05-04T13:04:00.467Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateCatalogText` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-02-21 00:22:39 |
| Modified | 2012-08-02 18:49:56 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |
| 2 | `@pPageNbr` | IN | int |  |
| 3 | `@pXML` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CatalogText` | USER_TABLE |  |
| `CatalogTextParts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UpdateCatalogText] @pCatalogId int, @pPageNbr int, @pXML varchar(max)
as
declare @CatalogTextId int,
		@hDoc int
		
select @CatalogTextId = CatalogTextId
  from CatalogText with (nolock)
 where CatalogId = @pCatalogId
   and PageNbr = @pPageNbr

if @@ROWCOUNT = 0
begin
  insert CatalogText (CatalogId, PageNbr, BaseFileName, TextData)
    values (@pCatalogId, @pPageNbr, 'Page', @pXML)
  select @CatalogTextId = SCOPE_IDENTITY()
end
else
begin
  update CatalogText
     set TextData = @pXML
   where CatalogTextId = @CatalogTextId
end

delete CatalogTextParts
 where CatalogTextId = @CatalogTextId

exec sp_xml_preparedocument @hDoc output, @pXML

insert CatalogTextParts (CatalogTextId, TextPart)
  select @CatalogTextId, Part
    from OpenXML(@hDoc, '/Catalog/TextParts/Part',2)
    with (CatalogId int '../../@CATALOGID',
          PageNbr int '../../@PAGENBR',
          Part varchar(max) '.') x

exec sp_xml_removedocument @hDoc

update CatalogTextParts
   set BaseOffset = 
         isnull((select sum(datalength(TextPart)) 
                   from CatalogTextParts ctp 
                  where ctp.CatalogTextId = CatalogTextParts.CatalogTextId 
                    and ctp.CatalogTextPartId < CatalogTextParts.CatalogTextPartId),0)
  from CatalogTextParts
 where CatalogTextParts.CatalogTextId = @CatalogTextId
 
select @CatalogTextId as CatalogTextId
```
