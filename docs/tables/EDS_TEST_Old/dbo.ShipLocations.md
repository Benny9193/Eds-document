# Table: `dbo.ShipLocations`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6841

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ShippingId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Address1` | varchar(30) | YES |  |  |
| 6 | `Address2` | varchar(30) | YES |  |  |
| 7 | `Address3` | varchar(30) | YES |  |  |
| 8 | `City` | varchar(25) | YES |  |  |
| 9 | `State` | varchar(2) | YES |  |  |
| 10 | `ZipCode` | varchar(10) | YES |  |  |
| 11 | `Phone` | varchar(20) | YES |  |  |
| 12 | `Fax` | varchar(14) | YES |  |  |
| 13 | `EMail` | varchar(255) | YES |  |  |
| 14 | `LocationCode` | varchar(32) | YES |  |  |
| 15 | `RTK_SitesId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_ShipLocations_7_1576757070__K1_4_5_6_7_8_9_10_14` | no | NONCLUSTERED | `ShippingId` | `Name`, `Address1`, `Address2`, `Address3`, `City`, `State`, `ZipCode`, `LocationCode` |
| `SK_District` | no | NONCLUSTERED | `DistrictId` |  |
