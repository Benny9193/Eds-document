# Table: `dbo.InstructionBookContents`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 31

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `IBCId` | int | NO |  | YES |
| 2 | `IBTypeId` | int | NO |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `Priority` | int | YES |  |  |
| 5 | `Title` | varchar(255) | YES |  |  |
| 6 | `TitleInTOC` | tinyint | YES |  |  |
| 7 | `Body` | varchar(4096) | YES |  |  |
| 8 | `HeaderAttributes` | int | YES |  |  |
| 9 | `HTMLBody` | varchar(max) | YES |  |  |
| 10 | `SubReportName` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
