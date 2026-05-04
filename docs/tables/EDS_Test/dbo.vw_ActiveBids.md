# View: `dbo.vw_ActiveBids`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidId` | int | NO |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `VendorCode` | varchar(16) | YES |  |  |
| 6 | `CategoryId` | int | NO |  |  |
| 7 | `CategoryName` | varchar(50) | YES |  |  |
| 8 | `CategoryType` | int | YES |  |  |
| 9 | `PricePlanId` | int | NO |  |  |
| 10 | `PricePlan` | varchar(20) | YES |  |  |
| 11 | `BidType` | tinyint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
Create   view vw_ActiveBids as
select BidHeaders.BidHeaderId, Bids.BidId, 
       Vendors.VendorId, Vendors.Name VendorName, Vendors.Code VendorCode, 
	   Category.CategoryId, Category.Name CategoryName, Category.Type CategoryType, 
	   PricePlans.PricePlanId, PricePlans.Code PricePlan, BidHeaders.BidType
  from BidHeaders
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
		   and Bids.VendorId != 7691
  join Vendors on Vendors.VendorId = Bids.VendorId
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
 where getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
   and BidHeaders.Active = 1
```
