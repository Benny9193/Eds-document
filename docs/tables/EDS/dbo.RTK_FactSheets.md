# Table: `dbo.RTK_FactSheets`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2459

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

NJ Right-To-Know Hazardous Substance Fact Sheets (~2.5K rows). Per-substance reference — `CommonName`, `ChemicalName`, `CASNumber`, `DOTNumber`, `HazardCodes`. Soft-deleted via `Deleted` timestamp.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTKFactSheetId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `SubstanceNumber` | int | NO |  |  |
| 3 | `CommonName` | varchar(255) | NO |  |  |
| 4 | `ChemicalName` | varchar(255) | NO |  |  |
| 5 | `CASNumber` | varchar(20) | YES |  |  |
| 6 | `DOTNumber` | varchar(10) | YES |  |  |
| 7 | `HazardCodes` | varchar(50) | YES |  |  |
| 8 | `Created` | datetime | NO | `(getdate())` |  |
| 9 | `Updated` | datetime | NO | `(getdate())` |  |
| 10 | `Deleted` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
