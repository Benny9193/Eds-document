# Table: `dbo.DMSVendorDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6485

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `VendorCode` | varchar(10) | YES |  |  |
| 3 | `DistrictVisible` | varchar(10) | YES |  |  |
| 4 | `DocType` | varchar(255) | YES |  |  |
| 5 | `ExpirationDate` | varchar(30) | YES |  |  |
| 6 | `DocumentNumber` | varchar(255) | YES |  |  |
| 7 | `DocId` | uniqueidentifier | YES |  |  |
| 8 | `PagesCaptured` | int | YES |  |  |
| 9 | `FileName` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
