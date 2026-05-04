# Table: `dbo.LoginSession`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 17

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | NO |  |  |
| 3 | `IPAddress` | nvarchar(50) | NO | `('')` |  |
| 4 | `AspNetSessionId` | nvarchar(50) | NO | `('')` |  |
| 5 | `LoginUtc` | datetime | NO | `(getutcdate())` |  |
| 6 | `LastAccessedUtc` | datetime | NO | `(getutcdate())` |  |
| 7 | `IsProcessingPage` | bit | NO | `((0))` |  |
| 8 | `IsLoggedOutForOverLimit` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_LoginSession_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_LoginSession_AspNetSessionId` | YES | NONCLUSTERED | `AspNetSessionId` |  |
| `IX_LoginSession_UserId` | no | NONCLUSTERED | `UserId` |  |
