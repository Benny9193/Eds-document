# Procedure: `dbo.sp_CopyItems`

_Generated on 2026-05-04T13:04:24.092Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyItems` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-11-12 14:15:58 |
| Modified | 2012-11-14 09:33:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceDistrictId` | IN | int |  |
| 2 | `@pTargetDistrictId` | IN | int |  |
| 3 | `@pCategoryId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CrossRefs` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE | `EDS` |
| `dbo.Headings` | USER_TABLE | `EDS` |
| `dbo.Items` | USER_TABLE | `EDS` |
| `dbo.Keywords` | USER_TABLE | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CopyItems] @pSourceDistrictId int, @pTargetDistrictId int, @pCategoryId int
as
INSERT INTO [EDS].[dbo].[Headings]
           ([Active]
           ,[CategoryId]
           ,[Code]
           ,[ExpandAll]
           ,[Title]
           ,[Description]
           ,[DistrictId])
SELECT Headings.[Active]
      ,Headings.[CategoryId]
      ,Headings.[Code]
      ,Headings.[ExpandAll]
      ,Headings.[Title]
      ,Headings.[Description]
      ,@pTargetDistrictId
  FROM [EDS].[dbo].[Headings]
  join Items on Items.HeadingId = Headings.HeadingId
            and Items.Active = 1
            and Items.DistrictId = @pSourceDistrictId
  left outer join Headings hnew on hnew.Active = 1
                               and hnew.CategoryId = Headings.CategoryId
                               and hnew.DistrictId = @pTargetDistrictId
                               and hnew.Title = Headings.Title
 where Headings.Active = 1
   and Headings.DistrictId = @pSourceDistrictId
   and Headings.CategoryId = @pCategoryId
   and hnew.HeadingId is null
 group by Headings.[Active], Headings.[CategoryId], Headings.[Code], Headings.[ExpandAll], Headings.[Title], Headings.[Description]
 
INSERT INTO [EDS].[dbo].[Keywords]
           ([Active]
           ,[CategoryId]
           ,[HeadingId]
           ,[DistrictId]
           ,[Keyword])
SELECT Keywords.[Active]
      ,Keywords.[CategoryId]
      ,hnew.HeadingId
      ,@pTargetDistrictId
      ,Keywords.[Keyword]
  FROM [EDS].[dbo].[Keywords]
  join Items on Items.KeywordId = Keywords.KeywordId
            and Items.CategoryId = @pCategoryId
            and Items.Active = 1
            and Items.DistrictId = @pSourceDistrictId
  left outer join Headings hold on hold.HeadingId = Items.HeadingId
  left outer join Headings hnew on hnew.CategoryId = hold.CategoryId
                               and hnew.Active = 1
                               and hnew.Title = hold.Title
                               and hnew.DistrictId = @pTargetDistrictId
  left outer join Keywords knew on knew.Active = 1
                               and knew.CategoryId = Keywords.CategoryId
                               and knew.DistrictId = @pTargetDistrictId
                               and knew.HeadingId = hnew.HeadingId
                               and knew.Keyword = Keywords.Keyword
 where Keywords.Active = 1
   and knew.KeywordId is null
 group by Keywords.[Active], Keywords.[CategoryId], hnew.HeadingId, Keywords.[Keyword]
      
INSERT INTO [EDS].[dbo].[Items]
           ([Active]
           ,[CategoryId]
           ,[ItemCode]
           ,[Description]
           ,[UnitId]
           ,[ParentCatalogId]
           ,[HeadingId]
           ,[RTK]
           ,[SortSeq]
           ,[EditionId]
           ,[CopyrightYear]
           ,[PackedCode]
           ,[DateDeactivated]
           ,[DistrictId]
           ,[BrandName]
           ,[ManufacturorNumber]
           ,[VendorId]
           ,[VendorPartNumber]
           ,[ItemsPerUnit]
           ,[ListPrice]
           ,[ExtraDetail]
           ,[ShortDescription]
           ,[KeywordId]
           ,[AlternateItemCode]
           ,[SectionId]
           ,[UOMDivisor]
           ,[RedirectedItemId]
           ,[ListPriceSource]
           ,[FullDescription]
           ,[CrossRefText]
           ,[StandardItem])
