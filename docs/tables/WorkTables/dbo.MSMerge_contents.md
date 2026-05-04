# Table: `dbo.MSMerge_contents`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4693660

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `tablenick` | int | NO |  |  |
| 2 | `rowguid` | uniqueidentifier | NO |  |  |
| 3 | `generation` | bigint | NO |  |  |
| 4 | `partchangegen` | bigint | YES |  |  |
| 5 | `lineage` | varbinary(311) | NO |  |  |
| 6 | `colv1` | varbinary(2953) | YES |  |  |
| 7 | `marker` | uniqueidentifier | YES |  |  |
| 8 | `logical_record_parent_rowguid` | uniqueidentifier | YES |  |  |
| 9 | `logical_record_lineage` | varbinary(311) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `nc4MSmerge_contents` | no | NONCLUSTERED | `rowguid` |  |
