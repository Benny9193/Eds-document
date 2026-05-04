# Procedure: `dbo.sp_BidCompareSummary`

_Generated on 2026-05-04T13:43:18.714Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BidCompareSummary` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-10-14 16:28:56 |
| Modified | 2022-10-14 16:48:05 |
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
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PricePlans` | USER_TABLE |  |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_SetSortSeq` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
/*
exec [sp_BidCompareSummary] 11384, 11721
*/
create   procedure [dbo].[sp_BidCompareSummary] @pBidOld int, @pBidNew int as
declare @PP varchar(10),
		@Category varchar(50)

select @PP = PricePlans.Code,
	   @Category = Category.Name
  from BidHeaders
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  join Category on Category.CategoryId = BidHeaders.CategoryId
 where BidHeaders.BidHeaderId = @pBidOld

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

select bn.ItemCode, bn.Description, isnull(bo.BidPrice,0) OldPrice, isnull(bn.BidPrice,0) NewPrice, isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0) Diff, isnull(bn.BidRequest,0) BidRequest, isnull(bn.BidRequest,0) * (isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0)) Extended, isnull(bn.VendorItemCode,'') [New VendorItemCode], isnull(bo.VendorItemCode,'') [Old VendorItemCode], isnull(bn.Alternate,'') [New Alternate], isnull(bo.Alternate,'') [Old Alternate], isnull(cast(bo.BidHeaderId as varchar),'') OldBid, bn.BidheaderId NewBid, isnull(bn.BidRequest,0) * isnull(bo.BidPrice,0) oldExtended, isnull(bn.BidRequest,0) * isnull(bn.BidPrice,0) newExtended, (isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0)) / isnull(bo.BidPrice,0) Discount
  into #BidDetail
  from #BidComp bn
  join #BidComp bo on bo.BidHeaderId = @pBidOld
                  and bo.ItemId = bn.ItemId
 where bn.BidHeaderId = @pBidNew
 order by dbo.uf_SetSortSeq(bn.ItemCode)

select @Category, @PP, @pBidOld, @pBidNew, avg(Discount), sum(OldExtended), sum(NewExtended), (sum(newExtended) - sum(oldExtended)) / sum(oldExtended)
  from #BidDetail

drop table #BidComp
```
