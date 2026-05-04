# Table: `dbo.PendingNotifications`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Subscription_Id` | uniqueidentifier | NO |  |  |
| 3 | `IndicationType` | nvarchar(100) | NO |  |  |
| 4 | `IndicationProperties` | nvarchar(max) | NO |  |  |
| 5 | `SourceInstanceProperties` | nvarchar(max) | YES |  |  |
| 6 | `Created` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_SubscriptionPendingNotification` | `Subscription_Id` | [`dbo.Subscriptions.Id`](dbo.Subscriptions.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Created_PendingNotifications` | no | NONCLUSTERED | `Created` |  |
| `IX_FK_SubscriptionPendingNotification` | no | NONCLUSTERED | `Subscription_Id` |  |
