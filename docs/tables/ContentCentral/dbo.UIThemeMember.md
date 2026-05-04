# Table: `dbo.UIThemeMember`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | uniqueidentifier | NO |  | YES |
| 2 | `UIThemeId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_UIThemeMember_UITheme` | `UIThemeId` | [`dbo.UITheme.Id`](dbo.UITheme.md) | CASCADE | CASCADE |
| `FK_UIThemeMember_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_UIThemeMember_UIThemeId` | no | NONCLUSTERED | `UIThemeId` |  |
