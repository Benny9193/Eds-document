# Table: `dbo.NodeNotes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeNoteID` | bigint | NO |  | YES |
| 2 | `Note` | nvarchar(max) | YES |  |  |
| 3 | `NodeID` | int | NO |  |  |
| 4 | `AccountID` | nvarchar(100) | YES |  |  |
| 5 | `TimeStamp` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeID` | no | NONCLUSTERED | `NodeID` |  |
