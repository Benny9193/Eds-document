# Table: `dbo.Units`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11218

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UnitId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `Code` | varchar(20) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Units_7_334676290__K1_3` | no | NONCLUSTERED | `UnitId` | `Code` |
| `SK_Code` | no | NONCLUSTERED | `Code` |  |
| `SKI_UnitId_Code` | YES | NONCLUSTERED | `UnitId` | `Code` |
