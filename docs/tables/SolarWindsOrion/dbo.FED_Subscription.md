# Table: `dbo.FED_Subscription`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `InstanceSiteId` | int | NO |  | YES |
| 2 | `EntityTypeName` | nvarchar(100) | NO |  | YES |
| 3 | `SubscriptionDate` | smalldatetime | NO |  |  |
| 4 | `StorageName` | nvarchar(100) | NO |  |  |
| 5 | `IsRelationship` | bit | NO |  |  |
| 6 | `SubscriptionUri` | nvarchar(250) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
