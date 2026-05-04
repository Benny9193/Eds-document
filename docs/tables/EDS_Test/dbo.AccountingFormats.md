# Table: `dbo.AccountingFormats`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 49

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AccountingFormatId` | int | NO |  | YES |
| 2 | `Description` | varchar(255) | YES |  |  |
| 3 | `FileLayoutId` | int | YES |  |  |
| 4 | `MaxPODetailItems` | int | YES |  |  |
| 5 | `LocationCodeRequired` | tinyint | YES |  |  |
| 6 | `VendorBidNumberRequired` | tinyint | YES |  |  |
| 7 | `VendorBidCommentsRequired` | tinyint | YES |  |  |
| 8 | `UsersDistrictAccountingCodeRequired` | tinyint | YES |  |  |
| 9 | `IncidentalOrdersSupported` | tinyint | YES |  |  |
| 10 | `ShortName` | varchar(50) | YES |  |  |
| 11 | `DetailedFormat` | tinyint | YES |  |  |
| 12 | `ScriptURL` | varchar(1024) | YES |  |  |
| 13 | `useFirstLast` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
