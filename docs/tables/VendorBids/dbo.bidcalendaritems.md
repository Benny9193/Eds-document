# Table: `dbo.bidcalendaritems`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1664090

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `calendaritemid` | int | NO |  | YES |
| 2 | `calendarId` | int | NO |  |  |
| 3 | `itemId` | int | NO |  |  |
| 4 | `itemcode` | varchar(50) | YES |  |  |
| 5 | `units` | varchar(16) | YES |  |  |
| 6 | `quantity` | int | YES |  |  |
| 7 | `shiplocations` | int | YES |  |  |
| 8 | `sortseq` | varchar(64) | YES |  |  |
| 9 | `description` | varchar(4096) | YES |  |  |
| 10 | `heading` | varchar(50) | YES |  |  |
| 11 | `districtname` | varchar(50) | YES |  |  |
| 12 | `crossreftext` | varchar(1024) | YES |  |  |
| 13 | `bidrequestitemid` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_Calendar_ItemIdItemCodeEtc` | no | NONCLUSTERED | `calendarId` | `itemId`, `itemcode`, `units`, `quantity`, `shiplocations`, `sortseq`, `description`, `heading`, `districtname`, `crossreftext`, `bidrequestitemid` |
