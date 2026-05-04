# Function: table-valued: `dbo.uf_LookupPricesAlt`

_Generated on 2026-05-04T13:43:19.037Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupPricesAlt` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-12-12 15:00:01 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pPassedDate` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.BidHeaders` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCategory` | USER_TABLE |  |
| `dbo.PricePlans` | USER_TABLE |  |
| `dbo.uf_LookupPriceByBH` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_getCurrentPrices` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE     function dbo.uf_LookupPricesAlt (@pItemId int, @pPassedDate varchar(255))
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
VendorItemCode	varchar(32) null,
Alternate       varchar(1024) null,
BidItemId	int null,
ParentCatalogId int null,
ItemCode	varchar(50) null,
Description	varchar(1024) null,
UnitId		int null,
UnitCode	varchar(16) null,
PriceId		int null,
Page		varchar(16) null,
DiscountRate	decimal(9,5) null,
Name		varchar(255) null,
VendorName	varchar(255) null,
CategoryId	int null,
PackedItemCode	varchar(50) null,
PackedVendorItemCode varchar(50) null,
BidHeaderId	int null
)
 
as
begin
declare @BidHeaderId int,
	@pEffectiveDate datetime

    select @pEffectiveDate = convert(datetime,@pPassedDate)

  declare PPCur cursor fast_forward read_only for
    select Distinct BidHeaders.BidHeaderId
      from dbo.BidHeaders
      join dbo.PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
      join dbo.PPCategory on PPCategory.PricePlanId = BidHeaders.PricePlanId
                         and PPCategory.CategoryId = BidHeaders.CategoryId
      join dbo.Items on Items.CategoryId = PPCategory.CategoryId
     where Items.ItemId = @pItemId
       and @pEffectiveDate between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
       and BidHeaders.Active = 1
--       and BidHeaders.BidAwardDate between dateadd(year,-1,@pEffectiveDate) and @pEffectiveDate

  open PPCur

  fetch next from PPCur into @BidHeaderId

  while @@fetch_status = 0
  begin
    -- Load Catalog and Bid Price for Item

    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode, BidHeaderId)
      select ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode, @BidHeaderId
        from dbo.uf_LookupPriceByBH(@pItemId, @BidHeaderId) li

    fetch next from PPCur into @BidHeaderId
  end

  close PPCur
  deallocate PPCur
 
  return
end
```
