# Procedure: `dbo.usp_TransactionLogMover`

_Generated on 2026-05-04T13:04:24.395Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_TransactionLogMover` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-03-09 16:36:24 |
| Modified | 2026-03-14 10:59:56 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `TransactionLog_HISTORY` | USER_TABLE |  |
| `TransactionLogCF` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_TransactionLogMover
CREATE   procedure [dbo].[usp_TransactionLogMover] as
begin
declare @IdsToRemove table (SysId uniqueidentifier not null primary key)
declare @KeepLooping tinyint = 1
set transaction isolation level read uncommitted
/*
declare @BOD datetime 

select @BOD = cast(cast(getdate() as date) as datetime)

insert @IdsToRemove(SysId)
set transaction isolation level read uncommitted
select top 10000 tl.SysId
  from TransactionLogCF tl with (nolock)
  join TransactionLog_HISTORY tlh on tlh.SysId = tl.SysId
 where tl.RequestStart < @BOD
 order by tl.RequestStart

if @@ROWCOUNT > 0
begin
	Delete tl
	  from TransactionLogCF tl
	  join @IdsToRemove idr on idr.SysId = tl.SysId
end
*/
while @KeepLooping = 1
begin
begin transaction
if @@ROWCOUNT = 0
begin
	insert TransactionLog_HISTORY(SysId, RequestStart, RequestEnd, SessionId, TargetServer, URL, Headers, COntent, Method, Protocol)
	 output inserted.SysId into @IdsToRemove(SysId)
	select top 200 SysId, RequestStart, RequestEnd, SessionId, TargetServer, URL, Headers, Content, Method, Protocol
	  from TransactionLogCF tl with (nolock)
--	 where tl.RequestStart < cast(cast(getdate() as date) as datetime)
	 order by RequestStart
end

if @@ROWCOUNT > 0
begin
	Delete tl
	  from TransactionLogCF tl with (rowlock, updlock)
	  join @IdsToRemove idr on idr.SysId = tl.SysId
end
else
begin
	Select @KeepLooping = 0
end
commit transaction
waitfor delay '00:00:02.000'
end
--rollback transaction
end
```
