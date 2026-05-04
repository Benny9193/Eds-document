# Function: scalar: `dbo.uf_SchoolNameAndAddress`

_Generated on 2026-05-04T14:49:07.423Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SchoolNameAndAddress` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2022-04-25 13:15:22 |
| Modified | 2022-04-25 13:15:22 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pShippingId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `School` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function [dbo].[uf_SchoolNameAndAddress] (@pShippingId int)
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
           from School
          where SchoolId = @pShippingId)
end
```
