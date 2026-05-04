# Table: `dbo.VendorQueryMSRPDetail`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryMSRPDetailId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidImportId` | int | YES |  |  |
| 4 | `VendorQueryMSRPId` | int | YES |  |  |
| 5 | `AddDate` | datetime | YES |  |  |
| 6 | `SendDate` | datetime | YES |  |  |
| 7 | `MSRPQueryType` | int | YES |  |  |
| 8 | `MSRPQuery` | varchar(4000) | YES |  |  |
| 9 | `MSRPQueryManufacturers` | varchar(max) | YES |  |  |
| 10 | `MSRPQueryNotes` | varchar(1000) | YES |  |  |
| 11 | `VendorId` | int | YES |  |  |
| 12 | `ResolvedFlag` | tinyint | YES |  |  |
| 13 | `AllowReply` | tinyint | YES |  |  |
| 14 | `ManufacturerSelection` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `MSRP Vendor Query Header/Detail` | `VendorQueryMSRPId` | [`dbo.VendorQueryMSRP.VendorQueryMSRPId`](dbo.VendorQueryMSRP.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
