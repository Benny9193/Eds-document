# Table: `dbo.WageRateScheduledIncrease`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `state` | nvarchar(1000) | NO |  |  |
| 3 | `county` | nvarchar(1000) | NO |  |  |
| 4 | `trade` | nvarchar(1000) | NO |  |  |
| 5 | `classification` | nvarchar(1000) | NO |  |  |
| 6 | `increaseDate` | datetime2 | NO |  |  |
| 7 | `newHourlyRate` | decimal(10,2) | NO |  |  |
| 8 | `newFringeRate` | decimal(10,2) | NO |  |  |
| 9 | `applied` | bit | NO | `((0))` |  |
| 10 | `appliedAt` | datetime2 | YES |  |  |
| 11 | `sourceDocumentId` | nvarchar(1000) | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `WageRateScheduledIncrease_increaseDate_applied_idx` | no | NONCLUSTERED | `increaseDate`, `applied` |  |
| `WageRateScheduledIncrease_state_county_trade_classification_idx` | no | NONCLUSTERED | `state`, `county`, `trade`, `classification` |  |
