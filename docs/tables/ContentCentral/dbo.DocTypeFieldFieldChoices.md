# Table: `dbo.DocTypeFieldFieldChoices`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 135

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocTypeFieldId` | uniqueidentifier | NO |  | YES |
| 2 | `FieldChoices` | nvarchar(max) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFieldFieldChoices_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
