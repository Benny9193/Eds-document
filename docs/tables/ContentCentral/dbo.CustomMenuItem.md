# Table: `dbo.CustomMenuItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Title` | nvarchar(50) | NO | `('')` |  |
| 3 | `ParentMenu` | nvarchar(50) | NO | `('')` |  |
| 4 | `Type` | nvarchar(50) | NO | `('')` |  |
| 5 | `Enabled` | bit | NO | `((0))` |  |
| 6 | `XmlKeyValuePairs` | nvarchar(max) | NO | `('')` |  |
| 7 | `SubMenuName` | nvarchar(50) | NO |  |  |
| 8 | `Position` | nvarchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CustomMenuItemSource`](dbo.CustomMenuItemSource.md) | `CustomMenuItemId` | `Id` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
