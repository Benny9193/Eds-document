# Table: `dbo.BidDocumentTypes`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 298

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidDocumentTypeId` | int | NO |  | YES |
| 2 | `BidType` | int | YES |  |  |
| 3 | `Name` | varchar(50) | NO |  |  |
| 4 | `Description` | varchar(4096) | YES |  |  |
| 5 | `VendorSpecific` | tinyint | YES |  |  |
| 6 | `State` | char(2) | YES |  |  |
| 7 | `Sequence` | int | YES |  |  |
| 8 | `DistrictVisible` | tinyint | YES |  |  |
| 9 | `OnlyShowOne` | tinyint | YES |  |  |
| 10 | `Grouping` | varchar(50) | YES |  |  |
| 11 | `VendorUnique` | tinyint | YES |  |  |
| 12 | `Expires` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_DocLookup` | no | NONCLUSTERED | `BidType`, `Name`, `VendorSpecific` | `DistrictVisible`, `OnlyShowOne` |
