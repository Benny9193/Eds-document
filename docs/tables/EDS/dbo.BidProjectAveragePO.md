# View: `dbo.BidProjectAveragePO`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorCode` | varchar(16) | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `VendorInfo` | varchar(376) | YES |  |  |
| 6 | `Items` | int | NO |  |  |
| 7 | `Total` | money | NO |  |  |
| 8 | `POCount` | int | NO |  |  |
| 9 | `TotalQuantity` | int | NO |  |  |
| 10 | `AvgPO` | money | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.uf_BidProjectAveragePOReq` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidProjectAveragePO] as
select * from dbo.uf_BidProjectAveragePOReq(705,94554)
```
