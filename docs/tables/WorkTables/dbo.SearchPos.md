# Table: `dbo.SearchPos`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3377469

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `RequestStart` | datetime | YES |  |  |
| 3 | `RequestEnd` | datetime | YES |  |  |
| 4 | `SessionId` | varchar(50) | YES |  |  |
| 5 | `URL` | varchar(1600) | YES |  |  |
| 6 | `Content` | varchar(128) | YES |  |  |
| 7 | `PriorSearch` | int | YES |  |  |
| 8 | `RequisitionId` | int | YES |  |  |
| 9 | `VendorId` | int | YES |  |  |
| 10 | `HeadingId` | bigint | YES |  |  |
| 11 | `DistrictId` | int | YES |  |  |
| 12 | `RequireAllTerms` | tinyint | YES |  |  |
| 13 | `Command` | varchar(50) | YES |  |  |
| 14 | `CategoryId` | int | YES |  |  |
| 15 | `Filter` | varchar(1500) | YES |  |  |
| 16 | `ItemId` | int | YES |  |  |
| 17 | `Quantity` | int | YES |  |  |
| 18 | `Position` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ski_CommandSessionRequisitionRequestStart_Id` | no | NONCLUSTERED | `Command`, `SessionId`, `RequisitionId`, `RequestStart` | `Id` |
