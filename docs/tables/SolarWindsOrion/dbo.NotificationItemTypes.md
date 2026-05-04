# Table: `dbo.NotificationItemTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 31

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TypeID` | uniqueidentifier | NO |  | YES |
| 2 | `TypeName` | varchar(250) | NO |  |  |
| 3 | `Module` | varchar(250) | NO |  |  |
| 4 | `Caption` | nvarchar(1024) | YES |  |  |
| 5 | `DetailsUrl` | nvarchar(250) | YES |  |  |
| 6 | `DetailsCaption` | nvarchar(1024) | YES |  |  |
| 7 | `Icon` | varchar(250) | YES |  |  |
| 8 | `Description` | nvarchar(250) | YES |  |  |
| 9 | `DisplayAs` | varchar(50) | NO |  |  |
| 10 | `CustomDismissButtonText` | nvarchar(250) | YES |  |  |
| 11 | `HideDismissButton` | bit | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.NotificationItems`](dbo.NotificationItems.md) | `NotificationTypeID` | `TypeID` | NO_ACTION | NO_ACTION |
| [`dbo.NotificationTypePermissions`](dbo.NotificationTypePermissions.md) | `NotificationTypeID` | `TypeID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
