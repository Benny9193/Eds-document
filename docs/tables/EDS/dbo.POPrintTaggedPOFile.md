# Table: `dbo.POPrintTaggedPOFile`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 121202

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Staging table for the tagged-PO print pipeline (~121K rows). Holds the (district, PO, account, budget, bid-source) fields for each PO line being rendered into the printable, tagged PO file format. Working set — populated and consumed by print jobs.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSID` | int | YES |  |  |
| 2 | `DISTRICTID` | int | YES |  |  |
| 3 | `PONUMBER` | varchar(24) | YES |  |  |
| 4 | `POID` | int | YES |  |  |
| 5 | `POOrderSeq` | int | YES |  |  |
| 6 | `AccountId` | int | YES |  |  |
| 7 | `AwardsBidHeaderId` | int | YES |  |  |
| 8 | `BudgetName` | varchar(30) | YES |  |  |
| 9 | `BudgetId` | int | YES |  |  |
| 10 | `SysId` | int | NO |  | YES |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_RSDistrictPOOrder` | no | NONCLUSTERED | `RSID`, `DISTRICTID`, `POOrderSeq` | `PONUMBER`, `AccountId`, `AwardsBidHeaderId`, `BudgetId` |
| `TPF_BYRSID` | no | NONCLUSTERED | `RSID` |  |
