# Procedure: `dbo.sp_CatalogCopy`

_Generated on 2026-05-04T13:07:58.726Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CatalogCopy` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-11-20 11:58:35 |
| Modified | 2025-02-03 14:24:32 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceCatalogId` | IN | int |  |
| 2 | `@pTargetCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Master Catalog` | USER_TABLE | `Catalogs` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CatalogCopy] @pSourceCatalogId int, @pTargetCatalogId int as
delete Catalogs.dbo.[Master Catalog]
 where CatalogId = @pTargetCatalogId
 
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
           ,[ImageURL]
           ,[ItemPackedCode]
           ,MatchKey
           ,MSDSURL
           ,UniqueItemNumber
		   ,UPC_ISBN
		   ,FullDescription
		   ,UNSPSC
		   ,PerishableItem
		   ,PrescriptionRequired
		   ,DigitallyDelivered
		   ,MinimumOrderQuantity)
SELECT [VendorItemCode]
      ,[Description]
      ,[PageNumber]
      ,[Price]
      ,[UnitCode]
      ,[CatalogPrice]
      ,[Manufacturor]
      ,[ManufacturorPartNumber]
      ,[AlternatePartNumber]
      ,@pTargetCatalogId
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
      ,[ImageURL]
      ,[ItemPackedCode]
      ,MatchKey
      ,MSDSURL
      ,UniqueItemNumber
	  ,UPC_ISBN
	  ,FullDescription
	  ,UNSPSC
	  ,PerishableItem
	  ,PrescriptionRequired
	  ,DigitallyDelivered
	  ,MinimumOrderQuantity
  FROM [Catalogs].[dbo].[Master Catalog]
 where CatalogId = @pSourcecatalogId
```
