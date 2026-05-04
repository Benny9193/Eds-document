# Table: `dbo.NY Office Preliminary Bid 13449 ODP exact`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 994

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `REF` | smallint | YES |  |  |
| 2 | `Staples_Product_Code` | varchar(50) | YES |  |  |
| 3 | `Item_code` | nvarchar(50) | YES |  |  |
| 4 | `Staples_Product_Description` | nvarchar(512) | YES |  |  |
| 5 | `Competitor_UOM` | nvarchar(50) | YES |  |  |
| 6 | `Competitor_QPU` | int | YES |  |  |
| 7 | `Competitor_Usage` | smallint | YES |  |  |
| 8 | `Heading` | nvarchar(50) | YES |  |  |
| 9 | `Staples_Inc_dba_Staples_Contract_Commercial_LLC_Manufacturer` | nvarchar(50) | YES |  |  |
| 10 | `Staples_Inc_dba_Staples_Contract_Commercial_LLC_Manufacturer_Part_Number` | nvarchar(50) | YES |  |  |
| 11 | `ODP_SKU` | int | YES |  |  |
| 12 | `ODP_Sku_Description` | nvarchar(50) | YES |  |  |
| 13 | `ODP_SKU_UOM` | nvarchar(50) | YES |  |  |
| 14 | `ODP_SKU_QPU` | int | YES |  |  |
| 15 | `Multiplier` | float | YES |  |  |
| 16 | `Dept_Code` | tinyint | YES |  |  |
| 17 | `Dept_Name` | nvarchar(50) | YES |  |  |
| 18 | `ODP_SKU_Vendor_Source` | nvarchar(50) | YES |  |  |
| 19 | `ODP_SKU_MFR_Code` | nvarchar(50) | YES |  |  |
| 20 | `Match_Type_from_Cross_Tool` | nvarchar(50) | YES |  |  |
| 21 | `Compare_Staples_MFR_Code_to_OD_MFR_Code` | bit | YES |  |  |
| 22 | `PB_FLAG` | bit | YES |  |  |
| 23 | `NOTES` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
