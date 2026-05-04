# Table: `dbo.SavedSearch`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SearchId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Owner` | uniqueidentifier | YES |  |  |
| 3 | `SearchParameters` | nvarchar(max) | NO |  |  |
| 4 | `IsPublic` | bit | NO |  |  |
| 5 | `Title` | nvarchar(256) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_SavedSearch_User` | `Owner` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
