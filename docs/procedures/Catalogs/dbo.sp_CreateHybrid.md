# Procedure: `dbo.sp_CreateHybrid`

_Generated on 2026-05-04T13:07:58.731Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateHybrid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-12-17 22:42:57 |
| Modified | 2018-01-22 20:51:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pNewCatalogId` | IN | int |  |
| 2 | `@pOldCatalogId` | IN | int |  |
| 3 | `@pUsecatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `sp_PostCatalog` | unresolved |  |
| `dbo.Master Catalog` | USER_TABLE | `Catalogs` |
| `dbo.Catalog` | unresolved | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateHybrid] @pNewCatalogId int, @pOldCatalogId int, @pUsecatalogId int = 0 as
begin
declare @CatalogId int

if isnull(@pUsecatalogId,0) = 0
begin
INSERT INTO [EDS].[dbo].[Catalog]
           ([Active]
           ,[CategoryId]
           ,[VendorId]
           ,[Name]
           ,[ImportFormat]
           ,[Prefix]
           ,[NextNumber]
           ,[VendorFormat]
           ,[Description]
           ,[CrossRefLetter]
           ,[DropSeq]
           ,[CatalogYear]
           ,[EffectiveFrom]
           ,[EffectiveUntil]
           ,[WebDesc]
           ,[WebLink]
           ,[NotValidForOB]
           ,[AlertMsg]
           ,[BeginDefault]
           ,[PackExp]
           ,[PackReplace]
           ,[Index]
           ,[Page1]
           ,[MaxPage]
           ,[PDFAvailable]
           ,[pdfDirectory]
           ,[BasePath]
           ,[BaseCatalogId])
SELECT 1
      ,catnew.[CategoryId]
      ,catnew.[VendorId]
      ,rtrim(ltrim(catold.[Name])) + '.'
      ,catnew.[ImportFormat]
      ,catnew.[Prefix]
      ,catnew.[NextNumber]
      ,catnew.[VendorFormat]
      ,rtrim(ltrim(catold.[Description])) + ' Hybrid'
      ,catnew.[CrossRefLetter]
      ,catnew.[DropSeq]
      ,catold.[CatalogYear]
      ,catnew.[EffectiveFrom]
      ,catnew.[EffectiveUntil]
      ,catold.[WebDesc]
      ,catold.[WebLink]
      ,catold.[NotValidForOB]
      ,catnew.[AlertMsg]
      ,catnew.[BeginDefault]
      ,catold.[PackExp]
      ,catold.[PackReplace]
      ,catold.[Index]
      ,catold.[Page1]
      ,catold.[MaxPage]
      ,catold.[PDFAvailable]
      ,catold.[pdfDirectory]
      ,catold.[BasePath]
      ,catold.[BaseCatalogId]
  FROM [EDS].[dbo].[Catalog] catnew
  join EDS.dbo.Catalog catold on catold.VendorId = catnew.VendorId
                             and catold.CatalogId = @pOldCatalogId
 where catnew.CatalogId = @pNewCatalogId

select @CatalogId = SCOPE_IDENTITY()
end
else
begin
	select @CatalogId = @pUsecatalogId
end

if ISNULL(@CatalogId,0) != 0
begin
	INSERT INTO [Catalogs].[dbo].[Master Catalog]
			   ([VendorItemCode]
			   ,[Description]
			   ,[PageNumber]
			   ,[Price]
			   ,[UnitCode]
			   ,[CatalogPrice]
			   ,[Manufacturor]
			   ,[ManufacturorPartNumber]
			   ,[AlternatePartNumber]
			   ,[CatalogId]
			   ,[PackedCode]
			   ,[Status]
			   ,[Skip]
			   ,[ItemId]
			   ,[CrossRefId]
			   ,[DontAdd]
			   ,[NewItemId]
			   ,[GrossPrice]
			   ,[Heading]
			   ,[Keyword]
			   ,[NoDiscount]
			   ,[RTK]
			   ,[AdditionalShipping]
			   ,[ImageLink]
			   ,[ItemPackedCode]
			   ,[MatchKey]
			   ,[MSDSURL]
			   ,[UniqueItemNumber])
	SELECT mcnew.[VendorItemCode]
		  ,mcnew.[Description]
		  ,mcold.[PageNumber]
		  ,mcnew.[Price]
		  ,mcnew.[UnitCode]
		  ,mcnew.[CatalogPrice]
		  ,mcnew.[Manufacturor]
		  ,mcnew.[ManufacturorPartNumber]
		  ,mcnew.[AlternatePartNumber]
		  ,@CatalogId
		  ,mcnew.[PackedCode]
		  ,mcnew.[Status]
		  ,mcnew.[Skip]
		  ,mcnew.[ItemId]
		  ,mcnew.[CrossRefId]
		  ,mcnew.[DontAdd]
		  ,mcnew.[NewItemId]
		  ,mcnew.[GrossPrice]
		  ,mcnew.[Heading]
		  ,mcnew.[Keyword]
		  ,mcnew.[NoDiscount]
		  ,mcnew.[RTK]
		  ,mcnew.[AdditionalShipping]
		  ,mcnew.[ImageLink]
		  ,mcnew.[ItemPackedCode]
		  ,mcnew.[MatchKey]
		  ,mcnew.[MSDSURL]
		  ,mcnew.[UniqueItemNumber]
	  FROM [EDS].[dbo].[Catalog] catnew
	  join EDS.dbo.Catalog catold on catold.VendorId = catnew.VendorId
								 and catold.CatalogId = @pOldCatalogId
	  join [Catalogs].[dbo].[Master Catalog] mcnew on mcnew.CatalogId = catnew.CatalogId
	  join [Catalogs].[dbo].[Master Catalog] mcold on mcold.CatalogId = catold.CatalogId
												  and mcold.PackedCode = 
												            case
												              when isnull(catnew.ImportFormat,1) = 4 then
												                mcold.PackedCode
												              else mcnew.PackedCode
												            end
												  and case 
														when isnull(catold.ImportFormat,1) = 2 then 
														  ISNULL(mcold.ManufacturorPartNumber,'')
														when isnull(catold.ImportFormat,1) = 4 then 
														  ISNULL(mcold.UniqueItemNumber,'')
														else
														  ''
													  end = case
															  when isnull(catnew.ImportFormat,1) = 2 then
																isnull(mcnew.ManufacturorPartNumber,'')
															  when isnull(catnew.ImportFormat,1) = 4 then
																isnull(mcnew.UniqueItemNumber,'')
															  else
																''
															end
	 where catnew.CatalogId = @pNewCatalogId

  print 'New CatalogId = ' + cast(isnull(@CatalogId,0) as varchar)

  exec sp_PostCatalog @CatalogId
end
else
begin
  print 'Problem Creating Hybrid Catalog. New=' + cast(@pNewCatalogId as varchar) + ' old=' + cast(@pOldCatalogId as varchar)
end
end
```
