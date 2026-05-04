# Procedure: `dbo.sp_ProcessMiddletownCatalog`

_Generated on 2026-05-04T13:43:20.012Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ProcessMiddletownCatalog` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2016-03-07 15:57:44 |
| Modified | 2018-01-22 20:51:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |
| 2 | `@pBidHeaderId` | IN | int |  |
| 3 | `@pBidImportId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Master Catalog` | USER_TABLE | `Catalogs` |
| `dbo.MASTER CATALOG` | USER_TABLE | `Catalogs` |
| `Items` | unresolved | `eds` |
| `dbo.BidHeaders` | unresolved | `EDS` |
| `dbo.BidImports` | unresolved | `EDS` |
| `dbo.BidRequestItems` | unresolved | `EDS` |
| `dbo.BidResults` | unresolved | `EDS` |
| `dbo.Catalog` | unresolved | `EDS` |
| `dbo.Headings` | unresolved | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_ProcessMiddletownCatalog] @pCatalogId int, @pBidHeaderId int, @pBidImportId int output as

declare @CatalogId int,
        @CategoryId int,
        @BidHeaderId int,
        @BidImportId int,
        @VendorId int

select @CatalogId = CatalogId, @CategoryId = CategoryId, @VendorId = VendorId
  from EDS.dbo.Catalog
 where CatalogId = @pCatalogId

If @CatalogId is Null  
BEGIN
  RAISERROR('Invalid CatalogId, process cancelled.',16,1)
  return
END 
 
Select @BidHeaderId = BidHeaderId
  from EDS.dbo.BidHeaders
 where BidHeaderId = @pBidHeaderId and CategoryId = @CategoryId

If @BidHeaderId is Null 
BEGIN
  RAISERROR('Either the BidHeaderId is invalid OR the Bid is a different category than the Catalog, process cancelled.',16,1)
  return
END 
 
Select @BidImportId = BidImportId
  from EDS.dbo.BidImports
 where BidImportId = @pBidImportId and VendorId = @VendorId

If @BidImportId is Null 
BEGIN
  RAISERROR('Either the BidImportId is invalid OR the BidImport is from a different vendor than the Catalog, process cancelled.',16,1)
  return
END 
 

-- CODE TO INSERT MISSING HEADINGS
INSERT INTO EDS.dbo.Headings (Active,CategoryId,Title)
SELECT 1 Active, @CategoryId CategoryId, MC.Heading Title                     
FROM [Catalogs].[dbo].[MASTER CATALOG] MC 
LEFT OUTER JOIN EDS.dbo.Headings H ON H.Title = MC.Heading AND H.CategoryId = @CategoryId
WHERE H.HeadingId is null AND mc.catalogid = @CatalogId
Group by MC.Heading


-- CODE TO UPDATE THE HEADINGID IN THE ITEMS TABLE FOR ALL ITEMS IN SELECTED CATALOG
Update eds..Items
set HeadingId = H.HeadingId
from eds..Items items
join Catalogs..[Master Catalog] mc on mc.itemid = items.itemid and mc.catalogid = @CatalogId
JOIN EDS.dbo.Headings H ON H.Title = MC.Heading AND H.CategoryId = @CategoryId
where Items.HeadingId is null


-- Code to create BidRequestItems 
INSERT INTO [EDS].[dbo].[BidRequestItems] (BidHeaderId,ItemId,BidRequest,Active,RequisitionCount)
Select @BidHeaderId,items.ItemId,1,1,1  
from eds..Items items
join Catalogs..[Master Catalog] mc on mc.itemid = items.itemid and mc.catalogid = @CatalogId   
where items.ItemId NOT IN (Select ItemId From [EDS].[dbo].[BidRequestItems] Where BidHeaderId = @BidHeaderId) 
GROUP BY items.ItemId
ORDER BY items.ItemId


-- Code to create BidResults 
INSERT INTO [EDS].[dbo].[BidResults]
  ([BidImportId],[BidHeaderId],[BidRequestItemId],[CategoryId],[DistrictId],[ItemId],[ItemCode],[Units],
   [Quantity],[ItemBidType],[UnitPrice],[Cost],[VendorItemCode],[QuantityBid],[ItemsPerUnit],[UnitId],[Active])
Select @BidImportId BidImportId,
       bri.bidheaderid,      
       bri.BidRequestItemId, 
       @CategoryId CategoryId,
       214 DistrictId, -- Middletown = 214  
       mc.ItemId, 
       items.ItemCode, 
       mc.UnitCode Units, 
       1 Quantity, 
       'S' ItemBidType, 
       mc.GrossPrice UnitPrice,   -- net price
       mc.GrossPrice Cost,        -- net price
       mc.VendorItemCode, 
       1 QuantityBid, 
       '' ItemsPerUnit, 
       items.UnitId, 
       1
FROM [EDS].[dbo].[BidRequestItems] bri
join eds..Items items ON items.itemid = bri.itemid 
join Catalogs..[Master Catalog] mc on mc.itemid = items.itemid and mc.catalogid = @CatalogId
where bri.bidheaderid = @BidHeaderId
GROUP BY bri.bidheaderid, bri.BidRequestItemId, mc.ItemId, items.ItemCode, mc.UnitCode, mc.GrossPrice, mc.VendorItemCode, items.UnitId
```
