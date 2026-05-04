# Table: `dbo.RTK_MSDSDetail`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 151665

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_MSDSDetailID` | int | NO |  | YES |
| 2 | `RTK_ItemsID` | int | YES |  |  |
| 3 | `SeqNum` | int | YES |  |  |
| 4 | `RTK_CASFileId` | int | YES |  |  |
| 5 | `MixturePercent` | decimal(9,5) | YES |  |  |
| 6 | `LegacyCASRegNo` | varchar(12) | YES |  |  |
| 7 | `MixturePercentCode` | char(2) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_RTK_MSDSDetail` | no | NONCLUSTERED | `RTK_MSDSDetailID` |  |
| `IX_RTK_MSDSDetail_1` | no | NONCLUSTERED | `RTK_ItemsID`, `RTK_MSDSDetailID` |  |
