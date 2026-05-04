# Table: `dbo.VendorContacts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 23503

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorContactId` | int | NO |  | YES |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `SalutationId` | int | YES |  |  |
| 5 | `FirstName` | varchar(50) | YES |  |  |
| 6 | `LastName` | varchar(50) | YES |  |  |
| 7 | `Suffix` | varchar(20) | YES |  |  |
| 8 | `Address1` | varchar(50) | YES |  |  |
| 9 | `Address2` | varchar(50) | YES |  |  |
| 10 | `City` | varchar(50) | YES |  |  |
| 11 | `State` | char(2) | YES |  |  |
| 12 | `Zipcode` | varchar(10) | YES |  |  |
| 13 | `Phone` | varchar(25) | YES |  |  |
| 14 | `Fax` | varchar(20) | YES |  |  |
| 15 | `EMail` | varchar(255) | YES |  |  |
| 16 | `Comments` | varchar(1024) | YES |  |  |
| 17 | `Password` | varchar(50) | YES |  |  |
| 18 | `LastModified` | datetime | YES |  |  |
| 19 | `BidContact` | tinyint | YES |  |  |
| 20 | `POContact` | tinyint | YES |  |  |
| 21 | `FullName` | varchar(150) | YES |  |  |
| 22 | `FreightContact` | tinyint | YES |  |  |
| 23 | `CSContact` | tinyint | YES |  |  |
| 24 | `ARContact` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_VendorContacts_7_183372118__K2_K1_8_9_10_11_12_13` | no | NONCLUSTERED | `VendorId`, `VendorContactId` | `Address1`, `Address2`, `City`, `State`, `Zipcode`, `Phone` |
| `_dta_index_VendorContacts_7_183372118__K3_K2_K1_K20` | no | NONCLUSTERED | `Active`, `VendorId`, `VendorContactId`, `POContact` |  |
| `SKI_Vendor_All` | no | NONCLUSTERED | `VendorId` | `VendorContactId`, `Active`, `SalutationId`, `FirstName`, `LastName`, `Suffix`, `Address1`, `Address2`, `City`, `State`, `Zipcode`, `Phone`, `Fax`, `EMail`, `BidContact`, `POContact`, `FullName` |
| `SKI_Vendor_VendorcontactidActiveBidcontactPocontact` | no | NONCLUSTERED | `VendorId`, `Active`, `POContact`, `VendorContactId` | `BidContact` |
