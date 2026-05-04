# Table: `dbo.RTK_CASFile`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7881

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_CASFileId` | int | NO |  | YES |
| 2 | `CASRegNo` | varchar(11) | NO |  |  |
| 3 | `CASChemicalName` | varchar(50) | YES |  |  |
| 4 | `DOT_Id` | char(4) | YES |  |  |
| 5 | `SubstanceNo` | char(4) | YES |  |  |
| 6 | `TradeSecretNo` | varchar(20) | YES |  |  |
| 7 | `LegacyCASRegNo` | varchar(12) | YES |  |  |
| 8 | `CompoundContaining` | varchar(11) | YES |  |  |
| 9 | `SpecialHealthHazard` | tinyint | YES |  |  |
| 10 | `Carcinogen` | tinyint | YES |  |  |
| 11 | `Mutagen` | tinyint | YES |  |  |
| 12 | `Teratogen` | tinyint | YES |  |  |
| 13 | `Corrosive` | tinyint | YES |  |  |
| 14 | `F4_Flammable4th` | tinyint | YES |  |  |
| 15 | `F3_Flammable3rd` | tinyint | YES |  |  |
| 16 | `R4_Reactive4th` | tinyint | YES |  |  |
| 17 | `R3_Reactive3rd` | tinyint | YES |  |  |
| 18 | `R2_Reactive2nd` | tinyint | YES |  |  |
| 19 | `SpecialHealthHazardCodes` | varchar(30) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
