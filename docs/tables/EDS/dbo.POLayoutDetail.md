# Table: `dbo.POLayoutDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6856

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-PO-layout field placement (~6.9K rows). For each `POLayoutId`, defines the position, size, wrap, literal text, optional embedded image (varbinary), and `PrintWhen` rule for each `POLayoutFieldId`. Drives the print rendering of POs in the chosen template.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POLayoutDetailId` | int | NO |  | YES |
| 2 | `POLayoutId` | int | NO |  |  |
| 3 | `POLayoutFieldId` | int | YES |  |  |
| 4 | `VerticalPos` | int | YES |  |  |
| 5 | `HorizontalPos` | int | YES |  |  |
| 6 | `MaxWidth` | int | YES |  |  |
| 7 | `MaxHeight` | int | YES |  |  |
| 8 | `WrapAround` | tinyint | YES |  |  |
| 9 | `Literal` | varchar(512) | YES |  |  |
| 10 | `PrintWhen` | tinyint | YES |  |  |
| 11 | `Image` | varbinary(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
