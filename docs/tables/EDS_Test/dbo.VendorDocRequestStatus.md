# Table: `dbo.VendorDocRequestStatus`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorDocRequestStatusId` | int | NO |  | YES |
| 2 | `VendorDocRequestId` | int | YES |  |  |
| 3 | `StatusId` | int | YES |  |  |
| 4 | `StatusDate` | datetime | YES |  |  |
| 5 | `FollowUpDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
