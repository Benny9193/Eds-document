# Table: `EDSIQWebUser.cxml_migrations`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 7

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `version` | int | NO |  | YES |
| 2 | `name` | nvarchar(255) | NO |  |  |
| 3 | `applied_at` | datetime2 | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
