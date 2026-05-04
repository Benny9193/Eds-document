# Table: `dbo.DMSBidDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 29251

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid attachments stored in DMS — one row per uploaded file per bid (~29K rows). `DocId` is the GUID into DMS storage; `DistrictVisible`, `PagesCaptured`, and `FileName` are metadata. Companion to `DMSVendorBidDocuments` which is vendor-side.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidNbr` | varchar(max) | YES |  |  |
| 4 | `DocType` | varchar(max) | YES |  |  |
| 5 | `DocId` | uniqueidentifier | YES |  |  |
| 6 | `DistrictVisible` | varchar(max) | YES |  |  |
| 7 | `PagesCaptured` | int | YES |  |  |
| 8 | `FileName` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
