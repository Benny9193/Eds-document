# Table: `dbo.BidRequestManufacturer`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 104823

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestManufacturerId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `ManufacturerId` | int | YES |  |  |
| 5 | `SequenceNumber` | int | YES |  |  |
| 6 | `AllowAdditionalProductLines` | tinyint | YES |  |  |
| 7 | `UseOptions` | tinyint | YES |  |  |
| 8 | `BidHeaderKey` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_BidRequestManufacturer_BidHeaders` | `BidHeaderId` | [`dbo.BidHeaders.BidHeaderId`](dbo.BidHeaders.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_Manufact` | no | NONCLUSTERED | `BidHeaderId`, `ManufacturerId` | `BidRequestManufacturerId`, `Active` |
