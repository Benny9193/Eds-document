# View: `dbo.vw_VendorPODistricts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `VendorSessionId` | int | NO |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `DistrictName` | varchar(50) | YES |  |  |
| 5 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 6 | `SummaryName` | varchar(106) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `VendorSessions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorPODistricts] as
select District.DistrictId, VendorSessions.VendorSessionId, VendorSessions.VendorId, District.Name as DistrictName, isnull(DistrictVendor.VendorsAccountCode,'') as VendorsAccountCode,
       rtrim(ltrim(District.Name)) + ' [ ' + isnull(DistrictVendor.VendorsAccountCode,'') + ' ] ' as SummaryName
  from Budgets, District, VendorSessions, DistrictVendor with (nolock)
 where Budgets.Active = 1
   and getdate() between dateadd(month,-4,Budgets.StartDate) and dateadd(month,1,Budgets.EndDate)
   and District.DistrictId = Budgets.DistrictId
   and District.Active = 1
   and District.County != 'TEST'
   and isnull(District.State,'') != ''
   and DistrictVendor.DistrictId = District.DistrictId
   and DistrictVendor.VendorId = VendorSessions.VendorId
 group by District.DistrictId, VendorSessions.VendorSessionId, VendorSessions.VendorId, District.Name, isnull(DistrictVendor.VendorsAccountCode,'')
```
