# Table: `dbo.trantypes`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `trantypeid` | int | NO |  | YES |
| 2 | `debitcredit` | tinyint | YES |  |  |
| 3 | `description` | varchar(50) | YES |  |  |
| 4 | `defaultamount` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ledger`](dbo.ledger.md) | `trantypeid` | `trantypeid` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
