# Table: `dbo.GroupMembership`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 44

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `GroupId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_GroupMembership_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | CASCADE | CASCADE |
| `FK_GroupMembership_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_GroupMembership_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_GroupMembership_GroupId_UserId` | YES | NONCLUSTERED | `GroupId`, `UserId` |  |
| `IX_GroupMembership_UserId` | no | NONCLUSTERED | `UserId` |  |
