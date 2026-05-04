# Table: `dbo.CatalogText`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 112799

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-page extracted text for each catalog (~113K rows). One row per (`CatalogId`, `PageNbr`) with the original `BaseFileName` and OCR / extracted `TextData`. Powers full-text search; tokenized form lives in `CatalogTextParts`.

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
