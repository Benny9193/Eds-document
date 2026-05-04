# Table: `dbo.ViewState`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `('')` | YES |
| 2 | `CreatedUtcTicks` | bigint | NO | `((0))` |  |
| 3 | `ViewStateData` | nvarchar(max) | NO | `('')` |  |
| 4 | `HashCode` | bigint | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ViewState_CreatedUtcTicks` | no | NONCLUSTERED | `CreatedUtcTicks` |  |
| `IX_ViewState_HashCode` | no | NONCLUSTERED | `HashCode` |  |
