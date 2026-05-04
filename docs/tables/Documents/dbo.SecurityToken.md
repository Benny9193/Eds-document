# Table: `dbo.SecurityToken`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserOrGroupId` | uniqueidentifier | NO |  |  |
| 3 | `ObjectId` | uniqueidentifier | NO |  |  |
| 4 | `AccessTypeId` | uniqueidentifier | NO |  |  |
| 5 | `Access` | tinyint | YES |  |  |
| 6 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_SecurityToken_AccessTypes` | `AccessTypeId` | [`dbo.AccessTypes.Id`](dbo.AccessTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
