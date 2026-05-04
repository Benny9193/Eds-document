# Table: `dbo.Subscriptions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 126

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  | YES |
| 2 | `EndpointAddress` | nvarchar(4000) | NO |  |  |
| 3 | `Query` | nvarchar(max) | NO |  |  |
| 4 | `LastSuccessfulDelivery` | datetime | YES |  |  |
| 5 | `FailedDeliveryAttempts` | int | NO | `((0))` |  |
| 6 | `Description` | nvarchar(100) | YES |  |  |
| 7 | `AuthorizationToken` | nvarchar(100) | YES |  |  |
| 8 | `DataFormat` | nvarchar(50) | YES |  |  |
| 9 | `CredentialType` | nvarchar(50) | YES |  |  |
| 10 | `Binding` | nvarchar(50) | YES |  |  |
| 11 | `UserSubscriptionId` | uniqueidentifier | YES |  |  |
| 12 | `SwisInstance` | nvarchar(50) | YES |  |  |
| 13 | `TTL` | int | YES |  |  |
| 14 | `ReliableDelivery` | bit | NO | `((1))` |  |
| 15 | `Version` | tinyint | NO | `((1))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PendingNotifications`](dbo.PendingNotifications.md) | `Subscription_Id` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.SubscriptionTags`](dbo.SubscriptionTags.md) | `Subscription_Id` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Description_Subscriptions` | no | NONCLUSTERED | `Description` |  |
