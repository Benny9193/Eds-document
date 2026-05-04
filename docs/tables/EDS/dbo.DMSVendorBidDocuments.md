# Table: `dbo.DMSVendorBidDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 750489

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `VendorCode` | varchar(10) | YES |  |  |
| 3 | `DistrictVisible` | varchar(10) | YES |  |  |
| 4 | `BidHeaderId` | int | YES |  |  |
| 5 | `BidNbr` | varchar(20) | YES |  |  |
| 6 | `DocType` | varchar(255) | YES |  |  |
| 7 | `ExpirationDate` | varchar(30) | YES |  |  |
| 8 | `DocumentNumber` | varchar(255) | YES |  |  |
| 9 | `DocId` | uniqueidentifier | YES |  |  |
| 10 | `PagesCaptured` | int | YES |  |  |
| 11 | `FileName` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidHeaderVendorCodeDocType_Id` | no | NONCLUSTERED | `BidHeaderId`, `VendorCode`, `DocType` | `Id` |
