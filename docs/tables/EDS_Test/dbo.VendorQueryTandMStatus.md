# Table: `dbo.VendorQueryTandMStatus`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1739

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryTandMStatusId` | int | NO |  | YES |
| 2 | `VendorQueryTandMId` | int | YES |  |  |
| 3 | `StatusId` | int | YES |  |  |
| 4 | `StatusDate` | datetime | YES |  |  |
| 5 | `FollowUpDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `T&M Vendor Query Header/Status` | `VendorQueryTandMId` | [`dbo.VendorQueryTandM.VendorQueryTandMId`](dbo.VendorQueryTandM.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