SELECT Items.[Active]
      ,Items.[CategoryId]
      ,rtrim(Dnew.DistrictCode) +  substring(Items.[ItemCode],3,len(Items.ItemCode)-2)
      ,Items.[Description]
      ,Items.[UnitId]
      ,Items.[ParentCatalogId]
      ,hnew.HeadingId
      ,Items.[RTK]
      ,Items.[SortSeq]
      ,Items.[EditionId]
      ,Items.[CopyrightYear]
      ,Items.[PackedCode]
      ,Items.[DateDeactivated]
      ,@pTargetDistrictId
      ,Items.[BrandName]
      ,Items.[ManufacturorNumber]
      ,Items.[VendorId]
      ,Items.[VendorPartNumber]
      ,Items.[ItemsPerUnit]
      ,Items.[ListPrice]
      ,Items.[ExtraDetail]
      ,Items.[ShortDescription]
      ,knew.KeywordId
      ,Items.[AlternateItemCode]
      ,Items.[SectionId]
      ,Items.[UOMDivisor]
      ,Items.[RedirectedItemId]
      ,Items.[ListPriceSource]
      ,Items.[FullDescription]
      ,Items.[CrossRefText]
      ,Items.[StandardItem]
  FROM [EDS].[dbo].[Items]
  join District dold on dold.DistrictId = Items.DistrictId
  join District dnew on dnew.DistrictId = @pTargetDistrictId
  left outer join Headings hold on hold.HeadingId = Items.HeadingId
  left outer join Headings hnew on hnew.CategoryId = hold.CategoryId
                               and hnew.Active = 1
                               and hnew.Title = hold.Title
                               and hnew.DistrictId = @pTargetDistrictId
  left outer join Keywords kold on kold.HeadingId = Items.KeywordId
  left outer join Keywords knew on knew.CategoryId = kold.CategoryId
                               and knew.Active = 1
                               and knew.Keyword = kold.Keyword
                               and knew.HeadingId = hnew.HeadingId
                               and knew.DistrictId = @pTargetDistrictId
  LEFT outer join Items inew on inew.Active = 1
                            and inew.CategoryId = Items.CategoryId
                            and inew.DistrictId = @pTargetDistrictId
                            and substring(inew.ItemCode,3,len(inew.ItemCode)-2) = substring(Items.ItemCode,3,len(Items.ItemCode)-2)
 where Items.Active = 1
   and Items.DistrictId = @pSourceDistrictId
   and Items.CategoryId = @pCategoryId
   and inew.ItemId IS null
 group by Items.[Active]
      ,Items.[CategoryId]
      ,rtrim(Dnew.DistrictCode) +  substring(Items.[ItemCode],3,len(Items.ItemCode)-2)
      ,Items.[Description]
      ,Items.[UnitId]
      ,Items.[ParentCatalogId]
      ,hnew.HeadingId
      ,Items.[RTK]
      ,Items.[SortSeq]
      ,Items.[EditionId]
      ,Items.[CopyrightYear]
      ,Items.[PackedCode]
      ,Items.[DateDeactivated]
      ,Items.[BrandName]
      ,Items.[ManufacturorNumber]
      ,Items.[VendorId]
      ,Items.[VendorPartNumber]
      ,Items.[ItemsPerUnit]
      ,Items.[ListPrice]
      ,Items.[ExtraDetail]
      ,Items.[ShortDescription]
      ,knew.KeywordId
      ,Items.[AlternateItemCode]
      ,Items.[SectionId]
      ,Items.[UOMDivisor]
      ,Items.[RedirectedItemId]
      ,Items.[ListPriceSource]
      ,Items.[FullDescription]
      ,Items.[CrossRefText]
      ,Items.[StandardItem]
 order by Items.SortSeq

