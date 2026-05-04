# Table: `dbo.VendorQueryTandMDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1197

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-line T&M vendor queries (~1.2K rows). Mirrors `VendorQueryDetail` for the trades track, with extra `TandMQueryType`, `TandMQueryCounties`, and `ResolvedFlag`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryTandMDetailId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidImportId` | int | YES |  |  |
| 4 | `VendorQueryTandMId` | int | YES |  |  |
| 5 | `AddDate` | datetime | YES |  |  |
| 6 | `SendDate` | datetime | YES |  |  |
| 7 | `TandMQueryType` | int | YES |  |  |
| 8 | `TandMQuery` | varchar(4000) | YES |  |  |
| 9 | `TandMQueryCounties` | varchar(1000) | YES |  |  |
| 10 | `TandMQueryNotes` | varchar(1000) | YES |  |  |
| 11 | `VendorId` | int | YES |  |  |
| 12 | `ResolvedFlag` | tinyint | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `T&M Vendor Query Header/Detail` | `VendorQueryTandMId` | [`dbo.VendorQueryTandM.VendorQueryTandMId`](dbo.VendorQueryTandM.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
