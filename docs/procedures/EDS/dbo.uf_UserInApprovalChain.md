# Function: scalar: `dbo.uf_UserInApprovalChain`

_Generated on 2026-05-04T13:07:57.726Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_UserInApprovalChain` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-12-17 02:07:12 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@QueryUserId` | IN | int |  |
| 2 | `@UserId` | IN | int |  |
| 3 | `@PriorIds` | IN | varchar(1024) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Users` | USER_TABLE |  |
| `dbo.uf_UserInApprovalChain` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_UAAccounts` | SQL_STORED_PROCEDURE |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |
| `dbo.uf_UserInApprovalChain` | SQL_SCALAR_FUNCTION |
| `dbo.vw_ARStatuses` | VIEW |
| `dbo.vw_ARUsers` | VIEW |
| `dbo.vw_RequisitionIsVisible` | VIEW |

## Definition

```sql
CREATE function dbo.uf_UserInApprovalChain (@QueryUserId int, @UserId int, @PriorIds varchar(1024))
returns int as
begin
declare @ApproverId int,
	@LoopDetect int

  -- Catch Myself
  if @UserId = @QueryUserId
    return 1

  -- Catch Loop
  select @LoopDetect = patindex('%/' + convert(varchar(16),isnull(@UserId,0)) + '/%',@PriorIds)

  if @LoopDetect != 0
    return 2

  select @ApproverId = isnull(ApproverId,0)
    from Users
   where UserId = @UserId

  if @@rowcount = 0 or @ApproverId = 0
    return 0

  if @ApproverId = @QueryUserId
    return 1
  else
    return dbo.uf_UserInApprovalChain(@QueryUserId, @ApproverId, isnull(@PriorIds,'') + '/' + convert(varchar(16),isnull(@UserId,0)) + '/')

  return 0
end
```
