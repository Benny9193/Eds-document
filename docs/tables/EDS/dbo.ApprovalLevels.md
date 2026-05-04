# Table: `dbo.ApprovalLevels`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ApprovalLevelId` | int | NO |  | YES |
| 2 | `Description` | varchar(50) | YES |  |  |
| 3 | `ApprovalLevel` | tinyint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PK_ApprovalLevelId` | YES | CLUSTERED | `ApprovalLevelId` |  |
| `SK_ApprovalLevel` | no | NONCLUSTERED | `ApprovalLevel` |  |
