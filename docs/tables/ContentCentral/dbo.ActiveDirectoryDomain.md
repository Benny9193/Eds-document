# Table: `dbo.ActiveDirectoryDomain`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Fqdn` | nvarchar(128) | NO | `('')` |  |
| 3 | `FqdnUsername` | nvarchar(50) | NO | `('')` |  |
| 4 | `FqdnPassword` | nvarchar(256) | NO | `('')` |  |
| 5 | `Enabled` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.User`](dbo.User.md) | `ActiveDirectoryDomainId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ActiveDirectoryDomain_Fqdn` | YES | NONCLUSTERED | `Fqdn` |  |
