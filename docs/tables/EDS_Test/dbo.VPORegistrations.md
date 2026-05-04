# Table: `dbo.VPORegistrations`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VPORegistrationId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `VPOUserCode` | varchar(50) | NO |  |  |
| 4 | `VPOPassword` | varchar(50) | NO |  |  |
| 5 | `VPOLastChange` | datetime | NO | `(getdate())` |  |
| 6 | `VPOEMail` | varchar(255) | YES |  |  |
| 7 | `VPOName` | varchar(50) | YES |  |  |
| 8 | `VPOPhone` | varchar(50) | YES |  |  |
| 9 | `VPOAllowedRetries` | int | NO | `((5))` |  |
| 10 | `VPOParentId` | int | YES |  |  |
| 11 | `VPOCanCreateUser` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
