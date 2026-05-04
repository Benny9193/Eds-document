# Table: `dbo.DocumentVersionFullText`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 130037

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentVersionId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `FullText` | nvarchar(max) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentVersionFullText_DocumentVersionFile` | `DocumentVersionId` | [`dbo.DocumentVersionFile.DocumentVersionId`](dbo.DocumentVersionFile.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
