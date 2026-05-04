# Table: `dbo.DocumentVersionAnnotations`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1649

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentVersionId` | uniqueidentifier | NO |  | YES |
| 2 | `Annotation` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentVersionAnnotations_DocumentVersion` | `DocumentVersionId` | [`dbo.DocumentVersion.Id`](dbo.DocumentVersion.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
