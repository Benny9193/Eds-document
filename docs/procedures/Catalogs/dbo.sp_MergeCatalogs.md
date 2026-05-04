# Procedure: `dbo.sp_MergeCatalogs`

_Generated on 2026-05-04T13:07:58.732Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MergeCatalogs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-12-18 23:59:47 |
| Modified | 2018-01-22 20:51:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pTargetCatalogId` | IN | int |  |
| 2 | `@pAddCatalogId` | IN | int |  |

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
CREATE procedure [dbo].[sp_MergeCatalogs] @pTargetCatalogId int, @pAddCatalogId int as
begin
declare @CatalogId int

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
	SELECT mcadd.[VendorItemCode]
		  ,mcadd.[Description]
		  ,mcadd.[PageNumber]
		  ,mcadd.[Price]
		  ,mcadd.[UnitCode]
		  ,mcadd.[CatalogPrice]
		  ,mcadd.[Manufacturor]
		  ,mcadd.[ManufacturorPartNumber]
		  ,mcadd.[AlternatePartNumber]
		  ,@pTargetCatalogId
		  ,mcadd.[PackedCode]
		  ,mcadd.[Status]
		  ,mcadd.[Skip]
		  ,mcadd.[ItemId]
		  ,mcadd.[CrossRefId]
		  ,mcadd.[DontAdd]
		  ,mcadd.[NewItemId]
		  ,mcadd.[GrossPrice]
		  ,mcadd.[Heading]
		  ,mcadd.[Keyword]
		  ,mcadd.[NoDiscount]
		  ,mcadd.[RTK]
		  ,mcadd.[AdditionalShipping]
		  ,mcadd.[ImageLink]
		  ,mcadd.[ItemPackedCode]
		  ,mcadd.[MatchKey]
		  ,mcadd.[MSDSURL]
		  ,mcadd.[UniqueItemNumber]
	  FROM [EDS].[dbo].[Catalog] catadd
	  join EDS.dbo.Catalog cattarget on cattarget.VendorId = catadd.VendorId
							 	    and cattarget.CatalogId = @pTargetCatalogId
	  join [Catalogs].[dbo].[Master Catalog] mcadd on mcadd.CatalogId = catadd.CatalogId
	  left outer join [Catalogs].[dbo].[Master Catalog] mctarget on mctarget.CatalogId = cattarget.CatalogId
				 								                and mctarget.PackedCode = mcadd.PackedCode
												                and case 
														              when isnull(cattarget.ImportFormat,1) = 2 then 
														                ISNULL(mctarget.ManufacturorPartNumber,'')
														              else
														                ''
													                end = case
															                when isnull(catadd.ImportFormat,1) = 2 then
																              isnull(mcadd.ManufacturorPartNumber,'')
															                else
																              ''
															              end
	 where catadd.CatalogId = @pAddCatalogId
       and mctarget.sysid is null
       
  exec sp_PostCatalog @pTargetCatalogId
end
```
