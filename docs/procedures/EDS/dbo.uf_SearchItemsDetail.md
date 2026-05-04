# Function: inline table-valued: `dbo.uf_SearchItemsDetail`

_Generated on 2026-05-04T14:49:07.426Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SearchItemsDetail` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2004-12-02 23:03:24 |
| Modified | 2012-01-06 11:38:27 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pHeadingId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from dbo.uf_SearchItemsDetail(951894,78535) order by Items_SortSeq


--select * from dbo.uf_SearchItemsDetail(165939) order by Items_SortSeq
--select * from dbo.uf_SearchItemsDetail(165945) order by Items_SortSeq

CREATE    function [dbo].[uf_SearchItemsDetail] (@pRequisitionId int, @pHeadingId int) 
returns table
as
return (
SELECT BidItems.BidItemId AS BidItems_BidItemId, 
       round(isnull(BidItems.Price,0) - (isnull(BidItems.Price,0) * (isnull(Bids.BidDiscountRate,0) / 100)),2) Price, 
       BidItems.Alternate AS BidItems_Alternate, 
       BidItems.VendorItemCode AS BidItems_VendorItemCode,
       ItemBidType, 
/*
       case isnull(BidItems.PageNo,0) 
         when 0 then 
           case isnull(BidItems.CrossRefId,0) 
             when 0 then 
               (select top 1 CrossRefs.Page 
                  from CrossRefs with (nolock)
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                  join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId 
                                      and BidsCatalogList.BidId = Bids.BidId 
                 where CrossRefs.ItemId = BidItems.ItemId 
                 order by Catalog.CatalogYear desc, Catalog.CatalogId desc) 
             else 
               (select top 1 CrossRefs.Page 
                  from CrossRefs with (nolock)
                 where Crossrefs.CrossRefId = BidItems.CrossRefId) 
           end 
         else BidItems.PageNo 
       end PageNo, 
*/
       case isnumeric(isnull((select top 1 CrossRefs.Page 
  			          from CrossRefs with (nolock)
			          join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
			          join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId 
			  					          and BidsCatalogList.BidId = Bids.BidId 
			         where CrossRefs.PackedCode = BidItems.PackedVendorItemCode
			           and CrossRefs.Active = 1 
			         order by Catalog.CatalogYear desc, Catalog.CatalogId desc),''))
	     when 0 then 
	       isnull(BidItems.PageNo,'')
	     else
           isnull((select top 1 CrossRefs.Page 
  			         from CrossRefs with (nolock)
			         join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
			         join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId 
			  				             and BidsCatalogList.BidId = Bids.BidId 
			        where CrossRefs.PackedCode = BidItems.PackedVendorItemCode
			          and CrossRefs.Active = 1 
			        order by Catalog.CatalogYear desc, Catalog.CatalogId desc),'')
	   end PageNo,
       Items.ItemCode AS Items_ItemCode, 
       Items.Description AS Items_Description, 
       Items.HeadingId AS Items_HeadingId,
       Items.SortSeq AS Items_SortSeq, 
       BidDiscountRate, 
       Vendors.Name AS Vendors_Name, 
       Units.Code AS Units_Code, 
       DetailId, 
       Quantity, 
       Items.ItemId, 
       detail.RequisitionId ,
       case isnull((select top 1 Catalog.Name
  			          from CrossRefs with (nolock)
			          join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
			          join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId 
			  					          and BidsCatalogList.BidId = Bids.BidId 
			         where CrossRefs.PackedCode = BidItems.PackedVendorItemCode
			           and CrossRefs.Active = 1 
			         order by Catalog.CatalogYear desc, Catalog.CatalogId desc),'')
	     when '' then 
	       'Not in Electronic Catalog'
	     else
           isnull((select top 1 Catalog.Name 
  			         from CrossRefs with (nolock)
			         join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
			         join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId 
			  				             and BidsCatalogList.BidId = Bids.BidId 
			        where CrossRefs.PackedCode = BidItems.PackedVendorItemCode
			          and CrossRefs.Active = 1 
			        order by Catalog.CatalogYear desc, Catalog.CatalogId desc),'')
	   end CatalogName
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
               and isnull(BidItems.Price,0) != 0
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.Active = 1
               and Headings.HeadingId = @pHeadingId
  join Vendors on Vendors.VendorId = Bids.VendorId
  join Units on Units.UnitId = Items.UnitId
  left outer join Detail on Detail.ItemId = Items.ItemId
                        and Detail.RequisitionId = Requisitions.RequisitionId
 where Requisitions.RequisitionId = @pRequisitionId
   and case isnull(Items.DistrictId,0) 
         when 0 then Budgets.DistrictId 
         else Items.DistrictId 
       end = Budgets.DistrictId
union (
  SELECT null AS BidItems_BidItemId, 
         round(isnull(Items.ListPrice,0),2) Price, 
         null AS BidItems_Alternate, 
         null AS BidItems_VendorItemCode,
         '' as ItemBidType, 
         0 PageNo, 
         Items.ItemCode AS Items_ItemCode, 
         Items.Description AS Items_Description, 
         Items.HeadingId AS Items_HeadingId,
         Items.SortSeq AS Items_SortSeq, 
         0 BidDiscountRate, 
         'Not Yet Bid' AS Vendors_Name, 
         Units.Code AS Units_Code, 
         DetailId, 
         Quantity, 
         Items.ItemId, 
         detail.RequisitionId,
         '' as CatalogName
    from Requisitions with (nolock)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join Headings on Headings.CategoryId = Requisitions.CategoryId
                 and Headings.Active = 1
                 and Headings.HeadingId = @pHeadingId
    join Items on Items.HeadingId = Headings.HeadingId
              and Items.Active = 1
    join Units on Units.UnitId = Items.UnitId
    left outer join Detail on Detail.ItemId = Items.ItemId
                          and Detail.RequisitionId = Requisitions.RequisitionId
   where Requisitions.RequisitionId = @pRequisitionId
     and isnull(Requisitions.BidHeaderId,0) = 0
     and case isnull(Items.DistrictId,0) 
           when 0 then Budgets.DistrictId 
           else Items.DistrictId 
         end = Budgets.DistrictId
)
union (
  SELECT null AS BidItems_BidItemId, 
         round(isnull(CrossRefs.GrossPrice,0) - (isnull(CrossRefs.GrossPrice,0) * (isnull(BidsCatalogList.DiscountRate,0) / 100)),2) Price, 
         null AS BidItems_Alternate, 
         CrossRefs.VendorItemCode AS BidItems_VendorItemCode,
         'A' ItemBidType, 
         CrossRefs.Page PageNo, 
         Items.ItemCode AS Items_ItemCode, 
         Items.Description AS Items_Description, 
         Items.HeadingId AS Items_HeadingId,
         Items.SortSeq AS Items_SortSeq, 
         BidDiscountRate, 
         Vendors.Name AS Vendors_Name, 
         Units.Code AS Units_Code, 
         DetailId, 
         Quantity, 
         Items.ItemId, 
         detail.RequisitionId,
         Catalog.Name CatalogName
  from Requisitions with (nolock)
  join Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           and Bids.Active = 1
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join CrossRefs on CrossRefs.CatalogId = BidsCatalogList.CatalogId
                and Crossrefs.Active = 1
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
               and Catalog.Active = 1
  join Items on Items.ItemId = CrossRefs.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.Active = 1
               and Headings.HeadingId = @pHeadingId
  join Vendors on Vendors.VendorId = Bids.VendorId
  join Units on Units.UnitId = Items.UnitId
  left outer join Detail on Detail.ItemId = Items.ItemId
                        and Detail.RequisitionId = Requisitions.RequisitionId
 where Requisitions.RequisitionId = @pRequisitionId
   and Requisitions.CategoryId = 82 -- Math Manipulatives
)
)
```
