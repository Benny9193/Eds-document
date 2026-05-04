# Table: `dbo.NotificationItems`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NotificationID` | uniqueidentifier | NO |  | YES |
| 2 | `Title` | nvarchar(4000) | NO |  |  |
| 3 | `Description` | nvarchar(max) | YES |  |  |
| 4 | `CreatedAt` | datetime | NO |  |  |
| 5 | `Ignored` | bit | NO | `((0))` |  |
| 6 | `NotificationTypeID` | uniqueidentifier | NO |  |  |
| 7 | `Url` | varchar(511) | YES |  |  |
| 8 | `AcknowledgedAt` | datetime | YES |  |  |
| 9 | `AcknowledgedBy` | nvarchar(100) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_NotificationItems_Type` | `NotificationTypeID` | [`dbo.NotificationItemTypes.TypeID`](dbo.NotificationItemTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.NotificationBlogs`](dbo.NotificationBlogs.md) | `BlogID` | `NotificationID` | NO_ACTION | NO_ACTION |
| [`dbo.NotificationMaintenanceRenewals`](dbo.NotificationMaintenanceRenewals.md) | `RenewalID` | `NotificationID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
