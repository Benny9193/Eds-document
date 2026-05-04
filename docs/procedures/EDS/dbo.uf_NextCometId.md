# Function: scalar: `dbo.uf_NextCometId`

_Generated on 2026-05-04T14:49:07.395Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_NextCometId` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2008-01-23 11:05:50 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pStartingId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Users` | USER_TABLE |  |
| `dbo.uf_NextCometId` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_CXmlLogin` | SQL_STORED_PROCEDURE |
| `dbo.uf_NextCometId` | SQL_SCALAR_FUNCTION |

## Definition

```sql
create function dbo.uf_NextCometId (@pDistrictId int, @pStartingId int)
returns int as
begin
declare @rCometId int

  select top 1 @rCometId = CometId + 1
    from Users
   where Users.DistrictId = @pDistrictId
     and Users.Active = 1
     and Users.CometId between @pStartingId and @pStartingId + 999
   order by Users.CometId desc

  if @@rowcount = 0
  begin
    select @rCometId = @pStartingId
  end
  else
  begin
    if @rCometId > @pStartingId + 999
    begin
      select @rCometId = dbo.uf_NextCometId(@pDistrictId, @pStartingId + 1000)
    end
  end

  return @rCometId
end
```
