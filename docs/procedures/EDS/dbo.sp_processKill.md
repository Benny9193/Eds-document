# Procedure: `dbo.sp_processKill`

_Generated on 2026-05-04T14:49:07.310Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_processKill` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-02-21 00:47:38 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pSpid` | IN | int |  |
| 3 | `@pRIP` | IN | varchar(32) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CSRep` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_processKill @pSessionId int, @pSpid int, @pRIP varchar(32) as
declare @Cmd varchar(255),
	@AuditMsg varchar(1024),
	@ApprovalLevel int

select @Cmd = 'KILL ' + cast(@pSpid as varchar(16)),
       @AuditMsg = 'Process ' + cast(@pSpid as varchar(16)) + ' killed per ' + isnull(CSRep.Name,'') + ' from IP ' + isnull(@pRIP,''),
       @ApprovalLevel = isnull(Sessiontable.ApprovalLevel,0)
  from SessionTable
  join CSRep on CSRep.CSRepId = SessionTable.CSRepId
 where SessionTable.SessionId = @pSessionId

if isnull(@ApprovalLevel,0) = 9 and isnull(@pSpid,0) > 50
begin
  exec(@Cmd)
  insert DebugMsgs (Msg) values (@AuditMsg)
end
else
if isnull(@pSpid,0) <= 50
begin
  select @AuditMsg = 'Process ' + cast(@pSpid as varchar(16)) + ' was not killed due to SPID being 50 or below on Session ' + cast(isnull(@pSessionId,0) as varchar(32)) + ' from IP ' + isnull(@pRIP,'')
  insert DebugMsgs (Msg) values (@AuditMsg)
end
else
begin
  select @AuditMsg = 'Process ' + cast(@pSpid as varchar(16)) + ' was not killed due to Access Level Violation on Session ' + cast(isnull(@pSessionId,0) as varchar(32)) + ' from IP ' + isnull(@pRIP,'')
  insert DebugMsgs (Msg) values (@AuditMsg)
end
```
