# View: `dbo.vw_ContinuanceCharges`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `Email` | varchar(255) | YES |  |  |
| 3 | `Status` | char(1) | YES |  |  |
| 4 | `SignedBy` | varchar(255) | YES |  |  |
| 5 | `Received` | datetime | YES |  |  |
| 6 | `DistrictName` | varchar(50) | YES |  |  |
| 7 | `NameAndAddress` | varchar(1024) | YES |  |  |
| 8 | `ParentDistrict` | varchar(50) | YES |  |  |
| 9 | `BudgetName` | varchar(30) | YES |  |  |
| 10 | `SchoolYear` | varchar(61) | YES |  |  |
| 11 | `SchoolYearNumber` | int | YES |  |  |
| 12 | `LMAmount` | money | YES |  |  |
| 13 | `RTKAmount` | money | YES |  |  |
| 14 | `ChargeTypeId` | int | NO |  |  |
| 15 | `Description` | varchar(50) | YES |  |  |
| 16 | `section` | int | NO |  |  |
| 17 | `LM` | int | YES |  |  |
| 18 | `RTK` | int | YES |  |  |
| 19 | `Amount` | money | YES |  |  |
| 20 | `FrequencyData` | varchar(50) | YES |  |  |
| 21 | `BillDate` | date | YES |  |  |
| 22 | `CycleAmount` | money | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `ChargeTypes` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContinuances` | USER_TABLE |
| `DistrictProposedCharges` | USER_TABLE |
| `dbo.uf_DistrictBANameAndAddress` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_ContinuanceSection0Charges`](dbo.vw_ContinuanceSection0Charges.md) | VIEW |
| [`dbo.vw_ContinuanceSection1Charges`](dbo.vw_ContinuanceSection1Charges.md) | VIEW |

## Definition

```sql
CREATE     view [dbo].[vw_ContinuanceCharges]
as
select dca.Id, dca.Email, dca.Status, dca.SignedBy, dca.Received, District.Name DistrictName, dbo.uf_DistrictBANameAndAddress(dca.DistrictId) NameAndAddress, coalesce(pd.Name,'') ParentDistrict, 
       b.Name BudgetName, cast(year(b.StartDate)-1 as varchar) + '-' + cast(year(b.StartDate) as varchar) SchoolYear, year(b.StartDate)-1 SchoolYearNumber, 
       coalesce((Select sum(sdc.Amount)
				  from DistrictProposedCharges sdc
				  join ChargeTypes sct on sct.ChargeTypeId = sdc.ChargeTypeId
									  and sct.LM = 1
				 where sdc.BudgetId = dca.BudgetId),0) LMAmount,
       coalesce((Select sum(sdc.Amount)
				  from DistrictProposedCharges sdc
				  join ChargeTypes sct on sct.ChargeTypeId = sdc.ChargeTypeId
									  and isnull(sct.LM,0) = 0 and sct.RTK = 1
				 where sdc.BudgetId = dca.BudgetId),0) RTKAmount,
       ct.ChargeTypeId, ct.Description, case when ct.LM = 1 or ct.RTK = 1 then 0 else 1 end section, coalesce(ct.lm,0) LM, coalesce(ct.rtk,0) RTK, dc.Amount, dc.FrequencyData, fd.*
  from DistrictContinuances dca
  join District on District.DistrictId = dca.DistrictId
               and District.Active = 1
			   and District.County != 'TEST'
  join DistrictProposedCharges dc on dc.BudgetId = dca.BudgetId
  join ChargeTypes ct on ct.ChargeTypeId = dc.ChargeTypeId
  join Budgets b on b.BudgetId = dca.BudgetId
--                and b.Name like '2024%'
  left outer join District Pd on pd.DistrictId = District.ParentDistrictId
--  outer apply (
  outer apply (Select top 100 dateadd(month,cast(ss.Value as int) - 1,convert(date, '07/01/' + cast(year(b.StartDate)-1 as varchar),101)) BillDate, round(Amount / (select count(*) from string_split(dc.FrequencyData,',') s1),2) CycleAmount
                 from string_split(dc.FrequencyData,',') ss
				order by Value) fd
 where dc.FrequencyData > '0'
-- order by District.Name, case when ct.LM = 1 or ct.RTK = 1 then 0 else 1 end, fd.BillDate, fd.CycleAmount desc
```
