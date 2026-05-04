# View: `dbo.vw_PricePlanFilter`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricePlanId` | int | NO |  |  |
| 2 | `Code` | varchar(20) | YES |  |  |
| 3 | `Description` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PricePlans` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_PricePlanFilter] as
  select PricePlans.PricePlanId, PricePlans.Code, PricePlans.Description
    from PricePlans with (nolock)
    join DistrictPP on DistrictPP.PricePlanId = PricePlans.PricePlanId
    join District on District.DistrictId = DistrictPP.DistrictId
                 and District.Active = 1
                 and ISNULL(rtrim(District.State),'') != ''
                 and ISNULL(rtrim(District.DistrictCode),'') != ''
   where PricePlans.Active = 1
   group by PricePlans.PricePlanId, PricePlans.Code, PricePlans.Description
 union (
  select 99999 PricePlanId, ' < All >' Code, '< All Price Plans >' Description
 )
```
