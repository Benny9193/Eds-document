# Function: scalar: `dbo.uf_ConfiguredDistricts`

_Generated on 2026-05-04T14:49:07.359Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ConfiguredDistricts` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2013-12-02 17:32:45 |
| Modified | 2013-12-02 17:38:58 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPricePlanId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `District` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function dbo.uf_ConfiguredDistricts (@pPricePlanId int)
returns varchar(max)
as
begin
declare @ReturnValue varchar(max)

select @ReturnValue = coalesce( @ReturnValue + ', ','') + isnull(rtrim(ltrim(d.Name)),'')
  from DistrictPP dpp
  join District d on d.DistrictId = dpp.DistrictId
                 and d.Active = 1
                 and isnull(d.DistrictCode,'') != ''
                 and isnull(d.County,'') != 'TEST'
 where dpp.PricePlanId = @pPricePlanId
 order by d.Name
 
return @ReturnValue

end
```
