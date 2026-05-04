# Table: `dbo.POStatus`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 405189

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POStatusId` | int | NO |  | YES |
| 2 | `POId` | int | NO |  |  |
| 3 | `StatusDate` | datetime | NO | `(getdate())` |  |
| 4 | `StatusId` | int | NO |  |  |
| 5 | `UserId` | int | YES |  |  |
| 6 | `Comments` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_PO_Status` | no | NONCLUSTERED | `POId`, `StatusDate` | `StatusId`, `UserId` |
