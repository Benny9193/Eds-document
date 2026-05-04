# Table: `dbo.UITheme`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `Xml` | nvarchar(max) | NO | `('')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.UIThemeMember`](dbo.UIThemeMember.md) | `UIThemeId` | `Id` | CASCADE | CASCADE |
| [`dbo.UIThemeStorage`](dbo.UIThemeStorage.md) | `Id` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_UITheme_Name` | YES | NONCLUSTERED | `Name` |  |
