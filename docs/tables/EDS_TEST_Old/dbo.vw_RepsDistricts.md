# View: `dbo.vw_RepsDistricts`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Active` | tinyint | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `DistrictCode` | varchar(4) | NO |  |  |
| 4 | `DistrictName` | varchar(50) | NO |  |  |
| 5 | `BAName` | varchar(50) | NO |  |  |
| 6 | `Phone` | varchar(20) | NO |  |  |
| 7 | `Fax` | varchar(20) | NO |  |  |
| 8 | `CSRepId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RepsDistricts] as
select isnull(District.Active,0) Active, District.DistrictId, isnull(District.DistrictCode,'') DistrictCode, isnull(District.Name,'') DistrictName, ISNULL(District.BAName,'') BAName, ISNULL(District.PhoneNumber,'') Phone, ISNULL(District.Fax,'') Fax, ISNULL(District.CSRepId,0) CSRepId
  from District with (nolock)
 where District.Active = 1
```
