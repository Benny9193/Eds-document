# Table: `dbo.SulphiteDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6280

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Working table for Sulphite (Industries) bid item resolution (~6.3K rows). Maps `Detail.DetailId` → resolved `ItemId` via `vendorItemCode` / `ItemCode`. Vendor-specific helper used to align an established Sulphite-supplied item code to the master `Items` row during requisition processing.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `vendorItemCode` | varchar(50) | YES |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
