# Table: `dbo.ImportCatalogDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 18658

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-event log under an `ImportCatalogHeader` (~19K rows). Captures `ImportInfoType`, `ImportInfoDesc`, `ImportInfoValue`, and timestamp for each pipeline event during a catalog import run.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ImportCatalogDetailId` | int | NO |  | YES |
| 2 | `ImportCatalogHeaderId` | int | YES |  |  |
| 3 | `ImportInfoType` | int | YES |  |  |
| 4 | `ImportInfoDesc` | varchar(1000) | YES |  |  |
| 5 | `ImportInfoValue` | int | YES |  |  |
| 6 | `ImportDateTime` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
