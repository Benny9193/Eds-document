# View: `dbo.vw_DistrictStates_BidMgr`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `StateCode` | varchar(2) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.District`](dbo.District.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_DistrictStates_BidMgr]
AS
SELECT     UPPER(State) AS StateCode
FROM         dbo.District
WHERE     (UPPER(ISNULL(State, '')) NOT IN ('', 'FL'))
GROUP BY State
```
