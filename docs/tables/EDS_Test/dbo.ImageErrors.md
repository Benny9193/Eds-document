# Table: `dbo.ImageErrors`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26727

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `imageErrorId` | bigint | NO |  | YES |
| 2 | `imageURL` | varchar(2048) | NO |  |  |
| 3 | `error` | varchar(max) | YES |  |  |
| 4 | `logDate` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NonClusteredIndex-20210628-091606` | no | NONCLUSTERED | `imageURL`, `imageErrorId` | `error`, `logDate` |
