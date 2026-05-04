# Table: `dbo.DocTypeRetentionPolicy`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Enabled` | bit | NO | `((0))` |  |
| 2 | `PeriodBase` | decimal(8,4) | NO | `((1))` |  |
| 3 | `PeriodMultiplier` | int | NO | `((1))` |  |
| 4 | `PeriodDescription` | nvarchar(50) | NO | `('')` |  |
| 5 | `ProcessInterval` | nvarchar(50) | NO | `('')` |  |
| 6 | `ProcessStartDay` | int | NO | `((1))` |  |
| 7 | `ProcessStartHour` | int | NO | `((0))` |  |
| 8 | `DocTypeId` | uniqueidentifier | NO |  | YES |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeRetentionPolicy_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
