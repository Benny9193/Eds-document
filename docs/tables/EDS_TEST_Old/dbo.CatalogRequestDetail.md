# Table: `dbo.CatalogRequestDetail`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogRequestDetailId` | int | NO |  | YES |
| 2 | `CatalogRequestId` | int | YES |  |  |
| 3 | `AddDate` | datetime | YES |  |  |
| 4 | `SendDate` | datetime | YES |  |  |
| 5 | `CatalogRequestType` | int | YES |  |  |
| 6 | `CatalogRequestMsg` | varchar(4000) | YES |  |  |
| 7 | `CatalogRequestNotes` | varchar(1000) | YES |  |  |
| 8 | `VendorId` | int | YES |  |  |
| 9 | `ResolvedFlag` | tinyint | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Catalog Request Header/Detail` | `CatalogRequestId` | [`dbo.CatalogRequest.CatalogRequestId`](dbo.CatalogRequest.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
