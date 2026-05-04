# Table: `dbo.Surveys`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1978

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `FacilityId` | uniqueidentifier | NO |  |  |
| 3 | `LastRunDate` | datetime | NO | `(getdate())` |  |
| 4 | `FacilityNumber` | varchar(50) | YES |  |  |
| 5 | `Year` | int | YES |  |  |
| 6 | `SurveyNumber` | int | YES |  |  |
| 7 | `addLink` | varchar(255) | YES |  |  |
| 8 | `createdBy` | varchar(50) | YES |  |  |
| 9 | `dateCreated` | datetime | YES |  |  |
| 10 | `dateLastChanged` | datetime | YES |  |  |
| 11 | `editLink` | varchar(255) | YES |  |  |
| 12 | `lastChangedBy` | varchar(50) | YES |  |  |
| 13 | `status` | varchar(50) | YES |  |  |
| 14 | `viewLink` | varchar(255) | YES |  |  |
| 15 | `SIC` | varchar(50) | YES |  |  |
| 16 | `CoMun` | varchar(50) | YES |  |  |
| 17 | `DueDate` | varchar(50) | YES |  |  |
| 18 | `FacilityMailingAddress` | varchar(50) | YES |  |  |
| 19 | `FacilityLocation` | varchar(50) | YES |  |  |
| 20 | `FacilityEmployees` | varchar(50) | YES |  |  |
| 21 | `FacilityExposedEmployees` | varchar(50) | YES |  |  |
| 22 | `FacilityType` | varchar(50) | YES |  |  |
| 23 | `HazardousSubstances` | varchar(50) | YES |  |  |
| 24 | `UnknownIngredients` | varchar(50) | YES |  |  |
| 25 | `OtherNatureOfOperations` | varchar(50) | YES |  |  |
| 26 | `EmployerEmailAddress` | varchar(50) | YES |  |  |
| 27 | `CertifierName` | varchar(50) | YES |  |  |
| 28 | `CertifierTitle` | varchar(50) | YES |  |  |
| 29 | `DateCertified` | varchar(50) | YES |  |  |
| 30 | `CertifiedSignature` | varchar(50) | YES |  |  |
| 31 | `CertifierPhone` | varchar(50) | YES |  |  |
| 32 | `CertifierExtension` | varchar(50) | YES |  |  |
| 33 | `PolicePhone` | varchar(50) | YES |  |  |
| 34 | `PoliceName` | varchar(50) | YES |  |  |
| 35 | `PoliceAddress` | varchar(50) | YES |  |  |
| 36 | `PoliceCity` | varchar(50) | YES |  |  |
| 37 | `PoliceState` | varchar(50) | YES |  |  |
| 38 | `PoliceZip` | varchar(50) | YES |  |  |
| 39 | `FirePhone` | varchar(50) | YES |  |  |
| 40 | `FireName` | varchar(50) | YES |  |  |
| 41 | `FireAddress` | varchar(50) | YES |  |  |
| 42 | `FireCity` | varchar(50) | YES |  |  |
| 43 | `FireState` | varchar(50) | YES |  |  |
| 44 | `FireZip` | varchar(50) | YES |  |  |
| 45 | `UnionRepresentation` | varchar(50) | YES |  |  |
| 46 | `UnionRepName` | varchar(50) | YES |  |  |
| 47 | `UnionName` | varchar(50) | YES |  |  |
| 48 | `UnionLocalNumber` | varchar(50) | YES |  |  |
| 49 | `UnionPhone` | varchar(50) | YES |  |  |
| 50 | `UnionAddress` | varchar(50) | YES |  |  |
| 51 | `UnionCity` | varchar(50) | YES |  |  |
| 52 | `UnionState` | varchar(50) | YES |  |  |
| 53 | `UnionZip` | varchar(50) | YES |  |  |
| 54 | `AdditionalUnions` | varchar(50) | YES |  |  |
| 55 | `EmergencyContactName` | varchar(50) | YES |  |  |
| 56 | `EmergencyContactPhone` | varchar(50) | YES |  |  |
| 57 | `PartialFacility` | varchar(50) | YES |  |  |
| 58 | `FacilityOtherEmployer` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
