# Table: `dbo.NotificationMaintenanceRenewals`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RenewalID` | uniqueidentifier | NO |  | YES |
| 2 | `ProductTag` | varchar(50) | NO |  |  |
| 3 | `DateReleased` | datetime | NO |  |  |
| 4 | `Version` | varchar(50) | NO | `('0.0')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_NotificationMaintenanceRenewals_RenewalID` | `RenewalID` | [`dbo.NotificationItems.NotificationID`](dbo.NotificationItems.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
