# Table: `dbo.DirectScan`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 15

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `QCardId` | int | NO | `((0))` |  |
| 3 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DirectScan_QCard` | `QCardId` | [`dbo.QCard.Id`](dbo.QCard.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DirectScan_CreatedUtc` | no | NONCLUSTERED | `CreatedUtc` |  |
| `IX_DirectScan_QCardId` | no | NONCLUSTERED | `QCardId` |  |
