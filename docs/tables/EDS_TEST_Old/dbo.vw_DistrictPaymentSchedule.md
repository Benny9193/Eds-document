# View: `dbo.vw_DistrictPaymentSchedule`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | int | NO |  |  |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `BudgetId` | int | YES |  |  |
| 4 | `DistrictName` | varchar(50) | YES |  |  |
| 5 | `DistrictNameAndAddress` | varchar(1024) | YES |  |  |
| 6 | `DearMsg` | varchar(1024) | YES |  |  |
| 7 | `LMFeeMsg` | varchar(1024) | YES |  |  |
| 8 | `RTKFeeMsg` | varchar(1024) | YES |  |  |
| 9 | `ExplainationMsg` | varchar(1024) | YES |  |  |
| 10 | `AcknowledgeMsg` | varchar(1024) | YES |  |  |
| 11 | `ProgramName` | varchar(50) | YES |  |  |
| 12 | `BudgetYear` | varchar(50) | YES |  |  |
| 13 | `OrderYear` | varchar(50) | YES |  |  |
| 14 | `CDateHeader` | varchar(50) | YES |  |  |
| 15 | `LMAmountHeader` | varchar(50) | YES |  |  |
| 16 | `RTKAmountHeader` | varchar(50) | YES |  |  |
| 17 | `TotalLMCharges` | money | YES |  |  |
| 18 | `TotalLMChargesStr` | varchar(20) | YES |  |  |
| 19 | `TotalRTKCharges` | money | YES |  |  |
| 20 | `TotalRTKChargesStr` | varchar(20) | YES |  |  |
| 21 | `CDate` | datetime | YES |  |  |
| 22 | `CDateStr` | varchar(20) | YES |  |  |
| 23 | `ChargeId` | int | YES |  |  |
| 24 | `LMAmount` | money | YES |  |  |
| 25 | `LMAmountStr` | varchar(20) | YES |  |  |
| 26 | `RTKAmount` | money | YES |  |  |
| 27 | `RTKAmountStr` | varchar(20) | YES |  |  |
| 28 | `RTK` | int | YES |  |  |
| 29 | `AccountingDistrictCode` | varchar(50) | YES |  |  |
| 30 | `LMChargeCode` | varchar(50) | YES |  |  |
| 31 | `RTKChargeCode` | varchar(50) | YES |  |  |
| 32 | `Street1` | varchar(50) | YES |  |  |
| 33 | `City` | varchar(50) | YES |  |  |
| 34 | `State` | varchar(10) | YES |  |  |
| 35 | `Zipcode` | varchar(10) | YES |  |  |
| 36 | `PODiskAmount` | money | YES |  |  |
| 37 | `PODiskCode` | varchar(50) | YES |  |  |
| 38 | `GenericPOAmount` | money | YES |  |  |
| 39 | `GenericPOCode` | varchar(50) | YES |  |  |
| 40 | `EPOAmount` | money | YES |  |  |
| 41 | `EPOCode` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.uf_DistrictPaymentSchedule` | SQL_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_DistrictPaymentSchedule]
as
select * from dbo.uf_DistrictPaymentSchedule()
```
