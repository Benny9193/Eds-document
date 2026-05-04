# Procedure: `dbo.sp_ReimportCatalog`

_Generated on 2026-05-04T14:49:08.554Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ReimportCatalog` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-01-08 23:30:48 |
| Modified | 2018-01-23 12:24:17 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CatalogImports` | USER_TABLE |  |
| `dbo.CatalogImports` | USER_TABLE | `catalogs` |
| `dbo.Master Catalog` | USER_TABLE | `Catalogs` |
| `dbo.uf_PackCodeCatalog` | unresolved | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_ReimportCatalog] @pCatalogId int 
as
begin
declare @hDoc int,
		@catalogId int,
		@CatalogImportId int,
		@ExistingEntries int,
		@Mode int,
		@pXml varchar(max)

--Get catalogImportid
select @CatalogImportId = isnull((select top 1 CatalogImportId from catalogs.dbo.CatalogImports CatalogImports where CatalogImports.CatalogId = @pCatalogId order by CatalogImports.CatalogImportId desc),0)

if @CatalogImportId = 0
begin
  raiserror('Catalog Not Imported',16,1)
  return
end

--Get Document
select @pXml = ci.XmlDoc
  from CatalogImports ci
 where ci.CatalogImportId = @CatalogImportId

-- Prepare Document
exec sp_xml_preparedocument @hDoc output, @pXML

-- Get CatalogId
select @catalogId = cast(CatalogId as int)
   from OPENXML(@hDoc, '/Catalog') with ([CatalogId] varchar(50) '@id')

--get existing row count
select @ExistingEntries = COUNT(*)
  from Catalogs.dbo.[Master Catalog] mc
 where mc.CatalogId = @catalogId

--set Overwrite = true
select @Mode = 2
 
--Check Mode
if @Mode = 0 and @ExistingEntries > 0 
begin
	raiserror('Catalog has existing Entries and Overwrite or Append are not enabled',16,1)
end

-- Overwrite Enabled - Delete Existing
if @Mode = 2
begin
  delete Catalogs.dbo.[Master Catalog]
   where CatalogId = @catalogId
end

-- Add Items to Master Catalog
insert Catalogs.dbo.[Master Catalog] (VendorItemCode, Description, PageNumber, Price, UnitCode, CatalogPrice, Manufacturor, ManufacturorPartNumber, CatalogId, GrossPrice, Heading, Keyword, NoDiscount, RTK, AdditionalShipping, MSDSURL, UniqueItemNumber, PackedCode)
  select CatalogItemNumber, ItemDescription, PageNumber, CatalogPrice, UOM, CatalogPrice, 
		 Manufacturer, ManufacturerPartNumber, @catalogId, 
		 case 
			case upper(isnull(EligibleForDiscount,'')) 
				when 'N' then 0 
				when 'Y' then 1 
				when 'NO' then 0 
				when 'YES' then 1 
				when '' then 1
				else EligibleForDiscount 
			end 
			when 0 then 
				case
				  when isnull(NetDeliveredPrice,'') = '' then 
				    CatalogPrice
				  else
				    NetDeliveredPrice
				end
			when 1 then  
				case
				  when isnull(NetDeliveredPrice,'') = '' then 
				    CatalogPrice
				  else
				    NetDeliveredPrice
				end
			else
				case
				  when isnull(NetDeliveredPrice,'') = '' then 
				    CatalogPrice
				  else
				    NetDeliveredPrice
				end
		 end,			
		 Heading, Keyword, 
		 case 
		   when isnull(ltrim(rtrim(NetDeliveredPrice)),'') = '' then -- if NetDeliveredPrice is not provided
			 case upper(isnull(EligibleForDiscount,'')) -- Set Flag correctly in DB
				when 'N' then 1 
				when 'Y' then 0 
				when 'NO' then 1 
				when 'YES' then 0 
				when '' then 0
				else EligibleForDiscount ^ 1 -- Invert flag to be correct in DB
			 end
		   else
		     1 -- NetDeliveredPrice is provided then no Additional Discount is taken
		 end,
		 case upper(RightToKnow) when 'N' then 0 when 'Y' then 1 when 'NO' then 0 when 'YES' then 1 else RightToKnow end, 
		 case upper(AdditionalShipping) when 'N' then 0 when 'Y' then 1 when 'NO' then 0 when 'YES' then 1 else AdditionalShipping end, 
		 MSDSURLorPDFName, UniqueItemNumber, eds.dbo.uf_PackCodeCatalog(CatalogItemNumber, @CatalogId)
    from OPENXML(@hDoc, '/Catalog/Entry')
            with ([PageNumber] varchar(50) 'PageNumber',
                  [CatalogItemNumber] varchar(50) 'CatalogItemNumber',
                  [ItemDescription] varchar(512) 'ItemDescription',
                  [UOM] varchar(50) 'UOM',
                  [CatalogPrice] varchar(50) 'CatalogPrice',
                  [RightToKnow] varchar(50) 'RightToKnow',
                  [NetDeliveredPrice] varchar(50) 'NetDeliveredPrice',
                  [EligibleForDiscount] varchar(50) 'EligibleForDiscount',
                  [AdditionalShipping] varchar(50) 'AdditionalShipping',
                  [UniqueItemNumber] varchar(50) 'UniqueItemNumber',
                  [Heading] varchar(50) 'Heading',
                  [Keyword] varchar(50) 'Keyword',
                  [Manufacturer] varchar(50) 'Manufacturer',
                  [ManufacturerPartNumber] varchar(50) 'ManufacturerPartNumber',
                  [MSDSURLorPDFName] varchar(50) 'MSDSURLorPDFName')
   where isnull(rtrim(ltrim(CatalogItemNumber)),'') != ''
   
--Deallocate Document
exec sp_xml_removedocument @hDoc

end
```
