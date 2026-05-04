# Table: `dbo.CatalogText`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 112799

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogTextId` | int | NO |  | YES |
| 2 | `CatalogId` | int | NO |  |  |
| 3 | `PageNbr` | int | NO |  |  |
| 4 | `BaseFileName` | varchar(255) | NO |  |  |
| 5 | `TextData` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_CatalogId_PageText` | no | NONCLUSTERED | `CatalogId` | `PageNbr`, `TextData` |
