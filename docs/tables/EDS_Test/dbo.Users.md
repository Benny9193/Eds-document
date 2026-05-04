# Table: `dbo.Users`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 337916

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `ShippingId` | int | YES |  |  |
| 5 | `Active` | tinyint | YES |  |  |
| 6 | `UserName` | varchar(50) | YES |  |  |
| 7 | `Password` | varchar(100) | YES |  |  |
| 8 | `Attention` | varchar(50) | YES |  |  |
| 9 | `ApprovalLevel` | tinyint | YES |  |  |
| 10 | `CometId` | int | YES |  |  |
| 11 | `DisableNewRequisition` | tinyint | YES |  |  |
| 12 | `DistrictAcctgCode` | varchar(20) | YES |  |  |
| 13 | `ApproverId` | int | YES |  |  |
| 14 | `NewRequisitionButton` | int | YES |  |  |
| 15 | `AllowIncidentals` | tinyint | YES |  |  |
| 16 | `AllowVendorChanges` | tinyint | YES |  |  |
| 17 | `AllowShipToChanges` | tinyint | YES |  |  |
| 18 | `AllowTM` | tinyint | YES |  |  |
| 19 | `Email` | varchar(255) | YES |  |  |
| 20 | `SecurityRoleId` | int | YES |  |  |
| 21 | `Use20` | tinyint | YES |  |  |
| 22 | `FirstName` | varchar(20) | YES |  |  |
| 23 | `LastName` | varchar(30) | YES |  |  |
| 24 | `allowMSRP` | tinyint | YES |  |  |
| 25 | `EmailByPassDate` | date | YES |  |  |
| 26 | `AllowExport` | bit | YES |  |  |
| 27 | `HasAdminAccess` | bit | YES |  |  |
| 28 | `AllowAddenda` | bit | YES |  |  |
| 29 | `UseCF` | int | YES |  |  |
| 30 | `IBTypeId` | int | YES |  |  |
| 31 | `AllowAccountCodeMgmt` | tinyint | YES |  |  |
| 32 | `AllowEarlyAccess` | tinyint | YES |  |  |
| 33 | `POAccess` | int | YES |  |  |
| 34 | `NotificationType` | int | YES |  |  |
| 35 | `PasswordOld` | varchar(100) | YES |  |  |
| 36 | `SSOID` | varchar(255) | YES |  |  |
| 37 | `SSOProvider` | varchar(50) | YES |  |  |
| 38 | `ResetPasswordCode` | varchar(8) | YES |  |  |
| 39 | `ResetPasswordCodeExpiration` | datetime | YES |  |  |
| 40 | `AllowVendorCodeMaintenance` | tinyint | YES |  |  |
| 41 | `PositionData` | nvarchar(4000) | YES |  |  |
| 42 | `LastLogin` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Users_7_658802521__K1_10_12` | no | NONCLUSTERED | `UserId` | `CometId`, `DistrictAcctgCode` |
| `SK_Approver` | no | NONCLUSTERED | `ApproverId` |  |
| `SK_CometId` | no | NONCLUSTERED | `CometId` |  |
| `SKI_DistrictActive_UserSchoolApprovallevelCometApprover` | no | NONCLUSTERED | `DistrictId`, `Active` | `UserId`, `SchoolId`, `ApprovalLevel`, `CometId`, `ApproverId` |
| `SKI_SchoolActive_AttentionLevelComet` | no | NONCLUSTERED | `SchoolId`, `Active` | `Attention`, `ApprovalLevel`, `CometId` |
| `SKI_SchoolUser_CometDistrictAcctCode` | no | NONCLUSTERED | `SchoolId`, `UserId` | `CometId`, `DistrictAcctgCode` |
| `SKI_User_SchoolCometAcctg` | YES | NONCLUSTERED | `UserId` | `SchoolId`, `CometId`, `DistrictAcctgCode` |
