# Table: `dbo.Thresholds`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `InstanceId` | int | NO |  |  |
| 3 | `ThresholdType` | int | NO |  |  |
| 4 | `ThresholdNameId` | int | NO |  |  |
| 5 | `ThresholdOperator` | int | NO |  |  |
| 6 | `Warning` | float | YES |  |  |
| 7 | `Critical` | float | YES |  |  |
| 8 | `WarningFormula` | nvarchar(max) | YES |  |  |
| 9 | `CriticalFormula` | nvarchar(max) | YES |  |  |
| 10 | `BaselineFrom` | datetime | YES |  |  |
| 11 | `BaselineTo` | datetime | YES |  |  |
| 12 | `BaselineApplied` | datetime | YES |  |  |
| 13 | `BaselineApplyError` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Thresholds_ThresholdsNames` | `ThresholdNameId` | [`dbo.ThresholdsNames.Id`](dbo.ThresholdsNames.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Thresholds` | no | CLUSTERED | `ThresholdNameId`, `InstanceId` |  |
