# View: `dbo.vw_ContinuanceSection0Charges`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `BillDate` | date | YES |  |  |
| 3 | `TotalLMAmount` | money | YES |  |  |
| 4 | `TotalRTKAmount` | money | YES |  |  |
| 5 | `LMAmount` | money | YES |  |  |
| 6 | `RTKAmount` | money | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DistrictContinuances` | USER_TABLE |
| `vw_ContinuanceCharges` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from ChargeTypes
--Select * from DistrictContactTypes

CREATE     view [dbo].[vw_ContinuanceSection0Charges]
as
select c.Id, dates.BillDate, /*dates.LM,*/ dates.LMAmount TotalLMAmount, /*dates.RTK,*/ dates.RTKAmount TotalRTKAmount, coalesce(LM.CycleAmount,0) LMAmount, coalesce(RTK.CycleAmount,0) RTKAmount
  from DistrictContinuances c
  outer apply (Select cc.BillDate, /*coalesce(cc.LM,0) LM,*/ coalesce(cc.LMAmount,0) LMAmount, /*coalesce(cc.RTK,0) RTK,*/ coalesce(cc.RTKAmount,0) RTKAmount
                 from vw_ContinuanceCharges cc
				where cc.Id = c.Id
				  and cc.Section = 0
				group by cc.BillDate, coalesce(cc.LMAmount,0), coalesce(cc.RTKAmount,0)) dates
  outer apply (Select cc.CycleAmount
                 from vw_ContinuanceCharges cc
				where cc.Id = c.Id
				  and cc.Section = 0
				  and cc.LM = 1
				  and cc.BillDate = dates.BillDate) LM
  outer apply (Select cc.CycleAmount
                 from vw_ContinuanceCharges cc
				where cc.Id = c.Id
				  and cc.Section = 0
				  and cc.LM = 0 
				  and cc.RTK = 1
				  and cc.BillDate = dates.BillDate) RTK
-- where c.Id = $P{Id}
```
