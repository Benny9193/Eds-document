# Table: `dbo.Substances`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ProductId` | uniqueidentifier | NO |  |  |
| 3 | `SubstanceNumber` | varchar(50) | NO |  |  |
| 4 | `HazardousChemicalName` | varchar(255) | NO |  |  |
| 5 | `CasNumber` | varchar(50) | YES |  |  |
| 6 | `DOTNumber` | varchar(50) | YES |  |  |
| 7 | `Mixture` | varchar(50) | YES |  |  |
| 8 | `SpecialHHCode` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
