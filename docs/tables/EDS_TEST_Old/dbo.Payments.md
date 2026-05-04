# Table: `dbo.Payments`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PaymentId` | int | NO |  | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `InvoiceId` | int | YES |  |  |
| 4 | `PaymentTypeId` | int | NO |  |  |
| 5 | `PaymentDate` | datetime | NO |  |  |
| 6 | `Amount` | money | YES |  |  |
| 7 | `Comments` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
