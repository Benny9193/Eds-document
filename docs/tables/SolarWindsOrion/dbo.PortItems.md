# Table: `dbo.PortItems`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 96

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  |  |
| 2 | `STPRecordID` | int | NO |  |  |
| 3 | `PortID` | int | NO |  |  |
| 4 | `DesignatedBridge` | nvarchar(50) | NO |  |  |
| 5 | `DesignatedPort` | nvarchar(50) | NO |  |  |
| 6 | `DesignatedRoot` | nvarchar(50) | NO |  |  |
| 7 | `IsEnabled` | bit | NO |  |  |
| 8 | `PortState` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PortItems_STPRecordID` | no | CLUSTERED | `STPRecordID` |  |
