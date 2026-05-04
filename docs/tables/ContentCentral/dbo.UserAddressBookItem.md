# Table: `dbo.UserAddressBookItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | NO |  |  |
| 3 | `Email` | nvarchar(256) | NO | `('')` |  |
| 4 | `Fax` | nvarchar(50) | NO | `('')` |  |
| 5 | `ContactName` | nvarchar(50) | NO | `('')` |  |
| 6 | `CompanyName` | nvarchar(50) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_UserAddressBookItem_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_UserAddressBookItem_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_UserAddressBookItem_UserId_ContactName` | YES | NONCLUSTERED | `UserId`, `ContactName` |  |
