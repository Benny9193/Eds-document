# Table: `dbo.VendorPOtags`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | uniqueidentifier | NO | `(newsequentialid())` |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `ScreenId` | varchar(50) | NO |  |  |
| 4 | `TagId` | int | NO |  |  |
| 5 | `Tagged` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `MSmerge_index_2044234733` | YES | NONCLUSTERED | `SysId` |  |
