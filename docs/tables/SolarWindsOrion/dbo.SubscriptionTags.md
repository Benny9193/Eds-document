# Table: `dbo.SubscriptionTags`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Subscription_Id` | uniqueidentifier | NO |  | YES |
| 2 | `Tag` | nvarchar(200) | NO |  | YES |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Subscription_SubscriptionTags` | `Subscription_Id` | [`dbo.Subscriptions.Id`](dbo.Subscriptions.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
