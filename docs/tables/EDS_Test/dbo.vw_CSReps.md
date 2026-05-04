# View: `dbo.vw_CSReps`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(30) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `District` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_CSReps
as
select CSRep.Name
  from CSRep
 where exists(Select DistrictId from District where District.CSRepId = CSRep.CSRepId and District.Active = 1 and District.County != 'TEST')
union 
select 'Bid Department' Name
union
select 'Unknown' Name
```
