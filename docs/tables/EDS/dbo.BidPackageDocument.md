# Table: `dbo.BidPackageDocument`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1452

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Junction `BidPackage` ↔ `BidDocument` (~1.5K rows). Defines which documents are bundled into a reusable bid package (template), with `DisplaySequence`. `BidPackage` then attaches in bulk to `BidHeaders`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidPackageDocumentId` | int | NO |  | YES |
| 2 | `BidPackageId` | int | YES |  |  |
| 3 | `BidDocumentId` | int | YES |  |  |
| 4 | `DisplaySequence` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
