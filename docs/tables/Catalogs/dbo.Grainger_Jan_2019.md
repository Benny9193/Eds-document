# Table: `dbo.Grainger Jan 2019`

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1471345

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Frozen snapshot of the Grainger January 2019 catalog feed (~1.5M rows). One of several Grainger snapshots in this DB (`Grainger Jan 2015`, `…Jan 2016`, `…Jan 2017`, `…Jan 2017 Revised`, `…Feb 2018`, `…May 2018`, `…May 2017`, `…May 2016`). Kept for historical pricing comparisons.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Page Number` | int | YES |  |  |
| 2 | `Catalog Item Number` | nvarchar(25) | YES |  |  |
| 3 | `Item Description` | nvarchar(255) | YES |  |  |
| 4 | `Unit of Measure` | nvarchar(255) | YES |  |  |
| 5 | `Catalog Price` | float | YES |  |  |
| 6 | `Manufacturer` | nvarchar(255) | YES |  |  |
| 7 | `Manufacturer Part Number` | nvarchar(255) | YES |  |  |
| 8 | `Right to know` | nvarchar(255) | YES |  |  |
| 9 | `Net Delivered Price` | float | YES |  |  |
| 10 | `Eligible for Discount` | nvarchar(255) | YES |  |  |
| 11 | `Additional Shipping` | nvarchar(50) | YES |  |  |
| 12 | `Unique item number` | nvarchar(50) | YES |  |  |
| 13 | `Heading` | nvarchar(50) | YES |  |  |
| 14 | `Keyword` | nvarchar(255) | YES |  |  |
| 15 | `MSDS URL Link` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
