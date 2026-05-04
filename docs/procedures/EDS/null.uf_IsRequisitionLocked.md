# Function: scalar: `null.uf_IsRequisitionLocked`

_Generated on 2026-05-04T13:04:00.222Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_IsRequisitionLocked` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-01-20 15:53:52 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Approvals` | USER_TABLE |  |
| `dbo.StatusTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   function EDSIQWebUser.uf_IsRequisitionLocked(@pRequisitionId int)
Returns int
 
as
begin
declare @StatusId int,
	@StatusCode char(1),
	@MaxLevel int,
	@Alterable int

  select @StatusId = isnull(Approvals.StatusId,0),
         @StatusCode = isnull(StatusTable.StatusCode,'H'),
         @MaxLevel = (select top 1 Level
                        from dbo.Approvals a1
                       where a1.RequisitionId = Approvals.RequisitionId
                       order by ApprovalDate desc)
    from dbo.Approvals
    join dbo.StatusTable on StatusTable.StatusId = Approvals.StatusId
   where Approvals.RequisitionId = @pRequisitionId

  if @@rowcount = 0
  begin
    select @MaxLevel = 0, @StatusCode = 'H'
  end
  else
  begin
    if @StatusCode = 'R'
    begin
      select @MaxLevel = 0, @StatusCode = 'H'
    end
    else
    if @StatusCode = 'B'
    begin
      select @MaxLevel = 1
    end
  end

  if isnull(@MaxLevel,0) = 0
  begin
    select @Alterable = 0
  end
  else
  begin
    select @Alterable = 1
  end

  return @Alterable
end
```
