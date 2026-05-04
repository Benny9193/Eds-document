# Table: `dbo.RTK_Documents`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTKDocumentId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `FacilityId` | int | YES |  |  |
| 4 | `SchoolId` | int | YES |  |  |
| 5 | `UserId` | int | YES |  |  |
| 6 | `DocumentId` | uniqueidentifier | NO |  |  |
| 7 | `Description` | varchar(1024) | NO |  |  |
| 8 | `ValidFrom` | datetime | YES |  |  |
| 9 | `ValidUntil` | datetime | YES |  |  |
| 10 | `Created` | datetime | NO | `(getdate())` |  |
| 11 | `Updated` | datetime | YES |  |  |
| 12 | `Deleted` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
