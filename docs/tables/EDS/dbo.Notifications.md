# Table: `dbo.Notifications`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 720

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NotificationId` | bigint | NO |  |  |
| 2 | `UserId` | bigint | NO |  |  |
| 3 | `Email` | varchar(300) | NO |  |  |
| 4 | `DateSent` | datetime | YES |  |  |
| 5 | `NotificationType` | varchar(50) | YES |  |  |
| 6 | `EmailBlastId` | int | YES |  |  |
| 7 | `EmailHTMLTable` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PK_Notifications` | YES | CLUSTERED | `NotificationId` |  |
