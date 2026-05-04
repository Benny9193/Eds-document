# Table: `dbo.regusers`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 13383

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `reguserId` | int | NO |  | YES |
| 2 | `registrationid` | int | NO |  |  |
| 3 | `active` | tinyint | YES |  |  |
| 4 | `email` | varchar(255) | NO |  |  |
| 5 | `password` | varchar(255) | NO |  |  |
| 6 | `name` | varchar(50) | NO |  |  |
| 7 | `address1` | varchar(50) | YES |  |  |
| 8 | `address2` | varchar(50) | YES |  |  |
| 9 | `city` | varchar(50) | YES |  |  |
| 10 | `state` | char(2) | YES |  |  |
| 11 | `zipcode` | varchar(10) | YES |  |  |
| 12 | `phone` | varchar(25) | YES |  |  |
| 13 | `fax` | varchar(20) | YES |  |  |
| 14 | `role` | varchar(20) | YES | `('User')` |  |
| 15 | `vendorcontactid` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_ActiveReg_EmailPass` | no | NONCLUSTERED | `active`, `registrationid` | `email`, `password` |
