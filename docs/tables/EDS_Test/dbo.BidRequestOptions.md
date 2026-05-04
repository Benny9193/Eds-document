# Table: `dbo.BidRequestOptions`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 422035

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestOptionId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `ManufacturerId` | int | YES |  |  |
| 4 | `ManufacturerProductLineId` | int | YES |  |  |
| 5 | `OptionId` | int | YES |  |  |
| 6 | `BidRequestManufacturerId` | int | YES |  |  |
| 7 | `BidRequestProductLineId` | int | YES |  |  |
| 8 | `Name` | varchar(50) | NO |  |  |
| 9 | `Weight` | decimal(9,5) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_BRManufacturer_OptionProductName` | no | NONCLUSTERED | `BidRequestManufacturerId` | `OptionId`, `BidRequestProductLineId`, `Name` |
| `SKI_ManufacturerProduct_OptionNameId` | no | NONCLUSTERED | `BidRequestProductLineId`, `BidRequestManufacturerId` | `BidRequestOptionId`, `OptionId`, `Name` |
| `SKI_OptionProduct_ETC` | no | NONCLUSTERED | `BidRequestProductLineId`, `BidRequestOptionId` | `OptionId` |
