# Function: table-valued: `dbo.uf_LookupItemCodeByReqSaved`

_Generated on 2026-05-04T13:04:24.274Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItemCodeByReqSaved` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-02-05 22:09:28 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pItemCode` | IN | varchar(255) |  |
| 3 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `dbo.BookTypes` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Keywords` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
/*
declare @td datetime
select @td = getdate()
select * from dbo.uf_LookupItemCodeByBH('C54',1,1,0)
select * from dbo.uf_LookupItemCodeByBH('008985',4,287,0)
select * from BidHeaders where CategoryId = 1
select * from Items where PackedCode = ''
select PackedCode from crossRefs where CatalogId = 1 and Active = 1 group by PackedCode having count(*) > 1
select * from BidItems join Bids on Bids.BidId = BidItems.BidId and Bids.Active = 1 where ItemId = 444577
select * from CrossRefs where CrossRefId in (407694, 830966)
*/

create  function dbo.uf_LookupItemCodeByReqSaved (@pRequisitionId int, @pItemCode varchar(255), @pCatalogId int)
returns @ItemTable table (
ItemId		int null,
CrossRefId	int null,
CrossRefIdBid	int null,
BidPrice	money null,
GrossPrice	money null,
CatalogPrice	money null,
AwardId		int null,
VendorId	int null,
PricePlanId	int null,
CatalogId	int null,
VendorItemCode	varchar(50) null,
Alternate       varchar(1024) null,
BidItemId	int null,
ParentCatalogId int null,
ItemCode	varchar(50) null,
Description	varchar(1024) null,
UnitId		int null,
UnitCode	varchar(16) null,
PriceId		int null,
Page		varchar(16) null,
CatalogYear     char(02) null,
DiscountRate	decimal(9,5) null,
Name		varchar(255) null,
VendorName	varchar(255) null,
CategoryId	int null,
PackedItemCode	varchar(50) null,
PackedVendorItemCode varchar(50) null,
ItemCount	int null,
ItemMustBeBid	int null,
PriceType	int null,
ItemBidType		int null,
SortSeq		varchar(255) null
)
 
as
begin
declare @CrossRefId int,
	@CrossRefIdBid int,	
	@PricePlanId int,
	@DistrictId int,
	@CatalogId int,
	@ItemId int,
	@BidItemId int,
	@AwardId int,
	@CategoryId int,
	@ItemCount int,
	@BidHeaderId int,
	@ItemCode varchar(50),
	@DropSeq varchar(16)

  select @CategoryId = isnull(Requisitions.CategoryId,0),
         @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
         @DistrictId = isnull(Budgets.DistrictId,0)
    from Requisitions with (nolock) 
    left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where RequisitionId = @pRequisitionId

  Select @CatalogId = isnull(@pCatalogId,0)

  if @CatalogId != 0
  begin
    select @ItemCode = dbo.uf_PackCodeCatalog(@pItemCode, @CatalogId)

    insert @ItemTable ([ItemId] /*, [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode], ItemMustBeBid */)
    select CD.ItemId /*, CD.CrossRefId, null, CD.BidPrice, CD.GrossPrice, CD.CatalogPrice, CD.AwardId, CD.VendorId, CD.PricePlanId, CD.CatalogId, CD.VendorItemCode, CD.Alternate, CD.BidItemId, I1.ParentCatalogId, I1.ItemCode, dbo.uf_ItemDescription(CD.ItemId), Units.UnitId, Units.Code, CD.CatalogPage, CrossRefs.CatalogYear, CD.DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, CrossRefs.PackedCode, CD.ItemMustBeBid*/
--    insert @ItemTable ([ItemId], [CrossRefId], [CatalogPrice], [CatalogId], [VendorItemCode], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [Name], [CategoryId], [PackedItemCode], [PackedVendorItemCode])
--    select CD.ItemId, CD.CrossRefId, isnull(CD.CatalogPrice,0), CD.CatalogId, CD.VendorItemCode, I1.ItemCode, dbo.uf_ItemDescription(CD.ItemId), Units.UnitId, Units.Code, CD.CatalogPage, CrossRefs.CatalogYear, Catalog.Name, I1.CategoryId, I1.PackedCode, CrossRefs.PackedCode
      from (
        select /*1 IB, */Items.ItemId/*, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(BidItems.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CatalogId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CatalogPrice,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.Page,'') when '' then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid*/
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
                        and CrossRefs.PackedCode = @ItemCode
                        and CrossRefs.Active = 1
                        and CrossRefs.CatalogId = @pCatalogId
         where Items.Active = 1
        union (
          select /*1 IB, */Items.ItemId /*, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
                 case isnull(BidItems.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
                 Bids.VendorId VendorId, 
                 case isnull(CrossRefs.CatalogId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
                 case isnull(CrossRefs.CatalogPrice,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
                 BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
                 case isnull(CrossRefs.Page,'') when '' then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
                 BidHeaders.PricePlanId, Awards.AwardId, 
                 case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
                 BidItems.Alternate, 0 ItemMustBeBid*/
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join BidItems on BidItems.ItemId = Items.ItemId
                         and BidItems.PackedVendorItemCode = @ItemCode
            join Bids on Bids.BidId = BidItems.BidId
                     and Bids.Active = 1
            join Awards on Awards.BidId = Bids.BidId
                       and Awards.Active = 1
            join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
            join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId
                        and Catalog.Active = 1
                        and Catalog.CatalogId = @pCatalogId
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
            left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
           where Items.Active = 1
              )
        union (
          select /*0 IB, */Items.ItemId /*, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid*/
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.PackedCode = @ItemCode
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
-- DCH Added Line Below 1/10/2005
                        and Catalog.CatalogId = @pCatalogId
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.Active = 1
              )
        union (
          select /*-1 IB, */Items.ItemId /*, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid*/
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.PackedCode = @ItemCode
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
-- DCH Added Line Below 1/10/2005
                        and Catalog.CatalogId = @pCatalogId
            join DistrictCategories on DistrictCategories.DistrictId = @DistrictId
                                   and DistrictCategories.CategoryId = @CategoryId
                                   and DistrictCategories.CategoryId = Items.CategoryId
                                   and DistrictCategories.Active = 1
                                   and DistrictCategories.AllowAddenda = 1
           where Items.Active = 1
              )
           ) CD 
      join Items I1 on I1.ItemId = CD.ItemId
--      left outer join Units on Units.UnitId = I1.UnitId
--      left outer join CrossRefs on CrossRefs.CrossRefId = CD.CrossRefId
--      left outer join Vendors on Vendors.VendorId = CD.VendorId
--      left outer join Catalog on Catalog.CatalogId = CD.CatalogId
     group by CD.ItemId
--     group by CD.ItemId, CD.CrossRefId, CD.CatalogPrice, CD.CatalogId, CD.VendorItemCode, I1.ItemCode, dbo.uf_ItemDescription(CD.ItemId), Units.UnitId, Units.Code, CD.CatalogPage, CrossRefs.CatalogYear, Catalog.Name, I1.CategoryId, I1.PackedCode, CrossRefs.PackedCode
--     order by CD.IB desc, CD.BidPrice, CD.BidItemId, CD.CrossRefId
  end
  else
  begin
    select @ItemCode = dbo.uf_PackCode(@pItemCode)

    insert @ItemTable ([ItemId])
    select CD.ItemId 
      from (
        select /*1 IB, */Items.ItemId /*, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(BidItems.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CatalogId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CatalogPrice,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.Page,'') when '' then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid*/
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.PackedCode = @ItemCode
           and Items.Active = 1
        union (
          select /*0 IB, */Items.ItemId /*, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid*/
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.PackedCode = @ItemCode
             and Items.Active = 1
              )
        union (
          select /*-1 IB, */Items.ItemId /*, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid*/
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join DistrictCategories on DistrictCategories.DistrictId = @DistrictId
                                   and DistrictCategories.CategoryId = @CategoryId
                                   and DistrictCategories.CategoryId = Items.CategoryId
                                   and DistrictCategories.Active = 1
                                   and DistrictCategories.AllowAddenda = 1
           where Items.PackedCode = @ItemCode
             and Items.Active = 1
              )
           ) CD 
      join Items I1 on I1.ItemId = CD.ItemId
/*      left outer join Units on Units.UnitId = I1.UnitId
      left outer join CrossRefs on CrossRefs.CrossRefId = CD.CrossRefId
      left outer join Vendors on Vendors.VendorId = CD.VendorId
      left outer join Catalog on Catalog.CatalogId = CD.CatalogId*/
     group by CD.ItemId
--     order by CD.IB desc, CD.BidPrice, CD.BidItemId, CD.CrossRefId
  end

/*
  insert @ItemTable ([ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] )
    select I1.ItemId, CrossRefs.CrossRefId, null, null, CrossRefs.GrossPrice, CrossRefs.CatalogPrice, null, null, @PricePlanId, CrossRefs.CatalogId, CrossRefs.VendorItemCode, null, null, I1.ParentCatalogId, I1.ItemCode, dbo.uf_ItemDescription(I1.ItemId), Units.UnitId, Units.Code, CrossRefs.Page, CrossRefs.CatalogYear, null, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, CrossRefs.PackedCode
      from Items I1 with (nolock) 
      left outer join Units on Units.UnitId = I1.UnitId
      left outer join CrossRefs on CrossRefs.ItemId = I1.ItemId
                               and isnull(CrossRefs.CatalogId,0) = @CatalogId
                               and CrossRefs.PackedCode = @ItemCode
                               and CrossRefs.Active = 1
      left outer join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
      left outer join Vendors on Vendors.VendorId = Catalog.VendorId
     where I1.CategoryId = @CategoryId
       and I1.PackedCode = case @CatalogId when 0 then @ItemCode else I1.PackedCode end
       and I1.Active = 1
*/


Update @ItemTable
   set CatalogId = 
   (select top 1 CatalogId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       ItemCode = (select Items.ItemCode from Items with (nolock) where items.itemid = it.itemid),
       Description = (select case isnull(Category.AllowAddenda,0) 
             when 0 then ''
             else
               case isnull(Headings.HeadingId,0)
                 when 0 then ''
                 else 
                   ltrim(rtrim(isnull(Headings.Title,''))) +
                   case isnull(Keywords.KeywordId,0)
                     when 0 then ''
                     else
                       ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
                   end + char(13) + char(10)
                end 
           end +
           isnull(Items.Description,'') +   
           case Category.Type   
             when 2 then   
               case isnull(ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(Catalog.Name,'')  
               end +   
               case isnull(BookTypes.BookTypeId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Edition: ' + isnull(BookTypes.BookType,'')   
               end +   
               case isnull(Items.CopyrightYear,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Copyright Year: ' + isnull(convert(varchar(32),Items.CopyrightYear,101),'None')
               end    
             else   
               case isnull(Category.AllowAddenda,0)   
                 when 0 then ''                         
                 else   
                   case isnull(Items.BrandName,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Brand Name: ' + isnull(Items.BrandName,'')  
                   end +  
                   case isnull(Items.ManufacturorNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Manufacturer Number:' + isnull(Items.ManufacturorNumber,'')  
                   end +  
                   case isnull(Items.VendorId,0)  
                     when 0 then ''  
                     else char(13) + char(10) + 'Vendor: ' + isnull(Vendors.Name,'')  
                   end +  
                   case isnull(Items.VendorPartNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Vendor Part Number: ' + isnull(Items.VendorPartNumber,'')  
                   end +  
                   case isnull(Items.ItemsPerUnit,'')  
                     when '' then ''
                     when '0' then ''  
                     else char(13) + char(10) + 'Items Per Unit: ' + isnull(Items.ItemsPerUnit,'')  
                   end +  
                   case isnull(Items.ExtraDetail,'')  
                     when '' then ''  
                     else char(13) + char(10) +   
                       case isnull(Category.ExtraTitle,'')  
                         when '' then 'Extra Information: '  
                         else isnull(Category.ExtraTitle,'')  
                       end + ' ' + 
                       isnull(Items.ExtraDetail,'')  
                   end  
               end   
           end  
      from dbo.Items with (nolock) 
      join dbo.Category on Category.CategoryId = Items.CategoryId  
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
     where items.itemid = it.itemid
       and Items.Active = 1
),
       UnitId = (select Items.UnitId from Items with (nolock) where items.itemid = it.itemid),
       UnitCode = (select Units.Code from Items with (nolock) join Units on Units.UnitId = Items.UnitId where items.itemid = it.itemid),
       BidPrice =
   isnull((select top 1 BidPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),0)
  from @ItemTable it
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId

  Update @ItemTable
   set CrossRefId =
   (select top 1 CrossRefId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
                 case isnull(BidItems.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
                 Bids.VendorId VendorId, 
                 case isnull(CrossRefs.CatalogId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
                 case isnull(CrossRefs.CatalogPrice,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
                 BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
                 case isnull(CrossRefs.Page,'') when '' then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
                 BidHeaders.PricePlanId, Awards.AwardId, 
                 case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
                 BidItems.Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join BidItems on BidItems.ItemId = Items.ItemId
                         and BidItems.PackedVendorItemCode = @ItemCode
            join Bids on Bids.BidId = BidItems.BidId
                     and Bids.Active = 1
            join Awards on Awards.BidId = Bids.BidId
                       and Awards.Active = 1
            join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
            join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId
                        and Catalog.Active = 1
                        and Catalog.CatalogId = @pCatalogId
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
            left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Bids.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 CrossRefs.CatalogPrice CatalogPrice, 
                 CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 BidHeaders.PricePlanId, Awards.AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Catalog.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, 
                 round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 null PricePlanId, null AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from @ItemTable it 
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId


Update @ItemTable
   set CatalogPrice =
   (select top 1 CatalogPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Bids.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 CrossRefs.CatalogPrice CatalogPrice, 
                 CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 BidHeaders.PricePlanId, Awards.AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Catalog.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, 
                 round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 null PricePlanId, null AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   GrossPrice =
   isnull((select top 1 GrossPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),0),
       DiscountRate =
   (select top 1 DiscountRate
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       Page =
   (select top 1 CatalogPage
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from @ItemTable it 
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId

Update @ItemTable
   set /*PricePlanId =
   (select top 1 PricePlanId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       AwardId =
   (select top 1 AwardId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),*/
       VendorId =
   (select top 1 VendorId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       VendorItemCode =
   (select top 1 VendorItemCode
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       Alternate =
   (select top 1 Alternate
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
--       SortSeq = (select Items.SortSeq from Items with (nolock) where items.itemid = it.itemid),
       BidItemId =
   (select top 1 BidItemId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       ItemMustBeBid =
   (select top 1 ItemMustBeBid
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       PriceType =
   isnull((select top 1 IB
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),0),
 SortSeq = (select SortSeq from Items with (nolock) where Items.ItemId = it.ItemId)
  from @ItemTable it 
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId

Update @ItemTable
   set ItemBidType = case isnull(BidItems.ItemBidType,'') when 'A' then 0 when 'C' then 1 when '' then 2 else 3 end
  from @ItemTable it 
  left outer join BidItems on BidItems.BidItemId = it.BidItemId

/*
  if @CatalogId = 0
  begin
    -- Load Bid Price for Item
    insert @ItemTable ([ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] )
      SELECT [ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] 
        from (
          select (select top 1 p1.PriceId
                    FROM dbo.Prices p1 with (nolock) 
                   where p1.ItemId = Prices.ItemId
                     and p1.PricePlanId = Prices.PricePlanId
                   order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CatalogYear desc, CrossRefId
                  ) PriceId
            from dbo.Prices with (nolock) 
           where CategoryId = @CategoryId
             and PricePlanId = @PricePlanId
             and PackedItemCode = @ItemCode
           group by Prices.ItemId, Prices.PricePlanId
             ) ss
         join dbo.Prices on Prices.PriceId = ss.PriceId
        order by Prices.VendorItemCode, Prices.ItemCode, Prices.PriceId
  end
  else
  begin
    -- Load Bid Price for Item(s)
    insert @ItemTable ([ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] )
      SELECT [ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] 
        from (
          select (select top 1 p1.PriceId
                    FROM dbo.Prices p1 with (nolock) 
                   where p1.ItemId = Prices.ItemId
                     and p1.PricePlanId = Prices.PricePlanId
                   order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CatalogYear desc, CrossRefId
                  ) PriceId
            from dbo.Prices with (nolock) 
           where CategoryId = @CategoryId
             and PricePlanId = @PricePlanId
             and CatalogId = @CatalogId
             and PackedVendorItemCode = @ItemCode
           group by Prices.ItemId, Prices.PricePlanId
             ) ss
         join dbo.Prices on Prices.PriceId = ss.PriceId
        order by Prices.VendorItemCode, Prices.ItemCode, Prices.PriceId
  end

  select @ItemCount = count(*)
    from (select ItemId from @ItemTable with (nolock) ) it

  if @ItemCount = 0
  begin
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode, ItemMustBeBid)
      select distinct I1.ItemId, CrossRefs.CrossRefId, null, CrossRefs.GrossPrice, CrossRefs.GrossPrice, CrossRefs.CatalogPrice, null, I1.VendorId, null PricePlanId, CrossRefs.CatalogId, CrossRefs.VendorItemCode, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code, null, CrossRefs.Page, null DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, null, 'Item Not Bid', CrossRefs.PackedCode, 1
        from dbo.Items I1 with (nolock) 
        join dbo.Units on Units.UnitId = I1.UnitId
        join dbo.Category on Category.CategoryId = I1.CategoryId
                         and Category.Active = 1
--                       and Category.AllowAddenda = 1
        join dbo.CrossRefs on CrossRefs.ItemId = I1.ItemId
                          and CrossRefs.PackedCode = @ItemCode
                          and CrossRefs.Active = 1
        join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = case isnull(Category.Type,0) when 2 then Catalog.Name else 'EDS' end
--        join dbo.DistrictPP on DistrictPP.DistrictId = @DistrictId
        join dbo.PPCategory on PPCategory.CategoryId = Category.CategoryId
--                           and PPCategory.PricePlanId = DistrictPP.PricePlanId 
                           and PPCategory.PricePlanId = @PricePlanId 
                           and PPCategory.AllowAddenda = 1
        left outer join Vendors on Vendors.VendorId = I1.VendorId
       where I1.Active = 1
         and I1.CategoryId = @CategoryId

    select @ItemCount = count(*)
      from (select ItemId from @ItemTable) it
  end
*/
  -- Delete Items below Highest Pricing Level (Bid (1), Catalog (0), Not Bid(-1))
/*  delete @ItemTable
    from @ItemTable it
   where isnull(PriceType,-1) < (select top 1 PriceType from @ItemTable it1 where it1.ItemId = it.ItemId order by PriceType desc)
*/
  delete @ItemTable
    from @ItemTable it
   where convert(char(1),isnull(PriceType,-1) + 1) + convert(char(1),isnull(ItemBidType,3)) + right('0000000000000000' + convert(varchar(16),isnull(BidItemId,0)),16) < (select top 1 convert(char(1),isnull(PriceType,-1) + 1) + convert(char(1),isnull(ItemBidType,3)) + right('0000000000000000' + convert(varchar(16),isnull(BidItemId,0)),16) from @ItemTable it1 join CrossRefs on CrossRefs.CrossRefId = it1.CrossRefId where CrossRefs.ItemId = (select top 1 x1.ItemId from CrossRefs x1 with (nolock) where x1.CrossRefId = it.CrossRefId) order by convert(char(1),isnull(PriceType,-1) + 1) + convert(char(1),isnull(ItemBidType,3)) + right('0000000000000000' + convert(varchar(16),isnull(BidItemId,0)),16) desc)

  Update @ItemTable
     set ItemCount = (select count(*) from @ItemTable)

  return
end
```
