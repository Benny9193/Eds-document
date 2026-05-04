# Table: `dbo.AlertObjects`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 51

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertObjectID` | int | NO |  | YES |
| 2 | `AlertID` | int | NO |  |  |
| 3 | `EntityUri` | nvarchar(400) | YES |  |  |
| 4 | `EntityType` | nvarchar(250) | YES |  |  |
| 5 | `EntityCaption` | nvarchar(1024) | YES |  |  |
| 6 | `EntityDetailsUrl` | nvarchar(max) | YES |  |  |
| 7 | `EntityNetObjectId` | nvarchar(400) | YES |  |  |
| 8 | `RelatedNodeCaption` | nvarchar(1024) | YES |  |  |
| 9 | `RelatedNodeUri` | nvarchar(400) | YES |  |  |
| 10 | `RelatedNodeId` | int | YES |  |  |
| 11 | `RelatedNodeDetailsUrl` | nvarchar(max) | YES |  |  |
| 12 | `RealEntityUri` | nvarchar(400) | YES |  |  |
| 13 | `RealEntityType` | nvarchar(250) | YES |  |  |
| 14 | `TriggeredCount` | bigint | YES |  |  |
| 15 | `LastTriggeredDateTime` | datetime | YES |  |  |
| 16 | `Context` | nvarchar(max) | YES |  |  |
| 17 | `AlertNote` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AlertActive`](dbo.AlertActive.md) | `AlertObjectID` | `AlertObjectID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertID` | no | NONCLUSTERED | `AlertID` |  |
| `IX_AlertID_EntityUri` | no | NONCLUSTERED | `AlertID`, `EntityUri` |  |
| `IX_EntityType` | no | NONCLUSTERED | `EntityType` |  |
