# Table: `dbo.VoipCCMStats_DetailData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMStats_DetailID` | int | NO |  |  |
| 3 | `VoipCCMStatsTypeID` | int | NO |  |  |
| 4 | `Value` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMStats_DetailData1` | `VoipCCMStats_DetailID` | [`dbo.VoipCCMStats_Detail.ID`](dbo.VoipCCMStats_Detail.md) | NO_ACTION | NO_ACTION |
| `FK_VoipCCMStats_DetailData2` | `VoipCCMStatsTypeID` | [`dbo.VoipCCMStatsType.ID`](dbo.VoipCCMStatsType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMStats_DetailData1` | no | NONCLUSTERED | `VoipCCMStats_DetailID` |  |
| `NI_VoipCCMStats_DetailData2` | no | NONCLUSTERED | `VoipCCMStatsTypeID` |  |
