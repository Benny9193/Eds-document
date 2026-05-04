# View: `dbo.BidMgrBidTradeCountyTotals`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `BidTradeId` | int | NO |  |  |
| 4 | `CountyId` | int | NO |  |  |
| 5 | `Name` | varchar(50) | NO |  |  |
| 6 | `State` | char(2) | NO |  |  |
| 7 | `CountyTotalUsedInAward` | money | YES |  |  |
| 8 | `ActiveBidImport` | tinyint | YES |  |  |
| 9 | `ActiveCounty` | tinyint | YES |  |  |
| 10 | `BidImportCountyId` | int | NO |  |  |
| 11 | `ActiveBidAndCounty` | tinyint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidImportCounties`](dbo.BidImportCounties.md) | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.BidQuestions`](dbo.BidQuestions.md) | USER_TABLE |
| [`dbo.BidTradeCounties`](dbo.BidTradeCounties.md) | USER_TABLE |
| [`dbo.Counties`](dbo.Counties.md) | USER_TABLE |
| [`dbo.vw_BidAnswers`](dbo.vw_BidAnswers.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidMgrBidTradeLowBidder`](dbo.BidMgrBidTradeLowBidder.md) | VIEW |

## Definition

```sql
create   view  [dbo].[BidMgrBidTradeCountyTotals]
AS
SELECT BH.BidHeaderId, BA.BidImportId, BA.BidTradeId, BA.CountyId, C.Name, C.State, 
       SUM(CASE 
           WHEN ISNUMERIC(BA.BidAnswerExtended) = 1 AND IsNull(BQ.UseInCalculation, 0) = 1 AND IsNull(BQ.ExtdCalcTypeId,0) in (0,1,2,3,7,8) 
           THEN CAST(Isnull(BA.BidAnswerExtended, 0) as money) 
           ELSE 0 
           END) AS CountyTotalUsedInAward,
       BI.Active ActiveBidImport,
       bic.Active ActiveCounty,
       bic.BidImportCountyId,
       (BI.Active & bic.Active) ActiveBidAndCounty
FROM dbo.vw_BidAnswers  BA 
JOIN dbo.BidImports BI ON BI.BidImportId = BA.BidImportId
JOIN dbo.BidHeaders BH ON BH.BidHeaderId = BI.BidHeaderId
JOIN dbo.Counties AS C ON C.CountyId = BA.CountyId 
JOIN dbo.BidQuestions AS BQ ON BQ.BidQuestionId = BA.BidQuestionId
join dbo.BidTradeCounties btc on btc.BidTradeId = BA.BidTradeId             -- add status field 3-21-2012 kjm
                             and btc.CountyId = BA.CountyId
join dbo.BidImportCounties bic on bic.BidImportId = BI.BidImportId          -- add status field 3-21-2012 kjm
                              and bic.BidTradeCountyId = btc.BidTradeCountyId
--where  BH.BidHeaderId=4444 and BA.BidImportId=39157 and BA.BidTradeId=96 and BA.CountyId = 2
GROUP BY BH.BidHeaderId, BA.BidImportId, BA.BidTradeId, BA.CountyId, C.Name, C.State, BI.Active, bic.Active, bic.BidImportCountyId
--GROUP BY BH.BidHeaderId, BA.BidImportId, BA.BidTradeId, BA.CountyId, C.Name, C.State   -- changed 3-21-12 kjm
```
