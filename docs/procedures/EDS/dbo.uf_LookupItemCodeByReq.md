# Function: table-valued: `dbo.uf_LookupItemCodeByReq`

_Generated on 2026-05-04T13:43:19.022Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItemCodeByReq` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-02-05 22:09:52 |
| Modified | 2022-02-17 11:47:07 |
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
| `BidsCatalogList` | USER_TABLE |  |
| `BookTypes` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_easyadd` | SQL_STORED_PROCEDURE |
| `dbo.sp_ISBNAdd` | SQL_STORED_PROCEDURE |

## Definition

```sql
/*
select * from CrossRefs where catalogId = 2139 and PackedCode between '054000' and '055000' order by PackedCode
declare @td datetime
select @td = getdate()
select * from dbo.uf_LookupItemCodeByBH('C54',1,1,0)
select * from dbo.uf_LookupItemCodeByBH('008985',4,287,0)
select * from BidHeaders where CategoryId = 1
select * from Items where PackedCode = ''
select PackedCode from crossRefs where CatalogId = 1 and Active = 1 group by PackedCode having count(*) > 1
select * from BidItems join Bids on Bids.BidId = BidItems.BidId and Bids.Active = 1 where ItemId = 444577
select * from CrossRefs where CrossRefId in (407694, 830966)
set transaction isolation level read uncommitted
print convert(varchar,getdate(),109)
select * from [uf_LookupItemCodeByReqVendor](1366189, '9-054282-030', 9)
print convert(varchar,getdate(),109)
select * from [uf_LookupItemCodeByReqT1](1366189, '9-054282-030', 2139)
print convert(varchar,getdate(),109)
*/

CREATE function [dbo].[uf_LookupItemCodeByReq] (@pRequisitionId int, @pItemCode varchar(255), @pCatalogId int)
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
SortSeq		varchar(255) null,
StandardItem char(1) null,
LastYearsQuantity int null,
ShippingCost money null
)
 
as
begin
declare @CrossRefId int,
	@CrossRefIdBid int,	
	@PricePlanId int,
	@DistrictId int,
	@CatalogId int,
--	@VendorId int,
	@ItemId int,
	@BidItemId int,
	@AwardId int,
	@CategoryId int,
	@ItemCount int,
	@BidHeaderId int,
	@BudgetId int,
	@ItemCode varchar(50),
	@DropSeq varchar(16)

declare @catlist table (CatalogId int, PackedCode varchar(50))

  select @CategoryId = isnull(Requisitions.CategoryId,0),
         @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
         @DistrictId = isnull(Budgets.DistrictId,0),
         @BudgetId = isnull(Budgets.BudgetId,0)
    from Requisitions with (nolock) 
    left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where RequisitionId = @pRequisitionId

  Select @CatalogId = isnull(@pCatalogId,0)

  if @CatalogId != 0
  begin
    insert @CatList (CatalogId, PackedCode)
    select CatalogId, PackedCode
      from (
		select Catalog.CatalogId, dbo.uf_PackCodeCatalog(@pItemCode, Catalog.CatalogId) PackedCode 
		  from BidHeaders with (nolock)
		  join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
				   and Bids.Active = 1
		  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
		  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
					  and Catalog.Active = 1
					  and Catalog.CatalogId = @CatalogId
		where BidHeaders.BidHeaderId = @BidHeaderId
		union (
		  select Catalog.CatalogId, dbo.uf_PackCodeCatalog(@pItemCode, Catalog.CatalogId) PackedCode 
			from DistrictCategories with (nolock)
			join Catalog on Catalog.CategoryId = DistrictCategories.CategoryId
						and Catalog.Active = 1
						and catalog.CatalogId = @CatalogId
		   where DistrictCategories.DistrictId = @DistrictId
			 and DistrictCategories.CategoryId = @categoryId
			 and DistrictCategories.Active = 1
			 and DistrictCategories.AllowAddenda = 1
		)
	) ss
	group by CatalogId, PackedCode
    	
    insert @ItemTable ([ItemId])
        select CD.ItemId 
         from (
        select Items.ItemId
          from BidHeaders with (nolock)
          join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                   and Bids.Active = 1
--                   and Bids.vendorId = @VendorID
          join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
          join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                      and Catalog.Active = 1
--                      and Catalog.VendorId = @VendorId
          join Category on Category.CategoryId = BidHeaders.CategoryId
                       and Category.Active = 1
          join BidItems on BidItems.BidId = Bids.BidId
          join Items on Items.ItemId = BidItems.ItemId
                    and Items.Active = 1
                    and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
          join @CatList cl on Cl.CatalogId = Catalog.CatalogId
          join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
                          and CrossRefs.Active = 1
                          and CrossRefs.CatalogId = cl.CatalogId
                          and CrossRefs.PackedCode = cl.PackedCode
        where BidHeaders.BidHeaderId = @BidHeaderId
        union (
          select Items.ItemId 
            from BidHeaders with (nolock)
            join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                     and Bids.Active = 1
--                     and Bids.vendorId = @VendorID
            join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
            join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.VendorId = @VendorId
            join Category on Category.CategoryId = BidHeaders.CategoryId
                         and Category.Active = 1
            join @CatList cl on Cl.CatalogId = Catalog.CatalogId
            join BidItems on BidItems.BidId = Bids.BidId
                         and BidItems.PackedVendorItemCode = cl.PackedCode
            join Items on Items.ItemId = BidItems.ItemId
                      and Items.Active = 1
                      and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
            left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
           where BidHeaders.BidHeaderId = @BidHeaderId
              )
        union (
          select Items.ItemId 
            from BidHeaders with (nolock)
            join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                     and Bids.Active = 1
--                     and Bids.vendorId = @VendorID
            join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
            join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.VendorId = @VendorId
            join Category on Category.CategoryId = BidHeaders.CategoryId
                         and Category.Active = 1
            join @CatList cl on Cl.CatalogId = Catalog.CatalogId
            join CrossRefs on CrossRefs.CatalogId = cl.CatalogId
                          and CrossRefs.PackedCode = cl.PackedCode
                          and CrossRefs.Active = 1
            join Items on Items.ItemId = CrossRefs.ItemId
                      and Items.Active = 1
                      and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
           where BidHeaders.BidHeaderId = @BidHeaderId
              )
        union (
          select Items.ItemId 
		    from DistrictCategories with (nolock)
  			join Catalog on Catalog.CategoryId = DistrictCategories.CategoryId
  						and Catalog.Active = 1
            join @CatList cl on Cl.CatalogId = Catalog.CatalogId
            join CrossRefs on CrossRefs.CatalogId = cl.CatalogId
                          and CrossRefs.PackedCode = cl.PackedCode
                          and CrossRefs.Active = 1
            join Items on Items.ItemId = CrossRefs.ItemId
                      and Items.Active = 1
                      and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
  		   where DistrictCategories.DistrictId = @DistrictId
  			 and DistrictCategories.CategoryId = @categoryId
  			 and DistrictCategories.Active = 1
  			 and DistrictCategories.AllowAddenda = 1
              )
           ) CD 
      join Items I1 on I1.ItemId = CD.ItemId
     group by CD.ItemId
  end
  else
  begin
    select @ItemCode = dbo.uf_PackCode(@pItemCode)

    insert @ItemTable ([ItemId])
    select CD.ItemId 
      from (
        select Items.ItemId 
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
                         and BidHeaders.Active = 1
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.PackedCode = @ItemCode
           and Items.Active = 1
           and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
        union (
          select Items.ItemId 
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
            join Bids on Bids.BidId = BidsCatalogList.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
                           and BidHeaders.Active = 1
           where Items.PackedCode = @ItemCode
             and Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
              )
        union (
          select Items.ItemId 
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
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
              )
           ) CD 
      join Items I1 on I1.ItemId = CD.ItemId
     group by CD.ItemId
  end

Update @ItemTable
   set CatalogId = CrossRefs.CatalogId,
       ItemCode = Items.ItemCode,
       Description = 
           case 
             when len(
               case isnull(Category.AllowAddenda,0) 
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
			   case isnull(Category.Type,1)
				 when 2 then   
				   case isnull(Items.ParentCatalogId,0)   
					 when 0 then ''   
					 else char(13) + char(10) + 'Publisher: ' + isnull(pc.Name,'')  
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
					   end 
				   end   
			   end +
           case 
             when isnull(BidItems.BidItemId,0) != 0 then ''
             when isnull(cxr.CrossRefId,0) != 0 then
               case isnull(cxr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             when isnull(axr.CrossRefId,0) != 0 then
               case isnull(axr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             else ''
           end) >= 1024 then
           substring(case isnull(Category.AllowAddenda,0) 
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
           case isnull(Category.Type,1)
             when 2 then   
               case isnull(Items.ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(pc.Name,'')  
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
                   end 
               end   
           end +
           case 
             when isnull(BidItems.BidItemId,0) != 0 then ''
             when isnull(cxr.CrossRefId,0) != 0 then
               case isnull(cxr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             when isnull(axr.CrossRefId,0) != 0 then
               case isnull(axr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             else ''
           end,1,1021) + '...'
           else
           case isnull(Category.AllowAddenda,0) 
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
           case isnull(Category.Type,1)
             when 2 then   
               case isnull(Items.ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(pc.Name,'')  
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
                   end   
               end   
           end +
           case 
             when isnull(BidItems.BidItemId,0) != 0 then ''
             when isnull(cxr.CrossRefId,0) != 0 then
               case isnull(cxr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             when isnull(axr.CrossRefId,0) != 0 then
               case isnull(axr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             else ''
           end           
           end,
       UnitId = Items.UnitId,
       UnitCode = Units.Code,
       BidPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) 
                    when isnull(cxr.CrossRefId,0) != 0 then round(case isnull(cxr.DoNotDiscount,0) when 0 then isnull(cxr.GrossPrice,0) - round(cxr.GrossPrice * cacl.DiscountRate / 100,2) else cxr.GrossPrice end,2)
                    when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
       CatalogPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then case isnull(bpxr.CatalogPrice,0) when 0 then round(cast(BidItems.Price - ROUND(BidItems.Price * (Bids.BidDiscountRate / 100),2) as money) / .60,2) else bpxr.CatalogPrice end
                    when isnull(cxr.CrossRefId,0) != 0 then cpxr.CatalogPrice
                    when isnull(axr.CrossRefId,0) != 0 then axr.CatalogPrice
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
       GrossPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(BidItems.Price,0)
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.GrossPrice
                    when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
       DiscountRate = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.BidDiscountRate,0)
                    when isnull(cxr.CrossRefId,0) != 0 then case isnull(cxr.DoNotDiscount,0) when 0 then cacl.DiscountRate else 0 end 
                    when isnull(axr.CrossRefId,0) != 0 then 0
                    else 0
                  end,
       Page = case
                    when isnull(BidItems.BidItemId,0) != 0 then 
                      case isnull(BidItems.PageNo,0) 
                        when 0 then bxr.Page 
                        else 
                          case 
                            when len(cast(BidItems.PageNo as varchar(10))) > 4 then substring(cast(BidItems.PageNo as varchar(10)),1,4) 
                            else cast(BidItems.PageNo as varchar(10)) 
                          end
                      end
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.Page
                    when isnull(axr.CrossRefId,0) != 0 then axr.Page
                    else null
                  end,
       PricePlanId = BidHeaders.PricePlanId,
       AwardId = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(ba.AwardId,0)
                    when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.AwardId,0)
                    when isnull(axr.CrossRefId,0) != 0 then 0
                    else 0
                  end,
       VendorId = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.VendorId,7691)
                    when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.VendorId,7691)
                    when isnull(axr.CrossRefId,0) != 0 then case isnull(ac.VendorId,7691) when 7853 then isnull(Items.VendorId,7691) else isnull(ac.VendorId,7691) end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then null
                        else 7691
                      end
                  end,
       VendorItemCode = case
                    when isnull(BidItems.BidItemId,0) != 0 then case isnull(BidItems.VendorItemCode,'') when '' then bxr.VendorItemCode else BidItems.VendorItemCode end
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.VendorItemCode
                    when isnull(axr.CrossRefId,0) != 0 then axr.VendorItemCode
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then isnull(Items.VendorPartNumber,'')
                        else null
                      end
                  end,
       Alternate = case
                    when isnull(BidItems.BidItemId,0) != 0 then BidItems.Alternate
                    when isnull(cxr.CrossRefId,0) != 0 then null
                    when isnull(axr.CrossRefId,0) != 0 then null
                    else null
                  end,
       SortSeq = Items.SortSeq,
       BidItemId = BidItems.BidItemId,
       ItemMustBeBid = case
                    when isnull(BidItems.BidItemId,0) != 0 then 0
                    when isnull(cxr.CrossRefId,0) != 0 then 0
                    when isnull(axr.CrossRefId,0) != 0 then 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then 1
                        else 0
                      end
                    else
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then 1
                        else 0
                      end
                  end,
       CrossRefId = case
                      when isnull(BidItems.BidItemId,0) != 0 then bxr.CrossRefId
                      when isnull(cxr.CrossRefId,0) != 0 then cxr.CrossRefId
                      when isnull(axr.CrossRefId,0) != 0 then axr.CrossRefId
                      else null
					end,
       PriceType = case
                     when isnull(BidItems.BidItemid,0) != 0 then -1
                     when isnull(cxr.CrossRefId,0) != 0 then 0
                     when isnull(axr.CrossRefId,0) != 0 then 1
                     else 1
                   end,
       ItemBidType = case isnull(substring(BidItems.ItemBidType,1,1),'') 
                       when 'A' then 0 
                       when 'C' then 1 
                       when '' then 2 
                       else 3 
                     end,
       StandardItem = isnull(cast(Items.StandardItem as char(1)),'0')
  from @ItemTable it 
  join Items on Items.ItemId = it.ItemId
  join Requisitions on Requisitions.RequisitionId = @pRequisitionId
  join Category on Category.categoryId = Requisitions.CategoryId
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                         and DistrictCategories.CategoryId = Requisitions.CategoryId
                         and DistrictCategories.Active = 1
  left outer join BidItems on BidItems.BidItemId = 
    (select top 1 bi.BidItemId 
       from BidItems bi with (nolock)
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = Items.ItemId)
  left outer join Bids on Bids.BidId = 
    (select top 1 b.BidId 
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = Items.ItemId)
  left outer join CrossRefs bxr on bxr.CrossRefId = 
    (select top 1 bi.CrossRefId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = Items.ItemId)
  left outer join CrossRefs bpxr on bpxr.CrossRefId = 
    (select top 1 bi.CrossRefId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
       join BidsCatalogList bcl on bcl.BidId = b.BidId
       join Catalog cat on cat.CatalogId = bcl.CatalogId
                       and cat.Active = 1
       join CrossRefs xr on xr.CatalogId = Cat.CatalogId
                        and xr.Active = 1
                        and xr.PackedCode = bi.PackedVendorItemCode
      where bi.ItemId = Items.ItemId
      order by xr.CatalogPrice desc, xr.CrossRefId)
  left outer join Awards ba on ba.AwardId = 
    (select top 1 a.AwardId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
       join Awards a on a.BidId = b.BidId
                    and a.Active =  1
      where bi.ItemId = Items.ItemId)
  left outer join CrossRefs cxr on cxr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join CrossRefs cpxr on cpxr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by xr.CatalogPrice desc, xr.CrossRefId)
  left outer join Catalog cc on Cc.CatalogId = 
    (select top 1 cat.CatalogId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join Awards ca on ca.AwardId = 
    (select top 1 a.AwardId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join AwardsCatalogList cacl on cacl.AwardCatalogId = 
    (select top 1 acl.AwardCatalogId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId

       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join CrossRefs axr on axr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
                       and cat.Active = 1
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
        and DistrictCategories.AllowAddenda = 1
      order by isnull(xr.GrossPrice,0), xr.CrossRefId)
  left outer join Catalog ac on ac.CatalogId = axr.CatalogId
  left outer join CrossRefs on CrossRefs.CrossRefId = case 
                                                        when isnull(bxr.CrossRefId,0) != 0 then bxr.CrossRefId
                                                        when isnull(cxr.CrossRefId,0) != 0 then cxr.CrossRefId
                                                        when isnull(axr.CrossRefId,0) != 0 then axr.CrossRefId
                                                        else null
                                                      end
  left outer join Units on Units.UnitId = Items.UnitId
  left outer join Catalog pc on pc.CatalogId = Items.ParentCatalogId  
  left outer join Headings on Headings.HeadingId = Items.HeadingId  
  left outer join BookTypes on BookTypes.BookTypeId = Items.EditionId  
  left outer join Keywords on Keywords.KeyWordId = Items.KeywordId  
  left outer join Vendors on Vendors.VendorId = Items.VendorId  

/*Update @ItemTable
   set ItemBidType = case isnull(substring(BidItems.ItemBidType,1,1),'') when 'A' then 0 when 'C' then 1 when '' then 2 else 3 end
  from @ItemTable it 
  left outer join BidItems on BidItems.BidItemId = it.BidItemId
*/

  delete @ItemTable
    from @ItemTable it
   where convert(char(1),isnull(PriceType,-1) + 1) + 
         convert(char(1),isnull(ItemBidType,3)) + 
         cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq > 
         (select top 1 cast(isnull(PriceType,-1) + 1 as char(1)) + 
                       cast(isnull(ItemBidType,3) as char(1)) + 
                       cast(case isnull(BidItemId,0) 
                              when 0 then 0 
                              else 1 
                            end as char(1)) +
                       StandardItem +
                       SortSeq
            from @ItemTable it1 
            join CrossRefs on CrossRefs.CrossRefId = it1.CrossRefId 
           where CrossRefs.ItemId = (select top 1 x1.ItemId 
                                       from CrossRefs x1 with (nolock) 
                                      where x1.CrossRefId = it.CrossRefId) 
           order by cast(isnull(PriceType,-1) + 1 as char(1)) + 
                    cast(isnull(ItemBidType,3) as char(1)) + 
                    cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq)


  Update it
     set ItemCount = (select count(*) from @ItemTable),
         LastYearsQuantity = Detail.LastYearsQuantity,
         VendorName = Vendors.Name,
		 ShippingCost = coalesce(Detail.ShippingCost,0)
    from @ItemTable it
    left outer join Vendors on Vendors.VendorId = it.VendorId
    left outer join Detail on Detail.RequisitionId = @pRequisitionId
                          and Detail.ItemId = it.ItemId

  return
end
```
