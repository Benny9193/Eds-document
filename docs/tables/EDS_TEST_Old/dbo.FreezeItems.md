# Table: `dbo.FreezeItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 15435

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `CrossRefId` | int | NO |  |  |
| 4 | `VendorId` | int | NO |  |  |
| 5 | `VendorItemCode` | varchar(50) | YES |  |  |
| 6 | `BidHeaderId` | int | NO |  |  |
| 7 | `GrossPrice` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidHeaderItemVendor_Etc` | no | NONCLUSTERED | `BidHeaderId`, `ItemId`, `VendorId` | `Id`, `CrossRefId`, `VendorItemCode`, `GrossPrice` |
| `ti_Crossref_Id` | no | NONCLUSTERED | `CrossRefId` | `Id` |
