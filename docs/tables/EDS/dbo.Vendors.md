# Table: `dbo.Vendors`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 19037

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `Code` | varchar(16) | YES |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Address1` | varchar(50) | YES |  |  |
| 6 | `Address2` | varchar(50) | YES |  |  |
| 7 | `Address3` | varchar(50) | YES |  |  |
| 8 | `City` | varchar(25) | YES |  |  |
| 9 | `State` | varchar(2) | YES |  |  |
| 10 | `ZipCode` | varchar(10) | YES |  |  |
| 11 | `Phone` | varchar(20) | YES |  |  |
| 12 | `Fax` | varchar(20) | YES |  |  |
| 13 | `EMail` | varchar(255) | YES |  |  |
| 14 | `UseGrossPrices` | tinyint | YES |  |  |
| 15 | `ShippingPercentage` | decimal(9,5) | YES |  |  |
| 16 | `DistrictId` | int | YES |  |  |
| 17 | `Password` | varchar(50) | YES |  |  |
| 18 | `HostURL` | varchar(255) | YES |  |  |
| 19 | `HostPort` | int | YES |  |  |
| 20 | `HostDirectory` | varchar(255) | YES |  |  |
| 21 | `HostUserName` | varchar(255) | YES |  |  |
| 22 | `HostPassword` | varchar(255) | YES |  |  |
| 23 | `UploadEMailList` | varchar(4096) | YES |  |  |
| 24 | `UploadType` | int | YES |  |  |
| 25 | `BusinessUnit` | varchar(17) | YES |  |  |
| 26 | `POPassword` | varchar(50) | YES |  |  |
| 27 | `cXMLAddress` | varchar(1024) | YES |  |  |
| 28 | `VendorLogo` | varbinary(max) | YES |  |  |
| 29 | `cXMLFromDomain` | varchar(50) | YES |  |  |
| 30 | `cXMLFromIdentity` | varchar(50) | YES |  |  |
| 31 | `cXMLToDomain` | varchar(50) | YES |  |  |
| 32 | `cXMLToIdentity` | varchar(50) | YES |  |  |
| 33 | `cXMLSenderDomain` | varchar(50) | YES |  |  |
| 34 | `cXMLSenderIdentity` | varchar(50) | YES |  |  |
| 35 | `cXMLSenderSharedSecret` | varchar(50) | YES |  |  |
| 36 | `AllowElectronicPOs` | int | YES |  |  |
| 37 | `VendorDeliveryRuleId` | int | YES | `((1))` |  |
| 38 | `DisplayAs` | varchar(50) | YES |  |  |
| 39 | `incXMLFromDomain` | varchar(20) | YES |  |  |
| 40 | `incXMLFromIdentity` | varchar(50) | YES |  |  |
| 41 | `incXMLSharedSecret` | varchar(255) | YES |  |  |
| 42 | `incXMLEnabled` | tinyint | YES |  |  |
| 43 | `VendorComplianceFlag` | tinyint | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Catalog`](dbo.Catalog.md) | `VendorId` | `VendorId` | NO_ACTION | CASCADE |
| [`dbo.DistrictVendor`](dbo.DistrictVendor.md) | `VendorId` | `VendorId` | NO_ACTION | CASCADE |
| [`dbo.PO`](dbo.PO.md) | `VendorId` | `VendorId` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Vendors_7_1906157886__K1_3` | no | NONCLUSTERED | `VendorId` | `Code` |
| `_dta_index_Vendors_7_1906157886__K1_3_4` | no | NONCLUSTERED | `VendorId` | `Code`, `Name` |
| `_dta_index_Vendors_7_1906157886__K1_4` | no | NONCLUSTERED | `VendorId` | `Name` |
| `_dta_index_Vendors_7_279372460__K1_3_4_5_6_7_8_9_10_11_15_24` | no | NONCLUSTERED | `VendorId` | `Code`, `Name`, `Address1`, `Address2`, `Address3`, `City`, `State`, `ZipCode`, `Phone`, `ShippingPercentage`, `UploadType` |
| `_dta_index_Vendors_9_752057765__K1_K4` | no | NONCLUSTERED | `VendorId`, `Name` |  |
| `SK_ActiveName` | no | NONCLUSTERED | `Active`, `Name` |  |
| `SK_Code` | no | NONCLUSTERED | `Code` |  |
| `SKI_ActiveCode_Vendor` | no | NONCLUSTERED | `Active`, `Code` | `VendorId` |
