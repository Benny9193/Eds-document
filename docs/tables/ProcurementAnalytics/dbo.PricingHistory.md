# Table: `dbo.PricingHistory`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8480

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PriceID` | int | NO |  | YES |
| 2 | `VendorID` | int | NO |  |  |
| 3 | `ItemCode` | varchar(30) | NO |  |  |
| 4 | `ItemDescription` | nvarchar(300) | YES |  |  |
| 5 | `Category` | nvarchar(100) | YES |  |  |
| 6 | `UnitPrice` | decimal(12,4) | NO |  |  |
| 7 | `EffectiveDate` | date | NO |  |  |
| 8 | `ExpiryDate` | date | YES |  |  |
| 9 | `Currency` | varchar(3) | YES | `('USD')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__PricingHi__Vendo__66603565` | `VendorID` | [`dbo.Vendors.VendorID`](dbo.Vendors.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Price_Category` | no | NONCLUSTERED | `Category` |  |
| `IX_Price_Date` | no | NONCLUSTERED | `EffectiveDate` |  |
| `IX_Price_ItemCode` | no | NONCLUSTERED | `ItemCode` |  |
| `IX_Price_VendorID` | no | NONCLUSTERED | `VendorID` |  |
| `UQ_PriceHistory` | YES | NONCLUSTERED | `VendorID`, `ItemCode`, `EffectiveDate` |  |
