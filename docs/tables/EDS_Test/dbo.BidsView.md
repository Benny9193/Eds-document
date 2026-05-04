# View: `dbo.BidsView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `EffectiveFrom` | datetime | YES |  |  |
| 5 | `EffectiveUntil` | datetime | YES |  |  |
| 6 | `BidName` | varchar(255) | YES |  |  |
| 7 | `PricePlanId` | int | NO |  |  |
| 8 | `PricePlanCode` | varchar(20) | YES |  |  |
| 9 | `PricePlanDescription` | varchar(255) | YES |  |  |
| 10 | `CategoryId` | int | NO |  |  |
| 11 | `CategoryName` | varchar(50) | YES |  |  |
| 12 | `VendorId` | int | NO |  |  |
| 13 | `VendorCode` | varchar(16) | YES |  |  |
| 14 | `VendorName` | varchar(50) | YES |  |  |
| 15 | `BidDiscountRate` | decimal(8,5) | YES |  |  |
| 16 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 17 | `DistrictId` | int | NO |  |  |
| 18 | `DistrictCode` | varchar(4) | YES |  |  |
| 19 | `DistrictName` | varchar(50) | YES |  |  |
| 20 | `ItemsBid` | int | YES |  |  |
| 21 | `AmountBid` | money | YES |  |  |
| 22 | `CatalogId` | int | NO |  |  |
| 23 | `CatalogName` | varchar(50) | YES |  |  |
| 24 | `BidDescription` | varchar(511) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.PricePlans`](dbo.PricePlans.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidsView]  
as
select dbo.Bids.BidId, dbo.Bids.BidHeaderId, dbo.Bids.Active, dbo.Bids.EffectiveFrom, 
       dbo.Bids.EffectiveUntil, dbo.Bids.Name BidName, isnull(dbo.Bids.PricePlanId,0) PricePlanId, 
       dbo.PricePlans.Code PricePlanCode, dbo.PricePlans.Description PricePlanDescription,
       isnull(dbo.Bids.CategoryId,0) CategoryId, dbo.Category.Name CategoryName, isnull(dbo.Bids.VendorId,0) VendorId, 
       dbo.Vendors.Code VendorCode, dbo.Vendors.Name VendorName, dbo.Bids.BidDiscountRate, 
       dbo.Bids.VendorBidNumber, isnull(dbo.Bids.DistrictId,0) DistrictId, dbo.District.DistrictCode, 
       dbo.District.Name DistrictName, dbo.Bids.ItemsBid, dbo.Bids.AmountBid, 
       isnull(dbo.Bids.CatalogId,0) CatalogId, dbo.Catalog.Name CatalogName, dbo.Bids.Description BidDescription
  from dbo.Bids with (nolock)
  join dbo.PricePlans on dbo.PricePlans.PricePlanId = dbo.Bids.PricePlanId
  join dbo.Category on dbo.Category.CategoryId = dbo.Bids.CategoryId
  join dbo.Vendors on dbo.Vendors.VendorId = dbo.Bids.VendorId
  left outer join dbo.District on dbo.District.DistrictId = dbo.Bids.DistrictId
  left outer join dbo.Catalog on dbo.Catalog.CatalogId = dbo.Bids.CatalogId
 where Bids.Active = 1
```
