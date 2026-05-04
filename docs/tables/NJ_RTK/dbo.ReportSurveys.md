# Table: `dbo.ReportSurveys`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1982

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `FacilityId` | uniqueidentifier | NO |  |  |
| 3 | `RunDate` | datetime | NO | `(getdate())` |  |
| 4 | `FacilityNumber` | varchar(50) | YES |  |  |
| 5 | `SIC` | varchar(50) | YES |  |  |
| 6 | `CoMun` | varchar(50) | YES |  |  |
| 7 | `DueDate` | varchar(50) | YES |  |  |
| 8 | `FacilityMailingAddress` | varchar(512) | YES |  |  |
| 9 | `FacilityLocation` | varchar(512) | YES |  |  |
| 10 | `FacilityEmployees` | varchar(50) | YES |  |  |
| 11 | `FacilityExposedEmployees` | varchar(50) | YES |  |  |
| 12 | `FacilityType` | varchar(50) | YES |  |  |
| 13 | `HazardousSubstances` | varchar(50) | YES |  |  |
| 14 | `UnknownIngredients` | varchar(50) | YES |  |  |
| 15 | `OtherNatureOfOperations` | varchar(50) | YES |  |  |
| 16 | `EmployerEmailAddress` | varchar(255) | YES |  |  |
| 17 | `CertifierName` | varchar(50) | YES |  |  |
| 18 | `CertifierTitle` | varchar(50) | YES |  |  |
| 19 | `DateCertified` | varchar(50) | YES |  |  |
| 20 | `CertifiedSignature` | varchar(50) | YES |  |  |
| 21 | `CertifierPhone` | varchar(50) | YES |  |  |
| 22 | `CertifierExtension` | varchar(50) | YES |  |  |
| 23 | `PolicePhone` | varchar(50) | YES |  |  |
| 24 | `PoliceName` | varchar(50) | YES |  |  |
| 25 | `PoliceAddress` | varchar(100) | YES |  |  |
| 26 | `PoliceCity` | varchar(50) | YES |  |  |
| 27 | `PoliceState` | varchar(50) | YES |  |  |
| 28 | `PoliceZip` | varchar(50) | YES |  |  |
| 29 | `FirePhone` | varchar(50) | YES |  |  |
| 30 | `FireName` | varchar(50) | YES |  |  |
| 31 | `FireAddress` | varchar(100) | YES |  |  |
| 32 | `FireCity` | varchar(50) | YES |  |  |
| 33 | `FireState` | varchar(50) | YES |  |  |
| 34 | `FireZip` | varchar(50) | YES |  |  |
| 35 | `UnionRepresentation` | varchar(50) | YES |  |  |
| 36 | `UnionRepName` | varchar(50) | YES |  |  |
| 37 | `UnionName` | varchar(50) | YES |  |  |
| 38 | `UnionLocalNumber` | varchar(50) | YES |  |  |
| 39 | `UnionPhone` | varchar(50) | YES |  |  |
| 40 | `UnionAddress` | varchar(100) | YES |  |  |
| 41 | `UnionCity` | varchar(50) | YES |  |  |
| 42 | `UnionState` | varchar(50) | YES |  |  |
| 43 | `UnionZip` | varchar(50) | YES |  |  |
| 44 | `AdditionalUnions` | varchar(50) | YES |  |  |
| 45 | `EmergencyContactName` | varchar(50) | YES |  |  |
| 46 | `EmergencyContactPhone` | varchar(50) | YES |  |  |
| 47 | `PartialFacility` | varchar(50) | YES |  |  |
| 48 | `FacilityOtherEmployer` | varchar(50) | YES |  |  |
| 49 | `SurveyStatus` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_FacilityDate_Id` | no | NONCLUSTERED | `FacilityId`, `RunDate` | `Id` |
