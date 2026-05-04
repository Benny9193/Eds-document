# Table: `dbo.UserMessage`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 35

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | NO |  |  |
| 3 | `ReceivedUtc` | datetime | NO | `(getutcdate())` |  |
| 4 | `FromName` | nvarchar(50) | NO | `('')` |  |
| 5 | `Subject` | nvarchar(256) | NO | `('')` |  |
| 6 | `BodyHtml` | nvarchar(max) | NO | `('')` |  |
| 7 | `IsRead` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_UserMessage_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_UserMessage_ReceivedUtc` | no | NONCLUSTERED | `ReceivedUtc` |  |
| `IX_UserMessage_UserId` | no | NONCLUSTERED | `UserId` |  |
