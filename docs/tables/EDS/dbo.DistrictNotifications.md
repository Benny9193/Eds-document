# Table: `dbo.DistrictNotifications`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6087

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictNotificationId` | int | NO |  | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `NotificationType` | varchar(50) | NO |  |  |
| 4 | `CategoryId` | int | YES |  |  |
| 5 | `UserId` | int | YES |  |  |
| 6 | `Method` | varchar(50) | YES |  |  |
| 7 | `NotifyList` | varchar(255) | YES |  |  |
| 8 | `OtherNotify` | varchar(4096) | YES |  |  |
| 9 | `Modified` | datetime | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
