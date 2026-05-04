# View: `dbo.vw_NY_TM_Districts_Mailing`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(50) | YES |  |  |
| 2 | `FullName` | varchar(174) | YES |  |  |
| 3 | `Address1` | varchar(50) | YES |  |  |
| 4 | `City` | varchar(50) | NO |  |  |
| 5 | `State` | varchar(2) | NO |  |  |
| 6 | `Zipcode` | varchar(10) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `vw_ny_TM_Districts` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_NY_TM_Districts_Mailing] as
select Name, ltrim(FullName) FullName, Address1, City, State, Zipcode
  from vw_ny_TM_Districts 
union (
    select Name, 'Superintendent' FullName, case when District.Address1 like 'Account%' then District.Address2 else District.Address1 end Address1, isnull(District.City,'') City, ISNULL(District.State,'') State, ISNULL(District.Zipcode,'') ZipCode
      from District
	 where District.Active = 1
	   and District.TimeAndMaterialBids = 1
	   and District.County != 'TEST'
	   and District.State = 'NY')
union (
    select Name, 'Board President' FullName, case when District.Address1 like 'Account%' then District.Address2 else District.Address1 end Address1, isnull(District.City,'') City, ISNULL(District.State,'') State, ISNULL(District.Zipcode,'') ZipCode
      from District
	 where District.Active = 1
	   and District.TimeAndMaterialBids = 1
	   and District.County != 'TEST'
	   and District.State = 'NY')
```
