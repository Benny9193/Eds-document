# View: `dbo.vw_UserNotificationOptions`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NotificationOptionId` | int | NO |  |  |
| 2 | `Name` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `NotificationOptions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view [dbo].[vw_UserNotificationOptions] as
	SELECT	NotificationOptionId, Name
	FROM	NotificationOptions
```
