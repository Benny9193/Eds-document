# Table: `dbo.Containers`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContainerID` | int | NO |  | YES |
| 2 | `Owner` | nvarchar(1024) | NO |  |  |
| 3 | `StatusCalculatorID` | smallint | NO |  |  |
| 4 | `Name` | nvarchar(1024) | NO |  |  |
| 5 | `Frequency` | int | NO |  |  |
| 6 | `Status` | int | NO |  |  |
| 7 | `Description` | nvarchar(max) | NO |  |  |
| 8 | `IsDeleted` | bit | NO |  |  |
| 9 | `LastChanged` | datetime | NO |  |  |
| 10 | `PollingEnabled` | bit | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Containers_StatusCalculators` | `StatusCalculatorID` | [`dbo.StatusCalculators.StatusCalculatorID`](dbo.StatusCalculators.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ContainerMemberDefinitions`](dbo.ContainerMemberDefinitions.md) | `ContainerID` | `ContainerID` | NO_ACTION | NO_ACTION |
| [`dbo.ContainerMemberSnapshots`](dbo.ContainerMemberSnapshots.md) | `ContainerID` | `ContainerID` | NO_ACTION | NO_ACTION |
| [`dbo.ContainerStatus_Daily`](dbo.ContainerStatus_Daily.md) | `ContainerID` | `ContainerID` | NO_ACTION | NO_ACTION |
| [`dbo.ContainerStatus_Detail`](dbo.ContainerStatus_Detail.md) | `ContainerID` | `ContainerID` | NO_ACTION | NO_ACTION |
| [`dbo.ContainerStatus_Hourly`](dbo.ContainerStatus_Hourly.md) | `ContainerID` | `ContainerID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
