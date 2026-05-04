# View: `dbo.vw_DistrictList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `County` | varchar(50) | YES |  |  |
| 2 | `DistrictName` | varchar(50) | YES |  |  |
| 3 | `Code` | char(2) | YES |  |  |
| 4 | `StateName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `States` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_DistrictList
as
SELECT trim(District.County) County,
	District.Name DistrictName,
	States.Code,
	States.Name StateName
FROM District
	join States ON 
	 States.Code = District.State
WHERE 
	 District.Active = 1 
	 AND District.County != 'TEST' 
	 and coalesce(District.HideFromDistrictLists,0) = 0 
--ORDER BY States.Name, District.County, District.Name
```