INSERT INTO [EDS].[dbo].[CrossRefs]
           ([Active]
           ,[ItemId]
           ,[VendorItemCode]
           ,[CatalogId]
           ,[CatalogPrice]
           ,[Page]
           ,[CatalogYear]
           ,[CrossRefLocation]
           ,[PackedCode]
           ,[Manufacturor]
           ,[ManufacturorPartNumber]
           ,[DateDeactivated]
           ,[DateUpdated]
           ,[GrossPrice]
           ,[DoNotDiscount]
           ,[RTK_MSDSId]
           ,[RTK_MSDSNotNeeded]
           ,[ReplacementCrossRefId]
           ,[AdditionalShipping]
           ,[FullDescription]
           ,[UOM])
SELECT Crossrefs.[Active]
      ,inew.[ItemId]
      ,inew.[ItemCode]
      ,Crossrefs.[CatalogId]
      ,Crossrefs.[CatalogPrice]
      ,Crossrefs.[Page]
      ,Crossrefs.[CatalogYear]
      ,Crossrefs.[CrossRefLocation]
      ,inew.[PackedCode]
      ,Crossrefs.[Manufacturor]
      ,Crossrefs.[ManufacturorPartNumber]
      ,Crossrefs.[DateDeactivated]
      ,Crossrefs.[DateUpdated]
      ,Crossrefs.[GrossPrice]
      ,Crossrefs.[DoNotDiscount]
      ,Crossrefs.[RTK_MSDSId]
      ,Crossrefs.[RTK_MSDSNotNeeded]
      ,Crossrefs.[ReplacementCrossRefId]
      ,Crossrefs.[AdditionalShipping]
      ,Crossrefs.[FullDescription]
      ,Crossrefs.[UOM]
  FROM [EDS].[dbo].[CrossRefs]
  join [EDS].[dbo].[Items] iold on Iold.ItemId = CrossRefs.ItemId
                               and Iold.Active = 1
							   and Iold.DistrictId = @pSourceDistrictId
							   and Iold.CategoryId = @pCategoryId
  join Items inew on inew.Active = 1
                 and inew.CategoryId = iold.CategoryId
                 and inew.DistrictId = @pTargetDistrictId
                 and substring(inew.ItemCode,3,len(inew.ItemCode)-2) = substring(iold.ItemCode,3,len(iold.ItemCode)-2)
  join District dold on dold.DistrictId = iold.DistrictId
  join District dnew on dnew.DistrictId = inew.DistrictId
  left outer join Headings hold on hold.HeadingId = iold.HeadingId
  left outer join Headings hnew on hnew.HeadingId = inew.HeadingId
  left outer join Keywords kold on kold.HeadingId = iold.KeywordId
  left outer join Keywords knew on knew.KeywordId = inew.KeywordId
  left outer join CrossRefs cnew on cnew.ItemId = inew.ItemId
                                and ISNULL(cnew.CatalogId,0) = isnull(CrossRefs.CatalogId,0)
                                and cnew.Active = 1
 where Crossrefs.Active = 1
   and cnew.CrossRefId IS null
 group by Crossrefs.[Active]
      ,inew.[ItemId]
      ,inew.[ItemCode]
      ,Crossrefs.[CatalogId]
      ,Crossrefs.[CatalogPrice]
      ,Crossrefs.[Page]
      ,Crossrefs.[CatalogYear]
      ,Crossrefs.[CrossRefLocation]
      ,inew.[PackedCode]
      ,Crossrefs.[Manufacturor]
      ,Crossrefs.[ManufacturorPartNumber]
      ,Crossrefs.[DateDeactivated]
      ,Crossrefs.[DateUpdated]
      ,Crossrefs.[GrossPrice]
      ,Crossrefs.[DoNotDiscount]
      ,Crossrefs.[RTK_MSDSId]
      ,Crossrefs.[RTK_MSDSNotNeeded]
      ,Crossrefs.[ReplacementCrossRefId]
      ,Crossrefs.[AdditionalShipping]
      ,Crossrefs.[FullDescription]
      ,Crossrefs.[UOM]
      ,inew.SortSeq
 order by inew.SortSeq
```
