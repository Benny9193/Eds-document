# Table: `dbo.DocTypeFieldSpentNumericValue`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |
| 3 | `SpentValue` | bigint | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFieldSpentNumericValue_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeFieldSpentNumericValue_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_DocTypeFieldSpentNumericValue_DocTypeFieldId_SpentValue` | YES | NONCLUSTERED | `DocTypeFieldId`, `SpentValue` |  |
