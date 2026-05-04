# View: `dbo.vw_NJDistricts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `DistrictCode` | varchar(4) | YES |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `NameAndAddress` | varchar(1024) | YES |  |  |
| 5 | `BAName` | varchar(50) | NO |  |  |
| 6 | `PhoneNumber` | varchar(20) | YES |  |  |
| 7 | `County` | varchar(50) | NO |  |  |
| 8 | `CSRepName` | varchar(30) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `District` | USER_TABLE |
| `dbo.uf_DistrictNameAndAddress` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_NJDistricts] as
select District.DistrictId, District.DistrictCode, District.Name DistrictName, dbo.uf_DistrictNameAndAddress(District.DistrictId) NameAndAddress, isnull(District.BAName,'') BAName, District.PhoneNumber, isnull(District.County,'') County, isnull(CSRep.Name,'') CSRepName
  from District with (nolock)
  left outer join CSRep on CSRep.CSRepId = District.CSRepId
 where isnull(District.DistrictCode,'') != ''
   and District.State != ''
   and isnull(District.County,'') != 'TEST'
```
