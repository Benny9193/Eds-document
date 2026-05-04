# Table: `dbo.RTK_LegacyDistrictCodesMap`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 78

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Legacy district-code translation table (~78 rows). Maps the historical (`Legacy_DistrictCode`, `SQL_DistrictCode`) two-character codes onto the modern surrogate `DistrictId`. Read-mostly; lets historical RTK / batch files reference districts by their old codes.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_DistrictCodesMapId` | int | NO |  | YES |
| 2 | `Legacy_DistrictCode` | char(2) | NO |  |  |
| 3 | `SQL_DistrictCode` | char(2) | NO |  |  |
| 4 | `DistrictId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
