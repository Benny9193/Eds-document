# Table: `dbo.RTK_Sites`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 823

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_SitesId` | int | NO |  | YES |
| 2 | `Active` | int | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `NJEIN` | varchar(20) | YES |  |  |
| 5 | `ExposedEmployeesCount` | int | YES |  |  |
| 6 | `CoMunCode` | varchar(5) | YES |  |  |
| 7 | `FacilityName` | varchar(50) | YES |  |  |
| 8 | `MailingAddress1` | varchar(100) | YES |  |  |
| 9 | `MailingAddress2` | varchar(100) | YES |  |  |
| 10 | `MailingAddress3` | varchar(100) | YES |  |  |
| 11 | `MailingAddress4` | varchar(100) | YES |  |  |
| 12 | `FacilityLocation1` | varchar(100) | YES |  |  |
| 13 | `FacilityLocation2` | varchar(100) | YES |  |  |
| 14 | `FacilityLocation3` | varchar(100) | YES |  |  |
| 15 | `FacilityLocation4` | varchar(100) | YES |  |  |
| 16 | `ChemicalInventoryStatus` | tinyint | YES |  |  |
| 17 | `FacilityEmergencyContact` | varchar(100) | YES |  |  |
| 18 | `EmergencyPhone` | varchar(50) | YES |  |  |
| 19 | `ResponsibleOfficial` | varchar(100) | YES |  |  |
| 20 | `TitleResponsibleOfficial` | varchar(100) | YES |  |  |
| 21 | `EmailResponsibleOfficial` | varchar(200) | YES |  |  |
| 22 | `PhoneResponsibleOfficial` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
