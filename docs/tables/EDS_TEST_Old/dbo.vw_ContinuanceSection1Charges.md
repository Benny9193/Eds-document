# View: `dbo.vw_ContinuanceSection1Charges`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `BillDate` | date | YES |  |  |
| 3 | `Amount` | money | YES |  |  |
| 4 | `Title` | varchar(50) | YES |  |  |
| 5 | `Covering` | varchar(101) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DistrictContinuances` | USER_TABLE |
| `vw_ContinuanceCharges` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view [dbo].[vw_ContinuanceSection1Charges]
as
select c.Id, cc.BillDate, cc.Amount, 
		case cc.ChargeTypeId 
			when 4 then 'PO'
			when 6 then cc.Description
			when 8 then 'e-PO'
			else
				cc.Description
		end Title,
		case cc.ChargeTypeId 
			when 6 then '(Covering Services from 04/01/' + cast(cc.SchoolYearNumber + 1 as varchar) + ' to 03/31/' + cast(cc.SchoolYearNumber + 2 as varchar) + ')'
			else
				'(Covering Services for ' + cc.SchoolYear + ' School Year)'
		end Covering
  from DistrictContinuances c
  join vw_ContinuanceCharges cc on cc.Id = c.Id
                               and cc.Section = 1
```
