# Table: `dbo.VoipJobType`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipJobTypeID` | smallint | NO |  | YES |
| 2 | `Code` | nvarchar(100) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipJobInfo`](dbo.VoipJobInfo.md) | `VoipJobTypeID` | `VoipJobTypeID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UI_VoipJobType_Code` | YES | NONCLUSTERED | `Code` |  |
| `UI_VoipJobType_VoipJobTypeID` | YES | NONCLUSTERED | `VoipJobTypeID` |  |
