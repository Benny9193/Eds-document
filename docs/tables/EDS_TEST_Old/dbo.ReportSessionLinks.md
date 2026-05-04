# Table: `dbo.ReportSessionLinks`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 51849818

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSLId` | int | NO |  | YES |
| 2 | `RSId` | int | YES |  |  |
| 3 | `IntId` | int | YES |  |  |
| 4 | `AuxId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `RS_RSLink` | no | NONCLUSTERED | `RSId`, `IntId` |  |
