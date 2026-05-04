# Table: `dbo.DocTypeDefaultAdminSearchField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `FieldOrder` | int | NO | `((0))` |  |
| 3 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeDefaultAdminSearchField_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeDefaultAdminSearchField_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
