# Table: `dbo.TM_UOM`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 77

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Trades-bid UoM lookup (~77 rows). Description-only reference (e.g. 'Hour', 'Each', 'Square Foot') used by the trades / T&M bid forms. Distinct from the catalog `Units` table.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TM_UOMId` | int | NO |  | YES |
| 2 | `Description` | varchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
