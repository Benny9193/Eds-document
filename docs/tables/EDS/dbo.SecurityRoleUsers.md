# Table: `dbo.SecurityRoleUsers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 364867

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SecurityRoleUserId` | int | NO |  | YES |
| 2 | `SecurityRoleId` | int | NO |  |  |
| 3 | `UserId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_UserId_UserRoleIdRoleId` | no | NONCLUSTERED | `UserId` | `SecurityRoleUserId`, `SecurityRoleId` |
