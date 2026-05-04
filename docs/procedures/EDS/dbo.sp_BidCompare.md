# Procedure: `dbo.sp_BidCompare`

_Generated on 2026-05-04T13:43:18.711Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BidCompare` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-09-02 15:06:28 |
| Modified | 2025-10-24 11:26:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidOld` | IN | int |  |
| 2 | `@pBidNew` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `vw_ItemDescription` | VIEW |  |
| `dbo.uf_SetSortSeq` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
/*
Z2 This vs Last Year Cascade vs SS Catalog less 20% this year

Order Book Z2

select * from PricePlans

select * 
  from BidHeaders 
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId 
 where PricePlanId = 9
 order by BidHeaders.BidHeaderId

sp_BidCompare 366, 921
sp_BidCompare 371, 961

Update BidImports
   set Active = 1
 where BidImportId in (4003, 4004)

select * from Vendors where VendorId = 21

*/
CREATE procedure [dbo].[sp_BidCompare] @pBidOld int, @pBidNew int as
declare @BidComp table (
Id			int identity(1,1) not null primary key,
BidHeaderId int null,
ItemId		int null,
ItemCode	varchar(64) null,
Description	varchar(1024) null,
BidPrice	money null,
CatalogPrice money null,
GrossPrice	money null,
DiscountRate money null,
VendorItemCode varchar(64) null,
Alternate	varchar(512) null,
BidItemId	int null,
CrossRefId	int null,
VendorId	int null,
BidRequest	int null,
ItemMustBeBid tinyint null)

insert @BidComp (BidHeaderId, ItemId, ItemCode, Description, BidRequest)
select BidHeaders.BidHeaderId,
       Items.ItemId,
       Items.ItemCode,
       id.ItemDescription Description,
	   BidRequestItems.BidRequest
  from BidHeaders
  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                      and BidRequestItems.Active = 1
  join Items on Items.ItemId = BidRequestItems.ItemId
  join vw_ItemDescription id on id.ItemId = Items.ItemId
 where BidHeaders.BidHeaderId = @pBidOld

insert @BidComp (BidHeaderId, ItemId, ItemCode, Description, BidRequest)
select BidHeaders.BidHeaderId,
       Items.ItemId,
       Items.ItemCode,
       id.ItemDescription Description,
	   BidRequestItems.BidRequest
  from BidHeaders
  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                      and BidRequestItems.Active = 1
  join Items on Items.ItemId = BidRequestItems.ItemId
  join vw_ItemDescription id on id.ItemId = Items.ItemId
 where BidHeaders.BidHeaderId = @pBidNew

Update @BidComp
   set BidPrice = null,
       CatalogPrice = null,
	   GrossPrice = null,
	   DiscountRate = null,
	   VendorItemCode = null,
	   Alternate = null,
	   BidItemId = null,
	   CrossRefId = null,
	   VendorId = null,
	   ItemMustBeBid = null

Update bc
   set BidPrice = BestBid.BidPrice,
         CatalogPrice = BestBid.CatalogPrice,
         GrossPrice = BestBid.GrossPrice,
         DiscountRate = BestBid.DiscountRate,
         VendorItemCode = BestBid.VendorItemCode,
         Alternate = BestBid.Alternate,
         BidItemId = BestBid.BidItemId,
         CrossRefId = BestBid.CrossRefId,
		 VendorId = BestBid.VendorId,
         ItemMustBeBid = 0
  from @BidComp bc
	outer apply (select top 1 round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2) BidPrice, 
						CrossRefs.CatalogPrice, 
						round(BidItems.Price,2) GrossPrice, 
						isnull(Bids.BidDiscountRate,0) DiscountRate,
						Bids.VendorId,
						BidItems.VendorItemCode,
						BidItems.Alternate,
						BidItems.BidItemId,
						BidItems.CrossRefId
				   from BidItems
				   join Bids on Bids.BidId = BidItems.BidId
				            and Bids.Active = 1
				   join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
				                  and BidHeaders.BidHeaderId = Bids.BidHeaderId
								  and BidHeaders.BidHeaderId = bc.BidHeaderId
				   join Awards on Awards.BidId = Bids.BidId
			       left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
				  where BidItems.ItemId = bc.ItemId
				  order by case when isnull(Bids.VendorId,0) in (0,7691) then 1 else 0 end, round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2)) BestBid
   where bc.ItemMustBeBid is null
     and BestBid.BidItemId is not null

