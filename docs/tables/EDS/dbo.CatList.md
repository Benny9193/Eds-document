# Table: `dbo.CatList`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 155059

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Denormalized catalog mailing-recipient list (~155K rows). Snapshot of (district, school, category, price plan, attention, address) used when generating physical catalog / order-book mailings. Working table — rebuilt before each mail run.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `PriceplanCode` | varchar(20) | YES |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `SchoolName` | varchar(50) | YES |  |  |
| 5 | `SchoolAddress` | varchar(30) | YES |  |  |
| 6 | `SchoolCity` | varchar(25) | YES |  |  |
| 7 | `SchoolState` | varchar(2) | YES |  |  |
| 8 | `SchoolZip` | varchar(10) | YES |  |  |
| 9 | `Attention` | varchar(50) | YES |  |  |
| 10 | `UserNumber` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
