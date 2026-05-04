# Table: `dbo.BidHeaderDocument`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 164275

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Junction `BidHeaders` ↔ `BidDocuments` (~164K rows) defining which documents are attached to a bid solicitation, with `DisplaySequence` controlling order in the bid packet. Distinct from `DMSBidDocuments` which holds vendor-uploaded response attachments.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderDocumentId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidDocumentId` | int | YES |  |  |
| 4 | `DisplaySequence` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
