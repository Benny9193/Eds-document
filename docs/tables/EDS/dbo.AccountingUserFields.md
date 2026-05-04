# Table: `dbo.AccountingUserFields`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 80

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-district accounting-format field definitions (~80 rows). For an `AccountingFormatId`, defines the position, name, and required-flag of each user-supplied field that makes up a district's account string (e.g. fund/function/object/location segments).

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AccountingUserFieldId` | int | NO |  | YES |
| 2 | `AccountingFormatId` | int | NO |  |  |
| 3 | `DistrictId` | int | NO |  |  |
| 4 | `FieldPos` | int | YES |  |  |
| 5 | `FieldName` | varchar(50) | YES |  |  |
| 6 | `RequiredField` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
