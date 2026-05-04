# View: `VMS.vw_BidsByVendor`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `VMS`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `CategoryId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `Description` | varchar(512) | YES |  |  |
| 5 | `BidMessage` | varchar(1024) | YES |  |  |
| 6 | `EffectiveFrom` | datetime | YES |  |  |
| 7 | `EffectiveUntil` | datetime | YES |  |  |
| 8 | `ClosingDate` | datetime | YES |  |  |
| 9 | `CategoryName` | varchar(50) | YES |  |  |
| 10 | `PK` | int | NO |  |  |

## Depends on

_None resolved._

## Used by

_No other objects reference this view._

## Definition

_Definition not available (view may be encrypted, or insufficient permissions)._
