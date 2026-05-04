# Table: `dbo.ViewSelectors`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `ViewId` | uniqueidentifier | NO |  |  |
| 3 | `FieldId` | uniqueidentifier | NO |  |  |
| 4 | `Sequence` | int | YES |  |  |
| 5 | `Operand` | varchar(20) | YES |  |  |
| 6 | `Boolean` | varchar(20) | YES |  |  |
| 7 | `Grouping` | varchar(20) | YES |  |  |
| 8 | `Constant` | bit | YES |  |  |
| 9 | `MatchData` | varchar(255) | YES |  |  |
| 10 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ViewSelectors_Views` | `ViewId` | [`dbo.Views.Id`](dbo.Views.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
