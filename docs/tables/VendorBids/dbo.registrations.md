# Table: `dbo.registrations`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14207

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `registrationid` | int | NO |  | YES |
| 2 | `active` | tinyint | YES |  |  |
| 3 | `vendorid` | int | YES |  |  |
| 4 | `code` | varchar(16) | YES |  |  |
| 5 | `password` | varchar(32) | YES |  |  |
| 6 | `email` | varchar(255) | YES |  |  |
| 7 | `name` | varchar(50) | YES |  |  |
| 8 | `address1` | varchar(50) | YES |  |  |
| 9 | `address2` | varchar(50) | YES |  |  |
| 10 | `address3` | varchar(50) | YES |  |  |
| 11 | `city` | varchar(30) | YES |  |  |
| 12 | `state` | char(2) | YES |  |  |
| 13 | `zipcode` | varchar(10) | YES |  |  |
| 14 | `phone` | varchar(20) | YES |  |  |
| 15 | `fax` | varchar(20) | YES |  |  |
| 16 | `contact` | varchar(50) | YES |  |  |
| 17 | `ShowBidTabs` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ledger`](dbo.ledger.md) | `registrationid` | `registrationid` | CASCADE | CASCADE |
| [`dbo.vendorbids`](dbo.vendorbids.md) | `registrationid` | `registrationid` | CASCADE | CASCADE |
| [`dbo.vendorsessions`](dbo.vendorsessions.md) | `registrationid` | `registrationid` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_ActiveReg_CodeName` | no | NONCLUSTERED | `active`, `vendorid` | `code`, `name` |
