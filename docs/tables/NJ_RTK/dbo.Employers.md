# Table: `dbo.Employers`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 62

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `EIN` | varchar(50) | NO |  |  |
| 3 | `Name` | varchar(50) | NO |  |  |
| 4 | `ListLink` | varchar(255) | NO |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `lastRefreshed` | datetime | NO | `(getdate())` |  |
| 7 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_EIN_Id` | no | NONCLUSTERED | `EIN` | `Id` |
