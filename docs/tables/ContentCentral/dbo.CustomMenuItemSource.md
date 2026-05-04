# Table: `dbo.CustomMenuItemSource`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `CustomMenuItemId` | uniqueidentifier | NO |  |  |
| 3 | `Type` | nvarchar(50) | NO | `('')` |  |
| 4 | `StaticValue` | nvarchar(256) | YES |  |  |
| 5 | `GlobalDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 6 | `ItemOrder` | int | NO | `((1))` |  |
| 7 | `ExternalApplicationId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CustomMenuItemSource_CustomMenuItem` | `CustomMenuItemId` | [`dbo.CustomMenuItem.Id`](dbo.CustomMenuItem.md) | CASCADE | CASCADE |
| `FK_CustomMenuItemSource_DocTypeField` | `GlobalDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |
| `FK_CustomMenuItemSource_ExternalApplication` | `ExternalApplicationId` | [`dbo.ExternalApplication.Id`](dbo.ExternalApplication.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CustomMenuItemSource_CustomMenuItemId` | no | NONCLUSTERED | `CustomMenuItemId` |  |
| `IX_CustomMenuItemSource_GlobalDocTypeFieldId` | no | NONCLUSTERED | `GlobalDocTypeFieldId` |  |
