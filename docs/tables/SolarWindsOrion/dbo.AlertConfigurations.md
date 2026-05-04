# Table: `dbo.AlertConfigurations`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 49

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertID` | int | NO |  | YES |
| 2 | `AlertMessage` | nvarchar(max) | YES |  |  |
| 3 | `AlertRefID` | uniqueidentifier | NO | `(newid())` |  |
| 4 | `Name` | nvarchar(1024) | NO | `('')` |  |
| 5 | `Description` | nvarchar(max) | YES | `('')` |  |
| 6 | `Enabled` | bit | NO | `((0))` |  |
| 7 | `ObjectType` | nvarchar(50) | NO |  |  |
| 8 | `Frequency` | bigint | NO | `((60))` |  |
| 9 | `BlockUntil` | datetime | NO | `((0))` |  |
| 10 | `Trigger` | nvarchar(max) | NO |  |  |
| 11 | `Reset` | nvarchar(max) | YES |  |  |
| 12 | `Severity` | int | NO |  |  |
| 13 | `NotifyEnabled` | bit | NO | `((1))` |  |
| 14 | `NotificationSettings` | nvarchar(max) | YES |  |  |
| 15 | `LastEdit` | datetime2 | NO |  |  |
| 16 | `CreatedBy` | nvarchar(100) | YES |  |  |
| 17 | `Category` | nvarchar(255) | YES |  |  |
| 18 | `Canned` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertConfigurations_Category` | no | NONCLUSTERED | `Category` |  |
| `IX_AlertConfigurations_LastEdit` | no | NONCLUSTERED | `LastEdit`, `AlertID` |  |
