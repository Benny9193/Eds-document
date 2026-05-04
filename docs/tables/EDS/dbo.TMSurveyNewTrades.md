# Table: `dbo.TMSurveyNewTrades`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 89

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Free-text 'new trade to consider' entries on a `TMSurvey` (~89 rows). Captures suggested trade name and description from districts requesting new trade categories.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyNewTradeId` | int | NO |  | YES |
| 2 | `TMSurveyId` | int | NO |  |  |
| 3 | `TradeName` | varchar(255) | YES |  |  |
| 4 | `TradeDescription` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
