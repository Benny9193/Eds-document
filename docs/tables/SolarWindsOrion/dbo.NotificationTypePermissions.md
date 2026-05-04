# Table: `dbo.NotificationTypePermissions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 33

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NotificationTypeID` | uniqueidentifier | NO |  | YES |
| 2 | `RequiredRoleID` | int | NO |  | YES |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_NotificationTypePermissions_NotificationTypeID` | `NotificationTypeID` | [`dbo.NotificationItemTypes.TypeID`](dbo.NotificationItemTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
