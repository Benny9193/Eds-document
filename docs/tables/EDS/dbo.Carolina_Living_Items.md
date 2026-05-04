# Table: `dbo.Carolina Living Items`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2017

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Carolina Living vendor-specific items snapshot (~2K rows). Vendor-specific working table; preserved as a frozen item set referenced by their feed, similar in spirit to other vendor-named snapshots in `Catalogs.dbo`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `inventorynumber` | nvarchar(255) | NO |  | YES |
| 2 | `Description` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
