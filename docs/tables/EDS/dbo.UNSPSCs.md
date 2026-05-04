# Table: `dbo.UNSPSCs`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 50317

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

UNSPSC commodity-code reference (~50K rows). Industry-standard product taxonomy used to tag items for analytics and external reporting. Read-mostly lookup.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UNSPSCId` | int | NO |  | YES |
| 2 | `Code` | varchar(10) | NO |  |  |
| 3 | `Description` | varchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