Update bc
   set BidPrice = round(case isnull(Crossrefs.DoNotDiscount,0) when 0 then CrossRefs.GrossPrice - round(CrossRefs.GrossPrice * isnull(BidsCatalogList.DiscountRate,0) / 100,2) else Crossrefs.GrossPrice end,2),
         CatalogPrice = CrossRefs.CatalogPrice,
         GrossPrice = round(CrossRefs.GrossPrice,2),
         DiscountRate = case isnull(Crossrefs.DoNotDiscount,0) when 0 then isnull(BidsCatalogList.DiscountRate,0) else 0 end,
         VendorId = Bids.VendorId,
         VendorItemCode = CrossRefs.VendorItemCode,
         Alternate = null,
         BidItemId = null,
         CrossRefId = CrossRefs.CrossRefId,
         ItemMustBeBid = 0
  from @BidComp bc
    join CrossRefs on CrossRefs.ItemId = bc.ItemId
                  and CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
         join BidsCatalogList bcl on bcl.CatalogId = Cat.CatalogId
         join Bids b on b.BidId = bcl.BidId
                    and b.Active = 1
         join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
                           and bh.BidHeaderId = bc.BidHeaderId
        where xr.ItemId = bc.ItemId
          and xr.Active = 1
        order by case isnull(xr.DoNotDiscount,0) when 0 then xr.GrossPrice - round(xr.GrossPrice * isnull(bcl.DiscountRate,0) / 100,2) else xr.GrossPrice end, xr.CatalogYear desc, xr.CrossRefId
       )
    join BidsCatalogList on BidsCatalogList.BidCatalogId = 
      (select top 1 bcl.BidCatalogId
         from CrossRefs xr with (nolock)
         join Catalog cat on cat.CatalogId = xr.CatalogId
         join BidsCatalogList bcl on bcl.CatalogId = cat.CatalogId
         join Bids b on b.BidId = bcl.BidId
                    and b.Active = 1
         join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
                           and bh.BidHeaderId = bc.BidHeaderId
        where xr.ItemId = bc.ItemId
          and xr.Active = 1
        order by case isnull(xr.DoNotDiscount,0) when 0 then xr.GrossPrice - round(xr.GrossPrice * isnull(bcl.DiscountRate,0) / 100,2) else xr.GrossPrice end, xr.CatalogYear desc, xr.CrossRefId
       )
    join Bids on Bids.BidId = BidsCatalogList.BidId
    join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
    join Awards on Awards.BidId = Bids.BidId
   where bc.ItemMustBeBid is null

select ic.ItemCode, coalesce(bo.Description,bn.Description,'') Description, isnull(bo.BidPrice,0) OldPrice, isnull(bn.BidPrice,0) NewPrice, isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0) Diff, case when isnull(bo.BidPrice,0) = 0 or isnull(bn.BidPrice,0) = 0 then 0 else (isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0)) / isnull(bo.BidPrice,0) end [Percentage], isnull(bn.BidRequest,0) BidRequest, isnull(bn.BidRequest,0) * (isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0)) Extended, isnull(bn.VendorItemCode,'') [New VendorItemCode], isnull(bo.VendorItemCode,'') [Old VendorItemCode], isnull(bn.Alternate,'') [New Alternate], isnull(bo.Alternate,'') [Old Alternate], coalesce(cast(bo.BidHeaderId as varchar),'') OldBid, coalesce(cast(bn.BidheaderId as varchar),'') NewBid
  from (Select ItemCode
          from @BidComp bc
		 group by ItemCode) ic
  left outer join @BidComp bo on bo.BidHeaderId = @pBidOld
                             and bo.ItemCode = ic.ItemCode
  left outer join @BidComp bn on bn.BidHeaderId = @pBidNew
                             and bn.ItemCode = ic.ItemCode
 order by dbo.uf_SetSortSeq(ic.ItemCode)

/*
select bh1.BidHeaderId,
       i1.ItemId,
       i1.ItemCode,
       dbo.uf_ItemDescription(i1.ItemId) Description,
	   lo.BidPrice,
	   lo.CatalogPrice,
	   lo.GrossPrice,
	   lo.DiscountRate,
	   lo.VendorItemCode,
	   lo.Alternate,
	   lo.BidItemId,
	   BRI.BidRequest
  into #BidComp
  from BidHeaders bh1
  join BidRequestItems BRI on bri.BidHeaderId = bh1.BidHeaderId
                          and bri.active = 1
  join Items I1 on I1.ItemId = BRI.ItemId
  outer apply (select top 1 *
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
									 and BidHeaders.BidHeaderId = bh1.BidHeaderId
					  left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
					 where Items.ItemId = I1.ItemId
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
									   and BidHeaders.BidHeaderId = bh1.BidHeaderId
					   where Items.ItemId = I1.ItemId
						 and Items.Active = 1
						  )
						) CD
			  ) lo
 where bh1.BidHeaderId in (@pBidOld, @pBidNew)

select bn.ItemCode, bn.Description, isnull(bo.BidPrice,0) OldPrice, isnull(bn.BidPrice,0) NewPrice, isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0) Diff, isnull(bn.BidRequest,0) BidRequest, isnull(bn.BidRequest,0) * (isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0)) Extended, isnull(bn.VendorItemCode,'') [New VendorItemCode], isnull(bo.VendorItemCode,'') [Old VendorItemCode], isnull(bn.Alternate,'') [New Alternate], isnull(bo.Alternate,'') [Old Alternate], isnull(cast(bo.BidHeaderId as varchar),'') OldBid, bn.BidheaderId NewBid
  from #BidComp bn
  left outer join #BidComp bo on bo.BidHeaderId = @pBidOld
                             and bo.ItemId = bn.ItemId
 where bn.BidHeaderId = @pBidNew
 order by dbo.uf_SetSortSeq(bn.ItemCode)

drop table #BidComp
*/
```
