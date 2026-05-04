# Table: `dbo.CatalogRequestStatus`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogRequestStatusId` | int | NO |  | YES |
| 2 | `CatalogRequestId` | int | YES |  |  |
| 3 | `StatusId` | int | YES |  |  |
| 4 | `StatusDate` | datetime | YES |  |  |
| 5 | `FollowUpDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Catalog Request Header/Status` | `CatalogRequestId` | [`dbo.CatalogRequest.CatalogRequestId`](dbo.CatalogRequest.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
