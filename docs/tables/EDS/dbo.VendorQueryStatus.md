# Table: `dbo.VendorQueryStatus`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 30799

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryStatusId` | int | NO |  | YES |
| 2 | `VendorQueryId` | int | YES |  |  |
| 3 | `StatusId` | int | YES |  |  |
| 4 | `StatusDate` | datetime | YES |  |  |
| 5 | `FollowUpDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VendorQueryStatus` | no | NONCLUSTERED | `VendorQueryId` |  |
