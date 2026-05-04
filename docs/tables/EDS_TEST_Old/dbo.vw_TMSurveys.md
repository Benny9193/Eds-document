# View: `dbo.vw_TMSurveys`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `Submitter` | varchar(255) | YES |  |  |
| 4 | `Title` | varchar(255) | YES |  |  |
| 5 | `Email` | varchar(255) | YES |  |  |
| 6 | `Started` | datetime | YES |  |  |
| 7 | `Finished` | datetime | YES |  |  |
| 8 | `CountyId` | int | YES |  |  |
| 9 | `FirstTradeId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `TMSurvey` | USER_TABLE |
| `vw_TMCountyTrades` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view  [dbo].[vw_TMSurveys] as
select *, 
       (select ct.BidTradeId
	      from vw_TMCountyTrades ct
		 where ct.TMSurveyId = TMSurvey.TMSurveyId
		   and ct.PrevTradeId is null) FirstTradeId
  from TMSurvey with (nolock)
 where TMSurvey.Started > DATEADD(month,-16,getdate())
```
