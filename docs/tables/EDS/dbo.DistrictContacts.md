# Table: `dbo.DistrictContacts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3849

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictContactId` | int | NO |  | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `DistrictContactTypeId` | int | NO |  |  |
| 4 | `SalutationId` | int | YES |  |  |
| 5 | `FirstName` | varchar(50) | YES |  |  |
| 6 | `MiddleName` | varchar(50) | YES |  |  |
| 7 | `LastName` | varchar(50) | YES |  |  |
| 8 | `Suffix` | varchar(20) | YES |  |  |
| 9 | `Phone` | varchar(20) | YES |  |  |
| 10 | `Fax` | varchar(20) | YES |  |  |
| 11 | `eMail` | varchar(255) | YES |  |  |
| 12 | `ShippingId` | int | YES |  |  |
| 13 | `Address1` | varchar(50) | YES |  |  |
| 14 | `Address2` | varchar(50) | YES |  |  |
| 15 | `City` | varchar(50) | YES |  |  |
| 16 | `State` | char(2) | YES |  |  |
| 17 | `Zipcode` | varchar(10) | YES |  |  |
| 18 | `FullName` | varchar(174) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_DistrictContacttype` | no | NONCLUSTERED | `DistrictId`, `DistrictContactTypeId` |  |
