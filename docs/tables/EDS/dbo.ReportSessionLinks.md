# Table: `dbo.ReportSessionLinks`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 52720882

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-session output links (~52.7M rows) — joins a report session to the rows it generated, used to support drill-throughs and saved exports.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSLId` | int | NO |  | YES |
| 2 | `RSId` | int | YES |  |  |
| 3 | `IntId` | int | YES |  |  |
| 4 | `AuxId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `RS_RSLink` | no | NONCLUSTERED | `RSId`, `IntId` |  |
