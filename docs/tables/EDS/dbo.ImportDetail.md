# Table: `dbo.ImportDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 882935

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Raw rows captured from a generic file import (~883K rows). One row of `ImportData` per source line, scoped to an `ImportId` header. Read after parsing to inspect malformed input.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ImportDetailId` | int | NO |  | YES |
| 2 | `ImportId` | int | YES |  |  |
| 3 | `ImportData` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
