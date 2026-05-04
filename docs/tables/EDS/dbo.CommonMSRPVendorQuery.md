# Table: `dbo.CommonMSRPVendorQuery`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CommonMSRPVendorQueryId` | int | NO |  |  |
| 2 | `CategoryIdSpecific` | int | YES |  |  |
| 3 | `CommonQuestion` | varchar(500) | YES |  |  |
| 4 | `GroupFilter` | varchar(50) | YES |  |  |
| 5 | `AllowReply` | tinyint | YES |  |  |
| 6 | `ManufacturerSelection` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
