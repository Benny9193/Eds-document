# View: `dbo.BidMgrBidTradeCountiesView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CountyName` | varchar(50) | NO |  |  |
| 2 | `State` | char(2) | NO |  |  |
| 3 | `BidTradeCountyId` | int | NO |  |  |
| 4 | `BidTradeId` | int | NO |  |  |
| 5 | `CountyId` | int | NO |  |  |
| 6 | `StateId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidTradeCounties`](dbo.BidTradeCounties.md) | unresolved |
| [`dbo.Counties`](dbo.Counties.md) | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrBidTradeCountiesView]
AS
SELECT C.Name CountyName, C.State, B.BidTradeCountyId, B.BidTradeId, B.CountyId, C.StateId
FROM [EDS].[dbo].[BidTradeCounties] B with (nolock)
join [EDS].[dbo].[Counties] C ON C.CountyId = B.CountyId
```
