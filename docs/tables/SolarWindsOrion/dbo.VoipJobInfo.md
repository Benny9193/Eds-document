# Table: `dbo.VoipJobInfo`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipJobInfoID` | int | NO |  | YES |
| 2 | `JobId` | uniqueidentifier | NO |  |  |
| 3 | `VoipJobTypeID` | smallint | NO |  |  |
| 4 | `Descriptor` | nvarchar(max) | YES |  |  |
| 5 | `IsJE2Job` | bit | YES | `((1))` |  |
| 6 | `NodeId` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipJobInfo_VoipJobTypeID` | `VoipJobTypeID` | [`dbo.VoipJobType.VoipJobTypeID`](dbo.VoipJobType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
