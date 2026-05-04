# Table: `dbo.Carolina24`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 19177

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Status` | varchar(50) | YES |  |  |
| 2 | `Page_Number` | varchar(50) | YES |  |  |
| 3 | `Catalog_Item_Number` | varchar(150) | YES |  |  |
| 4 | `Short_Item_Description` | varchar(512) | YES |  |  |
| 5 | `Complete_Item_Description` | varchar(max) | YES |  |  |
| 6 | `UOM` | varchar(50) | YES |  |  |
| 7 | `Catalog_Price` | money | YES |  |  |
| 8 | `Net_Delivered_Price` | money | YES |  |  |
| 9 | `Eligible_for_Discount` | varchar(50) | YES |  |  |
| 10 | `Additional_Shipping` | varchar(50) | YES |  |  |
| 11 | `Unique_Item_Number` | varchar(150) | YES |  |  |
| 12 | `Manufacturer` | varchar(150) | YES |  |  |
| 13 | `Manufacturer_Part` | varchar(150) | YES |  |  |
| 14 | `Right_to_Know` | varchar(10) | YES |  |  |
| 15 | `Heading` | varchar(250) | YES |  |  |
| 16 | `Keyword` | varchar(max) | YES |  |  |
| 17 | `SDS_URL` | varchar(250) | YES |  |  |
| 18 | `Image_URL` | varchar(250) | YES |  |  |
| 19 | `UPC_ISBN` | varchar(50) | YES |  |  |
| 20 | `UNSPSC` | varchar(50) | YES |  |  |
| 21 | `RX` | varchar(10) | YES |  |  |
| 22 | `Perishable` | varchar(10) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
