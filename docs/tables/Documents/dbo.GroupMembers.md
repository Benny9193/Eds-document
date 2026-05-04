# Table: `dbo.GroupMembers`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `GroupId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |
| 4 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_GroupMembers_Groups` | `GroupId` | [`dbo.Groups.Id`](dbo.Groups.md) | NO_ACTION | NO_ACTION |
| `FK_GroupMembers_Users` | `UserId` | [`dbo.Users.Id`](dbo.Users.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
