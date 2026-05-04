# Table: `dbo.District`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 963

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  | YES |
| 2 | `DistrictCode` | varchar(4) | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Address1` | varchar(30) | YES |  |  |
| 6 | `Address2` | varchar(30) | YES |  |  |
| 7 | `Address3` | varchar(30) | YES |  |  |
| 8 | `City` | varchar(25) | YES |  |  |
| 9 | `State` | varchar(2) | YES |  |  |
| 10 | `Zipcode` | varchar(10) | YES |  |  |
| 11 | `RequiredApprovalLevel` | tinyint | YES |  |  |
| 12 | `POsBySchool` | tinyint | YES |  |  |
| 13 | `ReqsBySchool` | tinyint | YES |  |  |
| 14 | `SuppressPONumber` | tinyint | YES |  |  |
| 15 | `CSRepId` | int | YES |  |  |
| 16 | `POConsolidation` | char(1) | YES |  |  |
| 17 | `CoopId` | int | YES |  |  |
| 18 | `BillingAddressId` | int | YES |  |  |
| 19 | `ShippingAddressId` | int | YES |  |  |
| 20 | `NextCometId` | int | YES |  |  |
| 21 | `PhoneNumber` | varchar(20) | YES |  |  |
| 22 | `Fax` | varchar(20) | YES |  |  |
| 23 | `EMail` | varchar(255) | YES |  |  |
| 24 | `BAName` | varchar(50) | YES |  |  |
| 25 | `UseGrossPrices` | tinyint | YES |  |  |
| 26 | `POLayoutId` | int | YES |  |  |
| 27 | `AccountingFormatId` | int | YES |  |  |
| 28 | `TextbookPercentage` | decimal(9,5) | YES |  |  |
| 29 | `NoBooklets` | tinyint | YES |  |  |
| 30 | `RequireAccounts` | tinyint | YES |  |  |
| 31 | `CurrentBudgetOnly` | tinyint | YES |  |  |
| 32 | `DistrictTypeId` | int | YES |  |  |
| 33 | `AccountSeparator` | char(1) | YES |  |  |
| 34 | `EnableLogins` | tinyint | YES |  |  |
| 35 | `County` | varchar(50) | YES |  |  |
| 36 | `DRsbySchool` | int | YES |  |  |
| 37 | `RightToKnow` | int | YES |  |  |
| 38 | `RTK` | int | YES |  |  |
| 39 | `AllowPasswordChanges` | tinyint | YES |  |  |
| 40 | `ScheduleId` | int | YES |  |  |
| 41 | `DisableLogins` | tinyint | YES |  |  |
| 42 | `LocalPOLayoutId` | int | YES |  |  |
| 43 | `POUploadEmail` | varchar(255) | YES |  |  |
| 44 | `ContactName` | varchar(50) | YES |  |  |
| 45 | `ContactPhone` | varchar(20) | YES |  |  |
| 46 | `ParentDistrictId` | int | YES |  |  |
| 47 | `NoAdvises` | tinyint | YES |  |  |
| 48 | `TimeAndMaterialBids` | tinyint | YES |  |  |
| 49 | `MinimumPO` | money | YES | `((25))` |  |
| 50 | `AccountingDistrictCode` | varchar(50) | YES |  |  |
| 51 | `StateId` | int | YES |  |  |
| 52 | `FixedPOMsg` | varchar(500) | YES |  |  |
| 53 | `UseEDSVendorCodes` | tinyint | YES |  |  |
| 54 | `AccountingSystemOptions` | varchar(255) | YES |  |  |
| 55 | `CooperativeBids` | tinyint | YES |  |  |
| 56 | `AllowIncidentalOrdering` | tinyint | YES | `((1))` |  |
| 57 | `AllowUserMaintenance` | tinyint | YES |  |  |
| 58 | `PrintBidAs` | tinyint | YES |  |  |
| 59 | `AnnualPOGenerationMethod` | varchar(10) | YES |  |  |
| 60 | `IncidentalPOGenerationMethod` | varchar(10) | YES |  |  |
| 61 | `SuppressPrintSchedule` | tinyint | YES |  |  |
| 62 | `MinimumPOAmount` | money | YES |  |  |
| 63 | `EnableRTKOnline` | int | YES |  |  |
| 64 | `onlineOrderbook` | tinyint | YES |  |  |
| 65 | `AllowElectronicPOs` | int | YES |  |  |
| 66 | `NotificationType` | int | YES |  |  |
| 67 | `DoNotShipCatalogs` | tinyint | YES |  |  |
| 68 | `usesActualPONumber` | tinyint | YES |  |  |
| 69 | `HidefromDistrictLists` | tinyint | YES |  |  |
| 70 | `AllowSmallPOs` | tinyint | YES |  |  |
| 71 | `AllowBringForwardReqs` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Accounts`](dbo.Accounts.md) | `DistrictId` | `DistrictId` | NO_ACTION | NO_ACTION |
| [`dbo.Budgets`](dbo.Budgets.md) | `DistrictId` | `DistrictId` | NO_ACTION | CASCADE |
| [`dbo.DistrictVendor`](dbo.DistrictVendor.md) | `DistrictId` | `DistrictId` | NO_ACTION | CASCADE |
| [`dbo.School`](dbo.School.md) | `DistrictId` | `DistrictId` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_District_7_1582680736__K1_4` | no | NONCLUSTERED | `DistrictId` | `Name` |
| `_dta_index_District_7_605438543__K1_2_4_5_6_7_8_9_10_12_21_22_53` | no | NONCLUSTERED | `DistrictId` | `DistrictCode`, `Name`, `Address1`, `Address2`, `Address3`, `City`, `State`, `Zipcode`, `POsBySchool`, `PhoneNumber`, `Fax`, `UseEDSVendorCodes` |
| `SK_CSRep` | no | NONCLUSTERED | `CSRepId` |  |
| `SK_DistrictCode` | no | NONCLUSTERED | `DistrictCode` |  |
| `SK_DistrictIdActiveCountyStateDC` | YES | NONCLUSTERED | `DistrictId`, `Active`, `County`, `State`, `DistrictCode` |  |
| `SK_POSchool` | no | NONCLUSTERED | `POsBySchool` |  |
