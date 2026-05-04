# Table: `dbo.School`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6637

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SchoolId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Address1` | varchar(30) | YES |  |  |
| 6 | `Address2` | varchar(30) | YES |  |  |
| 7 | `Address3` | varchar(30) | YES |  |  |
| 8 | `City` | varchar(25) | YES |  |  |
| 9 | `State` | varchar(2) | YES |  |  |
| 10 | `Zipcode` | varchar(10) | YES |  |  |
| 11 | `BillingId` | int | YES |  |  |
| 12 | `ShippingId` | int | YES |  |  |
| 13 | `PhoneNumber` | varchar(20) | YES |  |  |
| 14 | `Fax` | varchar(20) | YES |  |  |
| 15 | `EMail` | varchar(255) | YES |  |  |
| 16 | `LocationCode` | varchar(32) | YES |  |  |
| 17 | `AddressId` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_School_District` | `DistrictId` | [`dbo.District.DistrictId`](dbo.District.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Accounts`](dbo.Accounts.md) | `SchoolId` | `SchoolId` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_School_7_510676917__K2_K1_4_5_6_7_8_9_10` | no | NONCLUSTERED | `DistrictId`, `SchoolId` | `Name`, `Address1`, `Address2`, `Address3`, `City`, `State`, `Zipcode` |
| `SK_District` | no | NONCLUSTERED | `DistrictId` |  |
| `SKI_Active_School` | no | NONCLUSTERED | `Active` | `SchoolId` |
