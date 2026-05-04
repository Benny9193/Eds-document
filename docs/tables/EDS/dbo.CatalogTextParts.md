# Table: `dbo.CatalogTextParts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 17179537

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Tokenized catalog text for full-text search (~17M rows). One row per text fragment per `CatalogText` entry with a `BaseOffset` so the original text can be reassembled. Rebuilt during catalog imports.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogTextPartId` | int | NO |  | YES |
| 2 | `CatalogTextId` | int | NO |  |  |
| 3 | `BaseOffset` | int | YES |  |  |
| 4 | `TextPart` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_CatalogTextId_OffsetPart` | no | NONCLUSTERED | `CatalogTextId` | `BaseOffset`, `TextPart` |
