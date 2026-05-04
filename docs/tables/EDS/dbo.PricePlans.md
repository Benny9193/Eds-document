# Table: `dbo.PricePlans`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 585

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Named price-plan definitions (~585 rows) — controls which categories/vendors are visible to which districts at what pricing tier. Small but pivotal: changes here change what buyers see.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricePlanId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `Code` | varchar(20) | YES |  |  |
| 4 | `Description` | varchar(255) | YES |  |  |
| 5 | `LastAltered` | datetime | YES |  |  |
| 6 | `LastUpdated` | datetime | YES |  |  |
| 7 | `stateid` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DistrictPP`](dbo.DistrictPP.md) | `PricePlanId` | `PricePlanId` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
