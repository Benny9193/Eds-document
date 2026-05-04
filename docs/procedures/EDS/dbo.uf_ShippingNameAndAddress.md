# Function: scalar: `dbo.uf_ShippingNameAndAddress`

_Generated on 2026-05-04T13:43:19.110Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ShippingNameAndAddress` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2009-03-06 14:58:57 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pShippingId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ShipLocations` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function [dbo].[uf_ShippingNameAndAddress] (@pShippingId int)
returns varchar(1024)
 
as
begin
  return(select rtrim(ltrim(isnull(Name,''))) + 
                case rtrim(ltrim(isnull(Address1,''))) 
                  when '' then '' 
                  when 'Accounts Payable' then ''
                  else char(13) +  char(10) + rtrim(ltrim(Address1))
                end +
                case rtrim(ltrim(isnull(Address2,''))) 
                  when '' then '' 
                  when 'Accounts Payable' then ''
                  else char(13) +  char(10) + rtrim(ltrim(Address2))
                end +
                case rtrim(ltrim(isnull(Address3,''))) 
                  when '' then '' 
                  when 'Accounts Payable' then ''
                  else char(13) +  char(10) + rtrim(ltrim(Address3))
                end +
                case rtrim(ltrim(isnull(City,''))) + rtrim(ltrim(isnull(State,''))) + rtrim(ltrim(isnull(Zipcode,'')))
                  when '' then '' 
                  else char(13) +  char(10) + rtrim(ltrim(isnull(City,''))) + ', ' + rtrim(ltrim(isnull(State,''))) + '  ' + rtrim(ltrim(isnull(Zipcode,'')))
                end
           from ShipLocations
          where ShippingId = @pShippingId)
end
```
